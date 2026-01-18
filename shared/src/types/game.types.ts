import type { Card } from './card.types.js';
import type { PlayerState } from './player.types.js';

/**
 * Game phase
 */
export type GamePhase = 'setup' | 'playing' | 'ended';

/**
 * Turn phase within a player's turn
 */
export type TurnPhase = 'optional_actions' | 'buy_card' | 'place_card';

/**
 * Position on the 3x3 tableau grid
 */
export interface Position {
  row: number;  // 0, 1, or 2
  col: number;  // 0, 1, or 2
}

/**
 * Market state - two rows of cards
 * Row 1 = Village cards, Row 2 = Castle cards
 */
export interface Market {
  row1: Card[];       // Village cards
  row2: Card[];       // Castle cards
  messengerRow: 1 | 2;
}

/**
 * Complete game state
 */
export interface GameState {
  id: string;
  roomId: string;
  phase: GamePhase;
  turnPhase: TurnPhase;
  currentPlayerIndex: number;
  players: PlayerState[];
  market: Market;
  villageDeck: Card[];   // Remaining village cards
  castleDeck: Card[];    // Remaining castle cards
  discardPile: Card[];
  turnNumber: number;
  createdAt: number;
  updatedAt: number;
}

/**
 * Game configuration options
 */
export interface GameConfig {
  startingGold: number;      // Default: 3
  startingKeys: number;      // Default: 1
  marketRowSize: number;     // Default: 4
  tableauSize: number;       // Default: 3 (3x3 grid)
}

/**
 * Default game configuration
 */
export const DEFAULT_GAME_CONFIG: GameConfig = {
  startingGold: 3,
  startingKeys: 1,
  marketRowSize: 4,
  tableauSize: 3,
};

/**
 * Grid helper constants
 */
export const CORNER_POSITIONS: Position[] = [
  { row: 0, col: 0 },
  { row: 0, col: 2 },
  { row: 2, col: 0 },
  { row: 2, col: 2 },
];

export const EDGE_POSITIONS: Position[] = [
  { row: 0, col: 1 },
  { row: 1, col: 0 },
  { row: 1, col: 2 },
  { row: 2, col: 1 },
];

export const CENTER_POSITION: Position = { row: 1, col: 1 };

export const ALL_POSITIONS: Position[] = [
  { row: 0, col: 0 }, { row: 0, col: 1 }, { row: 0, col: 2 },
  { row: 1, col: 0 }, { row: 1, col: 1 }, { row: 1, col: 2 },
  { row: 2, col: 0 }, { row: 2, col: 1 }, { row: 2, col: 2 },
];
