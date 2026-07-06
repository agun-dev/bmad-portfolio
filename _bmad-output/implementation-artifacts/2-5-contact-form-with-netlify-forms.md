# Story 2.5: Contact Form with Netlify Forms

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a visitor,
I want to submit an inquiry via a contact form,
so that I can reach out to Agun directly without needing to find his personal email address.

## Acceptance Criteria

1. **Given** I navigate to `#contact`  
   **When** I fill in name, email, subject, and message fields and click the send button  
   **Then** an in-page confirmation message replaces the form (no page redirect)  
   **And** the confirmation reads: "Message sent!" with body "Thanks — I'll get back to you within 1–2 days."

2. **Given** a visitor submits the contact form  
   **When** Netlify processes the submission  
   **Then** Agun receives an email notification at his personal inbox within 5 minutes  
   **And** Agun's personal email address is never present in page source or client-side code

3. **Given** the form is built  
   **When** Netlify scans the static HTML at deploy time  
   **Then** the form has `data-netlify="true"` attribute and a hidden `<input type="hidden" name="form-name" value="contact" />`  
   **And** Netlify registers the form and connects it to the configured notification email in the dashboard

4. **Given** JavaScript is disabled in the browser  
   **When** a visitor fills in all fields and submits  
   **Then** the form POSTs natively (HTML `action` fallback) to Netlify Forms without JS  
   **And** the form structure is present in the static HTML output at `/out/index.html`

5. **Given** the form is rendered  
   **When** I inspect the source HTML  
   **Then** all four inputs (name, email, subject, message) have associated `<label>` elements (bound via `htmlFor`/`id` pairs)  
   **And** all inputs are keyboard-navigable with visible focus rings (`focus-visible:ring-2 focus-visible:ring-amber-400`)

6. **Given** Netlify Forms spam filtering  
   **When** the form is processed by Netlify  
   **Then** `data-netlify-honeypot="bot-field"` is set on the form element  
   **And** a hidden honeypot field `<input name="bot-field" />` is present (visually hidden, never shown to real users)

7. **Given** a visitor types into a form field then moves focus away  
   **When** the `onBlur` event fires  
   **Then** inline validation messages appear below the field if invalid (e.g., "Please enter a valid email address")  
   **And** the field re-validates immediately on correction (no waiting for re-submit)

8. **Given** a visitor clicks the submit button  
   **When** the form submission is in-flight  
   **Then** the submit button shows a loading state and is disabled to prevent duplicate submissions

9. **Given** the form has been submitted successfully  
   **When** the confirmation state is shown  
   **Then** Agun can view all contact form submissions in the Netlify Forms dashboard as a backup to email

10. **Given** the build runs  
    **When** `npm run build` completes  
    **Then** exit code is 0, `/out/` is produced  
    **And** the form element with `data-netlify="true"` is present in `/out/index.html`

## Tasks / Subtasks

- [x] Task 1: Install shadcn/ui form components and required dependencies (AC: 7)
  - [x] Run `npx shadcn@latest add input textarea label form` — installs `input.tsx`, `textarea.tsx`, `label.tsx`, `form.tsx` into `src/components/ui/`
  - [x] Run `npm install react-hook-form zod @hookform/resolvers` — required by shadcn `Form` component
  - [x] Verify `src/components/ui/input.tsx`, `textarea.tsx`, `label.tsx`, `form.tsx` are created
  - [x] Do NOT edit any generated shadcn files — extend via `className` prop only

- [x] Task 2: Add `ContactFormValues` interface to `src/types/index.ts` (AC: 7)
  - [x] Append interface to the existing file (do NOT delete `NavItem` or `SiteConfig`):
    ```ts
    export interface ContactFormValues {
      name: string;
      email: string;
      subject: string;
      message: string;
    }
    ```

