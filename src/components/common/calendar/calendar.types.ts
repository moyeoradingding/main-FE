import type { Dayjs } from 'dayjs';

import type { Schedule } from '@/types/schedule';

export interface CalendarDateHeaderProps {
  date: Dayjs;
  isToday: boolean;
  isSelected: boolean;
}

export interface CalendarScheduleProps {
  schedule: Schedule;
  isSelected: boolean;
}

export interface CalendarScheduleFooterProps {
  hiddenCount: number;
  isSelected: boolean;
}

export interface CalendarDateProps {
  date: Dayjs;
  viewDate: Dayjs;
  selectedDate: Dayjs;
  handleClickDate: (date: Dayjs) => void;
  schedulesForDate: Schedule[];
}

export interface CalendarToolbarProps {
  year: number;
  month: number;
  handleMovePrevMonth: () => void;
  handleMoveNextMonth: () => void;
  handleMoveCurrentMonth: () => void;
}
