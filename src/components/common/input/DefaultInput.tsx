import { cva } from 'class-variance-authority';
import clsx from 'clsx';

import { defaultFieldStyle, labelStyle } from './input.styles';
import type { InputProps } from './input.types';

const inputStyles = cva(`${defaultFieldStyle}`, {
  variants: {
    intent: {
      default: 'p-3',
      hasIcon: 'pt-3 pr-11 pb-3 pl-3',
    },
  },
  defaultVariants: {
    intent: 'default',
  },
});

function DefaultInput({
  type = 'text',
  label,
  className,
  ...rest
}: InputProps) {
  const intent = ['date', 'time', 'password'].includes(type)
    ? 'hasIcon'
    : 'default';

  const classes = clsx(inputStyles({ intent }), className);

  return (
    <div className="relative flex h-18 items-end">
      <input
        id={type}
        type={type}
        placeholder=" "
        className={classes}
        {...rest}
      />
      <label htmlFor={type} className={labelStyle}>
        {label}
      </label>
    </div>
  );
}

export default DefaultInput;