- [x] Task 3: Create `src/components/sections/ContactSection.tsx` (AC: 1–9)
  - [x] Add `"use client"` directive — required for React Hook Form + submission state
  - [x] Named export `ContactSection` (never `export default`)
  - [x] Import `SectionHeading` from `@/components/shared/SectionHeading`
  - [x] Import shadcn: `Form`, `FormControl`, `FormField`, `FormItem`, `FormLabel`, `FormMessage` from `@/components/ui/form`
  - [x] Import shadcn: `Input` from `@/components/ui/input`, `Textarea` from `@/components/ui/textarea`
  - [x] Import `Button` from `@/components/ui/button`
  - [x] Import `CheckCircle`, `Loader2` from `lucide-react` (already installed)
  - [x] Import `useForm` from `react-hook-form`, `zodResolver` from `@hookform/resolvers/zod`, `z` from `zod`
  - [x] Import `ContactFormValues` from `@/types`
  - [x] Define Zod schema `contactSchema` (name required, email valid email format, subject required, message min 10 chars)
  - [x] Section renders with `<section id="contact" className="py-20 px-6 lg:px-12">` — do NOT use `min-h-screen` (conflicts with page.tsx placeholder class — page.tsx section wrapper must be removed)
  - [x] Use `useForm<ContactFormValues>({ resolver: zodResolver(contactSchema), mode: 'onBlur' })` for blur-first validation
  - [x] Track local state: `const [isSubmitted, setIsSubmitted] = useState(false)` and `const [submitError, setSubmitError] = useState<string | null>(null)`
  - [x] Form element attributes (ALL required):
    - `name="contact"`
    - `method="POST"`
    - `action="/#contact"` — HTML fallback for no-JS native POST to Netlify
    - `data-netlify="true"` — Netlify detection at deploy time
    - `data-netlify-honeypot="bot-field"` — spam filtering
  - [x] Hidden inputs inside form (required by Netlify Forms):
    - `<input type="hidden" name="form-name" value="contact" />`
  - [x] Honeypot field (hidden from real users):
    ```tsx
    <p className="hidden" aria-hidden="true">
      <label>
        Don't fill this out:{" "}
        <input name="bot-field" tabIndex={-1} autoComplete="off" />
      </label>
    </p>
    ```
  - [x] Four `FormField` fields in order: Name → Email → Subject → Message (Textarea)
  - [x] All fields use shadcn `FormItem` → `FormLabel` → `FormControl` → field → `FormMessage` pattern
  - [x] Submit handler `onSubmit`:
    - Set loading state (React Hook Form tracks `isSubmitting` internally — use `formState.isSubmitting`)
    - Serialize form data via `URLSearchParams` (Netlify requires `application/x-www-form-urlencoded`)
    - `fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: ... })`
    - On success: `setIsSubmitted(true)`
    - On error: `setSubmitError('Something went wrong. Please try again or email directly.')`
  - [x] Submit button: disabled when `formState.isSubmitting` or `isSubmitted`; shows `<Loader2 className="animate-spin" />` during isSubmitting
  - [x] Conditional render: if `isSubmitted` → show `<ContactConfirmation>` replacing form; else show form
  - [x] `ContactConfirmation` can be an inline functional component within the same file (not a separate file — it is only used here)
  - [x] No `dark:` Tailwind variants — dark theme IS the base
  - [x] No hardcoded hex colors — use CSS token classes only (`text-foreground`, `bg-background`, `text-muted-foreground`, `border-border`)

- [x] Task 4: Update `src/app/page.tsx` (AC: 4, 10)
  - [x] Import `ContactSection` from `@/components/sections/ContactSection`
  - [x] Replace the current placeholder:
    ```tsx
    <section id="contact" className="min-h-screen py-20 px-6 lg:px-12" />
    ```
    With:
    ```tsx
    <ContactSection />
    ```
  - [x] Do NOT change `Sidebar`, `HeroSection`, `AboutSection`, `PortfolioSection`, or any other imports/structure in `page.tsx`

- [x] Task 5: Build and integration validation (AC: 4, 10)
  - [x] Run `npm run lint` — exit code 0, zero warnings
  - [x] Run `npm run build` — exit code 0, `/out/` produced
  - [x] Verify `data-netlify="true"` is present in `/out/index.html`
  - [x] Verify `name="contact"` and `form-name` hidden input are present in `/out/index.html`
  - [x] Verify `id="contact"` section is present in `/out/index.html`

## Dev Notes

### Context: What Previous Stories Built

**These files already exist — do not recreate or modify unless explicitly tasked:**

