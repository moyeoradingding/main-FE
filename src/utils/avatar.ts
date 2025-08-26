import { toAbsolute } from '@/utils/toAbsolute';

// Dicebear fallback
export const avatarOf = (seed: string) =>
  `https://api.dicebear.com/8.x/fun-emoji/svg?seed=${encodeURIComponent(seed)}`;

// 서버 url 있으면 절대경로, 없으면 dicebear
export const avatarFromServerOrDicebear = (
  rawUrl: string | null | undefined,
  seed: string,
) => {
  const trimmed = typeof rawUrl === 'string' ? rawUrl.trim() : '';
  if (trimmed) return toAbsolute(trimmed);
  return avatarOf(seed);
};
