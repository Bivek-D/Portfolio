import { useEffect, useRef } from 'react';
import { useCalmMotion } from '@/lib/motion-setting';

/**
 * Looping hero background (9s, crossfaded loop, no audio, ~1.1 MB). The poster shows first and stays when motion
 * is off; the video only plays while the hero is on screen.
 */
export default function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const calm = useCalmMotion();

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (calm) {
      v.pause();
      return;
    }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) v.play().catch(() => {});
      else v.pause();
    });
    io.observe(v);
    return () => io.disconnect();
  }, [calm]);

  return (
    <video
      ref={ref}
      className="absolute inset-0 w-full h-full object-cover"
      poster="/nether/nether-bg-poster.webp"
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      tabIndex={-1}
    >
      <source src="/nether/nether-bg.webm" type="video/webm" />
      <source src="/nether/nether-bg.mp4" type="video/mp4" />
    </video>
  );
}
