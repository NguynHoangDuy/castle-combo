import type { Card, Position, Tableau, PlayerState } from '@castle-combo/shared';
import { getAllTableauCards, isEdge } from '../helpers/gridHelpers.js';

/**
 * Calculate special scoring types
 */
export function calculateSpecialScoring(
  card: Card,
  position: Position,
  tableau: Tableau,
  player: PlayerState
): { points: number; description: string } {
  const scoring = card.scoring;
  const { row, col } = position;

  switch (scoring.type) {
    case 'per_remaining_gold': {
      const divisor = scoring.divisor || 1;
      const goldSets = Math.floor(player.gold / divisor);
      const points = goldSets * scoring.points;
      return {
        points,
        description: `+${scoring.points} per ${divisor} gold (${player.gold} gold = ${points} pts)`,
      };
    }

    case 'double_shield_cards': {
      const allCards = getAllTableauCards(tableau);
      const doubleShieldCount = allCards.filter(c => c.shields.length === 2).length;
      const points = doubleShieldCount * scoring.points;
      return {
        points,
        description: `+${scoring.points} per card with 2 shields (${doubleShieldCount} cards = ${points} pts)`,
      };
    }

    case 'per_card_in_grid': {
      const allCards = getAllTableauCards(tableau);
      const count = allCards.length;
      const points = count * scoring.points;
      return {
        points,
        description: `+${scoring.points} per card in grid (${count} cards = ${points} pts)`,
      };
    }

    case 'negative': {
      return {
        points: scoring.points, // Already negative in card data
        description: `${scoring.points} points (penalty)`,
      };
    }

    default:
      return { points: 0, description: 'Unknown special scoring' };
  }
}
