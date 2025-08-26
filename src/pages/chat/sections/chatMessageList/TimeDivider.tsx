import clsx from 'clsx';

import { ChatTimeStyles } from '../../chat.styles';

function TimeDivider({
  tKey,
  isLastMsgMine,
}: {
  tKey: string;
  isLastMsgMine: boolean;
}) {
  return (
    <div className={clsx(ChatTimeStyles({ lastMsgMine: isLastMsgMine }))}>
      {tKey}
    </div>
  );
}

export default TimeDivider;
