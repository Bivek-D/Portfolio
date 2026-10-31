import { useId } from 'react';

/**
 * The DAMEO wordmark from the design (FigCraft r8): heavy pixel letters on a 9-row grid with 3-cell strokes,
 * a 10px diagonal block extrusion (warm brown -> near black), flat red-orange face, soft shadow and orange glow.
 */
const GLYPHS: Record<string, string[]> = {
  D: ['#######..', '########.', '###..####', '###...###', '###...###', '###...###', '###..####', '########.', '#######..'],
  A: ['..#####..', '.#######.', '####.####', '###...###', '#########', '#########', '###...###', '###...###', '###...###'],
  M: ['####...####', '#####.#####', '###########', '###.###.###', '###..#..###', '###.....###', '###.....###',
    '###.....###', '###.....###'],
  E: ['########', '########', '###.....', '#######.', '#######.', '###.....', '###.....', '########', '########'],
  O: ['.#######.', '#########', '###...###', '###...###', '###...###', '###...###', '###...###', '#########', '.#######.'],
};

const CELL = 8;
const DEPTH = 10;

function buildPath(word: string) {
  const parts: string[] = [];
  let cx = 0;
  for (const ch of word) {
    const rows = GLYPHS[ch];
    rows.forEach((row, r) => {
      let c0 = -1;
      for (let c = 0; c <= row.length; c++) {
        const on = row[c] === '#';
        if (on && c0 < 0) c0 = c;
        if (!on && c0 >= 0) {
          parts.push(`M${(cx + c0) * CELL} ${r * CELL}h${(c - c0) * CELL}v${CELL}h-${(c - c0) * CELL}z`);
          c0 = -1;
        }
      }
    });
    cx += rows[0].length + 1;
  }
  return { d: parts.join(''), width: (cx - 1) * CELL, height: 9 * CELL };
}

const WORD = buildPath('DAMEO');

function shade(t: number) {
  // near the face: #5A1406, far back: #140201
  const lerp = (a: number, b: number) => Math.round(a + (b - a) * t);
  return `rgb(${lerp(0x5a, 0x14)}, ${lerp(0x14, 0x02)}, ${lerp(0x06, 0x01)})`;
}

export default function DameoTitle({ className = '' }: { className?: string }) {
  const id = useId().replace(/:/g, '');
  // the box is the letters plus their extrusion; glow and shadow spill outside it (overflow visible)
  return (
    <svg
      viewBox={`0 0 ${WORD.width + DEPTH * 0.75} ${WORD.height + DEPTH}`}
      className={className}
      aria-hidden="true"
      shapeRendering="crispEdges"
      style={{ overflow: 'visible' }}
    >
      <defs>
        <path id={`${id}-w`} d={WORD.d} />
        <linearGradient id={`${id}-face`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FF7E32" />
          <stop offset="0.55" stopColor="#FC7029" />
          <stop offset="1" stopColor="#EE5E22" />
        </linearGradient>
        <filter id={`${id}-glow`} x="-30%" y="-60%" width="160%" height="220%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
        <filter id={`${id}-soft`} x="-20%" y="-40%" width="140%" height="180%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>
      <use href={`#${id}-w`} y={4} fill="#FF5A1A" opacity={0.55} filter={`url(#${id}-glow)`} />
      <use href={`#${id}-w`} x={DEPTH + 2} y={DEPTH + 10} fill="#000" opacity={0.75} filter={`url(#${id}-soft)`} />
      {Array.from({ length: DEPTH }, (_, k) => DEPTH - k).map((i) => (
        <use key={i} href={`#${id}-w`} x={i * 0.75} y={i} fill={shade((i - 1) / (DEPTH - 1))} />
      ))}
      <use href={`#${id}-w`} fill={`url(#${id}-face)`} />
    </svg>
  );
}
