import { useState, type FormEvent, type ReactNode } from 'react';
import PixelSprite from '@/components/nether/PixelSprite';
import DimLink from '@/components/DimLink';
import { ItemIcon, McTooltip } from '@/components/overworld/gui';
import { ADVANCEMENTS, CONTACT_EMAIL, GITHUB, LINKEDIN, NOW_BUILDING } from '@/data/end';
import { RESUME_URL } from '@/data/portfolio';
import type { DimId } from '@/lib/dimensions';

const ext = { target: '_blank', rel: 'noopener noreferrer' } as const;

function Header({ id, kicker, title, sub }: { id: string; kicker: string; title: string; sub?: string }) {
  return (
    <header className="flex flex-col items-center gap-3 text-center px-4 pb-10">
      <p className="end-kicker">{kicker}</p>
      <h2 id={id} className="end-h2">{title}</h2>
      {sub && <p className="font-pixelify text-[17px] leading-[25px] text-[#E6DDF0] max-w-[620px]">{sub}</p>}
    </header>
  );
}

/* ---------------- advancements: wins in a grid that grows ---------------- */

const TIER = { gold: 'challenge', silver: 'goal', teal: 'task' } as const;
const TIER_ICON = { gold: 'star', silver: 'star', teal: 'book' } as const;

export function EndWins() {
  const slots = Math.max(ADVANCEMENTS.length + 2, Math.ceil((ADVANCEMENTS.length + 1) / 6) * 6);
  return (
    <section id="wins" aria-labelledby="wins-title" className="end-section scroll-mt-20">
      <Header id="wins-title" kicker={`${ADVANCEMENTS.length} UNLOCKED · MORE TO COME`} title="ADVANCEMENTS"
        sub="Real prizes, a real internship and real photos. Hover a frame to see where it happened." />
      <div className="mc-gui max-w-[976px] mx-4 lg:mx-auto">
        <div className="mc-gui-face">
          <h3 className="mc-gui-title">Advancements</h3>
          <ul className="end-adv-grid">
            {Array.from({ length: slots }, (_, i) => {
              const a = ADVANCEMENTS[i];
              if (!a) {
                return (
                  <li key={i} className="end-adv">
                    <span className="end-adv-frame is-locked" aria-hidden><span className="end-adv-q">?</span></span>
                    <span className="end-adv-label text-[#8A8A92]">???</span>
                  </li>
                );
              }
              return (
                <li key={i} className="end-adv">
                  <button type="button" className={`end-adv-frame is-${TIER[a.tier]}`} aria-describedby={`adv-${i}`} aria-label={a.title}>
                    <span className={`end-adv-inner ${a.photo ? 'has-photo' : ''}`}>
                      {a.photo
                        ? <img src={`/end/wins/${a.photo}.webp`} alt="" loading="lazy" decoding="async" />
                        : <ItemIcon name={TIER_ICON[a.tier]} size={40} />}
                    </span>
                    <span id={`adv-${i}`} role="tooltip" className={`end-adv-tip ${i % 6 >= 3 ? 'is-left' : ''}`}>
                      <span className="end-adv-tip-bar">{a.title}</span>
                      <span className="end-adv-tip-body">
                        <span className="text-[#A970E0]">{a.kind}</span>
                        {a.photo && <img src={`/end/wins/${a.photo}.webp`} alt="" loading="lazy" decoding="async" />}
                        <span className="text-[#C8C8C8]">{a.desc}</span>
                      </span>
                    </span>
                  </button>
                  <span className="end-adv-label">{a.title}</span>
                </li>
              );
            })}
          </ul>
          <p className="end-adv-legend"><span>◆ Challenge = 1st prize</span><span>● Goal = podium</span><span>■ Task = milestone</span><span>? = still to unlock</span></p>
        </div>
      </div>
    </section>
  );
}

/* ---------------- still brewing: what I'm building now ---------------- */

const STAND = ['....##....', '....##....', '....##....', '..######..', '....##....', '.#..##..#.', '#...##...#', '##########'];
const POTION = ['...##...', '...##...', '..#..#..', '.#cccc#.', '#cccccc#', '#cCcccc#', '#cccccc#', '.######.'];
const BLAZE = ['..##..', '.####.', '######', '.####.', '..##..'];

