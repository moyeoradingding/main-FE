import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

import { createNewChatRoomAPI, getMyChatRoomListAPI } from '@/api/chatApi';
import { useChatStore } from '@/stores/chatRoomIdStore';
import { useUserStore } from '@/stores/userStore';
import { showErrorToast, showSuccessToast } from '@/utils/toastUtils';

import ChatComposer from './sections/chatComposer/ChatComposer';
import ChatContactList from './sections/chatContactList/ChatContactList';
import ChatMessageList from './sections/chatMessageList/ChatMessageList';

const GROUP_NAME_TEST = 'test';

function Chat() {
  const [isVisible, setIsVisible] = useState(false);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const { roomId, setRoomId } = useChatStore();
  const { accessToken } = useUserStore();
  const queryClient = useQueryClient();

  const handleToggleConversationList = () => {
    setIsVisible(prev => !prev);
  };

  const roomListQuery = useQuery({
    queryKey: ['getMyChatRoomList'],
    queryFn: getMyChatRoomListAPI,
  });

  const { mutate: createRoom } = useMutation({
    mutationFn: () => createNewChatRoomAPI(GROUP_NAME_TEST),
    onSuccess: newRoom => {
      showSuccessToast('채팅방 생성 성공');
      setRoomId(newRoom.id);
      queryClient.invalidateQueries({ queryKey: ['getMyChatRoomList'] });
    },
    onError: () => {
      showErrorToast('채팅방 생성 에러 발생');
    },
  });

  useEffect(() => {
    const roomList = roomListQuery.data;

    if (!roomList) return;

    if (roomListQuery.isError) {
      showErrorToast('채팅방 목록 조회 에러 발생');
      return;
    }

    if (roomList.count === 0) {
      createRoom();
    } else {
      const currentRoomId = roomList.results[0].id;
      setRoomId(currentRoomId);
      showSuccessToast(`채팅방 목록을 불러왔습니다!`);
    }
  }, [createRoom, roomListQuery.data, roomListQuery.isError, setRoomId]);

  useEffect(() => {
    if (!roomId) return;

    const ws = new WebSocket(
      `wss://api.moyeoradingding.site/ws/chats/${roomId}/?token=${accessToken}`,
    );

    ws.onopen = () => {
      showSuccessToast(`채팅방에 연결했습니다!`);
    };

    ws.onerror = () => {
      showErrorToast(`채팅방 연결을 실패했습니다😥`);
    };

    ws.onclose = () => {
      showErrorToast(`채팅방 연결이 중단됐습니다😓`);
    };

    setSocket(ws);
  }, [accessToken, roomId]);

  return (
    <div className="relative flex h-[calc(100dvh-64px)]">
      <aside
        className={clsx(
          'h-full',
          isVisible
            ? 'absolute z-10 block w-full lg:static lg:w-auto lg:flex-1'
            : 'hidden lg:block',
        )}
      >
        <ChatContactList
          isVisible={isVisible}
          onToggleList={handleToggleConversationList}
        />
      </aside>
      <article className="relative flex min-h-0 flex-3 flex-col px-4">
        <section className="min-h-0 flex-1 pt-4">
          <ChatMessageList socket={socket} />
        </section>
        <section className="shrink-0">
          <ChatComposer
            socket={socket}
            onToggleList={handleToggleConversationList}
          />
        </section>
      </article>
    </div>
  );
}

export default Chat;
