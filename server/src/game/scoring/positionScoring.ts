import type { Card, Position, Tableau } from '@castle-combo/shared';
import {
  getAdjacentCards,
  getDiagonalCards,
  getRowCards,
  getColumnCards,
  isCorner,
  isEdge,
  isCenter,
} from '../helpers/gridHelpers.js';

/**
 * Calculate position-based scoring
 */
export function calculatePositionScoring(
  card: Card,
  position: Position,
  tableau: Tableau
): { points: number; description: string } {
  const scoring = card.scoring;
  const { row, col } = position;

  switch (scoring.type) {
    case 'per_adjacent': {
      const adjacentCards = getAdjacentCards(tableau, row, col);
      const count = adjacentCards.length;
      const points = count * scoring.points;
      return {
        points,
        description: `+${scoring.points} per adjacent card (${count} cards = ${points} pts)`,
      };
    }

    case 'per_row': {
      const rowCards = getRowCards(tableau, row);
      // Exclude self from count
      const count = rowCards.filter(c => c.id !== card.id).length;
      const points = count * scoring.points;
      return {
        points,
        description: `+${scoring.points} per card in row (${count} cards = ${points} pts)`,
      };
    }

    case 'per_column': {
      const columnCards = getColumnCards(tableau, col);
      // Exclude self from count
      const count = columnCards.filter(c => c.id !== card.id).length;
      const points = count * scoring.points;
      return {
        points,
        description: `+${scoring.points} per card in column (${count} cards = ${points} pts)`,
      };
    }

    case 'per_diagonal': {
      const diagonalCards = getDiagonalCards(tableau, row, col);
      const count = diagonalCards.length;
      const points = count * scoring.points;
      return {
        points,
        description: `+${scoring.points} per diagonal card (${count} cards = ${points} pts)`,
      };
    }

    case 'per_corner': {
      if (isCorner(row, col)) {
        return {
          points: scoring.points,
          description: `+${scoring.points} for being in a corner`,
        };
      }
      return {
        points: 0,
        description: 'Not in a corner position',
      };
    }

    case 'per_edge': {
      if (isEdge(row, col)) {
        return {
          points: scoring.points,
          description: `+${scoring.points} for being on an edge`,
        };
      }
      return {
        points: 0,
        description: 'Not on an edge position',
      };
    }

    case 'center_position': {
      if (isCenter(row, col)) {
        return {
          points: scoring.points,
          description: `+${scoring.points} for being in center`,
        };
      }
      return {
        points: 0,
        description: 'Not in center position',
      };
    }

    case 'specific_row': {
      const targetRow = scoring.row!;
      if (row === targetRow) {
        return {
          points: scoring.points,
          description: `+${scoring.points} for being in row ${targetRow}`,
        };
      }
      return {
        points: 0,
        description: `Not in row ${targetRow}`,
      };
    }

    case 'specific_column': {
      const targetColumn = scoring.column!;
      if (col === targetColumn) {
        return {
          points: scoring.points,
          description: `+${scoring.points} for being in column ${targetColumn}`,
        };
      }
      return {
        points: 0,
        description: `Not in column ${targetColumn}`,
      };
    }

    default:
      return { points: 0, description: 'Unknown position scoring' };
  }
}
