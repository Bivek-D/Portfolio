import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import NetherTopBar from '@/components/nether/NetherTopBar';
import NetherHero from '@/components/nether/NetherHero';
import ShowreelMine from '@/components/nether/ShowreelMine';
import ChestCard from '@/components/nether/ChestCard';
import ReelsHotbar from '@/components/nether/ReelsHotbar';
import ToolkitList from '@/components/nether/ToolkitList';
import DimLink from '@/components/DimLink';
import { SHOWREEL, PROJECTS, REELS, CLIENTS, SOFTWARE, WORKFLOW } from '@/data/nether';
import type { DimId } from '@/lib/dimensions';

/* ---------------- helpers ---------------- */

/** Section title with the hero's glow: glowing marker, orange text glow, glowing rule (design r10). */
function NetherTitle({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <span className="w-2.5 h-2.5 shrink-0 bg-[#f24a1d] shadow-[0_0_10px_2px_rgba(255,90,26,0.95),0_0_24px_4px_rgba(255,90,26,0.4)]" />
      <h2 className="font-pixel text-base md:text-lg text-[#ffd4b8] nether-glow-title whitespace-nowrap">{children}</h2>
      <div className="flex-1 h-[3px] bg-gradient-to-r from-[#f24a1d]/70 to-transparent shadow-[0_0_8px_rgba(255,90,26,0.5)]" />
    </div>
  );
}

function ManyMore() {
  return (
    <div className="flex items-center justify-center gap-3 mt-8">
      <span className="w-1.5 h-1.5 bg-[#f24a1d]/30 animate-pulse" />
      <span className="font-pixel text-[8px] md:text-[10px] text-[#ff8c5a]/40 tracking-widest uppercase select-none">
        ...and many more
      </span>
      <span className="w-1.5 h-1.5 bg-[#f24a1d]/30 animate-pulse" />
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
  return (
    <div className="relative">
      <NetherTopBar />
      <NetherHero go={go} />

      {/* ================= UNDERGROUND: cave backdrop (netherrack -> fortress -> blackstone) ================= */}
      <div className="relative nether-cave">
        <div
          className="absolute inset-x-0 top-0 h-24"
          style={{ background: 'linear-gradient(180deg, rgba(16,3,3,0.9), transparent)' }}
          aria-hidden="true"
        />

        <div className="relative max-w-5xl mx-auto px-6 py-24 flex flex-col gap-24">
          {/* -------- SHOWREEL: hold to break -------- */}
          <motion.section {...fadeUp} id="showreel" className="scroll-mt-24" aria-label="Showreel">
            <NetherTitle>SHOWREEL</NetherTitle>
            <div className="nether-card overflow-hidden">
              {SHOWREEL.embedUrl && <ShowreelMine title={SHOWREEL.title} embedUrl={SHOWREEL.embedUrl} />}
              <div className="p-6 md:p-8">
                <h3 className="font-pixel text-sm text-[#ff8c5a] mb-2">{SHOWREEL.title}</h3>
                <p className="text-sm text-[#c9a88e] leading-relaxed">{SHOWREEL.subtitle}</p>
                <span className="inline-block mt-3 font-pixel text-[7px] text-[#c9a88e]/50 tracking-wider">
                  DURATION: {SHOWREEL.duration}
                </span>
              </div>
            </div>
          </motion.section>

          {/* -------- PROJECTS: chests -------- */}
          <motion.section {...fadeUp} id="projects" className="scroll-mt-24" aria-label="Editing projects">
            <NetherTitle>PROJECTS</NetherTitle>
            <p className="text-sm text-[#c9a88e] mb-8 max-w-2.5xl">
              A selection of editing and post-production work — from promo
              videos to documentaries.(Preview version)
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PROJECTS.map((slot) => (
                <ChestCard key={slot.id} slot={slot} />
              ))}
            </div>
            <ManyMore />
          </motion.section>

          {/* -------- REELS: hotbar -------- */}
          <motion.section {...fadeUp} id="reels" className="scroll-mt-24" aria-label="Reels">
            <NetherTitle>REELS</NetherTitle>
            <p className="text-sm text-[#c9a88e] mb-8 max-w-2xl">
              Short-form vertical edits — quick cuts, transitions, and
              visual storytelling in under 60 seconds.
            </p>
            <ReelsHotbar reels={REELS} />
            <div className="mt-10">
              <ManyMore />
            </div>
          </motion.section>

          {/* -------- SOFTWARE TOOLKIT: item tooltips -------- */}
          <motion.section {...fadeUp} id="toolkit" className="scroll-mt-24" aria-label="Software toolkit">
            <NetherTitle>SOFTWARE TOOLKIT</NetherTitle>
            <div className="nether-card !overflow-visible p-7 md:p-9">
              <h3 className="font-pixel text-[10px] text-[#ff8c5a] mb-6">POST-PRODUCTION ARSENAL</h3>
              <ToolkitList tools={SOFTWARE} />
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
                <div key={w.step} className="nether-card p-6 transition-transform duration-200 hover:-translate-y-1">
                  <span className="inline-block font-pixel text-lg text-[#ff6b35]/30 mb-3">{w.step}</span>
                  <h3 className="font-pixel text-[10px] text-[#ff8c5a] mb-2">{w.title}</h3>
                  <p className="text-sm text-[#c9a88e] leading-relaxed">{w.desc}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* -------- CLIENTS -------- */}
          <motion.section {...fadeUp} aria-label="Clients">
            <NetherTitle>CLIENTS</NetherTitle>
            <div className="grid sm:grid-cols-2 gap-5">
              {CLIENTS.map((c) => (
                <div key={c.name} className="nether-card p-6 flex items-center gap-5 transition-transform duration-200 hover:-translate-y-1">
                  <span className="grid place-items-center w-12 h-12 shrink-0 bg-[#2a0e06] border-2 border-[#f24a1d]/20">
                    <span className="font-pixel text-sm text-[#ff6b35]">{c.name.charAt(0)}</span>
                  </span>
                  <div>
                    <h3 className="font-pixel text-[10px] text-[#ffd4b8] mb-1">{c.name}</h3>
                    <p className="text-xs text-[#c9a88e]/70">{c.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* -------- CTA -------- */}
          <motion.section {...fadeUp} aria-label="Navigate dimensions">
            <div className="nether-card nether-card-corner p-8 md:p-10 text-center">
              <h2 className="font-pixel text-sm md:text-base text-[#ffd4b8] nether-glow-title mb-3">
                EXPLORE OTHER DIMENSIONS
              </h2>
              <p className="text-sm text-[#c9a88e] max-w-md mx-auto mb-8">
                Travel back to the Overworld to learn more, or venture into
                The End to see dev projects.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-5">
                <DimLink to="overworld" go={go} className="mc-btn mc-btn-nether">← OVERWORLD</DimLink>
                <DimLink to="end" go={go} className="mc-btn mc-btn-nether">THE END →</DimLink>
              </div>
            </div>
          </motion.section>

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
