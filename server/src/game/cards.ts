import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import type { Card, ShieldColor, ShieldColorInfo } from '@castle-combo/shared';

// Get directory of current module
const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Cards database loaded from JSON
 */
interface CardsDatabase {
  version: string;
  totalCards: number;
  shieldColors: Record<ShieldColor, ShieldColorInfo>;
  cards: Card[];
}

// Load cards data from JSON
// Try multiple paths for Docker vs local development
import { existsSync } from 'fs';

function findCardsPath(): string {
  const paths = [
    '/app/cards.json',                           // Docker path
    join(__dirname, '../../../../cards.json'),   // Local development path
    join(__dirname, '../../../cards.json'),      // Alternative path
  ];

  for (const p of paths) {
    if (existsSync(p)) return p;
  }

  throw new Error('cards.json not found in any expected location');
}

const cardsPath = findCardsPath();
const cardsData: CardsDatabase = JSON.parse(readFileSync(cardsPath, 'utf-8'));

/**
 * Get all cards
 */
export function getAllCards(): Card[] {
  return cardsData.cards;
}

/**
 * Get card by ID
 */
export function getCardById(id: number): Card | undefined {
  return cardsData.cards.find(card => card.id === id);
}

/**
 * Get cards by type (castle/village)
 */
export function getCardsByType(type: 'castle' | 'village'): Card[] {
  return cardsData.cards.filter(card => card.type === type);
}

/**
 * Get shield color info
 */
export function getShieldColorInfo(color: ShieldColor): ShieldColorInfo {
  return cardsData.shieldColors[color];
}

/**
 * Shuffle array using Fisher-Yates algorithm
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Generate a shuffled deck of all cards
 */
export function generateDeck(): Card[] {
  return shuffleArray(getAllCards());
}

/**
 * Generate separate shuffled decks for village and castle cards
 */
export function generateSeparateDecks(): { villageDeck: Card[]; castleDeck: Card[] } {
  const villageCards = getCardsByType('village');
  const castleCards = getCardsByType('castle');
  return {
    villageDeck: shuffleArray(villageCards),
    castleDeck: shuffleArray(castleCards),
  };
}

/**
 * Draw cards from deck
 */
export function drawCards(deck: Card[], count: number): { drawn: Card[]; remaining: Card[] } {
  const drawn = deck.slice(0, count);
  const remaining = deck.slice(count);
  return { drawn, remaining };
}

/**
 * Total number of cards
 */
export const TOTAL_CARDS = cardsData.totalCards;

/**
 * Cards version
 */
export const CARDS_VERSION = cardsData.version;
