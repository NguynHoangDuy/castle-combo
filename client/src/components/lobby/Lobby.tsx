import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { useLobbyStore } from '../../stores/lobbyStore';
import { connectSocket, socketActions, getSocket } from '../../services/socket';
import type { RoomListItem, GameRoom, CreateRoomOptions } from '@castle-combo/shared';

export default function Lobby() {
  const navigate = useNavigate();
  const user = useAuthStore(state => state.user);
  const logout = useAuthStore(state => state.logout);
  const { rooms, setRooms, setCurrentRoom } = useLobbyStore();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [roomName, setRoomName] = useState('');
  const [maxPlayers, setMaxPlayers] = useState(4);

  useEffect(() => {
    const socket = connectSocket();

    // Socket event listeners
    socket.on('rooms-list', (roomList: RoomListItem[]) => {
      setRooms(roomList);
    });

    socket.on('room-joined', (room: GameRoom) => {
      setCurrentRoom(room);
      navigate(`/room/${room.id}`);
    });

    socket.on('error', (message: string) => {
      alert(message);
    });

    // Get initial room list
    socketActions.getRooms();

    return () => {
      socket.off('rooms-list');
      socket.off('room-joined');
      socket.off('error');
    };
  }, [navigate, setRooms, setCurrentRoom]);

  const handleCreateRoom = () => {
    if (!roomName.trim()) return;

    const options: CreateRoomOptions = {
      name: roomName.trim(),
      maxPlayers,
    };

    socketActions.createRoom(options);
    setShowCreateModal(false);
    setRoomName('');
  };

  const handleJoinRoom = (roomId: string) => {
    socketActions.joinRoom(roomId);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="title-medieval text-3xl text-castle-accent">Castle Combo</h1>
        <div className="flex items-center gap-4">
          <span className="text-slate-300">Welcome, {user?.username}</span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main content */}
      <div className="max-w-4xl mx-auto">
        {/* Actions */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Game Rooms</h2>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-castle-accent hover:bg-amber-600 rounded font-semibold transition-colors"
          >
            Create Room
          </button>
        </div>

        {/* Room list */}
        <div className="space-y-3">
          {rooms.length === 0 ? (
            <div className="text-center py-12 bg-castle-primary rounded-lg">
              <p className="text-slate-400">No rooms available. Create one to start playing!</p>
            </div>
          ) : (
            rooms.map(room => (
              <div
                key={room.id}
                className="flex justify-between items-center p-4 bg-castle-primary rounded-lg hover:bg-castle-secondary transition-colors"
              >
                <div>
                  <h3 className="font-semibold">{room.name}</h3>
                  <p className="text-sm text-slate-400">
                    Host: {room.hostUsername} | {room.playerCount}/{room.maxPlayers} players
                  </p>
                </div>
                <button
                  onClick={() => handleJoinRoom(room.id)}
                  className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded transition-colors"
                >
                  Join
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Create Room Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-castle-primary p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Create Room</h2>

            <div className="mb-4">
              <label className="block text-sm text-slate-300 mb-1">Room Name</label>
              <input
                type="text"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                className="w-full px-4 py-2 bg-castle-secondary border border-slate-600 rounded focus:outline-none focus:border-castle-accent"
                placeholder="Enter room name"
                maxLength={30}
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm text-slate-300 mb-1">Max Players</label>
              <select
                value={maxPlayers}
                onChange={(e) => setMaxPlayers(Number(e.target.value))}
                className="w-full px-4 py-2 bg-castle-secondary border border-slate-600 rounded focus:outline-none focus:border-castle-accent"
              >
                <option value={2}>2 Players</option>
                <option value={3}>3 Players</option>
                <option value={4}>4 Players</option>
                <option value={5}>5 Players</option>
              </select>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 py-2 bg-slate-600 hover:bg-slate-500 rounded transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateRoom}
                disabled={!roomName.trim()}
                className="flex-1 py-2 bg-castle-accent hover:bg-amber-600 rounded font-semibold transition-colors disabled:opacity-50"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
