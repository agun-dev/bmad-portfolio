# Story 3.1: Google Analytics 4 Integration

Status: done

## Story

As the site owner,
I want GA4 tracking active on the live site with page views and CV download events recorded,
So that I can measure visitor traffic and conversion from day one of launch.

## Acceptance Criteria

1. **Given** the site is deployed to Netlify with `NEXT_PUBLIC_GA_ID` set  
   **When** a visitor loads the page  
   **Then** the GA4 script loads via `<Script strategy="afterInteractive">` in Next.js — it does not affect LCP or block rendering

2. **Given** GA4 is active and a visitor loads the page  
   **When** the page renders  
   **Then** page view events are recorded in the GA4 dashboard

3. **Given** the site is deployed  
   **When** any component needs to fire a custom analytics event  
   **Then** `src/lib/analytics.ts` exports a `trackEvent()` function and `gtag()` is never called directly in components

4. **Given** a visitor is on the site  
   **When** they click the CV download button  
   **Then** a `cv_download` event fires via `trackEvent()` and is visible in GA4 real-time reports

5. **Given** `NEXT_PUBLIC_GA_ID` is NOT set (local dev or unconfigured environment)  
   **When** the page renders  
   **Then** the GA4 script is NOT injected and the rest of the site is fully functional and unaffected

6. **Given** the build runs  
   **When** `npm run build` completes  
   **Then** exit code is 0, `/out/` is produced

## Tasks / Subtasks

- [x] Task 1: Add GA4 Script tags to `src/app/layout.tsx` (AC: 1, 2, 5)
  - [x] Import `Script` from `next/script` (built into Next.js — no new dependency)
  - [x] Read `const GA_ID = process.env.NEXT_PUBLIC_GA_ID` at module scope, above the `jsonLd` block
  - [ ] Inside `<body>`, after `{children}`, add conditional GA4 block:
    ```tsx
    {
      GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
          </Script>
        </>
      );
    }
    ```
  - [x] Placement: scripts go inside `<body>` after `{children}` — never in `<head>` (handled by Next.js Script component)
  - [x] Guard with `{GA_ID && (...)}`: when env var is absent the block is omitted entirely (AC 5)
  - [x] Do NOT touch any other part of `layout.tsx` (metadata, fonts, JSON-LD, `<html>`, `<head>`)

- [x] Task 2: Verify `src/lib/analytics.ts` compliance (AC: 3)
  - [x] Confirm `trackEvent()` named export exists — file was created in Story 1.4 skeleton
  - [x] Confirm `window.gtag` guard (`typeof window !== "undefined" && typeof window.gtag === "function"`) is present — silently no-ops when GA4 is absent (AC 5)
  - [x] **No changes to this file are needed** — it was implemented correctly in prior stories; this task is verification only

- [x] Task 3: Verify `CVDownloadButton.tsx` compliance (AC: 4)
  - [x] Confirm `trackEvent('cv_download', { method: 'button_click' })` is called on click — implemented in Story 2.4
  - [x] **No changes to this file are needed** — this task is verification only

