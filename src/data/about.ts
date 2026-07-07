export interface AboutData {
  bio: string[];
  skills: string[];
  yearsOfExperience: number;
  currentRole: string;
  highlights: string[];
}

export const aboutData: AboutData = {
  bio: [
    "Senior Frontend Developer with 8+ years of proven experience shipping production-ready web products that are fast, accessible, and conversion-focused. I specialize in building performant interfaces with React, Next.js, and TypeScript — as well as delivering high-impact no-code/low-code solutions via Webflow and WordPress/Elementor for rapid time-to-market.",
    "My edge is bridging the gap between design and engineering: translating Figma concepts into pixel-perfect, maintainable code with a keen eye for detail. I work fluidly across the full frontend stack — from semantic HTML and CSS architecture to complex component systems and API-driven UIs.",
    "Early adopter of AI-assisted development (vibe coding) — integrating tools like GitHub Copilot and LLM-driven workflows to multiply engineering velocity without sacrificing quality. Always learning, always shipping.",
  ],
  skills: [
    "HTML",
    "CSS",
    "SASS/SCSS",
    "Tailwind CSS",
    "TypeScript",
    "JavaScript",
    "Webflow",
    "WordPress",
    "PHP",
    "Elementor",
    "React JS",
    "Next.js",
    "Git",
    "Figma",
  ],
  yearsOfExperience: 8,
  currentRole: "Frontend Developer",
  highlights: [
    "8+ years building production-ready web experiences across React, Next.js, Webflow, and WordPress.",
    "Strong design-to-code pipeline — Figma to pixel-perfect, accessible, performant UI.",
    "AI-assisted development advocate — shipping faster without cutting corners.",
  ],
};
