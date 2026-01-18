import { Server, Socket } from 'socket.io';
import type { ClientToServerEvents, ServerToClientEvents } from '@castle-combo/shared';
import { roomManager } from '../managers/RoomManager.js';
import { gameManager } from '../managers/GameManager.js';

type TypedServer = Server<ClientToServerEvents, ServerToClientEvents>;
type TypedSocket = Socket<ClientToServerEvents, ServerToClientEvents>;

/**
 * Setup room event handlers
 */
export function setupRoomHandlers(io: TypedServer, socket: TypedSocket): void {
  const userId = socket.data['userId'] as string;

  /**
   * Toggle ready status
   */
  socket.on('toggle-ready', () => {
    const room = roomManager.getRoomByPlayerId(userId);
    if (!room) {
      socket.emit('error', 'Not in a room');
      return;
    }

    const result = roomManager.toggleReady(room.id, userId);
    if (result.room) {
      io.to(room.id).emit('room-updated', result.room);
    }
  });

  /**
   * Start the game (host only)
   */
  socket.on('start-game', () => {
    const room = roomManager.getRoomByPlayerId(userId);
    if (!room) {
      socket.emit('error', 'Not in a room');
      return;
    }

    // Verify host
    if (room.hostId !== userId) {
      socket.emit('error', 'Only the host can start the game');
      return;
    }

    // Check minimum players
    if (room.players.length < room.minPlayers) {
      socket.emit('error', `Need at least ${room.minPlayers} players`);
      return;
    }

    // Check all players ready (except host)
    const notReady = room.players.filter(p => !p.isReady && !p.isHost);
    if (notReady.length > 0) {
      socket.emit('error', 'Not all players are ready');
      return;
    }

    // Create game
    const players = room.players.map(p => ({
      id: p.id,
      username: p.username,
    }));

    const gameState = gameManager.createGame(room.id, players);

    // Update room status
    roomManager.startGame(room.id, gameState.id);

    // Broadcast game started
    io.to(room.id).emit('game-started', gameState);

    // Update room list
    io.emit('rooms-list', roomManager.getAvailableRooms());
  });
}
