import { useEffect, useState } from 'react';

export function useDebounce<T>(value: T, delayMilliseconds: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delayMilliseconds);
    return () => clearTimeout(timer);
  }, [value, delayMilliseconds]);
  return debouncedValue;
}
