import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

import { Button } from '../Button';
import { ButtonStyle, IconStyle } from './calendar.styles';
import type { CalendarToolbarProps } from './calendar.types';

function CalendarToolbar({
  year,
  month,
  handleMovePrevMonth,
  handleMoveNextMonth,
  handleMoveCurrentMonth,
}: CalendarToolbarProps) {
  return (
    <div className="flex w-full justify-between py-5">
      <Button
        size="sm"
        variant="outline"
        onClick={handleMoveCurrentMonth}
        className={ButtonStyle}
      >
        <span className="px-2.5 text-sm font-medium text-gray-400 group-hover:text-white">
          TODAY
        </span>
      </Button>
      <div className="flex items-center">
        <span className="text-md font-semibold text-gray-700 sm:text-xl">
          {year}년 {month}월
        </span>
      </div>
      <div className="flex w-fit gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={handleMovePrevMonth}
          className={ButtonStyle}
        >
          <ArrowLeftIcon className={IconStyle} />
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={handleMoveNextMonth}
          className={ButtonStyle}
        >
          <ArrowRightIcon className={IconStyle} />
        </Button>
      </div>
    </div>
  );
}

export default CalendarToolbar;
