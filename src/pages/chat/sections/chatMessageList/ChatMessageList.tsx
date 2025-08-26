import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Virtuoso } from 'react-virtuoso';

import { getChatMessageAPI } from '@/api/chatApi';
import { useChatStore } from '@/stores/chatRoomIdStore';
import {
  toFlattenChats,
  toGroupedChatMap,
  toSortedChats,
} from '@/utils/chat.utils';

import type {
  ChatMessage,
  FlattenChatTypes,
  PaginatedResponse,
} from '../../chat.types';
import ChatMessageGroup from './ChatMessageGroup';
import DateDivider from './DateDivider';

const renderDataByTime = (_: number, chatData: FlattenChatTypes) => {
  if (chatData.type === 'date') return <DateDivider dKey={chatData.dKey} />;

  return <ChatMessageGroup tKey={chatData.tKey} tValue={chatData.tValue} />;
};

interface ChatMessageListProps {
  socket: WebSocket | null;
}

function ChatMessageList({ socket }: ChatMessageListProps) {
  const [atBottom, setAtBottom] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [rawMessages, setRawMessages] = useState<ChatMessage[]>([]);
  const { roomId } = useChatStore();

  const messagesQuery = useInfiniteQuery<
    PaginatedResponse<ChatMessage>,
    Error,
    any
  >({
    queryKey: ['getChatMessage', roomId],
    queryFn: ({ pageParam }) => getChatMessageAPI(roomId!, Number(pageParam)),
    enabled: !!roomId,
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      if (!lastPage.next) return undefined;
      const url = new URL(lastPage.next);
      return Number(url.searchParams.get('page'));
    },
  });

  useEffect(() => {
    if (isFirstLoad && messagesQuery.isSuccess && messagesQuery.data) {
      setIsFirstLoad(false);
      setRawMessages(messagesQuery.data.pages[0].results);
    }
  }, [isFirstLoad, messagesQuery.data, messagesQuery.isSuccess]);

  useEffect(() => {
    if (!socket || !messagesQuery.data) return undefined;

    const handleMessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);

      if (data.type === 'chat.message') {
        const newMessage: ChatMessage = data.message;
        setRawMessages(prev => [...prev, newMessage]);
      }
    };

    socket.addEventListener('message', handleMessage);

    return () => {
      socket.removeEventListener('message', handleMessage);
    };
  }, [messagesQuery, socket]);

  const handleFetchNextPage = async (): Promise<void> => {
    const res = await messagesQuery.fetchNextPage();
    const lastPage = res.data?.pages.at(-1);
    if (!lastPage) return;

    setRawMessages(prev => [...lastPage.results, ...prev]);
  };

  const sorted = toSortedChats(rawMessages);
  const grouped = toGroupedChatMap(sorted);
  const flattenedChatData = toFlattenChats(grouped);

  return (
    <div className="h-full">
      <Virtuoso
        className="chat-scrollbar py-2 pe-2"
        data={flattenedChatData}
        initialTopMostItemIndex={flattenedChatData.length - 1}
        firstItemIndex={10000 - flattenedChatData.length}
        computeItemKey={(_, data) => data.key}
        followOutput={atBottom ? 'smooth' : false}
        atBottomStateChange={setAtBottom}
        itemContent={renderDataByTime}
        atTopStateChange={atTop => {
          if (
            atTop &&
            messagesQuery.hasNextPage &&
            !messagesQuery.isFetchingNextPage
          )
            handleFetchNextPage();
        }}
        increaseViewportBy={{ top: 200, bottom: 0 }}
      />
    </div>
  );
}

export default ChatMessageList;
