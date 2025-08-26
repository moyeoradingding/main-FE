import { useEffect, useRef } from 'react';

type UseSyncArrayDataParams<T> = {
  serverData?: T[];
  clientData: T[];
  applyFn: (item: T) => void;
  onSync?: (added: T[], removed: T[]) => void;
};

export function useSyncArrayData<T>({
  serverData,
  clientData,
  applyFn,
  onSync,
}: UseSyncArrayDataParams<T>) {
  const prevRef = useRef<T[]>(clientData);
  const hydratedRef = useRef(false);

  // 1) 초기 동기화 (서버 → 클라이언트)
  useEffect(() => {
    if (!serverData || hydratedRef.current) return;
    const clientSet = new Set(clientData);
    serverData.forEach(item => {
      if (!clientSet.has(item)) applyFn(item);
    });
    prevRef.current = [...new Set([...clientData, ...serverData])];
    hydratedRef.current = true;
  }, [serverData, clientData, applyFn]);

  // 2) 이후 동기화 (클라이언트 → 서버)
  useEffect(() => {
    const prev = prevRef.current;
    const curr = clientData;
    if (!hydratedRef.current) {
      prevRef.current = curr;
      return;
    }
    const added = curr.filter(item => !prev.includes(item));
    const removed = prev.filter(item => !curr.includes(item));
    if ((added.length > 0 || removed.length > 0) && onSync)
      onSync(added, removed);
    prevRef.current = curr;
  }, [clientData, onSync]);
}
