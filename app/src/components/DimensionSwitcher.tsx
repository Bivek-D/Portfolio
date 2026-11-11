import BlockIcon from '@/components/BlockIcon';
import DimLink from '@/components/DimLink';
import PixelBox from '@/components/nether/PixelBox';
import { DIMENSIONS, type DimId } from '@/lib/dimensions';

/** Glow colours for the selected block, per dimension. */
const THEME: Record<DimId, { outer: string; inner: string; fill: string; glow: string; ring: string }> = {
  nether: {
    outer: '#FF6A1A', inner: '#FF7A2A', fill: '#1A0604',
    glow: 'drop-shadow(0 0 7px rgba(255,90,26,0.95)) drop-shadow(0 0 20px rgba(255,90,26,0.5))',
    ring: 'drop-shadow(0 0 4px rgba(255,90,26,0.6))',
  },
  overworld: {
    outer: '#6BFF2E', inner: '#8CFF4A', fill: '#0E1A0A',
    glow: 'drop-shadow(0 0 7px rgba(92,255,42,0.95)) drop-shadow(0 0 20px rgba(92,255,42,0.5))',
    ring: 'drop-shadow(0 0 4px rgba(92,255,42,0.6))',
  },
  end: {
    outer: '#2FD3B6', inner: '#5CD6C0', fill: '#0B1A18',
    glow: 'drop-shadow(0 0 7px rgba(47,211,182,0.95)) drop-shadow(0 0 20px rgba(47,211,182,0.5))',
    ring: 'drop-shadow(0 0 4px rgba(47,211,182,0.6))',
  },
};

/** The three dimension blocks from the hero designs; the current one is bigger and glows in its colour. */
export default function DimensionSwitcher({ current, go }: { current: DimId; go: (d: DimId) => void }) {
  const t = THEME[current];
  return (
    <nav aria-label="Dimensions" className="flex items-center gap-4 sm:gap-[26px]">
      {DIMENSIONS.map((d) => {
        const on = d.id === current;
        return (
          <PixelBox
            key={d.id}
            as={DimLink}
            to={d.id}
            go={go}
            aria-label={`${d.name} — ${d.sub}`}
            aria-current={on ? 'page' : undefined}
            step={2}
            border={on ? t.outer : '#3C4458'}
            borderWidth={on ? 4 : 3}
            fill={on ? t.fill : '#0A0C12'}
            glow={on ? t.glow : 'drop-shadow(0 6px 7px rgba(0,0,0,0.7))'}
            className={`${on ? 'w-[96px] h-[96px]' : 'w-[82px] h-[82px] hover:brightness-125'} transition-[filter]`}
          >
            {on ? (
              <PixelBox step={1} border={t.inner} fill={t.fill} className="w-[76px] h-[76px]" glow={t.ring}>
                <BlockIcon type={d.block} size={66} />
              </PixelBox>
            ) : (
              <BlockIcon type={d.block} size={62} />
            )}
          </PixelBox>
        );
      })}
    </nav>
  );
}
