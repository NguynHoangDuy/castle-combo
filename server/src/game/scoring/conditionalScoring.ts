import type { Card, Position, Tableau, CardType, CardCategory } from '@castle-combo/shared';
import { getAdjacentCards, getAllTableauCards } from '../helpers/gridHelpers.js';

/**
 * Calculate conditional scoring
 */
export function calculateConditionalScoring(
  card: Card,
  position: Position,
  tableau: Tableau
): { points: number; description: string } {
  const scoring = card.scoring;
  const { row, col } = position;

  switch (scoring.type) {
    case 'no_adjacent_type': {
      const targetType = scoring.cardType!;
      const adjacentCards = getAdjacentCards(tableau, row, col);
      const hasTargetType = adjacentCards.some(c => c.type === targetType);
      if (!hasTargetType) {
        return {
          points: scoring.points,
          description: `+${scoring.points} for no adjacent ${targetType} cards`,
        };
      }
      return {
        points: 0,
        description: `Has adjacent ${targetType} cards`,
      };
    }

    case 'no_adjacent_category': {
      const targetCategory = scoring.category!;
      const adjacentCards = getAdjacentCards(tableau, row, col);
      const hasTargetCategory = adjacentCards.some(c => c.category === targetCategory);
      if (!hasTargetCategory) {
        return {
          points: scoring.points,
          description: `+${scoring.points} for no adjacent ${targetCategory} cards`,
        };
      }
      return {
        points: 0,
        description: `Has adjacent ${targetCategory} cards`,
      };
    }

    case 'majority_type': {
      const allCards = getAllTableauCards(tableau);
      const typeCounts = new Map<CardType, number>();

      for (const c of allCards) {
        typeCounts.set(c.type, (typeCounts.get(c.type) || 0) + 1);
      }

      // Find majority type
      let majorityType: CardType | null = null;
      let maxCount = 0;
      for (const [type, count] of typeCounts) {
        if (count > maxCount) {
          maxCount = count;
          majorityType = type;
        }
      }

      if (majorityType) {
        const points = maxCount * scoring.points;
        return {
          points,
          description: `+${scoring.points} per ${majorityType} (majority type: ${maxCount} cards = ${points} pts)`,
        };
      }

      return {
        points: 0,
        description: 'No majority type',
      };
    }

    default:
      return { points: 0, description: 'Unknown conditional scoring' };
  }
}
