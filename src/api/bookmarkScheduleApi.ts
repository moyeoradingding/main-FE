import { type AxiosResponse } from 'axios';

import type {
  BookmarkSchedule,
  BookmarkScheduleDetail,
  PaginatedResponse,
} from '@/types/bookmark';

import axiosInstance from './axiosInstance';

interface AddMyScheduleBody {
  idol_schedule?: number;
  group_schedule?: number;
}

/**
 * 내가 북마크한 스케줄 목록 전체 조회
 */
export const getBookmarkSchedules = async () => {
  let allSchedules: BookmarkSchedule[] = [];
  let url: string | null = '/schedules/my/';

  while (url) {
    // eslint-disable-next-line no-await-in-loop
    const response: AxiosResponse = await axiosInstance.get<
      PaginatedResponse<BookmarkSchedule>
    >(url!);
    allSchedules = allSchedules.concat(response.data.results);
    url = response.data.next;
  }

  return allSchedules;
};

/**
 * 내 스케줄에 스케줄 북마크 추가
 * @param body - idol_schedule 또는 group_schedule ID를 포함하는 객체
 */
export const addMySchedule = async (body: AddMyScheduleBody) => {
  await axiosInstance.post('/schedules/my/', body);
};

/**
 * 내 스케줄에서 스케줄 북마크 제거
 * @param bookmarkId - 제거할 북마크의 ID
 */
export const removeMySchedule = async (bookmarkId: number) => {
  await axiosInstance.delete(`/schedules/my/${bookmarkId}/`);
};

/**
 * 내 스케줄 상세 조회
 * @param bookmarkId - 조회할 북마크의 ID
 */
export const getMySchedule = async (bookmarkId: number) => {
  const response = await axiosInstance.get<BookmarkScheduleDetail>(
    `/schedules/my/${bookmarkId}/`,
  );
  return response.data;
};
