"use client";

import { useState } from "react";
import { projects } from "@/data/projects";
import type { ProjectCategory } from "@/data/projects";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { useGsapReveal } from "@/hooks/useGsapReveal";
import { cn } from "@/lib/utils";

type Filter = ProjectCategory | "all";

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "react", label: "React / Next.js" },
  { value: "wordpress", label: "WordPress" },
  { value: "webflow", label: "Webflow" },
];

export function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState<Filter>("all");

  const sectionRef = useGsapReveal<HTMLElement>({
    selector: ".portfolio-card",
    stagger: 0.1,
    y: 30,
    start: "top 85%",
  });

  const filtered =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      aria-labelledby="portfolio-heading"
      className="px-6 py-20 lg:px-12"
    >
      <div className="max-w-5xl">
        <SectionHeading
          eyebrow="PORTFOLIO"
          title="Selected Work"
          description="A selection of projects that demonstrate my approach to building fast, accessible web products."
          id="portfolio-heading"
        />

        {/* Filter buttons */}
        <div
          className="mb-8 flex flex-wrap gap-2"
          role="group"
          aria-label="Filter projects by technology"
        >
          {FILTERS.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => setActiveFilter(value)}
              aria-pressed={activeFilter === value}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm font-medium focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none motion-safe:transition-colors motion-safe:duration-150",
                activeFilter === value
                  ? "border-amber-400 bg-amber-400/15 text-amber-400"
                  : "border-slate-700 text-muted-foreground hover:border-slate-500 hover:text-foreground",
              )}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <div
              key={project.id}
              className={`portfolio-card${project.featured && activeFilter === "all" ? "sm:col-span-2 lg:col-span-2" : ""}`}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="py-16 text-center text-muted-foreground">
            No projects found for this filter.
          </p>
        )}
      </div>
    </section>
  );
}
