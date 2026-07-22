import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Embers } from '@/components/Particles';
import { NETHERRACK_TILE } from '@/lib/pixels';
import { EDITING_PROJECTS, SKILLS } from '@/data/portfolio';
import type { DimId } from '@/lib/dimensions';

/* ---------------- helpers ---------------- */

function NetherTitle({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <span className="w-2.5 h-2.5 shrink-0 bg-[#f24a1d] shadow-[0_0_10px_rgba(242,74,29,0.8)]" />
      <h2 className="font-pixel text-base md:text-lg text-[#ffd4b8] text-shadow-pixel-sm whitespace-nowrap">
        {children}
      </h2>
      <div className="flex-1 h-[3px] bg-gradient-to-r from-[#f24a1d]/70 to-transparent" />
    </div>
  );
}

const fadeUp = {
  initial: { opacity: 0, y: 34 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-70px' },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
};

/* ---------------- main section ---------------- */

export default function Nether({ go }: { go: (d: DimId) => void }) {
  const reduced = useReducedMotion();
  const editSkills = SKILLS.filter((s) => s.group === 'edit');

  return (
    <div className="relative">
      {/* ================= HERO ================= */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          background:
            'radial-gradient(ellipse at 50% 125%, #571204 0%, #260602 45%, #100303 100%)',
        }}
        aria-label="The Nether — Editing and Production"
      >
        {/* lava under-glow */}
        <div
          className="absolute inset-x-0 bottom-0 h-[220px]"
          style={{
            background:
              'linear-gradient(to top, rgba(242,74,29,0.18), transparent)',
          }}
          aria-hidden="true"
        />
        {/* vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.6) 100%)',
          }}
          aria-hidden="true"
        />
        <Embers count={reduced ? 0 : 18} />

        {/* hero content */}
        <div className="relative z-10 text-center px-6 pt-16">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.15,
            }}
            className="flex flex-col items-center"
          >


            <p className="font-pixel text-[10px] md:text-xs text-[#f27b1a]/70 mb-5">
              EDITING &amp; PRODUCTION
            </p>

            <h1
              className="font-pixel text-[clamp(2.4rem,9vw,5rem)] leading-none text-[#ff6b35] mb-6"
              style={{ textShadow: '4px 4px 0 rgba(0,0,0,0.6)' }}
            >
              DAMEO
            </h1>

            <p className="max-w-xl text-base md:text-lg font-medium text-[#e8c4ae] leading-relaxed mb-10">
              Where raw footage is forged into cinematic stories — color
              grading, motion graphics, and visual storytelling.
            </p>

            <p className="mt-4 font-pixel text-[8px] tracking-widest text-[#f27b1a]/50">
              SCROLL TO EXPLORE ▼
            </p>
          </motion.div>
        </div>

        {/* lava strip at bottom */}
        <div className="absolute inset-x-0 bottom-0">
          <div className="lava-strip" />
          <div
            className="h-[88px] pixelated"
            style={{
              backgroundColor: '#3d0000',
              backgroundImage: NETHERRACK_TILE,
              backgroundSize: '52px 52px',
            }}
          />
        </div>
      </section>

      {/* ================= UNDERGROUND CONTENT ================= */}
      <div className="relative" style={{ background: '#1a0804' }}>
        {/* netherrack texture */}
        <div
          className="absolute inset-0 pixelated opacity-[0.12]"
          style={{
            backgroundImage: NETHERRACK_TILE,
            backgroundSize: '64px 64px',
          }}
          aria-hidden="true"
        />
        {/* top shadow */}
        <div
          className="absolute inset-x-0 top-0 h-24"
          style={{
            background:
              'linear-gradient(180deg, rgba(16,3,3,0.9), transparent)',
          }}
          aria-hidden="true"
        />

        <div className="relative max-w-5xl mx-auto px-6 py-24 flex flex-col gap-24">
          {/* -------- PREVIOUS WORK (VIDEO GRID) -------- */}
          <motion.section {...fadeUp} aria-label="Previous work">
            <NetherTitle>PREVIOUS WORK</NetherTitle>
            <p className="text-sm text-[#c9a88e] mb-8 max-w-2xl">
              A selection of editing and post-production projects — from
              short films to motion graphics.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {EDITING_PROJECTS.map((project) => (
                <div
                  key={project.id}
                  className="nether-card group transition-transform duration-200 hover:-translate-y-1"
                >
                  {/* video / thumbnail area */}
                  <div className="relative aspect-video bg-[#0d0303] overflow-hidden">
                    {project.videoUrl ? (
                      <iframe
                        src={project.videoUrl}
                        title={project.title}
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 nether-placeholder">
                        <svg
                          width="36"
                          height="36"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#f24a1d"
                          strokeWidth="1.5"
                          opacity="0.4"
                        >
                          <rect x="2" y="2" width="20" height="20" rx="2" />
                          <path d="M7 2v20M17 2v20M2 7h5M17 7h5M2 12h20M2 17h5M17 17h5" />
                        </svg>
                        <span className="font-pixel text-[7px] text-[#f24a1d]/35 tracking-wider">
                          VIDEO {project.id}
                        </span>
                      </div>
                    )}
                  </div>
                  {/* info */}
                  <div className="p-5">
                    <span className="inline-block font-pixel text-[7px] text-[#1a0804] bg-[#f27b1a] px-2 py-1 mb-3 shadow-[2px_2px_0_rgba(0,0,0,0.5)]">
                      {project.category}
                    </span>
                    <h3 className="text-base font-bold text-[#ffd4b8] mb-1.5">
                      {project.title}
                    </h3>
                    <p className="text-sm text-[#c9a88e] leading-relaxed">
                      {project.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* -------- EDITING TOOLKIT / SKILLS -------- */}
          <motion.section {...fadeUp} aria-label="Editing toolkit">
            <NetherTitle>EDITING TOOLKIT</NetherTitle>
            <div className="nether-card p-7 md:p-9">
              <h3 className="font-pixel text-[10px] text-[#ff8c5a] mb-6">
                POST-PRODUCTION
              </h3>
              <ul className="flex flex-col gap-5">
                {editSkills.map((s) => (
                  <li key={s.name}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-[#ffd4b8]">
                        {s.name}
                      </span>
                      <span className="font-pixel text-[8px] text-[#f27b1a]">
                        LVL {s.level}
                      </span>
                    </div>
                    <div
                      className="flex gap-[3px]"
                      role="img"
                      aria-label={`${s.name}: level ${s.level} out of 10`}
                    >
                      {Array.from({ length: 10 }, (_, i) => (
                        <span
                          key={i}
                          className={`nether-skill-seg${i < s.level ? ' on' : ''}`}
                        />
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </motion.section>

          {/* -------- CTA -------- */}
          <motion.section {...fadeUp} aria-label="Navigate dimensions">
            <div className="nether-card nether-card-corner p-8 md:p-10 text-center">
              <h2 className="font-pixel text-sm md:text-base text-[#ffd4b8] text-shadow-pixel-sm mb-3">
                EXPLORE OTHER DIMENSIONS
              </h2>
              <p className="text-sm text-[#c9a88e] max-w-md mx-auto mb-8">
                Travel back to the Overworld to learn more, or venture into
                The End to see dev projects.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-5">
                <button
                  type="button"
                  className="mc-btn mc-btn-nether"
                  onClick={() => go('overworld')}
                >
                  ← OVERWORLD
                </button>
                <button
                  type="button"
                  className="mc-btn mc-btn-nether"
                  onClick={() => go('end')}
                >
                  THE END →
                </button>
              </div>
            </div>
          </motion.section>

          {/* -------- footer -------- */}
          <footer className="text-center pb-4">
            <p className="font-pixel text-[8px] tracking-widest text-[#8a5a3a]">
              DIMENSION PORTFOLIO v1.0 · FORGED IN THE NETHER · © 2026
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
