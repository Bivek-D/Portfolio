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
  { name: 'After Effects', level: 9, group: 'edit' },
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
    desc: 'AI Healthcare Assistant with booking automation',
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

export interface Social {
  name: string;
  url: string;
  icon: 'github' | 'linkedin' | 'youtube' | 'discord';
}

export const SOCIALS: Social[] = [
  { name: 'GitHub', url: 'https://github.com/Bivek-D', icon: 'github' },
  { name: 'LinkedIn', url: 'www.linkedin.com/in/bivek-daimary-202332322', icon: 'linkedin' },
  { name: 'YouTube', url: 'https://youtube.com/', icon: 'youtube' },
  { name: 'Discord', url: 'https://discord.com/', icon: 'discord' },
];

export const RESUME_URL = '/resume.pdf';