- [x] Task 4: Create `.env.local.example` at project root (developer onboarding)
  - [ ] Content:
    ```
    # Google Analytics 4 — replace with your Measurement ID (format: G-XXXXXXXXXX)
    NEXT_PUBLIC_GA_ID=
    ```
  - [x] This file is NOT gitignored (it's a template, not a secret — the value is blank)
  - [x] Do NOT create or commit `.env.local` (that file IS gitignored and holds the real value)

- [x] Task 5: Build validation (AC: 6)
  - [x] Run `npm run lint` — exit code 0, zero warnings
  - [x] Run `npm run build` — exit code 0, `/out/` produced
  - [x] Verify `/out/index.html` GA script behavior — `.env.local` has placeholder `G-XXXXXXXXXX`; script injected correctly with that value. Guard confirmed: when `NEXT_PUBLIC_GA_ID` is unset, the block is omitted entirely.

## Dev Notes

### Current State of `analytics.ts` and `CVDownloadButton.tsx`

Both files are ALREADY COMPLETE. Do not recreate or modify them:

| File                                         | Status                            | What exists                                                                 |
| -------------------------------------------- | --------------------------------- | --------------------------------------------------------------------------- |
| `src/lib/analytics.ts`                       | EXISTS — do not modify            | `trackEvent()` named export; `Window.gtag` declaration; `window.gtag` guard |
| `src/components/shared/CVDownloadButton.tsx` | EXISTS — do not modify            | Calls `trackEvent('cv_download', { method: 'button_click' })` on click      |
| `src/app/layout.tsx`                         | EXISTS — modify Task 1 only       | Add `Script` import + GA4 block inside `<body>`                             |
| `.env.local.example`                         | DOES NOT EXIST — create in Task 4 | Developer onboarding template                                               |

---

### `next/script` with `output: 'export'`

`next.config.ts` sets `output: "export"`. **`<Script strategy="afterInteractive">` is fully compatible with static export** in Next.js 13+ App Router. The component serialises the script tag into the static HTML at build time. No dynamic runtime required.

**Critical:** `next/script` must be imported from `"next/script"`, NOT from `"react"` or used as a plain `<script>` tag. Plain `<script>` tags in the App Router body require `"use client"` or go inside `<head>` via metadata — avoid both patterns here.

---

### GA4 Script Pattern (Architecture mandate)

From `architecture.md` §Analytics:

> Analytics: Google Analytics 4 — loaded via `<Script strategy="afterInteractive">` in Next.js (non-blocking, does not affect LCP)
> `NEXT_PUBLIC_GA_ID` env var; non-blocking
> All custom events go through `src/lib/analytics.ts` — never call `gtag()` directly in components

The exact placement in `layout.tsx` after Story 1.4:

```tsx
// Current body structure (do not touch children or className):
<body
  className={`${inter.variable} ${plusJakartaSans.variable} ${jetBrainsMono.variable} antialiased`}
>
  {children}
  {/* GA4 scripts go here — after children */}
  {GA_ID && (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
      </Script>
    </>
  )}
</body>
```

---

### Environment Variable Pattern

- Variable name: `NEXT_PUBLIC_GA_ID` (public prefix required — used in browser-executed script)
- Format: `G-XXXXXXXXXX` (GA4 Measurement ID, not UA- tracking ID)
- Where to set:
  - **Local dev:** `.env.local` (gitignored)
  - **Production:** Netlify dashboard → Site Configuration → Environment Variables
- **Never commit a real GA4 ID to source control** (it's not a secret per se, but it's personal/project-specific config)

---

### Analytics Abstraction Rule (Architecture §271, §307)

> All custom events go through `src/lib/analytics.ts` — never call `gtag()` directly in components

This is non-negotiable. The `trackEvent()` wrapper:

1. Guards against `window` being undefined (SSR/SSG safety)
2. Guards against `window.gtag` being undefined (GA4 not loaded)
3. Provides a single abstraction point for future analytics provider swaps

No component in `src/components/` should ever `import gtag` or call `window.gtag` directly.

---

### Files Modified/Created This Story

**Modify:**

- `src/app/layout.tsx` — add Script import + GA4 block

**Create:**

- `.env.local.example` — developer onboarding template

**Verify only (no changes):**

- `src/lib/analytics.ts`
- `src/components/shared/CVDownloadButton.tsx`

---

### Previous Story Intelligence (Story 2.6)

- Footer component implemented as Server Component (no `"use client"`)
- Named exports pattern confirmed throughout codebase — use `export function`, never `export default` for section/shared components
- `lucide-react` icons use `aria-hidden="true"` for decorative icons
- No `dark:` Tailwind variants — dark base theme confirmed

---

### References

- [Source: _bmad-output/planning-artifacts/architecture.md#Analytics]
- [Source: _bmad-output/planning-artifacts/epics.md#Story 3.1]
- [Source: src/lib/analytics.ts]
- [Source: src/components/shared/CVDownloadButton.tsx]
- [Source: src/app/layout.tsx]

## Dev Agent Record

### Agent Model Used

Claude Sonnet 4.6 (GitHub Copilot)

### Debug Log References

### Completion Notes List

### File List

- `src/app/layout.tsx` — modified: added `Script` import, `GA_ID` env var, GA4 conditional script block
- `.env.local.example` — created: developer onboarding template
