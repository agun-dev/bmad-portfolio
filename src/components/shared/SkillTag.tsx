// src/components/shared/SkillTag.tsx

import {
  SiHtml5,
  SiCss,
  SiSass,
  SiTailwindcss,
  SiTypescript,
  SiJavascript,
  SiWebflow,
  SiWordpress,
  SiPhp,
  SiReact,
  SiNextdotjs,
  SiGit,
  SiFigma,
} from "react-icons/si";
import type { IconType } from "react-icons";

interface SkillMeta {
  icon: IconType;
  color: string;
}

const SKILL_MAP: Record<string, SkillMeta> = {
  HTML: { icon: SiHtml5, color: "#E34F26" },
  CSS: { icon: SiCss, color: "#1572B6" },
  "SASS/SCSS": { icon: SiSass, color: "#CC6699" },
  "Tailwind CSS": { icon: SiTailwindcss, color: "#06B6D4" },
  TypeScript: { icon: SiTypescript, color: "#3178C6" },
  JavaScript: { icon: SiJavascript, color: "#F7DF1E" },
  Webflow: { icon: SiWebflow, color: "#4353FF" },
  WordPress: { icon: SiWordpress, color: "#21759B" },
  PHP: { icon: SiPhp, color: "#777BB4" },
  "React JS": { icon: SiReact, color: "#61DAFB" },
  "Next.js": { icon: SiNextdotjs, color: "#e2e8f0" },
  Git: { icon: SiGit, color: "#F05032" },
  Figma: { icon: SiFigma, color: "#F24E1E" },
};

interface SkillTagProps {
  label: string;
}

export function SkillTag({ label }: SkillTagProps) {
  const meta = SKILL_MAP[label];

  return (
    <span
      title={label}
      className="inline-flex min-w-14 flex-col items-center gap-1.5 rounded-lg border border-slate-700/60 bg-slate-800/40 px-3 py-2.5 hover:border-slate-600 hover:bg-slate-800/70 motion-safe:transition-colors motion-safe:duration-150"
    >
      {meta ? (
        <meta.icon size={22} color={meta.color} aria-hidden="true" />
      ) : (
        /* fallback for unmapped skills (e.g. Elementor) */
        <span
          className="text-[10px] font-bold text-slate-400"
          aria-hidden="true"
        >
          {"</>"}
        </span>
      )}
      <span className="font-mono text-[9px] leading-none font-semibold tracking-wide text-slate-400">
        {label}
      </span>
    </span>
  );
}
