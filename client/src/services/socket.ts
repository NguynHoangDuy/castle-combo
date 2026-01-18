import { io, Socket } from 'socket.io-client';
import type {
  ClientToServerEvents,
  ServerToClientEvents,
  CreateRoomOptions,
  PlayerAction,
} from '@castle-combo/shared';
import { useAuthStore } from '../stores/authStore';

// Socket URL
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || '';

// Typed socket
type TypedSocket = Socket<ServerToClientEvents, ClientToServerEvents>;

let socket: TypedSocket | null = null;

/**
 * Connect to socket server
 */
export function connectSocket(): TypedSocket {
  if (socket?.connected) {
    return socket;
  }

  const token = useAuthStore.getState().token;

  socket = io(SOCKET_URL, {
    auth: { token },
    transports: ['websocket', 'polling'],
  }) as TypedSocket;

  socket.on('connect', () => {
    console.log('Socket connected');
  });

  socket.on('disconnect', (reason) => {
    console.log('Socket disconnected:', reason);
  });

  socket.on('connect_error', (error) => {
    console.error('Socket connection error:', error.message);
  });

  return socket;
}

/**
 * Disconnect socket
 */
export function disconnectSocket(): void {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}

/**
 * Get current socket instance
 */
export function getSocket(): TypedSocket | null {
  return socket;
}

/**
 * Socket actions
 */
export const socketActions = {
  // Lobby actions
  getRooms: () => socket?.emit('get-rooms'),
  createRoom: (options: CreateRoomOptions) => socket?.emit('create-room', options),
  joinRoom: (roomId: string) => socket?.emit('join-room', roomId),
  leaveRoom: () => socket?.emit('leave-room'),

  // Room actions
  toggleReady: () => socket?.emit('toggle-ready'),
  startGame: () => socket?.emit('start-game'),

  // Game actions
  playerAction: (action: PlayerAction) => socket?.emit('player-action', action),
  getGameState: () => socket?.emit('get-game-state'),

  // Reconnection
  reconnectToRoom: (roomId: string) => socket?.emit('reconnect-to-room', roomId),
};

export default socket;
