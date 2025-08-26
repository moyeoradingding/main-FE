import type { Schedule } from '@/types/schedule';

// ========== 스케줄 데이터 처리 ==========

/** 선택한 날짜의 스케줄만 필터링 (YYYY-MM-DD 형식의 날짜 문자열) */
export function filterByDate(items: Schedule[], dateISO: string): Schedule[] {
  return items.filter(it => it.startTime.startsWith(dateISO));
}

/** 시간 오름차순 정렬 ('HH:mm' 가정) */
export function sortByTimeAsc(items: Schedule[]): Schedule[] {
  return [...items].sort((a, b) => a.startTime.localeCompare(b.startTime));
}

// ========== 날짜 포맷 변환 ==========

/** 'YYYY-MM-DD' -> 'YYYY/MM/DD' (일반적인 날짜 표시) */
export function formatDateSlash(d: string): string {
  return d.replaceAll('-', '/');
}

/** 'YYYY-MM-DD' -> 'YYYY.MM.DD' (. 날짜 표시) */
export function formatDateDot(d: string): string {
  return d.replaceAll('-', '.');
}

/** 'YYYY-MM-DD' -> 'M/D' (간단한 월일 표시) */
export const formatMonthDay = (dateISO: string) => {
  const [, m, d] = dateISO.split('-');
  return `${Number(m)}/${Number(d)}`;
};

/** Date -> 'YYYY-MM-DD' (캘린더 연동용) */
export function toDateISO(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}
