import type { CSSProperties, ReactNode } from 'react';
import { VoidParticles } from '@/components/Particles';
import DimensionSwitcher from '@/components/DimensionSwitcher';
import PixelBox from '@/components/nether/PixelBox';
import PixelSprite, { SPRITES } from '@/components/nether/PixelSprite';
import PixelWordmark, { END_STONE, ENDER_TEAL, wordmarkPath } from '@/components/PixelWordmark';
import Character3D from '@/components/overworld/Character3D';
import { VIEW_CENTER_Y, VIEW_HEIGHT } from '@/components/overworld/character3d-view';
import type { DimId } from '@/lib/dimensions';
import { useFitScale } from '@/lib/useFitScale';
import { useParallax } from '@/lib/useParallax';
import { useBeacon, type BeaconState } from './beacon';

/* BACKEND = BACK (end stone) + END (ender teal), 9px cells, 10px extrusion (design x1). The 3D character sits on the
   top-right corner of the D, same as on the Overworld's K. */
const CELL = 9;
const DEPTH = 10;
const BACK = wordmarkPath('BACK', CELL);
const END = wordmarkPath('END', CELL);
const vbw = (w: number) => w + DEPTH * 0.75;
const VB_H = END.height + DEPTH;
const CH_H = 210;
const CH_W = (CH_H * 704) / 1299;
const PER_UNIT = CH_H / 34;
const CV_W = 200;
const CV_H = VIEW_HEIGHT * PER_UNIT;
const CV_CY = 2 - (VIEW_CENTER_Y + 4) * PER_UNIT;
const EW = vbw(END.width);
const IMG_STYLE: CSSProperties = {
  left: `${((END.width + 2 - CH_W / 2) / EW) * 100}%`,
  width: `${(CH_W / EW) * 100}%`,
  top: `${((2 - CH_H * 0.64) / VB_H) * 100}%`,
};
const CANVAS_STYLE: CSSProperties = {
  left: `${((END.width + 2 - CV_W / 2) / EW) * 100}%`,
  width: `${(CV_W / EW) * 100}%`,
  top: `${((CV_CY - CV_H / 2) / VB_H) * 100}%`,
  height: `${(CV_H / VB_H) * 100}%`,
};

function StepLink({ href, tone, children }: { href: string; tone: 'teal' | 'stone'; children: ReactNode }) {
  const n = { '--n': '3px' } as CSSProperties;
  const t = tone === 'teal';
  return (
    <a href={href}
      className={`group relative isolate inline-flex ${t ? 'w-[300px]' : 'w-[230px]'} max-w-[44vw] h-[56px] mb-2 transition-transform duration-200 active:translate-y-[3px] focus-visible:outline-none`}>
      {t && <span aria-hidden className="px-clip absolute inset-0 -z-10 bg-[#2FD3B6] opacity-45 blur-[11px]" style={n} />}
      <span aria-hidden className="px-clip absolute inset-0 -z-10 translate-y-2" style={{ ...n, background: t ? '#04201A' : '#05070A' }} />
      <span aria-hidden className="px-clip absolute inset-0 -z-10 translate-y-1" style={{ ...n, background: t ? '#11665A' : '#14171C' }} />
      <span aria-hidden className="px-clip absolute inset-0 -z-10" style={{ ...n, background: t ? '#0A3A32' : '#0A0C10' }} />
      <span aria-hidden className="px-clip absolute -z-10 left-1 right-1 top-1 bottom-2 group-hover:brightness-110"
        style={{ '--n': '2px', background: t ? 'linear-gradient(180deg,#5CE6CC,#2FB89E 60%,#1F8E7A)' : 'linear-gradient(180deg,#2C313A,#1D2027)' } as CSSProperties} />
      <span aria-hidden className="absolute left-[10px] right-[10px] top-2 h-[3px]" style={{ background: t ? 'rgba(200,255,244,0.7)' : 'rgba(255,255,255,0.12)' }} />
      <span className="relative w-full flex items-center justify-center gap-4 pb-1">
        <span className="font-pixelify font-bold text-[clamp(13px,3.7vw,22px)] tracking-[0.06em] text-white whitespace-nowrap"
          style={{ textShadow: `2px 2px 0 ${t ? '#063A30' : '#000'}` }}>{children}</span>
        {t && <PixelSprite rows={SPRITES.chevron} palette={{ '#': '#FFFFFF' }} cell={3} className="hidden sm:block" />}
      </span>
      <span aria-hidden className="absolute -inset-1 hidden group-focus-visible:block border-2 border-white" />
    </a>
  );
}

