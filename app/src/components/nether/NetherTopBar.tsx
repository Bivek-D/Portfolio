import TopBar, { type TopBarLink, type TopBarTheme } from '@/components/TopBar';

/** Sections of the Nether page the bar jumps between (in page order). */
const LINKS: TopBarLink[] = [
  { id: 'top', label: 'HOME' },
  { id: 'showreel', label: 'SHOWREEL' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'reels', label: 'REELS' },
  { id: 'toolkit', label: 'TOOLKIT' },
];

const THEME: TopBarTheme = {
  brand: 'DAMEO',
  emblem: '#FF6A2A',
  emblemGlow: 'drop-shadow(0 0 5px rgba(255,90,26,0.7))',
  activeBorder: '#FF5A1A',
  activeFill: 'rgba(42,10,8,0.7)',
  activeText: '#FFA866',
  activeTextShadow: '0 0 8px rgba(255,106,26,0.5)',
  activeGlow: 'drop-shadow(0 0 5px rgba(255,90,26,0.9)) drop-shadow(0 0 14px rgba(255,90,26,0.35))',
  menuAccentText: '#FFA866',
  menuAccentFill: '#2a0a08',
};

export default function NetherTopBar() {
  return <TopBar links={LINKS} theme={THEME} />;
}
