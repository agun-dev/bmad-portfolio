import { CVDownloadButton } from "@/components/shared/CVDownloadButton";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center py-20 px-6 lg:px-12"
      aria-labelledby="hero-heading"
    >
      <div className="max-w-2xl">
        {/* Eyebrow label */}
        <p className="text-xs tracking-widest font-bold text-amber-400 uppercase mb-4">
          Senior Frontend Developer
        </p>

        {/* Display heading */}
        <h1
          id="hero-heading"
          className="font-(family-name:--font-plus-jakarta-sans) text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground mb-6"
        >
          Agun Gunawan
        </h1>

        {/* Bio / tagline */}
        <p className="text-lg text-muted-foreground leading-relaxed max-w-prose mb-8">
          8+ years building fast, accessible web products with React, Next.js,
          and Webflow. Currently open to senior frontend roles.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-wrap gap-4">
          <CVDownloadButton />
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-lg border border-slate-700 px-6 py-3 font-semibold text-muted-foreground motion-safe:transition-colors motion-safe:duration-150 hover:border-slate-500 hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Get in Touch
          </a>
          <a
            href="#portfolio"
            className="inline-flex items-center justify-center rounded-lg border border-slate-700 px-6 py-3 font-semibold text-muted-foreground motion-safe:transition-colors motion-safe:duration-150 hover:border-slate-500 hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            View Projects
          </a>
        </div>
      </div>
    </section>
  );
}
