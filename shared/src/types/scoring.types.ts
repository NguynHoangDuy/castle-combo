import type { CardCategory, CardType, ShieldColor } from './card.types.js';

/**
 * All scoring types in Castle Combo (38 types)
 */
export type ScoringType =
  // Shield-based scoring
  | 'per_shield'           // +N pts per shield of color X in tableau
  | 'threshold'            // +N pts if you have ≥X shields of color
  | 'no_shield'            // +N pts if you have 0 shields of color X
  | 'all_six_shields'      // +N pts if you have all 6 shield colors

  // Position-based scoring
  | 'per_adjacent'         // +N pts per orthogonally adjacent card
  | 'per_row'              // +N pts per card in same row
  | 'per_column'           // +N pts per card in same column
  | 'per_diagonal'         // +N pts per diagonally adjacent card
  | 'per_corner'           // +N pts if this card is in a corner
  | 'per_edge'             // +N pts if this card is on an edge
  | 'center_position'      // +N pts if this card is in center (1,1)
  | 'specific_row'         // +N pts if this card is in row X
  | 'specific_column'      // +N pts if this card is in column X

  // Type/Category-based scoring
  | 'per_type'             // +N pts per card of type (castle/village)
  | 'per_category'         // +N pts per card of category
  | 'per_type_category'    // +N pts per card matching both type AND category
  | 'per_type_with_shield' // +N pts per card of type that has shield X
  | 'adjacent_type'        // +N pts per adjacent card of type X
  | 'adjacent_category'    // +N pts per adjacent card of category X
  | 'adjacent_shield'      // +N pts per adjacent card with shield X
  | 'adjacent_card_name'   // +N pts if adjacent to specific named card

  // Set collection scoring
  | 'set_collection'       // +N pts if you have cards with all specified shields
  | 'same_shield_set'      // +N pts for having X cards with same shield
  | 'unique_shields'       // +N pts per unique shield color (or perColor mode)
  | 'no_duplicates'        // +N pts if all cards have unique names
  | 'unique_card_names'    // +N pts per unique card name

  // Conditional scoring
  | 'no_adjacent_type'     // +N pts if no adjacent cards of type X
  | 'no_adjacent_category' // +N pts if no adjacent cards of category X
  | 'majority_type'        // +N pts per card of your majority type

  // Grid-based scoring
  | 'corners_filled'       // +N pts per corner position filled
  | 'all_corners'          // +N pts if all 4 corners are filled
  | 'corners_with_shield'  // +N pts per corner card with shield X
  | 'complete_rows'        // +N pts per complete row (3 cards)
  | 'complete_columns'     // +N pts per complete column (3 cards)

  // Special scoring
  | 'per_remaining_gold'   // +N pts per X remaining gold
  | 'double_shield_cards'  // +N pts per card with 2 shields
  | 'per_card_in_grid'     // +N pts per card in your tableau
  | 'negative';            // -N pts (penalty card)

/**
 * Scoring parameters for detailed type checking
 */
export interface ScoringParams {
  per_shield: { shield: ShieldColor; points: number };
  threshold: { shield: ShieldColor; minimum: number; points: number };
  no_shield: { shield: ShieldColor; points: number };
  all_six_shields: { points: number };
  per_adjacent: { points: number };
  per_row: { points: number };
  per_column: { points: number };
  per_diagonal: { points: number };
  per_corner: { points: number };
  per_edge: { points: number };
  center_position: { points: number };
  specific_row: { row: number; points: number };
  specific_column: { column: number; points: number };
  per_type: { cardType: CardType; points: number };
  per_category: { category: CardCategory; points: number };
  per_type_category: { cardType: CardType; category: CardCategory; points: number };
  per_type_with_shield: { cardType: CardType; shield: ShieldColor; points: number };
  adjacent_type: { cardType: CardType; points: number };
  adjacent_category: { category: CardCategory; points: number };
  adjacent_shield: { shield: ShieldColor; points: number };
  adjacent_card_name: { name: string; points: number };
  set_collection: { shields: ShieldColor[]; points: number };
  same_shield_set: { count: number; points: number };
  unique_shields: { points: number; perColor?: boolean };
  no_duplicates: { points: number };
  unique_card_names: { points: number };
  no_adjacent_type: { cardType: CardType; points: number };
  no_adjacent_category: { category: CardCategory; points: number };
  majority_type: { points: number };
  corners_filled: { points: number };
  all_corners: { points: number };
  corners_with_shield: { shield: ShieldColor; points: number };
  complete_rows: { points: number };
  complete_columns: { points: number };
  per_remaining_gold: { divisor: number; points: number };
  double_shield_cards: { points: number };
  per_card_in_grid: { points: number };
  negative: { points: number };
}
