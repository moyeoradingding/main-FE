import type React from 'react';

export const handleEnterKey =
  (onEnter: () => void, condition = true) =>
  (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && condition) {
      event.preventDefault();
      onEnter();
    }
  };
