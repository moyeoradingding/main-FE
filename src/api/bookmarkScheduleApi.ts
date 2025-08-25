import { type AxiosResponse } from 'axios';

import type { BookmarkSchedule, PaginatedResponse } from '@/types/bookmark';

import axiosInstance from './axiosInstance';

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
