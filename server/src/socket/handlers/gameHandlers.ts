import { Server, Socket } from 'socket.io';
import type { ClientToServerEvents, ServerToClientEvents, PlayerAction } from '@castle-combo/shared';
import { roomManager } from '../managers/RoomManager.js';
import { gameManager } from '../managers/GameManager.js';

type TypedServer = Server<ClientToServerEvents, ServerToClientEvents>;
type TypedSocket = Socket<ClientToServerEvents, ServerToClientEvents>;

/**
 * Setup game event handlers
 */
export function setupGameHandlers(io: TypedServer, socket: TypedSocket): void {
  const userId = socket.data['userId'] as string;

  /**
   * Process player action
   */
  socket.on('player-action', (action: PlayerAction) => {
    const room = roomManager.getRoomByPlayerId(userId);
    if (!room) {
      socket.emit('error', 'Not in a room');
      return;
    }

    const game = gameManager.getGameByRoomId(room.id);
    if (!game) {
      socket.emit('error', 'No active game');
      return;
    }

    // Process action
    const result = gameManager.handleAction(game.id, userId, action);

    // Emit result to player
    socket.emit('action-result', result);

    if (result.success) {
      // Broadcast updated game state to all players
      const updatedGame = gameManager.getGame(game.id);
      if (updatedGame) {
        io.to(room.id).emit('game-state', updatedGame);

        // Check if game ended
        if (gameManager.isGameOver(game.id)) {
          const results = gameManager.getResults(game.id);
          if (results) {
            io.to(room.id).emit('game-ended', results);
            roomManager.endGame(room.id);
          }
        } else {
          // Emit turn changed
          io.to(room.id).emit('turn-changed', {
            currentPlayerId: updatedGame.players[updatedGame.currentPlayerIndex].id,
            turnPhase: updatedGame.turnPhase,
            turnNumber: updatedGame.turnNumber,
          });
        }
      }
    }
  });

  /**
   * Request current game state
   */
  socket.on('get-game-state', () => {
    const room = roomManager.getRoomByPlayerId(userId);
    if (!room) {
      socket.emit('error', 'Not in a room');
      return;
    }

    const game = gameManager.getGameByRoomId(room.id);
    if (!game) {
      socket.emit('error', 'No active game');
      return;
    }

    socket.emit('game-state', game);
  });
}
