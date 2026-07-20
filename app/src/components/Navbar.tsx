import { useState, type CSSProperties } from 'react';
import BlockIcon from './BlockIcon';
import { DIMENSIONS, type DimId } from '@/lib/dimensions';

interface Props {
  current: DimId;
  onSelect: (d: DimId) => void;
}

/**
 * Dimension navbar — three Minecraft block icons in hotbar-style slots,
 * permanently visible (PRD §5.1).
 *
 * Collapsed by default. Hovering a block slides text labels out on both
 * sides while the neighbouring slots spread apart — every motion is
 * transform + opacity only, no width/height animation. The active
 * dimension glows in its theme color.
 */
export default function Navbar({ current, onSelect }: Props) {
  const [hover, setHover] = useState<number | null>(null);

  const spreadVars: CSSProperties | undefined =
    hover !== null
      ? ({
          '--ml': `${DIMENSIONS[hover].moveLeft}px`,
          '--mr': `${DIMENSIONS[hover].moveRight}px`,
        } as CSSProperties)
      : undefined;

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex justify-center pt-4 px-4">
      <nav className="mc-navbar" aria-label="Dimension navigation" style={spreadVars}>
        {DIMENSIONS.map((d, i) => {
          const active = d.id === current;
          const cls = ['nav-slot'];
          if (hover !== null) {
            if (i < hover) cls.push('spread-left');
            else if (i > hover) cls.push('spread-right');
            else cls.push('hovered');
          }
          return (
            <div
              className={cls.join(' ')}
              key={d.id}
              style={{ '--dim-color': d.color, '--dim-glow': d.glow } as CSSProperties}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
            >
              <span className="nav-label nav-label-left" aria-hidden="true">
                {d.name}
              </span>
              <button
                type="button"
                className={`nav-btn${active ? ' active' : ''}`}
                aria-label={`Travel to ${d.name} — ${d.sub}`}
                aria-current={active ? 'page' : undefined}
                onClick={() => onSelect(d.id)}
                onFocus={() => setHover(i)}
                onBlur={() => setHover(null)}
              >
                <span className="block-icon-frame">
                  <BlockIcon type={d.block} size={40} />
                </span>
              </button>
              <span className="nav-label nav-label-right" aria-hidden="true">
                {d.sub}
              </span>
            </div>
          );
        })}
      </nav>
    </header>
  );
}
