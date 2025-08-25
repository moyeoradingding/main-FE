import { useQuery } from '@tanstack/react-query';

import { getBookmarkSchedules } from '@/api/bookmarkScheduleApi';
import type { BookmarkSchedule } from '@/types/bookmark';

export function useMyScheduleData() {
  const { data, isLoading, isError, error } = useQuery<BookmarkSchedule[], Error>({
    queryKey: ['mySchedules'],
    queryFn: getBookmarkSchedules,
  });

  return {
    mySchedules: data ?? [],
    isLoading,
    isError,
    error,
  };
}
