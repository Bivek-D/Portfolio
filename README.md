
Dimension Portfolio

A cinematic, Minecraft-inspired personal portfolio for **Bivek Daimary(Me)**, also known as **Dameo**. The site presents software engineering, video editing, and creative work as a navigable journey through three visual dimensions: **Overworld**, **Nether**, and **The End**.

> This README describes the implementation currently present in the repository. The development-focused “The End” page is intentionally a placeholder, while the Overworld and Nether pages contain the primary portfolio content.

## Contents

- [Overview](#overview)
- [Features](#features)
- [Technology stack](#technology-stack)
- [Application structure](#application-structure)
- [Portfolio dimensions](#portfolio-dimensions)
- [Getting started](#getting-started)
- [Available scripts](#available-scripts)
- [Configuration and customization](#configuration-and-customization)
- [Media integration](#media-integration)
- [Deployment](#deployment)
- [Accessibility and performance behavior](#accessibility-and-performance-behavior)
- [Known limitations and follow-up work](#known-limitations-and-follow-up-work)
- [Contributing](#contributing)
- [License](#license)
- [References](#references)

## Overview

Dimension Portfolio is a single-page portfolio experience rather than a conventional multi-page dashboard. A fixed, hotbar-style navigation control lets visitors switch between themed sections without leaving the root route. Each section has its own color palette, block texture, animated atmosphere, and content model.

The project emphasizes visual storytelling. The Overworld communicates identity and professional background, the Nether showcases editing and production work, and The End establishes the future home for software projects and development statistics.

| Area | Current implementation |
| --- | --- |
| Application type | Single-page React application |
| Primary route | `/` |
| Build tool | Vite |
| Language | TypeScript with strict compiler settings |
| Styling | Tailwind CSS plus custom CSS in `src/index.css` |
| Animation | Framer Motion and CSS animations |
| UI primitives | Radix UI-based components generated in `src/components/ui/` |
| Media hosting | Cloudinary player embed URLs configured in source data |
| Production host | Vercel URL listed above |

## Features

### Dimension navigation

The fixed navigation bar renders three block icons as interactive hotbar slots. The active dimension glows in its theme color. Hover and focus states reveal labels and spread neighboring slots using transform and opacity transitions. Selecting a different dimension runs a loading-terrain transition before replacing the active section.

### Overworld profile

The Overworld is the main profile and introduction page. It includes:

- A responsive pixel-art hero scene with sky, sun, clouds, voxel hills, fog, ground tiles, and floating leaves.
- A profile introduction for Bivek, including the “Full-stack developer & video editor” positioning statement.
- An “About Me” section with location metadata.
- An inventory-style interest list covering AI automation, cinematography, open source, motion graphics, backend development, and pop music.
- A skill tree that presents development and editing skills as ten-segment levels.
- A journey timeline containing milestones from 2023 through 2026.
- A resume download action and social links for GitHub, LinkedIn, YouTube, and Discord.

### Nether editing portfolio

The Nether is the editing and production dimension. It includes:

- A production hero section with editing statistics.
- A Cloudinary-backed showreel embed.
- A responsive grid of long-form editing projects.
- A vertical short-form reels gallery.
- Client information, editing software proficiency, and a six-stage production workflow.
- Placeholder states for any media slot that does not yet have an embed URL or local video URL.

### Motion and reduced-motion support

Page sections use Framer Motion for entrance transitions and viewport-triggered reveal animations. The application reads the user’s reduced-motion preference through `useReducedMotion()` and shortens or removes selected transitions and particle effects when reduced motion is requested.

### Responsive and keyboard-aware interactions

The layout adapts from mobile to desktop using responsive Tailwind classes and media queries. Dimension buttons expose accessible labels, use `aria-current` for the active section, and respond to keyboard focus as well as pointer hover.

## Technology stack

| Technology | Role |
| --- | --- |
| [React](https://react.dev/) | Component-based user interface |
| [TypeScript](https://www.typescriptlang.org/) | Static typing and strict application configuration |
| [Vite](https://vite.dev/) | Development server and production bundler |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first layout and styling |
| [Framer Motion](https://motion.dev/) | Section transitions, hero animation, and viewport reveals |
| [React Router](https://reactrouter.com/) | Root route composition through `Routes` and `Route` |
| [Radix UI](https://www.radix-ui.com/) | Accessible UI primitive collection in `src/components/ui/` |
| [Lucide React](https://lucide.dev/) | Icon dependency used by the shared UI layer |
| [Cloudinary](https://cloudinary.com/) | External video player embeds for editing work |
| [Vercel](https://vercel.com/) | Referenced production deployment platform |

The repository also includes a broad shadcn-style UI foundation, including dialogs, forms, tabs, tooltips, menus, sliders, charts, and other primitives. Most of those components are reusable infrastructure; the current portfolio pages primarily rely on custom presentation components and CSS.

## Application structure

```text
Portfolio/
├── README.md
└── app/
    ├── index.html                  # HTML entry point
    ├── package.json                # Scripts and dependencies
    ├── package-lock.json           # npm dependency lockfile
    ├── vite.config.ts              # Vite configuration and @ alias
    ├── tailwind.config.js          # Tailwind theme and content paths
    ├── postcss.config.js           # PostCSS configuration
    ├── eslint.config.js            # ESLint configuration
    ├── tsconfig*.json              # TypeScript project configuration
    ├── public/                     # Static assets and public files
    │   ├── favicon.ico
    │   ├── favicon.png
    │   ├── apple-touch-icon.png
    │   └── logo.png
    └── src/
        ├── main.tsx                # React DOM entry point
        ├── App.tsx                 # Root route definition
        ├── App.css                 # App-level stylesheet entry
        ├── index.css                # Global styles and theme-specific CSS
        ├── pages/
        │   └── Home.tsx             # Dimension state and transition orchestration
        ├── sections/
        │   ├── Overworld.tsx        # Profile and career content
        │   ├── Nether.tsx           # Editing and production content
        │   └── TheEnd.tsx           # Development/projects placeholder
        ├── components/
        │   ├── Navbar.tsx           # Dimension hotbar navigation
        │   ├── DimensionTransition.tsx
        │   ├── Particles.tsx        # Leaves, embers, and void particles
        │   ├── BlockIcon.tsx        # Minecraft-style block icons
        │   ├── PixelIcon.tsx        # Pixel-art interest icons
        │   └── ui/                  # Reusable Radix/shadcn-style primitives
        ├── data/
        │   ├── portfolio.ts         # Profile, skills, timeline, and social data
        │   └── nether.ts            # Editing, project, client, and workflow data
        ├── lib/
        │   ├── dimensions.ts        # Dimension metadata and typed IDs
        │   ├── pixels.ts            # Pixel texture definitions
        │   └── utils.ts             # Shared utility functions
        └── hooks/
            └── use-mobile.ts        # Mobile viewport hook
```

The `@/*` import alias resolves to `app/src/*`, so imports such as `@/sections/Nether` remain independent of the importing file’s directory.

## Portfolio dimensions

| Dimension | Theme | Purpose | Status |
| --- | --- | --- | --- |
| Overworld | Green, sky blue, dirt and grass | Profile, interests, skills, timeline, resume, and social links | Implemented |
| Nether | Red, orange, lava and netherrack | Editing, showreel, projects, reels, clients, software, and workflow | Implemented with external media embeds |
| The End | Purple, void, and endstone | Development work, projects, and GitHub statistics | Placeholder; content is planned |

The dimension metadata is centralized in `src/lib/dimensions.ts`. Adding a new dimension requires extending the `DimId` union, adding metadata to `DIMENSIONS`, and registering a matching section in `src/pages/Home.tsx`.

## Getting started

### Prerequisites

Use a current Node.js release with npm. The repository metadata notes Node.js 20 as the development baseline. The project’s Vite configuration currently uses port `3000` for the development server.

### Installation

From the repository root:

```bash
cd app
npm install
```

If dependencies need to be reinstalled from scratch, remove the generated dependency directory and lockfile only when necessary, then run `npm install` again:

```bash
cd app
rm -rf node_modules package-lock.json
npm install
```

### Start the development server

```bash
cd app
npm run dev
```

Open the local URL printed by Vite. With the current configuration, this is normally `http://localhost:3000/`.

### Build for production

```bash
cd app
npm run build
```

The build runs the TypeScript project references first and then creates optimized static assets in `app/dist/`.

### Preview the production build

```bash
cd app
npm run preview
```

## Available scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Starts the Vite development server with hot module replacement |
| `npm run build` | Runs `tsc -b` and creates the Vite production bundle |
| `npm run lint` | Runs ESLint across the application |
| `npm run preview` | Serves the generated `dist/` directory locally |

## Configuration and customization

Most portfolio content is data-driven. Update `app/src/data/portfolio.ts` to change the profile name, greeting, tagline, status, biography, interests, skill levels, journey timeline, social URLs, and resume path. Update `app/src/data/nether.ts` to change editing statistics, showreel metadata, project cards, reels, clients, software levels, and the production workflow.

The content model is intentionally separated from presentation components. This allows copy and media changes without rewriting the layout or animation logic.

### Changing the resume

The Overworld uses the following path for the download action:

```ts
export const RESUME_URL = '/resume.pdf';
```

Place a corresponding file at `app/public/resume.pdf` so Vite copies it to the root of the deployed site. The current repository asset list does not include that PDF, so the download link should be treated as a required deployment asset.

### Changing the visual system

Global typography, pixel effects, buttons, cards, navigation behavior, loading bars, particles, and dimension-specific backgrounds are defined in `app/src/index.css`. Tailwind theme extensions and content globs are defined in `app/tailwind.config.js`.

### Adding a new section

A new section can follow this pattern:

1. Add a typed dimension ID and metadata entry in `app/src/lib/dimensions.ts`.
2. Create a section component in `app/src/sections/`.
3. Add that component to the `SECTIONS` map in `app/src/pages/Home.tsx`.
4. Add the corresponding block icon behavior if the new dimension uses a new block type.
5. Add any content objects to a dedicated file in `app/src/data/`.
6. Run the build and lint commands before deploying.

## Media integration

The Nether media model supports two playback paths:

- `embedUrl` renders an external player in an iframe.
- `videoUrl` renders a local or directly accessible HTML5 video file.

When neither property is supplied, the UI renders a themed placeholder instead of failing. Current editing media uses Cloudinary player URLs stored in `app/src/data/nether.ts`. The embeds include permissions for playback-related features and are rendered in responsive 16:9 or 9:16 containers depending on the content type.

For production use, verify that every external media URL is public, stable, and allowed to be embedded by the hosting provider. A content security policy, if added later, must also permit the selected media origin in `frame-src` and related directives.

## Deployment

This is a static Vite application and can be deployed to Vercel, Netlify, GitHub Pages, or another host that serves static assets. A generic deployment flow is:

```bash
cd app
npm install
npm run build
```

Configure the hosting provider to publish the `app/dist` directory. Because `vite.config.ts` sets `base: './'`, generated assets use relative paths, which is useful for static hosting under a non-root path. If the site is hosted with client-side routes beyond `/`, configure the provider to fall back to `index.html`; the current application only defines the root route.

The repository’s About metadata identifies the Vercel deployment as `portfolio-mu-woad-16.vercel.app`. Deployment settings, domains, and environment variables are not stored in this repository.

## Accessibility and performance behavior

The application includes several accessibility-conscious behaviors:

- Dimension controls use semantic buttons.
- Active navigation uses `aria-current="page"`.
- Interactive dimension controls expose descriptive `aria-label` values.
- Decorative particles and scenery use `aria-hidden` where appropriate.
- Skill bars expose text alternatives through `role="img"` and level labels.
- Reduced-motion preferences reduce transition durations and disable selected particles.
- Video embeds provide titles and fullscreen support.

The main visual cost comes from Framer Motion, the large shared UI dependency set, and external video iframes. The production build was verified locally with `npm run build`, which completed successfully and produced the `app/dist` output.

## Known limitations and follow-up work

The following items are visible in the current implementation and are useful when planning the next iteration:

1. **The End is not complete.** `app/src/sections/TheEnd.tsx` currently displays a “CODE-WORK” placeholder rather than development projects, GitHub statistics, or system design content.
2. **The resume file is absent from the public asset list.** Add `app/public/resume.pdf` or change `RESUME_URL` to a valid hosted document.
3. **The LinkedIn URL should be checked.** The current value is `www.linkedin.com/in/bivek-daimary-202332322` and does not include an explicit `https://` scheme.
4. **Some social links are generic placeholders.** YouTube and Discord currently point to platform homepages rather than profile or community destinations.
5. **Some content text needs editorial cleanup.** The source includes wording such as “Ai Health Care Assisstant,” “Eplaination,” and inconsistent capitalization in category and tool labels.
6. **The root project has no application backend.** Forms, authentication, analytics, server-side data, and database integrations are not part of the current implementation.
7. **External embeds are runtime dependencies.** If Cloudinary content is unavailable, the editing portfolio cannot display those videos even though the surrounding UI still renders.
8. **The repository still contains the generated Vite starter README inside `app/`.** This root README is the project-specific documentation; `app/README.md` remains template-oriented unless it is intentionally replaced later.

## Contributing

This repository is primarily a personal portfolio, but improvements to documentation, accessibility, content accuracy, responsive behavior, and performance are welcome. Before opening a change, keep the following workflow:

```bash
cd app
npm install
npm run lint
npm run build
```

Keep portfolio copy in the appropriate data module, preserve the typed dimension model, and avoid adding media files or secrets directly to source control. For external embeds, document the provider and confirm that the URL is safe to publish.

## License

No license file is currently included in the repository. Until a license is added, treat the source as **all rights reserved** and request permission before redistributing or reusing it.

## References

[1]: https://github.com/Bivek-D/Portfolio "Bivek-D Portfolio repository"
[2]: https://react.dev/ "React documentation"
[3]: https://vite.dev/ "Vite documentation"
[4]: https://www.typescriptlang.org/ "TypeScript documentation"
[5]: https://tailwindcss.com/ "Tailwind CSS documentation"
[6]: https://motion.dev/ "Motion documentation"
[7]: https://www.radix-ui.com/ "Radix UI documentation"
[8]: https://cloudinary.com/ "Cloudinary platform"
[9]: https://vercel.com/ "Vercel platform"
