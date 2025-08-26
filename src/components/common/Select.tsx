import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';

import { handleToggleOnKeyDown } from '@/utils/handleToggleOnKeyDown';

interface SelectProps {
  list: Array<{ id: string | number; label: string }>;
  placeholder?: string;
  size?: 'primary' | 'small';
  className?: string;
  value: string | number | undefined;
  onChange: (value: string | number) => void;
}

export default function Select({
  list,
  placeholder = '옵션을 선택하세요',
  size = 'primary',
  className,
  value,
  onChange,
}: SelectProps) {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<(HTMLLIElement | null)[]>([]);

  const displayedValue =
    list.find(item => item.id === value)?.label || placeholder;

  const handleOnChangeSelectValue = (
    e: React.MouseEvent<HTMLLIElement> | React.KeyboardEvent<HTMLLIElement>,
  ) => {
    const { id } = e.currentTarget.dataset;
    if (id) {
      onChange(id);
      setShowOptions(false);
    }
    e.stopPropagation();
  };

  useEffect(() => {
    if (showOptions) {
      const focusIndex = list.findIndex(item => item.id === value);
      if (focusIndex !== -1 && optionRefs.current[focusIndex]) {
        optionRefs.current[focusIndex]?.focus();
      } else if (optionRefs.current[0]) {
        optionRefs.current[0]?.focus();
      }
    }
  }, [showOptions, value, list]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        selectRef.current &&
        e.target instanceof Node &&
        !selectRef.current.contains(e.target)
      ) {
        setShowOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [selectRef]);

  const handleOptionKeyDown = (
    e: React.KeyboardEvent<HTMLLIElement>,
    index: number,
  ) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleOnChangeSelectValue(e);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (index + 1) % list.length;
      optionRefs.current[nextIndex]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (index - 1 + list.length) % list.length;
      optionRefs.current[prevIndex]?.focus();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      className={clsx(
        "relative rounded-lg border-1 border-gray-200 bg-white text-sm text-gray-500 before:absolute before:right-3 before:text-lg before:content-['⌵']",
        size === 'primary' && 'px-3 py-3 before:top-1',
        size === 'small' && 'px-2 py-2 before:top-0',
        className,
      )}
      onClick={() => setShowOptions(prev => !prev)}
      onKeyDown={e => handleToggleOnKeyDown(e, setShowOptions)}
      ref={selectRef}
    >
      <label htmlFor="custom-select">{displayedValue}</label>
      {showOptions && (
        <ul
          id="custom-select"
          className={clsx(
            'absolute left-0 z-100 flex w-full flex-col gap-1 rounded-lg border-1 border-gray-200 bg-white p-1',
            size === 'primary' && 'top-12',
            size === 'small' && 'top-10',
          )}
        >
          {list.map((data, index) => (
            <li
              key={data.id}
              role="option"
              tabIndex={0}
              ref={el => {
                optionRefs.current[index] = el;
              }}
              aria-selected={data.id === value}
              className={clsx(
                'text-black hover:bg-gray-50 focus:outline-none focus-visible:ring-1 focus-visible:ring-gray-300',
                data.id === value && 'font-semibold',
                size === 'primary' && 'px-8 py-3',
                size === 'small' && 'px-2 py-2',
                index === 0 && 'rounded-t-md',
                index === list.length - 1 && 'rounded-b-md',
              )}
              data-id={data.id}
              onClick={handleOnChangeSelectValue}
              onKeyDown={e => handleOptionKeyDown(e, index)}
            >
              {data.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
