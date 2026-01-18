import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { useGameStore } from '../../stores/gameStore';
import { useLobbyStore } from '../../stores/lobbyStore';
import { connectSocket, socketActions } from '../../services/socket';
import type { GameState, Card as CardType, Position, ActionResult } from '@castle-combo/shared';
import CardMarket from './CardMarket';
import PlayerTableau from './PlayerTableau';
import Card from './Card';

export default function GameBoard() {
  const navigate = useNavigate();
  const { roomId } = useParams<{ roomId: string }>();
  const user = useAuthStore(state => state.user);
  const {
    gameState,
    setGameState,
    selectedCard,
    selectedPosition,
    clearSelection,
    setShowScoreboard,
    showScoreboard,
  } = useGameStore();
  const { currentRoom } = useLobbyStore();

  const [pendingCard, setPendingCard] = useState<CardType | null>(null);
  const [isReconnecting, setIsReconnecting] = useState(false);

  useEffect(() => {
    // Ensure socket is connected
    const socket = connectSocket();

    // If we don't have game state, try to reconnect to room first
    if (roomId && !gameState) {
      setIsReconnecting(true);
      socketActions.reconnectToRoom(roomId);
    }

    socket.on('room-joined', () => {
      // After rejoining room, request game state
      socketActions.getGameState();
    });

    socket.on('game-state', (state: GameState) => {
      setGameState(state);
      setIsReconnecting(false);
    });

    socket.on('action-result', (result: ActionResult) => {
      if (!result.success) {
        alert(result.error);
      }
    });

    socket.on('game-ended', () => {
      setShowScoreboard(true);
    });

    socket.on('error', (message: string) => {
      setIsReconnecting(false);
      if (message.includes('not found') || message.includes('not in this room')) {
        navigate('/lobby');
      }
    });

    // Request current game state if we have game state already
    if (gameState) {
      socketActions.getGameState();
    }

    return () => {
      socket.off('room-joined');
      socket.off('game-state');
      socket.off('action-result');
      socket.off('game-ended');
      socket.off('error');
    };
  }, [navigate, roomId, gameState, setGameState, setShowScoreboard]);

  if (!gameState || isReconnecting) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-400 mb-2">
            {isReconnecting ? 'Reconnecting to game...' : 'Loading game...'}
          </p>
          <div className="animate-spin w-8 h-8 border-4 border-castle-accent border-t-transparent rounded-full mx-auto"></div>
        </div>
      </div>
    );
  }

  const currentPlayer = gameState.players[gameState.currentPlayerIndex];
  const isMyTurn = currentPlayer.id === user?.id;
  const myPlayerState = gameState.players.find(p => p.id === user?.id);
  const otherPlayers = gameState.players.filter(p => p.id !== user?.id);

  const handleMoveMessenger = () => {
    socketActions.playerAction({ type: 'move_messenger' });
  };

  const handleRefreshRow = () => {
    socketActions.playerAction({ type: 'refresh_row' });
  };

  const handleEndOptional = () => {
    socketActions.playerAction({ type: 'end_optional' });
  };

  const handleBuyCard = (card: CardType) => {
    if (gameState.turnPhase === 'buy_card') {
      socketActions.playerAction({ type: 'buy_card', cardId: card.id });
      setPendingCard(card);
    }
  };

  const handlePlaceCard = (position: Position) => {
    const cardToPlace = pendingCard || myPlayerState?.hand;
    if (cardToPlace && gameState.turnPhase === 'place_card') {
      socketActions.playerAction({
        type: 'place_card',
        cardId: cardToPlace.id,
        position,
      });
      setPendingCard(null);
      clearSelection();
    }
  };

  const handleLeaveGame = () => {
    navigate('/lobby');
  };

  return (
    <div className="min-h-screen p-4">
      {/* Header */}
      <header className="flex justify-between items-center mb-4">
        <div>
          <h1 className="title-medieval text-2xl text-castle-accent">Castle Combo</h1>
          <p className="text-sm text-slate-400">
            Turn {gameState.turnNumber} | {currentPlayer.username}'s turn
            {isMyTurn && <span className="text-castle-accent ml-2">(Your turn!)</span>}
          </p>
        </div>
        <button
          onClick={handleLeaveGame}
          className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded transition-colors"
        >
          Leave
        </button>
      </header>

      {/* Turn phase indicator */}
      {isMyTurn && (
        <div className="bg-castle-accent/20 border border-castle-accent rounded-lg p-3 mb-4">
          <div className="flex justify-between items-center">
            <div>
              <span className="font-semibold">Phase: </span>
              <span className="capitalize">{gameState.turnPhase.replace('_', ' ')}</span>
            </div>

            {/* Phase actions */}
            <div className="flex gap-2">
              {gameState.turnPhase === 'optional_actions' && (
                <>
                  <button
                    onClick={handleMoveMessenger}
                    disabled={myPlayerState!.keys < 1}
                    className="px-3 py-1 bg-slate-600 hover:bg-slate-500 rounded text-sm disabled:opacity-50"
                  >
                    Move Messenger (1🗝️)
                  </button>
                  <button
                    onClick={handleRefreshRow}
                    disabled={myPlayerState!.keys < 1}
                    className="px-3 py-1 bg-slate-600 hover:bg-slate-500 rounded text-sm disabled:opacity-50"
                  >
                    Refresh Row (1🗝️)
                  </button>
                  <button
                    onClick={handleEndOptional}
                    className="px-3 py-1 bg-green-600 hover:bg-green-500 rounded text-sm"
                  >
                    Continue to Buy
                  </button>
                </>
              )}

              {gameState.turnPhase === 'buy_card' && (
                <span className="text-sm text-slate-300">Select a card from the active market row</span>
              )}

              {gameState.turnPhase === 'place_card' && (
                <span className="text-sm text-slate-300">Click an empty slot in your tableau</span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main game area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left: Other players */}
        <div className="space-y-4">
          <h2 className="font-semibold text-lg">Opponents</h2>
          {otherPlayers.map(player => (
            <PlayerTableau
              key={player.id}
              tableau={player.tableau}
              isCurrentPlayer={false}
              playerName={player.username}
              gold={player.gold}
              keys={player.keys}
              score={player.score}
            />
          ))}
        </div>

        {/* Center: Market */}
        <div>
          <CardMarket
            market={gameState.market}
            onSelectCard={handleBuyCard}
            selectedCardId={selectedCard?.id}
            canBuy={isMyTurn && gameState.turnPhase === 'buy_card'}
          />

          {/* Card in hand */}
          {myPlayerState?.hand && (
            <div className="mt-4 bg-castle-accent/20 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Card to Place</h3>
              <Card card={myPlayerState.hand} size="medium" />
            </div>
          )}
        </div>

        {/* Right: My tableau */}
        <div>
          <h2 className="font-semibold text-lg mb-4">Your Castle</h2>
          {myPlayerState && (
            <PlayerTableau
              tableau={myPlayerState.tableau}
              isCurrentPlayer={true}
              onSelectPosition={
                isMyTurn && gameState.turnPhase === 'place_card' ? handlePlaceCard : undefined
              }
              selectedPosition={selectedPosition || undefined}
              playerName={myPlayerState.username}
              gold={myPlayerState.gold}
              keys={myPlayerState.keys}
              score={myPlayerState.score}
            />
          )}
        </div>
      </div>

      {/* Game Over Modal */}
      {gameState.phase === 'ended' && showScoreboard && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-castle-primary p-8 rounded-lg max-w-md w-full">
            <h2 className="title-medieval text-2xl text-castle-accent text-center mb-6">
              Game Over!
            </h2>
            <div className="space-y-3 mb-6">
              {gameState.players
                .sort((a, b) => b.score - a.score)
                .map((player, index) => (
                  <div
                    key={player.id}
                    className={`flex justify-between items-center p-3 rounded ${
                      index === 0 ? 'bg-castle-accent/30' : 'bg-castle-secondary'
                    }`}
                  >
                    <span>
                      {index === 0 && '🏆 '}
                      {player.username}
                    </span>
                    <span className="font-bold">{player.score} pts</span>
                  </div>
                ))}
            </div>
            <button
              onClick={() => navigate('/lobby')}
              className="w-full py-3 bg-castle-accent hover:bg-amber-600 rounded font-semibold transition-colors"
            >
              Back to Lobby
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
