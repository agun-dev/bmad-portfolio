# Story 2.4: CV Download Integration

Status: done

## Story

As a visitor,
I want to download Agun's CV via a prominent, always-accessible download button,
so that I can review his full work history and forward it to relevant decision-makers.

## Acceptance Criteria

1. **Given** I am on the page  
   **When** the hero section loads  
   **Then** a "Download CV" button is visible in the hero CTA row above the fold on all viewport sizes

2. **Given** I click the "Download CV" button  
   **When** the click fires  
   **Then** the browser downloads or opens `/cv.pdf` — a stable, CDN-served PDF  
   **And** the download attribute ensures the browser treats it as a file download, not navigation

3. **Given** the download link is implemented  
   **When** I inspect its `href`  
   **Then** it always resolves to `/cv.pdf` — never a dynamic, versioned, or external URL  
   **And** when Agun replaces `/public/cv.pdf`, all existing download buttons immediately serve the new version without any URL change

4. **Given** I click the "Download CV" button  
   **When** the click fires  
   **Then** `trackEvent('cv_download', { method: 'button_click' })` is called via `src/lib/analytics.ts`  
   **And** `gtag()` is never called directly in any component

5. **Given** the "Download CV" button is rendered  
   **When** I navigate via keyboard (Tab)  
   **Then** the button is reachable with a visible focus ring (`focus-visible:ring-2 focus-visible:ring-amber-400`)

6. **Given** JavaScript is disabled  
   **When** the page renders  
   **Then** the "Download CV" `<a href="/cv.pdf" download>` link is present in static HTML and functional (analytics tracking is a progressive enhancement — no JS required for the download itself)

7. **Given** the build runs  
   **When** `npm run build` completes  
   **Then** exit code is 0, `/out/` is produced, and "Download CV" is present in `/out/index.html`

## Tasks / Subtasks

