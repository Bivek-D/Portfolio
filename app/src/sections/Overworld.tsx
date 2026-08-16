import type { ReactNode } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from 'framer-motion';
import { GROUND_TILE } from '@/lib/pixels';
import { Leaves } from '@/components/Particles';
import PixelIcon from '@/components/PixelIcon';
import BlockIcon from '@/components/BlockIcon';
import {
  PROFILE,
  INTERESTS,
  SKILLS,
  TIMELINE,
  SOCIALS,
  RESUME_URL,
} from '@/data/portfolio';
import type { DimId } from '@/lib/dimensions';

/* ---------------- helpers ---------------- */

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <span className="w-2.5 h-2.5 shrink-0 bg-[#6abe30] shadow-[0_0_10px_rgba(106,190,48,0.8)]" />
      <h2 className="font-pixel text-base md:text-lg text-[#eaf6da] text-shadow-pixel-sm whitespace-nowrap">
        {children}
      </h2>
      <div className="flex-1 h-[3px] bg-gradient-to-r from-[#6abe30]/70 to-transparent" />
    </div>
  );
}

const fadeUp = {
  initial: { opacity: 0, y: 34 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-70px' },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
};

/* ---------------- social brand icons ---------------- */

const SOCIAL_PATHS: Record<string, string> = {
  github:
    'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12',
  linkedin:
    'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z',
  youtube:
    'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
  discord:
    'M18.59 5.89c-1.23-.57-2.54-.99-3.92-1.23c-.17.3-.37.71-.5 1.04c-1.46-.22-2.91-.22-4.34 0c-.14-.33-.34-.74-.51-1.04c-1.38.24-2.69.66-3.92 1.23c-2.48 3.74-3.15 7.39-2.82 10.98c1.65 1.23 3.24 1.97 4.81 2.46c.39-.53.73-1.1 1.03-1.69c-.57-.21-1.11-.48-1.62-.79c.14-.1.28-.21.42-.32c2.81 1.28 5.82 1.28 8.62 0c.14.11.28.22.42.32c-.51.31-1.05.58-1.62.79c.3.59.64 1.16 1.03 1.69c1.57-.49 3.16-1.23 4.81-2.46c.33-3.59-.34-7.24-2.82-10.98zM9.5 13.52c-1.05 0-1.92-.95-1.92-2.12s.84-2.12 1.92-2.12c1.09 0 1.94.97 1.92 2.12c0 1.17-.84 2.12-1.92 2.12zm5 0c-1.05 0-1.92-.95-1.92-2.12s.84-2.12 1.92-2.12c1.09 0 1.94.97 1.92 2.12c0 1.17-.84 2.12-1.92 2.12z',
};

/* ---------------- parallax layer ---------------- */

function Layer({
  mv,
  depth,
  children,
  className,
}: {
  mv: { x: MotionValue<number>; y: MotionValue<number> };
  depth: number;
  children: ReactNode;
  className?: string;
}) {
  const x = useTransform(mv.x, (v) => v * depth);
  const y = useTransform(mv.y, (v) => v * depth * 0.5);
  return (
    <motion.div className={className} style={{ x, y }}>
      {children}
    </motion.div>
  );
}

/* ---------------- main section ---------------- */

export default function Overworld({ go }: { go: (d: DimId) => void }) {
  const reduced = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 46, damping: 18 });
  const sy = useSpring(my, { stiffness: 46, damping: 18 });
  const parallax = { x: sx, y: sy };

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reduced) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  };

  return (
    <div className="relative">
      {/* ================= HERO ================= */}
      <section
        className="relative min-h-screen overflow-hidden"
        onMouseMove={onMouseMove}
        aria-label="Overworld hero"
      >
        {/* sky */}
        <Layer mv={parallax} depth={-8} className="absolute -inset-[4%]">
          <div
            className="w-full h-full"
            style={{
              background:
                'linear-gradient(180deg, #6ea1ef 0%, #8dbef4 32%, #b8dcf7 58%, #e2f5ec 80%, #f3fbee 100%)',
            }}
          />
        </Layer>

        {/* square sun */}
        <Layer mv={parallax} depth={-18} className="absolute inset-0">
          <div
            className="absolute right-[16%] top-[13%] w-14 h-14 md:w-20 md:h-20 bg-[#fff6cf]"
            style={{ boxShadow: '0 0 60px 30px rgba(255, 244, 190, 0.65)' }}
          />
        </Layer>

        {/* blocky clouds */}
        <Layer mv={parallax} depth={-26} className="absolute inset-0">
          <span className="cloud" style={{ top: '12%', '--dur': '95s', '--delay': '-30s', '--o': 0.95 } as React.CSSProperties} />
          <span className="cloud" style={{ top: '24%', '--dur': '130s', '--delay': '-90s', '--o': 0.7, transform: 'scale(0.7)' } as React.CSSProperties} />
          <span className="cloud" style={{ top: '7%', '--dur': '110s', '--delay': '-65s', '--o': 0.8 } as React.CSSProperties} />
        </Layer>

        {/* far voxel hills */}
        <Layer mv={parallax} depth={-16} className="absolute -left-[4%] -right-[4%] bottom-[92px] h-[240px]">
          <svg viewBox="0 0 1440 240" preserveAspectRatio="none" className="w-full h-full">
            <path
              d="M0 150 h120 v-30 h160 v30 h140 v-55 h180 v55 h160 v-25 h180 v25 h140 v-45 h180 v45 h160 V240 H0 Z"
              fill="#8fbf6a"
              opacity="0.8"
            />
          </svg>
        </Layer>

        {/* near voxel hills */}
        <Layer mv={parallax} depth={-32} className="absolute -left-[5%] -right-[5%] bottom-[92px] h-[230px]">
          <svg viewBox="0 0 1440 240" preserveAspectRatio="none" className="w-full h-full">
            <path
              d="M0 190 h160 v-45 h140 v45 h120 v-70 h200 v70 h160 v-35 h180 v35 h160 v-55 h180 v55 h140 V240 H0 Z"
              fill="#55843a"
            />
          </svg>
        </Layer>

        {/* fog */}
        <div
          className="fog w-[46vw] h-[30vh] left-[4%] top-[46%]"
          style={
            {
              background: 'radial-gradient(ellipse, rgba(255,255,255,0.5) 0%, transparent 70%)',
              '--dur': '24s',
            } as React.CSSProperties
          }
        />
        <div
          className="fog w-[38vw] h-[26vh] right-[2%] top-[58%]"
          style={
            {
              background: 'radial-gradient(ellipse, rgba(255,255,255,0.42) 0%, transparent 70%)',
              '--dur': '31s',
              animationDelay: '-12s',
            } as React.CSSProperties
          }
        />

        {/* ground */}
        <div className="absolute inset-x-0 bottom-0 h-[104px]">
          <div
            className="h-[16px]"
            style={{
              background: 'linear-gradient(180deg, #7dd23f 0%, #5da92a 60%, #4c8f21 100%)',
              boxShadow: 'inset 0 -4px 0 rgba(0,0,0,0.22), inset 0 3px 0 rgba(255,255,255,0.25)',
            }}
          />
          <div
            className="h-[88px] pixelated"
            style={{ backgroundColor: '#6b4423', backgroundImage: GROUND_TILE, backgroundSize: '52px 52px' }}
          />
        </div>

        {/* floating leaves */}
        <Leaves />

        {/* hero content */}
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6 pb-40 pt-24">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="flex flex-col items-center"
          >


            <p className="font-pixel text-[10px] md:text-xs text-[#2c4a17] mb-5 text-shadow-none">
              {PROFILE.greeting}
            </p>

            <h1
              className="font-pixel text-[clamp(2.4rem,9vw,5rem)] leading-none text-[#16280b] mb-6"
              style={{ textShadow: '4px 4px 0 rgba(255,255,255,0.45)' }}
            >
              {PROFILE.name}
            </h1>

            <p className="max-w-xl text-base md:text-lg font-medium text-[#22390f] leading-relaxed mb-10">
              {PROFILE.tagline}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button type="button" className="mc-btn mc-btn-green" onClick={() => go('end')}>
                VIEW PROJECTS
              </button>
              <button type="button" className="mc-btn mc-btn-dark" onClick={() => go('nether')}>
                Editing Videos
              </button>
            </div>

            <p className="mt-12 font-pixel text-[8px] tracking-widest text-[#33511c]/80">
              SCROLL TO DIG DEEPER ▼
            </p>
          </motion.div>
        </div>
      </section>

      {/* ================= UNDERGROUND CONTENT ================= */}
      <div className="relative" style={{ background: '#17100b' }}>
        <div
          className="absolute inset-0 pixelated opacity-[0.16]"
          style={{ backgroundImage: GROUND_TILE, backgroundSize: '64px 64px' }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 top-0 h-24"
          style={{ background: 'linear-gradient(180deg, rgba(10,7,4,0.9), transparent)' }}
          aria-hidden="true"
        />

        <div className="relative max-w-5xl mx-auto px-6 py-24 flex flex-col gap-24">
          {/* -------- ABOUT + INTERESTS -------- */}
          <motion.section {...fadeUp} aria-label="About me">
            <SectionTitle>ABOUT ME</SectionTitle>
            <div className="grid lg:grid-cols-5 gap-6">
              <div className="mc-card mc-card-corner lg:col-span-3 p-7 md:p-9">
                <p className="text-[#e8dfc9] leading-relaxed text-[15px] md:text-base">
                  {PROFILE.about}
                </p>
                <p className="mt-6 font-pixel text-[9px] text-[#8fd94f]/80 tracking-wider">
                  {PROFILE.location}
                </p>
              </div>

              <div className="mc-card lg:col-span-2 p-7 md:p-8">
                <h3 className="font-pixel text-[11px] text-[#b8e08a] mb-6">INVENTORY · INTERESTS</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                  {INTERESTS.map((it) => (
                    <li key={it.label} className="flex items-center gap-3.5 group">
                      <span className="grid place-items-center w-9 h-9 shrink-0 bg-[#241a10] border-2 border-black/70 shadow-[inset_0_2px_0_rgba(255,255,255,0.08)] transition-transform duration-200 group-hover:-translate-y-0.5">
                        {it.icon === 'block' ? (
                          <BlockIcon type="grass" size={20} />
                        ) : (
                          <PixelIcon name={it.icon} />
                        )}
                      </span>
                      <span className="text-sm font-medium text-[#ddd3ba]">{it.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.section>

          {/* -------- SKILLS -------- */}
          <motion.section {...fadeUp} aria-label="Skills">
            <SectionTitle>SKILL TREE</SectionTitle>
            <div className="mc-card p-7 md:p-9">
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
                {(['dev', 'edit'] as const).map((group) => (
                  <div key={group}>
                    <h3 className="font-pixel text-[10px] text-[#b8e08a] mb-6">
                      {group === 'dev' ? 'DEVELOPMENT' : 'EDITING & POST'}
                    </h3>
                    <ul className="flex flex-col gap-5">
                      {SKILLS.filter((s) => s.group === group).map((s) => (
                        <li key={s.name}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-semibold text-[#ece4cf]">{s.name}</span>
                            <span className="font-pixel text-[8px] text-[#8fd94f]">LVL {s.level}</span>
                          </div>
                          <div
                            className="flex gap-[3px]"
                            role="img"
                            aria-label={`${s.name}: level ${s.level} out of 10`}
                          >
                            {Array.from({ length: 10 }, (_, i) => (
                              <span key={i} className={`skill-seg${i < s.level ? ' on' : ''}`} />
                            ))}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* -------- TIMELINE -------- */}
          <motion.section {...fadeUp} aria-label="Timeline">
            <SectionTitle>JOURNEY LOG</SectionTitle>
            <div className="relative pl-10 md:pl-14">
              <div className="rail absolute left-3 md:left-5 top-1 bottom-1 w-[6px]" aria-hidden="true" />
              <ol className="flex flex-col gap-10">
                {TIMELINE.map((ev) => (
                  <li key={ev.year} className="relative">
                    <span
                      className="absolute -left-10 md:-left-14 top-1 w-[18px] h-[18px] ml-[3px] bg-[#6abe30] border-2 border-black/70 shadow-[0_0_12px_rgba(106,190,48,0.7)]"
                      aria-hidden="true"
                    />
                    <div className="mc-card p-6 md:p-7 transition-transform duration-200 hover:-translate-y-1">
                      <span className="inline-block font-pixel text-[9px] text-[#101508] bg-[#8fd94f] px-2.5 py-1.5 mb-3 shadow-[2px_2px_0_rgba(0,0,0,0.5)]">
                        {ev.year}
                      </span>
                      <h3 className="text-base md:text-lg font-bold text-[#f0ead8] mb-1.5">{ev.title}</h3>
                      <p className="text-sm text-[#c9bfa6] leading-relaxed">{ev.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </motion.section>

          {/* -------- RESUME + SOCIALS -------- */}
          <motion.section {...fadeUp} aria-label="Resume and social links">
            <div className="mc-card mc-card-corner p-8 md:p-10 text-center">
              <h2 className="font-pixel text-sm md:text-base text-[#eaf6da] text-shadow-pixel-sm mb-3">
                READY TO BUILD?
              </h2>
              <p className="text-sm text-[#c9bfa6] max-w-md mx-auto mb-8">
                Grab the resume, check the repos, or send a message — the portal is always open.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-5 mb-9">
                <a className="mc-btn mc-btn-green" href={RESUME_URL} download>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
                    <path d="M12 3v12" />
                    <path d="m7 10 5 5 5-5" />
                    <path d="M4 21h16" />
                  </svg>
                  DOWNLOAD RESUME
                </a>
              </div>
              <div className="flex items-center justify-center gap-4">
                {SOCIALS.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    className="grid place-items-center w-12 h-12 bg-[#241a10] border-2 border-black/70 text-[#d8cfb8] shadow-[inset_0_2px_0_rgba(255,255,255,0.08),0_4px_0_rgba(0,0,0,0.4)] transition-all duration-150 hover:-translate-y-1 hover:text-[#8fd94f] hover:shadow-[inset_0_2px_0_rgba(255,255,255,0.08),0_6px_0_rgba(0,0,0,0.4),0_0_16px_rgba(106,190,48,0.35)]"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d={SOCIAL_PATHS[s.icon]} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </motion.section>

          {/* -------- footer -------- */}
          <footer className="text-center pb-4">
            <p className="font-pixel text-[8px] tracking-widest text-[#8a7d63]">
              DIMENSION PORTFOLIO v1.0 · CRAFTED BLOCK BY BLOCK · © 2026
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
