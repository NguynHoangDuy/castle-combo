import { Server, Socket } from 'socket.io';
import type { ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData } from '@castle-combo/shared';
import { setupLobbyHandlers } from './handlers/lobbyHandlers.js';
import { setupRoomHandlers } from './handlers/roomHandlers.js';
import { setupGameHandlers } from './handlers/gameHandlers.js';
import { roomManager } from './managers/RoomManager.js';

type TypedServer = Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>;
type TypedSocket = Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>;

/**
 * Setup all socket handlers
 */
export function setupSocketHandlers(io: TypedServer): void {
  io.on('connection', (socket: TypedSocket) => {
    const userId = socket.data['userId'] as string;
    const username = socket.data['username'] as string;

    console.log(`User connected: ${username} (${userId})`);

    // Send authenticated event
    socket.emit('authenticated', userId);

    // Setup handlers
    setupLobbyHandlers(io, socket);
    setupRoomHandlers(io, socket);
    setupGameHandlers(io, socket);

    // Handle disconnection
    socket.on('disconnect', (reason) => {
      console.log(`User disconnected: ${username} - ${reason}`);

      // Handle leaving room on disconnect
      const room = roomManager.getRoomByPlayerId(userId);
      if (room) {
        const result = roomManager.leaveRoom(room.id, userId);

        // Notify remaining players
        if (result.room) {
          io.to(room.id).emit('room-updated', result.room);
          io.to(room.id).emit('player-disconnected', {
            playerId: userId,
            username,
          });
        }

        // Update room list
        io.emit('rooms-list', roomManager.getAvailableRooms());
      }
    });

    // Handle reconnection attempt
    socket.on('reconnect-to-room', (roomId: string) => {
      const room = roomManager.getRoom(roomId);
      if (!room) {
        socket.emit('error', 'Room not found');
        return;
      }

      // Check if player was in this room
      const player = room.players.find(p => p.id === userId);
      if (!player) {
        socket.emit('error', 'You were not in this room');
        return;
      }

      // Rejoin socket room
      socket.join(roomId);
      socket.emit('room-joined', room);

      // Notify others
      io.to(roomId).emit('player-reconnected', {
        playerId: userId,
        username,
      });
    });
  });
}

export { roomManager } from './managers/RoomManager.js';
export { gameManager } from './managers/GameManager.js';
