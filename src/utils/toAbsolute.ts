export const toAbsolute = (url: string) => {
  if (/^https?:\/\//i.test(url)) return url;
  const base = (import.meta.env.VITE_API_TARGET_URL ?? '').replace(/\/+$/, '');
  const path = url.replace(/^\/+/, '');
  return `${base}/${path}`;
};
