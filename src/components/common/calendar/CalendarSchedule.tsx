import { cva } from 'class-variance-authority';
import clsx from 'clsx';

import type { CalendarScheduleProps } from './calendar.types';

const scheduleStyles = cva(
  'truncate p-2 py-[0.25vh] text-[1.5vw] font-medium sm:py-[1vh] lg:text-base',
  {
    variants: {
      selectedDate: {
        true: 'hidden bg-fuchsia-300 text-fuchsia-500 md:block md:bg-white',
        false: 'bg-fuchsia-300 text-white',
      },
    },
  },
);

function CalendarSchedule({ schedule, isSelected }: CalendarScheduleProps) {
  const { title } = schedule;

  return (
    <div className={clsx(scheduleStyles({ selectedDate: isSelected }))}>
      <span className="hidden md:inline">{title}</span>
    </div>
  );
}

export default CalendarSchedule;
