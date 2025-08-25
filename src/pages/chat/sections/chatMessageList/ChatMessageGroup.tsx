import { useUserStore } from '@/stores/userStore';

import type { ChatMessageGroupTypes } from '../../chat.types';
import ChatMessageItem from './ChatMessageItem';
import TimeDivider from './TimeDivider';

function ChatMessageGroup({ tKey, tValue }: ChatMessageGroupTypes) {
  const { user } = useUserStore();
  const userId = user?.user_id;

  const isLastMsgMine = tValue.at(-1)?.sender.id === userId;

  return (
    <>
      {tValue.map(msg => (
        <ChatMessageItem key={msg.id} {...msg} />
      ))}

      {isLastMsgMine}
      <TimeDivider tKey={tKey} isLastMsgMine={isLastMsgMine} />
    </>
  );
}

export default ChatMessageGroup;
