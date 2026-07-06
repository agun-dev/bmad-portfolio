# Story 2.6: Footer with Social Links

Status: done

## Story

As a visitor,
I want to see a site footer with LinkedIn, email links, and copyright information,
so that I have multiple ways to connect with Agun and can verify the site's credibility.

## Acceptance Criteria

1. **Given** I scroll to the bottom of the page  
   **When** the footer renders  
   **Then** a LinkedIn profile link is visible and navigates to Agun's LinkedIn profile (opens in a new tab)

2. **Given** I am at the bottom of the page  
   **When** I look at the footer  
   **Then** an email link is present using `mailto:` so clicking it opens the visitor's email client  
   **And** Agun's raw email address is not displayed as visible text (the link label is "Email" or uses an icon)

3. **Given** I scroll to the bottom of the page  
   **When** the footer renders  
   **Then** copyright information is displayed showing the current year and Agun's name (e.g., "© 2026 Agun Gunawan. All rights reserved.")

4. **Given** the footer is visible  
   **When** I navigate using only the keyboard (Tab key)  
   **Then** both the LinkedIn and email links are reachable and show a visible amber focus ring (`focus-visible:ring-2 focus-visible:ring-amber-400`)

5. **Given** the footer renders  
   **When** viewed on mobile, tablet, or desktop  
   **Then** the layout is responsive and visually consistent with the site's dark theme  
   **And** no `dark:` Tailwind variants are used — base styles are the dark theme

6. **Given** the build runs  
   **When** `npm run build` completes  
   **Then** exit code is 0, `/out/` is produced  
   **And** the `<footer>` element is present in `/out/index.html`

## Tasks / Subtasks

- [x] Task 1: Create `src/components/sections/Footer.tsx` (AC: 1–5)
  - [x] Named export `Footer` — no `export default`, no `"use client"` (Server Component — no browser state needed)
  - [x] Use `<footer>` semantic HTML element as the root (not `<section>` or `<div>`)
  - [x] Compute copyright year at build time: `const year = new Date().getFullYear()`
  - [x] LinkedIn link:
    - `href="https://linkedin.com/in/agun-awan"` ⚠️ placeholder — matches `layout.tsx`; replace before launch
    - `target="_blank"` + `rel="noopener noreferrer"` (external link security)
    - `aria-label="Agun Gunawan's LinkedIn profile (opens in new tab)"`
    - Use `Linkedin` icon from `lucide-react` (already installed — no new dependency)
    - Visible label text: "LinkedIn" alongside the icon
  - [x] Email link:
    - `href="mailto:hello@agungunawan.dev"` ⚠️ placeholder — replace with actual email before launch
    - `aria-label="Send an email to Agun Gunawan"`
    - Use `Mail` icon from `lucide-react` (already installed)
    - Visible label text: "Email" alongside the icon (raw email address NOT in visible text — AC 2)
  - [x] Copyright text: `© {year} Agun Gunawan. All rights reserved.`
  - [x] All links styling (both LinkedIn and email):
    ```
    inline-flex items-center gap-2 text-sm text-muted-foreground
    hover:text-amber-400 motion-safe:transition-colors motion-safe:duration-150
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400
    focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded
    ```
  - [x] Footer layout: `py-8 px-6 lg:px-12 border-t border-border`
  - [x] Inner layout: flex row on sm+, stacked on mobile; copyright left, links right (or centered on mobile)
    - `flex flex-col sm:flex-row items-center justify-between gap-4`
  - [x] Copyright text styling: `text-sm text-muted-foreground`
  - [x] Links row: `flex items-center gap-6`
  - [x] No `dark:` Tailwind variants — dark theme is the base
  - [x] No hardcoded hex colors — use CSS token classes only (`text-muted-foreground`, `text-amber-400`, `border-border`)
  - [x] Icons: `aria-hidden="true"` on each Lucide icon (decorative — label text carries the meaning)

- [x] Task 2: Update `src/app/page.tsx` (AC: 6)
  - [x] Import `Footer` from `@/components/sections/Footer`
  - [x] Add `<Footer />` after `<ContactSection />`, still inside `<main>`
  - [x] Do NOT touch any other import or component in `page.tsx`

