import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import type { VideoSlot } from '@/data/nether';
import { playerUrl, publicId, thumbUrl } from '@/lib/cloudinary';
import { useCalmMotion } from '@/lib/motion-setting';
import PixelSprite, { CHEST_PAL, SPRITES } from './PixelSprite';
import PixelBox from './PixelBox';

const TOOL_ABBR: Record<string, string> = {
  'after effects': 'Ae', 'after effect': 'Ae', 'davinci resolve': 'Dr', resolve: 'Dr', 'premiere pro': 'Pr',
  premiere: 'Pr', photoshop: 'Ps', audition: 'Au',
};
const abbr = (t: string) => TOOL_ABBR[t.toLowerCase()] ?? t.slice(0, 2);
const noop = () => () => {};
const SPARKLES = [[22, 30], [70, 18], [48, 62], [84, 50], [30, 78], [62, 84], [14, 56], [90, 24], [40, 40], [76, 70]];

/**
 * Project card as a chest (prototype p3): a pixel chest covers the whole video; hovering (or a first tap) opens it
 * — lid flies up, body drops, gold light — and clicking opens the chest window with the video.
 */
export default function ChestCard({ slot }: { slot: VideoSlot }) {
  const [peek, setPeek] = useState(false);
  const [open, setOpen] = useState(false);
  const id = publicId(slot.embedUrl) ?? '';
  const ease = 'cubic-bezier(0.22, 1, 0.36, 1)';

  return (
    <article
      className={`nether-card group transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 ${peek ? '!border-[#FFC23A]' : 'hover:!border-[#FFC23A]'} hover:shadow-[0_0_14px_rgba(255,194,58,0.35),0_12px_32px_rgba(0,0,0,0.4)]`}
      onMouseLeave={() => setPeek(false)}
    >
      <button
        type="button"
        className="relative block w-full aspect-video bg-[#0d0303] overflow-hidden text-left focus-visible:outline focus-visible:outline-4 focus-visible:-outline-offset-4 focus-visible:outline-[#FFC23A]"
        aria-label={`Open the chest: watch ${slot.title}`}
        onPointerUp={(e) => {
          // touch: the first tap opens the lid, the second opens the chest window
          if (e.pointerType === 'touch' && !peek) {
            e.preventDefault();
            setPeek(true);
          }
        }}
        onClick={(e) => {
          if (e.defaultPrevented) return;
          setOpen(true);
        }}
      >
        <img src={thumbUrl(id, 640, 360)} alt={`${slot.title} — thumbnail`} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
        <span className="absolute bottom-2 right-2 font-pixel text-[7px] bg-black/70 text-[#ff8c5a] px-2 py-0.5 tracking-wider">
          {slot.duration}
        </span>
        <span aria-hidden className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 grid place-items-center w-11 h-11 rounded-full bg-black/60">
          <PixelSprite rows={SPRITES.play} palette={{ '#': '#fff' }} cell={2.4} className="ml-1" />
        </span>

        {/* chest: gold light + sparkles behind the lid and body; they open on hover / focus / first tap */}
        <span aria-hidden data-open={peek || undefined} className="chest absolute inset-0 pointer-events-none">
          <span className="chest-light absolute inset-0"
            style={{ background: 'radial-gradient(ellipse at center, rgba(255,194,58,0.6), rgba(255,138,42,0.1) 60%, transparent)' }} />
          {SPARKLES.map(([x, y], i) => (
            <span key={i} className="chest-spark absolute w-[5px] h-[5px] bg-[#FFE27A] shadow-[0_0_8px_2px_#FFC23A]"
              style={{ '--sx': `${x}%`, '--sy': `${y}%`, transitionDelay: `${i * 18}ms` } as CSSProperties} />
          ))}
          <span className="chest-body absolute inset-x-0 bottom-0 h-[62%] pixelated"
            style={{ background: '#7A4E22 url(/nether/chest-body.png) center / cover', boxShadow: 'inset 0 0 12px rgba(0,0,0,0.4)', transition: `transform .42s ${ease}, opacity .42s ${ease}` }} />
          <span className="chest-lid absolute inset-x-0 top-0 h-[38%] pixelated origin-bottom-left"
            style={{ background: '#8A5A2A url(/nether/chest-lid.png) center / cover', boxShadow: '0 6px 10px rgba(0,0,0,0.6)', transition: `transform .42s ${ease}, opacity .42s ${ease}` }} />
          <span className="chest-hint absolute inset-x-0 top-[66%] text-center font-pixelify font-semibold text-[15px] tracking-[0.06em] text-[#FFE7C0]/60 [text-shadow:2px_2px_0_#24100A]">
            <span className="hover-only">HOVER TO OPEN</span>
            <span className="touch-only">TAP TO OPEN</span>
          </span>
          <span className="chest-tag absolute left-3 top-3 px-3 py-1.5 bg-[#140A08]/90 border-2 border-[#FFC23A] font-pixelify font-semibold text-[15px] text-[#FFC23A]">
            <span className="hover-only">CLICK TO WATCH</span>
            <span className="touch-only">TAP TO WATCH</span>
          </span>
        </span>
      </button>

      <div className="p-5">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className="inline-block font-pixel text-[7px] text-[#1a0804] bg-[#f27b1a] px-2 py-1 shadow-[2px_2px_0_rgba(0,0,0,0.5)]">
            {slot.category}
          </span>
          <span className="font-pixel text-[7px] text-[#c9a88e]/60">{slot.year}</span>
        </div>
        <h3 className="text-base font-bold text-[#ffd4b8] mb-2">{slot.title}</h3>
        <div className="flex flex-wrap gap-1.5">
          {slot.tools.map((tool) => (
            <span key={tool} className="font-pixel text-[6px] text-[#ff8c5a]/70 border border-[#ff8c5a]/20 px-1.5 py-0.5 tracking-wider">
              {tool}
            </span>
          ))}
        </div>
      </div>

      <ChestWindow slot={slot} open={open} onClose={() => setOpen(false)} />
    </article>
  );
}

