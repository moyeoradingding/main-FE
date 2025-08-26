import axiosInstance from '@/api/axiosInstance';
import { avatarFromServerOrDicebear } from '@/utils/avatar';
import type { DRFPage, IdolServer, Idol } from '@/types/idol';

export async function searchIdolsApi(
  q: string,
  page: number,
): Promise<{ items: Idol[]; nextPage?: number }> {
  const res = await axiosInstance.get<DRFPage<IdolServer>>('/idols/', {
    params: { search: q, page },
  });

  const { results, next } = res.data;

  const items: Idol[] = results.map(it => ({
    id: String(it.id),
    name: it.name,
    avatarUrl: avatarFromServerOrDicebear(it.avatar_url, it.name),
    groupName: (it as any).group_name ?? '',
    position: (it as any).position ?? '',
  }));

  return {
    items,
    nextPage: next ? page + 1 : undefined,
  };
}

// 아이돌 상세 조회 페이지
export async function fetchIdolDetail(id: number | string): Promise<Idol> {
  const res = await axiosInstance.get(`/idols/${id}/`);
  const it = res.data as any;

  return {
    id: String(it.id),
    name: it.name,
    avatarUrl: avatarFromServerOrDicebear(it.avatar_url, it.name),
    groupName: it.group_name ?? '',
    position: it.position ?? '',
  };
}

// 아이돌 전체 스케줄 조회
export async function fetchIdolSchedules(id: number | string) {
  const res = await axiosInstance.get(`/idols/${id}/schedules/`);
  return res.data;
}
