"use client";

import { aboutData } from "@/data/about";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SkillTag } from "@/components/shared/SkillTag";
import { useGsapReveal } from "@/hooks/useGsapReveal";

export function AboutSection() {
  const sectionRef = useGsapReveal<HTMLElement>({
    selector: ".about-reveal",
    stagger: 0.1,
    start: "top 80%",
  });

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-labelledby="about-heading"
      className="px-6 py-20 lg:px-12"
    >
      <div className="max-w-3xl">
        <div className="about-reveal">
          <SectionHeading
            eyebrow="ABOUT ME"
            title="Background & Experience"
            id="about-heading"
          />
        </div>

        {/* Experience callout stat */}
        <div className="about-reveal mb-10">
          <span className="font-(family-name:--font-plus-jakarta-sans) text-6xl font-bold text-amber-400">
            {aboutData.yearsOfExperience}+
          </span>
          <span className="ml-3 text-sm font-semibold tracking-widest text-muted-foreground uppercase">
            Years of Experience
          </span>
        </div>

        {/* Bio paragraphs */}
        <div className="about-reveal mb-12 space-y-4 text-base leading-relaxed text-muted-foreground">
          {aboutData.bio.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        {/* Skills */}
        <div className="about-reveal">
          <p className="mb-4 text-xs font-bold tracking-widest text-amber-400 uppercase">
            CORE SKILLS
          </p>
          <div className="flex flex-wrap gap-2">
            {aboutData.skills.map((skill) => (
              <SkillTag key={skill} label={skill} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