/** The opened chest: video player plus a 3x3 LOOT grid (genre, length, tools). Esc / ✕ / outside click closes. */
function ChestWindow({ slot, open, onClose }: { slot: VideoSlot; open: boolean; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const calm = useCalmMotion();
  const genre = slot.category.split(/[,.·]/)[0].trim().toUpperCase();
  const loot = [
    { big: genre, small: 'GENRE' },
    { big: slot.duration, small: 'LENGTH' },
    ...slot.tools.map((t) => ({ big: abbr(t), small: 'TOOL' })),
  ];

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      prev?.focus();
    };
  }, [open, onClose]);

  // portal only after the page has hydrated (the pre-rendered HTML has no modal)
  const mounted = useSyncExternalStore(noop, () => true, () => false);
  if (!mounted) return null;
  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] grid place-items-center p-3 sm:p-6 bg-black/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onMouseDown={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Chest: ${slot.title}`}
            className="w-full max-w-[980px]"
            initial={calm ? { opacity: 0 } : { y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={calm ? { opacity: 0 } : { y: 40, opacity: 0 }}
            transition={{ duration: calm ? 0.1 : 0.26, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <PixelBox
              step={4}
              border="#FF6A1A"
              fill="#140C0E"
              borderWidth={3}
              hardShadow={[0, 10, 'rgba(0,0,0,0.7)']}
              glow="drop-shadow(0 0 9px rgba(255,90,26,0.7))"
              innerClassName="!block p-5 sm:px-7 sm:pt-6 sm:pb-7"
            >
              <div className="flex items-center gap-4">
                <PixelSprite rows={SPRITES.chestOpen} palette={CHEST_PAL} cell={3} className="shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-pixelify text-[15px] tracking-[0.08em] text-[#B8A8A8]">CHEST</p>
                  <h3 className="font-pixelify font-bold text-[22px] sm:text-[25px] leading-tight text-white [text-shadow:2px_2px_0_#000] truncate">
                    {slot.title}
                  </h3>
                </div>
                <button ref={closeRef} type="button" onClick={onClose} aria-label="Close"
                  className="relative w-10 h-10 shrink-0 grid place-items-center hover:brightness-125 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white">
                  <span aria-hidden className="px-clip absolute inset-0 bg-[#8E8A9C]" style={{ '--n': '2px' } as CSSProperties} />
                  <span aria-hidden className="px-clip absolute inset-[2px] bg-[#0C0A12]" style={{ '--n': '1px' } as CSSProperties} />
                  <PixelSprite rows={SPRITES.close} palette={{ '#': '#E6E2EA' }} cell={3} className="relative" />
                </button>
              </div>

              <div className="mt-6 flex flex-col md:flex-row gap-7">
                <div className="relative md:w-[600px] aspect-video bg-[#0d0303] shadow-[0_8px_20px_rgba(0,0,0,0.7)] shrink-0">
                  {slot.embedUrl && (
                    <iframe src={playerUrl(slot.embedUrl, true)} title={slot.title} className="absolute inset-0 w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                  )}
                </div>
                <div className="flex flex-col gap-3.5">
                  <p className="font-pixelify font-semibold text-[16px] tracking-[0.1em] text-[#FFC23A] [text-shadow:2px_2px_0_#3A0C04]">LOOT</p>
                  <ul className="grid grid-cols-3 gap-2 w-[268px]" aria-label="Loot">
                    {Array.from({ length: 9 }, (_, i) => loot[i]).map((it, i) => (
                      <li key={i} className="w-[84px] h-[84px] flex flex-col items-center justify-center gap-1 bg-[#1C1214] shadow-[inset_3px_3px_0_rgba(0,0,0,0.7),inset_-3px_-3px_0_rgba(255,255,255,0.08)]">
                        {it && (
                          <>
                            <span className={`font-pixelify text-white [text-shadow:2px_2px_0_#000] ${it.big.length <= 4 ? 'font-bold text-[30px] leading-8' : 'font-semibold text-[15px]'}`}>
                              {it.big}
                            </span>
                            <span className="font-pixelify text-[13px] tracking-[0.08em] text-[#C9B0A8]">{it.small}</span>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                  <p className="font-pixelify text-[14px] leading-5 text-[#C9B0A8] max-w-[268px]">
                    {slot.category} · {slot.tools.join(', ')}
                  </p>
                </div>
              </div>
            </PixelBox>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