function ProofCard({ value, label, dot, pulse }: { value: string; label: string; dot: string; pulse?: boolean }) {
  return (
    <PixelBox step={6} border="rgba(198,241,233,0.5)" fill="rgba(14,20,24,0.72)" blur={12}
      glow="drop-shadow(0 10px 12px rgba(0,0,0,0.5))" className="w-[110px] h-[78px] sm:w-[236px] sm:h-[84px]"
      innerClassName="sm:!justify-start gap-4 px-2 sm:pl-5 sm:pr-3">
      <span className={`hidden sm:block w-3 h-3 shrink-0 ${pulse ? 'animate-pulse' : ''}`} style={{ background: dot, boxShadow: `0 0 10px 2px ${dot}` }} />
      <span className="flex flex-col gap-1 text-center sm:text-left min-w-0">
        <span className="font-pixelify font-bold text-[17px] leading-[20px] sm:text-[24px] sm:leading-[26px] text-white [text-shadow:2px_2px_0_#06040B]">{value}</span>
        <span className="font-pixelify text-[10px] leading-[12px] sm:text-[14px] sm:leading-[17px] tracking-[0.08em] text-[#C6D8E0]">{label}</span>
      </span>
    </PixelBox>
  );
}

function beaconCard(b: BeaconState) {
  if (b.state === 'up') return { label: `LIVE · ${b.ms} MS`, dot: '#5FD38A', pulse: false };
  if (b.state === 'waking') return { label: 'WAKING UP…', dot: '#F5B83D', pulse: true };
  if (b.state === 'down') return { label: 'ON RENDER · ASLEEP', dot: '#8A7A9E', pulse: false };
  return { label: 'LIVE ON RENDER', dot: '#5FD38A', pulse: true };
}

/**
 * The End hero (design x1): End at night (pillars beaming to the title, End City, End ship, dragon), dimension switcher,
 * BACKEND wordmark with the 3D character on the D, two actions and three proof cards (the first one is the live
 * JFJ health check). Same build as the Overworld hero: fit-to-screen stack, parallax scene, particles.
 */
