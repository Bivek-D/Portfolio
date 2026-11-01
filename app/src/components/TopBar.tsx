import { useEffect, useRef, useState, type MouseEvent } from 'react';
import PixelBox from '@/components/nether/PixelBox';
import PixelSprite, { SPRITES } from '@/components/nether/PixelSprite';
import { useMotionSetting } from '@/lib/motion-setting';

export interface TopBarLink {
  id: string;
  label: string;
}

export interface TopBarTheme {
  brand: string;                // wordmark text
  emblem: string;               // emblem colour
  emblemGlow: string;
  activeBorder: string;
  activeFill: string;
  activeText: string;
  activeTextShadow: string;
  activeGlow: string;           // CSS drop-shadow chain
  menuAccentText: string;       // active item in the phone menu, motion ON
  menuAccentFill: string;
}

/** The section whose top has passed 40% of the screen height. */
function useActiveSection(links: TopBarLink[]) {
  const [active, setActive] = useState(links[0]?.id ?? 'top');
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const line = window.innerHeight * 0.4;
      let cur = links[0]?.id ?? 'top';
      for (const l of links) {
        const el = document.getElementById(l.id);
        if (el && el.getBoundingClientRect().top <= line) cur = l.id;
      }
      setActive(cur);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [links]);
  return active;
}

/**
 * Floating top bar: glassy and almost invisible over the hero, a little more solid once you scroll so it stays
 * readable over the content. Its links move between the sections of the current dimension; dimensions switch from
 * the hero blocks.
 */
export default function TopBar({ links, theme }: { links: TopBarLink[]; theme: TopBarTheme }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [motionOn, setMotion] = useMotionSetting();
  const active = useActiveSection(links);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 120);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const close = (e: globalThis.MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent ? e.key === 'Escape' : !menuRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', close);
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('keydown', close);
    };
  }, [open]);

  const top = links[0]?.id ?? 'top';
  const jump = (id: string) => (e: MouseEvent<HTMLAnchorElement>) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    setOpen(false);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches || !motionOn;
    window.scrollTo({ top: id === top ? 0 : el.getBoundingClientRect().top + window.scrollY - 100, behavior: reduce ? 'auto' : 'smooth' });
    history.replaceState(null, '', id === top ? location.pathname : `#${id}`);
  };

  return (
    <header className="fixed top-2 inset-x-0 z-50 flex justify-center px-3 pointer-events-none">
      <PixelBox
        step={3}
        border={scrolled ? 'rgba(60,48,84,0.7)' : 'rgba(255,255,255,0.10)'}
        borderWidth={1}
        fill={scrolled ? 'rgba(14,10,20,0.62)' : 'rgba(14,10,20,0.18)'}
        blur={scrolled ? 14 : 6}
        glow={scrolled ? 'drop-shadow(0 8px 12px rgba(0,0,0,0.45))' : undefined}
        className="pointer-events-auto w-full max-w-[1010px] h-[60px] transition-[filter] duration-300"
        innerClassName="!justify-between px-4 md:pl-[22px] md:pr-[26px]"
      >
        <a href={`#${top}`} onClick={jump(top)} className="flex items-center gap-4 lg:w-[200px]" aria-label={`${theme.brand} — back to top`}>
          <PixelSprite rows={SPRITES.emblem} palette={{ '#': theme.emblem }} cell={3} style={{ filter: theme.emblemGlow }} />
          <span className="font-pixel text-[20px] leading-none text-white [text-shadow:3px_3px_0_#000,0_0_10px_rgba(255,255,255,0.2)]">
            {theme.brand}
          </span>
        </a>

        <nav aria-label="Page sections" className="hidden md:flex items-center gap-3 lg:gap-5">
          {links.map((l) =>
            l.id === active ? (
              <PixelBox key={l.id} as="a" href={`#${l.id}`} onClick={jump(l.id)} aria-current="location"
                step={2} border={theme.activeBorder} fill={theme.activeFill} glow={theme.activeGlow}
                className="inline-flex h-[36px]" innerClassName="px-4">
                <span className="font-pixelify font-semibold text-[15px] tracking-[0.06em]"
                  style={{ color: theme.activeText, textShadow: theme.activeTextShadow }}>
                  {l.label}
                </span>
              </PixelBox>
            ) : (
              <a key={l.id} href={`#${l.id}`} onClick={jump(l.id)}
                className="font-pixelify text-[15px] tracking-[0.06em] text-[#F1E4DA] hover:text-white [text-shadow:1px_1px_0_#000,0_0_6px_rgba(0,0,0,0.8)] px-2 py-2">
                {l.label}
              </a>
            ),
          )}
        </nav>

        <div ref={menuRef} className="relative flex lg:w-[200px] justify-end">
          <PixelBox as="button" type="button" aria-label="Menu and settings" aria-expanded={open}
            onClick={() => setOpen((o) => !o)} step={2} border="rgba(142,138,156,0.85)" fill="rgba(12,10,18,0.55)"
            className="w-[42px] h-[42px] hover:brightness-125">
            <PixelSprite rows={SPRITES.gear} palette={{ '#': '#E6E2EA' }} cell={2.2} />
          </PixelBox>
          {open && (
            <PixelBox step={2} border="#5C5A6C" fill="rgba(20,18,27,0.96)" glow="drop-shadow(0 10px 14px rgba(0,0,0,0.7))"
              className="absolute right-0 top-[52px] w-[230px]" innerClassName="!flex-col !items-stretch px-4 py-3 gap-3">
              {/* phones: the section links live in this menu */}
              <nav aria-label="Page sections" className="md:hidden flex flex-col gap-1 pb-3 border-b-2 border-[#2C2440]">
                {links.map((l) => (
                  <a key={l.id} href={`#${l.id}`} onClick={jump(l.id)}
                    className="font-pixelify text-[16px] tracking-[0.06em] py-1"
                    style={{ color: l.id === active ? theme.menuAccentText : '#F1E4DA' }}>
                    {l.id === active ? '▸ ' : ''}{l.label}
                  </a>
                ))}
              </nav>
              <div className="flex items-center justify-between">
                <span className="font-pixelify text-[15px] text-[#F1E4DA]">Motion</span>
                <button type="button" role="switch" aria-checked={motionOn} onClick={() => setMotion(!motionOn)}
                  className="font-pixelify font-semibold text-[13px] px-3 py-1 border-2"
                  style={motionOn
                    ? { borderColor: theme.activeBorder, color: theme.menuAccentText, background: theme.menuAccentFill }
                    : { borderColor: '#5C5A6C', color: '#CDBDB4' }}>
                  {motionOn ? 'ON' : 'OFF'}
                </button>
              </div>
            </PixelBox>
          )}
        </div>
      </PixelBox>
    </header>
  );
}
