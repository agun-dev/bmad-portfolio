"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { cn } from "@/lib/utils";

// ── Data ──────────────────────────────────────────────────────────────────────

const SKILL_GROUPS = [
  {
    idx: 1,
    category: "Frontend Core",
    skills: ["HTML", "CSS", "SASS/SCSS", "Tailwind CSS"],
    accent: "amber" as const,
    activeBg: "bg-amber-400",
    symbol: "◈",
    description:
      "Semantic markup, modern CSS architecture, and utility-first styling for pixel-perfect, responsive layouts.",
  },
  {
    idx: 2,
    category: "JavaScript Ecosystem",
    skills: ["TypeScript", "JavaScript", "React JS", "Next.js"],
    accent: "sky" as const,
    activeBg: "bg-sky-400",
    symbol: "◎",
    description:
      "Type-safe, component-driven UIs with SSR/SSG and the full modern React ecosystem.",
  },
  {
    idx: 3,
    category: "CMS & No-Code",
    skills: ["Webflow", "WordPress", "PHP", "Elementor"],
    accent: "emerald" as const,
    activeBg: "bg-emerald-400",
    symbol: "◇",
    description:
      "Rapid time-to-market with high-fidelity visual builds and CMS-powered content workflows.",
  },
  {
    idx: 4,
    category: "Tools & Workflow",
    skills: ["Git", "Figma", "GitHub Copilot"],
    accent: "violet" as const,
    activeBg: "bg-violet-400",
    symbol: "◆",
    description:
      "Figma-to-code precision, version control, and AI-assisted development for maximum velocity.",
  },
] as const;

type Accent = (typeof SKILL_GROUPS)[number]["accent"];

const ACCENTS: Record<
  Accent,
  { text: string; border: string; bg: string; badge: string }
> = {
  amber: {
    text: "text-amber-400",
    border: "border-amber-400/30",
    bg: "bg-amber-400/5",
    badge: "border border-amber-400/25 bg-amber-400/10 text-amber-300",
  },
  sky: {
    text: "text-sky-400",
    border: "border-sky-400/30",
    bg: "bg-sky-400/5",
    badge: "border border-sky-400/25 bg-sky-400/10 text-sky-300",
  },
  emerald: {
    text: "text-emerald-400",
    border: "border-emerald-400/30",
    bg: "bg-emerald-400/5",
    badge: "border border-emerald-400/25 bg-emerald-400/10 text-emerald-300",
  },
  violet: {
    text: "text-violet-400",
    border: "border-violet-400/30",
    bg: "bg-violet-400/5",
    badge: "border border-violet-400/25 bg-violet-400/10 text-violet-300",
  },
};

// ── Component ─────────────────────────────────────────────────────────────────

