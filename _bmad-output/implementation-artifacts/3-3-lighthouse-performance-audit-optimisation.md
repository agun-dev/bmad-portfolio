# Story 3.3: Lighthouse Performance Audit & Optimisation

Status: ready-for-dev

## Story

As the site owner,
I want the site to achieve Lighthouse Performance scores of 90+ desktop / 80+ mobile,
So that the site meets the technical success criteria and performs well for all visitors.

## Acceptance Criteria

1. **Given** the site is deployed to Netlify production  
   **When** a Lighthouse audit is run in Chrome DevTools on the production URL  
   **Then** Performance score is 90+ on desktop  
   **And** Performance score is 80+ on mobile

2. **Given** Lighthouse runs on the production URL  
   **When** the Core Web Vitals are measured  
   **Then** LCP is ≤ 2.5 seconds  
   **And** FCP is ≤ 2 seconds

3. **Given** project thumbnail images are rendered  
   **When** inspected in the Lighthouse audit  
   **Then** all images are served as WebP format  
   **And** `next/image` with `fill` + `sizes` is used for all thumbnails  
   **And** images are lazy-loaded (below the fold)

4. **Given** fonts are loaded  
   **When** inspected in the Lighthouse audit  
   **Then** no layout shift (CLS) is caused by font loading  
   **And** fonts are loaded via `next/font` with `display: "swap"`

5. **Given** the GA4 analytics script is present  
   **When** Lighthouse runs  
   **Then** the analytics script does not contribute to LCP or blocking time  
   **And** `<Script strategy="afterInteractive">` defers loading until after page is interactive

6. **Given** Lighthouse scores are below target on any run  
   **When** optimisations are identified  
   **Then** identified changes are implemented and the audit is re-run until targets are met

## Tasks / Subtasks

- [ ] Task 1: Pre-Lighthouse code audit — verify all performance patterns are in place (AC: 3, 4, 5)
  - [ ] Confirm `next.config.ts` has `images: { unoptimized: true }` — **this is correct and required** for `output: "export"`; Next.js image server-side optimization is incompatible with static export. All thumbnails are already WebP — this is the correct architecture.
  - [ ] Confirm `ProjectCard.tsx` uses `<Image fill sizes="..." />` for all thumbnails ✅
  - [ ] Confirm all thumbnail files are WebP format: `public/images/projects/*.webp` ✅
  - [ ] Confirm `layout.tsx` fonts all use `display: "swap"` ✅ (Inter, Plus Jakarta Sans, JetBrains Mono)
  - [ ] Confirm GA4 `<Script strategy="afterInteractive">` is in `layout.tsx` ✅ (added Story 3.1)
  - [ ] Confirm **no** `<script>` or `<link rel="stylesheet">` tags that could block rendering
  - [ ] Confirm hero section has NO above-fold images — the LCP candidate is the `<h1>` text element, which renders instantly from static HTML ✅
  - [ ] Confirm `next/font` variables are applied on `<body>` via `className` ✅
  - [ ] **No code changes expected from this task** — if any pattern is wrong, fix it before proceeding

- [ ] Task 2: Verify thumbnail image sizes are acceptable for performance (AC: 3)
  - [ ] Audit `/public/images/projects/` file sizes:
    - `placeholder.webp` — 5.5K ✅ (used by 6/8 projects currently)
    - `knb.webp` — 24K ✅
    - `boatdeck.webp` — 134K ⚠️ large — but currently NOT referenced in `projects.ts`
    - `eddempsey.webp` — 82K, `gumtree.webp` — 58K, `nobelrea.webp` — 63K, `sweeneyea.webp` — 97K, `teskacarson.webp` — 38K — all unreferenced in `projects.ts` currently
  - [ ] Currently referenced thumbnails: `placeholder.webp` (5.5K × 6) + `knb.webp` (24K × 1) = ~57K total image payload ✅ excellent
  - [ ] **If Agun updates `projects.ts` to reference real thumbnails before launch**, `boatdeck.webp` (134K) should be compressed to ≤ 80K. All others are acceptable.
  - [ ] **No code changes needed for current state** — document this as pre-launch action item

