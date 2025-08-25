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
import { showErrorToast } from '@/utils/toastUtils';

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
  const { roomId } = useChatStore();
  const [liveMessages, setLiveMessages] = useState<ChatMessage[]>([]);

  const messagesQuery = useInfiniteQuery<
    PaginatedResponse<ChatMessage>,
    Error,
    ChatMessage[]
  >({
    queryKey: ['getChatMessage', roomId],
    queryFn: ({ pageParam }) => getChatMessageAPI(roomId!, Number(pageParam)),
    enabled: !!roomId,
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      if (!lastPage.next) return undefined;
      const url = new URL(lastPage.next);
      const pageStr = url.searchParams.get('page');
      return pageStr || undefined;
    },
    select: data => data.pages.flatMap(page => page.results),
  });

  useEffect(() => {
    if (!socket) return undefined;

    if (messagesQuery.isError) {
      showErrorToast('채팅방 메시지 조회 에러 발생');
    }

    setLiveMessages(messagesQuery.data ?? []);

    // const handleMessage = (event: MessageEvent) => {
    //   const data = JSON.parse(event.data);
    //   console.log('data: ', data);
    //   const newMessage = data.chat_room.last_message;

    //   queryClient.setQueryData(['getChatMessage', roomId], (old: any) => {
    //     if (!old) return [newMessage];
    //     return [...old, newMessage];
    //   });
    // };

    // socket.addEventListener('message', handleMessage);

    // return () => {
    //   socket.removeEventListener('message', handleMessage);
    // };
  }, [messagesQuery.data, messagesQuery.isError, roomId, socket]);

  const sortedChatData = toSortedChats(liveMessages ?? []);

  const groupedChatData = toGroupedChatMap(sortedChatData);

  const flattenChatData = toFlattenChats(groupedChatData);

  return (
    <div className="h-full">
      <Virtuoso
        className="chat-scrollbar flex flex-col py-2 pe-2"
        data={flattenChatData}
        computeItemKey={(_, data) => `D-${data.key}`}
        alignToBottom
        initialTopMostItemIndex={{
          index: flattenChatData.length - 1,
          align: 'end',
        }}
        followOutput={atBottom ? 'smooth' : false}
        atBottomStateChange={setAtBottom}
        itemContent={renderDataByTime}
      />
    </div>
  );
}

export default ChatMessageList;
