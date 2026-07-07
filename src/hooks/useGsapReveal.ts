import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

interface UseGsapRevealOptions {
  /** Vertical offset to animate from (px). Default: 40 */
  y?: number;
  /** Animation duration in seconds. Default: 0.7 */
  duration?: number;
  /** Stagger delay between child elements (seconds). Default: 0 */
  stagger?: number;
  /** CSS selector for child elements to stagger. If omitted, animates the container. */
  selector?: string;
  /** ScrollTrigger start position. Default: "top 85%" */
  start?: string;
}

/**
 * Attach this ref to a container element to get a scroll-triggered fade-up
 * reveal. Respects `prefers-reduced-motion`.
 */
export function useGsapReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseGsapRevealOptions = {},
) {
  const {
    y = 40,
    duration = 0.7,
    stagger = 0,
    selector,
    start = "top 85%",
  } = options;

  const ref = useRef<T>(null);

  useGSAP(
    () => {
      if (!ref.current) return;

      const target = selector
        ? gsap.utils.toArray<Element>(ref.current.querySelectorAll(selector))
        : ref.current;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(target, {
          opacity: 0,
          y,
          duration,
          stagger,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ref.current,
            start,
            toggleActions: "play none none none",
          },
        });

        return () => {
          ScrollTrigger.getAll().forEach((t) => t.kill());
        };
      });
    },
    { scope: ref },
  );

  return ref;
}
