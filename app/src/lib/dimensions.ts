export type DimId = 'overworld' | 'nether' | 'end';
export type BlockType = 'grass' | 'netherrack' | 'endstone';

export interface Dimension {
  id: DimId;
  name: string;
  sub: string;
  block: BlockType;
  color: string;
  glow: string;
  loadingTile: 'dirt' | 'netherrack' | 'endstone';
  /** px neighbors slide left/right when this block is hovered (label widths + gap) */
  moveLeft: number;
  moveRight: number;
}

const mk = (
  id: DimId,
  name: string,
  sub: string,
  block: BlockType,
  color: string,
  glow: string,
  loadingTile: Dimension['loadingTile'],
): Dimension => ({
  id,
  name,
  sub,
  block,
  color,
  glow,
  loadingTile,
  moveLeft: name.length * 9 + 46,
  moveRight: sub.length * 8 + 46,
});

export const DIMENSIONS: Dimension[] = [
  mk('overworld', 'OVERWORLD', 'ABOUT ME', 'grass', '#6abe30', 'rgba(106, 190, 48, 0.55)', 'dirt'),
  mk('nether', 'NETHER', 'EDITING & PRODUCTION', 'netherrack', '#f24a1d', 'rgba(242, 123, 26, 0.55)', 'netherrack'),
  mk('end', 'THE END', 'DEV & PROJECTS', 'endstone', '#b967e8', 'rgba(185, 103, 232, 0.55)', 'endstone'),
];

export function getDimension(id: DimId): Dimension {
  return DIMENSIONS.find((d) => d.id === id)!;
}
