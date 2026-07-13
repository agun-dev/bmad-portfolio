"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ArrowRightIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SkillTag } from "@/components/shared/SkillTag";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [caseStudyOpen, setCaseStudyOpen] = useState(false);

  return (
    <Card className="flex flex-col overflow-hidden border-border bg-card hover:border-amber-400/50 motion-safe:transition-colors motion-safe:duration-150">
      {/* Thumbnail */}
      <div className="relative aspect-video w-full">
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {project.featured && (
          <span className="absolute top-3 left-3 rounded bg-amber-400 px-2 py-0.5 text-xs font-bold tracking-wide text-black">
            Featured
          </span>
        )}
      </div>

      <CardContent className="flex flex-1 flex-col space-y-3 p-5">
        {/* Title */}
        <h3 className="font-(family-name:--font-plus-jakarta-sans) text-xl leading-tight font-semibold text-foreground">
          {project.title}
        </h3>

        {/* Problem statement */}
        <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
          {project.problem}
        </p>

        {/* Stack badges */}
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <SkillTag key={tech} label={tech} />
          ))}
        </div>

        {/* Case study accordion */}
        {project.caseStudy && (
          <div className="border-t border-border pt-3">
            <button
              type="button"
              onClick={() => setCaseStudyOpen((prev) => !prev)}
              aria-expanded={caseStudyOpen}
              className="flex w-full items-center justify-between gap-2 rounded text-xs font-semibold text-amber-400 hover:text-amber-300 focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none"
            >
              Case Study
              <ChevronDown
                className={cn(
                  "size-3.5 shrink-0 motion-safe:transition-transform motion-safe:duration-200",
                  caseStudyOpen && "rotate-180",
                )}
                aria-hidden="true"
              />
            </button>

            {caseStudyOpen && (
              <dl className="mt-3 space-y-2.5 text-sm">
                <div>
                  <dt className="mb-0.5 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                    Challenge
                  </dt>
                  <dd className="leading-relaxed text-muted-foreground">
                    {project.caseStudy.challenge}
                  </dd>
                </div>
                <div>
                  <dt className="mb-0.5 text-xs font-semibold tracking-wider text-amber-400/80 uppercase">
                    Outcome
                  </dt>
                  <dd className="leading-relaxed text-muted-foreground">
                    {project.caseStudy.outcome}
                  </dd>
                </div>
              </dl>
            )}
          </div>
        )}

        {/* Action links */}
        {project.liveUrl && (
          <div className="flex items-center gap-3 pt-1">
            <Button
              asChild
              variant="outline"
              className="group mt-auto flex w-full items-center border-amber-400 hover:bg-amber-400 hover:text-black"
            >
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Live Site
                <ArrowRightIcon className="transition-transform duration-300 group-hover:translate-x-2" />
              </a>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
