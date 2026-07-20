/* Procedural Minecraft-style pixel textures — no image assets, all generated. */

export function rng(seed: number): () => number {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick<T>(r: () => number, arr: T[]): T {
  return arr[Math.floor(r() * arr.length)];
}

/** 16x16 grid of hex colors (256 entries) */
export type Pattern = string[];

const GREENS = ['#6abe30', '#5da92a', '#7acf3e', '#54a024', '#83d84b', '#65b32c'];
const DIRTS = ['#8a5a32', '#7a4e2b', '#96653a', '#6b4423', '#835830'];
const DIRT_DARK = '#54371e';
const PEBBLE = '#a58560';

export function grassPattern(): Pattern {
  const r = rng(1337);
  const p: string[] = [];
  for (let y = 0; y < 16; y++) {
    for (let x = 0; x < 16; x++) {
      if (y < 3) {
        p.push(pick(r, GREENS));
      } else if (y === 3) {
        p.push(r() < 0.62 ? pick(r, GREENS) : pick(r, DIRTS));
      } else if (y === 4) {
        p.push(r() < 0.2 ? pick(r, GREENS) : pick(r, DIRTS));
      } else {
        const v = r();
        p.push(v < 0.1 ? DIRT_DARK : v < 0.16 ? PEBBLE : pick(r, DIRTS));
      }
    }
  }
  return p;
}

const NETHS = ['#6e2626', '#632222', '#7a2b2b', '#582020', '#6b2525'];
const NETH_DARK = '#3f1414';
const NETH_LIGHT = '#8a3636';

export function netherrackPattern(): Pattern {
  const r = rng(2077);
  const p: string[] = [];
  for (let y = 0; y < 16; y++) {
    for (let x = 0; x < 16; x++) {
      const v = r();
      // clustered dark crevices
      const neighborBias = y > 0 && p[(y - 1) * 16 + x] === NETH_DARK ? 0.18 : 0;
      p.push(
        v < 0.1 + neighborBias ? NETH_DARK : v > 0.9 ? NETH_LIGHT : pick(r, NETHS),
      );
    }
  }
  return p;
}

const ENDS = ['#dde1a0', '#d6d995', '#e6e9ae', '#cdd186', '#dbe09c'];
const END_SPECK = '#b0b470';
const END_DEEP = '#9fa262';

export function endstonePattern(): Pattern {
  const r = rng(4099);
  const p: string[] = [];
  for (let y = 0; y < 16; y++) {
    for (let x = 0; x < 16; x++) {
      const v = r();
      p.push(v < 0.09 ? END_DEEP : v < 0.22 ? END_SPECK : pick(r, ENDS));
    }
  }
  return p;
}

/** Build a tiled CSS background from a palette — returns a data-URI url() string. */
export function tileURI(colors: string[], seed: number): string {
  const r = rng(seed);
  let rects = '';
  for (let y = 0; y < 16; y++) {
    for (let x = 0; x < 16; x++) {
      rects += `<rect x='${x}' y='${y}' width='1' height='1' fill='${pick(r, colors)}'/>`;
    }
  }
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' shape-rendering='crispEdges'>${rects}</svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

/* Loading-screen tiles (per PRD §6.2) */
export const DIRT_TILE = tileURI(
  ['#2c1f0f', '#2c1f0f', '#332416', '#241809', '#241809', '#3a2a18', '#171006'],
  7,
);
export const NETHERRACK_TILE = tileURI(
  ['#3d0000', '#3d0000', '#460b06', '#330000', '#330000', '#4a0f08', '#240000'],
  21,
);
export const ENDSTONE_TILE = tileURI(
  ['#b8b86a', '#b8b86a', '#c0c074', '#acac5e', '#c4c47e', '#9a9a52', '#b0b064'],
  99,
);

/* Overworld ground dirt tile */
export const GROUND_TILE = tileURI(
  ['#6b4423', '#6b4423', '#7a4e2b', '#5d3a1d', '#8a5a32', '#54371e', '#4c3119'],
  5,
);
