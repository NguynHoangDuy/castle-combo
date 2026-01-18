import type { Card, PlayerState, ActiveDiscount } from '@castle-combo/shared';
import type { AbilityResult } from './index.js';

/**
 * Apply discount abilities
 */
export function applyDiscountAbility(
  card: Card,
  player: PlayerState
): AbilityResult {
  const ability = card.ability;

  switch (ability.type) {
    case 'discount': {
      const amount = ability.amount || 1;
      const discount: ActiveDiscount = {
        type: 'all',
        amount,
        sourceCardId: card.id,
      };
      player.discounts.push(discount);
      return {
        applied: true,
        goldChange: 0,
        keysChange: 0,
        description: `-${amount} cost on all cards`,
      };
    }

    case 'discount_type': {
      const targetType = ability.cardType!;
      const amount = ability.amount || 1;
      const discount: ActiveDiscount = {
        type: 'cardType',
        cardType: targetType,
        amount,
        sourceCardId: card.id,
      };
      player.discounts.push(discount);
      return {
        applied: true,
        goldChange: 0,
        keysChange: 0,
        description: `-${amount} cost on ${targetType} cards`,
      };
    }

    case 'discount_shield': {
      const targetShield = ability.shield!;
      const amount = ability.amount || 1;
      const discount: ActiveDiscount = {
        type: 'shield',
        shield: targetShield,
        amount,
        sourceCardId: card.id,
      };
      player.discounts.push(discount);
      return {
        applied: true,
        goldChange: 0,
        keysChange: 0,
        description: `-${amount} cost on cards with ${targetShield} shield`,
      };
    }

    default:
      return {
        applied: false,
        goldChange: 0,
        keysChange: 0,
        description: 'Unknown discount ability',
      };
  }
}
