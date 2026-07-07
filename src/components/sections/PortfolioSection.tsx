"use client";

import { projects } from "@/data/projects";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { useGsapReveal } from "@/hooks/useGsapReveal";

export function PortfolioSection() {
  const sectionRef = useGsapReveal<HTMLElement>({
    selector: ".portfolio-card",
    stagger: 0.1,
    y: 30,
    start: "top 85%",
  });

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

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div key={project.id} className="portfolio-card">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
