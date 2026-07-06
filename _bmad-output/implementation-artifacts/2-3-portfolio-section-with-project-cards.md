# Story 2.3: Portfolio Section with Project Cards

Status: review

## Story

As a visitor,
I want to browse a grid of portfolio project cards showing each project's title, thumbnail, stack, and action links,
so that I can evaluate Agun's work quality and find projects relevant to my technical needs.

## Acceptance Criteria

1. **Given** I scroll to or navigate to `#portfolio`
   **When** the section loads
   **Then** a grid of at least 4 project cards is displayed (up to 6 at MVP)

2. **Given** I view a project card
   **When** the content renders
   **Then** each card shows: project thumbnail image (via `next/image`), title, one-line problem statement, and tech stack badges

3. **Given** a project has a live deployment URL
   **When** I view its card
   **Then** a "Live" link/button is visible and navigates to the deployed project in a new tab

4. **Given** a project has a GitHub repository URL
   **When** I view its card
   **Then** a "GitHub" link/button is visible and navigates to the repository in a new tab

5. **Given** the section is implemented
   **When** I inspect the source
   **Then** all project data is sourced from `src/data/projects.ts` (typed `Project[]` array) — not hardcoded in components

6. **Given** the section is rendered
   **When** I inspect images
   **Then** thumbnails are sourced from `/public/images/projects/` as `.webp` files and rendered via `next/image`
   **And** all images have descriptive `alt` text

7. **Given** I view the section on any device
   **When** the layout renders
   **Then** the grid is responsive: 1 column (mobile), 2 columns (tablet `sm:`), 3 columns (desktop `lg:`), with `gap-6`

8. **Given** the section is rendered
   **When** I check accessibility
   **Then** all interactive elements (Live/GitHub links) are keyboard-navigable with visible focus states
   **And** all text meets WCAG 2.1 AA contrast ratios

9. **Given** JavaScript is disabled
   **When** the page renders
   **Then** the Portfolio section content (cards, thumbnails, links) is fully visible as static HTML

## Tasks / Subtasks

- [x] Task 1: Install shadcn `card` component (AC: 2)
  - [x] Run `npx shadcn@latest add card` — adds `src/components/ui/card.tsx`
  - [x] Do NOT edit `src/components/ui/card.tsx` after installation; extend via `className` only

