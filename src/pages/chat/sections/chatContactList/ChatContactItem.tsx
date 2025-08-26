import clsx from 'clsx';

import { UserAvatarImage } from '@/components/common/UserAvatarImage';
import { useUserStore } from '@/stores/userStore';

import type { ChatParticipant } from '../../chat.types';

interface ChatContactItemTypes {
  contactData: ChatParticipant;
}

function ChatContactItem({ contactData }: ChatContactItemTypes) {
  const { user } = useUserStore();
  const userId = user?.user_id;
  const { id, nickname } = contactData;

  const isMyId = id === userId;

  return (
    <div
      className={clsx(
        'flex items-center gap-3 rounded-2xl px-3 py-2',
        isMyId ? 'bg-fuchsia-400' : 'bg-fuchsia-200',
      )}
    >
      <UserAvatarImage />
      <span>{nickname}</span>
    </div>
  );
}

export default ChatContactItem;
