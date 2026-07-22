/* ------------------------------------------------------------------
   NETHER — Editing & Production content.

   VIDEO SLOTS: to light up a slot, paste ONE of these on the entry:
     embedUrl  → YouTube/Vimeo embed URL (https://www.youtube.com/embed/...)
     videoUrl  → direct .mp4 URL (self-hosted or CDN)
   Until then each slot renders its themed placeholder thumbnail.
------------------------------------------------------------------- */

export interface VideoSlot {
  id: string;
  title: string;
  category: string;
  duration: string;
  tools: string[];
  year: string;
  embedUrl?: string;
  videoUrl?: string;
}

export const NETHER_HERO = {
  label: 'DIMENSION 02',
  title: 'DAMEO',
  subtitle: 'EDITING & PRODUCTION',
  tagline:
    'Cuts that hit like a crit — cinematic edits, motion graphics and color work forged in the heat.',
};

export const NETHER_STATS = [
  { value: '40+', label: 'PROJECTS DELIVERED' },
  { value: '25M+', label: 'VIEWS CUT' },
  { value: '6', label: 'YEARS IN THE BAY' },
];

export const SHOWREEL = {
  title: 'SHOWREEL 2026',
  subtitle: 'A 90-second tour through the best cuts of the year.',
  duration: '01:30',
  embedUrl: undefined as string | undefined,
  videoUrl: undefined as string | undefined,
};

export const PROJECTS: VideoSlot[] = [
  {
    id: 'p1',
    title: 'Neon District — Music Video',
    category: 'MUSIC VIDEO',
    duration: '03:42',
    tools: ['Resolve', 'Fusion'],
    year: '2025',
  },
  {
    id: 'p2',
    title: 'Apex Esports — Tournament Recap',
    category: 'ESPORTS',
    duration: '02:18',
    tools: ['Premiere', 'After Effects'],
    year: '2025',
  },
  {
    id: 'p3',
    title: 'Lumen Watches — Product Launch',
    category: 'COMMERCIAL',
    duration: '00:45',
    tools: ['Resolve'],
    year: '2025',
  },
  {
    id: 'p4',
    title: 'Drift Culture — Short Documentary',
    category: 'DOCUMENTARY',
    duration: '12:07',
    tools: ['Premiere', 'Resolve'],
    year: '2024',
  },
  {
    id: 'p5',
    title: 'Solaris App — Launch Promo',
    category: 'PROMO',
    duration: '01:05',
    tools: ['After Effects', 'Resolve'],
    year: '2024',
  },
  {
    id: 'p6',
    title: 'Midnight Radio — Audio Visualizer',
    category: 'VISUALIZER',
    duration: '04:20',
    tools: ['After Effects'],
    year: '2024',
  },
];

export const MOTION_GFX: VideoSlot[] = [
  {
    id: 'm1',
    title: 'Kinetic Type Reel',
    category: 'TYPOGRAPHY',
    duration: '00:38',
    tools: ['After Effects'],
    year: '2025',
  },
  {
    id: 'm2',
    title: 'Logo Sting Pack ×6',
    category: 'BRANDING',
    duration: '00:24',
    tools: ['After Effects', 'Fusion'],
    year: '2025',
  },
  {
    id: 'm3',
    title: 'HUD / UI Animation Kit',
    category: 'UI MOTION',
    duration: '00:52',
    tools: ['After Effects'],
    year: '2024',
  },
  {
    id: 'm4',
    title: 'Lyric Video System',
    category: 'TEMPLATE',
    duration: '01:12',
    tools: ['Premiere', 'After Effects'],
    year: '2024',
  },
];

export const CLIENTS = [
  { name: 'NOVA MEDIA', detail: '12 videos · retainer' },
  { name: 'APEX ESPORTS', detail: '8 videos · events' },
  { name: 'LUMEN CO.', detail: '5 videos · product' },
  { name: 'PIXELFORGE', detail: '15 videos · studio' },
];

export const SOFTWARE = [
  { name: 'DaVinci Resolve', level: 10, note: 'edit · color · deliver' },
  { name: 'Premiere Pro', level: 8, note: 'fast turnarounds' },
  { name: 'After Effects', level: 7, note: 'motion graphics' },
  { name: 'Fusion', level: 6, note: 'VFX & compositing' },
  { name: 'Audition', level: 6, note: 'sound cleanup' },
  { name: 'Photoshop', level: 8, note: 'thumbnails & key art' },
];

export const WORKFLOW = [
  { step: '01', title: 'Brief & Script', desc: 'Goals, references, story beats — locked before a single cut.' },
  { step: '02', title: 'Assembly', desc: 'Logging, selects and structure. The skeleton of the story.' },
  { step: '03', title: 'Rough Cut', desc: 'Pacing and rhythm first — music picked, story lands.' },
  { step: '04', title: 'Motion GFX', desc: 'Titles, lower thirds, transitions and screen replacements.' },
  { step: '05', title: 'Color Grade', desc: 'Shot matching, look development, final polish in Resolve.' },
  { step: '06', title: 'Sound & Delivery', desc: 'Mix, master, and exports for every platform spec.' },
];
