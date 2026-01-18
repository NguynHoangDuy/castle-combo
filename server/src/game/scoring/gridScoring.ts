import type { Card, Position, Tableau, ShieldColor } from '@castle-combo/shared';
import {
  getCornerCards,
  countCompleteRows,
  countCompleteColumns,
} from '../helpers/gridHelpers.js';

const CORNER_POSITIONS: Position[] = [
  { row: 0, col: 0 },
  { row: 0, col: 2 },
  { row: 2, col: 0 },
  { row: 2, col: 2 },
];

/**
 * Calculate grid-based scoring
 */
export function calculateGridScoring(
  card: Card,
  position: Position,
  tableau: Tableau
): { points: number; description: string } {
  const scoring = card.scoring;

  switch (scoring.type) {
    case 'corners_filled': {
      const cornerCards = getCornerCards(tableau);
      const filledCorners = cornerCards.length;
      const points = filledCorners * scoring.points;
      return {
        points,
        description: `+${scoring.points} per filled corner (${filledCorners} corners = ${points} pts)`,
      };
    }

    case 'all_corners': {
      const cornerCards = getCornerCards(tableau);
      if (cornerCards.length === 4) {
        return {
          points: scoring.points,
          description: `+${scoring.points} for all 4 corners filled`,
        };
      }
      return {
        points: 0,
        description: `Only ${cornerCards.length}/4 corners filled`,
      };
    }

    case 'corners_with_shield': {
      const targetShield = scoring.shield!;
      let count = 0;

      for (const pos of CORNER_POSITIONS) {
        const cornerCard = tableau[pos.row]?.[pos.col];
        if (cornerCard && cornerCard.shields.includes(targetShield)) {
          count++;
        }
      }

      const points = count * scoring.points;
      return {
        points,
        description: `+${scoring.points} per corner with ${targetShield} shield (${count} corners = ${points} pts)`,
      };
    }

    case 'complete_rows': {
      const completeRows = countCompleteRows(tableau);
      const points = completeRows * scoring.points;
      return {
        points,
        description: `+${scoring.points} per complete row (${completeRows} rows = ${points} pts)`,
      };
    }

    case 'complete_columns': {
      const completeCols = countCompleteColumns(tableau);
      const points = completeCols * scoring.points;
      return {
        points,
        description: `+${scoring.points} per complete column (${completeCols} columns = ${points} pts)`,
      };
    }

    default:
      return { points: 0, description: 'Unknown grid scoring' };
  }
}
