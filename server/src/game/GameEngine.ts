import { v4 as uuidv4 } from 'uuid';
import type {
  GameState,
  PlayerState,
  Card,
  Position,
  PlayerAction,
  ActionResult,
  GamePhase,
  TurnPhase,
} from '@castle-combo/shared';
import { createEmptyTableau, DEFAULT_GAME_CONFIG } from '@castle-combo/shared';
import { generateDeck, generateSeparateDecks, drawCards, getCardById } from './cards.js';
import { applyAbility, AbilityResult } from './abilities/index.js';
import { calculateTotalScore, getScoreBreakdown } from './scoring/index.js';
import { isTableauFull, countFilledPositions } from './helpers/gridHelpers.js';

/**
 * Player info for game creation
 */
interface PlayerInfo {
  id: string;
  username: string;
}

/**
 * Create initial game state
 */
export function createGameState(roomId: string, players: PlayerInfo[]): GameState {
  // Generate separate shuffled decks for village and castle
  const { villageDeck, castleDeck } = generateSeparateDecks();

  // Draw cards for market
  // Row 1 = Village cards, Row 2 = Castle cards
  const { drawn: villageRow, remaining: remainingVillage } = drawCards(villageDeck, 4);
  const { drawn: castleRow, remaining: remainingCastle } = drawCards(castleDeck, 4);

  // Create player states
  const playerStates: PlayerState[] = players.map(player => ({
    id: player.id,
    username: player.username,
    gold: DEFAULT_GAME_CONFIG.startingGold,
    keys: DEFAULT_GAME_CONFIG.startingKeys,
    tableau: createEmptyTableau(),
    score: 0,
    discounts: [],
    hand: null, // Card purchased but not yet placed
  }));

  return {
    id: uuidv4(),
    roomId,
    phase: 'playing',
    turnPhase: 'optional_actions',
    currentPlayerIndex: 0,
    players: playerStates,
    market: {
      row1: villageRow,      // Village cards
      row2: castleRow,       // Castle cards
      messengerRow: 1,
    },
    villageDeck: remainingVillage,
    castleDeck: remainingCastle,
    discardPile: [],
    turnNumber: 1,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
}

/**
 * Get current player
 */
export function getCurrentPlayer(gameState: GameState): PlayerState {
  return gameState.players[gameState.currentPlayerIndex];
}

/**
 * Get player by ID
 */
export function getPlayerById(gameState: GameState, playerId: string): PlayerState | undefined {
  return gameState.players.find(p => p.id === playerId);
}

/**
 * Validate if it's the player's turn
 */
export function isPlayersTurn(gameState: GameState, playerId: string): boolean {
  return getCurrentPlayer(gameState).id === playerId;
}

/**
 * Process player action
 */
export function processAction(
  gameState: GameState,
  playerId: string,
  action: PlayerAction
): ActionResult {
  // Validate turn
  if (!isPlayersTurn(gameState, playerId)) {
    return {
      success: false,
      action: action.type,
      error: 'Not your turn',
    };
  }

  const player = getCurrentPlayer(gameState);

  switch (action.type) {
    case 'move_messenger':
      return handleMoveMessenger(gameState, player);

    case 'refresh_row':
      return handleRefreshRow(gameState, player);

    case 'end_optional':
      return handleEndOptional(gameState);

    case 'buy_card':
      return handleBuyCard(gameState, player, action.cardId!);

    case 'place_card':
      return handlePlaceCard(gameState, player, action.cardId!, action.position!);

    default:
      return {
        success: false,
        action: action.type,
        error: 'Unknown action type',
      };
  }
}

/**
 * Handle move messenger action
 */
function handleMoveMessenger(gameState: GameState, player: PlayerState): ActionResult {
  // Check phase
  if (gameState.turnPhase !== 'optional_actions') {
    return {
      success: false,
      action: 'move_messenger',
      error: 'Can only move messenger during optional actions phase',
    };
  }

  // Check if player has keys
  if (player.keys < 1) {
    return {
      success: false,
      action: 'move_messenger',
      error: 'Not enough keys (need 1)',
    };
  }

  // Move messenger
  player.keys -= 1;
  gameState.market.messengerRow = gameState.market.messengerRow === 1 ? 2 : 1;
  gameState.updatedAt = Date.now();

  return {
    success: true,
    action: 'move_messenger',
    details: {
      keysChange: -1,
      messengerMoved: true,
      newMessengerRow: gameState.market.messengerRow,
    },
  };
}

/**
 * Handle refresh row action
 */
function handleRefreshRow(gameState: GameState, player: PlayerState): ActionResult {
  // Check phase
  if (gameState.turnPhase !== 'optional_actions') {
    return {
      success: false,
      action: 'refresh_row',
      error: 'Can only refresh row during optional actions phase',
    };
  }

  // Check if player has keys
  if (player.keys < 1) {
    return {
      success: false,
      action: 'refresh_row',
      error: 'Not enough keys (need 1)',
    };
  }

  // Get current row and corresponding deck
  const isVillageRow = gameState.market.messengerRow === 1;
  const rowKey = isVillageRow ? 'row1' : 'row2';
  const currentRow = gameState.market[rowKey];
  const currentDeck = isVillageRow ? gameState.villageDeck : gameState.castleDeck;

  // Discard current row
  gameState.discardPile.push(...currentRow);

  // Draw new cards from the appropriate deck
  const { drawn, remaining } = drawCards(currentDeck, 4);
  gameState.market[rowKey] = drawn;

  // Update the correct deck
  if (isVillageRow) {
    gameState.villageDeck = remaining;
  } else {
    gameState.castleDeck = remaining;
  }

  // Deduct key
  player.keys -= 1;
  gameState.updatedAt = Date.now();

  return {
    success: true,
    action: 'refresh_row',
    details: {
      keysChange: -1,
      marketRefreshed: true,
    },
  };
}

/**
 * Handle end optional actions
 */
function handleEndOptional(gameState: GameState): ActionResult {
  if (gameState.turnPhase !== 'optional_actions') {
    return {
      success: false,
      action: 'end_optional',
      error: 'Not in optional actions phase',
    };
  }

  gameState.turnPhase = 'buy_card';
  gameState.updatedAt = Date.now();

  return {
    success: true,
    action: 'end_optional',
    details: {
      nextPhase: 'buy_card',
    },
  };
}

/**
 * Handle buy card action
 */
function handleBuyCard(
  gameState: GameState,
  player: PlayerState,
  cardId: number
): ActionResult {
  // Check phase
  if (gameState.turnPhase !== 'buy_card') {
    return {
      success: false,
      action: 'buy_card',
      error: 'Not in buy card phase',
    };
  }

  // Get active row and corresponding deck
  const isVillageRow = gameState.market.messengerRow === 1;
  const rowKey = isVillageRow ? 'row1' : 'row2';
  const activeRow = gameState.market[rowKey];
  const currentDeck = isVillageRow ? gameState.villageDeck : gameState.castleDeck;

  // Find card in active row
  const cardIndex = activeRow.findIndex(c => c.id === cardId);
  if (cardIndex === -1) {
    return {
      success: false,
      action: 'buy_card',
      error: 'Card not in active market row',
    };
  }

  const card = activeRow[cardIndex];

  // Calculate cost with discounts
  let cost = card.cost;
  for (const discount of player.discounts) {
    if (discount.type === 'all') {
      cost = Math.max(0, cost - discount.amount);
    } else if (discount.type === 'cardType' && card.type === discount.cardType) {
      cost = Math.max(0, cost - discount.amount);
    } else if (discount.type === 'shield' && card.shields.includes(discount.shield!)) {
      cost = Math.max(0, cost - discount.amount);
    }
  }

  // Check if player can afford
  if (player.gold < cost) {
    return {
      success: false,
      action: 'buy_card',
      error: `Not enough gold (need ${cost}, have ${player.gold})`,
    };
  }

  // Buy card
  player.gold -= cost;
  player.hand = card;

  // Remove card from market and refill from appropriate deck
  activeRow.splice(cardIndex, 1);
  if (currentDeck.length > 0) {
    const { drawn, remaining } = drawCards(currentDeck, 1);
    activeRow.push(...drawn);
    if (isVillageRow) {
      gameState.villageDeck = remaining;
    } else {
      gameState.castleDeck = remaining;
    }
  }

  // Move to place card phase
  gameState.turnPhase = 'place_card';
  gameState.updatedAt = Date.now();

  return {
    success: true,
    action: 'buy_card',
    details: {
      cardBought: card,
      goldPaid: cost,
      goldChange: -cost,
      nextPhase: 'place_card',
    },
  };
}

/**
 * Handle place card action
 */
function handlePlaceCard(
  gameState: GameState,
  player: PlayerState,
  cardId: number,
  position: Position
): ActionResult {
  // Check phase
  if (gameState.turnPhase !== 'place_card') {
    return {
      success: false,
      action: 'place_card',
      error: 'Not in place card phase',
    };
  }

  // Check if player has card in hand
  if (!player.hand || player.hand.id !== cardId) {
    return {
      success: false,
      action: 'place_card',
      error: 'Card not in hand',
    };
  }

  // Validate position
  const { row, col } = position;
  if (row < 0 || row > 2 || col < 0 || col > 2) {
    return {
      success: false,
      action: 'place_card',
      error: 'Invalid position',
    };
  }

  // Check if position is empty
  if (player.tableau[row][col] !== null) {
    return {
      success: false,
      action: 'place_card',
      error: 'Position already occupied',
    };
  }

  const card = player.hand;

  // Place card
  player.tableau[row][col] = card;
  player.hand = null;

  // Apply card ability
  const abilityResult = applyAbility(card, player, gameState);

  // Update score
  player.score = calculateTotalScore(player);

  // Check if game should end
  const allTableausFull = gameState.players.every(p => isTableauFull(p.tableau));

  if (allTableausFull) {
    gameState.phase = 'ended';
  } else {
    // Advance to next player
    advanceToNextPlayer(gameState);
  }

  gameState.updatedAt = Date.now();

  return {
    success: true,
    action: 'place_card',
    details: {
      cardPlaced: card,
      position,
      goldChange: abilityResult.goldChange,
      keysChange: abilityResult.keysChange,
      abilityTriggered: abilityResult.applied ? card.ability.type : undefined,
      abilityEffect: abilityResult.description,
      scoreChange: player.score,
      gameEnded: gameState.phase === 'ended',
    },
  };
}

/**
 * Advance to next player
 */
function advanceToNextPlayer(gameState: GameState): void {
  gameState.currentPlayerIndex = (gameState.currentPlayerIndex + 1) % gameState.players.length;

  // If we wrapped around, increment turn number
  if (gameState.currentPlayerIndex === 0) {
    gameState.turnNumber++;
  }

  gameState.turnPhase = 'optional_actions';
}

/**
 * Get final game results
 */
export function getGameResults(gameState: GameState) {
  const results = gameState.players.map(player => ({
    id: player.id,
    username: player.username,
    score: calculateTotalScore(player),
    breakdown: getScoreBreakdown(player),
    gold: player.gold,
    keys: player.keys,
  }));

  // Sort by score (descending)
  results.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    // Tiebreaker: most remaining resources
    return (b.gold + b.keys) - (a.gold + a.keys);
  });

  return {
    winner: results[0],
    rankings: results,
  };
}

/**
 * Check if game has ended
 */
export function isGameEnded(gameState: GameState): boolean {
  return gameState.phase === 'ended';
}