- [x] Task 1: Add placeholder `/public/cv.pdf` (AC: 2, 3, 6)
  - [x] Create a minimal valid PDF placeholder at `/public/cv.pdf` (will be replaced by Agun's real CV before launch)
  - [x] File must be at exactly `/public/cv.pdf` — no subdirectory, no versioned filename
  - [x] Do NOT add any dynamic path logic — the path is always `/cv.pdf`

- [x] Task 2: Create `src/components/shared/CVDownloadButton.tsx` (AC: 2, 4, 5, 6)
  - [x] Add `"use client"` directive — required for `onClick` analytics handler
  - [x] Named export `CVDownloadButton` (no `export default`)
  - [x] No props required — button is self-contained (href always `/cv.pdf`, label always "Download CV")
  - [x] Render as `<a href="/cv.pdf" download>Download CV</a>` — use `<a>` not `<button>` (it is a navigation/download, not a form action)
  - [x] `download` attribute on the `<a>` tag triggers browser file download behavior
  - [x] `onClick` handler calls `trackEvent('cv_download', { method: 'button_click' })` from `@/lib/analytics`
  - [x] Styling (primary amber button, matching hero CTA style):
    ```
    inline-flex items-center gap-2 rounded-lg bg-amber-400 px-6 py-3 font-bold text-black
    motion-safe:transition-colors motion-safe:duration-150 hover:bg-amber-500
    focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400
    focus-visible:ring-offset-2 focus-visible:ring-offset-background
    ```
  - [x] Include a small download arrow icon — use an inline SVG `↓` character or a simple `⬇` Unicode symbol to avoid adding an icon library dependency
  - [x] No `dark:` Tailwind variants — dark theme is the base
  - [x] No hardcoded hex colors — use `bg-amber-400`, `text-black`, `ring-amber-400` only

- [x] Task 3: Update `src/components/sections/HeroSection.tsx` (AC: 1, 5, 6)
  - [x] Import `CVDownloadButton` from `@/components/shared/CVDownloadButton`
  - [x] In the CTA `<div className="flex flex-wrap gap-4">`, replace the current primary amber `<a>` with `<CVDownloadButton />`
  - [x] Current hero CTAs: `"Get in Touch"` (amber primary) + `"View Projects"` (border secondary)
  - [x] **After this story**, hero CTAs should be: `<CVDownloadButton />` (amber primary) + `"Get in Touch"` (border secondary, `href="#contact"`) + `"View Projects"` (border secondary, `href="#portfolio"`)
  - [x] Do NOT change any other content in `HeroSection.tsx` — only the CTA row
  - [x] `HeroSection.tsx` itself remains a Server Component — `CVDownloadButton` is the only client boundary
  - [x] `"Get in Touch"` retains its existing `href="#contact"` and current styling

- [x] Task 4: Build validation (AC: 1–7)
  - [x] Run `npm run lint` — exit code 0, zero warnings
  - [x] Run `npm run build` — exit code 0, `/out/` produced
  - [x] Verify `href="/cv.pdf"` is present in `/out/index.html`
  - [x] Verify "Download CV" text is present in `/out/index.html`

## Dev Notes

### Context: What Previous Stories Built

**These files already exist — do not recreate or needlessly touch:**

| File                                           | Status                         | Note                                              |
| ---------------------------------------------- | ------------------------------ | ------------------------------------------------- |
| `src/app/page.tsx`                             | EXISTS — do not touch          | Imports all sections                              |
| `src/components/sections/HeroSection.tsx`      | EXISTS — modify CTA row only   | Story 2.1 output; contains name, title, bio, CTAs |
| `src/components/sections/AboutSection.tsx`     | EXISTS — do not touch          | Story 2.2 output                                  |
| `src/components/sections/PortfolioSection.tsx` | EXISTS — do not touch          | Story 2.3 output                                  |
| `src/components/sections/ProjectCard.tsx`      | EXISTS — do not touch          | Story 2.3 output                                  |
| `src/components/shared/SectionHeading.tsx`     | EXISTS — do not touch          | Story 2.2 output                                  |
| `src/components/shared/SkillTag.tsx`           | EXISTS — do not touch          | Story 2.2 output                                  |
| `src/lib/analytics.ts`                         | EXISTS — do not touch          | `trackEvent()` helper; use as-is                  |
| `src/data/projects.ts`                         | EXISTS — do not touch          | Story 2.3 output                                  |
| `src/data/about.ts`                            | EXISTS — do not touch          | Story 2.2 output                                  |
| `src/components/ui/button.tsx`                 | EXISTS (shadcn) — do not touch | Shadcn button; NOT used for CV download           |
| `src/components/ui/card.tsx`                   | EXISTS (shadcn) — do not touch | Story 2.3 output                                  |

### Current `HeroSection.tsx` CTA Row (what you are modifying in Task 3)

```tsx
{
  /* CTA buttons */
}
<div className="flex flex-wrap gap-4">
  <a
    href="#contact"
    className="inline-flex items-center justify-center rounded-lg bg-amber-400 px-6 py-3 font-bold text-black motion-safe:transition-colors motion-safe:duration-150 hover:bg-amber-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
  >
    Get in Touch
  </a>
  <a
    href="#portfolio"
    className="inline-flex items-center justify-center rounded-lg border border-slate-700 px-6 py-3 font-semibold text-muted-foreground motion-safe:transition-colors motion-safe:duration-150 hover:border-slate-500 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
  >
    View Projects
  </a>
</div>;
```

**After Task 3, the CTA row should be:**

```tsx
{
  /* CTA buttons */
}
<div className="flex flex-wrap gap-4">
  <CVDownloadButton />
  <a
    href="#contact"
    className="inline-flex items-center justify-center rounded-lg border border-slate-700 px-6 py-3 font-semibold text-muted-foreground motion-safe:transition-colors motion-safe:duration-150 hover:border-slate-500 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
  >
    Get in Touch
  </a>
  <a
    href="#portfolio"
    className="inline-flex items-center justify-center rounded-lg border border-slate-700 px-6 py-3 font-semibold text-muted-foreground motion-safe:transition-colors motion-safe:duration-150 hover:border-slate-500 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
  >
    View Projects
  </a>
</div>;
```

### `CVDownloadButton` — Expected Implementation

```tsx
// src/components/shared/CVDownloadButton.tsx
"use client";

import { trackEvent } from "@/lib/analytics";

export function CVDownloadButton() {
  return (
    <a
      href="/cv.pdf"
      download
      onClick={() => trackEvent("cv_download", { method: "button_click" })}
      className="inline-flex items-center gap-2 rounded-lg bg-amber-400 px-6 py-3 font-bold text-black motion-safe:transition-colors motion-safe:duration-150 hover:bg-amber-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      Download CV ↓
    </a>
  );
}
```

### Why `"use client"` Here

`CVDownloadButton` uses `onClick` for analytics tracking. The `trackEvent()` call checks `typeof window !== "undefined"` internally (safe), but `onClick` itself is a browser event — it cannot exist in a Server Component. Therefore:

- `CVDownloadButton.tsx` → `"use client"` ✅
- `HeroSection.tsx` → remains a Server Component (no `"use client"`) ✅
- Server Components can render Client Components — the client boundary is scoped to `CVDownloadButton` only.

### Analytics Pattern — CRITICAL

```ts
// ✅ CORRECT — always via analytics.ts
import { trackEvent } from "@/lib/analytics";
trackEvent("cv_download", { method: "button_click" });

// ❌ FORBIDDEN — never call gtag() directly
window.gtag("event", "cv_download", { method: "button_click" });
```

### Architecture Compliance Rules

#### ✅ REQUIRED

- **Named exports only** — `export function CVDownloadButton`. Never `export default`.
- **`<a>` not `<button>`** — CV download is navigation/download, not a form action. Use `<a href="/cv.pdf" download>`.
- **`download` attribute** — Required on the `<a>` tag to trigger browser file download behavior.
- **Stable URL** — Always `/cv.pdf`. Never versioned (`/cv-2025.pdf`), never external (`https://...`).
- **Analytics via `trackEvent()`** — Import from `@/lib/analytics`. Never call `gtag()` directly.
- **`"use client"` on CVDownloadButton** — Required for `onClick`. Scope client boundary tightly.
- **No `dark:` variants** — base styles ARE the dark theme.
- **No hardcoded hex colors** — `bg-amber-400`, `text-black`, `ring-amber-400`.

#### ❌ FORBIDDEN

- `export default` on any component
- `<button onClick>` instead of `<a href download>` for CV download
- `window.gtag()` called directly in any component
- Versioned or externally-hosted CV URL
- `dark:` Tailwind variants

### Tailwind v4 Syntax Reminder

```tsx
// ✅ CORRECT (Tailwind v4 — only needed where Plus Jakarta Sans is explicit)
className = "font-(family-name:--font-plus-jakarta-sans) text-xl font-semibold";

// ❌ WRONG (Tailwind v3)
className =
  "font-[family-name:var(--font-plus-jakarta-sans)] text-xl font-semibold";
```

`CVDownloadButton` uses Inter (default body font) — no explicit `font-(family-name:...)` needed.

### `/public/cv.pdf` — Placeholder Note

A minimal placeholder PDF must exist at `/public/cv.pdf` for the build and link to work. Agun will replace this with his real CV before going live. The placeholder just needs to be a valid PDF — it does not need to contain any real content.

### Color Token Reference

| Usage                 | Tailwind class       | Token                 |
| --------------------- | -------------------- | --------------------- |
| CV button background  | `bg-amber-400`       | `#f59e0b`             |
| CV button hover       | `hover:bg-amber-500` | `#f59e0b` → `#d97706` |
| CV button text        | `text-black`         | `#000000`             |
| Focus ring            | `ring-amber-400`     | `#f59e0b`             |
| Hero secondary border | `border-slate-700`   | `#334155`             |

### References

- CV download architecture: [Source: planning-artifacts/architecture.md#Process-Patterns]
- Analytics enforcement: [Source: planning-artifacts/architecture.md#Enforcement-Guidelines]
- CV download AC: [Source: planning-artifacts/epics.md#Story-2.4-CV-Download-Integration]
- FR12–FR14: [Source: planning-artifacts/prd.md#CV-Access]
- CVDownloadButton always visible above fold: [Source: planning-artifacts/ux-design-specification.md#Effortless-Interactions]
- `trackEvent('cv_download', { method: 'button_click' })`: [Source: planning-artifacts/architecture.md#GA4-Event-Tracking]

## Dev Agent Record

### Agent Model Used

Claude Sonnet 4.6 (GitHub Copilot)

### Debug Log References

N/A

### Completion Notes List

- Task 1: Minimal valid PDF placeholder created at `public/cv.pdf` via Node.js script. Replace with real CV before launch.
- Task 2: `CVDownloadButton.tsx` created — `"use client"`, named export, `<a href="/cv.pdf" download>`, `trackEvent('cv_download', { method: 'button_click' })` on click, amber primary button styling with `motion-safe:` transitions and focus ring.
- Task 3: `HeroSection.tsx` updated — added `CVDownloadButton` import, replaced primary amber `<a href="#contact">Get in Touch</a>` CTA with `<CVDownloadButton />`, demoted "Get in Touch" to border secondary style. `HeroSection` remains a Server Component.
- Task 4: `eslint` — exit 0, zero errors. `next build` — exit 0, `/out/` produced. Both `href="/cv.pdf"` and "Download CV" confirmed in `/out/index.html`.
- Code review fixes (post-review): M1+M2: Added `className?: string` prop to `CVDownloadButton`; replaced local private `CvDownloadButton` in `Sidebar.tsx` with shared `CVDownloadButton`; removed redundant `trackEvent` import from `Sidebar.tsx`. L1: Wrapped `↓` arrow in `<span aria-hidden="true">` to prevent screen reader announcement. L2: Standardised hero secondary button focus handling from `focus-visible:outline-none` to `focus:outline-none` for consistency with `CVDownloadButton`. Build re-confirmed passing.

### File List

- `public/cv.pdf` — CREATED (placeholder; replace with real CV before launch)
- `src/components/shared/CVDownloadButton.tsx` — CREATED
- `src/components/sections/HeroSection.tsx` — MODIFIED (CTA row + secondary button focus classes)
- `src/components/shared/Sidebar.tsx` — MODIFIED (replaced local CvDownloadButton with shared CVDownloadButton; removed trackEvent import)
