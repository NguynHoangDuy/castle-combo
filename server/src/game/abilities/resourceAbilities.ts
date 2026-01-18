import type { Card, PlayerState, GameState } from '@castle-combo/shared';
import type { AbilityResult } from './index.js';
import { countFilledPositions } from '../helpers/gridHelpers.js';

/**
 * Apply resource-gaining abilities
 */
export function applyResourceAbility(
  card: Card,
  player: PlayerState,
  gameState: GameState
): AbilityResult {
  const ability = card.ability;

  switch (ability.type) {
    case 'gain_gold': {
      const amount = ability.amount || 0;
      player.gold += amount;
      return {
        applied: true,
        goldChange: amount,
        keysChange: 0,
        description: `+${amount} gold`,
      };
    }

    case 'gain_keys': {
      const amount = ability.amount || 0;
      player.keys += amount;
      return {
        applied: true,
        goldChange: 0,
        keysChange: amount,
        description: `+${amount} keys`,
      };
    }

    case 'gain_both': {
      const goldAmount = ability.gold || 0;
      const keysAmount = ability.keys || 0;
      player.gold += goldAmount;
      player.keys += keysAmount;
      return {
        applied: true,
        goldChange: goldAmount,
        keysChange: keysAmount,
        description: `+${goldAmount} gold, +${keysAmount} keys`,
      };
    }

    case 'gain_gold_per_card': {
      // Gain 1 gold per card already in tableau (before this one)
      const cardCount = countFilledPositions(player.tableau);
      player.gold += cardCount;
      return {
        applied: true,
        goldChange: cardCount,
        keysChange: 0,
        description: `+${cardCount} gold (1 per card in tableau)`,
      };
    }

    default:
      return {
        applied: false,
        goldChange: 0,
        keysChange: 0,
        description: 'Unknown resource ability',
      };
  }
}
