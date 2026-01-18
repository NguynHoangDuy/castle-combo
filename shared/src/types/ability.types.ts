import type { CardType, ShieldColor } from './card.types.js';

/**
 * All ability types in Castle Combo (10 types)
 */
export type AbilityType =
  | 'none'              // No ability
  | 'gain_gold'         // Add gold (amount: number)
  | 'gain_keys'         // Add keys (amount: number)
  | 'gain_both'         // Add gold AND keys (gold: number, keys: number)
  | 'gain_gold_per_card'// Gold based on cards placed
  | 'discount'          // Reduce cost for next card (amount: number)
  | 'discount_type'     // Reduce cost for cardType (cardType, amount)
  | 'discount_shield'   // Reduce cost for cards with shield (shield, amount)
  | 'free_messenger'    // Free messenger move
  | 'view_deck';        // View top N cards (amount: number)

/**
 * Ability parameters for each type
 */
export interface AbilityParams {
  none: Record<string, never>;
  gain_gold: { amount: number };
  gain_keys: { amount: number };
  gain_both: { gold: number; keys: number };
  gain_gold_per_card: Record<string, never>;
  discount: { amount: number };
  discount_type: { cardType: CardType; amount: number };
  discount_shield: { shield: ShieldColor; amount: number };
  free_messenger: Record<string, never>;
  view_deck: { amount: number };
}

/**
 * Active discount effect on a player
 */
export interface ActiveDiscount {
  type: 'flat' | 'type' | 'shield';
  amount: number;
  cardType?: CardType;
  shield?: ShieldColor;
  turnsRemaining: number;
}
