import { cva } from 'class-variance-authority';
import clsx from 'clsx';

import type { CalendarScheduleFooterProps } from './calendar.types';

const dateFooterMdStyles = cva('md:hidden', {
  variants: {
    selectedDate: {
      true: 'hidden',
      false: '',
    },
  },
});

function CalendarDateFooter({
  hiddenCount,
  isSelected,
}: CalendarScheduleFooterProps) {
  return (
    <div className="py-1 text-[2vw] text-fuchsia-300 md:text-sm">
      <span className="hidden md:inline">
        {hiddenCount > 0 && `+ ${hiddenCount} more`}
      </span>
      <span
        className={clsx(
          dateFooterMdStyles({ selectedDate: isSelected }),
          isSelected && 'hidden',
        )}
      >
        {hiddenCount > 0 && `+ ${hiddenCount}`}
      </span>
    </div>
  );
}

export default CalendarDateFooter;
