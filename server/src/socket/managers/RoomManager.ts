import { v4 as uuidv4 } from 'uuid';
import type { GameRoom, RoomPlayer, RoomStatus, CreateRoomOptions, RoomListItem, DEFAULT_ROOM_CONFIG } from '@castle-combo/shared';

/**
 * In-memory room storage
 */
class RoomManager {
  private rooms: Map<string, GameRoom> = new Map();

  /**
   * Create a new room
   */
  createRoom(hostId: string, hostUsername: string, options: CreateRoomOptions): GameRoom {
    const room: GameRoom = {
      id: uuidv4(),
      name: options.name,
      hostId,
      players: [
        {
          id: hostId,
          username: hostUsername,
          isReady: false,
          isHost: true,
        },
      ],
      status: 'waiting',
      maxPlayers: options.maxPlayers || 5,
      minPlayers: options.minPlayers || 2,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    this.rooms.set(room.id, room);
    return room;
  }

  /**
   * Get room by ID
   */
  getRoom(roomId: string): GameRoom | undefined {
    return this.rooms.get(roomId);
  }

  /**
   * Get all rooms
   */
  getAllRooms(): GameRoom[] {
    return Array.from(this.rooms.values());
  }

  /**
   * Get rooms available for joining
   */
  getAvailableRooms(): RoomListItem[] {
    return Array.from(this.rooms.values())
      .filter(room => room.status === 'waiting' && room.players.length < room.maxPlayers)
      .map(room => ({
        id: room.id,
        name: room.name,
        hostUsername: room.players.find(p => p.isHost)?.username || 'Unknown',
        playerCount: room.players.length,
        maxPlayers: room.maxPlayers,
        status: room.status,
      }));
  }

  /**
   * Add player to room
   */
  joinRoom(roomId: string, playerId: string, username: string): { success: boolean; room?: GameRoom; error?: string } {
    const room = this.rooms.get(roomId);

    if (!room) {
      return { success: false, error: 'Room not found' };
    }

    if (room.status !== 'waiting') {
      return { success: false, error: 'Room is not accepting players' };
    }

    if (room.players.length >= room.maxPlayers) {
      return { success: false, error: 'Room is full' };
    }

    if (room.players.some(p => p.id === playerId)) {
      return { success: false, error: 'Already in room' };
    }

    room.players.push({
      id: playerId,
      username,
      isReady: false,
      isHost: false,
    });
    room.updatedAt = Date.now();

    return { success: true, room };
  }

  /**
   * Remove player from room
   */
  leaveRoom(roomId: string, playerId: string): { success: boolean; room?: GameRoom; deleted?: boolean } {
    const room = this.rooms.get(roomId);

    if (!room) {
      return { success: false };
    }

    const playerIndex = room.players.findIndex(p => p.id === playerId);
    if (playerIndex === -1) {
      return { success: false };
    }

    const wasHost = room.players[playerIndex].isHost;
    room.players.splice(playerIndex, 1);

    // If room is empty, delete it
    if (room.players.length === 0) {
      this.rooms.delete(roomId);
      return { success: true, deleted: true };
    }

    // If host left, assign new host
    if (wasHost && room.players.length > 0) {
      room.players[0].isHost = true;
      room.hostId = room.players[0].id;
    }

    room.updatedAt = Date.now();
    return { success: true, room };
  }

  /**
   * Toggle player ready status
   */
  toggleReady(roomId: string, playerId: string): { success: boolean; room?: GameRoom } {
    const room = this.rooms.get(roomId);

    if (!room) {
      return { success: false };
    }

    const player = room.players.find(p => p.id === playerId);
    if (!player) {
      return { success: false };
    }

    player.isReady = !player.isReady;
    room.updatedAt = Date.now();

    return { success: true, room };
  }

  /**
   * Check if all players are ready
   */
  areAllPlayersReady(roomId: string): boolean {
    const room = this.rooms.get(roomId);
    if (!room) return false;

    return room.players.length >= room.minPlayers &&
      room.players.every(p => p.isReady || p.isHost);
  }

  /**
   * Start game in room
   */
  startGame(roomId: string, gameId: string): { success: boolean; room?: GameRoom } {
    const room = this.rooms.get(roomId);

    if (!room) {
      return { success: false };
    }

    room.status = 'in_game';
    room.gameId = gameId;
    room.updatedAt = Date.now();

    return { success: true, room };
  }

  /**
   * End game in room
   */
  endGame(roomId: string): { success: boolean; room?: GameRoom } {
    const room = this.rooms.get(roomId);

    if (!room) {
      return { success: false };
    }

    room.status = 'finished';
    room.updatedAt = Date.now();

    return { success: true, room };
  }

  /**
   * Delete room
   */
  deleteRoom(roomId: string): boolean {
    return this.rooms.delete(roomId);
  }

  /**
   * Get room by player ID
   */
  getRoomByPlayerId(playerId: string): GameRoom | undefined {
    return Array.from(this.rooms.values()).find(room =>
      room.players.some(p => p.id === playerId)
    );
  }
}

// Export singleton instance
export const roomManager = new RoomManager();
