import type { Card, Tableau, ShieldColor } from '@castle-combo/shared';
import { getAllTableauCards } from '../helpers/gridHelpers.js';

const ALL_SHIELDS: ShieldColor[] = ['blue', 'purple', 'green', 'red', 'orange', 'yellow'];

/**
 * Calculate shield-based scoring
 */
export function calculateShieldScoring(
  card: Card,
  tableau: Tableau
): { points: number; description: string } {
  const scoring = card.scoring;
  const allCards = getAllTableauCards(tableau);

  switch (scoring.type) {
    case 'per_shield': {
      const targetShield = scoring.shield!;
      let shieldCount = 0;
      for (const c of allCards) {
        shieldCount += c.shields.filter(s => s === targetShield).length;
      }
      const points = shieldCount * scoring.points;
      return {
        points,
        description: `+${scoring.points} per ${targetShield} shield (${shieldCount} shields = ${points} pts)`,
      };
    }

    case 'threshold': {
      const targetShield = scoring.shield!;
      const minimum = scoring.minimum!;
      let shieldCount = 0;
      for (const c of allCards) {
        shieldCount += c.shields.filter(s => s === targetShield).length;
      }
      if (shieldCount >= minimum) {
        return {
          points: scoring.points,
          description: `+${scoring.points} for having ${minimum}+ ${targetShield} shields (${shieldCount} shields)`,
        };
      }
      return {
        points: 0,
        description: `Need ${minimum} ${targetShield} shields, have ${shieldCount}`,
      };
    }

    case 'no_shield': {
      const targetShield = scoring.shield!;
      let shieldCount = 0;
      for (const c of allCards) {
        shieldCount += c.shields.filter(s => s === targetShield).length;
      }
      if (shieldCount === 0) {
        return {
          points: scoring.points,
          description: `+${scoring.points} for having no ${targetShield} shields`,
        };
      }
      return {
        points: 0,
        description: `Has ${shieldCount} ${targetShield} shields (need 0)`,
      };
    }

    case 'all_six_shields': {
      const uniqueShields = new Set<ShieldColor>();
      for (const c of allCards) {
        for (const shield of c.shields) {
          uniqueShields.add(shield);
        }
      }
      if (uniqueShields.size === 6) {
        return {
          points: scoring.points,
          description: `+${scoring.points} for having all 6 shield colors`,
        };
      }
      return {
        points: 0,
        description: `Have ${uniqueShields.size}/6 shield colors`,
      };
    }

    default:
      return { points: 0, description: 'Unknown shield scoring' };
  }
}

/**
 * Count shields of a specific color in tableau
 */
export function countShieldsOfColor(tableau: Tableau, color: ShieldColor): number {
  const allCards = getAllTableauCards(tableau);
  let count = 0;
  for (const card of allCards) {
    count += card.shields.filter(s => s === color).length;
  }
  return count;
}

/**
 * Get unique shield colors in tableau
 */
export function getUniqueShields(tableau: Tableau): Set<ShieldColor> {
  const allCards = getAllTableauCards(tableau);
  const uniqueShields = new Set<ShieldColor>();
  for (const card of allCards) {
    for (const shield of card.shields) {
      uniqueShields.add(shield);
    }
  }
  return uniqueShields;
}
