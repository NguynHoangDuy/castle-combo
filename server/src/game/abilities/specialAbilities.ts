import type { Card, PlayerState, GameState } from '@castle-combo/shared';
import type { AbilityResult } from './index.js';

/**
 * Apply special abilities
 */
export function applySpecialAbility(
  card: Card,
  player: PlayerState,
  gameState: GameState
): AbilityResult {
  const ability = card.ability;

  switch (ability.type) {
    case 'free_messenger': {
      return {
        applied: true,
        goldChange: 0,
        keysChange: 0,
        description: 'Free messenger move available',
        specialEffect: {
          type: 'free_messenger',
        },
      };
    }

    case 'view_deck': {
      const amount = ability.amount || 3;
      const topCards = gameState.deck.slice(0, amount);
      return {
        applied: true,
        goldChange: 0,
        keysChange: 0,
        description: `View top ${amount} cards of deck`,
        specialEffect: {
          type: 'view_deck',
          data: topCards,
        },
      };
    }

    default:
      return {
        applied: false,
        goldChange: 0,
        keysChange: 0,
        description: 'Unknown special ability',
      };
  }
}
