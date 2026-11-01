import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { SKILLS, type Skill } from '@/data/portfolio';
import { ItemIcon, McPanel } from './gui';

const GROUPS: { id: Skill['group']; label: string }[] = [
  { id: 'dev', label: 'DEVELOPMENT' },
  { id: 'edit', label: 'EDITING & POST' },
];
const COL = 140;   // px between tree columns
const ROW = 112;   // px between rows
const PAD_X = 64;
const PAD_Y = 74;

interface Placed {
  skill: Skill;
  x: number;
  y: number;
  depth: number;
}

/**
 * Tidy-tree layout from `parent`: columns = depth, leaves get their own rows, a parent sits centred on its children.
 * Skills whose parent is missing (or in another group) start their own root. Works for any number of skills.
 */
function layoutTree(skills: Skill[]) {
  const names = new Set(skills.map((s) => s.name));
  const kids = new Map<string, Skill[]>();
  for (const s of skills) {
    if (s.parent && names.has(s.parent) && s.parent !== s.name) {
      kids.set(s.parent, [...(kids.get(s.parent) ?? []), s]);
    }
  }
  const roots = skills.filter((s) => !s.parent || !names.has(s.parent) || s.parent === s.name);
  const rowOf = new Map<string, { row: number; depth: number }>();
  let next = 0;
  const seen = new Set<string>();
  const place = (s: Skill, depth: number): number => {
    if (seen.has(s.name)) return rowOf.get(s.name)?.row ?? next;
    seen.add(s.name);
    const ch = (kids.get(s.name) ?? []).filter((k) => !seen.has(k.name));
    let row: number;
    if (!ch.length) row = next++;
    else {
      const rows = ch.map((k) => place(k, depth + 1));
      row = (Math.min(...rows) + Math.max(...rows)) / 2;
    }
    rowOf.set(s.name, { row, depth });
    return row;
  };
  roots.forEach((r) => place(r, 0));
  // anything left (a cycle with no root) becomes its own root
  skills.filter((s) => !seen.has(s.name)).forEach((s) => place(s, 0));

  const placed: Placed[] = skills.map((s) => {
    const p = rowOf.get(s.name)!;
    return { skill: s, depth: p.depth, x: PAD_X + p.depth * COL, y: PAD_Y + p.row * ROW };
  });
  const cols = Math.max(1, ...placed.map((p) => p.depth + 1));
  const rows = Math.max(1, next);
  const edges = skills
    .filter((s) => s.parent && names.has(s.parent) && s.parent !== s.name)
    .map((s) => [placed.find((p) => p.skill.name === s.parent)!, placed.find((p) => p.skill === s)!] as const);
  return { placed, edges, width: PAD_X * 2 + (cols - 1) * COL, height: PAD_Y + (rows - 1) * ROW + 86, cols };
}

function tier(level: number) {
  return level >= 9 ? 'challenge' : level === 8 ? 'goal' : 'task';
}

