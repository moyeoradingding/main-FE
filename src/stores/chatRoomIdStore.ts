import { create } from 'zustand';

interface ChatState {
  roomId: number | null;
  setRoomId: (id: number) => void;
  clearRoomId: () => void;
}

export const useChatStore = create<ChatState>(set => ({
  roomId: null,
  setRoomId: (id: number) => set({ roomId: id }),
  clearRoomId: () => set({ roomId: null }),
}));
