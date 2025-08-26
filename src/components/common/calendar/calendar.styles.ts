import clsx from 'clsx';

const baseStyle =
  "relative before:absolute before:w-1 before:content-[''] before:transition-all before:duration-300 before:ease-out after:absolute after:h-1 after:content-[''] after:transition-all after:duration-300 after:ease-out before:h-0 after:w-0";

const hoverStyle =
  'hover:before:bg-fuchsia-400 hover:after:bg-fuchsia-400 hover:before:h-full hover:after:w-full';

export const buttonHoverStyle = clsx(
  'before:top-0 before:left-0 after:top-0 after:left-0',
  baseStyle,
  hoverStyle,
);

export const divHoverStyle = clsx(
  'before:bottom-0 before:right-0 after:bottom-0 after:left-0',
  baseStyle,
  hoverStyle,
);

export const ButtonStyle =
  'group border-none hover:border-none hover:bg-gray-300';

export const IconStyle = 'size-5 text-gray-400 group-hover:text-white';
