import type { Card, PlayerState, GameState, ActiveDiscount } from '@castle-combo/shared';
import { applyResourceAbility } from './resourceAbilities.js';
import { applyDiscountAbility } from './discountAbilities.js';
import { applySpecialAbility } from './specialAbilities.js';

/**
 * Result of applying an ability
 */
export interface AbilityResult {
  applied: boolean;
  goldChange: number;
  keysChange: number;
  description: string;
  specialEffect?: {
    type: string;
    data?: unknown;
  };
}

/**
 * Apply card ability
 */
export function applyAbility(
  card: Card,
  player: PlayerState,
  gameState: GameState
): AbilityResult {
  const ability = card.ability;

  // No ability
  if (ability.type === 'none') {
    return {
      applied: false,
      goldChange: 0,
      keysChange: 0,
      description: 'No ability',
    };
  }

  // Resource abilities
  if (isResourceAbility(ability.type)) {
    return applyResourceAbility(card, player, gameState);
  }

  // Discount abilities
  if (isDiscountAbility(ability.type)) {
    return applyDiscountAbility(card, player);
  }

  // Special abilities
  if (isSpecialAbility(ability.type)) {
    return applySpecialAbility(card, player, gameState);
  }

  return {
    applied: false,
    goldChange: 0,
    keysChange: 0,
    description: 'Unknown ability type',
  };
}

function isResourceAbility(type: string): boolean {
  return ['gain_gold', 'gain_keys', 'gain_both', 'gain_gold_per_card'].includes(type);
}

function isDiscountAbility(type: string): boolean {
  return ['discount', 'discount_type', 'discount_shield'].includes(type);
}

function isSpecialAbility(type: string): boolean {
  return ['free_messenger', 'view_deck'].includes(type);
}
