import { cva } from 'class-variance-authority';
import clsx from 'clsx';
import dayjs from 'dayjs';

import { buttonHoverStyle, divHoverStyle } from './calendar.styles';
import type { CalendarDateProps } from './calendar.types';
import CalendarDateFooter from './CalendarDateFooter';
import CalendarDateHeader from './CalendarDateHeader';
import CalendarSchedule from './CalendarSchedule';

const dateStyles = cva('flex justify-center aspect-2/3 text-center', {
  variants: {
    currentMonth: {
      true: 'text-gray-700',
      false: 'text-gray-300',
    },
  },
});

function CalendarDate({
  date,
  viewDate,
  selectedDate,
  handleClickDate,
  schedulesForDate,
}: CalendarDateProps) {
  const isCurrentMonth = date.month() === viewDate.month();
  const isSelected = date.isSame(selectedDate, 'day');
  const isToday = date.isSame(dayjs(), 'day');

  const maxVisible = 3;
  const visibleSchedules = schedulesForDate.slice(0, maxVisible);
  const hiddenCount = schedulesForDate.length - maxVisible;

  return (
    <button
      type="button"
      key={date.format('YYYY-MM-DD')}
      onClick={() => handleClickDate(date)}
      className={clsx(
        dateStyles({
          currentMonth: isCurrentMonth,
        }),
        buttonHoverStyle,
      )}
    >
      <div
        className={clsx(
          'flex h-full min-h-fit w-full flex-col justify-between',
          divHoverStyle,
        )}
      >
        <CalendarDateHeader
          date={date}
          isToday={isToday}
          isSelected={isSelected}
        />
        <div className="flex min-w-0 flex-1 flex-col gap-1 p-1">
          {visibleSchedules.map(schedule => (
            <CalendarSchedule
              key={schedule.id}
              schedule={schedule}
              isSelected={isSelected}
            />
          ))}
        </div>
        <CalendarDateFooter hiddenCount={hiddenCount} isSelected={isSelected} />
      </div>
    </button>
  );
}

export default CalendarDate;
