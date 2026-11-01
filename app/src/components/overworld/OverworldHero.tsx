import type { CSSProperties, ReactNode } from 'react';
import { Leaves } from '@/components/Particles';
import DimensionSwitcher from '@/components/DimensionSwitcher';
import DimLink from '@/components/DimLink';
import PixelBox from '@/components/nether/PixelBox';
import PixelSprite, { SPRITES } from '@/components/nether/PixelSprite';
import PixelWordmark, { wordmarkPath } from '@/components/PixelWordmark';
import type { DimId } from '@/lib/dimensions';
import { GROUND_TILE } from '@/lib/pixels';
import { useFitScale } from '@/lib/useFitScale';
import { useParallax } from '@/lib/useParallax';
import { PROFILE } from '@/data/portfolio';
import Character3D from './Character3D';
import { VIEW_CENTER_Y, VIEW_HEIGHT } from './character3d-view';

/* BIVEK wordmark geometry (12px cells, 12px extrusion) and where the character sits on it (design o2: on the K's
   top-right corner, legs over the edge). Character art is 704x1299; he sits at 64% of his height. */
const CELL = 12;
const DEPTH = 12;
const WM = wordmarkPath('BIVEK', CELL);
const VB_W = WM.width + DEPTH * 0.75;
const VB_H = WM.height + DEPTH;
const CH_H = 262;
const CH_W = (CH_H * 704) / 1299;
const CHAR_STYLE: CSSProperties = {
  left: `${((WM.width + 4 - CH_W / 2) / VB_W) * 100}%`,
  width: `${(CH_W / VB_W) * 100}%`,
  top: `${((2 - CH_H * 0.64) / VB_H) * 100}%`,
};
/* 3D canvas: same scale as the image (the model is ~34 units tall sitting -> 262 units of the wordmark), centred on
   the same point, with room around him for turning his head. The model's hips (world y -4) land on the K's top. */
const PER_UNIT = CH_H / 34;
const CV_W = 240;
const CV_H = VIEW_HEIGHT * PER_UNIT;
const CV_CY = 2 - (VIEW_CENTER_Y + 4) * PER_UNIT;
const CANVAS_STYLE: CSSProperties = {
  left: `${((WM.width + 4 - CV_W / 2) / VB_W) * 100}%`,
  width: `${(CV_W / VB_W) * 100}%`,
  top: `${((CV_CY - CV_H / 2) / VB_H) * 100}%`,
  height: `${(CV_H / VB_H) * 100}%`,
};

/** Stepped pixel button with hard bands under it (same build as the Nether's EXPLORE), green or stone. */
function StepButton({ to, go, tone, children }: { to: DimId; go: (d: DimId) => void; tone: 'green' | 'stone'; children: ReactNode }) {
  const n = { '--n': '3px' } as CSSProperties;
  const g = tone === 'green';
  return (
    <DimLink to={to} go={go}
      className={`group relative isolate inline-flex ${g ? 'w-[292px]' : 'w-[262px]'} max-w-[44vw] h-[58px] mb-2 transition-transform active:translate-y-[3px] focus-visible:outline-none`}>
      {g && <span aria-hidden className="px-clip absolute inset-0 -z-10 bg-[#7CFF2A] opacity-45 blur-[11px]" style={n} />}
      <span aria-hidden className="px-clip absolute inset-0 -z-10 translate-y-2 group-active:translate-y-[5px]" style={{ ...n, background: g ? '#0B2A06' : '#05070A' }} />
      <span aria-hidden className="px-clip absolute inset-0 -z-10 translate-y-1 group-active:translate-y-[2px]" style={{ ...n, background: g ? '#1F7A0E' : '#14171C' }} />
      <span aria-hidden className="px-clip absolute inset-0 -z-10" style={{ ...n, background: g ? '#0E3A08' : '#0A0C10' }} />
      <span aria-hidden className="px-clip absolute -z-10 left-1 right-1 top-1 bottom-2 group-hover:brightness-110"
        style={{ '--n': '2px', background: g ? 'linear-gradient(180deg,#6FE431 0%,#46C21A 60%,#2F9A10 100%)' : 'linear-gradient(180deg,#2C313A,#1D2027)' } as CSSProperties} />
      <span aria-hidden className="absolute left-[10px] right-[10px] top-2 h-[3px]" style={{ background: g ? 'rgba(200,255,138,0.7)' : 'rgba(255,255,255,0.12)' }} />
      <span className="relative w-full flex items-center justify-center gap-4 pb-1">
        <span className="font-pixelify font-bold text-[clamp(17px,4.4vw,25px)] tracking-[0.06em] text-white whitespace-nowrap"
          style={{ textShadow: `2px 2px 0 ${g ? '#0E4A06' : '#000'}` }}>
          {children}
        </span>
        {g && <PixelSprite rows={SPRITES.chevron} palette={{ '#': '#FFFFFF' }} cell={3} className="hidden sm:block" />}
      </span>
      <span aria-hidden className="absolute -inset-1 hidden group-focus-visible:block border-2 border-white" />
    </DimLink>
  );
}

