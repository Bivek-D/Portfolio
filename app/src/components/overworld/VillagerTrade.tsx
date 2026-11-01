import { useState, type ReactNode } from 'react';
import PixelSprite from '@/components/nether/PixelSprite';
import BlockIcon from '@/components/BlockIcon';
import { RESUME_URL, SOCIALS, type Social } from '@/data/portfolio';
import { ItemIcon, McPanel, Slot } from './gui';
import { item } from './items';

const SOCIAL_PATHS: Record<Social['icon'], string> = {
  github:
    'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12',
  linkedin:
    'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z',
  youtube:
    'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
  discord:
    'M18.59 5.89c-1.23-.57-2.54-.99-3.92-1.23c-.17.3-.37.71-.5 1.04c-1.46-.22-2.91-.22-4.34 0c-.14-.33-.34-.74-.51-1.04c-1.38.24-2.69.66-3.92 1.23c-2.48 3.74-3.15 7.39-2.82 10.98c1.65 1.23 3.24 1.97 4.81 2.46c.39-.53.73-1.1 1.03-1.69c-.57-.21-1.11-.48-1.62-.79c.14-.1.28-.21.42-.32c2.81 1.28 5.82 1.28 8.62 0c.14.11.28.22.42.32c-.51.31-1.05.58-1.62.79c.3.59.64 1.16 1.03 1.69c1.57-.49 3.16-1.23 4.81-2.46c.33-3.59-.34-7.24-2.82-10.98zM9.5 13.52c-1.05 0-1.92-.95-1.92-2.12s.84-2.12 1.92-2.12c1.09 0 1.94.97 1.92 2.12c0 1.17-.84 2.12-1.92 2.12zm5 0c-1.05 0-1.92-.95-1.92-2.12s.84-2.12 1.92-2.12c1.09 0 1.94.97 1.92 2.12c0 1.17-.84 2.12-1.92 2.12z',
};
const SOCIAL_COLOR: Record<Social['icon'], string> = {
  github: '#F0F0F0', linkedin: '#0A66C2', youtube: '#FF2A2A', discord: '#5865F2',
};

interface Trade {
  name: string;
  result: string;          // shown under the result slot
  href: string;
  download?: boolean;
  icon: (size: number) => ReactNode;
}

const TRADES: Trade[] = [
  { name: 'Résumé', result: 'Résumé.pdf', href: RESUME_URL, download: true, icon: (s) => <ItemIcon name="paper" size={s} /> },
  ...SOCIALS.map((s): Trade => ({
    name: s.name,
    result: s.name,
    href: s.url.startsWith('http') ? s.url : `https://${s.url}`,
    icon: (size) => (
      <svg width={size * 0.62} height={size * 0.62} viewBox="0 0 24 24" fill={SOCIAL_COLOR[s.icon]} aria-hidden>
        <path d={SOCIAL_PATHS[s.icon]} />
      </svg>
    ),
  })),
];

const EMERALD = item('emerald');
const ARROW = item('arrow');

/**
 * Contact as a villager trade (design o3): pick a trade on the left (one emerald for the résumé or a social link),
 * the right side shows the deal, TRADE opens it. Every SOCIALS entry becomes a trade automatically.
 */
export default function VillagerTrade() {
  const [sel, setSel] = useState(0);
  const t = TRADES[sel];
  return (
    <div className="ow-trade-row">
      <McPanel className="ow-trade">
        <div className="trade-list">
          <h3 className="mc-gui-title">Trades</h3>
          <ul className="flex flex-col gap-2 mt-2" role="listbox" aria-label="Trades">
            {TRADES.map((tr, i) => (
              <li key={tr.name}>
                <button type="button" role="option" aria-selected={i === sel} onClick={() => setSel(i)}
                  className={`trade-btn ${i === sel ? 'is-on' : ''}`} aria-label={`Trade one emerald for ${tr.name}`}>
                  <span className="relative">
                    <PixelSprite rows={EMERALD.rows} palette={EMERALD.pal} cell={3} />
                    <span className="trade-count">1</span>
                  </span>
                  <PixelSprite rows={ARROW.rows} palette={ARROW.pal} cell={2.2} />
                  <span className="grid place-items-center w-9 h-9">{tr.icon(36)}</span>
                  <span className="trade-name">{tr.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="trade-main">
          <h3 className="mc-gui-title text-center">Bivek — Master Builder</h3>
          <span className="trade-xp" aria-hidden><span /></span>
          <p className="mc-gui-title text-center mt-4 !text-[#404040]">Trade: {t.name}</p>
          <div className="flex items-center justify-center gap-3 mt-5 max-sm:scale-[0.8] max-sm:-my-2" aria-hidden>
            <Slot className="!w-[72px] !h-[72px] relative">
              <PixelSprite rows={EMERALD.rows} palette={EMERALD.pal} cell={4.5} />
              <span className="trade-count !right-1.5 !bottom-1">1</span>
            </Slot>
            <Slot className="!w-[72px] !h-[72px]" />
            <PixelSprite rows={ARROW.rows} palette={ARROW.pal} cell={5} />
            <Slot selected className="!w-[84px] !h-[84px]">{t.icon(60)}</Slot>
          </div>
          <p className="font-pixelify font-semibold text-[17px] text-[#404040] text-center mt-2">{t.result}</p>
          <p className="font-pixelify text-[16px] leading-[20px] text-[#4a4a4a] text-center mt-3 max-w-[420px] mx-auto">
            Grab the résumé, check the repos, or send a message — the portal is always open.
          </p>
          <a className="trade-go" href={t.href} {...(t.download ? { download: '' } : { target: '_blank', rel: 'noopener noreferrer' })}>
            TRADE ›
          </a>
        </div>
      </McPanel>
      <div className="trade-villager" aria-hidden>
        <span className="trade-bubble">Hrmm! Let's trade.</span>
        <img src="/overworld/character.webp" alt="" width={124} height={230} loading="lazy" decoding="async" className="trade-char" />
        <span className="trade-block"><BlockIcon type="grass" size={110} /></span>
      </div>
    </div>
  );
}
