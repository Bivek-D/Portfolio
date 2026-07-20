import { useMemo, type CSSProperties } from 'react';
import { rng } from '@/lib/pixels';

/* Pure-CSS particle systems — transform/opacity only, GPU-friendly (PRD §9). */

const LEAF_COLORS = ['#7ed957', '#5da92a', '#a4e635', '#4c8f21', '#8fd94f'];
const EMBER_COLORS = ['#ffb347', '#ff7b1a', '#ff4d00', '#ffd27a'];
const VOID_COLORS = ['#b967e8', '#7a4de8', '#e0d4ff', '#9d5cff'];

interface ParticleSpec {
  style: CSSProperties;
}

function useParticles(
  count: number,
  seed: number,
  colors: string[],
  opts: { durMin: number; durMax: number; sizeMin: number; sizeMax: number; drift: number },
): ParticleSpec[] {
  return useMemo(() => {
    const r = rng(seed);
    return Array.from({ length: count }, () => {
      const dur = opts.durMin + r() * (opts.durMax - opts.durMin);
      return {
        style: {
          '--x': `${(r() * 100).toFixed(2)}%`,
          '--dx': `${((r() - 0.5) * opts.drift).toFixed(1)}px`,
          '--s': `${(opts.sizeMin + r() * (opts.sizeMax - opts.sizeMin)).toFixed(1)}px`,
          '--c': colors[Math.floor(r() * colors.length)],
          '--dur': `${dur.toFixed(2)}s`,
          '--delay': `${(-r() * dur).toFixed(2)}s`,
        } as CSSProperties,
      };
    });
  }, [count, seed, colors, opts.durMin, opts.durMax, opts.sizeMin, opts.sizeMax, opts.drift]);
}

export function Leaves({ count = 16 }: { count?: number }) {
  const leaves = useParticles(count, 11, LEAF_COLORS, {
    durMin: 9,
    durMax: 18,
    sizeMin: 8,
    sizeMax: 15,
    drift: 160,
  });
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {leaves.map((l, i) => (
        <span key={i} className="leaf" style={l.style}>
          <i />
        </span>
      ))}
    </div>
  );
}

export function Embers({ count = 16 }: { count?: number }) {
  const embers = useParticles(count, 23, EMBER_COLORS, {
    durMin: 6,
    durMax: 13,
    sizeMin: 4,
    sizeMax: 8,
    drift: 120,
  });
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {embers.map((e, i) => (
        <span key={i} className="ember" style={e.style} />
      ))}
    </div>
  );
}

export function VoidParticles({ count = 18 }: { count?: number }) {
  const parts = useParticles(count, 37, VOID_COLORS, {
    durMin: 10,
    durMax: 22,
    sizeMin: 3,
    sizeMax: 7,
    drift: 90,
  });
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {parts.map((p, i) => (
        <span key={i} className="void-p" style={p.style} />
      ))}
    </div>
  );
}
