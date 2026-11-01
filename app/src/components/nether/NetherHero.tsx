import type { CSSProperties, ReactNode } from 'react';
import { Embers } from '@/components/Particles';
import DimensionSwitcher from '@/components/DimensionSwitcher';
import type { DimId } from '@/lib/dimensions';
import { useFitScale } from '@/lib/useFitScale';
import { NETHERRACK_TILE } from '@/lib/pixels';
import { NETHER_HERO, NETHER_STATS } from '@/data/nether';
import HeroVideo from './HeroVideo';
import PixelBox from './PixelBox';
import PixelSprite, { SPRITES } from './PixelSprite';
import DameoTitle from './DameoTitle';

const STAT_ICONS = [
  { rows: SPRITES.doc, color: '#FF6A30', cell: 3 },
  { rows: SPRITES.playbox, color: '#F2489C', cell: 3 },
  { rows: SPRITES.trophy, color: '#FFC23A', cell: 3.4 },
];

/** EXPLORE: stepped gold frame, flat red face, hard orange/red/black bands below, soft orange glow (design r9). */
function ExploreButton({ children, href }: { children: ReactNode; href: string }) {
  const n = { '--n': '3px' } as CSSProperties;
  return (
    <a href={href} className="group relative isolate inline-flex w-[248px] h-[58px] mb-2 transition-transform active:translate-y-[3px] focus-visible:outline-none">
      <span aria-hidden className="px-clip absolute inset-0 -z-10 bg-[#FF6A1A] opacity-45 blur-[11px]" style={n} />
      <span aria-hidden className="px-clip absolute inset-0 -z-10 bg-[#140202] translate-y-2 group-active:translate-y-[5px]" style={n} />
      <span aria-hidden className="px-clip absolute inset-0 -z-10 bg-[#C21C0E] translate-y-1 group-active:translate-y-[2px]" style={n} />
      <span aria-hidden className="px-clip absolute inset-0 -z-10 group-focus-visible:outline group-focus-visible:outline-white" style={{ ...n, background: 'linear-gradient(180deg,#FFE27A 0%,#FFC23E 8%,#FFA634 60%,#FF8A26 86%,#FF6E1E 100%)' }} />
      <span aria-hidden className="px-clip absolute -z-10 left-1 right-1 top-1 bottom-2 group-hover:brightness-110" style={{ '--n': '2px', background: 'linear-gradient(180deg,#CC2A1C 0%,#C0221A 85%,#A81A14 100%)' } as CSSProperties} />
      <span aria-hidden className="absolute left-3 bottom-[18px] w-[9px] h-[9px] border-l-[3px] border-b-[3px] border-[#FF6A26]" />
      <span aria-hidden className="absolute right-[15px] bottom-[16px] w-[3px] h-[6px] bg-[#FF6A26]" />
      <span className="relative w-full flex items-center justify-center gap-5 pb-1">
        <span className="font-pixelify font-bold text-[25px] tracking-[0.06em] text-white [text-shadow:2px_2px_0_#6A0E06]">
          {children}
        </span>
        <PixelSprite rows={SPRITES.chevron} palette={{ '#': '#FFC23A' }} cell={3} />
      </span>
      {/* keyboard focus ring */}
      <span aria-hidden className="absolute -inset-1 hidden group-focus-visible:block border-2 border-white" />
    </a>
  );
}

function StatCard({ value, label, i }: { value: string; label: string; i: number }) {
  const ic = STAT_ICONS[i];
  const words = label.split(' ');
  const half = Math.ceil(words.length / 2);
  const lines = words.length > 2 ? [words.slice(0, half).join(' '), words.slice(half).join(' ')] : [label];
  return (
    <PixelBox
      step={6}
      border="rgba(220,190,181,0.7)"
      fill="rgba(58,12,16,0.72)"
      blur={12}
      glow="drop-shadow(0 10px 12px rgba(0,0,0,0.5))"
      className="w-[110px] h-[84px] sm:w-[236px] sm:h-[96px]"
      innerClassName="sm:!justify-start gap-[22px] px-2 sm:pl-6 sm:pr-4"
    >
      {[[9, 9], [9, null], [null, 9], [null, null]].map(([l, t], k) => (
        <span
          key={k}
          aria-hidden
          className="absolute w-1 h-1 bg-[#E2C6BE]"
          style={{ left: l ?? undefined, right: l === null ? 9 : undefined, top: t ?? undefined, bottom: t === null ? 9 : undefined }}
        />
      ))}
      <PixelSprite rows={ic.rows} palette={{ '#': ic.color }} cell={ic.cell}
        style={{ filter: `drop-shadow(0 0 4px ${ic.color}99)` }} className="shrink-0 hidden sm:block" />
      <span className="flex flex-col gap-[5px] text-center sm:text-left">
        <span className="font-pixelify font-bold text-[26px] leading-[28px] sm:text-[32px] sm:leading-[34px] text-white [text-shadow:2px_2px_0_#2A0606]">
          {value}
        </span>
        <span className="font-pixelify text-[11px] leading-[13px] sm:text-[16px] sm:leading-[19px] tracking-[0.1em] text-[#D9B9B2]">
          {lines.map((l) => <span key={l} className="block">{l}</span>)}
        </span>
      </span>
    </PixelBox>
  );
}

