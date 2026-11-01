import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { useCalmMotion } from '@/lib/motion-setting';
import type { CharacterHandle } from './character3d';

function webglOk() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

/**
 * The character on the K. The still image is in the server-rendered HTML (fast first paint, crawlers, no-JS); once the
 * page is idle the 3D model loads (its own chunk, three.js included) and fades in over it. With motion off, without
 * WebGL, or if loading fails, the image simply stays. The 3D version only renders while the hero is on screen.
 */
export default function Character3D({ imgStyle, canvasStyle }: { imgStyle: CSSProperties; canvasStyle: CSSProperties }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const live = useRef<CharacterHandle | null>(null);
  const [ready, setReady] = useState(false);
  const calm = useCalmMotion();

  useEffect(() => {
    const el = canvas.current;
    if (!el || calm || !webglOk()) return;
    let handle: CharacterHandle | null = null;
    let cancelled = false;
    let visible = true;
    const cleanups: (() => void)[] = [];

    const start = async () => {
      try {
        const { createCharacter } = await import('./character3d');
        if (cancelled) return;
        handle = createCharacter(el, () => {
          if (!cancelled) setReady(true);
        });
      } catch {
        return; // keep the still image
      }
      const h = handle;
      live.current = h;
      const sync = () => h.setRunning(visible && document.visibilityState === 'visible');
      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height * 0.3; // roughly his eyes
        h.look((e.clientX - cx) / (window.innerWidth * 0.45), (e.clientY - cy) / (window.innerHeight * 0.55));
      };
      const io = new IntersectionObserver(([e]) => {
        visible = e.isIntersecting;
        sync();
      });
      io.observe(el);
      const ro = new ResizeObserver(() => h.resize());
      ro.observe(el);
      window.addEventListener('pointermove', onMove, { passive: true });
      document.addEventListener('visibilitychange', sync);
      sync();
      cleanups.push(() => {
        io.disconnect();
        ro.disconnect();
        window.removeEventListener('pointermove', onMove);
        document.removeEventListener('visibilitychange', sync);
      });
    };

    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void };
    const id = w.requestIdleCallback ? w.requestIdleCallback(() => void start(), { timeout: 2500 }) : window.setTimeout(() => void start(), 900);
    return () => {
      cancelled = true;
      if (w.cancelIdleCallback) w.cancelIdleCallback(id);
      else window.clearTimeout(id);
      cleanups.forEach((f) => f());
      live.current = null;
      handle?.dispose();
      setReady(false);
    };
  }, [calm]);

  return (
    <>
      <img src="/overworld/character.webp" alt="" width={142} height={262} decoding="async"
        className="absolute h-auto drop-shadow-[4px_8px_10px_rgba(0,0,0,0.45)] pointer-events-none transition-opacity duration-500"
        style={{ ...imgStyle, opacity: ready ? 0 : 1 }} />
      <canvas ref={canvas} aria-hidden title="Say hi"
        onPointerDown={(e) => {
          if (e.button === 0) live.current?.wave();
        }}
        className="absolute transition-opacity duration-500 [filter:drop-shadow(4px_8px_10px_rgba(0,0,0,0.4))]"
        style={{ ...canvasStyle, opacity: ready ? 1 : 0, pointerEvents: ready ? 'auto' : 'none', cursor: ready ? 'pointer' : undefined }} />
    </>
  );
}