- [x] Task 3: Build validation (AC: 6)
  - [x] Run `npm run lint` — exit code 0, zero warnings
  - [x] Run `npm run build` — exit code 0, `/out/` produced
  - [x] Verify `<footer` element is present in `/out/index.html`
  - [x] Verify `linkedin.com` href is present in `/out/index.html`
  - [x] Verify `mailto:` href is present in `/out/index.html`

## Dev Notes

### Context: What Previous Stories Built

**These files already exist — do not recreate or modify unless explicitly tasked:**

| File                                           | Status                         | Note                                                          |
| ---------------------------------------------- | ------------------------------ | ------------------------------------------------------------- |
| `src/app/page.tsx`                             | EXISTS — modify Task 2 only    | Add `<Footer />` after `<ContactSection />`                   |
| `src/app/layout.tsx`                           | EXISTS — do not touch          | LinkedIn placeholder URL: `https://linkedin.com/in/agun-awan` |
| `src/app/globals.css`                          | EXISTS — do not touch          | CSS variable tokens, dark theme base                          |
| `src/components/sections/HeroSection.tsx`      | EXISTS — do not touch          | Story 2.1                                                     |
| `src/components/sections/AboutSection.tsx`     | EXISTS — do not touch          | Story 2.2                                                     |
| `src/components/sections/PortfolioSection.tsx` | EXISTS — do not touch          | Story 2.3                                                     |
| `src/components/sections/ContactSection.tsx`   | EXISTS — do not touch          | Story 2.5                                                     |
| `src/components/shared/Sidebar.tsx`            | EXISTS — do not touch          | Story 2.1                                                     |
| `src/components/shared/SectionHeading.tsx`     | EXISTS — do not touch          | NOT used in Footer                                            |
| `src/components/ui/button.tsx`                 | EXISTS (shadcn) — do not touch | NOT used in Footer (links not buttons)                        |
| `src/lib/utils.ts`                             | EXISTS — do not touch          | `cn()` utility                                                |

**New file to create:**

- `src/components/sections/Footer.tsx` — this story's sole deliverable

---

### Architecture Placement

Per `architecture.md` (Project Directory Structure):

```
src/components/sections/
  ├── HeroSection.tsx
  ├── AboutSection.tsx
  ├── PortfolioSection.tsx
  ├── ContactSection.tsx
  └── Footer.tsx          ← FR29–31: LinkedIn, email, copyright
```

`Footer.tsx` is a **section component** placed inside `<main>` in `page.tsx`, at the bottom of the scroll flow (Hero → About → Portfolio → Contact → Footer). It uses a `<footer>` semantic element even though it's inside `<main>` — this is valid HTML; it acts as a section-level footer.

---

### Focus Ring Pattern (Critical — from Story 2.5 review)

Story 2.5 review found that the default `--ring` CSS variable resolves to blue-gray, not amber. All interactive elements on this site use explicit amber focus rings. The footer links MUST use explicit `focus-visible:ring-amber-400` overrides, NOT `focus-visible:ring-ring`:

```tsx
// ✅ CORRECT — explicit amber
className =
  "... focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

// ❌ WRONG — resolves to blue-gray
className = "... focus-visible:ring-2 focus-visible:ring-ring";
```

---

### Email Visibility Rule (AC 2)

The footer email link must use `mailto:` in the `href`. The email address in `href` is technically in the HTML source (client-accessible), but this is intentional and acceptable for a footer contact link — AC 2 only prohibits it from appearing as **visible text** on screen.

```tsx
// ✅ CORRECT — email in href only, "Email" as visible label
<a href="mailto:hello@agungunawan.dev" aria-label="Send an email to Agun Gunawan">
  <Mail aria-hidden="true" /> Email
</a>

// ❌ WRONG — email visible as text
<a href="mailto:hello@agungunawan.dev">hello@agungunawan.dev</a>
```

⚠️ `mailto:hello@agungunawan.dev` is a **placeholder**. Agun must replace this with his real email address before launch.

---

### LinkedIn URL Placeholder

The site uses `https://linkedin.com/in/agun-awan` as the LinkedIn placeholder URL (set in `layout.tsx` JSON-LD `sameAs` array, with a `⚠️ Replace with actual LinkedIn URL` comment). The footer must use the **same placeholder URL** for consistency. Agun replaces both before launch.

