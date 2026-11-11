/* The End (development & projects). Facts come from GitHub (Bivek-D) and LinkedIn.
 * Optional fields are hidden on the page while they are empty, so nothing made up ever shows. */

export const GITHUB = 'https://github.com/Bivek-D';
export const LINKEDIN = 'https://www.linkedin.com/in/bivek-daimary-202332322';
/** Fill in to show the email row and send the contact form straight to your inbox. Empty = LinkedIn instead. */
export const CONTACT_EMAIL = 'bivekdaimar444@gmail.com';
/** e.g. "2 days". Empty = the sentence is left out. */
export const REPLY_TIME = '';

export type TagTone = 'neutral' | 'info' | 'warning' | 'success';
export type BuildKind = 'AI' | 'Backend' | 'Web' | 'IoT';

export interface Build {
  slug: string;              // art: /end/screens/<slug>.webp (the item frame in its tower room)
  title: string;
  kind: BuildKind;
  /** featured builds get their own room in the tower (newest first = top floor); the rest go in storage */
  featured?: boolean;
  /** 'live' = deployed and checked by the roof beacon, 'building' = room under scaffolding */
  status?: 'live' | 'building' | 'in-flight';
  /** short pill on the room, e.g. "SHIPPED · MAY 2026" */
  badge?: string;
  /** API docs (Swagger) link */
  docs?: string;
  tags: [TagTone, string][];
  oneLiner: string;
  story: string;
  stack: string[];
  code?: string;
  live?: string;
  /** archive cards: the small line above the title */
  meta?: string;
  /** archive cards without code or a live demo link here instead */
  fallback?: { label: string; href: string };
}

export const BUILDS: Build[] = [
  {
    slug: 'jfj', title: 'JFJ · Job For Jobless', kind: 'Backend', featured: true, status: 'live',
    badge: 'LIVE API · FRONTEND BUILDING',
    tags: [['success', 'LIVE API'], ['warning', 'FRONTEND BUILDING']],
    oneLiner: 'Gigs near you. Addresses stay hidden until you are hired, and a row lock means one hire per place.',
    story: 'A location based marketplace for short local work. Radius search runs on PostGIS, every feature went through its own branch and pull request, and Testcontainers tests run in CI before each deploy to Render. The React and Leaflet frontend is in progress.',
    stack: ['Java 21', 'Spring Boot', 'PostgreSQL + PostGIS', 'Flyway', 'Testcontainers', 'Docker', 'GitHub Actions', 'Render'],
    code: `${GITHUB}/JFJ`, docs: 'https://jfj-s529.onrender.com/swagger-ui.html',
  },
  {
    slug: 'docbot', title: 'DocBot', kind: 'AI', featured: true,
    badge: 'SHIPPED · MAY 2026',
    tags: [['info', 'AI'], ['neutral', 'HACK4BRAHMA HACK DAYS']],
    oneLiner: 'Describe how you feel, get an AI assessment and book a nearby doctor in one chat.',
    story: 'Built with Rishabh in a 5 hour sprint. A React chat talks to a Spring Boot API for auth and booking, a FastAPI service asks Gemini 2.5 Flash for triage, and n8n handles notifications.',
    stack: ['Spring Boot', 'FastAPI', 'Gemini', 'PostgreSQL', 'n8n', 'Docker'],
    code: `${GITHUB}/DocBot`,
  },
  {
    slug: 'hrm', title: 'Hrm', kind: 'Backend', featured: true,
    badge: 'SHIPPED · JUL 2026',
    tags: [['info', 'BACKEND'], ['neutral', 'XOPUNTECH INTERNSHIP']],
    oneLiner: 'A production ready HR REST API for employees, tasks and leave requests.',
    story: 'Java 21 and Spring Boot with a normalized MySQL schema, JWT auth through Spring Security, DTOs in a layered design, pagination on every list, and 20+ endpoints documented in Swagger.',
    stack: ['Java 21', 'Spring Boot', 'Spring Security', 'MySQL', 'Swagger'],
    code: `${GITHUB}/Hrm`,
  },
  {
    slug: 'fish-feeder', title: 'Smart fish feeder', kind: 'IoT', meta: 'IOT · 2ND PRIZE CODQUEST S3',
    tags: [], stack: [], story: '',
    oneLiner: 'An ESP8266 and a servo feed the fish on schedule, set from a small web page. Built for low power.',
    fallback: { label: 'See the win', href: '#wins' },
  },
  {
    slug: 'space-site', title: 'Space tech site', kind: 'Web', meta: 'WEB · 1ST PRIZE DEV DAZZLE',
    tags: [], stack: [], story: '',
    oneLiner: 'A responsive space tech site built in 4 hours with HTML, CSS and JavaScript. No internet, no AI.',
    fallback: { label: 'See the win', href: '#wins' },
  },
  {
    slug: 'filter-sih', title: 'Filter SIH', kind: 'Web', meta: 'WEB · REACT · TYPESCRIPT',
    tags: [], stack: [], story: '',
    oneLiner: 'Search and filter Smart India Hackathon problem statements on a map. Live demo is offline for now.',
    code: `${GITHUB}/Filter_SIH`,
  },
  {
    slug: 'deploy-test', title: 'deploy_test', kind: 'Web', meta: 'DEVOPS · DOCKER · VERCEL',
    tags: [], stack: [], story: '',
    oneLiner: 'A full stack deploy playbook: Spring Boot in Docker behind a React app on Vercel, with JWT login.',
    code: `${GITHUB}/deploy_test`, live: 'https://deploy-test-pi-azure.vercel.app',
  },
];

