import type { Card, PlayerState, Position, Tableau, ScoringType } from '@castle-combo/shared';
import { calculateShieldScoring } from './shieldScoring.js';
import { calculatePositionScoring } from './positionScoring.js';
import { calculateTypeScoring } from './typeScoring.js';
import { calculateSetScoring } from './setScoring.js';
import { calculateConditionalScoring } from './conditionalScoring.js';
import { calculateGridScoring } from './gridScoring.js';
import { calculateSpecialScoring } from './specialScoring.js';

/**
 * Score result for a single card
 */
export interface CardScoringResult {
  cardId: number;
  cardName: string;
  position: Position;
  scoringType: ScoringType;
  points: number;
  description: string;
}

/**
 * Calculate score for a single card
 */
export function calculateCardScore(
  card: Card,
  position: Position,
  tableau: Tableau,
  player: PlayerState
): CardScoringResult {
  const scoring = card.scoring;
  let points = 0;
  let description = '';

  // Route to appropriate scoring function
  const result = routeScoring(card, position, tableau, player);
  points = result.points;
  description = result.description;

  return {
    cardId: card.id,
    cardName: card.name,
    position,
    scoringType: scoring.type,
    points,
    description,
  };
}

/**
 * Route scoring calculation to appropriate handler
 */
function routeScoring(
  card: Card,
  position: Position,
  tableau: Tableau,
  player: PlayerState
): { points: number; description: string } {
  const scoring = card.scoring;

  // Shield-based scoring
  if (isShieldScoring(scoring.type)) {
    return calculateShieldScoring(card, tableau);
  }

  // Position-based scoring
  if (isPositionScoring(scoring.type)) {
    return calculatePositionScoring(card, position, tableau);
  }

  // Type/Category scoring
  if (isTypeScoring(scoring.type)) {
    return calculateTypeScoring(card, position, tableau);
  }

  // Set collection scoring
  if (isSetScoring(scoring.type)) {
    return calculateSetScoring(card, tableau);
  }

  // Conditional scoring
  if (isConditionalScoring(scoring.type)) {
    return calculateConditionalScoring(card, position, tableau);
  }

  // Grid-based scoring
  if (isGridScoring(scoring.type)) {
    return calculateGridScoring(card, position, tableau);
  }

  // Special scoring
  if (isSpecialScoring(scoring.type)) {
    return calculateSpecialScoring(card, position, tableau, player);
  }

  return { points: 0, description: 'Unknown scoring type' };
}

function isShieldScoring(type: ScoringType): boolean {
  return ['per_shield', 'threshold', 'no_shield', 'all_six_shields'].includes(type);
}

function isPositionScoring(type: ScoringType): boolean {
  return ['per_adjacent', 'per_row', 'per_column', 'per_diagonal', 'per_corner', 'per_edge', 'center_position', 'specific_row', 'specific_column'].includes(type);
}

function isTypeScoring(type: ScoringType): boolean {
  return ['per_type', 'per_category', 'per_type_category', 'per_type_with_shield', 'adjacent_type', 'adjacent_category', 'adjacent_shield', 'adjacent_card_name'].includes(type);
}

function isSetScoring(type: ScoringType): boolean {
  return ['set_collection', 'same_shield_set', 'unique_shields', 'no_duplicates', 'unique_card_names'].includes(type);
}

function isConditionalScoring(type: ScoringType): boolean {
  return ['no_adjacent_type', 'no_adjacent_category', 'majority_type'].includes(type);
}

function isGridScoring(type: ScoringType): boolean {
  return ['corners_filled', 'all_corners', 'corners_with_shield', 'complete_rows', 'complete_columns'].includes(type);
}

function isSpecialScoring(type: ScoringType): boolean {
  return ['per_remaining_gold', 'double_shield_cards', 'per_card_in_grid', 'negative'].includes(type);
}

/**
 * Calculate total score for a player
 */
export function calculateTotalScore(player: PlayerState): number {
  let totalScore = 0;
  const tableau = player.tableau;

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const card = tableau[row]?.[col];
      if (card) {
        const result = calculateCardScore(card, { row, col }, tableau, player);
        totalScore += result.points;
      }
    }
  }

  return totalScore;
}

/**
 * Get detailed score breakdown for a player
 */
export function getScoreBreakdown(player: PlayerState): CardScoringResult[] {
  const results: CardScoringResult[] = [];
  const tableau = player.tableau;

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const card = tableau[row]?.[col];
      if (card) {
        const result = calculateCardScore(card, { row, col }, tableau, player);
        results.push(result);
      }
    }
  }

  return results;
}
