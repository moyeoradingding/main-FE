import type { IconButtonProps } from './dateSchedule.types';

const baseBtn =
  'inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-md hover:bg-fuchsia-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400';

export function IconButton({
  ariaLabel,
  onClick,
  children,
  className,
  disabled = false,
}: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      title={ariaLabel}
      className={className ? `${baseBtn} ${className}` : baseBtn}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