| File                                           | Status                         | Note                                                     |
| ---------------------------------------------- | ------------------------------ | -------------------------------------------------------- |
| `src/app/page.tsx`                             | EXISTS — modify Task 4 only    | Imports all sections; replace contact placeholder        |
| `src/app/layout.tsx`                           | EXISTS — do not touch          | Root layout: fonts, metadata                             |
| `src/app/globals.css`                          | EXISTS — do not touch          | CSS variable tokens, dark theme base                     |
| `src/components/sections/HeroSection.tsx`      | EXISTS — do not touch          | Story 2.1 output                                         |
| `src/components/sections/AboutSection.tsx`     | EXISTS — do not touch          | Story 2.2 output                                         |
| `src/components/sections/PortfolioSection.tsx` | EXISTS — do not touch          | Story 2.3 output                                         |
| `src/components/sections/ProjectCard.tsx`      | EXISTS — do not touch          | Story 2.3 output                                         |
| `src/components/shared/CVDownloadButton.tsx`   | EXISTS — do not touch          | Story 2.4 output                                         |
| `src/components/shared/SectionHeading.tsx`     | EXISTS — USE THIS              | Story 2.2 output; eyebrow + H2 heading                   |
| `src/components/shared/AvailabilityBadge.tsx`  | EXISTS — do not touch          | Story 2.1 output                                         |
| `src/components/shared/Sidebar.tsx`            | EXISTS — do not touch          | Story 2.1 output                                         |
| `src/components/shared/SkillTag.tsx`           | EXISTS — do not touch          | Story 2.2 output                                         |
| `src/components/ui/button.tsx`                 | EXISTS (shadcn) — do not touch | Use as-is                                                |
| `src/components/ui/badge.tsx`                  | EXISTS (shadcn) — do not touch | Not used in this story                                   |
| `src/components/ui/card.tsx`                   | EXISTS (shadcn) — do not touch | Not used in this story                                   |
| `src/lib/analytics.ts`                         | EXISTS — do not touch          | `trackEvent()` helper                                    |
| `src/lib/utils.ts`                             | EXISTS — do not touch          | `cn()` utility                                           |
| `src/data/projects.ts`                         | EXISTS — do not touch          | Story 2.3 output                                         |
| `src/data/about.ts`                            | EXISTS — do not touch          | Story 2.2 output                                         |
| `src/types/index.ts`                           | EXISTS — APPEND only           | Add `ContactFormValues`; keep `NavItem` and `SiteConfig` |

**New files to create in this story:**

- `src/components/ui/input.tsx` — installed via `npx shadcn@latest add input`
- `src/components/ui/textarea.tsx` — installed via `npx shadcn@latest add textarea`
- `src/components/ui/label.tsx` — installed via `npx shadcn@latest add label`
- `src/components/ui/form.tsx` — installed via `npx shadcn@latest add form`
- `src/components/sections/ContactSection.tsx` — this story's primary deliverable

---

### Netlify Forms — Critical Implementation Details

Netlify detects contact forms by scanning the **static HTML** at deploy time. This means:

1. **The `<form>` element MUST appear in `/out/index.html`** — since `ContactSection.tsx` is a Client Component (`"use client"`), Next.js still pre-renders it to HTML during SSG. The form IS present in the static output as long as it is not wrapped in a JS-only conditional (e.g., no `{typeof window !== 'undefined' && <form>}`).

2. **Required form attributes for Netlify detection:**

   ```tsx
   <form
     name="contact"
     method="POST"
     action="/#contact"
     data-netlify="true"
     data-netlify-honeypot="bot-field"
     onSubmit={handleSubmit(onSubmit)}
   >
   ```

3. **Required hidden field inside the form** (BOTH must be present):

   ```tsx
   <input type="hidden" name="form-name" value="contact" />
   ```

4. **JS submission (Netlify Forms fetch pattern):**

   ```ts
   const onSubmit = async (data: ContactFormValues) => {
     const body = new URLSearchParams({
       "form-name": "contact",
       ...data,
     }).toString();
     await fetch("/", {
       method: "POST",
       headers: { "Content-Type": "application/x-www-form-urlencoded" },
       body,
     });
     setIsSubmitted(true);
   };
   ```

   > ⚠️ Netlify Forms does NOT accept `Content-Type: application/json` — must be URL-encoded.

5. **Email configuration:** Agun configures the recipient email exclusively in the **Netlify dashboard** (Settings → Forms → notifications). No email address ever appears in code or environment variables.

6. **Dashboard access:** All submissions are logged at `app.netlify.com → Forms → contact` automatically.

---

### Honeypot Spam Filtering

```tsx
{
  /* Hidden from real users — bots fill this in, triggering spam filter */
}
<p className="hidden" aria-hidden="true">
  <label>
    Don't fill this out:{" "}
    <input name="bot-field" tabIndex={-1} autoComplete="off" />
  </label>
</p>;
```

- `data-netlify-honeypot="bot-field"` on the `<form>` element tells Netlify which field to check
- `tabIndex={-1}` prevents keyboard users from reaching the field
- `autoComplete="off"` prevents password managers from filling it
- CSS `hidden` class hides the field from visual users

---

### React Hook Form + Zod Schema

```ts
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const contactSchema = z.object({
  name: z.string().min(1, "Please enter your name"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(1, "Please enter a subject"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

// In component:
const form = useForm<ContactFormValues>({
  resolver: zodResolver(contactSchema),
  mode: "onBlur", // validates on blur (UX spec requirement)
  defaultValues: {
    name: "",
    email: "",
    subject: "",
    message: "",
  },
});
```