export default function NetherHero({ go }: { go: (d: DimId) => void }) {
  const { box, content, scale } = useFitScale();

  return (
    <section
      id="top"
      className="relative overflow-hidden h-[100svh] min-h-[480px]"
      aria-label="The Nether — Editing and Production"
    >
      <HeroVideo />
      <div aria-hidden className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 520px 310px at 50% 52%, rgba(13,2,2,0.45), rgba(13,2,2,0) 100%)' }} />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-[210px] pointer-events-none"
        style={{ background: 'linear-gradient(180deg, rgba(242,74,29,0) 0%, rgba(242,74,29,0.3) 100%)' }} />
      <Embers count={26} />

      {/* between the top bar (72px) and the lava floor (64px) */}
      <div ref={box} className="absolute inset-x-0 top-[76px] bottom-[76px] z-10 flex items-center justify-center px-3">
       <div ref={content} className="flex flex-col items-center text-center shrink-0"
        style={{ transform: scale < 1 ? `scale(${scale})` : undefined }}>
        <DimensionSwitcher current="nether" go={go} />

        <PixelBox step={2} border="#5C5A6C" fill="rgba(20,18,27,0.92)" glow="drop-shadow(0 5px 6px rgba(0,0,0,0.6))"
          className="mt-6 w-[128px] h-[40px]">
          <span className="font-pixelify font-semibold text-[16px] tracking-[0.1em] text-white [text-shadow:2px_2px_0_#000,0_0_8px_rgba(255,255,255,0.15)]">
            NETHER
          </span>
        </PixelBox>

        <p className="mt-[30px] font-pixel text-[13px] sm:text-[17px] leading-6 tracking-[0.06em] text-[#FF8A2A] [text-shadow:0_0_14px_rgba(255,106,26,0.7),3px_3px_0_#1A0402]">
          {NETHER_HERO.label}
        </p>
        <p className="mt-4 font-pixel text-[12px] sm:text-[15px] leading-[22px] tracking-[0.06em] text-[#E9D3BF] [text-shadow:0_0_12px_rgba(255,176,128,0.12),3px_3px_0_#1A0402]">
          {NETHER_HERO.subtitle}
        </p>

        <h1 className="mt-6">
          <span className="sr-only">Dameo — video editing and production</span>
          <span aria-hidden className="relative block">
            <span className="absolute -inset-x-[150px] -inset-y-[90px] pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at center, rgba(255,90,26,0.35), rgba(255,58,26,0.12) 55%, transparent 75%)' }} />
            <DameoTitle className="relative w-[min(407px,84vw)] h-auto" />
          </span>
        </h1>

        <p className="mt-[26px] max-w-[560px] font-pixelify text-[17px] sm:text-[19px] leading-[27px] tracking-[0.02em] text-[#FAF0E8] [text-shadow:2px_2px_0_#000,0_0_12px_rgba(0,0,0,0.7)]">
          {NETHER_HERO.tagline}
        </p>

        <div className="mt-8">
          <ExploreButton href="#showreel">EXPLORE</ExploreButton>
        </div>

        <ul className="mt-9 flex justify-center gap-2 sm:gap-4" aria-label="Stats">
          {NETHER_STATS.map((s, i) => (
            <li key={s.label}>
              <StatCard value={s.value} label={s.label} i={i} />
            </li>
          ))}
        </ul>
       </div>
      </div>

      {/* lava floor from the live site, set low so only its top shows */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-[64px] overflow-hidden">
        <div className="lava-strip" />
        <div className="h-[88px] pixelated" style={{ backgroundColor: '#3d0000', backgroundImage: NETHERRACK_TILE, backgroundSize: '52px 52px' }} />
      </div>
    </section>
  );
}
