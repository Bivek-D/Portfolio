import { useMemo } from 'react';
import {
  grassPattern,
  netherrackPattern,
  endstonePattern,
  type Pattern,
} from '@/lib/pixels';
import type { BlockType } from '@/lib/dimensions';

const BUILDERS: Record<BlockType, () => Pattern> = {
  grass: grassPattern,
  netherrack: netherrackPattern,
  endstone: endstonePattern,
};

interface Props {
  type: BlockType;
  size?: number;
  className?: string;
}

/** Procedurally generated Minecraft-style block sprite (SVG, crisp pixels). */
export default function BlockIcon({ type, size = 44, className }: Props) {
  const pattern = useMemo(() => BUILDERS[type](), [type]);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      shapeRendering="crispEdges"
      aria-hidden="true"
      className={className}
      style={{ imageRendering: 'pixelated' }}
    >
      {pattern.map((c, i) => (
        <rect
          key={i}
          x={i % 16}
          y={Math.floor(i / 16)}
          width={1.02}
          height={1.02}
          fill={c}
        />
      ))}
      {/* bevel: light top/left, dark bottom/right for chunky depth */}
      <rect x={0} y={0} width={16} height={1} fill="#ffffff" opacity={0.22} />
      <rect x={0} y={0} width={1} height={16} fill="#ffffff" opacity={0.12} />
      <rect x={0} y={15} width={16} height={1} fill="#000000" opacity={0.3} />
      <rect x={15} y={0} width={1} height={16} fill="#000000" opacity={0.22} />
    </svg>
  );
}