function Group({ label, skills, last, avail }: { label: string; skills: Skill[]; last: boolean; avail: number }) {
  const t = layoutTree(skills);
  // shrink a tree that is wider than the panel (phones), down to 60%; past that the panel scrolls
  const k = Math.max(0.6, Math.min(1, (avail - 4) / t.width));
  return (
    <div className="adv-group" style={{ minWidth: t.width * k, height: t.height * k }}>
      <span className="adv-group-label">{label}</span>
      <div className="adv-tree" style={{ width: t.width, height: t.height, transform: k < 1 ? `scale(${k})` : undefined, transformOrigin: 'top center', marginInline: k < 1 ? (t.width * (k - 1)) / 2 : undefined }}>
      <svg className="absolute inset-0 pointer-events-none" width={t.width} height={t.height} aria-hidden>
        {[{ w: 8, c: '#000' }, { w: 3, c: '#fff' }].map(({ w, c }) =>
          t.edges.map(([a, b]) => {
            const mx = (a.x + b.x) / 2;
            return (
              <path key={`${w}-${a.skill.name}-${b.skill.name}`} d={`M${a.x} ${a.y}H${mx}V${b.y}H${b.x}`}
                fill="none" stroke={c} strokeWidth={w} strokeLinejoin="miter" strokeLinecap="square" />
            );
          }),
        )}
      </svg>
      <ul>
        {t.placed.map((p) => {
          const tr = tier(p.skill.level);
          // open the tooltip leftwards where it would run past the right edge of the panel
          const flip = last ? p.x + 270 > t.width : false;
          return (
            <li key={p.skill.name} className="adv-node" style={{ left: p.x, top: p.y }}>
              <button type="button" className={`adv-frame adv-${tr}`}
                aria-label={`${p.skill.name}, level ${p.skill.level} of 10`}>
                <span className="adv-face px-clip"><span className="adv-inner px-clip"><ItemIcon name={p.skill.icon ?? 'book'} size={36} /></span></span>
                <span className={`adv-tip ${flip ? 'adv-tip-left' : ''}`} role="tooltip">
                  <span className="adv-tip-bar">{p.skill.name}</span>
                  <span className="adv-tip-body">
                    <span className="text-[#A970E0]">
                      {tr === 'challenge' ? 'Challenge complete!' : tr === 'goal' ? 'Goal reached!' : 'Advancement made!'} · LVL {p.skill.level}
                    </span>
                    <span className="flex gap-[3px] mt-2" aria-hidden>
                      {Array.from({ length: 10 }, (_, i) => (
                        <span key={i} className={`adv-xp ${i < p.skill.level ? 'on' : ''}`} />
                      ))}
                    </span>
                  </span>
                </span>
              </button>
              <span className="adv-label">{p.skill.name}</span>
              <span className="adv-level">LVL {p.skill.level}</span>
            </li>
          );
        })}
      </ul>
      </div>
    </div>
  );
}

/** Drag to pan when the trees are wider than the panel (like the game's advancement screen). */
function useDragScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; left: number } | null>(null);
  return {
    ref,
    onPointerDown: (e: PointerEvent<HTMLDivElement>) => {
      if (e.pointerType !== 'mouse' || !ref.current || ref.current.scrollWidth <= ref.current.clientWidth) return;
      if ((e.target as HTMLElement).closest('button')) return;
      drag.current = { x: e.clientX, left: ref.current.scrollLeft };
      ref.current.setPointerCapture?.(e.pointerId);
    },
    onPointerMove: (e: PointerEvent<HTMLDivElement>) => {
      if (drag.current && ref.current) ref.current.scrollLeft = drag.current.left - (e.clientX - drag.current.x);
    },
    onPointerUp: () => {
      drag.current = null;
    },
  };
}

/**
 * Skill tree as the Minecraft advancements screen (design o3). Each group is its own tree laid out from the data;
 * the frame shape shows the level (spiked 9+, rounded 8, square 7 and below). Hover or focus a skill for the gold
 * title bar and its XP bar.
 */
export default function Advancements() {
  const pan = useDragScroll();
  const [avail, setAvail] = useState(9999);
  useEffect(() => {
    const el = pan.ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setAvail(el.clientWidth));
    ro.observe(el);
    return () => ro.disconnect();
  }, [pan.ref]);
  return (
    <McPanel className="ow-adv">
      <h3 className="mc-gui-title">Advancements</h3>
      <div className="adv-viewport" {...pan}>
        <div className="adv-groups">
          {GROUPS.filter((g) => SKILLS.some((s) => s.group === g.id)).map((g, i, all) => (
            <Group key={g.id} label={g.label} skills={SKILLS.filter((s) => s.group === g.id)} last={i === all.length - 1} avail={avail} />
          ))}
        </div>
      </div>
      <p className="adv-legend">
        <span>◆ Challenge = LVL 9+</span><span>● Goal = LVL 8</span><span>■ Task = LVL 7 and below</span>
      </p>
    </McPanel>
  );
}
