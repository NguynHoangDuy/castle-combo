import type { RoomPlayer } from './player.types.js';

/**
 * Room status
 */
export type RoomStatus = 'waiting' | 'starting' | 'in_game' | 'finished';

/**
 * Game room
 */
export interface GameRoom {
  id: string;
  name: string;
  hostId: string;
  players: RoomPlayer[];
  status: RoomStatus;
  maxPlayers: number;
  minPlayers: number;
  createdAt: number;
  updatedAt: number;
  gameId?: string;
}

/**
 * Room creation options
 */
export interface CreateRoomOptions {
  name: string;
  maxPlayers?: number;  // Default: 5
  minPlayers?: number;  // Default: 2
}

/**
 * Room list item (for lobby display)
 */
export interface RoomListItem {
  id: string;
  name: string;
  hostUsername: string;
  playerCount: number;
  maxPlayers: number;
  status: RoomStatus;
}

/**
 * Room join result
 */
export interface RoomJoinResult {
  success: boolean;
  room?: GameRoom;
  error?: string;
}

/**
 * Default room configuration
 */
export const DEFAULT_ROOM_CONFIG = {
  minPlayers: 2,
  maxPlayers: 5,
};
