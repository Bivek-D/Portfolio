import type { DimId } from '@/lib/dimensions';
import { SHOWREEL, PROJECTS, REELS } from '@/data/nether';
import { publicId, thumbUrl } from '@/lib/cloudinary';
import { SITE } from '@/lib/seo';

/** "6:20" or "00:55" -> ISO 8601 "PT6M20S". */
function isoDuration(d: string): string {
  const parts = d.split(':').map((n) => parseInt(n, 10) || 0);
  const [h, m, s] = parts.length === 3 ? parts : [0, parts[0] ?? 0, parts[1] ?? 0];
  return `PT${h ? `${h}H` : ''}${m ? `${m}M` : ''}${s}S`;
}

interface VideoIn {
  name: string;
  description: string;
  embedUrl?: string;
  duration?: string;
  year?: string;
}

function video(v: VideoIn) {
  const id = publicId(v.embedUrl);
  if (!id || !v.embedUrl) return null;
  return {
    '@type': 'VideoObject',
    name: v.name,
    description: v.description,
    thumbnailUrl: thumbUrl(id, 1280),
    embedUrl: v.embedUrl,
    // the data only has a year; Google wants a date, so the first of January stands in until real dates are added
    uploadDate: `${v.year ?? '2026'}-01-01`,
    ...(v.duration ? { duration: isoDuration(v.duration) } : {}),
    creator: { '@type': 'Person', name: 'Bivek Daimary', alternateName: 'Dameo' },
  };
}

/** Page-specific structured data (the site-wide ProfilePage stays in index.html). */
export function pageJsonLd(dim: DimId): object[] {
  if (dim !== 'nether') return [];
  const videos = [
    video({ name: `Dameo ${SHOWREEL.title.toLowerCase().replace(/^\w/, (c) => c.toUpperCase())}`,
      description: `Video editing showreel by Dameo (Bivek Daimary). ${SHOWREEL.subtitle}`,
      embedUrl: SHOWREEL.embedUrl, duration: SHOWREEL.duration }),
    ...PROJECTS.map((p) => video({ name: p.title,
      description: `${p.title} — ${p.category.toLowerCase()} video edited by Dameo with ${p.tools.join(' and ')}.`,
      embedUrl: p.embedUrl, duration: p.duration, year: p.year })),
    ...REELS.map((r) => video({ name: r.title,
      description: `${r.title} — short-form vertical reel edited by Dameo${r.client ? ` for ${r.client}` : ''}.`,
      embedUrl: r.embedUrl })),
  ].filter(Boolean);
  return [{
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Dameo — Video Editing Portfolio',
    url: `${SITE}/nether`,
    mainEntity: { '@type': 'ItemList', itemListElement: videos.map((v, i) => ({ '@type': 'ListItem', position: i + 1, item: v })) },
  }];
}
