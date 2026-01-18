import type { Card, Position, Tableau, CardType, CardCategory, ShieldColor } from '@castle-combo/shared';
import { getAllTableauCards, getAdjacentCards } from '../helpers/gridHelpers.js';

/**
 * Calculate type/category-based scoring
 */
export function calculateTypeScoring(
  card: Card,
  position: Position,
  tableau: Tableau
): { points: number; description: string } {
  const scoring = card.scoring;
  const { row, col } = position;

  switch (scoring.type) {
    case 'per_type': {
      const targetType = scoring.cardType!;
      const allCards = getAllTableauCards(tableau);
      const count = allCards.filter(c => c.type === targetType).length;
      const points = count * scoring.points;
      return {
        points,
        description: `+${scoring.points} per ${targetType} card (${count} cards = ${points} pts)`,
      };
    }

    case 'per_category': {
      const targetCategory = scoring.category!;
      const allCards = getAllTableauCards(tableau);
      const count = allCards.filter(c => c.category === targetCategory).length;
      const points = count * scoring.points;
      return {
        points,
        description: `+${scoring.points} per ${targetCategory} (${count} cards = ${points} pts)`,
      };
    }

    case 'per_type_category': {
      const targetType = scoring.cardType!;
      const targetCategory = scoring.category!;
      const allCards = getAllTableauCards(tableau);
      const count = allCards.filter(c => c.type === targetType && c.category === targetCategory).length;
      const points = count * scoring.points;
      return {
        points,
        description: `+${scoring.points} per ${targetType} ${targetCategory} (${count} cards = ${points} pts)`,
      };
    }

    case 'per_type_with_shield': {
      const targetType = scoring.cardType!;
      const targetShield = scoring.shield!;
      const allCards = getAllTableauCards(tableau);
      const count = allCards.filter(c => c.type === targetType && c.shields.includes(targetShield)).length;
      const points = count * scoring.points;
      return {
        points,
        description: `+${scoring.points} per ${targetType} with ${targetShield} shield (${count} cards = ${points} pts)`,
      };
    }

    case 'adjacent_type': {
      const targetType = scoring.cardType!;
      const adjacentCards = getAdjacentCards(tableau, row, col);
      const count = adjacentCards.filter(c => c.type === targetType).length;
      const points = count * scoring.points;
      return {
        points,
        description: `+${scoring.points} per adjacent ${targetType} (${count} cards = ${points} pts)`,
      };
    }

    case 'adjacent_category': {
      const targetCategory = scoring.category!;
      const adjacentCards = getAdjacentCards(tableau, row, col);
      const count = adjacentCards.filter(c => c.category === targetCategory).length;
      const points = count * scoring.points;
      return {
        points,
        description: `+${scoring.points} per adjacent ${targetCategory} (${count} cards = ${points} pts)`,
      };
    }

    case 'adjacent_shield': {
      const targetShield = scoring.shield!;
      const adjacentCards = getAdjacentCards(tableau, row, col);
      const count = adjacentCards.filter(c => c.shields.includes(targetShield)).length;
      const points = count * scoring.points;
      return {
        points,
        description: `+${scoring.points} per adjacent card with ${targetShield} (${count} cards = ${points} pts)`,
      };
    }

    case 'adjacent_card_name': {
      const targetName = scoring.name!;
      const adjacentCards = getAdjacentCards(tableau, row, col);
      const hasTarget = adjacentCards.some(c => c.name === targetName);
      if (hasTarget) {
        return {
          points: scoring.points,
          description: `+${scoring.points} for being adjacent to ${targetName}`,
        };
      }
      return {
        points: 0,
        description: `Not adjacent to ${targetName}`,
      };
    }

    default:
      return { points: 0, description: 'Unknown type scoring' };
  }
}
