import { useSyncExternalStore, type ReactNode } from 'react';
import PixelSprite from '@/components/nether/PixelSprite';
import BlockIcon from '@/components/BlockIcon';
import { item } from './items';

/** Minecraft GUI panel: black stepped outline, light grey face, white top-left and dark bottom-right bevel. */
export function McPanel({ className = '', children }: { className?: string; children: ReactNode }) {
  return (
    <div className={`mc-gui ${className}`}>
      <div className="mc-gui-face">{children}</div>
    </div>
  );
}

/** Inventory slot (sunken square). */
export function Slot({ className = '', selected, children }: { className?: string; selected?: boolean; children?: ReactNode }) {
  return <span className={`mc-slot ${selected ? 'is-selected' : ''} ${className}`}>{children}</span>;
}

/** An item sprite by key; 'grass' is the grass block. */
export function ItemIcon({ name, size = 48 }: { name: string; size?: number }) {
  if (name === 'grass') return <BlockIcon type="grass" size={Math.round(size * 0.92)} />;
  const it = item(name);
  return <PixelSprite rows={it.rows} palette={it.pal} cell={size / it.rows[0].length} />;
}

export interface TipLine {
  text: string;
  tone?: 'title' | 'gray' | 'blue' | 'gold' | 'green' | 'purple';
}

/** Minecraft item tooltip (dark box, purple border). Positioned by the caller. */
export function McTooltip({ id, lines, className = '' }: { id?: string; lines: TipLine[]; className?: string }) {
  return (
    <span id={id} role="tooltip" className={`mc-tooltip ${className}`}>
      {lines.map((l, i) => (
        <span key={i} className={`mc-tip-${l.tone ?? 'gray'}`}>{l.text}</span>
      ))}
    </span>
  );
}

/** Section heading with the hero's green glow (design o2/o3). */
export function OwTitle({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <span className="w-2.5 h-2.5 shrink-0 bg-[#6abe30] shadow-[0_0_10px_2px_rgba(92,255,42,0.95),0_0_24px_4px_rgba(92,255,42,0.4)]" />
      <h2 id={id} className="font-pixel text-base md:text-lg text-[#eaf6da] ow-glow-title whitespace-nowrap">{children}</h2>
      <div className="flex-1 h-[3px] bg-gradient-to-r from-[#6abe30]/70 to-transparent shadow-[0_0_8px_rgba(92,255,42,0.5)]" />
    </div>
  );
}

/** true on screens narrower than `px` (server render assumes a wide screen). */
export function useNarrow(px = 640) {
  return useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia(`(max-width: ${px - 0.02}px)`);
      m.addEventListener('change', cb);
      return () => m.removeEventListener('change', cb);
    },
    () => window.matchMedia(`(max-width: ${px - 0.02}px)`).matches,
    () => false,
  );
}
