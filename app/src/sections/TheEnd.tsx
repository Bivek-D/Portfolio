import TopBar, { type TopBarLink, type TopBarTheme } from '@/components/TopBar';
import EndHero from '@/components/end/x1/EndHero';
import EndTower from '@/components/end/x1/EndTower';
import { EndBrewing, EndChest, EndCredits, EndWins } from '@/components/end/x1/EndParts';
import type { DimId } from '@/lib/dimensions';

/** Sections of the End page the top bar jumps between (in page order). */
const LINKS: TopBarLink[] = [
  { id: 'top', label: 'HOME' },
  { id: 'tower', label: 'TOWER' },
  { id: 'wins', label: 'WINS' },
  { id: 'brewing', label: 'NOW' },
  { id: 'contact', label: 'CONTACT' },
];

const THEME: TopBarTheme = {
  brand: 'BIVEK',
  emblem: '#2FD3B6',
  emblemGlow: 'drop-shadow(0 0 5px rgba(47,211,182,0.7))',
  activeBorder: '#5CD6C0',
  activeFill: 'rgba(17,69,60,0.55)',
  activeText: '#C6F1E9',
  activeTextShadow: '0 0 8px rgba(47,211,182,0.5)',
  activeGlow: 'drop-shadow(0 0 5px rgba(47,211,182,0.8)) drop-shadow(0 0 14px rgba(47,211,182,0.3))',
  menuAccentText: '#70DBC8',
  menuAccentFill: '#11453C',
};

/**
 * The End — development & projects (design x1, "climb the tower"): BACKEND hero with the live JFJ beacon,
 * projects as floors of an End City tower, advancements, what's brewing now, ender chest contact, credits.
 */
export default function TheEnd({ go }: { go: (d: DimId) => void }) {
  return (
    <div className="end-page relative overflow-x-clip">
      <TopBar links={LINKS} theme={THEME} />
      <EndHero go={go} />
      <EndTower />
      <EndWins />
      <EndBrewing />
      <EndChest />
      <EndCredits go={go} />
    </div>
  );
}
