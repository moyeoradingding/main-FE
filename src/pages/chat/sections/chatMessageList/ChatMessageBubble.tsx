import clsx from 'clsx';

import { ChatMessageBubbleStyles } from '../../chat.styles';
import type { ChatMessageBubbleTypes } from '../../chat.types';

function ChatMessageBubble({ isMyChat, text }: ChatMessageBubbleTypes) {
  return (
    <div className={clsx(ChatMessageBubbleStyles({ myChat: isMyChat }))}>
      {text}
    </div>
  );
}

export default ChatMessageBubble;
