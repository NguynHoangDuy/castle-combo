import type { GameRoom, RoomListItem, CreateRoomOptions } from './room.types.js';
import type { GameState } from './game.types.js';
import type { ActionResult, PlayerAction } from './action.types.js';
import type { Card } from './card.types.js';

/**
 * Events sent from client to server
 */
export interface ClientToServerEvents {
  // Lobby events
  'get-rooms': () => void;
  'create-room': (options: CreateRoomOptions) => void;
  'join-room': (roomId: string) => void;
  'leave-room': () => void;

  // Room events
  'toggle-ready': () => void;
  'start-game': () => void;
  'kick-player': (playerId: string) => void;

  // Game events
  'player-action': (action: PlayerAction) => void;
  'get-game-state': () => void;
  'request-game-state': () => void;

  // Reconnection
  'reconnect-to-room': (roomId: string) => void;

  // Chat events
  'send-message': (message: string) => void;
}

/**
 * Events sent from server to client
 */
export interface ServerToClientEvents {
  // Connection events
  'connect-error': (error: string) => void;
  'authenticated': (userId: string) => void;

  // Lobby events
  'rooms-list': (rooms: RoomListItem[]) => void;
  'room-created': (room: GameRoom) => void;
  'room-joined': (room: GameRoom) => void;
  'room-updated': (room: GameRoom) => void;
  'room-left': () => void;
  'room-error': (error: string) => void;

  // Game events
  'game-started': (gameState: GameState) => void;
  'game-state': (gameState: GameState) => void;
  'action-result': (result: ActionResult) => void;
  'turn-changed': (currentPlayerIndex: number) => void;
  'game-ended': (finalState: GameState) => void;

  // Special ability events
  'view-deck-cards': (cards: Card[]) => void;

  // Player events
  'player-joined': (data: { playerId: string; username: string }) => void;
  'player-left': (playerId: string) => void;
  'player-disconnected': (data: { playerId: string; username: string }) => void;
  'player-reconnected': (data: { playerId: string; username: string }) => void;

  // Chat events
  'chat-message': (playerId: string, username: string, message: string) => void;

  // Error events
  'error': (error: string) => void;
}

/**
 * Inter-server events (for scaling)
 */
export interface InterServerEvents {
  ping: () => void;
}

/**
 * Socket data attached to each socket
 */
export interface SocketData {
  userId: string;
  username: string;
  currentRoomId?: string;
}
