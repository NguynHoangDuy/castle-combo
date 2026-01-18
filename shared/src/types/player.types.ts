import type { Card } from './card.types.js';
import type { ActiveDiscount } from './ability.types.js';

/**
 * Player's 3x3 tableau grid
 * null = empty slot, Card = placed card
 */
export type Tableau = (Card | null)[][];

/**
 * Player state during a game
 */
export interface PlayerState {
  id: string;
  username: string;
  gold: number;
  keys: number;
  tableau: Tableau;
  score: number;
  discounts: ActiveDiscount[];
  hand: Card | null;    // Card purchased but not yet placed
}

/**
 * Player in a room (before game starts)
 */
export interface RoomPlayer {
  id: string;
  odId: string;
  username: string;
  isReady: boolean;
  isHost: boolean;
  isConnected: boolean;
  joinedAt: number;
}

/**
 * Public player info (visible to opponents)
 */
export interface PublicPlayerInfo {
  id: string;
  username: string;
  gold: number;
  keys: number;
  tableau: Tableau;
  score: number;
  cardsPlaced: number;
  isConnected: boolean;
}

/**
 * Score breakdown for end-game display
 */
export interface ScoreBreakdown {
  playerId: string;
  username: string;
  cardScores: CardScore[];
  totalScore: number;
  remainingGold: number;
  remainingKeys: number;
}

/**
 * Individual card score details
 */
export interface CardScore {
  cardId: number;
  cardName: string;
  position: { row: number; col: number };
  scoringType: string;
  basePoints: number;
  bonusPoints: number;
  totalPoints: number;
  description: string;
}

/**
 * Create an empty 3x3 tableau
 */
export function createEmptyTableau(): Tableau {
  return [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];
}
