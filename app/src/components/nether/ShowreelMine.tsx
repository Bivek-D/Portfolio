import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { motion } from 'framer-motion';
import { rng } from '@/lib/pixels';
import { playerUrl, publicId, thumbUrl } from '@/lib/cloudinary';
import { useCalmMotion } from '@/lib/motion-setting';
import PixelSprite, { SPRITES } from './PixelSprite';

type Phase = 'intact' | 'mining' | 'broken' | 'playing';
const STAGE_MS = 450; // per crack stage, as in the prototype (3 stages, then it breaks)

interface Props {
  title: string;
  embedUrl: string;
}

/**
 * "Hold to break" showreel (prototype p1): a wall of netherrack blocks covers the reel. Holding the mouse,
 * a finger or Space/Enter cracks it in 3 stages; letting go early resets it. Then it shatters and the reel plays.
 */
export default function ShowreelMine({ title, embedUrl }: Props) {
  const [phase, setPhase] = useState<Phase>('intact');
  const [stage, setStage] = useState(0);
  const timer = useRef<number | undefined>(undefined);
  const calm = useCalmMotion();
  const id = publicId(embedUrl) ?? '';

  const clear = () => window.clearInterval(timer.current);

  const breakWall = useCallback(() => {
    clear();
    setStage(3);
    setPhase('broken');
    window.setTimeout(() => setPhase('playing'), calm ? 200 : 1100);
  }, [calm]);

  const start = useCallback(() => {
    if (phase !== 'intact') return;
    if (calm) return breakWall();
    setPhase('mining');
    setStage(1);
    let s = 1;
    timer.current = window.setInterval(() => {
      s += 1;
      if (s > 3) breakWall();
      else setStage(s);
    }, STAGE_MS);
  }, [phase, calm, breakWall]);

  const stop = useCallback(() => {
    if (phase !== 'mining') return;
    clear();
    setPhase('intact');
    setStage(0);
  }, [phase]);

  useEffect(() => clear, []);

  const onKeyDown = (e: KeyboardEvent) => {
    if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) {
      e.preventDefault();
      start();
    }
  };
  const onKeyUp = (e: KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') stop();
  };

  const debris = useMemo(() => {
    const r = rng(5);
    return Array.from({ length: 46 }, () => {
      const a = r() * Math.PI * 2;
      const d = 0.35 + r() * 0.5;
      return {
        x: Math.cos(a) * d * 55,
        y: Math.sin(a) * d * 55,
        s: 10 + r() * 18,
        rot: (r() - 0.5) * 220,
        c: ['#6E2626', '#5A1C1C', '#7A2B2B', '#4A1616'][Math.floor(r() * 4)],
      };
    });
  }, []);

  const walled = phase === 'intact' || phase === 'mining';

  return (
    <div className="relative aspect-video bg-[#0d0303] overflow-hidden select-none">
      {/* the reel itself: a light thumbnail until it plays, then the player */}
      {phase === 'playing' ? (
        <iframe
          src={playerUrl(embedUrl, true)}
          title={title}
          className="absolute inset-0 w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <img src={thumbUrl(id, 1280)} alt={`${title} — thumbnail`} loading="lazy"
          className="absolute inset-0 w-full h-full object-cover" />
      )}

      {walled && (
        <button
          type="button"
          aria-label={`Hold to break the wall and play the ${title.toLowerCase()}`}
          className={`absolute inset-0 w-full cursor-pointer touch-none focus-visible:outline focus-visible:outline-4 focus-visible:-outline-offset-4 focus-visible:outline-white ${phase === 'mining' ? 'mine-shake' : ''}`}
          onPointerDown={(e) => {
            try {
              e.currentTarget.setPointerCapture(e.pointerId);
            } catch {
              /* not a real pointer (e.g. automated tests) */
            }
            start();
          }}
          onPointerUp={stop}
          onPointerCancel={stop}
          onLostPointerCapture={stop}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          onClick={(e) => {
            // assistive tech sends a click without holding: break straight away
            if (e.detail === 0 && phase === 'intact') breakWall();
          }}
          onContextMenu={(e) => e.preventDefault()}
        >
          <span aria-hidden className="absolute inset-0 pixelated"
            style={{ backgroundColor: '#3D0000', backgroundImage: 'url(/nether/block-netherrack-96.png)', backgroundSize: '96px 96px' }} />
          <span aria-hidden className="absolute inset-0"
            style={{ background: 'radial-gradient(ellipse at center, rgba(255,122,42,0.2) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.75) 100%)' }} />
          {stage > 0 && (
            <span aria-hidden className="absolute inset-0 pixelated"
              style={{ backgroundImage: `url(/nether/crack-${stage}-96.png)`, backgroundSize: '96px 96px' }} />
          )}
          <span className={`relative flex flex-col items-center justify-center gap-[18px] h-full ${phase === 'intact' ? 'opacity-[0.55]' : ''}`}>
            <span aria-hidden className="relative block w-[84px] h-[84px]"
              style={{ transform: `rotate(${phase === 'mining' ? -55 : -35}deg)`, transition: 'transform .15s steps(2)' }}>
              <PixelSprite rows={SPRITES.pickHead} palette={{ '#': '#8E7EA0' }} cell={6.5}
                style={{ filter: 'drop-shadow(3px 3px 0 rgba(0,0,0,0.7))' }} />
              <PixelSprite rows={Array(9).fill('......#......')} palette={{ '#': '#9A6A34' }} cell={6.5}
                className="absolute left-0 top-[13px]" style={{ filter: 'drop-shadow(3px 3px 0 rgba(0,0,0,0.7))' }} />
            </span>
            <span className="font-pixelify font-bold text-[25px] tracking-[0.06em] text-white [text-shadow:2px_2px_0_#000]">
              {phase === 'mining' ? 'MINING…' : 'HOLD TO BREAK'}
            </span>
            {phase === 'mining' && (
              <span aria-hidden className="flex gap-1">
                {[0, 1, 2, 3].map((i) => (
                  <span key={i} className="w-[34px] h-[10px] border-2 border-black"
                    style={i < stage ? { background: '#FF8A2A', boxShadow: '0 0 8px rgba(255,106,26,0.7)' } : { background: 'rgba(255,255,255,0.12)' }} />
                ))}
              </span>
            )}
          </span>
        </button>
      )}

      {phase === 'broken' && (
        <div className="absolute inset-0" aria-live="polite">
          <div className="absolute inset-0 bg-[#1A0404]/50" />
          {!calm && debris.map((p, i) => (
            <motion.span
              key={i}
              aria-hidden
              className="absolute left-1/2 top-1/2 -ml-3 -mt-3 border-[1.5px] border-[#2A0A0A]"
              style={{ width: p.s, height: p.s, background: p.c, boxShadow: '2px 3px 0 rgba(0,0,0,0.6)' } as CSSProperties}
              initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
              animate={{ x: p.x * 8, y: [p.y * 4.5, p.y * 4.5 + 160], rotate: p.rot, opacity: [1, 1, 0] }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          ))}
          <div className="relative h-full flex flex-col items-center justify-center gap-4">
            <button type="button" onClick={() => setPhase('playing')} aria-label={`Play the ${title.toLowerCase()}`}
              className="relative w-[88px] h-[88px]">
              <span aria-hidden className="px-clip absolute inset-0 bg-[#140202] translate-y-2" style={{ '--n': '3px' } as CSSProperties} />
              <span aria-hidden className="px-clip absolute inset-0" style={{ '--n': '3px', background: 'linear-gradient(180deg,#FFE27A,#FFA634 60%,#FF6E1E)', filter: 'drop-shadow(0 0 12px rgba(255,106,26,0.6))' } as CSSProperties} />
              <span aria-hidden className="px-clip absolute left-1 right-1 top-1 bottom-3" style={{ '--n': '2px', background: 'linear-gradient(180deg,#CC2A1C,#A81A14)' } as CSSProperties} />
              <PixelSprite rows={SPRITES.play} palette={{ '#': '#fff' }} cell={4} className="absolute left-[36px] top-[22px]" />
            </button>
            <p className="font-pixelify font-bold text-[25px] tracking-[0.06em] text-[#FFC23A] [text-shadow:2px_2px_0_#3A0C04,0_0_14px_rgba(255,179,71,0.6)]">
              SHOWREEL UNLOCKED
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
