import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { GameState, Card, Position, ActionResult } from '@castle-combo/shared';

interface GameStore {
  // Game state
  gameState: GameState | null;
  selectedCard: Card | null;
  selectedPosition: Position | null;
  lastActionResult: ActionResult | null;

  // UI state
  isMyTurn: boolean;
  showScoreboard: boolean;

  // Actions
  setGameState: (state: GameState) => void;
  selectCard: (card: Card | null) => void;
  selectPosition: (position: Position | null) => void;
  setActionResult: (result: ActionResult) => void;
  setIsMyTurn: (isMyTurn: boolean) => void;
  setShowScoreboard: (show: boolean) => void;
  clearSelection: () => void;
  resetGame: () => void;
}

export const useGameStore = create<GameStore>()(
  persist(
    (set) => ({
      gameState: null,
      selectedCard: null,
      selectedPosition: null,
      lastActionResult: null,
      isMyTurn: false,
      showScoreboard: false,

      setGameState: (gameState) => set({ gameState }),

      selectCard: (card) => set({ selectedCard: card }),

      selectPosition: (position) => set({ selectedPosition: position }),

      setActionResult: (result) => set({ lastActionResult: result }),

      setIsMyTurn: (isMyTurn) => set({ isMyTurn }),

      setShowScoreboard: (show) => set({ showScoreboard: show }),

      clearSelection: () =>
        set({
          selectedCard: null,
          selectedPosition: null,
        }),

      resetGame: () =>
        set({
          gameState: null,
          selectedCard: null,
          selectedPosition: null,
          lastActionResult: null,
          isMyTurn: false,
          showScoreboard: false,
        }),
    }),
    {
      name: 'castle-combo-game',
      partialize: (state) => ({
        gameState: state.gameState,
      }),
    }
  )
);
