import type { CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { DIRT_TILE, NETHERRACK_TILE, ENDSTONE_TILE } from '@/lib/pixels';
import type { Dimension } from '@/lib/dimensions';

const TILES = {
  dirt: { bg: '#2C1F0F', tile: DIRT_TILE },
  netherrack: { bg: '#3D0000', tile: NETHERRACK_TILE },
  endstone: { bg: '#B8B86A', tile: ENDSTONE_TILE },
} as const;

interface Props {
  target: Dimension;
  reduced: boolean;
}

/**
 * Dimension transition loading screen (PRD §6):
 * themed CSS tile background, "Loading terrain..." pixel text,
 * Minecraft bordered progress bar with glowing segmented fill.
 */
export default function DimensionTransition({ target, reduced }: Props) {
  const t = TILES[target.loadingTile];
  const dark = target.loadingTile !== 'endstone';

  return (
    <motion.div
      className="fixed inset-0 z-[90] pixelated"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduced ? 0.08 : 0.35, ease: 'easeOut' }}
      style={{
        backgroundColor: t.bg,
        backgroundImage: t.tile,
        backgroundSize: '72px 72px',
      }}
      role="status"
      aria-live="polite"
      aria-label={`Loading ${target.name}`}
    >
      {/* vignette for depth + readability */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.62) 100%)',
        }}
      />
      <div className="relative h-full flex flex-col items-center justify-center gap-9 px-6">
        <p
          className={`font-pixel text-xs sm:text-sm md:text-base text-shadow-pixel tracking-wider ${
            dark ? 'text-white' : 'text-[#2a2410]'
          }`}
          style={dark ? undefined : { textShadow: '2px 2px 0 rgba(255,255,255,0.35)' }}
        >
          Loading terrain...
        </p>
        <div className="mc-bar" role="progressbar" aria-label={`Loading ${target.name}`}>
          <motion.div
            className="mc-bar-fill"
            style={{ '--fill': target.color } as CSSProperties}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={
              reduced ? { duration: 0.2 } : { duration: 1.35, ease: [0.65, 0, 0.35, 1] }
            }
          />
        </div>
        <p
          className={`font-pixel text-[9px] tracking-widest ${
            dark ? 'text-white/50' : 'text-[#4a4220]/70'
          }`}
        >
          ENTERING {target.name}
        </p>
      </div>
    </motion.div>
  );
}