- [ ] Task 3: Add `loading="eager"` / `priority` guard for first project card (optional micro-optimisation) (AC: 3)
  - [ ] Assess: portfolio section is below the fold — the first project card image is NOT in the initial viewport
  - [ ] `next/image` with `fill` defaults to `loading="lazy"` unless `priority` is set — this is **correct behaviour** for below-fold images ✅
  - [ ] **No change needed** — lazy loading for portfolio images is the right call. Do not add `priority`.

- [ ] Task 4: Run Lighthouse audit on production Netlify URL (AC: 1, 2)
  - [ ] Deploy latest `main` branch to Netlify (or confirm current production deploy is up to date)
  - [ ] Open Chrome DevTools → Lighthouse tab → select "Performance" category → **Mobile** device preset → click "Analyze page load"
  - [ ] Record scores: Performance, LCP, FCP, TBT, CLS, Speed Index
  - [ ] Repeat with **Desktop** device preset
  - [ ] Record all six scores for both Mobile and Desktop in the Completion Notes section below
  - [ ] **Target:** Desktop ≥ 90, Mobile ≥ 80, LCP ≤ 2.5s, FCP ≤ 2.0s
  - [ ] ⚠️ Run Lighthouse in incognito mode with all extensions disabled (including GA4 blocker) for accurate results

- [ ] Task 5: Implement optimisations if scores are below target (AC: 6)
  - [ ] If scores pass → skip this task, mark complete
  - [ ] If **desktop < 90** → check TBT (Total Blocking Time) for JS bundle issues; check render-blocking resources
  - [ ] If **mobile < 80** → most likely cause is JS bundle size or image payload; check Lighthouse "Opportunities" section
  - [ ] If **LCP > 2.5s** → investigate what element Lighthouse identifies as LCP; expected candidate is the `<h1>` text (very fast); if it's an image, add `priority` to that `<Image>` component
  - [ ] If **FCP > 2.0s** → check for render-blocking CSS or font loading issues; unlikely given `display: "swap"` and Tailwind static CSS
  - [ ] If **CLS > 0.1** → most likely fonts or images without reserved space; check `aspect-video` wrapper on ProjectCard thumbnails
  - [ ] Specific fix options:
    - **Bundle too large**: Run `ANALYZE=true npm run build` with `@next/bundle-analyzer` to identify large modules (install only if needed)
    - **Images too large**: Compress any referenced thumbnails > 80K with `cwebp -q 80` (requires cwebp CLI)
    - **Font CLS**: Already mitigated by `next/font` + `display: "swap"` — unlikely to need changes
    - **GA4 blocking**: Already using `afterInteractive` — if Lighthouse still flags it, it's a false positive on static HTML

- [ ] Task 6: Re-run Lighthouse after optimisations (AC: 6)
  - [ ] Only required if Task 5 changes were made
  - [ ] Confirm Desktop ≥ 90, Mobile ≥ 80, LCP ≤ 2.5s, FCP ≤ 2.0s
  - [ ] Record final scores in Completion Notes

- [ ] Task 7: Build validation
  - [ ] Run `npm run lint` — exit code 0, zero warnings
  - [ ] Run `npm run build` — exit code 0, `/out/` produced

## Dev Notes

### Why `images: { unoptimized: true }` Is Correct (Not a Bug)

`next.config.ts` sets `output: "export"` (static site generation). **Next.js image optimisation requires a server runtime** (a Node.js process to serve `/_next/image` resized responses). Static export produces plain files with no server — so `unoptimized: true` is mandatory.

This is **not a performance regression** because:

1. All thumbnails are already WebP format (correct format, modern compression)
2. `sizes="(max-width: 640px) 100vw, ..."` is set — browsers use it for `<source srcset>` hints, but since images are unoptimized, browsers will load the single source file
3. The thumbnails are already small (5.5K placeholder, 24K knb.webp) — no server resize needed
4. If Agun needs responsive srcset without a server, the option is to pre-generate multiple sizes offline and serve them from `/public/` directly

