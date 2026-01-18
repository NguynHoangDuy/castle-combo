import type { GameState, PlayerAction, ActionResult } from '@castle-combo/shared';
import { createGameState, processAction, getGameResults, isGameEnded } from '../../game/GameEngine.js';

/**
 * Player info for creating games
 */
interface PlayerInfo {
  id: string;
  username: string;
}

/**
 * In-memory game storage
 */
class GameManager {
  private games: Map<string, GameState> = new Map();
  private roomToGame: Map<string, string> = new Map();

  /**
   * Create a new game
   */
  createGame(roomId: string, players: PlayerInfo[]): GameState {
    const gameState = createGameState(roomId, players);
    this.games.set(gameState.id, gameState);
    this.roomToGame.set(roomId, gameState.id);
    return gameState;
  }

  /**
   * Get game by ID
   */
  getGame(gameId: string): GameState | undefined {
    return this.games.get(gameId);
  }

  /**
   * Get game by room ID
   */
  getGameByRoomId(roomId: string): GameState | undefined {
    const gameId = this.roomToGame.get(roomId);
    if (!gameId) return undefined;
    return this.games.get(gameId);
  }

  /**
   * Process player action
   */
  handleAction(gameId: string, playerId: string, action: PlayerAction): ActionResult {
    const game = this.games.get(gameId);

    if (!game) {
      return {
        success: false,
        action: action.type,
        error: 'Game not found',
      };
    }

    return processAction(game, playerId, action);
  }

  /**
   * Check if game has ended
   */
  isGameOver(gameId: string): boolean {
    const game = this.games.get(gameId);
    return game ? isGameEnded(game) : false;
  }

  /**
   * Get game results
   */
  getResults(gameId: string) {
    const game = this.games.get(gameId);
    if (!game) return null;
    return getGameResults(game);
  }

  /**
   * Delete game
   */
  deleteGame(gameId: string): boolean {
    const game = this.games.get(gameId);
    if (game) {
      this.roomToGame.delete(game.roomId);
    }
    return this.games.delete(gameId);
  }

  /**
   * Get game ID by room ID
   */
  getGameIdByRoomId(roomId: string): string | undefined {
    return this.roomToGame.get(roomId);
  }
}

// Export singleton instance
export const gameManager = new GameManager();