export function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const stepRef = useRef<HTMLSpanElement>(null);
  const dotsRef = useRef<HTMLElement[]>([]);

  const total = SKILL_GROUPS.length;

  useGSAP(
    () => {
      if (!sectionRef.current || !panelsRef.current) return;

      const panels = gsap.utils.toArray<HTMLElement>(
        ".skill-panel",
        panelsRef.current,
      );

      // Cache dot elements so onUpdate doesn't query the DOM repeatedly
      dotsRef.current = Array.from(
        sectionRef.current.querySelectorAll<HTMLElement>("[data-dot]"),
      );

      const allActiveBgs = SKILL_GROUPS.map((g) => g.activeBg);

      const updateDots = (step: number) => {
        dotsRef.current.forEach((dot, j) => {
          const active = j === step;
          dot.classList.toggle("w-8", active);
          dot.classList.toggle("w-2", !active);
          // Swap accent color: remove all possible active bg classes, then add the right one
          dot.classList.remove(...allActiveBgs, "bg-border");
          dot.classList.add(active ? SKILL_GROUPS[j].activeBg : "bg-border");
        });
      };

      const mm = gsap.matchMedia();

      // ── Standard motion ───────────────────────────────────────────────────
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // All panels except the first start hidden
        gsap.set(panels.slice(1), { opacity: 0, y: 50 });

        // Initialise dots to step 0
        updateDots(0);

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,
            pinSpacing: true,
            scrub: 1,
            start: "top top",
            end: () => `+=${(total - 1) * window.innerHeight}`,
            onUpdate(self) {
              // Progress bar
              if (progressRef.current) {
                progressRef.current.style.transform = `scaleX(${self.progress})`;
              }
              // Step counter + dots
              const step = Math.min(
                Math.round(self.progress * (total - 1)),
                total - 1,
              );
              if (stepRef.current) {
                stepRef.current.textContent = String(step + 1);
              }
              updateDots(step);
            },
          },
        });

        // Cross-fade each consecutive panel
        panels.forEach((panel, i) => {
          if (i === 0) return;
          // Exit previous
          tl.to(panels[i - 1], { opacity: 0, y: -30, duration: 0.5 }, i - 1);
          // Enter current
          tl.to(panel, { opacity: 1, y: 0, duration: 0.5 }, i - 1 + 0.25);
        });

        return () => ScrollTrigger.getAll().forEach((t) => t.kill());
      });

      // ── Reduced motion: reveal all panels inline, no pin ─────────────────
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(panels, { opacity: 1, y: 0, position: "relative" });
        gsap.set(panelsRef.current, { height: "auto" });
        if (progressRef.current) {
          progressRef.current.parentElement!.style.display = "none";
        }
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="skills"
      aria-labelledby="skills-heading"
      className="relative flex min-h-screen items-center px-6 py-20 lg:px-12"
    >
      {/* ── Scroll progress bar ───────────────────────────────────────────── */}
      <div
        className="absolute top-0 left-0 h-px w-full bg-border"
        aria-hidden="true"
      >
        <div
          ref={progressRef}
          className="h-full origin-left bg-amber-400"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      <div className="w-full max-w-5xl">
        {/* ── Header row ────────────────────────────────────────────────────── */}
        <div className="relative">
          <SectionHeading
            eyebrow="SKILLS"
            title="What I Work With"
            id="skills-heading"
          />
          {/* Step counter — absolute so it doesn't affect heading layout */}
          <p
            className="absolute top-0 right-0 hidden font-mono text-sm text-muted-foreground lg:block"
            aria-hidden="true"
          >
            <span ref={stepRef} className="text-amber-400">
              1
            </span>
            {" / "}
            {total}
          </p>
        </div>

        {/* ── Panel stack ───────────────────────────────────────────────────── */}
        <div ref={panelsRef} className="relative h-80">
          {SKILL_GROUPS.map((group, i) => {
            const ac = ACCENTS[group.accent];
            return (
              <div
                key={group.category}
                className={cn(
                  "skill-panel absolute inset-0 rounded-2xl border p-8",
                  ac.border,
                  ac.bg,
                )}
                /* Higher z for first panel so it sits on top initially */
                style={{ zIndex: total - i }}
                aria-label={group.category}
              >
                <div className="flex h-full flex-col justify-between">
                  {/* Top: icon + label */}
                  <div className="flex items-center gap-4">
                    <span
                      className={cn(
                        "text-5xl leading-none select-none",
                        ac.text,
                      )}
                      aria-hidden="true"
                    >
                      {group.symbol}
                    </span>
                    <div>
                      <p
                        className={cn(
                          "text-xs font-bold tracking-widest uppercase",
                          ac.text,
                        )}
                      >
                        0{group.idx}
                      </p>
                      <h3 className="mt-0.5 font-(family-name:--font-plus-jakarta-sans) text-2xl font-bold text-foreground">
                        {group.category}
                      </h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="max-w-lg text-base leading-relaxed text-muted-foreground">
                    {group.description}
                  </p>

                  {/* Skill badges */}
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className={cn(
                          "rounded-full px-3 py-1 text-sm font-medium",
                          ac.badge,
                        )}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Step dots ─────────────────────────────────────────────────────── */}
        <div
          className="mt-6 flex items-center gap-1.5"
          role="presentation"
          aria-hidden="true"
        >
          {SKILL_GROUPS.map((group, i) => (
            <div
              key={group.category}
              data-dot={i}
              className={cn(
                "h-1 rounded-full transition-[width,background-color] duration-300",
                i === 0 ? `w-8 ${group.activeBg}` : "w-2 bg-border",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