---

### `lucide-react` Icons Available (no install needed)

`lucide-react` is already in `package.json` dependencies. Both icons are available:

```tsx
import { Linkedin, Mail } from "lucide-react";
```

Use `className="h-4 w-4"` for inline icon sizing within the link text. Add `aria-hidden="true"` — the visible text label and `aria-label` on the `<a>` carry the accessible meaning.

---

### Expected Footer Implementation

```tsx
// src/components/sections/Footer.tsx

import { Linkedin, Mail } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-8 px-6 lg:px-12 border-t border-border">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          © {year} Agun Gunawan. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <a
            href="https://linkedin.com/in/agun-awan" {/* ⚠️ Replace with actual LinkedIn URL */}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Agun Gunawan's LinkedIn profile (opens in new tab)"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-amber-400 motion-safe:transition-colors motion-safe:duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
          >
            <Linkedin className="h-4 w-4" aria-hidden="true" />
            LinkedIn
          </a>
          <a
            href="mailto:hello@agungunawan.dev" {/* ⚠️ Replace with actual email before launch */}
            aria-label="Send an email to Agun Gunawan"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-amber-400 motion-safe:transition-colors motion-safe:duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
```

> Note: JSX comments inside JSX attribute values (`{/* ⚠️ ... */}`) are not valid. In the actual file, use regular JS comments above each `<a>` element or just write the href value directly. The `⚠️` notes above are for developer guidance only.

---

### `page.tsx` Update (Task 2)

Current state of `page.tsx` after Story 2.5:

```tsx
import { Sidebar } from "@/components/shared/Sidebar";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      ...
      <main id="main-content" className="flex-1 lg:ml-60 min-w-0 pt-16 lg:pt-0">
        <HeroSection />
        <AboutSection />
        <PortfolioSection />
        <ContactSection />
      </main>
      ...
    </>
  );
}
```

After Task 2:

```tsx
import { Footer } from "@/components/sections/Footer";   // add this import

// Inside <main>:
<ContactSection />
<Footer />   // add this line
```

---

### Architecture Compliance Rules

#### ✅ REQUIRED

- **Named export** — `export function Footer`. Never `export default`.
- **`<footer>` semantic element** — not `<div>`, not `<section>`.
- **Server Component** — no `"use client"`. No hooks, no browser state.
- **`lucide-react` icons only** — never install a new icon library.
- **Explicit amber focus ring** — `focus-visible:ring-amber-400` (not `ring-ring`).
- **`rel="noopener noreferrer"`** on the LinkedIn `target="_blank"` link (security).
- **No dark: variants** — dark theme is the base.
- **No hardcoded hex colors** — CSS token classes only.

#### ❌ FORBIDDEN

- `export default` on `Footer`
- `"use client"` directive (no interactivity needed)
- `<div>` or `<section>` as root element (must be `<footer>`)
- Raw email address as visible text in the link label
- `focus-visible:ring-ring` (resolves to blue-gray, not amber)
- New icon library dependencies (lucide-react is already installed)
- `target="_blank"` without `rel="noopener noreferrer"`

### Project Structure Notes

- `Footer.tsx` → `src/components/sections/` (consistent with all section components)
- No new data files needed — footer content is hardcoded (LinkedIn URL, email placeholder, year)
- No new shadcn components needed
- No new dependencies needed

### References

- FR29–FR31 footer requirements: [Source: planning-artifacts/epics.md#FR Coverage Map]
- Story 2.6 AC: [Source: planning-artifacts/epics.md#Story 2.6]
- `Footer.tsx` file location: [Source: planning-artifacts/architecture.md#Project Directory Structure]
- Focus ring amber requirement: [Source: Story 2.5 code review — H1 finding]
- LinkedIn URL placeholder: [Source: src/app/layout.tsx#sameAs]
- `mailto:` security + `rel="noopener noreferrer"`: [Source: planning-artifacts/architecture.md#Authentication & Security]

## Dev Agent Record

### Agent Model Used

_TBD_

### Debug Log References

### Completion Notes List

### File List
