import type { Position } from './game.types.js';
import type { Card } from './card.types.js';

/**
 * Player action types
 */
export type ActionType =
  | 'move_messenger'   // Move messenger to other row (costs 1 key)
  | 'refresh_row'      // Refresh market row (costs 1 key)
  | 'buy_card'         // Buy card from market
  | 'place_card'       // Place card in tableau
  | 'end_optional'     // End optional actions phase
  | 'view_deck_done';  // Acknowledge viewing deck cards

/**
 * Player action
 */
export interface PlayerAction {
  type: ActionType;
  cardId?: number;       // For buy_card
  position?: Position;   // For place_card
}

/**
 * Move messenger action
 */
export interface MoveMessengerAction {
  type: 'move_messenger';
}

/**
 * Refresh row action
 */
export interface RefreshRowAction {
  type: 'refresh_row';
}

/**
 * Buy card action
 */
export interface BuyCardAction {
  type: 'buy_card';
  cardId: number;
}

/**
 * Place card action
 */
export interface PlaceCardAction {
  type: 'place_card';
  cardId: number;
  position: Position;
}

/**
 * End optional actions
 */
export interface EndOptionalAction {
  type: 'end_optional';
}

/**
 * Action result from server
 */
export interface ActionResult {
  success: boolean;
  action: ActionType;
  error?: string;
  details?: ActionDetails;
}

/**
 * Details about action result
 */
export interface ActionDetails {
  // Resource changes
  goldChange?: number;
  keysChange?: number;

  // Card bought
  cardBought?: Card;
  goldPaid?: number;

  // Card placed
  cardPlaced?: Card;
  position?: Position;

  // Ability triggered
  abilityTriggered?: string;
  abilityEffect?: string;

  // Score change
  scoreChange?: number;

  // Market changes
  marketRefreshed?: boolean;
  messengerMoved?: boolean;
  newMessengerRow?: 1 | 2;

  // Next phase
  nextPhase?: string;

  // Game over
  gameEnded?: boolean;
}

/**
 * Validation result for action
 */
export interface ActionValidation {
  valid: boolean;
  error?: string;
}
