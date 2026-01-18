import type { Card, Tableau, ShieldColor } from '@castle-combo/shared';
import { getAllTableauCards } from '../helpers/gridHelpers.js';

/**
 * Calculate set collection scoring
 */
export function calculateSetScoring(
  card: Card,
  tableau: Tableau
): { points: number; description: string } {
  const scoring = card.scoring;
  const allCards = getAllTableauCards(tableau);

  switch (scoring.type) {
    case 'set_collection': {
      const requiredShields = scoring.shields!;
      const availableShields = new Set<ShieldColor>();
      for (const c of allCards) {
        for (const shield of c.shields) {
          availableShields.add(shield);
        }
      }
      const hasAll = requiredShields.every(s => availableShields.has(s));
      if (hasAll) {
        return {
          points: scoring.points,
          description: `+${scoring.points} for having ${requiredShields.join(', ')} shields`,
        };
      }
      const missing = requiredShields.filter(s => !availableShields.has(s));
      return {
        points: 0,
        description: `Missing shields: ${missing.join(', ')}`,
      };
    }

    case 'same_shield_set': {
      const requiredCount = scoring.count!;
      const shieldCounts = new Map<ShieldColor, number>();
      for (const c of allCards) {
        for (const shield of c.shields) {
          shieldCounts.set(shield, (shieldCounts.get(shield) || 0) + 1);
        }
      }
      // Find shields with enough count
      let setsFound = 0;
      for (const count of shieldCounts.values()) {
        if (count >= requiredCount) {
          setsFound++;
        }
      }
      const points = setsFound * scoring.points;
      return {
        points,
        description: `+${scoring.points} per set of ${requiredCount}+ same shields (${setsFound} sets = ${points} pts)`,
      };
    }

    case 'unique_shields': {
      const uniqueShields = new Set<ShieldColor>();
      for (const c of allCards) {
        for (const shield of c.shields) {
          uniqueShields.add(shield);
        }
      }
      if (scoring.perColor) {
        const points = uniqueShields.size * scoring.points;
        return {
          points,
          description: `+${scoring.points} per unique shield color (${uniqueShields.size} colors = ${points} pts)`,
        };
      }
      // Minimum unique shields bonus
      const minimum = scoring.minimum || 1;
      if (uniqueShields.size >= minimum) {
        return {
          points: scoring.points,
          description: `+${scoring.points} for having ${minimum}+ unique shield colors (${uniqueShields.size} colors)`,
        };
      }
      return {
        points: 0,
        description: `Have ${uniqueShields.size}/${minimum} unique shield colors`,
      };
    }

    case 'no_duplicates': {
      const cardNames = allCards.map(c => c.name);
      const uniqueNames = new Set(cardNames);
      if (uniqueNames.size === cardNames.length) {
        return {
          points: scoring.points,
          description: `+${scoring.points} for having all unique card names`,
        };
      }
      return {
        points: 0,
        description: 'Has duplicate card names',
      };
    }

    case 'unique_card_names': {
      const cardNames = allCards.map(c => c.name);
      const uniqueNames = new Set(cardNames);
      const points = uniqueNames.size * scoring.points;
      return {
        points,
        description: `+${scoring.points} per unique card name (${uniqueNames.size} names = ${points} pts)`,
      };
    }

    default:
      return { points: 0, description: 'Unknown set scoring' };
  }
}
