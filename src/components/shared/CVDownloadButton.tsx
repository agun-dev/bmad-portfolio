"use client";

import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

interface CVDownloadButtonProps {
  className?: string;
}

export function CVDownloadButton({ className }: CVDownloadButtonProps) {
  return (
    <a
      href="/cv.pdf"
      download
      onClick={() => trackEvent("cv_download", { method: "button_click" })}
      className={cn(
        "inline-flex items-center gap-2 rounded-lg bg-amber-400 px-6 py-3 font-bold text-black",
        "hover:bg-amber-500 motion-safe:transition-colors motion-safe:duration-150",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400",
        "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
    >
      Download CV <span aria-hidden="true">↓</span>
    </a>
  );
}
