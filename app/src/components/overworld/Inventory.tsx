import { useState } from 'react';
import { INTERESTS, PROFILE } from '@/data/portfolio';
import { ItemIcon, McPanel, McTooltip, Slot } from './gui';

const COLS = 4;

/**
 * Inventory screen (design o3): avatar well, name / aka / spawn point, OPEN TO WORK, then the interests as items in
 * slots. Slots fill four per row and always end on a full row (empty slots pad it out), so any number of interests
 * fits. Hover, focus or tap an item for its tooltip.
 */
export default function Inventory() {
  const [tapped, setTapped] = useState<number | null>(null);
  const slots = Math.max(8, Math.ceil(INTERESTS.length / COLS) * COLS);
  return (
    <McPanel className="ow-inventory">
      <h3 className="mc-gui-title">Inventory</h3>
      <div className="flex gap-4">
        <div className="mc-well w-[128px] h-[172px] shrink-0">
          <img src="/overworld/character.webp" alt="Bivek's blocky avatar" width={93} height={172}
            className="h-[150px] w-auto mx-auto mt-[10px] [image-rendering:auto]" loading="lazy" decoding="async" />
        </div>
        <div className="flex flex-col pt-1 min-w-0">
          <span className="font-pixelify font-semibold text-[17px] text-[#404040]">{PROFILE.name.charAt(0) + PROFILE.name.slice(1).toLowerCase()}</span>
          <span className="font-pixelify text-[14px] text-[#6a6a6a]">aka Dameo</span>
          <span className="font-pixelify text-[14px] text-[#6a6a6a] mt-3 leading-[18px]">
            {PROFILE.location.split(' · ').map((l) => <span key={l} className="block">{l}</span>)}
          </span>
          <span className="mt-auto mb-1 inline-flex items-center gap-2 self-start bg-[#1E3A12] px-2.5 py-1.5">
            <span className="w-2 h-2 bg-[#5CFF2A] shadow-[0_0_6px_rgba(92,255,42,0.7)]" />
            <span className="font-pixelify text-[14px] text-[#B8FF8A]">{PROFILE.status}</span>
          </span>
        </div>
      </div>
      <h3 className="mc-gui-title mt-5">Interests</h3>
      <ul className="grid grid-cols-4 gap-1 mt-2 w-max">
        {Array.from({ length: slots }, (_, i) => {
          const it = INTERESTS[i];
          if (!it) return <li key={i}><Slot /></li>;
          const tipId = `interest-tip-${i}`;
          const lastCol = i % COLS === COLS - 1 || i % COLS === COLS - 2;
          return (
            <li key={i} className="relative">
              <button type="button" className="mc-slot-btn group" aria-label={it.label} aria-describedby={tipId}
                data-tip={tapped === i || undefined}
                onClick={() => setTapped((t) => (t === i ? null : i))} onBlur={() => setTapped(null)}>
                <Slot><ItemIcon name={it.item} size={44} /></Slot>
                <McTooltip id={tipId} className={lastCol ? 'tip-left' : 'tip-right'}
                  lines={[{ text: it.label, tone: 'title' }, ...(it.note ? [{ text: it.note }] : []), { text: 'Interest', tone: 'blue' }]} />
              </button>
            </li>
          );
        })}
      </ul>
      <p className="font-pixelify text-[14px] text-[#6a6a6a] mt-3">Hover an item to inspect it</p>
    </McPanel>
  );
}
