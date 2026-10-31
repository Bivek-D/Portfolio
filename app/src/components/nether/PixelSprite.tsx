import type { CSSProperties, ReactElement } from 'react';

interface Props {
  /** rows of characters; each character maps to a colour in `palette` ('.' = empty) */
  rows: string[];
  palette: Record<string, string>;
  /** px per pixel cell */
  cell: number;
  className?: string;
  style?: CSSProperties;
  title?: string;
}

/** Crisp pixel-art sprite drawn as SVG rectangles (one merged run per row and colour). */
export default function PixelSprite({ rows, palette, cell, className, style, title }: Props) {
  const w = rows[0].length;
  const h = rows.length;
  const rects: ReactElement[] = [];
  rows.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const ch = row[x];
      let end = x;
      while (end < row.length && row[end] === ch) end++;
      if (palette[ch]) rects.push(<rect key={`${x}-${y}`} x={x} y={y} width={end - x} height={1} fill={palette[ch]} />);
      x = end;
    }
  });
  return (
    <svg
      width={w * cell}
      height={h * cell}
      viewBox={`0 0 ${w} ${h}`}
      shapeRendering="crispEdges"
      className={className}
      style={style}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {rects}
    </svg>
  );
}

/* sprites from the FigCraft design (build/nether_r7–r9.py, proto_nether.py) */
export const SPRITES = {
  emblem: ['...######...', '..#......#..', '.#..####..#.', '#..#....#..#', '#.#..##..#.#', '#.#.####.#.#',
    '#.#.####.#.#', '#.#..##..#.#', '#..#....#..#', '.#..####..#.', '..#......#..', '...######...'],
  gear: ['....##....', '.#.####.#.', '##########', '.###..###.', '###....###', '###....###', '.###..###.',
    '##########', '.#.####.#.', '....##....'],
  doc: ['#########...', '#.......##..', '#.......#.#.', '#.......####', '#..........#', '#..######..#',
    '#..........#', '#..######..#', '#..........#', '#..######..#', '#..........#', '#..........#', '############'],
  playbox: ['.############.', '#............#', '#.....#......#', '#.....##.....#', '#.....###....#',
    '#.....####...#', '#.....###....#', '#.....##.....#', '#.....#......#', '#............#', '.############.'],
  trophy: ['############', '#..######..#', '#..######..#', '.#.######.#.', '..########..', '...######...',
    '....####....', '.....##.....', '.....##.....', '....####....', '...######...', '...######...'],
  chevron: ['##..', '.##.', '..##', '.##.', '##..'],
  play: ['#....', '##...', '###..', '####.', '#####', '####.', '###..', '##...', '#....'],
  close: ['##...##', '.##.##.', '..###..', '.##.##.', '##...##'],
  pickHead: ['..#########..', '.###########.', '###.......###', '##.........##', '#...........#'],
  chestOpen: ['oooooooooooooo', 'owwwwwwwwwwwwo', 'oddddddddddddo', 'oooooooooooooo', 'oyyyyyyyyyyyyo',
    'oyygyyyygyyyyo', 'oddddddggddddo', 'owwwwwggwwwwwo', 'owwwwwwwwwwwwo', 'owwwwwwwwwwwwo',
    'owwwwwwwwwwwwo', 'oddddddddddddo', 'oooooooooooooo'],
  arrowDown: ['#######', '.#####.', '..###..', '...#...'],
};

export const CHEST_PAL = { o: '#24100A', w: '#8A5A2A', d: '#5A3616', g: '#FFC23A', y: '#FFB347' };