- [x] Task 2: Create `src/data/projects.ts` data file (AC: 2, 5)
  - [x] Define and export `interface Project` with fields: `id: string`, `title: string`, `description: string`, `problem: string`, `stack: string[]`, `liveUrl?: string`, `githubUrl?: string`, `thumbnail: string`
  - [x] Export `const projects: Project[]` with 4–6 real project entries (Agun's actual work)
  - [x] Each `thumbnail` value must be a path relative to `/public/`, e.g. `'/images/projects/project-name.webp'`
  - [x] Ensure at least some entries have `liveUrl` and some have `githubUrl` to demonstrate conditional rendering

- [x] Task 3: Add placeholder thumbnail images (AC: 6)
  - [x] Create directory `/public/images/projects/` if it doesn't exist
  - [x] Add a placeholder `.webp` image (or real project thumbnails) for each project in `projects.ts`
  - [x] Image naming must match the `thumbnail` values defined in `projects.ts`
  - [x] Recommended dimensions: 800×450px (16:9 aspect ratio) for consistent card layout

- [x] Task 4: Create `src/components/sections/ProjectCard.tsx` (AC: 2, 3, 4, 6, 8)
  - [x] Named export `ProjectCard`
  - [x] Props: `project: Project` (import `Project` from `@/data/projects`)
  - [x] Renders: thumbnail (`<Image />` from `next/image`), title, problem statement, stack badges, Live link (if `liveUrl`), GitHub link (if `githubUrl`)
  - [x] Use shadcn `Card`, `CardContent` from `@/components/ui/card` as the wrapping container
  - [x] Thumbnail: `<Image src={project.thumbnail} alt={project.title} fill className="object-cover" />` inside a `relative aspect-video` container
  - [x] Title: `<h3>` with `font-(family-name:--font-plus-jakarta-sans) text-xl font-semibold text-foreground`
  - [x] Problem statement: `<p className="text-sm text-muted-foreground leading-relaxed">`
  - [x] Stack badges: map `project.stack` using the existing `<SkillTag>` component from `@/components/shared/SkillTag`
  - [x] Live/GitHub links: render conditionally — `{project.liveUrl && <a href={project.liveUrl} ...>Live</a>}`
  - [x] External links must have `target="_blank" rel="noopener noreferrer"`
  - [x] Focus states on links: `focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background`
  - [x] Card hover: `motion-safe:transition-colors motion-safe:duration-150` border color change to `border-amber-400/50`
  - [x] Server Component — no `"use client"` directive (static card, no interactive state)

- [x] Task 5: Create `src/components/sections/PortfolioSection.tsx` (AC: 1, 7, 8, 9)
  - [x] Named export `PortfolioSection`
  - [x] Section `id="portfolio"` wrapped in `<section>` tag (not `<div>`)
  - [x] Import `projects` from `@/data/projects`
  - [x] Import and use `SectionHeading` from `@/components/shared/SectionHeading` with `eyebrow="PORTFOLIO"` and an appropriate title
  - [x] Import and render `ProjectCard` for each project in `projects`
  - [x] Grid layout: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`
  - [x] Section padding: `py-20 px-6 lg:px-12` with `max-w-5xl` content wrapper (wider than About's `max-w-3xl`)
  - [x] Accessibility: `aria-labelledby` pointing to the `<h2>` id inside `SectionHeading`
  - [x] Server Component — no `"use client"` directive

- [x] Task 6: Update `src/app/page.tsx` — replace `#portfolio` placeholder (AC: 1–9)
  - [x] Import `PortfolioSection` from `@/components/sections/PortfolioSection`
  - [x] Replace the `<section id="portfolio" className="min-h-screen py-20 px-6 lg:px-12" />` placeholder with `<PortfolioSection />`
  - [x] Do NOT touch any other section in `page.tsx` — only the `#portfolio` placeholder

- [x] Task 7: Build validation (AC: 1–9)
  - [x] Run `npm run lint` — exit code 0, zero warnings
  - [x] Run `npm run build` — exit code 0, `/out/` produced
  - [x] Verify Portfolio section is in `/out/index.html` (e.g., `grep "portfolio" out/index.html`)
  - [x] Verify project titles and stack tags are in static HTML output
  - [x] Manual: Keyboard tab through Portfolio section — confirm Live and GitHub links reachable

## Dev Notes

### Context: What Stories 2.1 and 2.2 Built

**These files already exist — do not recreate them:**

| File                                          | Status                    | Note                                         |
| --------------------------------------------- | ------------------------- | -------------------------------------------- |
| `src/app/page.tsx`                            | EXISTS — PARTIALLY modify | Replace only `#portfolio` placeholder        |
| `src/components/shared/SectionHeading.tsx`    | EXISTS — reuse as-is      | Created in 2.2; use for section heading      |
| `src/components/shared/SkillTag.tsx`          | EXISTS — reuse as-is      | Created in 2.2; use for project stack badges |
| `src/components/shared/AvailabilityBadge.tsx` | EXISTS — do not touch     | Used in Sidebar                              |
| `src/components/shared/Sidebar.tsx`           | EXISTS — do not touch     | Desktop/mobile nav                           |
| `src/components/sections/HeroSection.tsx`     | EXISTS — do not touch     | Story 2.1 output                             |
| `src/components/sections/AboutSection.tsx`    | EXISTS — do not touch     | Story 2.2 output                             |
| `src/lib/analytics.ts`                        | EXISTS — do not touch     | GA4 event helper                             |
| `src/types/index.ts`                          | EXISTS — do not touch     | `NavItem`, `SiteConfig` interfaces           |
| `src/data/about.ts`                           | EXISTS — do not touch     | About section data                           |
| `src/components/ui/button.tsx`                | EXISTS (shadcn)           | DO NOT EDIT                                  |
| `src/components/ui/badge.tsx`                 | EXISTS (shadcn)           | DO NOT EDIT                                  |

**Current `src/app/page.tsx` portfolio section placeholder** (this is what you are replacing in Task 6):

```tsx
<section id="portfolio" className="min-h-screen py-20 px-6 lg:px-12" />
```

### ⚠️ CRITICAL: shadcn `card` Not Yet Installed

Only `button.tsx` and `badge.tsx` currently exist in `src/components/ui/`. The `card` component must be installed before creating `ProjectCard.tsx`:

```bash
npx shadcn@latest add card
```

This adds `src/components/ui/card.tsx` with `Card`, `CardHeader`, `CardContent`, `CardFooter`, `CardTitle`, `CardDescription` exports. Use `Card` and `CardContent` for project cards.

### Architecture Compliance Rules

#### ✅ REQUIRED — Will be checked

- **Named exports only** — `export function PortfolioSection`, `export function ProjectCard`. Never `export default`.
- **No `dark:` Tailwind variants** — base styles ARE the dark theme. Use `text-foreground`, `bg-background`, `bg-card`, `border-border` etc.
- **No hardcoded hex colors** — use CSS variable token classes or Tailwind named palette. Never `text-[#f59e0b]`, use `text-amber-400`.
- **`next/image` for all thumbnails** — never raw `<img>` tag for content images.
- **Content in data file** — all project data in `src/data/projects.ts`, not hardcoded in components.
- **Server Components** — `PortfolioSection.tsx` and `ProjectCard.tsx` should NOT have `"use client"`. Static rendering, no interactive state.
- **Section tag with id** — `<section id="portfolio">` not `<div id="portfolio">`.
- **Never edit `src/components/ui/` files** — extend via `className` prop only.

#### ❌ FORBIDDEN — Anti-patterns

- `export default` on any component
- `dark:` Tailwind variants anywhere
- Raw `<img>` tags for thumbnails — must use `<Image />` from `next/image`
- Hardcoded hex colors (`text-[#f59e0b]`) — use `text-amber-400`
- `"use client"` in `PortfolioSection.tsx` or `ProjectCard.tsx`
- Editing any file in `src/components/ui/`
- Hardcoding project data directly inside component JSX

### Tailwind v4 Syntax — CRITICAL

Same rule established in Story 2.1 and confirmed in 2.2:

```tsx
// ✅ CORRECT (Tailwind v4)
className = "font-(family-name:--font-plus-jakarta-sans) text-xl font-semibold";

// ❌ WRONG (Tailwind v3 - will fail lint)
className =
  "font-[family-name:var(--font-plus-jakarta-sans)] text-xl font-semibold";
```

Only needed where Plus Jakarta Sans is explicitly required (card titles, section heading). Body text uses Inter by default.

### Motion-Safe Transitions

All micro-interactions (hover, transition) must use `motion-safe:` prefix per Story 2.1 pattern:

```tsx
// ✅ CORRECT
className = "motion-safe:transition-colors motion-safe:duration-150";

// ❌ WRONG (fails prefers-reduced-motion)
className = "transition-colors duration-150";
```

### `src/data/projects.ts` — Expected Shape

```ts
// src/data/projects.ts

export interface Project {
  id: string;
  title: string;
  description: string; // 1–2 sentence summary
  problem: string; // one-line problem statement shown on card
  stack: string[]; // array of tech names displayed as SkillTag chips
  liveUrl?: string; // optional — live deployment URL
  githubUrl?: string; // optional — GitHub repo URL
  thumbnail: string; // path relative to /public, e.g. '/images/projects/name.webp'
}

export const projects: Project[] = [
  {
    id: "project-1",
    title: "Project Name",
    description: "A brief 1–2 sentence description of the project.",
    problem: "One concise line: what problem this solved.",
    stack: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/agungunawan/project-1",
    thumbnail: "/images/projects/project-1.webp",
  },
  // ... 3–5 more projects
];
```

**Important:** Use Agun's real project portfolio. Aim for 4–6 projects. Cover a mix of React, Next.js, Webflow, HTML/CSS projects to demonstrate stack breadth.

### `ProjectCard` Component — Expected Implementation

```tsx
// src/components/sections/ProjectCard.tsx
// NO "use client" — this is a Server Component

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { SkillTag } from "@/components/shared/SkillTag";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden bg-card border-border motion-safe:transition-colors motion-safe:duration-150 hover:border-amber-400/50">
      {/* Thumbnail */}
      <div className="relative aspect-video w-full">
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      <CardContent className="p-5 space-y-3">
        {/* Title */}
        <h3 className="font-(family-name:--font-plus-jakarta-sans) text-xl font-semibold text-foreground leading-tight">
          {project.title}
        </h3>

        {/* Problem statement */}
        <p className="text-sm text-muted-foreground leading-relaxed">
          {project.problem}
        </p>

        {/* Stack badges */}
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <SkillTag key={tech} label={tech} />
          ))}
        </div>

        {/* Action links */}
        {(project.liveUrl || project.githubUrl) && (
          <div className="flex gap-3 pt-1">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-amber-400 motion-safe:transition-colors motion-safe:duration-150 hover:text-amber-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
              >
                Live ↗
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-muted-foreground motion-safe:transition-colors motion-safe:duration-150 hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
              >
                GitHub ↗
              </a>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
```

### `PortfolioSection` Component — Expected Implementation

```tsx
// src/components/sections/PortfolioSection.tsx
// NO "use client" — this is a Server Component

import { projects } from "@/data/projects";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ProjectCard } from "@/components/sections/ProjectCard";

export function PortfolioSection() {
  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-heading"
      className="py-20 px-6 lg:px-12"
    >
      <div className="max-w-5xl">
        <SectionHeading
          eyebrow="PORTFOLIO"
          title="Selected Work"
          description="A selection of projects that demonstrate my approach to building fast, accessible web products."
          id="portfolio-heading"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

### `next/image` Configuration Note

If project thumbnails are in `/public/images/projects/`, they are served from the same origin — no additional domain configuration in `next.config.ts` is needed for local static files. The `fill` prop plus `sizes` attribute is the correct pattern for responsive card thumbnails inside a CSS Grid layout.

### `page.tsx` After This Story

The only change to `page.tsx` is replacing the Portfolio placeholder. Final state:

```tsx
// BEFORE (story 2.1 output):
<section
  id="portfolio"
  className="min-h-screen py-20 px-6 lg:px-12"
/>

// AFTER (this story):
<PortfolioSection />
```

Full import line to add at top of `page.tsx`:

```tsx
import { PortfolioSection } from "@/components/sections/PortfolioSection";
```

### Color Token Reference — This Story

| Usage                         | Tailwind class              | Token                        |
| ----------------------------- | --------------------------- | ---------------------------- |
| Page background               | `bg-background`             | `#0f172a` (slate-950)        |
| Card background               | `bg-card`                   | `#1e293b` (slate-800)        |
| Card border (default)         | `border-border`             | `#334155` (slate-700)        |
| Card border (hover accent)    | `hover:border-amber-400/50` | amber-400 at 50% opacity     |
| Primary text                  | `text-foreground`           | `#f1f5f9` (slate-100)        |
| Secondary text (problem stmt) | `text-muted-foreground`     | `#94a3b8` (slate-400)        |
| Live link accent              | `text-amber-400`            | `#f59e0b`                    |
| GitHub link                   | `text-muted-foreground`     | `#94a3b8` (slate-400)        |
| Skill tag (from SkillTag)     | See SkillTag component      | amber-950 bg, amber-400 text |
| Focus ring                    | `ring-amber-400`            | `#f59e0b`                    |

### UX Intent — Portfolio Section (Emotional Target: Recognition)

From the UX specification:

> "Recognition — 'this person gets my domain'"

Each project card must enable a technical visitor to pattern-match to their own situation within a 10-second scan.

Key UX principles for this section:

- **Problem-led cards** — one-line problem statement elevates the portfolio from gallery to proof of impact
- **Stack clarity** — `SkillTag` chips make tech stack immediately scannable (recruiter confirms fit in 2 seconds)
- **Progressive disclosure** — all key info visible at rest; hover adds amber border accent for polish
- **No click-to-expand** — all information visible in the card without interaction
- **Max 6 projects at MVP** — curator's selection > exhaustive list; quality > quantity

### Key File Locations

| File                                           | Status                    | Action                                        |
| ---------------------------------------------- | ------------------------- | --------------------------------------------- |
| `src/components/ui/card.tsx`                   | DOES NOT EXIST — INSTALL  | `npx shadcn@latest add card`                  |
| `src/data/projects.ts`                         | DOES NOT EXIST — CREATE   | `Project` interface + `projects` const        |
| `public/images/projects/`                      | DOES NOT EXIST — CREATE   | Directory + `.webp` thumbnail images          |
| `src/components/sections/ProjectCard.tsx`      | DOES NOT EXIST — CREATE   | Single project card component                 |
| `src/components/sections/PortfolioSection.tsx` | DOES NOT EXIST — CREATE   | Portfolio section with project grid           |
| `src/app/page.tsx`                             | EXISTS — PARTIALLY MODIFY | Replace `#portfolio` placeholder only         |
| `src/components/shared/SectionHeading.tsx`     | EXISTS — reuse            | Import and use — do not modify                |
| `src/components/shared/SkillTag.tsx`           | EXISTS — reuse            | Import and use in ProjectCard — do not modify |

### Project Structure Additions This Story

```
src/
├── app/
│   └── page.tsx                          ← MODIFY: replace #portfolio placeholder
├── components/
│   ├── sections/
│   │   ├── ProjectCard.tsx               ← CREATE (FR9–11)
│   │   └── PortfolioSection.tsx          ← CREATE (FR8–11, FR26–27)
│   └── ui/
│       └── card.tsx                      ← INSTALL via shadcn
└── data/
    └── projects.ts                       ← CREATE (FR8–11 data source)

public/
└── images/
    └── projects/                         ← CREATE directory
        ├── project-1.webp               ← CREATE thumbnails (one per project)
        └── ...
```

### References

- Story requirements (AC source): [planning-artifacts/epics.md — Story 2.3](../_bmad-output/planning-artifacts/epics.md)
- FR coverage: FR8, FR9, FR10, FR11, FR26, FR27 [Source: planning-artifacts/epics.md#FR-Coverage-Map]
- Portfolio grid layout: [Source: planning-artifacts/ux-design-specification.md#Spacing-Layout-Foundation]
- Card hover UX: [Source: planning-artifacts/ux-design-specification.md#Experience-Mechanics]
- Problem-led cards rationale: [Source: planning-artifacts/ux-design-specification.md#Transferable-UX-Patterns]
- Portfolio emotional target (Recognition): [Source: planning-artifacts/ux-design-specification.md#Emotional-Journey-Mapping]
- Color system: [Source: planning-artifacts/ux-design-specification.md#Color-System]
- Typography system (card title H3 = text-xl/600): [Source: planning-artifacts/ux-design-specification.md#Typography-System]
- `Project` interface pattern (id, title, problem, stack, liveUrl, githubUrl, thumbnail): [Source: planning-artifacts/architecture.md#Format-Patterns]
- Architecture naming + export rules: [Source: planning-artifacts/architecture.md#Naming-Patterns]
- Architecture directory structure: [Source: planning-artifacts/architecture.md#Complete-Project-Directory-Structure]
- Data file pattern (`src/data/projects.ts`): [Source: planning-artifacts/architecture.md#Data-Architecture]
- `next/image` usage rule: [Source: planning-artifacts/architecture.md#Image-Usage]
- Anti-patterns list: [Source: planning-artifacts/architecture.md#Enforcement-Guidelines]
- Previous story dev notes (Tailwind v4 syntax, motion-safe, SkillTag pattern): [Source: implementation-artifacts/2-2-about-section.md#Dev-Notes]
- `SectionHeading` and `SkillTag` already exist: [Source: implementation-artifacts/2-2-about-section.md#File-List]
- content width `max-w-5xl` for portfolio (wider than About's `max-w-3xl`): [Source: planning-artifacts/ux-design-specification.md#Spacing-Layout-Foundation]

## Dev Agent Record

### Agent Model Used

Claude Sonnet 4.6 (GitHub Copilot)

### Debug Log References

N/A

### Completion Notes List

- Task 1: `npx shadcn@latest add card` installed `src/components/ui/card.tsx` — not modified.
- Task 2: `src/data/projects.ts` created with `Project` interface and 6 projects covering React, Next.js, Webflow, TypeScript, and component library work. Mix of `liveUrl`-only, `githubUrl`-only, and both.
- Task 3: Placeholder `.webp` files (minimal valid WebP binary) created for all 6 projects in `public/images/projects/`. Real thumbnails should replace these before production.
- Task 4: `ProjectCard.tsx` — named export, Server Component, shadcn `Card`+`CardContent`, `next/image` fill pattern, `SkillTag`, conditional Live/GitHub links with `noopener noreferrer`, motion-safe hover, amber focus rings.
- Task 5: `PortfolioSection.tsx` — named export, Server Component, `<section id="portfolio">`, `aria-labelledby="portfolio-heading"`, `SectionHeading`, responsive `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`, `max-w-5xl` wrapper.
- Task 6: `page.tsx` — added `PortfolioSection` import, replaced `<section id="portfolio" .../>` placeholder with `<PortfolioSection />`. No other sections touched.
- Task 7: `eslint` — exit 0, zero warnings. `next build` — exit 0, static `/out/` produced. All 6 project titles and `id="portfolio"` confirmed in `/out/index.html`.

### File List

- `src/components/ui/card.tsx` — INSTALLED (shadcn, do not edit)
- `src/data/projects.ts` — CREATED
- `src/components/sections/ProjectCard.tsx` — CREATED
- `src/components/sections/PortfolioSection.tsx` — CREATED
- `src/app/page.tsx` — MODIFIED (PortfolioSection import + placeholder replaced)
- `public/images/projects/bmad-portfolio.webp` — CREATED (placeholder)
- `public/images/projects/ecommerce-dashboard.webp` — CREATED (placeholder)
- `public/images/projects/landing-page-builder.webp` — CREATED (placeholder)
- `public/images/projects/task-management-app.webp` — CREATED (placeholder)
- `public/images/projects/weather-app.webp` — CREATED (placeholder)
- `public/images/projects/component-library.webp` — CREATED (placeholder)