/* Spots in the background picture (px of the 1672x941 image) that get a little life. */
const pct = (x: number, y: number): CSSProperties => ({ left: `${(x / 1672) * 100}%`, top: `${(y / 941) * 100}%` });
const SPARKLES = [[912, 828], [948, 860], [985, 812], [1012, 878], [1040, 842], [1068, 896], [1095, 820], [930, 900],
  [1003, 905], [1122, 868], [960, 790], [1052, 798]];

/** Sun glow, lantern flicker, chimney smoke, waterfall shimmer and river sparkles, placed on the picture. */
function SceneLife() {
  return (
    <>
      <span className="ow-fx ow-sun" style={pct(1152, 155)} />
      <span className="ow-fx ow-lantern" style={pct(200, 275)} />
      <span className="ow-fx ow-smoke" style={pct(1448, 505)}><i /><i /><i /><i /></span>
      <span className="ow-fx ow-fall" style={{ ...pct(1283, 205), width: '0.6%', height: '18.5%' }} />
      <span className="ow-fx ow-fall" style={{ ...pct(1254, 428), width: '1.3%', height: '6.5%' }} />
      {SPARKLES.map(([x, y], i) => (
        <span key={i} className="ow-fx ow-sparkle" style={{ ...pct(x, y), animationDelay: `${(i * 0.37) % 2.6}s` }} />
      ))}
    </>
  );
}

