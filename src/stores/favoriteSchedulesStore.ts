import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { Schedule } from '@/types/schedule';

interface FavoriteSchedulesState {
  favoriteSchedules: Schedule[];
  toggleFavoriteSchedule: (schedule: Schedule) => void;
  isFavoriteSchedule: (scheduleId: number) => boolean;
}

export const useFavoriteSchedulesStore = create<FavoriteSchedulesState>()(
  persist(
    (set, get) => ({
      favoriteSchedules: [],
      toggleFavoriteSchedule: (schedule: Schedule) =>
        set(state => ({
          favoriteSchedules: state.favoriteSchedules.some(
            s => s.id === schedule.id,
          )
            ? state.favoriteSchedules.filter(s => s.id !== schedule.id)
            : [...state.favoriteSchedules, schedule],
        })),
      isFavoriteSchedule: (scheduleId: number) =>
        get().favoriteSchedules.some(s => s.id === scheduleId),
    }),
    {
      name: 'favorite-schedules-storage',
    },
  ),
);
