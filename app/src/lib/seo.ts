import type { DimId } from '@/lib/dimensions';

/** Search and share details for each dimension page. Used in the browser and when pages are pre-rendered at build. */

export const SITE = 'https://dameo.site';
export const OG_IMAGE = `${SITE}/og-image.png`;

export interface PageSeo {
  dim: DimId;
  path: string;
  title: string;
  description: string;
}

export const PAGES: PageSeo[] = [
  {
    dim: 'overworld',
    path: '/',
    title: 'Bivek Daimary (Dameo) — Full-Stack Developer & Video Editor',
    description:
      'Portfolio of Bivek Daimary (Dameo) — Full-Stack Developer & Video Editor. Java, Spring Boot, PostgreSQL, DaVinci Resolve and After Effects. Open to work.',
  },
  {
    dim: 'nether',
    path: '/nether',
    title: 'Dameo — Video Editing, Motion Graphics & Color Grading',
    description:
      'Video editing portfolio of Dameo (Bivek Daimary): showreel, long-form edits, reels, motion graphics and color grading in DaVinci Resolve, After Effects and Premiere Pro.',
  },
  {
    dim: 'end',
    path: '/end',
    title: 'Dameo — Development & Projects',
    description:
      'Software projects by Bivek Daimary (Dameo) — full-stack development with Java, Spring Boot, PostgreSQL, Docker and automation.',
  },
];

export const pageFor = (dim: DimId): PageSeo => PAGES.find((p) => p.dim === dim)!;

export function dimFromPath(pathname: string): DimId {
  const clean = pathname.replace(/\/+$/, '') || '/';
  return PAGES.find((p) => p.path === clean)?.dim ?? 'overworld';
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

/** The per-page tags that go between the <!--seo--> markers in index.html. */
export function headTags(dim: DimId, jsonLd: object[] = []): string {
  const p = pageFor(dim);
  const url = SITE + (p.path === '/' ? '/' : p.path);
  return [
    `<title>${esc(p.title)}</title>`,
    `<meta name="description" content="${esc(p.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:title" content="${esc(p.title)}" />`,
    `<meta property="og:description" content="${esc(p.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    `<meta name="twitter:title" content="${esc(p.title)}" />`,
    `<meta name="twitter:description" content="${esc(p.description)}" />`,
    `<meta name="twitter:image" content="${OG_IMAGE}" />`,
    ...jsonLd.map((d) => `<script type="application/ld+json" data-page-ld>${JSON.stringify(d).replace(/</g, '\\u003c')}</script>`),
  ].join('\n  ');
}

/** Keep the head in sync when the dimension changes in the browser. */
export function applyHead(dim: DimId, jsonLd: object[] = []) {
  const p = pageFor(dim);
  const url = SITE + (p.path === '/' ? '/' : p.path);
  document.title = p.title;
  const set = (sel: string, attr: string, val: string) => document.head.querySelector(sel)?.setAttribute(attr, val);
  set('meta[name="description"]', 'content', p.description);
  set('link[rel="canonical"]', 'href', url);
  set('meta[property="og:title"]', 'content', p.title);
  set('meta[property="og:description"]', 'content', p.description);
  set('meta[property="og:url"]', 'content', url);
  set('meta[name="twitter:title"]', 'content', p.title);
  set('meta[name="twitter:description"]', 'content', p.description);
  document.head.querySelectorAll('script[data-page-ld]').forEach((n) => n.remove());
  for (const d of jsonLd) {
    const s = document.createElement('script');
    s.type = 'application/ld+json';
    s.dataset.pageLd = '';
    s.textContent = JSON.stringify(d);
    document.head.appendChild(s);
  }
}
