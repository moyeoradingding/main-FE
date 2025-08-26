import {
  BellIcon as BellOutline,
  StarIcon as StarOutline,
  TrashIcon,
} from '@heroicons/react/24/outline';
import {
  BellIcon as BellSolid,
  PencilIcon,
  StarIcon as StarSolid,
} from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { useState } from 'react';

import { isGroupSchedule, isIdolSchedule } from '@/types/schedule';

import type { DateScheduleItemProps } from './dateSchedule.types';
import { formatDateSlash } from './dateSchedule.utils';
import { type ActionIcon, getScheduleActions } from './getScheduleActions';
import { IconButton } from './IconButton';

const iconSize = 'h-5 w-5 sm:h-6 sm:w-6';
const iconColor = 'text-fuchsia-600';

function renderIcon(icon: ActionIcon): React.ReactNode {
  switch (icon) {
    case 'star':
      return <StarOutline className={clsx(iconSize, iconColor)} />;
    case 'star-filled':
      return <StarSolid className={clsx(iconSize, iconColor)} />;
    case 'bell':
      return <BellOutline className={clsx(iconSize, iconColor)} />;
    case 'bell-filled':
      return <BellSolid className={clsx(iconSize, iconColor)} />;
    case 'edit':
      return <PencilIcon className={clsx(iconSize, iconColor)} />;
    case 'delete':
      return <TrashIcon className={clsx(iconSize, iconColor)} />;
    default:
      return null;
  }
}

export default function DateScheduleItem({
  item,
  userRole,
  onNotifyToggle,
  onEditClick,
  onDeleteClick,
  toggleScheduleBookmark,
}: DateScheduleItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggleOpen = () => setIsOpen(prev => !prev);

  const actionsInfo = getScheduleActions(userRole, item, {
    toggleScheduleBookmark,
    onNotifyToggle,
    onEditClick,
    onDeleteClick,
  });

  const time = new Date(item.startTime).toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  const displayDate = item.startTime.split('T')[0];

  return (
    <li className="rounded-2xl transition hover:bg-gray-50">
      <div className="flex min-h-[64px] items-center overflow-hidden rounded-lg bg-fuchsia-100 px-4 py-3 sm:min-h-[72px] sm:px-6 sm:py-4 md:min-h-[80px] md:px-8">
        <button
          type="button"
          onClick={handleToggleOpen}
          aria-expanded={isOpen}
          aria-controls={`schedule-detail-${item.id}`}
          className="w-[72px] pr-5 text-right sm:w-[84px] sm:pr-6 md:w-[96px] md:pr-8"
        >
          <span className="text-base whitespace-nowrap text-gray-700 tabular-nums select-none sm:text-lg">
            {time}
          </span>
        </button>

        <button
          type="button"
          onClick={handleToggleOpen}
          aria-expanded={isOpen}
          aria-controls={`schedule-detail-${item.id}`}
          title={item.title}
          className="min-w-0 flex-1 truncate pr-2 pl-5 text-left sm:pr-3 sm:pl-6 md:pr-4 md:pl-8"
        >
          <span
            className="block truncate text-base text-gray-700 sm:text-lg"
            title={item.title}
          >
            {item.title}
          </span>
        </button>

        <div className="w-[72px] pl-2 sm:w-[84px] md:w-[96px]">
          <div className="flex justify-end gap-1">
            {actionsInfo.map(action => (
              <IconButton
                key={action.key}
                ariaLabel={action.ariaLabel}
                onClick={action.onClick}
              >
                {renderIcon(action.icon)}
              </IconButton>
            ))}
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          id={`schedule-detail-${item.id}`}
          className="rounded-xl bg-fuchsia-50 p-3 text-sm text-gray-800 sm:p-4 sm:text-base"
        >
          <div className="ml-[92px] sm:ml-[108px] md:ml-[128px]">
            {item.place || item.location ? (
              <p>장소: {item.place || item.location}</p>
            ) : (
              <p className="font-medium">{item.title}</p>
            )}
            <p>날짜: {formatDateSlash(displayDate)}</p>

            {isGroupSchedule(item) && (
              <p>
                아티스트: {item.group.name}
                {item.members &&
                  item.members.length > 0 &&
                  ` (${item.members.map(m => m.name).join(', ')})`}
              </p>
            )}
            {isIdolSchedule(item) && <p>아티스트: {item.idol.name}</p>}

            {item.description && (
              <p className="mt-2 whitespace-pre-wrap">{item.description}</p>
            )}
          </div>
        </div>
      )}
    </li>
  );
}
