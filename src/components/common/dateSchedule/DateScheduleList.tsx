import { CalendarIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';

import type { DateScheduleListProps } from './dateSchedule.types';
import {
  filterByDate,
  formatMonthDay,
  sortByTimeAsc,
} from './dateSchedule.utils';
import DateScheduleItem from './DateScheduleItem';

function DateScheduleList({
  userRole,
  selectedDate,
  schedules,
  onNotifyToggle,
  onEditClick,
  onDeleteClick,
  className,
  toggleScheduleBookmark,
}: DateScheduleListProps) {
  const items = sortByTimeAsc(filterByDate(schedules, selectedDate));

  return (
    <section
      className={clsx(
        'w-full rounded-2xl border border-gray-200 bg-white shadow-md',
        'p-3 md:p-4',
        'mt-2',
        'flex flex-col',
        className,
      )}
      aria-label={userRole === 'favorites' ? '즐겨찾기한 일정' : '날짜별 일정'}
    >
      <div className="mt-2 mb-5 flex items-center gap-2 pl-1">
        <CalendarIcon className="h-7 w-7 text-fuchsia-600 sm:h-8 sm:w-8" />
        <h2 className="text-xl font-semibold md:text-2xl">
          {formatMonthDay(selectedDate)} 스케줄
        </h2>
      </div>

      {items.length === 0 ? (
        <p className="rounded-xl bg-gray-50 py-6 text-center text-sm text-gray-400">
          선택한 날짜에 등록된 일정이 없습니다.
        </p>
      ) : (
        <ul className="flex flex-col gap-2.5 md:gap-3">
          {items.map(item => (
            <DateScheduleItem
              key={item.id}
              item={item}
              userRole={userRole}
              onNotifyToggle={onNotifyToggle}
              onEditClick={onEditClick}
              onDeleteClick={onDeleteClick}
              toggleScheduleBookmark={toggleScheduleBookmark}
            />
          ))}
        </ul>
      )}
    </section>
  );
}

export default DateScheduleList;
