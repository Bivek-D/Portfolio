
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
  label: 'WELCOME TO NETHER',
  title: 'DAMEO',
  subtitle: 'EDITING & PRODUCTION',
  tagline:
    'Cuts that hit like a crit — cinematic edits, motion graphics and color work forged in the heat.',
};

export const NETHER_STATS = [
  { value: '13+', label: 'PROJECTS DELIVERED' },
  { value: '2M+', label: 'VIEWS CUT' },
  { value: '3', label: 'YEARS IN THE BAY' },
];

export const SHOWREEL = {
  title: 'SHOWREEL 2026',
  subtitle: 'A quick runthrough of me.',
  duration: '00:55',
  embedUrl: 'https://player.cloudinary.com/embed/?cloud_name=jp56lzmk&public_id=show1',
  videoUrl: ''
};

export const PROJECTS: VideoSlot[] = [
  {
    id: 'p1',
    title: 'Melasma',
    category: 'Education',
    duration: '03:42',
    tools: ['After Effects', 'Premiere'],
    year: '2026',
    embedUrl: 'https://player.cloudinary.com/embed/?cloud_name=jp56lzmk&public_id=10',
  },
  {
    id: 'p2',
    title: 'Trip Slow Edit',
    category: 'Travel',
    duration: '02:18',
    tools: ['After Effects', 'Davinci Resolve'],
    year: '2026',
    embedUrl: 'https://player.cloudinary.com/embed/?cloud_name=jp56lzmk&public_id=8',
  },
  {
    id: 'p3',
    title: 'Skin',
    category: 'Education',
    duration: '00:45',
    tools: ['After Effects', 'Premiere'],
    year: '2026',
    embedUrl: 'https://player.cloudinary.com/embed/?cloud_name=jp56lzmk&public_id=7',
  },
  {
    id: 'p4',
    title: 'Myths',
    category: 'DOCUMENTARY',
    duration: '4:07',
    tools: ['After Effect', 'Davinci Resolve'],
    year: '2026',
    embedUrl: 'https://player.cloudinary.com/embed/?cloud_name=jp56lzmk&public_id=5',
  },
  {
    id: 'p5',
    title: 'Hair',
    category: 'EDUCATION',
    duration: '04:05',
    tools: ['After Effects', 'Resolve'],
    year: '2026',
    embedUrl: 'https://player.cloudinary.com/embed/?cloud_name=jp56lzmk&public_id=3',
  },
  {
    id: 'p6',
    title: 'ClashPlans (idea)',
    category: 'PROMO',
    duration: '1:20',
    tools: ['After Effects'],
    year: '2026',
    embedUrl: 'https://player.cloudinary.com/embed/?cloud_name=jp56lzmk&public_id=2',
  },
  {
    id: 'p7',
    title: 'Faceless Strangers Explanation',
    category: 'Horror, Explainer. Faceless',
    duration: '6:20',
    tools: ['After Effects', 'Resolve'],
    year: '2026',
    embedUrl: 'https://player.cloudinary.com/embed/?cloud_name=jp56lzmk&public_id=sam',
  },
  {
    id: 'p8',
    title: 'GhostFace',
    category: 'Horror, Explainer, Faceless',
    duration: '1:20',
    tools: ['After Effects'],
    year: '2026',
    embedUrl: 'https://player.cloudinary.com/embed/?cloud_name=jp56lzmk&public_id=Comp_1',
  },
];



export interface ReelSlot {
  id: string;
  title: string;
  client: string;
  embedUrl?: string;
  videoUrl?: string;
}

export const REELS: ReelSlot[] = [
  {
    id: 'r1',
    title: 'Yoga Day',
    client: 'Dr Hemo',
    embedUrl: 'https://player.cloudinary.com/embed/?cloud_name=jp56lzmk&public_id=11',
  },
  {
    id: 'r2',
    title: 'Hyperactive Explainer Short',
    client: 'Almas Reels',
    embedUrl: 'https://player.cloudinary.com/embed/?cloud_name=jp56lzmk&public_id=9',
  },
  {
    id: 'r3',
    title: 'Recreated Version(Kumar Uncle)',
    client: 'Dr Hemo',
    embedUrl: 'https://player.cloudinary.com/embed/?cloud_name=jp56lzmk&public_id=A001_06141305_C028_1'
  },
  {
    id: 'r4',
    title: 'Active Short',
    client: '',
    embedUrl: 'https://player.cloudinary.com/embed/?cloud_name=jp56lzmk&public_id=17',
  },
  {
    id: 'r5',
    title: 'Quick Explaining',
    client: 'Dr Hemo',
    embedUrl: 'https://player.cloudinary.com/embed/?cloud_name=jp56lzmk&public_id=acnef',
  },
];

export const CLIENTS = [
  { name: 'Dr Hemo', detail: '12 videos · retainer' },
  { name: 'Almas Reels', detail: '2 videos · reels' },
];

export const SOFTWARE = [
  { name: 'DaVinci Resolve', level: 9, note: 'edit · color · deliver' },
  { name: 'After Effects', level: 9, note: 'motion graphics' },
  { name: 'Premiere Pro', level: 8, note: 'fast turnarounds' },
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
