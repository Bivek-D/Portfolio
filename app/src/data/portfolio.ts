export const PROFILE = {
  name: 'BIVEK',
  greeting: '> HELLO WORLD, I AM',
  tagline: 'Full-stack developer & video editor — crafting digital worlds, one block at a time.',
  status: 'OPEN TO WORK',
  about: `Hi, I'm Bivek, also known as Dameo.

I'm a programmer, editor, builder, and lifelong dreamer. I enjoy turning ideas into reality—whether that's through code, storytelling, or creative editing. Music fuels much of my work, and I love creating worlds through visuals, emotion, and imagination.

On the technical side, I'm focused on becoming a strong software engineer. My main interests are backend development, system design, Java, Spring Boot, databases, Linux, Docker, and building scalable applications that solve real problems. I enjoy debugging, understanding how systems work under the hood, and writing software that is both practical and reliable.

Beyond traditional software, I'm deeply interested in AI, automation, and intelligent systems. I'm fascinated by how machine learning and automation can enhance products, eliminate repetitive work, and create entirely new experiences. My long-term goal is to bridge strong software engineering fundamentals with AI engineering and contribute to building advanced intelligent systems.

Whether I'm building an IoT project, designing a backend service, editing a cinematic video, exploring new ideas, or chasing ambitious goals, I'm always driven by one thing: creating something meaningful that didn't exist before.`,
  location: 'Spawn Point · Earth',
};

export interface Interest {
  /** item sprite key from components/overworld/items.ts ('grass' = the grass block) */
  item: string;
  label: string;
  /** one line shown in the item tooltip */
  note?: string;
}

/** Inventory slots fill row by row (4 per row); add as many as you like. */
export const INTERESTS: Interest[] = [
  { item: 'redstone_torch', label: 'AI Automation', note: 'Teaching machines the boring parts.' },
  { item: 'camera', label: 'Cinematography', note: 'Framing, light and movement.' },
  { item: 'book', label: 'Open Source', note: "Building in public, reading others' code." },
  { item: 'star', label: 'Motion Graphics', note: 'Type and shapes that move with the beat.' },
  { item: 'grass', label: 'Backend Developer', note: 'APIs, databases, systems that stay up.' },
  { item: 'disc', label: 'Pop', note: 'The soundtrack for every late-night build.' },
];

export interface Skill {
  name: string;
  level: number; // out of 10 — frame: 9+ challenge (spiked), 8 goal (rounded), 7 and below task (square)
  group: 'dev' | 'edit';
  /** item sprite key from components/overworld/items.ts */
  icon?: string;
  /** name of the skill this one grows from; none = a root of its group's tree */
  parent?: string;
}

/** The advancement tree lays itself out from `parent`: add a skill with a parent and it slots into the tree. */
export const SKILLS: Skill[] = [
  { name: 'Java', level: 9, group: 'dev', icon: 'cup' },
  { name: 'Spring-Boot', level: 9, group: 'dev', icon: 'sapling', parent: 'Java' },
  { name: 'PostgreSQL', level: 8, group: 'dev', icon: 'chest', parent: 'Spring-Boot' },
  { name: 'N8N', level: 8, group: 'dev', icon: 'redstone_torch', parent: 'Spring-Boot' },
  { name: 'DaVinci Resolve', level: 9, group: 'edit', icon: 'palette' },
  { name: 'After Effects', level: 9, group: 'edit', icon: 'star', parent: 'DaVinci Resolve' },
  { name: 'Motion Graphics', level: 7, group: 'edit', icon: 'clock', parent: 'After Effects' },
  { name: 'Color Grading', level: 8, group: 'edit', icon: 'dye', parent: 'DaVinci Resolve' },
];

export interface TimelineEvent {
  year: string;
  title: string;
  desc: string;
  /** small round photo on the journey map (any square-ish image in /public); falls back to the year */
  photo?: string;
}

/** Journey map stops: placed in year order along the map's trail, evenly spaced, however many there are. */

export const TIMELINE: TimelineEvent[] = [
  {
    year: '2026',
    photo: '/overworld/journey/2026.webp',
    title: 'Minecraft-Style Portfolio launches',
    desc: 'This very site — a cinematic portfolio spanning three dimensions.',
  },
  {
    year: '2025',
    photo: '/overworld/journey/2025.webp',
    title: 'Build Doc Bot',
    desc: 'AI Healthcare Assistant with booking automation',
  },
  {
    year: '2024',
    photo: '/overworld/journey/2024.webp',
    title: 'First Editing Gig',
    desc: 'Transformed video from raw clips to Pure Enjoyable Video',
  },
  {
    year: '2023',
    photo: '/overworld/journey/2023.webp',
    title: 'Hello, world',
    desc: 'Wrote the first line of code. Immediately broke production (locally).',
  },
];

export interface Social {
  name: string;
  url: string;
  icon: 'github' | 'linkedin' | 'youtube' | 'discord';
}

export const SOCIALS: Social[] = [
  { name: 'GitHub', url: 'https://github.com/Bivek-D', icon: 'github' },
  { name: 'LinkedIn', url: 'www.linkedin.com/in/bivek-daimary-202332322', icon: 'linkedin' },
  { name: 'YouTube', url: 'https://youtube.com/', icon: 'youtube' },
  { name: 'Discord', url: 'https://discord.gg/3R5RwXakg', icon: 'discord' },
];

export const RESUME_URL = '/resume.pdf';
