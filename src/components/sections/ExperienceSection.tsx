"use client";

import { experiences } from "@/data/experience";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { useGsapReveal } from "@/hooks/useGsapReveal";
import { cn } from "@/lib/utils";

export function ExperienceSection() {
  const sectionRef = useGsapReveal<HTMLElement>({
    selector: ".exp-reveal",
    stagger: 0.12,
    start: "top 80%",
  });

  return (
    <section
      ref={sectionRef}
      id="experience"
      aria-labelledby="experience-heading"
      className="px-6 py-20 lg:px-12"
    >
      <div className="max-w-3xl">
        <div className="exp-reveal">
          <SectionHeading
            eyebrow="EXPERIENCE"
            title="My Professional Journey"
            id="experience-heading"
          />
        </div>

        <ol className="relative space-y-10" aria-label="Employment timeline">
          {experiences.map((exp, index) => {
            const duration =
              exp.endYear === null
                ? new Date().getFullYear() - exp.startYear
                : exp.endYear - exp.startYear;
            const durationLabel =
              duration <= 1 ? `${duration} yr` : `${duration} yrs`;
            const period =
              exp.endYear === null
                ? `${exp.startYear} — Present`
                : `${exp.startYear} — ${exp.endYear}`;

            return (
              <li
                key={exp.id}
                className="exp-reveal relative pl-8 before:absolute before:top-2 before:left-0 before:h-full before:w-px before:bg-slate-800 last:before:hidden"
              >
                {/* Timeline dot */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute top-2 -left-1.5 size-3.5 rounded-full border-2",
                    index === 0
                      ? "border-amber-400 bg-amber-400"
                      : "border-slate-600 bg-slate-900",
                  )}
                />

                {/* Header */}
                <div className="mb-3">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="font-(family-name:--font-plus-jakarta-sans) text-lg font-bold text-foreground">
                      {exp.role}
                    </h3>
                    {index === 0 && (
                      <span className="rounded bg-amber-400/15 px-2 py-0.5 text-xs font-semibold text-amber-400">
                        Latest
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-semibold text-amber-400">
                    {exp.company}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {period}
                    <span className="mx-2 text-slate-700" aria-hidden="true">
                      ·
                    </span>
                    {durationLabel}
                    <span className="mx-2 text-slate-700" aria-hidden="true">
                      ·
                    </span>
                    {exp.location}
                  </p>
                </div>

                {/* Responsibilities */}
                <ul className="space-y-2">
                  {exp.responsibilities.map((item, i) => (
                    <li
                      key={i}
                      className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground"
                    >
                      <span
                        className="mt-1.5 size-1.5 shrink-0 rounded-full bg-amber-400/60"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
