import clsx from 'clsx';

import placeholderSmall from '@/assets/images/placeholder-sm.jpg';

import type { AnimationCardProps } from './card.types';

function AnimationCard({
  title = '',
  description = '',
  className,
  ...rest
}: AnimationCardProps) {
  return (
    <div
      className={clsx(
        'relative bottom-0 flex w-72 scale-100 flex-col items-center gap-5 transition-all duration-300 ease-out hover:scale-110 sm:hover:bottom-8 sm:hover:scale-100',
        className,
      )}
      {...rest}
    >
      <img
        src={placeholderSmall}
        alt={title}
        loading="lazy"
        className="rounded-xl shadow-lg"
      />
      <div className="flex flex-col items-center gap-2">
        <h4 className="text-lg font-semibold text-gray-800">{title}</h4>
        <p className="text-center text-base font-normal text-gray-700">
          {description}
        </p>
      </div>
    </div>
  );
}

export default AnimationCard;