export function EndBrewing() {
  const n = NOW_BUILDING;
  return (
    <section id="brewing" aria-labelledby="brewing-title" className="end-section scroll-mt-20">
      <Header id="brewing-title" kicker="NOW BUILDING" title="STILL BREWING" />
      <div className="mc-gui max-w-[820px] mx-4 md:mx-auto">
        <div className="mc-gui-face grid md:grid-cols-[300px_1fr] gap-6">
          <div className="flex flex-col items-center gap-3">
            <h3 className="mc-gui-title self-start">Brewing Stand</h3>
            <div className="flex items-start gap-6">
              <span className="mc-slot"><PixelSprite rows={BLAZE} palette={{ '#': '#F5B83D' }} cell={6} /></span>
              <span className="mc-slot is-selected font-pixelify font-semibold text-[15px] text-[#2A1640]">LLM</span>
              <span className="end-bubbles" aria-hidden><i /><i /><i /><i /></span>
            </div>
            <PixelSprite rows={STAND} palette={{ '#': '#5A5A62' }} cell={9} />
            <ul className="flex gap-3" aria-label="Evals">
              {n.evals.map((e) => (
                <li key={e.label} className="flex flex-col items-center gap-1 w-[84px] text-center">
                  <span className="mc-slot"><PixelSprite rows={POTION} palette={{ '#': '#2A2A2A', c: e.color, C: '#FFFFFF' }} cell={5} /></span>
                  <span className="font-pixelify text-[12px] leading-[15px] text-[#404040]">{e.label}</span>
                  <span className="font-pixelify font-semibold text-[12px] text-[#5A5A5A]">{e.value || 'brewing…'}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-3 justify-center">
            <h4 className="font-pixelify font-semibold text-[22px] text-[#2A2A2A]">{n.title}</h4>
            <p className="text-[15px] leading-[23px] text-[#404040]">{n.story}</p>
            <ul className="flex flex-wrap gap-1">
              {n.stack.map((s) => <li key={s} className="mc-slot !w-auto !h-auto px-3 py-1.5 font-pixelify font-semibold text-[13px] text-white">{s}</li>)}
            </ul>
            <p className="font-pixelify text-[13px] text-[#6A6A6A]">The potions show real eval scores once they're published.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- ender chest: contact ---------------- */

type Field = 'name' | 'email' | 'message';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ENDER = ['oooooooooooooo', 'owwwwwwwwwwwwo', 'owwwwwwwwwwwwo', 'odddddggdddddo', 'owwwwwggwwwwwo', 'owwwwwwwwwwwwo',
  'owwwwwwwwwwwwo', 'oddddddddddddo', 'oooooooooooooo'];
const ENDER_PAL = { o: '#05080A', w: '#1E3A3A', d: '#0E2424', g: '#2FD3B6' };

function ItemSlot({ icon, name, line, onClick, href }: { icon: ReactNode; name: string; line: string; onClick?: () => void; href?: string }) {
  const inner = (
    <>
      <span className="mc-slot">{icon}</span>
      <McTooltip lines={[{ text: name, tone: 'title' }, { text: line }]} className="tip-right" />
    </>
  );
  return href
    ? <a href={href} {...(href.startsWith('http') ? ext : {})} className="mc-slot-btn" aria-label={`${name}: ${line}`}>{inner}</a>
    : <button type="button" onClick={onClick} className="mc-slot-btn" aria-label={`${name}: ${line}`}>{inner}</button>;
}

export function EndChest() {
  const [v, setV] = useState({ name: '', email: '', message: '' });
  const [err, setErr] = useState<Partial<Record<Field, string>>>({});
  const [note, setNote] = useState('');

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setNote(`Copied ${CONTACT_EMAIL}`);
    } catch {
      window.location.href = `mailto:${CONTACT_EMAIL}`;
    }
  };
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next: typeof err = {};
    if (!v.name.trim()) next.name = 'Add your name';
    if (!EMAIL_RE.test(v.email.trim())) next.email = 'Enter a full email, like name@company.com';
    if (v.message.trim().length < 10) next.message = 'A few more words, please';
    setErr(next);
    if (Object.keys(next).length) return;
    const body = `${v.message.trim()}\n\n${v.name.trim()} · ${v.email.trim()}`;
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Hello from ${v.name.trim()}`)}&body=${encodeURIComponent(body)}`;
    setNote('Your mail app should open with the message ready to send.');
  };
  const field = (f: Field, label: string, ph: string, area = false) => {
    const Tag = area ? 'textarea' : 'input';
    return (
      <label className="flex flex-col gap-1">
        <span className="font-pixelify text-[14px] text-[#404040]">{label}</span>
        <Tag className={`end-mc-field ${area ? 'min-h-[96px] resize-y' : ''}`} placeholder={ph} name={f} value={v[f]}
          type={f === 'email' ? 'email' : undefined} aria-invalid={!!err[f]} aria-describedby={`chest-${f}`}
          autoComplete={f === 'message' ? 'off' : f}
          onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setV({ ...v, [f]: e.target.value })} />
        <span id={`chest-${f}`} className={`font-pixelify text-[12px] ${err[f] ? 'text-[#B02020]' : 'text-[#6A6A6A]'}`}>{err[f] ?? ' '}</span>
      </label>
    );
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className="end-section scroll-mt-20">
      <Header id="contact-title" kicker="OPEN TO PAID BACKEND AND AI INTERNSHIPS" title="DROP IT IN MY ENDER CHEST"
        sub="An ender chest opens from anywhere. So does my inbox." />
      <div className="max-w-[976px] mx-4 lg:mx-auto flex flex-col md:flex-row items-center md:items-start gap-6">
        <span className="end-ender shrink-0" aria-hidden><PixelSprite rows={ENDER} palette={ENDER_PAL} cell={13} /></span>
        <form noValidate onSubmit={submit} className="mc-gui w-full">
          <div className="mc-gui-face flex flex-col gap-3">
            <h3 className="mc-gui-title">Ender Chest</h3>
            <ul className="flex flex-wrap gap-1" aria-label="Ways to reach me">
              <li><ItemSlot icon={<ItemIcon name="paper" size={40} />} name="Email" line={`${CONTACT_EMAIL} · click to copy`} onClick={copyEmail} /></li>
              <li><ItemSlot icon={<ItemIcon name="book" size={40} />} name="LinkedIn" line="Bivek Daimary" href={LINKEDIN} /></li>
              <li><ItemSlot icon={<ItemIcon name="chest" size={40} />} name="GitHub" line="github.com/Bivek-D" href={GITHUB} /></li>
              <li><ItemSlot icon={<ItemIcon name="emerald" size={40} />} name="Résumé" line="Download PDF" href={RESUME_URL} /></li>
              {Array.from({ length: 5 }, (_, i) => <li key={i} className="hidden sm:block"><span className="mc-slot" /></li>)}
            </ul>
            <div className="grid sm:grid-cols-2 gap-x-4">
              {field('name', 'Your name', 'Ada from your company')}
              {field('email', 'Your email', 'you@company.com')}
            </div>
            {field('message', 'Message', "What you're building, what you need, when.", true)}
            <div className="flex flex-wrap items-center gap-4">
              <button type="submit" className="end-mc-btn is-teal">THROW PEARL · SEND  ›</button>
              <span className="font-pixelify text-[13px] text-[#5A5A5A]" role="status">{note || 'Lands straight in my inbox. No newsletter.'}</span>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

/* ---------------- credits ---------------- */

export function EndCredits({ go }: { go: (d: DimId) => void }) {
  const lines: [string, string][] = [
    ['Designed and built by Bivek Daimary', 'text-[#2FD3B6]'],
    ['Backend · Java · Spring Boot · PostgreSQL', 'text-white'],
    ['Next stop: AI engineering', 'text-white'],
    ['You climbed the tower, read the signs and opened the chests.', 'text-[#B3A3C6]'],
    ['That is more than most visitors do.', 'text-[#B3A3C6]'],
  ];
  return (
    <footer className="end-credits" aria-label="Credits">
      <img src="/end/dragon.webp" alt="" aria-hidden width={280} height={161} loading="lazy" className="end-credits-dragon pixelated" />
      <div className="relative max-w-[760px] mx-auto flex flex-col items-center gap-3 text-center px-4">
        <p className="end-h2 !text-white">THE END</p>
        {lines.map(([t, c], i) => <p key={t} className={`end-credit font-pixelify text-[18px] sm:text-[20px] leading-[30px] ${c}`} style={{ animationDelay: `${i * 0.25}s` }}>{t}</p>)}
        <p className="end-credit font-pixelify font-semibold text-[20px] text-[#F5B83D] mt-4" style={{ animationDelay: '1.4s' }}>THANKS FOR PLAYING</p>
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <DimLink to="overworld" go={go} className="end-mc-btn">←  RESPAWN IN THE OVERWORLD</DimLink>
          <DimLink to="nether" go={go} className="end-mc-btn">THE NETHER  →</DimLink>
        </div>
        <p className="font-pixel text-[8px] tracking-widest text-[#6A5A80] mt-10">
          DIMENSION PORTFOLIO v3 · © 2026 · <a href="#top" className="underline">BACK TO TOP</a>
        </p>
      </div>
    </footer>
  );
}
