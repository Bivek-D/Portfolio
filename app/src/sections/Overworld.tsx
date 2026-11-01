import { motion } from 'framer-motion';
import TopBar, { type TopBarLink, type TopBarTheme } from '@/components/TopBar';
import OverworldHero from '@/components/overworld/OverworldHero';
import AboutBook from '@/components/overworld/AboutBook';
import Inventory from '@/components/overworld/Inventory';
import Advancements from '@/components/overworld/Advancements';
import JourneyMap from '@/components/overworld/JourneyMap';
import VillagerTrade from '@/components/overworld/VillagerTrade';
import { OwTitle } from '@/components/overworld/gui';
import type { DimId } from '@/lib/dimensions';

/** Sections of the Overworld page the top bar jumps between (in page order). */
const LINKS: TopBarLink[] = [
  { id: 'top', label: 'HOME' },
  { id: 'about', label: 'ABOUT' },
  { id: 'skills', label: 'SKILLS' },
  { id: 'journey', label: 'JOURNEY' },
  { id: 'contact', label: 'CONTACT' },
];

const THEME: TopBarTheme = {
  brand: 'BIVEK',
  emblem: '#FF8A1E',
  emblemGlow: 'drop-shadow(0 0 5px rgba(255,106,26,0.7))',
  activeBorder: '#5CFF2A',
  activeFill: 'rgba(18,58,12,0.78)',
  activeText: '#FFFFFF',
  activeTextShadow: '2px 2px 0 #0E4A06, 0 0 8px rgba(92,255,42,0.5)',
  activeGlow: 'drop-shadow(0 0 5px rgba(92,255,42,0.9)) drop-shadow(0 0 14px rgba(92,255,42,0.35))',
  menuAccentText: '#B8FF8A',
  menuAccentFill: '#123A0C',
};

const fadeUp = {
  initial: { opacity: 0, y: 34 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-70px' },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
};

/**
 * The Overworld (landing page, design o3 + prototype p4): hero with BIVEK and the character on the K, then you dig
 * down through the sections — About as a Book & Quill + Inventory, Skill Tree as Advancements, Journey Log as a map
 * on a scroll, Contact as a villager trade — over a dirt -> stone -> deepslate backdrop.
 */
export default function Overworld({ go }: { go: (d: DimId) => void }) {
  return (
    <div className="relative overflow-x-clip">
      <TopBar links={LINKS} theme={THEME} />
      <OverworldHero go={go} />

      <div className="relative ow-underground">
        <div aria-hidden className="absolute inset-x-0 top-0 h-24" style={{ background: 'linear-gradient(180deg, rgba(11,7,5,0.95), transparent)' }} />

        <div className="relative max-w-[1024px] mx-auto px-4 sm:px-6 pt-28 pb-24 flex flex-col gap-24 md:gap-28">
          <motion.section {...fadeUp} id="about" className="scroll-mt-24" aria-labelledby="about-title">
            <OwTitle id="about-title">ABOUT ME</OwTitle>
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:justify-between">
              <AboutBook />
              <Inventory />
            </div>
          </motion.section>

          <motion.section {...fadeUp} id="skills" className="scroll-mt-24" aria-labelledby="skills-title">
            <OwTitle id="skills-title">SKILL TREE</OwTitle>
            <Advancements />
          </motion.section>

          <section id="journey" className="scroll-mt-24" aria-labelledby="journey-title">
            <OwTitle id="journey-title">JOURNEY LOG</OwTitle>
            <JourneyMap />
          </section>

          <motion.section {...fadeUp} id="contact" className="scroll-mt-24" aria-labelledby="contact-title">
            <OwTitle id="contact-title">READY TO BUILD?</OwTitle>
            <VillagerTrade />
          </motion.section>

          <footer className="text-center pb-4">
            <p className="font-pixel text-[8px] tracking-widest text-[#8a7d63]">
              DIMENSION PORTFOLIO v2.0 · CRAFTED BLOCK BY BLOCK · © 2026
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