`formState.isSubmitting` from React Hook Form is automatically `true` during the async submit handler — use this to disable the button and show a spinner. No separate `isLoading` state needed.

---

### ContactConfirmation Component (inline in ContactSection.tsx)

Per UX spec, the confirmation replaces the form entirely (not overlaid):

```tsx
function ContactConfirmation() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center gap-4 py-16 text-center"
    >
      <CheckCircle className="h-12 w-12 text-emerald-400" aria-hidden="true" />
      <h3 className="text-xl font-bold text-foreground">Message sent!</h3>
      <p className="text-muted-foreground">
        Thanks — I'll get back to you within 1–2 days.
      </p>
    </div>
  );
}
```

- `role="status"` + `aria-live="polite"` → screen reader announces success without interrupting (NFR13)
- No form reset needed — the form is replaced entirely by this component
- The `CheckCircle` icon from `lucide-react` (already installed in `package.json`)

---

### Submit Button States

```tsx
<Button
  type="submit"
  disabled={formState.isSubmitting}
  className="w-full sm:w-auto"
>
  {formState.isSubmitting ? (
    <>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
      Sending…
    </>
  ) : (
    "Send Message"
  )}
</Button>
```

- `Loader2` from `lucide-react` (already installed)
- Use shadcn `Button` — never rebuild the button from scratch
- `disabled` during submission prevents duplicate form POSTs

---

### Error Handling

```tsx
const [submitError, setSubmitError] = useState<string | null>(null);

// In onSubmit:
try {
  await fetch(...);
  setIsSubmitted(true);
} catch {
  setSubmitError('Something went wrong. Please try again or email me directly.');
}

// In JSX (below submit button):
{submitError && (
  <p role="alert" className="text-sm text-destructive">
    {submitError}
  </p>
)}
```

- `role="alert"` ensures screen readers announce the error immediately
- Use `text-destructive` (CSS variable token) — never `text-red-500`

---

### Architecture Compliance Rules

#### ✅ REQUIRED

- **Named export only** — `export function ContactSection`. Never `export default`.
- **`"use client"` directive** — required for `useState`, `useForm`, and `onSubmit` handler.
- **Form in static HTML** — the form must not be behind a runtime JS-only conditional. Since `isSubmitted` starts as `false`, the form renders in the initial SSG HTML automatically.
- **`data-netlify="true"`** — must be present; this is how Netlify detects the form at deploy time.
- **`method="POST"` + `action="/#contact"`** — enables progressive enhancement: no-JS submission works without client-side JS.
- **Hidden `form-name` input** — required for Netlify JS fetch submissions.
- **URL-encoded fetch body** — Netlify Forms only accepts `application/x-www-form-urlencoded`.
- **shadcn `Input`, `Textarea`, `Label`, `Form`** — install via CLI; never write custom input/label components.
- **`SectionHeading`** — reuse the existing shared component for the section heading.
- **No `dark:` variants** — dark theme IS the base; all styles are default.
- **No hardcoded hex colors** — always CSS variable token classes.

#### ❌ FORBIDDEN

- `export default` on `ContactSection`
- `Content-Type: application/json` in the fetch body — Netlify won't process it
- Agun's email address anywhere in code or environment variables
- Rendering the form conditionally behind `typeof window !== 'undefined'` (breaks SSG detection)
- Creating custom Input/Label/Textarea from scratch (use shadcn)
- Calling `gtag()` directly (no analytics tracking required in this story — form submission tracking is a future task in Epic 3)
- Editing any file in `src/components/ui/` manually
- Adding `dark:` Tailwind variants

---

### Page.tsx Current State

The current placeholder that MUST be replaced in Task 4:

```tsx
// src/app/page.tsx — CURRENT (to be replaced)
<section id="contact" className="min-h-screen py-20 px-6 lg:px-12" />
```

```tsx
// src/app/page.tsx — AFTER Task 4
<ContactSection />
```

> `ContactSection` owns its own `<section id="contact">` wrapper with appropriate padding. Do not wrap it in another `<section>`.

---

### Project Structure Notes

- `ContactSection.tsx` → `src/components/sections/` (consistent with all other section components)
- `ContactFormValues` interface → `src/types/index.ts` (append, do not replace existing content)
- shadcn components → `src/components/ui/` (installed via CLI, never hand-created)
- No new data files needed — contact form has no static data content
- No new shared components needed — `SectionHeading` is reused, `ContactConfirmation` is inline

### References