export default function OverworldHero({ go }: { go: (d: DimId) => void }) {
  const { box, content, scale } = useFitScale();
  const hero = useParallax<HTMLElement>();
  const [first, rest] = [PROFILE.tagline.split(' — ')[0], PROFILE.tagline.split(' — ')[1]];

  return (
    <section ref={hero} id="top" className="ow-hero relative overflow-hidden h-[100svh] min-h-[480px] bg-[#6ea1ef]" aria-label="Overworld — about Bivek">
      {/* the scene: background picture + small living details, one parallax layer */}
      <div className="ow-scene" aria-hidden>
        <picture>
          <source type="image/webp" srcSet="/overworld/overworld-bg-768.webp 768w, /overworld/overworld-bg-1280.webp 1280w, /overworld/overworld-bg-1672.webp 1672w" sizes="(min-aspect-ratio: 16/9) 100vw, 180vh" />
          <img src="/overworld/overworld-bg-1672.jpg" alt="" width={1672} height={941} fetchPriority="high" decoding="async" className="ow-scene-img" />
        </picture>
        <SceneLife />
      </div>
      <div aria-hidden className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 560px 350px at 50% 52%, rgba(6,22,42,0.42), rgba(6,22,42,0.18) 60%, rgba(6,22,42,0) 100%)' }} />
      <div aria-hidden className="absolute inset-x-0 top-0 h-[120px] pointer-events-none"
        style={{ background: 'linear-gradient(180deg, rgba(6,22,42,0.35), rgba(6,22,42,0))' }} />
      <div className="ow-par-near absolute inset-0 pointer-events-none"><Leaves count={18} /></div>

      {/* between the top bar and the ground */}
      <div ref={box} className="ow-par-content absolute inset-x-0 top-[76px] bottom-[76px] z-10 flex items-center justify-center px-3">
        <div ref={content} className="flex flex-col items-center text-center shrink-0"
          style={{ transform: scale < 1 ? `scale(${scale})` : undefined }}>
          <DimensionSwitcher current="overworld" go={go} />

          <PixelBox step={2} border="#5C6070" fill="rgba(14,18,24,0.9)" glow="drop-shadow(0 5px 6px rgba(0,0,0,0.6))"
            className="mt-[22px] w-[168px] h-[42px]">
            <span className="font-pixelify font-semibold text-[16px] tracking-[0.1em] text-white [text-shadow:2px_2px_0_#000]">
              OVERWORLD
            </span>
          </PixelBox>

          <p className="mt-[30px] flex items-center gap-3 font-pixelify font-semibold text-[20px] sm:text-[26px] tracking-[0.06em] text-white [text-shadow:3px_3px_0_#0A1A06,0_0_10px_rgba(0,0,0,0.7)]">
            <PixelSprite rows={SPRITES.chevron} palette={{ '#': '#7CFF2A' }} cell={3} style={{ filter: 'drop-shadow(0 0 6px rgba(92,255,42,0.6))' }} />
            {PROFILE.greeting.replace(/^>\s*/, '').replace(/,(?=\s*I AM)/i, ',')}
            <PixelSprite rows={SPRITES.chevron.map((r) => [...r].reverse().join(''))} palette={{ '#': '#7CFF2A' }} cell={3}
              style={{ filter: 'drop-shadow(0 0 6px rgba(92,255,42,0.6))' }} />
          </p>

          <h1 className="mt-4">
            <span className="sr-only">Bivek Daimary (Dameo) — full-stack developer and video editor</span>
            <span aria-hidden className="relative block w-[min(561px,86vw)]">
              <span className="absolute -inset-x-[170px] -inset-y-[100px] pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at center, rgba(124,255,42,0.2), rgba(92,255,42,0.07) 55%, transparent 75%)' }} />
              <PixelWordmark word="BIVEK" cell={CELL} depth={DEPTH} className="relative w-full h-auto" />
              <Character3D imgStyle={CHAR_STYLE} canvasStyle={CANVAS_STYLE} />
            </span>
          </h1>

          <p className="mt-[34px] max-w-[640px] font-pixelify text-[18px] sm:text-[23px] leading-[26px] sm:leading-[32px] tracking-[0.02em] text-white [text-shadow:3px_3px_0_#08140A,0_0_12px_rgba(0,0,0,0.7)]">
            {first}{rest && <> —<br />{rest}</>}
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3 sm:gap-6">
            <StepButton to="end" go={go} tone="green">VIEW PROJECTS</StepButton>
            <StepButton to="nether" go={go} tone="stone">EDITING VIDEOS</StepButton>
          </div>
        </div>
      </div>

      {/* grass + dirt floor, only the top shows */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-[64px] overflow-hidden">
        <div className="h-[16px]" style={{ background: 'linear-gradient(180deg, #7dd23f 0%, #5da92a 60%, #4c8f21 100%)', boxShadow: 'inset 0 -4px 0 rgba(0,0,0,0.22), inset 0 3px 0 rgba(255,255,255,0.25)' }} />
        <div className="h-[88px] pixelated" style={{ backgroundColor: '#6b4423', backgroundImage: GROUND_TILE, backgroundSize: '52px 52px' }} />
      </div>
    </section>
  );
}
