import { useId } from 'react';

/**
 * Heavy pixel wordmark like the hero titles in the design: 9-row glyphs with 3-cell strokes, a diagonal block
 * extrusion (graded near -> far), an outline, a gradient face with a bevel, a soft shadow and a coloured glow.
 * Used for BIVEK (Overworld, design o2). Add letters to GLYPHS as needed.
 */
const GLYPHS: Record<string, string[]> = {
  A: ['..#####..', '.#######.', '####.####', '###...###', '#########', '#########', '###...###', '###...###', '###...###'],
  C: ['.########', '#########', '###......', '###......', '###......', '###......', '###......', '#########', '.########'],
  N: ['###...###', '####..###', '#####.###', '#########', '###.#####', '###..####', '###...###', '###...###', '###...###'],
  B: ['########.', '#########', '###...###', '###..####', '########.', '###..####', '###...###', '#########', '########.'],
  D: ['#######..', '########.', '###..####', '###...###', '###...###', '###...###', '###..####', '########.', '#######..'],
  E: ['########', '########', '###.....', '#######.', '#######.', '###.....', '###.....', '########', '########'],
  I: ['#######', '#######', '..###..', '..###..', '..###..', '..###..', '..###..', '#######', '#######'],
  K: ['###...###', '###..####', '###.####.', '#######..', '######...', '#######..', '###.####.', '###..####', '###...###'],
  M: ['####...####', '#####.#####', '###########', '###.###.###', '###..#..###', '###.....###', '###.....###',
    '###.....###', '###.....###'],
  O: ['.#######.', '#########', '###...###', '###...###', '###...###', '###...###', '###...###', '#########', '.#######.'],
  V: ['###...###', '###...###', '###...###', '###...###', '####.####', '.#######.', '.#######.', '..#####..', '...###...'],
};

export interface WordmarkTheme {
  face: [string, string, string];     // top, middle, bottom
  near: [number, number, number];     // extrusion colour next to the face
  far: [number, number, number];      // extrusion colour at the back
  outline: string;
  glow: string;
  bevelLight: string;
}

export const GREEN: WordmarkTheme = {
  face: ['#C6FF4A', '#8CF02C', '#4FC51A'],
  near: [0x2e, 0x7a, 0x12],
  far: [0x0b, 0x2e, 0x06],
  outline: '#06200A',
  glow: '#7CFF2A',
  bevelLight: '#F4FFB8',
};

/** The End: BACK in end stone, END in ender teal. */
export const END_STONE: WordmarkTheme = {
  face: ['#FBF8CC', '#E6E1A6', '#C9C27C'],
  near: [0x4a, 0x28, 0x66],
  far: [0x12, 0x08, 0x1c],
  outline: '#05030A',
  glow: '#F0E8B0',
  bevelLight: '#FFFFFF',
};
export const ENDER_TEAL: WordmarkTheme = {
  face: ['#C8FFF4', '#5CE6CC', '#22A890'],
  near: [0x0e, 0x5a, 0x4e],
  far: [0x04, 0x18, 0x14],
  outline: '#05030A',
  glow: '#2FD3B6',
  bevelLight: '#E8FFFB',
};

export function wordmarkPath(word: string, cell: number) {
  const parts: string[] = [];
  let cx = 0;
  for (const ch of word) {
    const rows = GLYPHS[ch];
    if (!rows) continue;
    rows.forEach((row, r) => {
      let c0 = -1;
      for (let c = 0; c <= row.length; c++) {
        const on = row[c] === '#';
        if (on && c0 < 0) c0 = c;
        if (!on && c0 >= 0) {
          parts.push(`M${(cx + c0) * cell} ${r * cell}h${(c - c0) * cell}v${cell}h-${(c - c0) * cell}z`);
          c0 = -1;
        }
      }
    });
    cx += rows[0].length + 1;
  }
  return { d: parts.join(''), width: (cx - 1) * cell, height: 9 * cell };
}

export default function PixelWordmark({
  word, theme = GREEN, cell = 12, depth = 12, className = '',
}: { word: string; theme?: WordmarkTheme; cell?: number; depth?: number; className?: string }) {
  const id = useId().replace(/:/g, '');
  const w = wordmarkPath(word, cell);
  const shade = (t: number) => {
    const c = theme.near.map((a, i) => Math.round(a + (theme.far[i] - a) * t));
    return `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
  };
  return (
    <svg
      viewBox={`0 0 ${w.width + depth * 0.75} ${w.height + depth}`}
      className={className}
      aria-hidden="true"
      shapeRendering="crispEdges"
      style={{ overflow: 'visible' }}
    >
      <defs>
        <path id={`${id}-w`} d={w.d} />
        <linearGradient id={`${id}-face`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={theme.face[0]} />
          <stop offset="0.45" stopColor={theme.face[1]} />
          <stop offset="1" stopColor={theme.face[2]} />
        </linearGradient>
        <linearGradient id={`${id}-hi`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={theme.bevelLight} stopOpacity="0.55" />
          <stop offset={1 / 9} stopColor={theme.bevelLight} stopOpacity="0.55" />
          <stop offset={1 / 9 + 0.001} stopColor={theme.bevelLight} stopOpacity="0" />
        </linearGradient>
        <filter id={`${id}-glow`} x="-30%" y="-60%" width="160%" height="220%">
          <feGaussianBlur stdDeviation="15" />
        </filter>
        <filter id={`${id}-soft`} x="-20%" y="-40%" width="140%" height="180%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>
      <use href={`#${id}-w`} y={6} fill={theme.glow} opacity={0.45} filter={`url(#${id}-glow)`} />
      <use href={`#${id}-w`} x={depth + 4} y={depth + 12} fill="#000" opacity={0.6} filter={`url(#${id}-soft)`} />
      <use href={`#${id}-w`} x={depth * 0.75} y={depth} fill="none" stroke={theme.outline} strokeWidth={7} />
      {Array.from({ length: depth }, (_, k) => depth - k).map((i) => (
        <use key={i} href={`#${id}-w`} x={i * 0.75} y={i} fill={shade((i - 1) / (depth - 1))} />
      ))}
      <use href={`#${id}-w`} fill="none" stroke={theme.outline} strokeWidth={5} />
      <use href={`#${id}-w`} fill={`url(#${id}-face)`} />
      <use href={`#${id}-w`} fill={`url(#${id}-hi)`} />
    </svg>
  );
}
