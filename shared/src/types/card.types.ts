/**
 * Shield colors used in Castle Combo
 */
export type ShieldColor = 'blue' | 'purple' | 'green' | 'red' | 'orange' | 'yellow';

/**
 * Card type - Castle or Village
 */
export type CardType = 'castle' | 'village';

/**
 * Castle card categories
 */
export type CastleCategory = 'royalty' | 'military' | 'clergy' | 'nobility' | 'staff' | 'advisor';

/**
 * Village card categories
 */
export type VillageCategory = 'farmer' | 'craftsman' | 'merchant' | 'warrior' | 'commoner';

/**
 * All card categories
 */
export type CardCategory = CastleCategory | VillageCategory;

/**
 * Shield color metadata
 */
export interface ShieldColorInfo {
  name: string;
  hex: string;
}

/**
 * Card definition from cards.json
 */
export interface Card {
  id: number;
  name: string;
  type: CardType;
  category: CardCategory;
  cost: number;
  shields: ShieldColor[];
  ability: CardAbility;
  scoring: CardScoring;
  image: string;
  description: string;
}

/**
 * Card ability types - see ability.types.ts for details
 */
export interface CardAbility {
  type: AbilityType;
  amount?: number;
  gold?: number;
  keys?: number;
  cardType?: CardType;
  shield?: ShieldColor;
}

/**
 * Card scoring types - see scoring.types.ts for details
 */
export interface CardScoring {
  type: ScoringType;
  points: number;
  shield?: ShieldColor;
  shields?: ShieldColor[];
  cardType?: CardType;
  category?: CardCategory;
  name?: string;
  minimum?: number;
  count?: number;
  divisor?: number;
  row?: number;
  column?: number;
  perColor?: boolean;
}

// Re-export ability and scoring types
import type { AbilityType } from './ability.types.js';
import type { ScoringType } from './scoring.types.js';
export type { AbilityType, ScoringType };
