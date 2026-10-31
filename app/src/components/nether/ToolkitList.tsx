import { useState, type MouseEvent } from 'react';

interface Tool {
  name: string;
  level: number;
  note: string;
  perks?: string[];
}

const rarity = (lvl: number) =>
  lvl >= 9 ? { color: '#FF55FF', name: 'EPIC' } : lvl >= 8 ? { color: '#55FFFF', name: 'RARE' } : { color: '#FFFF55', name: 'UNCOMMON' };

/** Software toolkit with Minecraft item tooltips (prototype p1): they follow the pointer, or sit by the name on focus. */
export default function ToolkitList({ tools }: { tools: Tool[] }) {
  const [tip, setTip] = useState<{ i: number; x: number; y: number } | null>(null);

  const move = (i: number) => (e: MouseEvent<HTMLLIElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    // follow the pointer, but keep the tooltip inside the card on narrow screens
    setTip({ i, x: Math.max(0, Math.min(e.clientX - r.left + 18, r.width - 230)), y: e.clientY - r.top - 12 });
  };

  return (
    <ul className="flex flex-col gap-5">
      {tools.map((s, i) => {
        const rar = rarity(s.level);
        const shown = tip?.i === i;
        return (
          <li
            key={s.name}
            className="relative"
            onMouseMove={move(i)}
            onMouseLeave={() => setTip(null)}
          >
            <div className="flex items-center justify-between mb-1">
              <span
                tabIndex={0}
                aria-describedby={`tool-tip-${i}`}
                onFocus={(e) => setTip({ i, x: Math.min(160, (e.currentTarget.closest('li')?.clientWidth ?? 400) - 230), y: 26 })}
                onBlur={() => setTip(null)}
                className="text-sm font-semibold text-[#ffd4b8] outline-none focus-visible:underline decoration-[#FF55FF] underline-offset-4 cursor-help"
              >
                {s.name}
              </span>
              <span className="font-pixel text-[8px] text-[#f27b1a]">LVL {s.level}</span>
            </div>
            <p className="text-xs text-[#c9a88e]/60 mb-2 italic">{s.note}</p>
            <div className="flex gap-[3px]" role="img" aria-label={`${s.name}: level ${s.level} out of 10`}>
              {Array.from({ length: 10 }, (_, k) => (
                <span key={k} className={`nether-skill-seg${k < s.level ? ' on' : ''}`} />
              ))}
            </div>

            {/* Minecraft-style tooltip: near-black box, purple double border, rarity-coloured name */}
            <div
              id={`tool-tip-${i}`}
              role="tooltip"
              className={`absolute z-20 pointer-events-none min-w-[220px] px-3.5 pt-3 pb-3.5 bg-[#100010]/95 outline outline-2 outline-black shadow-[inset_0_0_0_2px_#5000FF,0_10px_24px_rgba(0,0,0,0.7)] font-pixelify text-[15px] leading-[21px] ${shown ? 'block' : 'hidden'}`}
              style={shown ? { left: tip!.x, top: tip!.y } : undefined}
            >
              <p className="font-semibold text-[16px]" style={{ color: rar.color, textShadow: '2px 2px 0 #3F3F3F' }}>{s.name}</p>
              <p className="text-[#AAAAAA] [text-shadow:1px_1px_0_#2A2A2A]">{s.note}</p>
              {(s.perks ?? []).map((p) => (
                <p key={p} className="text-[#AAAAAA] [text-shadow:1px_1px_0_#2A2A2A]">{p}</p>
              ))}
              <p className="text-[#5555FF] [text-shadow:1px_1px_0_#15153F]">LVL {s.level} · {rar.name}</p>
              <p className="text-[#555555]">dameo:{s.name.toLowerCase().replace(/ /g, '_')}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
