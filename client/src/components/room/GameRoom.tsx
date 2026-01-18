import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { useLobbyStore } from '../../stores/lobbyStore';
import { useGameStore } from '../../stores/gameStore';
import { connectSocket, getSocket, socketActions } from '../../services/socket';
import type { GameRoom as GameRoomType, GameState } from '@castle-combo/shared';

export default function GameRoom() {
  const navigate = useNavigate();
  const { roomId } = useParams<{ roomId: string }>();
  const user = useAuthStore(state => state.user);
  const { currentRoom, setCurrentRoom, updateCurrentRoom, leaveRoom } = useLobbyStore();
  const setGameState = useGameStore(state => state.setGameState);
  const [isReconnecting, setIsReconnecting] = useState(false);

  useEffect(() => {
    // Ensure socket is connected
    const socket = connectSocket();

    // If we have roomId but no currentRoom, try to reconnect
    if (roomId && !currentRoom) {
      setIsReconnecting(true);
      socketActions.reconnectToRoom(roomId);
    }

    // Socket event listeners
    socket.on('room-joined', (room: GameRoomType) => {
      setCurrentRoom(room);
      setIsReconnecting(false);
    });

    socket.on('room-updated', (room: GameRoomType) => {
      updateCurrentRoom(room);
      // Also set if we don't have currentRoom (reconnection case)
      if (!currentRoom || currentRoom.id === room.id) {
        setCurrentRoom(room);
      }
    });

    socket.on('room-left', () => {
      leaveRoom();
      navigate('/lobby');
    });

    socket.on('game-started', (gameState: GameState) => {
      setGameState(gameState);
      navigate(`/game/${roomId}`);
    });

    socket.on('error', (message: string) => {
      setIsReconnecting(false);
      // If reconnection failed, go back to lobby
      if (message.includes('not found') || message.includes('not in this room')) {
        leaveRoom();
        navigate('/lobby');
      } else {
        alert(message);
      }
    });

    return () => {
      socket.off('room-joined');
      socket.off('room-updated');
      socket.off('room-left');
      socket.off('game-started');
      socket.off('error');
    };
  }, [navigate, roomId, currentRoom, updateCurrentRoom, leaveRoom, setGameState, setCurrentRoom]);

  const handleLeave = () => {
    socketActions.leaveRoom();
  };

  const handleToggleReady = () => {
    socketActions.toggleReady();
  };

  const handleStartGame = () => {
    socketActions.startGame();
  };

  if (!currentRoom || isReconnecting) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-400 mb-2">
            {isReconnecting ? 'Reconnecting to room...' : 'Loading room...'}
          </p>
          <div className="animate-spin w-8 h-8 border-4 border-castle-accent border-t-transparent rounded-full mx-auto"></div>
        </div>
      </div>
    );
  }

  const isHost = currentRoom.hostId === user?.id;
  const myPlayer = currentRoom.players.find(p => p.id === user?.id);
  const canStart = currentRoom.players.length >= currentRoom.minPlayers &&
    currentRoom.players.every(p => p.isReady || p.isHost);

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="title-medieval text-2xl text-castle-accent">{currentRoom.name}</h1>
          <p className="text-sm text-slate-400">
            {currentRoom.players.length}/{currentRoom.maxPlayers} players
          </p>
        </div>
        <button
          onClick={handleLeave}
          className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded transition-colors"
        >
          Leave Room
        </button>
      </header>

      {/* Players */}
      <div className="max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Players</h2>
        <div className="space-y-3 mb-8">
          {currentRoom.players.map(player => (
            <div
              key={player.id}
              className={`flex justify-between items-center p-4 rounded-lg ${
                player.id === user?.id ? 'bg-castle-accent/20 border border-castle-accent' : 'bg-castle-primary'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="font-semibold">{player.username}</span>
                {player.isHost && (
                  <span className="px-2 py-0.5 bg-amber-600 text-xs rounded">HOST</span>
                )}
              </div>
              <span
                className={`px-3 py-1 rounded text-sm ${
                  player.isReady || player.isHost
                    ? 'bg-green-600 text-white'
                    : 'bg-slate-600 text-slate-300'
                }`}
              >
                {player.isHost ? 'Host' : player.isReady ? 'Ready' : 'Not Ready'}
              </span>
            </div>
          ))}

          {/* Empty slots */}
          {Array.from({ length: currentRoom.maxPlayers - currentRoom.players.length }).map((_, i) => (
            <div
              key={`empty-${i}`}
              className="flex justify-center items-center p-4 bg-castle-primary/50 rounded-lg border-2 border-dashed border-slate-600"
            >
              <span className="text-slate-500">Waiting for player...</span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex justify-center gap-4">
          {!isHost && (
            <button
              onClick={handleToggleReady}
              className={`px-6 py-3 rounded font-semibold transition-colors ${
                myPlayer?.isReady
                  ? 'bg-slate-600 hover:bg-slate-500'
                  : 'bg-green-600 hover:bg-green-500'
              }`}
            >
              {myPlayer?.isReady ? 'Cancel Ready' : 'Ready'}
            </button>
          )}

          {isHost && (
            <button
              onClick={handleStartGame}
              disabled={!canStart}
              className="px-6 py-3 bg-castle-accent hover:bg-amber-600 rounded font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Start Game
            </button>
          )}
        </div>

        {isHost && !canStart && (
          <p className="text-center text-sm text-slate-400 mt-4">
            {currentRoom.players.length < currentRoom.minPlayers
              ? `Need at least ${currentRoom.minPlayers} players to start`
              : 'Waiting for all players to be ready'}
          </p>
        )}
      </div>
    </div>
  );
}
