import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';

import ChatContactGroup from './ChatContactGroup';

interface ChatContactListProps {
  isVisible: boolean;
  onToggleList: () => void;
}

function ChatContactList({ isVisible, onToggleList }: ChatContactListProps) {
  const handleRemoveAllMessages = () => {
    // *memo - 채팅 기록 초기화 로직 추가
  };

  return (
    <div className="flex h-full flex-col bg-white lg:bg-gray-50">
      <div className="p-5">
        <button
          type="button"
          className="block cursor-pointer lg:hidden"
          onClick={onToggleList}
        >
          <ChevronLeftIcon className="size-6" />
        </button>
        <button
          type="button"
          className="hidden cursor-pointer lg:ml-auto lg:block"
          onClick={onToggleList}
        >
          {isVisible ? (
            <ChevronDoubleLeftIcon className="size-6" />
          ) : (
            <ChevronDoubleRightIcon className="size-6" />
          )}
        </button>
      </div>
      <ChatContactGroup isVisible={isVisible} />
      <div className={clsx('mx-auto p-5', isVisible ? 'block' : 'hidden')}>
        <button
          type="button"
          className="cursor-pointer text-sm text-gray-500 hover:text-gray-800"
          onClick={handleRemoveAllMessages}
        >
          채팅 기록 초기화
        </button>
      </div>
    </div>
  );
}

export default ChatContactList;
