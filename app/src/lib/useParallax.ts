import { useEffect, useRef } from 'react';
import { useCalmMotion } from '@/lib/motion-setting';

/**
 * Drives the hero's parallax through CSS variables on `ref`: --mx / --my (-1..1, eased towards the cursor; mouse and
 * pen only) and --sy (page scroll in px, capped at one screen). Layers turn these into their own depth with
 * calc(). Nothing runs with motion off, and a frame is only requested while something is still moving.
 */
export function useParallax<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const calm = useCalmMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || calm) return;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const target = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };
    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const k = 1 - Math.exp(-Math.min(now - last, 100) / 160);
      last = now;
      cur.x += (target.x - cur.x) * k;
      cur.y += (target.y - cur.y) * k;
      el.style.setProperty('--mx', cur.x.toFixed(4));
      el.style.setProperty('--my', cur.y.toFixed(4));
      el.style.setProperty('--sy', String(Math.min(window.scrollY, window.innerHeight)));
      raf = Math.abs(target.x - cur.x) + Math.abs(target.y - cur.y) > 0.001 ? requestAnimationFrame(tick) : 0;
    };
    const kick = () => {
      if (!raf) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      target.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.y = (e.clientY / window.innerHeight) * 2 - 1;
      kick();
    };
    const onScroll = () => {
      if (window.scrollY < window.innerHeight * 1.2) kick();
    };
    if (fine) window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
      ['--mx', '--my', '--sy'].forEach((v) => el.style.removeProperty(v));
    };
  }, [calm]);

  return ref;
}
