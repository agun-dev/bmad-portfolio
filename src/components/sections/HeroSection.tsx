"use client";

import { useRef } from "react";
import { CVDownloadButton } from "@/components/shared/CVDownloadButton";
import { AvailabilityBadge } from "@/components/shared/AvailabilityBadge";
import { gsap, useGSAP } from "@/lib/gsap";

const STATS = [
  { value: "8+", label: "Years Experience" },
  { value: "20+", label: "Projects Shipped" },
  { value: "100%", label: "On Site or Remote" },
];

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Pre-hide all code lines before the timeline runs
        gsap.set(".code-line", { opacity: 0 });

        const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
        tl.from(".hero-item", {
          opacity: 0,
          y: 40,
          duration: 0.6,
          stagger: 0.12,
        })
          .from(
            ".hero-code-card",
            { opacity: 0, x: 40, duration: 0.6 },
            "-=0.6",
          )
          // Reveal lines sequentially once the card is visible
          .to(
            ".code-line",
            { opacity: 1, duration: 0.001, stagger: 0.07, ease: "none" },
            ">-0.1",
          );
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden px-6 py-20 lg:px-12"
      aria-labelledby="hero-heading"
    >
      {/* ── Background effects ── */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        {/* Subtle dot grid */}
        <div className="absolute inset-0 bg-[radial-gradient(oklch(1_0_0/8%)_1px,transparent_1px)] bg-size-[2.5rem_2.5rem]" />
        {/* Ambient glow orbs */}
        <div className="absolute top-1/4 right-1/4 size-125 animate-pulse rounded-full bg-amber-400/6 blur-[120px]" />
        <div
          className="absolute bottom-0 -left-32 size-100 animate-pulse rounded-full bg-sky-500/4 blur-[100px]"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div
        ref={containerRef}
        className="flex w-full max-w-6xl flex-col items-center gap-12 lg:flex-row lg:gap-16"
      >
        {/* ── Left: text content ── */}
        <div className="min-w-0 flex-1">
          {/* Availability badge */}
          <div className="hero-item mb-5">
            <AvailabilityBadge />
          </div>

          {/* Eyebrow */}
          <p className="hero-item mb-4 text-xs font-bold tracking-widest text-amber-400 uppercase">
            Frontend Web Developer
          </p>

          {/* Name */}
          <h1
            id="hero-heading"
            className="hero-item mb-6 font-(family-name:--font-plus-jakarta-sans) text-5xl font-extrabold tracking-tight text-foreground lg:text-6xl xl:text-7xl"
          >
            Agun Gunawan
          </h1>

          {/* Tagline */}
          <p className="hero-item mb-10 max-w-xl text-lg leading-relaxed text-muted-foreground">
            8+ years shipping fast, accessible web products for international
            clients — from pixel-perfect React & Next.js apps to high-impact
            Webflow and WordPress builds. I bridge design and engineering to
            deliver production-ready results.
          </p>

          {/* Stats row */}
          <div className="hero-item mb-10 flex flex-wrap gap-8">
            {STATS.map(({ value, label }) => (
              <div key={label}>
                <p className="font-(family-name:--font-plus-jakarta-sans) text-3xl leading-none font-extrabold text-amber-400">
                  {value}
                </p>
                <p className="mt-1 text-[11px] tracking-wider text-muted-foreground uppercase">
                  {label}
                </p>
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="hero-item flex flex-wrap gap-4">
            <CVDownloadButton className="hidden" />
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-lg border border-slate-700 px-6 py-3 font-semibold text-muted-foreground hover:border-slate-500 hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-safe:transition-colors motion-safe:duration-150"
            >
              Get in Touch
            </a>
            <a
              href="#portfolio"
              className="inline-flex items-center justify-center rounded-lg border border-slate-700 px-6 py-3 font-semibold text-muted-foreground hover:border-slate-500 hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-safe:transition-colors motion-safe:duration-150"
            >
              View Projects
            </a>
          </div>
        </div>

        {/* ── Right: animated code card ── */}
        <div className="hero-code-card hidden w-full max-w-88 shrink-0 lg:block xl:max-w-sm">
          <div className="relative">
            {/* Card glow */}
            <div
              className="absolute -inset-3 rounded-2xl bg-amber-400/10 blur-2xl"
              aria-hidden="true"
            />
            {/* Terminal card */}
            <div className="relative overflow-hidden rounded-xl border border-slate-700/80 bg-slate-900/90 shadow-2xl shadow-black/40 backdrop-blur-sm">
              {/* Chrome bar */}
              <div className="flex items-center gap-2 border-b border-slate-700/60 bg-slate-800/80 px-4 py-3">
                <span className="size-3 rounded-full bg-red-400/70" />
                <span className="size-3 rounded-full bg-amber-400/70" />
                <span className="size-3 rounded-full bg-green-400/70" />
                <span className="ml-3 font-mono text-xs text-slate-500 select-none">
                  developer.ts
                </span>
              </div>

              {/* Code body */}
              <pre
                className="overflow-x-auto p-6 font-mono text-sm leading-loose"
                aria-label="Code snippet"
              >
                <code>
                  <span className="code-line block">
                    <span className="text-blue-400">const</span>{" "}
                    <span className="text-amber-300">developer</span>{" "}
                    <span className="text-slate-400">=</span>{" "}
                    <span className="text-slate-400">{"{"}</span>
                  </span>
                  <span className="code-line block">
                    {"  "}
                    <span className="text-slate-300">name</span>
                    <span className="text-slate-500">:</span>{" "}
                    <span className="text-green-400">
                      &quot;Agun Gunawan&quot;
                    </span>
                    <span className="text-slate-600">,</span>
                  </span>
                  <span className="code-line block">
                    {"  "}
                    <span className="text-slate-300">role</span>
                    <span className="text-slate-500">:</span>{" "}
                    <span className="text-green-400">
                      &quot;Frontend Dev&quot;
                    </span>
                    <span className="text-slate-600">,</span>
                  </span>
                  <span className="code-line block">
                    {"  "}
                    <span className="text-slate-300">experience</span>
                    <span className="text-slate-500">:</span>{" "}
                    <span className="text-amber-400">&quot;8+ years&quot;</span>
                    <span className="text-slate-600">,</span>
                  </span>
                  <span className="code-line block">
                    {"  "}
                    <span className="text-slate-300">stack</span>
                    <span className="text-slate-500">: [</span>
                  </span>
                  <span className="code-line block">
                    {"    "}
                    <span className="text-sky-400">&quot;React JS&quot;</span>
                    <span className="text-slate-600">, </span>
                    <span className="text-sky-400">&quot;Next.js&quot;</span>
                    <span className="text-slate-600">,</span>
                  </span>
                  <span className="code-line block">
                    {"    "}
                    <span className="text-sky-400">&quot;TypeScript&quot;</span>
                    <span className="text-slate-600">, </span>
                    <span className="text-sky-400">&quot;JavaScript&quot;</span>
                    <span className="text-slate-600">,</span>
                  </span>
                  <span className="code-line block">
                    {"    "}
                    <span className="text-sky-400">&quot;HTML&quot;</span>
                    <span className="text-slate-600">, </span>
                    <span className="text-sky-400">&quot;CSS&quot;</span>
                    <span className="text-slate-600">,</span>
                  </span>
                  <span className="code-line block">
                    {"    "}
                    <span className="text-sky-400">&quot;SASS/SCSS&quot;</span>
                    <span className="text-slate-600">, </span>
                    <span className="text-sky-400">
                      &quot;Tailwind CSS&quot;
                    </span>
                    <span className="text-slate-600">,</span>
                  </span>
                  <span className="code-line block">
                    {"    "}
                    <span className="text-sky-400">&quot;Webflow&quot;</span>
                    <span className="text-slate-600">, </span>
                    <span className="text-sky-400">&quot;WordPress&quot;</span>
                    <span className="text-slate-600">,</span>
                  </span>
                  <span className="code-line block">
                    {"    "}
                    <span className="text-sky-400">&quot;PHP&quot;</span>
                    <span className="text-slate-600">, </span>
                    <span className="text-sky-400">&quot;Elementor&quot;</span>
                    <span className="text-slate-600">,</span>
                  </span>
                  <span className="code-line block">
                    {"    "}
                    <span className="text-sky-400">&quot;Git&quot;</span>
                    <span className="text-slate-600">, </span>
                    <span className="text-sky-400">&quot;Figma&quot;</span>
                    <span className="text-slate-600">,</span>
                  </span>
                  <span className="code-line block">
                    {"  "}
                    <span className="text-slate-500">]</span>
                    <span className="text-slate-600">,</span>
                  </span>
                  <span className="code-line block">
                    {"  "}
                    <span className="text-slate-300">status</span>
                    <span className="text-slate-500">:</span>{" "}
                    <span className="text-emerald-400">
                      &quot;Open to new opportunity&quot;
                    </span>
                    <span className="text-slate-600">,</span>
                  </span>
                  <span className="code-line block">
                    <span className="text-slate-400">{"}"}</span>
                    <span className="text-slate-600">;</span>
                  </span>
                  <span className="code-line block">
                    <span className="animate-pulse text-slate-600">▋</span>
                  </span>
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
