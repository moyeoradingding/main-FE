import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import React from 'react';

export type SearchBarProps = {
  placeholder?: string;
  inputValue?: string;
  onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchClick?: () => void;
};

export default function SearchBar({
  placeholder = '아이돌의 이름이나 그룹명을 검색해보세요',
  inputValue,
  onInputChange,
  onSearchClick,
}: SearchBarProps) {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && typeof onSearchClick === 'function') {
      onSearchClick();
    }
  };

  const handleButtonClick = () => {
    if (typeof onSearchClick === 'function') {
      onSearchClick();
    }
  };

  return (
    <div className="relative mx-auto w-full max-w-sm sm:max-w-md lg:max-w-lg">
      <input
        type="text"
        value={inputValue}
        onChange={onInputChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        aria-label="검색어 입력"
        className="w-full rounded-full border border-gray-300 bg-white px-6 py-2 pr-12 text-base text-gray-900 placeholder-gray-400 transition-colors duration-200 focus:border-fuchsia-400 focus:ring-1 focus:ring-fuchsia-400 focus:outline-none"
      />
      <button
        type="button"
        onClick={handleButtonClick}
        aria-label="검색"
        className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-400 transition-colors duration-200 hover:text-fuchsia-400"
      >
        <MagnifyingGlassIcon className="h-6 w-6" />
      </button>
    </div>
  );
}