**Do NOT remove `unoptimized: true`** — doing so would break the build for static export.

---

### LCP Candidate Analysis

The LCP (Largest Contentful Paint) element is typically the largest visible element in the initial viewport. For this site:

- **Hero section** is the above-fold content — it contains only text (no images)
- The `<h1>` tag ("Agun Gunawan") is the likely LCP candidate — it's the largest text block in the initial viewport
- Text in static HTML renders as soon as the CSS is parsed — expected LCP well under 1s on desktop, under 2s on mobile with good hosting

If Lighthouse reports an unexpected LCP element, investigate and add `priority` to that element if it's an `<Image>`, or check for any large layout changes in the hero.

---

### Expected Lighthouse Scores (Pre-Audit Estimate)

Based on the architecture:

- **No above-fold images** → excellent FCP and LCP
- **Tailwind v4 purged CSS** → minimal CSS bundle
- **Static HTML** → no SSR hydration delays
- **GA4 deferred** → no script blocking
- **No third-party fonts blocking** (`next/font` inlines CSS)

**Realistic expectation:** Desktop 95+, Mobile 85+. If mobile falls below 80, the most likely cause is JavaScript bundle size for the client components (Sidebar, ContactSection, CVDownloadButton).

---

### Thumbnail File Sizes (Current State)

| File               | Size | Referenced in `projects.ts`           |
| ------------------ | ---- | ------------------------------------- |
| `placeholder.webp` | 5.5K | Yes (6 projects)                      |
| `knb.webp`         | 24K  | Yes (Kay & Burton)                    |
| `gumtree.webp`     | 58K  | No — unreferenced                     |
| `nobelrea.webp`    | 63K  | No — unreferenced                     |
| `teskacarson.webp` | 38K  | No — unreferenced                     |
| `eddempsey.webp`   | 82K  | No — unreferenced                     |
| `sweeneyea.webp`   | 97K  | No — unreferenced                     |
| `boatdeck.webp`    | 134K | No — unreferenced ⚠️ compress if used |

When Agun updates `projects.ts` to reference real thumbnails, compress any > 80K before referencing them. Target ≤ 60K per thumbnail.

---

### Lighthouse Run Instructions (Task 4)

1. Open the live Netlify URL in **Chrome** (not Firefox/Safari — Lighthouse is Chrome-only)
2. Open DevTools (`F12`) → **Lighthouse** tab
3. Uncheck all categories except **Performance**
4. Select **Mobile** → click **Analyze page load**
5. Wait for results (1–2 min)
6. Screenshot or note: Performance score, LCP, FCP, TBT, CLS, Speed Index
7. Repeat steps 3–6 with **Desktop** selected

**Run in incognito with extensions disabled** to avoid interference from ad blockers, GA blockers, etc.

---

### Previous Story Learnings

- Story 3.2: All images already WebP ✅; `next/image` with `fill` + `sizes` confirmed ✅
- Story 3.1: GA4 `afterInteractive` confirmed non-blocking ✅
- Story 2.4: CV download uses `<a href="/cv.pdf" download>` — PDF not included in `/public/` yet (placeholder); this does not affect Lighthouse performance score

---

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 3.3]
- [Source: _bmad-output/planning-artifacts/architecture.md#Performance]
- [Source: next.config.ts]
- [Source: src/components/sections/ProjectCard.tsx]
- [Source: src/app/layout.tsx]
- [Source: src/data/projects.ts]

## Dev Agent Record

### Agent Model Used

Claude Sonnet 4.6 (GitHub Copilot)

### Debug Log References

### Completion Notes List

_Record Lighthouse scores here after Task 4:_

| Metric      | Desktop | Mobile | Target      |
| ----------- | ------- | ------ | ----------- |
| Performance | —       | —      | ≥ 90 / ≥ 80 |
| LCP         | —       | —      | ≤ 2.5s      |
| FCP         | —       | —      | ≤ 2.0s      |
| TBT         | —       | —      | —           |
| CLS         | —       | —      | ≤ 0.1       |

### File List
