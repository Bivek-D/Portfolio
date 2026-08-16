import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Embers } from '@/components/Particles';
import { NETHERRACK_TILE } from '@/lib/pixels';
import {
  NETHER_HERO,
  NETHER_STATS,
  SHOWREEL,
  PROJECTS,
  REELS,
  CLIENTS,
  SOFTWARE,
  WORKFLOW,
  type VideoSlot,
  type ReelSlot,
} from '@/data/nether';
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

/* ---------------- video card ---------------- */

function VideoCard({ slot }: { slot: VideoSlot }) {
  const hasVideo = slot.embedUrl || slot.videoUrl;

  return (
    <div className="nether-card group transition-transform duration-200 hover:-translate-y-1">
      {/* video / thumbnail area */}
      <div className="relative aspect-video bg-[#0d0303] overflow-hidden">
        {slot.embedUrl ? (
          <iframe
            src={slot.embedUrl}
            title={slot.title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : slot.videoUrl ? (
          <video
            src={slot.videoUrl}
            title={slot.title}
            className="w-full h-full object-cover"
            controls
            preload="metadata"
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
              VIDEO {slot.id}
            </span>
          </div>
        )}
        {/* duration badge */}
        <span className="absolute bottom-2 right-2 font-pixel text-[7px] bg-black/70 text-[#ff8c5a] px-2 py-0.5 tracking-wider">
          {slot.duration}
        </span>
      </div>
      {/* info */}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className="inline-block font-pixel text-[7px] text-[#1a0804] bg-[#f27b1a] px-2 py-1 shadow-[2px_2px_0_rgba(0,0,0,0.5)]">
            {slot.category}
          </span>
          <span className="font-pixel text-[7px] text-[#c9a88e]/60">
            {slot.year}
          </span>
        </div>
        <h3 className="text-base font-bold text-[#ffd4b8] mb-2">
          {slot.title}
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {slot.tools.map((tool) => (
            <span
              key={tool}
              className="font-pixel text-[6px] text-[#ff8c5a]/70 border border-[#ff8c5a]/20 px-1.5 py-0.5 tracking-wider"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- main section ---------------- */

export default function Nether({ go }: { go: (d: DimId) => void }) {
  const reduced = useReducedMotion();

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
            <p className="font-pixel text-[10px] md:text-xs text-[#f27b1a]/70 mb-2">
              {NETHER_HERO.label}
            </p>

            <p className="font-pixel text-[10px] md:text-xs text-[#f27b1a]/70 mb-5">
              {NETHER_HERO.subtitle}
            </p>

            <h1
              className="font-pixel text-[clamp(2.4rem,9vw,5rem)] leading-none text-[#ff6b35] mb-6"
              style={{ textShadow: '4px 4px 0 rgba(0,0,0,0.6)' }}
            >
              {NETHER_HERO.title}
            </h1>

            <p className="max-w-xl text-base md:text-lg font-medium text-[#e8c4ae] leading-relaxed mb-10">
              {NETHER_HERO.tagline}
            </p>

            {/* stats row */}
            <div className="flex flex-wrap items-center justify-center gap-8 mb-10">
              {NETHER_STATS.map((stat) => (
                <div key={stat.label} className="text-center">
                  <span className="block font-pixel text-lg md:text-2xl text-[#ff6b35]">
                    {stat.value}
                  </span>
                  <span className="font-pixel text-[7px] text-[#c9a88e]/60 tracking-wider">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

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

          {/* -------- SHOWREEL -------- */}
          <motion.section {...fadeUp} aria-label="Showreel">
            <NetherTitle>SHOWREEL</NetherTitle>
            <div className="nether-card overflow-hidden">
              <div className="relative aspect-video bg-[#0d0303]">
                {SHOWREEL.embedUrl ? (
                  <iframe
                    src={SHOWREEL.embedUrl}
                    title={SHOWREEL.title}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : SHOWREEL.videoUrl ? (
                  <video
                    src={SHOWREEL.videoUrl}
                    title={SHOWREEL.title}
                    className="w-full h-full object-cover"
                    controls
                    preload="metadata"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 nether-placeholder">
                    <svg
                      width="56"
                      height="56"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#f24a1d"
                      strokeWidth="1.5"
                      opacity="0.35"
                    >
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                    <span className="font-pixel text-[9px] text-[#f24a1d]/40 tracking-wider">
                      SHOWREEL COMING SOON
                    </span>
                  </div>
                )}
              </div>
              <div className="p-6 md:p-8">
                <h3 className="font-pixel text-sm text-[#ff8c5a] mb-2">
                  {SHOWREEL.title}
                </h3>
                <p className="text-sm text-[#c9a88e] leading-relaxed">
                  {SHOWREEL.subtitle}
                </p>
                <span className="inline-block mt-3 font-pixel text-[7px] text-[#c9a88e]/50 tracking-wider">
                  DURATION: {SHOWREEL.duration}
                </span>
              </div>
            </div>
          </motion.section>

          {/* -------- PROJECTS (VIDEO GRID) -------- */}
          <motion.section {...fadeUp} aria-label="Editing projects">
            <NetherTitle>PROJECTS</NetherTitle>
            <p className="text-sm text-[#c9a88e] mb-8 max-w-2.5xl">
              A selection of editing and post-production work — from promo
              videos to documentaries.(Preview version)
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PROJECTS.map((slot) => (
                <VideoCard key={slot.id} slot={slot} />
              ))}
            </div>
            <div className="flex items-center justify-center gap-3 mt-8">
              <span className="w-1.5 h-1.5 bg-[#f24a1d]/30 animate-pulse" />
              <span className="font-pixel text-[8px] md:text-[10px] text-[#ff8c5a]/40 tracking-widest uppercase select-none">
                ...and many more
              </span>
              <span className="w-1.5 h-1.5 bg-[#f24a1d]/30 animate-pulse" />
            </div>
          </motion.section>

          {/* -------- REELS -------- */}
          <motion.section {...fadeUp} aria-label="Reels">
            <NetherTitle>REELS</NetherTitle>
            <p className="text-sm text-[#c9a88e] mb-8 max-w-2xl">
              Short-form vertical edits — quick cuts, transitions, and
              visual storytelling in under 60 seconds.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {REELS.map((reel) => (
                <div
                  key={reel.id}
                  className="nether-card group transition-transform duration-200 hover:-translate-y-1"
                >
                  {/* 9:16 vertical video area */}
                  <div className="relative bg-[#0d0303] overflow-hidden" style={{ aspectRatio: '9 / 16' }}>
                    {reel.embedUrl ? (
                      <iframe
                        src={reel.embedUrl}
                        title={reel.title}
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : reel.videoUrl ? (
                      <video
                        src={reel.videoUrl}
                        title={reel.title}
                        className="w-full h-full object-cover"
                        controls
                        preload="metadata"
                      />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 nether-placeholder">
                        <svg
                          width="28"
                          height="28"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#f24a1d"
                          strokeWidth="1.5"
                          opacity="0.4"
                        >
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                        <span className="font-pixel text-[6px] text-[#f24a1d]/35 tracking-wider">
                          REEL {reel.id.replace('r', '')}
                        </span>
                      </div>
                    )}
                  </div>
                  {/* info */}
                  <div className="p-4">
                    <h3 className="text-sm font-bold text-[#ffd4b8] mb-1 truncate">
                      {reel.title}
                    </h3>
                    {reel.client && (
                      <p className="font-pixel text-[6px] text-[#c9a88e]/60 tracking-wider">
                        {reel.client}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-3 mt-8">
              <span className="w-1.5 h-1.5 bg-[#f24a1d]/30 animate-pulse" />
              <span className="font-pixel text-[8px] md:text-[10px] text-[#ff8c5a]/40 tracking-widest uppercase select-none">
                ...and many more
              </span>
              <span className="w-1.5 h-1.5 bg-[#f24a1d]/30 animate-pulse" />
            </div>
          </motion.section>


          {/* -------- SOFTWARE TOOLKIT -------- */}
          <motion.section {...fadeUp} aria-label="Software toolkit">
            <NetherTitle>SOFTWARE TOOLKIT</NetherTitle>
            <div className="nether-card p-7 md:p-9">
              <h3 className="font-pixel text-[10px] text-[#ff8c5a] mb-6">
                POST-PRODUCTION ARSENAL
              </h3>
              <ul className="flex flex-col gap-5">
                {SOFTWARE.map((s) => (
                  <li key={s.name}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold text-[#ffd4b8]">
                        {s.name}
                      </span>
                      <span className="font-pixel text-[8px] text-[#f27b1a]">
                        LVL {s.level}
                      </span>
                    </div>
                    <p className="text-xs text-[#c9a88e]/60 mb-2 italic">
                      {s.note}
                    </p>
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

          {/* -------- WORKFLOW -------- */}
          <motion.section {...fadeUp} aria-label="Workflow">
            <NetherTitle>WORKFLOW</NetherTitle>
            <p className="text-sm text-[#c9a88e] mb-8 max-w-2xl">
              From brief to delivery — six phases that shape every project.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {WORKFLOW.map((w) => (
                <div
                  key={w.step}
                  className="nether-card p-6 transition-transform duration-200 hover:-translate-y-1"
                >
                  <span className="inline-block font-pixel text-lg text-[#ff6b35]/30 mb-3">
                    {w.step}
                  </span>
                  <h3 className="font-pixel text-[10px] text-[#ff8c5a] mb-2">
                    {w.title}
                  </h3>
                  <p className="text-sm text-[#c9a88e] leading-relaxed">
                    {w.desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* -------- CLIENTS -------- */}
          <motion.section {...fadeUp} aria-label="Clients">
            <NetherTitle>CLIENTS</NetherTitle>
            <div className="grid sm:grid-cols-2 gap-5">
              {CLIENTS.map((c) => (
                <div
                  key={c.name}
                  className="nether-card p-6 flex items-center gap-5 transition-transform duration-200 hover:-translate-y-1"
                >
                  <span className="grid place-items-center w-12 h-12 shrink-0 bg-[#2a0e06] border-2 border-[#f24a1d]/20">
                    <span className="font-pixel text-sm text-[#ff6b35]">
                      {c.name.charAt(0)}
                    </span>
                  </span>
                  <div>
                    <h3 className="font-pixel text-[10px] text-[#ffd4b8] mb-1">
                      {c.name}
                    </h3>
                    <p className="text-xs text-[#c9a88e]/70">{c.detail}</p>
                  </div>
                </div>
              ))}
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
