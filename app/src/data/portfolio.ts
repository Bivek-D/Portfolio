/* ------------------------------------------------------------------
   Portfolio content — edit this single file to make the site yours.
   Everything here is placeholder text ready to be swapped out.
------------------------------------------------------------------- */

export const PROFILE = {
  name: 'BIVEK',
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
  { icon: 'sword', label: 'Ai Automation' },
  { icon: 'camera', label: 'Cinematography' },
  { icon: 'code', label: 'Open Source' },
  { icon: 'star', label: 'Motion Graphics' },
  { icon: 'block', label: 'Backend Developer' },
  { icon: 'note', label: 'Pop' },
];

export interface Skill {
  name: string;
  level: number; // out of 10
  group: 'dev' | 'edit';
}

export const SKILLS: Skill[] = [
  { name: 'Java', level: 9, group: 'dev' },
  { name: 'Spring-Boot', level: 9, group: 'dev' },
  { name: 'PostgreSQL', level: 8, group: 'dev' },
  { name: 'N8N', level: 8, group: 'dev' },
  { name: 'DaVinci Resolve', level: 9, group: 'edit' },
  { name: 'After Effects', level: 8, group: 'edit' },
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
    title: 'Minecraft-Style Portfolio launches',
    desc: 'This very site — a cinematic portfolio spanning three dimensions.',
  },
  {
    year: '2025',
    title: 'Build Doc Bot',
    desc: 'Ai Health Care Assisstant With Booking automation',
  },
  {
    year: '2024',
    title: 'First Editing Gig',
    desc: 'Transformed video from raw clips to Pure Enjoyable Video',
  },
  {
    year: '2023',
    title: 'Hello, world',
    desc: 'Wrote the first line of code. Immediately broke production (locally).',
  },
];

/* ------------------------------------------------------------------
   Editing projects — used in the Nether (Editing & Production) section.
   To add a video, paste a YouTube embed URL into the videoUrl field,
   e.g. "https://www.youtube.com/embed/dQw4w9WgXcQ"
------------------------------------------------------------------- */

export interface EditingProject {
  id: number;
  title: string;
  desc: string;
  category: string;
  videoUrl: string;
}

export const EDITING_PROJECTS: EditingProject[] = [
  {
    id: 1,
    title: 'Project One',
    desc: 'Add a description of this editing project.',
    category: 'SHORT FILM',
    videoUrl: '',
  },
  {
    id: 2,
    title: 'Project Two',
    desc: 'Add a description of this editing project.',
    category: 'MUSIC VIDEO',
    videoUrl: '',
  },
  {
    id: 3,
    title: 'Project Three',
    desc: 'Add a description of this editing project.',
    category: 'COMMERCIAL',
    videoUrl: '',
  },
  {
    id: 4,
    title: 'Project Four',
    desc: 'Add a description of this editing project.',
    category: 'MOTION GFX',
    videoUrl: '',
  },
  {
    id: 5,
    title: 'Project Five',
    desc: 'Add a description of this editing project.',
    category: 'COLOR GRADE',
    videoUrl: '',
  },
  {
    id: 6,
    title: 'Project Six',
    desc: 'Add a description of this editing project.',
    category: 'VFX',
    videoUrl: '',
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
