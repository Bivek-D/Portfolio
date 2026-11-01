import { useMemo, useState } from 'react';
import PixelSprite from '@/components/nether/PixelSprite';
import { useReveal } from '@/lib/useReveal';
import { PROFILE } from '@/data/portfolio';
import { useNarrow } from './gui';
import { item } from './items';

/**
 * Split the About text into book pages: sentences flow onto the next page when one fills up (paragraph breaks are
 * kept), so pages come out evenly full whatever the bio says. `budget` is roughly characters per page.
 */
function paginate(text: string, budget = 330): string[] {
  const paras = text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  const pages: string[] = [];
  let cur: string[] = [];
  let para = '';
  let used = 0;
  const endPara = () => {
    if (para) cur.push(para);
    para = '';
  };
  for (const p of paras) {
    if (para || cur.length) {
      endPara();
      used += 40; // a paragraph gap costs about a line
    }
    for (const raw of p.match(/[^.!?]+[.!?]+["')\]]*\s*|[^.!?]+$/g) ?? [p]) {
      const s = raw.trim();
      if (!s) continue;
      if (used + s.length > budget && (para || cur.length)) {
        endPara();
        pages.push(cur.join('\n\n'));
        cur = [];
        used = 0;
      }
      para = para ? `${para} ${s}` : s;
      used += s.length + 1;
    }
  }
  endPara();
  if (cur.length) pages.push(cur.join('\n\n'));
  return pages;
}

const ARROW = item('arrow');
const QUILL = item('book_quill');

/**
 * About me as a Book & Quill (design o3 / prototype p4): closed until it scrolls into view, then the cover swings open
 * over the spine and the first spread fades in. Two pages at a time on wide screens, one on phones; the arrows turn
 * pages. The text comes from PROFILE.about, so editing the bio re-paginates the book.
 */
export default function AboutBook() {
  const pages = useMemo(() => paginate(PROFILE.about), []);
  const narrow = useNarrow(640);
  const per = narrow ? 1 : 2;
  const [first, setFirst] = useState(0);
  const start = Math.min(first - (first % per), Math.max(0, pages.length - 1));
  const { ref, open } = useReveal<HTMLDivElement>(0.35);
  const canPrev = start > 0;
  const canNext = start + per < pages.length;
  const turn = (d: number) => setFirst(Math.max(0, Math.min(pages.length - 1, start + d * per)));

  const page = (i: number, side: 'l' | 'r') => (
    <div className={`bk-paper bk-paper-${side}`}>
      <span className={`bk-pageno ${side === 'r' ? 'text-right' : ''}`}>{i < pages.length ? `Page ${i + 1} of ${pages.length}` : ''}</span>
      <div key={`${start}-${i}`} className="bk-text">
        {i < pages.length && pages[i].split('\n\n').map((p, k) => <p key={k}>{p}</p>)}
      </div>
    </div>
  );

  return (
    <div ref={ref} className="ow-book" data-open={open || undefined} data-single={narrow || undefined}>
      <div className="bk-stage">
        {/* right half: back cover + right page (the only page on phones) */}
        <div className="bk-back" aria-hidden />
        <div className="bk-right">{page(narrow ? start : start + 1, 'r')}</div>
        {/* left page (fades in once the cover has swung over) */}
        {!narrow && <div className="bk-left">{page(start, 'l')}</div>}
        <div className="bk-gutter" aria-hidden />
        {/* front cover: swings open around the spine */}
        <div className="bk-cover" aria-hidden>
          <div className="bk-cover-front">
            <span className="bk-stitch" />
            <PixelSprite rows={QUILL.rows} palette={QUILL.pal} cell={6} />
            <span className="font-pixelify font-bold text-[30px] tracking-[0.08em] text-[#F0C860] [text-shadow:3px_3px_0_#2A1408,0_0_10px_rgba(240,200,96,0.4)]">
              ABOUT ME
            </span>
            <span className="font-pixelify text-[14px] text-[#E8D2A8]">by Bivek</span>
            <span className="bk-hint">SCROLL TO OPEN</span>
          </div>
          <div className="bk-cover-inside" />
        </div>
        <span className="bk-ribbon" aria-hidden />
        {/* page controls */}
        <div className="bk-controls">
          <button type="button" className="bk-turn bk-prev" onClick={() => turn(-1)} disabled={!canPrev} aria-label="Previous page">
            <PixelSprite rows={ARROW.rows} palette={ARROW.pal} cell={3} />
          </button>
          <span className="bk-sign">— Bivek · {PROFILE.location.replace(' · ', ', ')}</span>
          <button type="button" className="bk-turn" onClick={() => turn(1)} disabled={!canNext} aria-label="Next page">
            {canNext && <span className="bk-turn-hint">click to turn</span>}
            <PixelSprite rows={ARROW.rows} palette={ARROW.pal} cell={3} />
          </button>
        </div>
      </div>
    </div>
  );
}
