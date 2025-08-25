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
  schedule_id: number;
  start_time: string;
  end_time: string;
  location: string;
  description: string;
  entity_type: string;
  entity_name: string;
}