export const BADGES: { tier: 'gold' | 'silver' | 'teal'; label: string }[] = [
  { tier: 'gold', label: '1st prize · Dev Dazzle 2026' },
  { tier: 'silver', label: '2nd prize · CODQUEST S3' },
  { tier: 'teal', label: 'UiPath Student Developer Champion' },
];

export const TAGLINE = 'I build the part you never see: the APIs and data that keep an app alive when real users show up.';

export const JOB = {
  role: 'Back End Developer Intern',
  where: 'XopunTech (India) Pvt. Ltd. · Guwahati · Jun to Jul 2026',
  points: [
    'Built a production ready HR REST API in Java 21 and Spring Boot',
    'Documented 20+ endpoints with Swagger and OpenAPI',
    'Added JWT auth with Spring Security and a layered design with DTOs',
    'Normalized the MySQL schema, with pagination on every list',
  ],
};
export const EDUCATION = { school: 'Assam Don Bosco University', detail: 'Azara campus, Guwahati' };

export interface Advancement {
  tier: 'gold' | 'silver' | 'teal';
  kind: string;
  title: string;
  photo?: string;            // /end/wins/<photo>.webp
  desc: string;
}

export const ADVANCEMENTS: Advancement[] = [
  { tier: 'gold', kind: 'Challenge complete!', title: '1st prize · Dev Dazzle 2026', photo: 'devdazzle-1',
    desc: 'Web design in 4 hours with no internet and no AI. HTML, CSS and JavaScript only.' },
  { tier: 'silver', kind: 'Challenge complete!', title: '2nd prize · CODQUEST S3', photo: 'fishfeeder-1',
    desc: 'IoT hackathon: a smart fish feeder on an ESP8266 with a servo and a web config page.' },
  { tier: 'teal', kind: 'Goal reached!', title: 'Hack4Brahma HACK DAYS', photo: 'docbot-1',
    desc: "Shipped DocBot with Rishabh in a 5 hour sprint at Guwahati's HACK DAYS." },
  { tier: 'teal', kind: 'Advancement made!', title: 'UiPath Student Developer Champion',
    desc: 'Selected in August 2026 to represent UiPath automation on campus.' },
];

export const PROCESS = [
  { n: '01', title: 'Model the data first', body: 'Schema, relations and migrations come before endpoints. Flyway and JPA keep every change versioned.' },
  { n: '02', title: 'Build the API, then prove it', body: 'Layered Spring Boot with DTOs, JWT security and Swagger docs, so anyone can try every endpoint.' },
  { n: '03', title: 'Ship it in a container', body: 'Docker for every service, deployed early so the frontend and backend talk from day one.' },
];

export const FAQS = [
  { q: 'Are you open to work?', a: "Yes. I'm looking for backend internships and freelance API projects." },
  { q: 'Where are you based?', a: "Guwahati, Assam (IST, UTC+5:30). Message me about remote or on site work." },
  { q: 'What stack do you use?', a: 'Java 21 and Spring Boot with PostgreSQL or MySQL, Spring Security with JWT, Docker, and FastAPI when a project needs Python or AI.' },
  { q: 'Do you build frontends too?', a: 'Yes, React with Vite and TypeScript for the apps I ship, like DocBot and Filter SIH. Backend is where I go deepest.' },
  { q: 'Can I see your code?', a: 'Most projects are public on GitHub at Bivek-D, with READMEs that explain how to run them.' },
  { q: 'How fast can you build?', a: 'DocBot went from idea to working demo in a 5 hour sprint. The Dev Dazzle site took 4 hours with no internet.' },
];

/** The roof beacon checks this. Render's free tier sleeps, so the first request can take up to a minute. */
export const JFJ_HEALTH = 'https://jfj-s529.onrender.com/actuator/health';

/** "Still brewing": what I'm building now. Eval scores stay hidden until they're real (empty = shown as brewing). */
export const NOW_BUILDING = {
  title: 'Job discovery assistant',
  story: 'Matches job postings against a profile with an LLM, and I write evals to check whether its matches are right. Tested and measured like any other backend.',
  stack: ['LLM', 'Evals', 'Java', 'APIs'],
  evals: [
    { label: 'Match precision', value: '', color: '#C060F0' },
    { label: 'Recall', value: '', color: '#2FD3B6' },
    { label: 'Median latency', value: '', color: '#F5B83D' },
  ],
};
