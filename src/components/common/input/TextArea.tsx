import clsx from 'clsx';

import { defaultFieldStyle, labelStyle } from './input.styles';
import type { TextAreaProps } from './input.types';

function TextArea({ label, className, ...rest }: TextAreaProps) {
  return (
    <div className="relative flex h-[152px] items-end">
      <textarea
        id="message"
        rows={5}
        placeholder=" "
        className={clsx(defaultFieldStyle, className)}
        {...rest}
      />
      <label className={labelStyle} htmlFor="message">
        {label}
      </label>
    </div>
  );
}

export default TextArea;
