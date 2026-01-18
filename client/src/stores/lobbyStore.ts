import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { GameRoom, RoomListItem } from '@castle-combo/shared';

interface LobbyStore {
  // Room data
  rooms: RoomListItem[];
  currentRoom: GameRoom | null;

  // UI state
  isLoading: boolean;
  error: string | null;

  // Actions
  setRooms: (rooms: RoomListItem[]) => void;
  setCurrentRoom: (room: GameRoom | null) => void;
  updateCurrentRoom: (room: GameRoom) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  leaveRoom: () => void;
}

export const useLobbyStore = create<LobbyStore>()(
  persist(
    (set) => ({
      rooms: [],
      currentRoom: null,
      isLoading: false,
      error: null,

      setRooms: (rooms) => set({ rooms }),

      setCurrentRoom: (room) => set({ currentRoom: room, error: null }),

      updateCurrentRoom: (room) =>
        set((state) => ({
          currentRoom: state.currentRoom?.id === room.id ? room : state.currentRoom,
        })),

      setLoading: (loading) => set({ isLoading: loading }),

      setError: (error) => set({ error }),

      leaveRoom: () => set({ currentRoom: null }),
    }),
    {
      name: 'castle-combo-lobby',
      partialize: (state) => ({
        currentRoom: state.currentRoom,
      }),
    }
  )
);
