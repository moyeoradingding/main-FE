import clsx from 'clsx';

import type { GreetingProps } from '../types';

function Greeting({
  title,
  subtitle,
  leftIcon,
  rightAction,
  titleClassName,
  subtitleClassName,
  leftIconClassName,
}: GreetingProps) {
  return (
    <header className="mb-8">
      {/* Desktop */}
      <div className="hidden items-center justify-between gap-6 lg:flex">
        <div className="flex min-w-0 flex-1 items-center gap-3 pt-11 pb-10">
          {leftIcon && (
            <div className={clsx('self-center', leftIconClassName)}>
              {leftIcon}
            </div>
          )}
          <div className="min-w-0">
            <h1
              className={clsx(
                'truncate text-4xl font-bold whitespace-nowrap text-gray-900',
                titleClassName,
              )}
            >
              {title}
            </h1>
            {subtitle && (
              <div
                className={clsx(
                  'mt-2 text-lg text-gray-500',
                  subtitleClassName,
                )}
              >
                {subtitle}
              </div>
            )}
          </div>
        </div>
        {rightAction}
      </div>

      {/* Mobile + Tablet */}
      <div className="lg:hidden">
        <div className="mb-1 text-center">
          <div className="mb-2 flex flex-col items-center justify-center gap-2">
            {leftIcon && (
              <div
                className={clsx(
                  'mx-auto flex h-10 w-10 items-center justify-center',
                  'leading-none',
                  leftIconClassName,
                )}
              >
                <div className="block">{leftIcon}</div>
              </div>
            )}
            <h1
              className={clsx(
                'text-3xl leading-snug font-bold whitespace-pre-line',
                titleClassName,
              )}
            >
              {title}
            </h1>
          </div>
          {subtitle && (
            <div className={clsx('text-lg text-gray-600', subtitleClassName)}>
              {subtitle}
            </div>
          )}
        </div>
        {rightAction && (
          <div className="flex justify-center">{rightAction}</div>
        )}
      </div>
    </header>
  );
}

export default Greeting;
