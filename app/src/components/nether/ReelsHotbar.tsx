import { useEffect, useRef, useState, type CSSProperties } from 'react';
import type { ReelSlot } from '@/data/nether';
import { playerUrl, publicId, thumbUrl } from '@/lib/cloudinary';
import PixelSprite, { SPRITES } from './PixelSprite';

/**
 * Reels as a Minecraft hotbar (prototype p2): small slots; hovering (or focusing / first tap) grows a slot into the
 * full vertical reel card, leaving shrinks it back, clicking plays it. Keys 1–5 pick a reel while the bar is in view.
 * The stage keeps a fixed height so the page never jumps.
 */
export default function ReelsHotbar({ reels }: { reels: ReelSlot[] }) {
  const [peek, setPeek] = useState<number | null>(null);
  const [playing, setPlaying] = useState<number | null>(null);
  const stage = useRef<HTMLDivElement>(null);
  const inView = useRef(false);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => (inView.current = e.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    const onKey = (e: KeyboardEvent) => {
      if (!inView.current || e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement;
      if (t.isContentEditable || /INPUT|TEXTAREA|SELECT/.test(t.tagName)) return;
      const n = Number(e.key);
      if (n >= 1 && n <= reels.length) {
        setPlaying(n - 1);
        buttons.current[n - 1]?.focus({ preventScroll: true });
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      io.disconnect();
      window.removeEventListener('keydown', onKey);
    };
  }, [reels.length]);

  return (
    <div ref={stage} className="reel-stage relative h-[472px] max-sm:h-[380px]">
      <div aria-hidden className="absolute inset-x-0 top-[150px] max-sm:top-[110px] flex flex-col items-center gap-3.5 opacity-35 pointer-events-none">
        <span className="font-pixel text-[17px] max-sm:text-[13px] tracking-[0.06em] text-[#FF8A2A] [text-shadow:0_0_14px_rgba(255,106,26,0.5),3px_3px_0_#1A0402]">
          PICK A REEL
        </span>
        <PixelSprite rows={SPRITES.arrowDown} palette={{ '#': '#FF8A2A' }} cell={4} />
      </div>

      {/* the bar behind the small slots */}
      <div aria-hidden className="reel-bar absolute left-1/2 -translate-x-1/2 bottom-3 bg-[#0B0C0F]/90 outline outline-[3px] outline-[#2A2D35] shadow-[inset_0_0_0_2px_rgba(255,255,255,0.06),0_12px_28px_rgba(0,0,0,0.7),0_0_30px_2px_rgba(255,90,26,0.15)]" />

      <ul className="absolute inset-x-0 bottom-[24px] flex items-end justify-center gap-2.5 max-sm:gap-1.5" aria-label="Reels">
        {reels.map((r, i) => {
          const id = publicId(r.embedUrl) ?? '';
          const big = peek === i || playing === i;
          const isPlaying = playing === i;
          return (
            <li key={r.id} className="reel-slot relative" data-big={big || undefined}
              onMouseEnter={() => setPeek(i)} onMouseLeave={() => setPeek((p) => (p === i ? null : p))}>
              <div className={`reel-card relative overflow-hidden bg-[#1C1214] ${isPlaying ? 'outline-[#FFC23A]' : big ? 'outline-white' : 'outline-[#3A3640]'} outline outline-[3px] -outline-offset-[3px]`}
                style={{ boxShadow: big ? `0 0 18px 1px ${isPlaying ? 'rgba(255,194,58,0.35)' : 'rgba(255,255,255,0.2)'}, 0 14px 30px rgba(0,0,0,0.7)` : 'inset 3px 3px 0 rgba(0,0,0,0.7)' } as CSSProperties}>
                {isPlaying && r.embedUrl ? (
                  <iframe src={playerUrl(r.embedUrl, true)} title={r.title} className="absolute inset-1 w-[calc(100%-8px)] h-[calc(100%-8px)] border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                ) : (
                  <button
                    ref={(el) => { buttons.current[i] = el; }}
                    type="button"
                    className="absolute inset-0 w-full h-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-[6px] focus-visible:outline-white"
                    aria-label={`Play reel ${i + 1}: ${r.title}${r.client ? ` for ${r.client}` : ''}`}
                    onFocus={() => setPeek(i)}
                    onBlur={() => setPeek((p) => (p === i ? null : p))}
                    onPointerUp={(e) => {
                      // touch: first tap grows the slot, second tap plays
                      if (e.pointerType === 'touch' && peek !== i) {
                        e.preventDefault();
                        setPeek(i);
                      }
                    }}
                    onClick={(e) => !e.defaultPrevented && setPlaying(i)}
                  >
                    <img src={thumbUrl(id, 464, 824)} alt="" loading="lazy" className="absolute inset-1 w-[calc(100%-8px)] h-[calc(100%-8px)] object-cover" />
                    <span className="reel-shade absolute inset-x-1 bottom-1 h-[55%] bg-gradient-to-b from-transparent to-black/85" />
                    <span className="reel-play absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60px] h-[56px]">
                      <span className="px-clip absolute inset-0 bg-[#140202] translate-y-1.5" style={{ '--n': '3px' } as CSSProperties} />
                      <span className="px-clip absolute inset-0" style={{ '--n': '3px', background: 'linear-gradient(180deg,#FFE27A,#FFA634 60%,#FF6E1E)' } as CSSProperties} />
                      <span className="px-clip absolute left-1 right-1 top-1 bottom-2.5" style={{ '--n': '2px', background: 'linear-gradient(180deg,#CC2A1C,#A81A14)' } as CSSProperties} />
                      <PixelSprite rows={SPRITES.play} palette={{ '#': '#fff' }} cell={2.6} className="absolute left-[25px] top-[13px]" />
                    </span>
                    <span className="reel-info absolute left-3.5 right-3.5 bottom-3">
                      <span className="block font-pixelify font-semibold text-[16px] leading-[18px] tracking-[0.06em] text-white [text-shadow:2px_2px_0_#000]">
                        {r.title}
                      </span>
                      {r.client && <span className="block mt-2 font-pixelify text-[15px] text-[#D9B9B2]">{r.client}</span>}
                    </span>
                  </button>
                )}
                <span aria-hidden className="reel-key absolute font-pixelify font-semibold text-[16px] text-white [text-shadow:2px_2px_0_#000] pointer-events-none">
                  {i + 1}
                </span>
                {isPlaying && (
                  <button type="button" onClick={() => setPlaying(null)} aria-label={`Close reel ${i + 1}`}
                    className="absolute right-2 top-2 w-7 h-7 grid place-items-center bg-black/70 border-2 border-[#FFC23A] text-[#FFC23A] font-pixelify font-bold">
                    ✕
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      <p className="absolute inset-x-0 -bottom-7 text-center font-pixelify text-[15px] tracking-[0.08em] text-[#C9A88E]/60">
        <span className="hover-only">HOVER A SLOT TO PEEK · CLICK TO PLAY · KEYS 1–{reels.length}</span>
        <span className="touch-only">TAP A SLOT TO PEEK · TAP AGAIN TO PLAY</span>
      </p>
    </div>
  );
}
