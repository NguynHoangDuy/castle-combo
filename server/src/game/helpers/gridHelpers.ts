import type { Position, Card, Tableau } from '@castle-combo/shared';

/**
 * Get orthogonally adjacent positions (up, down, left, right)
 */
export function getAdjacentPositions(row: number, col: number): Position[] {
  const positions: Position[] = [];
  const directions = [
    { row: -1, col: 0 },  // Up
    { row: 1, col: 0 },   // Down
    { row: 0, col: -1 },  // Left
    { row: 0, col: 1 },   // Right
  ];

  for (const dir of directions) {
    const newRow = row + dir.row;
    const newCol = col + dir.col;
    if (newRow >= 0 && newRow < 3 && newCol >= 0 && newCol < 3) {
      positions.push({ row: newRow, col: newCol });
    }
  }

  return positions;
}

/**
 * Get diagonally adjacent positions
 */
export function getDiagonalPositions(row: number, col: number): Position[] {
  const positions: Position[] = [];
  const directions = [
    { row: -1, col: -1 },  // Top-left
    { row: -1, col: 1 },   // Top-right
    { row: 1, col: -1 },   // Bottom-left
    { row: 1, col: 1 },    // Bottom-right
  ];

  for (const dir of directions) {
    const newRow = row + dir.row;
    const newCol = col + dir.col;
    if (newRow >= 0 && newRow < 3 && newCol >= 0 && newCol < 3) {
      positions.push({ row: newRow, col: newCol });
    }
  }

  return positions;
}

/**
 * Get all positions in a row
 */
export function getRowPositions(row: number): Position[] {
  return [
    { row, col: 0 },
    { row, col: 1 },
    { row, col: 2 },
  ];
}

/**
 * Get all positions in a column
 */
export function getColumnPositions(col: number): Position[] {
  return [
    { row: 0, col },
    { row: 1, col },
    { row: 2, col },
  ];
}

/**
 * Check if position is a corner
 */
export function isCorner(row: number, col: number): boolean {
  return (row === 0 || row === 2) && (col === 0 || col === 2);
}

/**
 * Check if position is an edge (but not corner)
 */
export function isEdge(row: number, col: number): boolean {
  return (row === 0 || row === 2 || col === 0 || col === 2) && !isCorner(row, col);
}

/**
 * Check if position is the center
 */
export function isCenter(row: number, col: number): boolean {
  return row === 1 && col === 1;
}

/**
 * Get cards at specified positions from tableau
 */
export function getCardsAtPositions(tableau: Tableau, positions: Position[]): Card[] {
  const cards: Card[] = [];
  for (const pos of positions) {
    const card = tableau[pos.row]?.[pos.col];
    if (card) {
      cards.push(card);
    }
  }
  return cards;
}

/**
 * Get adjacent cards
 */
export function getAdjacentCards(tableau: Tableau, row: number, col: number): Card[] {
  const positions = getAdjacentPositions(row, col);
  return getCardsAtPositions(tableau, positions);
}

/**
 * Get diagonal cards
 */
export function getDiagonalCards(tableau: Tableau, row: number, col: number): Card[] {
  const positions = getDiagonalPositions(row, col);
  return getCardsAtPositions(tableau, positions);
}

/**
 * Get all cards in the same row
 */
export function getRowCards(tableau: Tableau, row: number): Card[] {
  const positions = getRowPositions(row);
  return getCardsAtPositions(tableau, positions);
}

/**
 * Get all cards in the same column
 */
export function getColumnCards(tableau: Tableau, col: number): Card[] {
  const positions = getColumnPositions(col);
  return getCardsAtPositions(tableau, positions);
}

/**
 * Get all cards in tableau
 */
export function getAllTableauCards(tableau: Tableau): Card[] {
  const cards: Card[] = [];
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const card = tableau[row]?.[col];
      if (card) {
        cards.push(card);
      }
    }
  }
  return cards;
}

/**
 * Get cards in corner positions
 */
export function getCornerCards(tableau: Tableau): Card[] {
  const corners: Position[] = [
    { row: 0, col: 0 },
    { row: 0, col: 2 },
    { row: 2, col: 0 },
    { row: 2, col: 2 },
  ];
  return getCardsAtPositions(tableau, corners);
}

/**
 * Count filled positions in tableau
 */
export function countFilledPositions(tableau: Tableau): number {
  let count = 0;
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (tableau[row]?.[col]) {
        count++;
      }
    }
  }
  return count;
}

/**
 * Check if tableau is full (9 cards)
 */
export function isTableauFull(tableau: Tableau): boolean {
  return countFilledPositions(tableau) === 9;
}

/**
 * Check if a row is complete (3 cards)
 */
export function isRowComplete(tableau: Tableau, row: number): boolean {
  return getRowCards(tableau, row).length === 3;
}

/**
 * Check if a column is complete (3 cards)
 */
export function isColumnComplete(tableau: Tableau, col: number): boolean {
  return getColumnCards(tableau, col).length === 3;
}

/**
 * Count complete rows
 */
export function countCompleteRows(tableau: Tableau): number {
  let count = 0;
  for (let row = 0; row < 3; row++) {
    if (isRowComplete(tableau, row)) {
      count++;
    }
  }
  return count;
}

/**
 * Count complete columns
 */
export function countCompleteColumns(tableau: Tableau): number {
  let count = 0;
  for (let col = 0; col < 3; col++) {
    if (isColumnComplete(tableau, col)) {
      count++;
    }
  }
  return count;
}
