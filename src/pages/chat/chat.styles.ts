import { cva } from 'class-variance-authority';

export const ChatMessageBubbleStyles = cva(
  'w-fit max-w-[70%] rounded-2xl px-3 py-2 mt-2',
  {
    variants: {
      myChat: {
        true: 'bg-fuchsia-300 mr-2',
        false: 'bg-fuchsia-100',
      },
    },
    defaultVariants: {
      myChat: false,
    },
  },
);

export const ChatMessageItemStyles = cva('flex w-full', {
  variants: {
    myChat: {
      true: 'flex-col items-end gap-1',
      false: ' gap-2',
    },
  },
  defaultVariants: {
    myChat: false,
  },
});

export const ChatTimeStyles = cva(
  'py-1 text-[10px] font-medium text-gray-500',
  {
    variants: {
      lastMsgMine: {
        true: 'pl-0 text-right mr-2',
        false: 'pl-12',
      },
    },
    defaultVariants: {
      lastMsgMine: false,
    },
  },
);

export const ChatComposerButtonStyles =
  'group aspect-square h-full w-fit cursor-pointer rounded-full p-1.5';
