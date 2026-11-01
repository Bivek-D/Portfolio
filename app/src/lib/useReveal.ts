import { useEffect, useRef, useState } from 'react';
import { useCalmMotion } from '@/lib/motion-setting';

/**
 * "Opens when you scroll to it", once. The server-rendered page (and anyone without JS) gets the open state, so the
 * content is always in the HTML; in the browser, a section that is still below the screen closes itself and opens
 * when it scrolls into view. With motion turned off it simply stays open.
 */
export function useReveal<T extends Element>(threshold = 0.3) {
  const ref = useRef<T>(null);
  const [open, setOpen] = useState(true);
  const calm = useCalmMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || calm) return;
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.8 && r.bottom > 0) return; // already on screen: leave it open
    let io: IntersectionObserver | undefined;
    const raf = requestAnimationFrame(() => {
      setOpen(false);
      io = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) {
            io?.disconnect();
            setOpen(true);
          }
        },
        { threshold },
      );
      io.observe(el);
    });
    return () => {
      cancelAnimationFrame(raf);
      io?.disconnect();
    };
  }, [calm, threshold]);

  return { ref, open };
}