- Netlify Forms with Next.js static export: [Source: planning-artifacts/architecture.md#API & Communication Patterns]
- Contact form `data-netlify="true"` + HTML action fallback: [Source: planning-artifacts/architecture.md#Process Patterns — Contact Form]
- shadcn Form/Input/Textarea/Label components: [Source: planning-artifacts/ux-design-specification.md#Component Strategy]
- Blur validation UX pattern: [Source: planning-artifacts/ux-design-specification.md#Experience Mechanics]
- `ContactConfirmation` warm post-submit state: [Source: planning-artifacts/ux-design-specification.md#ContactConfirmation]
- `ContactFormValues` interface: [Source: planning-artifacts/architecture.md#Naming Patterns — TypeScript Naming]
- Honeypot spam filtering via Netlify: [Source: planning-artifacts/epics.md#Story 2.5 Acceptance Criteria]
- NFR7 — email not in source: [Source: planning-artifacts/epics.md#Non-Functional Requirements — Security]
- NFR13 — form labels for screen readers: [Source: planning-artifacts/epics.md#Non-Functional Requirements — Accessibility]
- NFR15 — Netlify Forms 100% non-spam delivery: [Source: planning-artifacts/epics.md#Non-Functional Requirements — Integration]

## Dev Agent Record

### Agent Model Used

Claude Sonnet 4.6 (GitHub Copilot)

### Debug Log References

_None — clean implementation, no debug issues encountered._

### Completion Notes List

- ✅ Task 1: Installed `input`, `textarea`, `label`, `form` via `npx shadcn@latest add`; installed `react-hook-form`, `zod`, `@hookform/resolvers` via npm. All 4 shadcn ui files confirmed created in `src/components/ui/`.
- ✅ Task 2: Appended `ContactFormValues` interface to `src/types/index.ts`; `NavItem` and `SiteConfig` preserved.
- ✅ Task 3: Created `src/components/sections/ContactSection.tsx` with `"use client"`, named export, Zod schema (`mode: 'onBlur'`), Netlify Forms attributes (`data-netlify="true"`, `data-netlify-honeypot="bot-field"`, hidden `form-name` input), honeypot field, URL-encoded fetch submission, `ContactConfirmation` inline component with `role="status"`, `Loader2` spinner on submit button, `submitError` state with `role="alert"`.
- ✅ Task 4: Updated `src/app/page.tsx` — imported `ContactSection`, replaced placeholder `<section>` with `<ContactSection />`.
- ✅ Task 5: `npm run lint` → exit 0, zero warnings. `npm run build` → exit 0, `/out/` produced. Confirmed `data-netlify="true"`, `name="contact"`, `form-name`, and `id="contact"` all present in `/out/index.html`.

**Code Review Fixes (2026-06-29):**

- ✅ H1 FIXED: Added `className="focus-visible:ring-amber-400 aria-invalid:border-destructive"` to all four `<Input>`/`<Textarea>` fields. `--ring` token resolved to blue-gray; AC 5 requires amber-400.
- ✅ H2 FIXED: Added `className="bg-amber-400 text-black hover:bg-amber-500 focus-visible:ring-amber-400 focus-visible:ring-offset-background"` to the submit `<Button>`. Default shadcn variant was off-white, inconsistent with UX spec primary CTA style.
- ✅ M1 FIXED: Added LinkedIn fallback sub-text to `ContactConfirmation`. Avoids raw email exposure (AC 2 compliant) while satisfying UX spec intent.
- ✅ L1 FIXED: Added `aria-required="true"` to all four form inputs for screen reader compatibility.
- ✅ L2 FIXED: Added `aria-invalid:border-destructive` className to all inputs for visual red-border on error state.
- ✅ LinkedIn URL aligned with `layout.tsx` canonical placeholder (`/in/agun-awan`).
- ⚠️ M2 NOTE: No test framework installed project-wide (no jest/vitest in package.json). Systemic gap affecting all stories 1.1–2.4 as well. To be addressed in a dedicated infrastructure story if required.

### File List

**New files created:**

- `src/components/ui/input.tsx` (shadcn — installed via CLI)
- `src/components/ui/textarea.tsx` (shadcn — installed via CLI)
- `src/components/ui/label.tsx` (shadcn — installed via CLI)
- `src/components/ui/form.tsx` (shadcn — installed via CLI)
- `src/components/sections/ContactSection.tsx`

**Modified files:**

- `src/types/index.ts` — appended `ContactFormValues` interface
- `src/app/page.tsx` — added `ContactSection` import + replaced contact placeholder
- `package.json` — added `react-hook-form`, `zod`, `@hookform/resolvers` to dependencies
- `package-lock.json` — updated
