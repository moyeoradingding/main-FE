import { cva } from 'class-variance-authority';
import clsx from 'clsx';

import type { CalendarDateHeaderProps } from './calendar.types';

const dateHeaderStyles = cva('py-1', {
  variants: {
    selectedDate: {
      true: 'bg-fuchsia-400 font-semibold text-white',
      false: '',
    },
    todayDate: {
      true: 'text-fuchsia-600',
      false: '',
    },
  },
});

function CalendarDateHeader({
  date,
  isToday,
  isSelected,
}: CalendarDateHeaderProps) {
  return (
    <div
      className={clsx(
        dateHeaderStyles({ selectedDate: isSelected, todayDate: isToday }),
      )}
    >
      {date.date()}
    </div>
  );
}

export default CalendarDateHeader;
