import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';

import {
  addBookmarkIdol,
  getBookmarkGroups,
  getBookmarkIdols,
  removeBookmarkIdol,
} from '@/api/bookmarkIdolApi';
import { useSyncArrayData } from '@/hooks/useSyncArrayData';
import { useFavoritesStore } from '@/stores/favoritesStore';

export function useBookmarkSync() {
  const queryClient = useQueryClient();
  const { favorites, toggleFavorite } = useFavoritesStore();

  const { data: bookmarkedIdolsRaw, isLoading: isIdolsLoading } = useQuery({
    queryKey: ['idols', 'favorites'],
    queryFn: getBookmarkIdols,
  });

  const { data: bookmarkedGroupsRaw, isLoading: isGroupsLoading } = useQuery({
    queryKey: ['groups', 'favorites'],
    queryFn: getBookmarkGroups,
  });

  const favoriteIdols = useMemo(
    () => bookmarkedIdolsRaw ?? [],
    [bookmarkedIdolsRaw],
  );

  const favoriteGroups = useMemo(
    () => bookmarkedGroupsRaw ?? [],
    [bookmarkedGroupsRaw],
  );

  const isFavoritesLoading = isIdolsLoading || isGroupsLoading;

  const { mutate: syncFavoritesWithServer } = useMutation({
    mutationFn: async ({
      added,
      removed,
    }: {
      added: number[];
      removed: number[];
    }) => {
      const promises = [
        ...added.map(id => addBookmarkIdol(id)),
        ...removed.map(id => {
          const bookmark = bookmarkedIdolsRaw?.find(fav => fav.idol === id);
          if (bookmark) {
            return removeBookmarkIdol(bookmark.id);
          }
          return Promise.resolve();
        }),
      ];
      await Promise.all(promises);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['idols', 'favorites'] });
      queryClient.invalidateQueries({ queryKey: ['groups', 'favorites'] });
    },
  });

  const toggleFavoriteAndSync = useCallback(
    (idolId: number) => {
      const isCurrentlyFavorited = favorites.includes(idolId);
      if (isCurrentlyFavorited) {
        syncFavoritesWithServer({ added: [], removed: [idolId] });
      } else {
        syncFavoritesWithServer({ added: [idolId], removed: [] });
      }
    },
    [favorites, syncFavoritesWithServer],
  );

  useSyncArrayData<number>({
    serverData: bookmarkedIdolsRaw?.map(b => b.idol),
    clientData: favorites,
    applyFn: toggleFavorite,
  });

  return {
    favoriteIdols,
    favoriteGroups,
    isFavoritesLoading,
    toggleFavorite: toggleFavoriteAndSync,
  };
}
