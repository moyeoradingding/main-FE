import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

import DefaultInput from './DefaultInput';
import { iconStyle } from './input.styles';
import type { InputProps } from './input.types';

function PasswordInput({ label, className, ...rest }: InputProps) {
  const [isHidden, setIsHidden] = useState<boolean>(true);

  const handleClick = (): void => setIsHidden(prev => !prev);

  return (
    <div className="relative">
      <DefaultInput
        type={isHidden ? 'password' : 'text'}
        label={label}
        className={className}
        {...rest}
      />
      {isHidden ? (
        <EyeIcon onClick={handleClick} className={iconStyle} />
      ) : (
        <EyeSlashIcon onClick={handleClick} className={iconStyle} />
      )}
    </div>
  );
}

export default PasswordInput;
