import clsx from 'clsx';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function ToggleButton({
  checked = false,
  onChange,
}: ToggleProps) {
  const toggleHandler = () => {
    onChange(!checked);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      className="relative cursor-pointer overflow-hidden rounded-full outline-3 outline-fuchsia-400"
      onClick={toggleHandler}
    >
      <div
        className={clsx(
          'h-4 w-8 transition-colors duration-300 ease-in-out',
          checked ? 'bg-fuchsia-400' : 'bg-white',
        )}
      />
      <div
        className={clsx(
          'absolute top-0.75 left-1 h-2.5 w-2.5 rounded-full transition-all duration-300 ease-in-out',
          checked ? 'translate-x-3.5 bg-white' : 'translate-x-0 bg-fuchsia-400',
        )}
      />
    </button>
  );
}
