import { Server, Socket } from 'socket.io';
import type { ClientToServerEvents, ServerToClientEvents, CreateRoomOptions } from '@castle-combo/shared';
import { roomManager } from '../managers/RoomManager.js';

type TypedServer = Server<ClientToServerEvents, ServerToClientEvents>;
type TypedSocket = Socket<ClientToServerEvents, ServerToClientEvents>;

/**
 * Setup lobby event handlers
 */
export function setupLobbyHandlers(io: TypedServer, socket: TypedSocket): void {
  const userId = socket.data['userId'] as string;
  const username = socket.data['username'] as string;

  /**
   * Get list of available rooms
   */
  socket.on('get-rooms', () => {
    const rooms = roomManager.getAvailableRooms();
    socket.emit('rooms-list', rooms);
  });

  /**
   * Create a new room
   */
  socket.on('create-room', (options: CreateRoomOptions) => {
    // Leave any existing room first
    const existingRoom = roomManager.getRoomByPlayerId(userId);
    if (existingRoom) {
      socket.leave(existingRoom.id);
      roomManager.leaveRoom(existingRoom.id, userId);
    }

    // Create new room
    const room = roomManager.createRoom(userId, username, options);

    // Join socket room
    socket.join(room.id);

    // Emit to creator
    socket.emit('room-joined', room);

    // Broadcast updated room list
    io.emit('rooms-list', roomManager.getAvailableRooms());
  });

  /**
   * Join an existing room
   */
  socket.on('join-room', (roomId: string) => {
    // Leave any existing room first
    const existingRoom = roomManager.getRoomByPlayerId(userId);
    if (existingRoom) {
      socket.leave(existingRoom.id);
      const result = roomManager.leaveRoom(existingRoom.id, userId);
      if (result.room) {
        io.to(existingRoom.id).emit('room-updated', result.room);
      }
    }

    // Join room
    const result = roomManager.joinRoom(roomId, userId, username);

    if (!result.success) {
      socket.emit('error', result.error || 'Failed to join room');
      return;
    }

    // Join socket room
    socket.join(roomId);

    // Emit to joiner
    socket.emit('room-joined', result.room!);

    // Broadcast to room
    io.to(roomId).emit('room-updated', result.room!);

    // Broadcast updated room list
    io.emit('rooms-list', roomManager.getAvailableRooms());
  });

  /**
   * Leave current room
   */
  socket.on('leave-room', () => {
    const room = roomManager.getRoomByPlayerId(userId);
    if (!room) {
      socket.emit('error', 'Not in a room');
      return;
    }

    const roomId = room.id;
    socket.leave(roomId);

    const result = roomManager.leaveRoom(roomId, userId);

    // Emit to leaver
    socket.emit('room-left');

    // Broadcast to room (if not deleted)
    if (result.room) {
      io.to(roomId).emit('room-updated', result.room);
    }

    // Broadcast updated room list
    io.emit('rooms-list', roomManager.getAvailableRooms());
  });

  /**
   * Reconnect to a room after page reload
   */
  socket.on('reconnect-to-room', (roomId: string) => {
    const room = roomManager.getRoom(roomId);

    if (!room) {
      socket.emit('error', 'Room not found');
      return;
    }

    // Check if user is already in the room
    const isInRoom = room.players.some(p => p.id === userId);

    if (isInRoom) {
      // Just rejoin the socket room and send current state
      socket.join(roomId);
      socket.emit('room-joined', room);

      // Notify others that player reconnected
      socket.to(roomId).emit('player-reconnected', { playerId: userId, username });
    } else {
      // Try to join the room
      const result = roomManager.joinRoom(roomId, userId, username);

      if (!result.success) {
        socket.emit('error', result.error || 'Failed to rejoin room');
        return;
      }

      socket.join(roomId);
      socket.emit('room-joined', result.room!);
      io.to(roomId).emit('room-updated', result.room!);
    }
  });
}
