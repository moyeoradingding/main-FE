import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

import {
  createNewChatRoomAPI,
  getGroupMembersAPI,
  getMyChatRoomListAPI,
} from '@/api/chatApi';
import { useChatStore } from '@/stores/chatRoomIdStore';
import { useUserStore } from '@/stores/userStore';
import { showErrorToast, showSuccessToast } from '@/utils/toastUtils';

import ChatComposer from './sections/chatComposer/ChatComposer';
import ChatContactList from './sections/chatContactList/ChatContactList';
import ChatMessageList from './sections/chatMessageList/ChatMessageList';

interface MemberTypes {
  id: number;
  nickname: string;
  role: 'IDOL' | 'MANAGER';
  profile_image_url: string | null;
}

function Chat() {
  const [isVisible, setIsVisible] = useState(false);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const { roomId, setRoomId } = useChatStore();
  const { user, accessToken } = useUserStore();
  const userId = user?.user_id;
  const queryClient = useQueryClient();

  const handleToggleConversationList = () => {
    setIsVisible(prev => !prev);
  };

  const roomListQuery = useQuery({
    queryKey: ['getMyChatRoomList'],
    queryFn: getMyChatRoomListAPI,
  });

  const groupMembersQuery = useQuery({
    queryKey: ['getGroupMembers'],
    queryFn: getGroupMembersAPI,
  });

  const { mutate: createRoom } = useMutation({
    mutationFn: (memberIds: number[]) => {
      const currentUserId = userId || memberIds[0];
      return createNewChatRoomAPI(currentUserId, memberIds);
    },
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

    if (roomList.count === 0 && groupMembersQuery.data) {
      const memberIds = groupMembersQuery.data.map(
        (member: MemberTypes) => member.id,
      );
      createRoom(memberIds);
    } else {
      const currentRoomId = roomList.results[0].id;
      setRoomId(currentRoomId);
    }
  }, [
    createRoom,
    groupMembersQuery.data,
    roomListQuery.data,
    roomListQuery.isError,
    setRoomId,
  ]);

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

    // eslint-disable-next-line consistent-return
    return () => ws.close();
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
