// src/components/sections/ProjectCard.tsx
// NO "use client" — this is a Server Component

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { SkillTag } from "@/components/shared/SkillTag";
import type { Project } from "@/data/projects";
import { Button } from "../ui/button";
import { ArrowRightIcon } from "lucide-react";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
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
