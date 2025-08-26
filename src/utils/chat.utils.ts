import type {
  ChatMessage,
  FlattenChatTypes,
  GroupedChatListTypes,
} from '@/pages/chat/chat.types';

export const toKstDate = (iso: string | Date) => {
  const kst = typeof iso === 'string' ? Date.parse(iso) : iso.getTime();
  return new Date(kst + 9 * 60 * 60 * 1000);
};

export const toDateKey = (dt: Date) => {
  const year = dt.getUTCFullYear();
  const month = String(dt.getUTCMonth() + 1).padStart(2, '0');
  const day = String(dt.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const toFiveMinutesKey = (dt: Date) => {
  const hour = String(dt.getUTCHours()).padStart(2, '0');
  const minute = dt.getUTCMinutes();
  const flooredMinute = String(Math.floor(minute / 5) * 5).padStart(2, '0');
  return `${hour}:${flooredMinute}`;
};

export const toSortedChats = (rawData: ChatMessage[]) =>
  [...rawData].sort(
    (a, b) => new Date(a.sent_at).getTime() - new Date(b.sent_at).getTime(),
  );

export const toGroupedChatMap = (sortedData: ChatMessage[]) =>
  sortedData.reduce<GroupedChatListTypes>((acc, cur): GroupedChatListTypes => {
    const kst = toKstDate(cur.sent_at);
    const dKey = toDateKey(kst);
    const tKey = toFiveMinutesKey(kst);

    acc[dKey] ??= {};
    acc[dKey][tKey] ??= [];
    const bucket = acc[dKey][tKey];

    const last = bucket.at?.(-1);

    if (last?.sender.id === cur.sender.id) {
      last.contents.push({ id: cur.id, text: cur.content });
    } else {
      bucket.push({
        id: cur.id,
        sender: cur.sender,
        contents: [{ id: cur.id, text: cur.content }],
      });
    }

    return acc;
  }, {});

export const toFlattenChats = (
  groupedChatMap: GroupedChatListTypes,
): FlattenChatTypes[] =>
  Object.entries(groupedChatMap).flatMap(([dKey, timeMap]) => {
    const firstMessageId = Object.values(timeMap)[0]?.[0]?.id;

    const timeEntries = Object.entries(timeMap).map(([tKey, tValue]) => ({
      type: 'time' as const,
      dKey,
      tKey,
      tValue,
      key: `T-${dKey}-${tKey}-${tValue[0]?.id}`,
    }));
    return [
      { type: 'date' as const, dKey, key: `D-${dKey}-${firstMessageId}` },
      ...timeEntries,
    ];
  });
