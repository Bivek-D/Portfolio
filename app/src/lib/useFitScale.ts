import { useEffect, useRef, useState } from 'react';

/**
 * Scale `content` down (never up) so it fits inside `box`. The heroes are exactly one screen tall, so on shorter
 * screens the stack shrinks a little instead of running past the bottom.
 */
export function useFitScale() {
  const box = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const b = box.current;
    const c = content.current;
    if (!b || !c) return;
    const fit = () => setScale(Math.min(1, b.clientHeight / c.offsetHeight, b.clientWidth / c.offsetWidth));
    const ro = new ResizeObserver(fit);
    ro.observe(b);
    ro.observe(c);
    fit();
    return () => ro.disconnect();
  }, []);
  return { box, content, scale };
}
