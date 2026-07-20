/* ------------------------------------------------------------------
   Portfolio content — edit this single file to make the site yours.
   Everything here is placeholder text ready to be swapped out.
------------------------------------------------------------------- */

export const PROFILE = {
  name: 'ALEX',
  greeting: '> HELLO WORLD, I AM',
  tagline: 'Full-stack developer & video editor — crafting digital worlds, one block at a time.',
  status: 'OPEN TO WORK',
  about: `I'm a developer and video editor who treats every project like a new world seed — full of possibility, waiting to be built. By day I architect full-stack web apps with TypeScript and React; by night I'm in the edit bay cutting cinematic sequences, motion graphics, and color-graded stories. I love the space where engineering meets storytelling: performant code that also makes people feel something. When I'm not shipping products or renders, you'll find me modding Minecraft, chasing the perfect synthwave playlist, or over-engineering my dotfiles.`,
  location: 'Spawn Point · Earth',
};

export interface Interest {
  icon: 'sword' | 'camera' | 'code' | 'star' | 'note' | 'block';
  label: string;
}

export const INTERESTS: Interest[] = [
  { icon: 'sword', label: 'Game Design' },
  { icon: 'camera', label: 'Cinematography' },
  { icon: 'code', label: 'Open Source' },
  { icon: 'star', label: 'Motion Graphics' },
  { icon: 'block', label: 'Minecraft Modding' },
  { icon: 'note', label: 'Lofi & Synthwave' },
];

export interface Skill {
  name: string;
  level: number; // out of 10
  group: 'dev' | 'edit';
}

export const SKILLS: Skill[] = [
  { name: 'TypeScript', level: 9, group: 'dev' },
  { name: 'React / Next.js', level: 9, group: 'dev' },
  { name: 'Node.js & APIs', level: 8, group: 'dev' },
  { name: 'GSAP / Framer Motion', level: 8, group: 'dev' },
  { name: 'DaVinci Resolve', level: 9, group: 'edit' },
  { name: 'Premiere Pro', level: 8, group: 'edit' },
  { name: 'Motion Graphics', level: 7, group: 'edit' },
  { name: 'Color Grading', level: 8, group: 'edit' },
];

export interface TimelineEvent {
  year: string;
  title: string;
  desc: string;
}

export const TIMELINE: TimelineEvent[] = [
  {
    year: '2026',
    title: 'Dimension Portfolio launches',
    desc: 'This very site — a cinematic portfolio spanning three dimensions.',
  },
  {
    year: '2025',
    title: 'Lead editor on 40+ client projects',
    desc: 'Commercials, music videos and branded content end to end.',
  },
  {
    year: '2024',
    title: 'Shipped first full-stack SaaS app',
    desc: 'From schema to deployment — and actual paying users.',
  },
  {
    year: '2023',
    title: 'Hello, world',
    desc: 'Wrote the first line of code. Immediately broke production (locally).',
  },
];

export interface Social {
  name: string;
  url: string;
  icon: 'github' | 'linkedin' | 'youtube' | 'x';
}

export const SOCIALS: Social[] = [
  { name: 'GitHub', url: 'https://github.com/', icon: 'github' },
  { name: 'LinkedIn', url: 'https://linkedin.com/', icon: 'linkedin' },
  { name: 'YouTube', url: 'https://youtube.com/', icon: 'youtube' },
  { name: 'X', url: 'https://x.com/', icon: 'x' },
];

export const RESUME_URL = '/resume.pdf';
