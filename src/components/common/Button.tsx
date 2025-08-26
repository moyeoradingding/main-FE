import { cva, type VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';
import { forwardRef } from 'react';

const buttonVariants = cva(
  'relative inline-flex cursor-pointer items-center justify-center transition-colors',
  {
    variants: {
      variant: {
        primary:
          'border-2 border-transparent bg-fuchsia-400 text-white hover:bg-fuchsia-500',
        secondary: 'border-2 border-transparent bg-gray-100 hover:bg-gray-200',
        outline:
          'border-2 border-fuchsia-400 text-fuchsia-400 hover:bg-fuchsia-400 hover:text-white hover:border-fuchsia-400',
        white: 'hover:bg-gray-50',
      },
      shape: {
        default: 'rounded-md',
        pill: 'rounded-full',
      },
      size: {
        sm: 'px-2 py-1.5 text-xs',
        md: 'px-4 py-2 text-sm',
        lg: 'px-10 py-3 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      shape: 'default',
      size: 'md',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  className?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant, shape, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={clsx(buttonVariants({ variant, shape, size }), className)}
        {...props}
      />
    );
  },
);

Button.displayName = 'Button';
