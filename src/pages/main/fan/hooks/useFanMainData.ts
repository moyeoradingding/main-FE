import { useQuery } from '@tanstack/react-query';
import dayjs, { Dayjs } from 'dayjs';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { fetchIdolDetail, fetchIdolSchedules } from '@/api/idolApi';
import { useBookmarkSync } from '@/hooks/useBookmarkSync';
// ⚠️ TODO(삭제 예정): 스케줄 API가 안정되면 아래 목업 import는 제거
import { ALL_SCHEDULES } from '@/mocks/data';
import type { Schedule } from '@/types/schedule';
import { isGroupSchedule, isIdolSchedule } from '@/types/schedule';

export function useFanMainData() {
  const { idolId = '' } = useParams<{ idolId: string }>();
  const parsedIdolId = useMemo(() => Number(idolId), [idolId]);

  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [filteredSchedules, setFilteredSchedules] = useState<Schedule[]>([]);

  const { favoriteIdols, toggleFavorite } = useBookmarkSync();

  const { data: idolDetail } = useQuery({
    queryKey: ['idol', 'detail', parsedIdolId],
    enabled: Number.isFinite(parsedIdolId) && parsedIdolId > 0,
    queryFn: () => fetchIdolDetail(parsedIdolId),
  });

  const { data: idolSchedulesFromApi } = useQuery({
    queryKey: ['idol', 'schedules', parsedIdolId],
    enabled: Number.isFinite(parsedIdolId) && parsedIdolId > 0,
    queryFn: () => fetchIdolSchedules(parsedIdolId),
  });

  const currentIdol = useMemo(
    () =>
      idolDetail
        ? {
            id: Number(idolDetail.id),
            name: idolDetail.name,
            groupName: idolDetail.groupName ?? '',
          }
        : null,
    [idolDetail],
  );

  const isFavorite = useMemo(
    () =>
      parsedIdolId
        ? favoriteIdols.some(fav => fav.idol === parsedIdolId)
        : false,
    [parsedIdolId, favoriteIdols],
  );

  useEffect(() => {
    if (!currentIdol) {
      setFilteredSchedules([]);
      return;
    }

    const mappedFromApi: Schedule[] = (idolSchedulesFromApi ?? []).map(
      (it: any) => ({
        id: it.id ?? Math.random(),
        title: it.title ?? '',
        startTime: it.start_time ?? it.startTime ?? '',
        endTime: it.end_time ?? it.endTime ?? '',
        description: it.description ?? '',
        isPublic: Boolean(it.is_public ?? it.isPublic ?? true),
        idol: { id: currentIdol.id, name: currentIdol.name },
        location: it.location ?? '',
      }),
    ) as Schedule[];

    if (mappedFromApi.length > 0) {
      setFilteredSchedules(mappedFromApi);
      return;
    }

    // ⚠️ 서버 데이터가 아직 없으면 → 기존 목업 로직으로 fallback
    const { name: idolName, groupName } = currentIdol;

    const schedulesFromMock = ALL_SCHEDULES.filter(schedule => {
      if (isIdolSchedule(schedule) && schedule.idol.name === idolName)
        return true;
      if (isGroupSchedule(schedule) && schedule.group.name === groupName)
        return true;
      if ('members' in schedule) {
        return schedule.members?.some(member => member.name === idolName);
      }
      return false;
    });

    setFilteredSchedules(schedulesFromMock);
  }, [currentIdol, idolSchedulesFromApi]);

  const handleFavoriteToggle = useCallback(() => {
    if (parsedIdolId) toggleFavorite(parsedIdolId);
  }, [parsedIdolId, toggleFavorite]);

  return {
    idolId: parsedIdolId,
    selectedDate,
    setSelectedDate,
    filteredSchedules,
    currentIdol,
    isFavorite,
    handleFavoriteToggle,
  };
}
