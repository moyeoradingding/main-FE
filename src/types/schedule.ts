interface BaseSchedule {
  id: number;
  title: string;
  startTime: string;
  endTime: string;
  description?: string;
  isPublic: boolean;
  isBookmarked?: boolean;
  isNotified?: boolean;
  place?: string;
  location?: string;
}

export interface GroupInfo {
  id: number;
  name: string;
}

export interface IdolInfo {
  id: number;
  name: string;
}

export interface GroupSchedule extends BaseSchedule {
  group: GroupInfo;
  members?: IdolInfo[];
}

export interface IdolSchedule extends BaseSchedule {
  idol: IdolInfo;
}

export type Schedule = GroupSchedule | IdolSchedule;

export function isGroupSchedule(schedule: Schedule): schedule is GroupSchedule {
  return 'group' in schedule;
}

export function isIdolSchedule(schedule: Schedule): schedule is IdolSchedule {
  return 'idol' in schedule;
}
