import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import PixelSprite from '@/components/nether/PixelSprite';
import { BUILDS, type Build } from '@/data/end';
import { useBeacon, beaconLabel } from './beacon';
import { useMounted } from './useMounted';

const CHEST = ['oooooooooooooo', 'owwwwwwwwwwwwo', 'owwwwwwwwwwwwo', 'odddddggdddddo', 'owwwwwggwwwwwo', 'owwwwwwwwwwwwo',
  'owwwwwwwwwwwwo', 'oddddddddddddo', 'oooooooooooooo'];
const CHEST_PAL = { o: '#24100A', w: '#8A5A2A', d: '#5A3616', g: '#FFC23A' };
const SHULKER = ['oooooooooooo', 'oPPPPPPPPPPo', 'oPPPPPPPPPPo', 'oppppppppppo', 'oooooooooooo', 'oppppyyppppo',
  'oppppyyppppo', 'oppppppppppo', 'oooooooooooo'];
const SHULK_PAL = { o: '#2A1640', p: '#9A6AB8', P: '#B48ACB', y: '#E8E0A0' };
const ext = { target: '_blank', rel: 'noopener noreferrer' } as const;

const building = (b: Build) => b.status === 'building' || /BUILDING/.test(b.badge ?? '');

/** Loot window: a Minecraft chest screen with the project's screen, story, stack and links. Esc or ✕ closes. */
function Loot({ b, onClose }: { b: Build; onClose: () => void }) {
  const close = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    close.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);
  const links = [
    b.live && { label: 'Open project', href: b.live },
    b.docs && { label: 'API docs', href: b.docs },
    b.code && { label: 'View code', href: b.code },
  ].filter(Boolean) as { label: string; href: string }[];
  return createPortal(
    <div className="fixed inset-0 z-[80] grid place-items-center p-3 bg-[#05030ACC] backdrop-blur-sm" onClick={onClose}>
      <div role="dialog" aria-modal="true" aria-labelledby="loot-title" onClick={(e) => e.stopPropagation()}
        className="mc-gui w-full max-w-[880px] max-h-[92vh] overflow-auto end-pop">
        <div className="mc-gui-face flex flex-col gap-4">
          <div className="flex items-start justify-between gap-4">
            <h3 id="loot-title" className="mc-gui-title !text-[20px]">Loot · {b.title}</h3>
            <button ref={close} type="button" onClick={onClose} aria-label="Close" className="end-mc-btn !px-3">✕</button>
          </div>
          <div className="grid md:grid-cols-[1.15fr_1fr] gap-5">
            <img src={`/end/screens/${b.slug}.webp`} alt={`${b.title} screen`} className="w-full border-[3px] border-[#373737] bg-black" />
            <div className="flex flex-col gap-3">
              {b.badge && <span className="self-start font-pixelify font-semibold text-[13px] px-2 py-1 bg-[#1E1E1E] text-[#C8FFF4]">{b.badge}</span>}
              <p className="font-pixelify text-[16px] leading-[22px] text-[#2A2A2A]">{b.oneLiner}</p>
              {b.story && <p className="text-[14px] leading-[21px] text-[#404040]">{b.story}</p>}
            </div>
          </div>
          {b.stack.length > 0 && (
            <ul className="flex flex-wrap gap-1" aria-label="Stack">
              {b.stack.map((s) => (
                <li key={s} className="mc-slot !w-auto !h-auto px-3 py-2 font-pixelify font-semibold text-[13px] text-white [text-shadow:1px_1px_0_#3F3F3F]">{s}</li>
              ))}
            </ul>
          )}
          <div className="flex flex-wrap gap-3">
            {links.map((l, i) => (
              <a key={l.href} href={l.href} {...ext} className={`end-mc-btn ${i === 0 ? 'is-teal' : ''}`}>{l.label}  ›</a>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

function Room({ b, floor, newest, alt, onOpen }: { b: Build; floor: number; newest: boolean; alt: boolean; onOpen: () => void }) {
  const room = building(b) ? 'room-build' : alt ? 'room-b' : 'room';
  const live = b.status === 'live';
  return (
    <article className="end-room" style={{ backgroundImage: `url(/end/tower/${room}.webp)` }} aria-labelledby={`room-${b.slug}`}>
      <span className="end-plate">FLOOR {String(floor).padStart(2, '0')}{newest ? ' · NEWEST' : ''}</span>
      <div className="end-room-inner">
        <figure className="end-frame">
          <img src={`/end/screens/${b.slug}.webp`} alt={`${b.title} screen`} loading="lazy" decoding="async" />
        </figure>
        <div className="flex flex-col items-start gap-3 min-w-0">
          {b.badge && <span className={`end-badge ${live ? 'is-live' : ''}`}>{b.badge}</span>}
          <div className="end-sign">
            <h3 id={`room-${b.slug}`} className="font-pixelify font-bold text-[24px] leading-[28px] text-[#1E1206]">{b.title}</h3>
            <p className="font-pixelify font-semibold text-[16px] leading-[21px] text-[#2E1E0A]">{b.oneLiner}</p>
            <p className="font-pixelify font-semibold text-[13px] text-[#5A3A14]">{b.stack.slice(0, 3).join(' · ')}</p>
          </div>
          <button type="button" onClick={onOpen} className="group flex items-center gap-3" aria-label={`Open the loot chest for ${b.title}`}>
            <span className="end-chest"><PixelSprite rows={CHEST} palette={CHEST_PAL} cell={5} /></span>
            <span className="end-mc-btn">OPEN LOOT  ›</span>
          </button>
        </div>
      </div>
    </article>
  );
}

/**
 * Projects as an End City tower you climb (design x1): the beacon on the roof shows whether JFJ's API answers,
 * featured builds get a room each (newest on top; screen in an item frame, oak sign, loot chest), the rest sit in
 * shulker boxes on the storage floor. Adding a project adds a floor.
 */
export default function EndTower() {
  const mounted = useMounted();
  const beacon = useBeacon();
  const [open, setOpen] = useState<Build | null>(null);
  const featured = BUILDS.filter((b) => b.featured);
  const storage = BUILDS.filter((b) => !b.featured);
  const total = BUILDS.length;
  const lit = beacon.state === 'up' ? 'is-up' : beacon.state === 'down' ? 'is-down' : 'is-waking';

  return (
    <section id="tower" aria-labelledby="tower-title" className="end-section scroll-mt-20">
      <header className="flex flex-col items-center gap-3 text-center px-4 pb-10">
        <p className="end-kicker">PROJECTS · {total} FLOORS · NEWEST ON TOP</p>
        <h2 id="tower-title" className="end-h2">CLIMB THE TOWER</h2>
        <p className="font-pixelify text-[17px] leading-[25px] text-[#E6DDF0] max-w-[620px]">
          Every floor is something I built. Open the loot chest for the code, the story and the stack.
        </p>
      </header>

      <div className="end-tower">
        <div className="end-roof">
          <img src="/end/tower/roof.webp" alt="" aria-hidden width={976} height={300} className={`end-roof-img ${lit}`} />
          <img src="/end/char-wave.webp" alt="" aria-hidden width={120} height={176} loading="lazy" className="end-roof-char" />
          <p className={`end-beacon ${lit}`} role="status">
            <span className="end-beacon-dot" aria-hidden />
            BEACON · {beaconLabel(beacon)}
          </p>
        </div>
        {featured.map((b, i) => (
          <Room key={b.slug} b={b} floor={total - i} newest={i === 0} alt={i % 2 === 1} onOpen={() => setOpen(b)} />
        ))}
        {storage.length > 0 && (
          <div className="end-room end-storage" style={{ backgroundImage: 'url(/end/tower/room-small.webp)' }}>
            <span className="end-plate">FLOORS {String(storage.length).padStart(2, '0')}–01 · STORAGE</span>
            <ul className="end-shulkers">
              {storage.map((b) => (
                <li key={b.slug}>
                  <button type="button" onClick={() => setOpen(b)} className="end-shulker group" aria-label={`Open ${b.title}`}>
                    <span className="end-shulker-box"><PixelSprite rows={SHULKER} palette={SHULK_PAL} cell={8} /></span>
                    <span className="end-shulker-label">
                      <span className="font-pixelify font-semibold text-[14px] text-white">{b.title}</span>
                      <span className="font-pixelify text-[12px] text-[#C8B8E0]">{b.meta}</span>
                    </span>
                    <span className="mc-tooltip end-shulker-tip" role="tooltip">
                      <span className="mc-tip-title">{b.title}</span>
                      <span className="mc-tip-gray">{b.oneLiner}</span>
                      <span className="mc-tip-green">Click to open the box</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        <img src="/end/tower/base.webp" alt="" aria-hidden width={976} height={120} className="end-foot" />
      </div>
      <p className="text-center font-pixelify text-[14px] text-[#A090B9] mt-4 px-4">Scroll to climb · a new project adds a floor on top</p>
      {mounted && open && <Loot b={open} onClose={() => setOpen(null)} />}
    </section>
  );
}
