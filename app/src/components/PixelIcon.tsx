/* Tiny 8x8 pixel-art item icons, Minecraft-inventory style. */

const ICONS: Record<string, string[]> = {
  sword: [
    '......##',
    '.....###',
    '....####',
    '...###.#',
    '..##....',
    '.###....',
    '##.#....',
    '#.##....',
  ],
  camera: [
    '...##...',
    '..####..',
    '########',
    '##..##.#',
    '##....##',
    '##..##.#',
    '########',
    '........',
  ],
  code: [
    '..#...#.',
    '.#.....#',
    '#......#',
    '.#.....#',
    '..#...#.',
    '........',
    '........',
    '........',
  ],
  star: [
    '...#....',
    '...#....',
    '..###...',
    '#######.',
    '..###...',
    '...#....',
    '...#....',
    '........',
  ],
  note: [
    '...#####',
    '...#...#',
    '...#...#',
    '...#....',
    '...#....',
    '.###....',
    '####....',
    '.##.....',
  ],
};

interface Props {
  name: keyof typeof ICONS;
  color?: string;
  size?: number;
}

export default function PixelIcon({ name, color = '#8fd94f', size = 18 }: Props) {
  const rows = ICONS[name];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 8 8"
      shapeRendering="crispEdges"
      aria-hidden="true"
      style={{ imageRendering: 'pixelated', filter: 'drop-shadow(1px 1px 0 rgba(0,0,0,.45))' }}
    >
      {rows.flatMap((row, y) =>
        row
          .split('')
          .map((ch, x) =>
            ch === '#' ? (
              <rect key={`${x}-${y}`} x={x} y={y} width={1.02} height={1.02} fill={color} />
            ) : null,
          ),
      )}
    </svg>
  );
}
