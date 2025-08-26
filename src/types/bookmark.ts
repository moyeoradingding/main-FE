export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface BookmarkGroup {
  id: number;
  user: string;
  group: number;
  group_name: string;
  created_at: string;
}

export interface BookmarkIdol {
  id: number;
  user: string;
  idol: number;
  idol_name: string;
  created_at: string;
}

export interface BookmarkSchedule {
  id: number;
  schedule_type: string;
  schedule_details: RawScheduleContent;
}

export interface RawScheduleContent {
  id: number;
  title: string;
  start_time: string;
  end_time: string;
  location: string;
  description: string;
  is_public: boolean;
  created_at: string;
  updated_at: string;
  idol?: number;
  group?: number;
}

export interface BookmarkScheduleDetail {
  id: number;
  schedule_type: string;
  schedule_details: RawScheduleContent;
}
