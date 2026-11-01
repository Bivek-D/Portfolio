import { useMemo, useState, type CSSProperties } from 'react';
import { TIMELINE } from '@/data/portfolio';
import { MAP_SIZE, TRAIL } from '@/data/journey-trail';
import { useReveal } from '@/lib/useReveal';

type Pt = [number, number];

/** Catmull-Rom through the trail points (same curve the map's land was shaped along). */
function sampleTrail(pts: Pt[], per = 40): Pt[] {
  const p = [pts[0], ...pts, pts[pts.length - 1]];
  const out: Pt[] = [];
  for (let i = 1; i < p.length - 2; i++) {
    const [p0, p1, p2, p3] = [p[i - 1], p[i], p[i + 1], p[i + 2]];
    for (let s = 0; s < per; s++) {
      const t = s / per;
      const f = (a: number, b: number, c: number, d: number) =>
        0.5 * (2 * b + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t * t + (-a + 3 * b - 3 * c + d) * t ** 3);
      out.push([f(p0[0], p1[0], p2[0], p3[0]), f(p0[1], p1[1], p2[1], p3[1])]);
    }
  }
  out.push(pts[pts.length - 1]);
  return out;
}

/** Point at fraction `f` (0..1) of the curve's length, plus the polyline up to there. */
function along(curve: Pt[], cum: number[], f: number): { pt: Pt; idx: number } {
  const target = f * cum[cum.length - 1];
  const i = cum.findIndex((c) => c >= target);
  if (i <= 0) return { pt: curve[0], idx: 0 };
  const t = (target - cum[i - 1]) / (cum[i] - cum[i - 1] || 1);
  return { pt: [curve[i - 1][0] + (curve[i][0] - curve[i - 1][0]) * t, curve[i - 1][1] + (curve[i][1] - curve[i - 1][1]) * t], idx: i };
}

const START = 0.05;
const END = 0.82;       // the rest of the trail is "the road ahead"

/**
 * Journey Log as a map on a scroll (design o3, prototype p4/p4b): two wooden rods, rolled up until the section
 * scrolls into view, then they spread to both sides and the map unrolls from the centre. Stops come from TIMELINE
 * (oldest first) and are spaced evenly along the trail, so adding a year just adds a pin — the art never changes.
 * Each stop is a round photo pin; hover, focus or tap it for the story. The latest stop is YOU ARE HERE.
 */
export default function JourneyMap() {
  const { ref, open } = useReveal<HTMLDivElement>(0.3);
  const [active, setActive] = useState<number | null>(null);
  const stops = useMemo(() => [...TIMELINE].sort((a, b) => a.year.localeCompare(b.year)), []);

  const geo = useMemo(() => {
    const curve = sampleTrail(TRAIL);
    const cum = [0];
    for (let i = 1; i < curve.length; i++) {
      cum.push(cum[i - 1] + Math.hypot(curve[i][0] - curve[i - 1][0], curve[i][1] - curve[i - 1][1]));
    }
    const n = stops.length;
    const fr = (i: number) => (n === 1 ? (START + END) / 2 : START + ((END - START) * i) / (n - 1));
    const pts = stops.map((_, i) => along(curve, cum, fr(i)));
    const last = pts[pts.length - 1] ?? { idx: 0, pt: curve[0] };
    const toPath = (ps: Pt[]) => ps.map((q, i) => `${i ? 'L' : 'M'}${q[0].toFixed(1)} ${q[1].toFixed(1)}`).join('');
    const walked = toPath([...curve.slice(along(curve, cum, START).idx, last.idx), last.pt]);
    const ahead = toPath([last.pt, ...curve.slice(last.idx)]);
    // pin size: as big as the design (54) unless stops are close together
    const gap = n > 1 ? ((END - START) * cum[cum.length - 1]) / (n - 1) : 999;
    const pin = Math.max(30, Math.min(54, gap * 0.55));
    return { pts: pts.map((p) => p.pt), walked, ahead, pin };
  }, [stops]);

  const W = MAP_SIZE.width;
  const H = MAP_SIZE.height;
  return (
    <div ref={ref} className="ow-map" data-open={open || undefined}>
      <div className="map-scroll">
        <div className="map-parchment">
          <div className="map-content">
            <img src="/overworld/journey-map.webp" alt="" width={W} height={H} className="map-img" loading="lazy" decoding="async" />
            <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 w-full h-full" aria-hidden>
              <path d={geo.walked} fill="none" stroke="#3A0A06" strokeWidth={9} strokeDasharray="14 12" strokeLinecap="square" opacity={0.5} />
              <path d={geo.walked} fill="none" stroke="#C8321E" strokeWidth={5} strokeDasharray="14 12" strokeLinecap="square" />
              <path d={geo.ahead} fill="none" stroke="#F3E5C3" strokeWidth={4} strokeDasharray="6 14" strokeLinecap="square" opacity={0.7} />
            </svg>
            <ol className="contents">
              {stops.map((s, i) => {
                const [x, y] = geo.pts[i];
                const now = i === stops.length - 1;
                const left = x / W > 0.6;
                const tipId = `journey-tip-${s.year}`;
                return (
                  <li key={s.year + s.title} className="map-stop" data-active={active === i || undefined}
                    style={{ left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%`, '--pin': geo.pin.toFixed(1), '--i': i } as CSSProperties}>
                    <button type="button" className={`map-pin ${now ? 'is-now' : ''}`} aria-describedby={tipId}
                      aria-label={`${s.year}: ${s.title}`}
                      onClick={() => setActive((a) => (a === i ? null : i))} onBlur={() => setActive(null)}>
                      {s.photo
                        ? <img src={s.photo} alt="" width={56} height={56} loading="lazy" decoding="async" />
                        : <span className="map-pin-year">{s.year.slice(-2)}</span>}
                    </button>
                    <span className="map-year">{s.year}</span>
                    {now && <span className={`map-here ${x / W > 0.7 ? 'is-left' : ''}`}>YOU ARE HERE</span>}
                    <span id={tipId} role="tooltip" className={`mc-tooltip map-tip ${left ? 'tip-left' : 'tip-right'}`}>
                      <span className="mc-tip-title">{s.title}</span>
                      <span className="mc-tip-gold">{s.year}</span>
                      <span className="mc-tip-gray">{s.desc}</span>
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
        {(['l', 'r'] as const).map((side) => (
          <span key={side} className={`map-rod map-rod-${side}`} aria-hidden>
            <span className="map-roll" />
            <span className="map-shaft" />
            <span className="map-cap map-cap-top" />
            <span className="map-cap map-cap-bottom" />
          </span>
        ))}
        <span className="map-tie" aria-hidden><span className="map-seal">B</span></span>
        <span className="map-hint" aria-hidden>SCROLL TO UNROLL</span>
      </div>
      <div className="flex flex-wrap justify-between gap-2 mt-4 font-pixelify text-[14px]">
        <span className="text-[#C9BFA6]">Map · Explored {stops[0]?.year} → {stops[stops.length - 1]?.year} · the road ahead is dotted</span>
        <span className="text-[#8FD94F]">Hover a photo to read the entry</span>
      </div>
    </div>
  );
}
