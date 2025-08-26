import axiosInstance from '@/api/axiosInstance';
import type { Schedule, IdolSchedule } from '@/types/schedule';

const pickList = (data: any): any[] =>
  Array.isArray(data?.results) ? data.results : Array.isArray(data) ? data : [];

const baseFields = (raw: any) => {
  const start =
    raw?.start_time ?? raw?.startTime ?? raw?.start_at ?? raw?.startAt ?? '';
  const end = raw?.end_time ?? raw?.endTime ?? raw?.end_at ?? raw?.endAt ?? '';

  return {
    id: Number(raw?.id ?? Math.random()),
    title: String(raw?.title ?? ''),
    startTime: String(start),
    endTime: String(end),
    description: raw?.description ? String(raw.description) : '',
    isPublic: Boolean(raw?.is_public ?? raw?.isPublic ?? true),
    place: raw?.place ? String(raw.place) : undefined,
    location: raw?.location ? String(raw.location) : undefined,
  };
};

const toIdolSchedule = (raw: any): IdolSchedule => {
  const base = baseFields(raw);

  const idolId =
    typeof raw?.idol === 'number'
      ? raw.idol
      : typeof raw?.idol?.id === 'number'
        ? raw.idol.id
        : -1;

  const idolName =
    typeof raw?.idol_name === 'string'
      ? raw.idol_name
      : typeof raw?.idol?.name === 'string'
        ? raw.idol.name
        : '';

  return {
    ...base,
    idol: {
      id: Number(idolId),
      name: idolName,
    },
  };
};

export async function fetchIdolSchedules(
  idolId?: number | string,
  dateISO?: string,
): Promise<Schedule[]> {
  const params: Record<string, any> = {};
  if (idolId !== undefined && idolId !== null) params.idol = idolId;
  if (dateISO) params.date = dateISO;

  const res = await axiosInstance.get('/schedules/idols/', { params });
  const list = pickList(res.data);
  return list.map(toIdolSchedule);
}

export async function fetchIdolSchedulesByDate(
  idolId: number | string,
  dateISO: string,
): Promise<Schedule[]> {
  const res = await axiosInstance.get('/schedules/idols/', {
    params: { idol: idolId, date: dateISO },
  });
  const list = pickList(res.data);
  return list.map(toIdolSchedule);
}