export default function EndHero({ go }: { go: (d: DimId) => void }) {
  const { box, content, scale } = useFitScale();
  const hero = useParallax<HTMLElement>();
  const b = beaconCard(useBeacon());

  return (
    <section ref={hero} id="top" className="ow-hero relative overflow-hidden h-[100svh] min-h-[520px] bg-[#07040D]"
      aria-label="The End — development and projects">
      <div className="ow-scene" aria-hidden>
        <picture>
          <source type="image/webp" srcSet="/end/x1-hero-768.webp 768w, /end/x1-hero-1280.webp 1280w, /end/x1-hero-1920.webp 1920w"
            sizes="(min-aspect-ratio: 16/9) 100vw, 180vh" />
          <img src="/end/x1-hero-1920.jpg" alt="" width={1920} height={1080} fetchPriority="high" decoding="async"
            className="ow-scene-img pixelated" />
        </picture>
      </div>
      <div aria-hidden className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 560px 350px at 50% 50%, rgba(7,4,13,0.55), rgba(7,4,13,0.2) 60%, rgba(7,4,13,0) 100%)' }} />
      <div className="ow-par-near absolute inset-0 pointer-events-none"><VoidParticles count={22} /></div>

      <div ref={box} className="ow-par-content absolute inset-x-0 top-[76px] bottom-[24px] z-10 flex items-center justify-center px-3">
        <div ref={content} className="flex flex-col items-center text-center shrink-0"
          style={{ transform: scale < 1 ? `scale(${scale})` : undefined }}>
          <DimensionSwitcher current="end" go={go} />
          <PixelBox step={2} border="#5C6070" fill="rgba(14,18,24,0.9)" glow="drop-shadow(0 5px 6px rgba(0,0,0,0.6))"
            className="mt-5 w-[150px] h-[42px]">
            <span className="font-pixelify font-semibold text-[16px] tracking-[0.1em] text-white [text-shadow:2px_2px_0_#000]">THE END</span>
          </PixelBox>

          <p className="mt-6 flex items-center gap-3 font-pixelify font-semibold text-[18px] sm:text-[24px] tracking-[0.08em] text-white [text-shadow:3px_3px_0_#06040B,0_0_12px_rgba(47,211,182,0.5)]">
            <PixelSprite rows={SPRITES.chevron} palette={{ '#': '#2FD3B6' }} cell={3} />
            DEVELOPMENT &amp; PROJECTS
            <PixelSprite rows={SPRITES.chevron.map((r) => [...r].reverse().join(''))} palette={{ '#': '#2FD3B6' }} cell={3} />
          </p>

          <h1 className="mt-4">
            <span className="sr-only">Bivek Daimary — backend developer (Java, Spring Boot, PostgreSQL) moving into AI engineering</span>
            <span aria-hidden className="relative flex items-start w-[min(612px,88vw)]">
              <span className="absolute -inset-x-[150px] -inset-y-[90px] pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at center, rgba(47,211,182,0.18), rgba(180,138,255,0.08) 55%, transparent 75%)' }} />
              <span className="relative block" style={{ width: `${(vbw(BACK.width) / (vbw(BACK.width) + CELL + EW)) * 100}%` }}>
                <PixelWordmark word="BACK" theme={END_STONE} cell={CELL} depth={DEPTH} className="w-full h-auto" />
              </span>
              <span className="relative block" style={{ width: `${(EW / (vbw(BACK.width) + CELL + EW)) * 100}%`, marginLeft: `${(CELL / (vbw(BACK.width) + CELL + EW)) * 100}%` }}>
                <PixelWordmark word="END" theme={ENDER_TEAL} cell={CELL} depth={DEPTH} className="w-full h-auto" />
                <Character3D imgStyle={IMG_STYLE} canvasStyle={CANVAS_STYLE} />
              </span>
            </span>
          </h1>

          <p className="mt-7 max-w-[min(820px,92vw)] font-pixelify text-[17px] sm:text-[22px] leading-[25px] sm:leading-[31px] tracking-[0.02em] text-white [text-shadow:3px_3px_0_#06040B,0_0_12px_rgba(0,0,0,0.7)]">
            Backend in Java, Spring Boot and PostgreSQL, moving into AI.<br className="hidden sm:block" />{' '}
            APIs that keep running after the credits roll.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-3 sm:gap-6">
            <StepLink href="#tower" tone="teal">CLIMB THE TOWER</StepLink>
            <StepLink href="#contact" tone="stone">GET IN TOUCH</StepLink>
          </div>

          <ul className="mt-7 flex justify-center gap-2 sm:gap-4" aria-label="Proof">
            <li><ProofCard value="JFJ API" label={b.label} dot={b.dot} pulse={b.pulse} /></li>
            <li><ProofCard value="1ST PRIZE" label="DEV DAZZLE 2026" dot="#F5B83D" /></li>
            <li><ProofCard value="OPEN TO" label="PAID INTERNSHIPS" dot="#2FD3B6" /></li>
          </ul>
        </div>
      </div>
    </section>
  );
}
