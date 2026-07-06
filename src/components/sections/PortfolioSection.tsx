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
