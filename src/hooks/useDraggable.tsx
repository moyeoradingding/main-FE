import type { RefObject } from 'react';
import { useRef } from 'react';

type DraggableHook = {
  onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
};

export const useDraggable = (
  scrollerRef: RefObject<HTMLDivElement | null>,
): DraggableHook => {
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollerRef.current) return;

    e.preventDefault();
    isDragging.current = true;
    startX.current = e.clientX;
    scrollLeftStart.current = scrollerRef.current.scrollLeft;

    const onMouseMove = (mouseEvent: MouseEvent) => {
      const el = scrollerRef.current;
      if (!isDragging.current || !el) return;
      const dx = mouseEvent.clientX - startX.current;
      el.scrollLeft = scrollLeftStart.current - dx;
    };

    const onMouseUp = () => {
      isDragging.current = false;
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  return { onMouseDown };
};
