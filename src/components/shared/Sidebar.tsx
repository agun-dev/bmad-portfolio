"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Github, Linkedin } from "lucide-react";
import { CVDownloadButton } from "@/components/shared/CVDownloadButton";
import { AvailabilityBadge } from "@/components/shared/AvailabilityBadge";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/types";

const NAV_ITEMS: NavItem[] = [
  { label: "Overview", href: "#hero", sectionId: "hero" },
  { label: "About", href: "#about", sectionId: "about" },
  { label: "Experience", href: "#experience", sectionId: "experience" },
  { label: "Skills", href: "#skills", sectionId: "skills" },
  { label: "Projects", href: "#portfolio", sectionId: "portfolio" },
  { label: "Contact", href: "#contact", sectionId: "contact" },
];

function useSectionObserver() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const observers = NAV_ITEMS.map(({ sectionId }) => {
      const el = document.getElementById(sectionId);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(sectionId);
        },
        { rootMargin: "-40% 0px -60% 0px" },
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return activeSection;
}

function NavLinks({
  activeSection,
  onLinkClick,
}: {
  activeSection: string;
  onLinkClick?: () => void;
}) {
  return (
    <ul className="flex flex-col gap-1">
      {NAV_ITEMS.map(({ label, href, sectionId }) => {
        const isActive = activeSection === sectionId;
        return (
          <li key={sectionId}>
            <a
              href={href}
              onClick={onLinkClick}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "block rounded-lg px-4 py-2.5 text-sm font-medium motion-safe:transition-colors motion-safe:duration-150",
                "focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none",
                isActive
                  ? "bg-amber-950/40 font-semibold text-amber-400"
                  : "text-muted-foreground hover:bg-slate-800 hover:text-slate-100",
              )}
            >
              {label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export function Sidebar() {
  const activeSection = useSectionObserver();
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Mobile overlay: lock scroll, focus close button, close on Escape
  useEffect(() => {
    if (!mobileOpen) return;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileOpen(false);
    }
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      {/* ── Desktop Sidebar ─────────────────────────────── */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 flex-col border-r border-slate-800 bg-slate-900 lg:flex">
        {/* Brand mark */}
        <div className="flex items-center border-b border-slate-800 px-6 py-5">
          <span className="h-4 w-12 text-lg font-extrabold tracking-tight text-amber-400">
            <svg
              width="155"
              height="68"
              viewBox="0 0 155 68"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-full w-full"
            >
              <path
                d="M12.75 67.5H0L28.453.469h13.36L70.875 67.5h-13.36l-7.64-18.281H27.609l4.266-10.782h13.5l-10.547-25.17zm119.766-3.094q-8.11 3.563-20.297 3.563-35.484 0-35.485-34.922Q76.734 0 112.828 0q11.015 0 19.688 3.281v11.25q-8.673-3.75-18.75-3.75-24.141 0-24.141 22.266 0 24.14 22.781 24.14 3.375 0 7.688-1.124v-19.5h12.422zm21.796-8.39V67.5h-12.421V56.016z"
                fill="currentColor"
              />
            </svg>
          </span>
        </div>

        {/* Profile block */}
        <div className="flex flex-col items-center gap-3 border-b border-slate-800 p-6">
          {/* Avatar */}
          <div className="relative size-16 overflow-hidden rounded-full ring-2 ring-amber-400 ring-offset-2 ring-offset-slate-900">
            <Image
              src="/me.png"
              alt="Agun Gunawan"
              fill
              sizes="64px"
              className="object-cover"
              style={{ objectPosition: "center 10%" }}
              priority
            />
          </div>
          <div className="text-center">
            <p className="text-base font-semibold text-foreground">
              Agun Gunawan
            </p>
            <p className="text-sm text-muted-foreground">Frontend Developer</p>
          </div>
          <AvailabilityBadge />

          {/* Social links */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/agun-dev"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile (opens in new tab)"
              className="rounded p-1.5 text-muted-foreground hover:text-amber-400 focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none motion-safe:transition-colors motion-safe:duration-150"
            >
              <Github className="size-4" aria-hidden="true" />
            </a>
            <a
              href="https://id.linkedin.com/in/agun-awan"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile (opens in new tab)"
              className="rounded p-1.5 text-muted-foreground hover:text-amber-400 focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none motion-safe:transition-colors motion-safe:duration-150"
            >
              <Linkedin className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Nav */}
        <nav
          aria-label="Main navigation"
          className="flex-1 overflow-y-auto px-3 py-4"
        >
          <NavLinks activeSection={activeSection} />
        </nav>

        {/* CV download pinned to bottom */}
        <div className="border-t border-slate-800 p-4">
          <CVDownloadButton className="hidden w-full justify-center" />
        </div>
      </aside>

      {/* ── Mobile Top Bar ──────────────────────────────── */}
      <header className="fixed inset-x-0 top-0 z-30 flex h-16 items-center justify-between border-b border-slate-800 bg-slate-900/95 px-4 backdrop-blur-md lg:hidden">
        {/* Logo */}
        <span className="h-7 w-7.75 text-lg font-extrabold tracking-tight text-amber-400">
          <svg
            width="155"
            height="68"
            viewBox="0 0 155 68"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-full w-full"
          >
            <path
              d="M12.75 67.5H0L28.453.469h13.36L70.875 67.5h-13.36l-7.64-18.281H27.609l4.266-10.782h13.5l-10.547-25.17zm119.766-3.094q-8.11 3.563-20.297 3.563-35.484 0-35.485-34.922Q76.734 0 112.828 0q11.015 0 19.688 3.281v11.25q-8.673-3.75-18.75-3.75-24.141 0-24.141 22.266 0 24.14 22.781 24.14 3.375 0 7.688-1.124v-19.5h12.422zm21.796-8.39V67.5h-12.421V56.016z"
              fill="currentColor"
            />
          </svg>
        </span>
        {/* Hamburger */}
        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(true)}
          className="rounded-lg p-2 text-muted-foreground hover:bg-slate-800 hover:text-foreground focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none motion-safe:transition-colors"
        >
          {/* Hamburger icon */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </header>

      {/* ── Mobile Menu Overlay ──────────────────────────── */}
      {mobileOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="fixed inset-0 z-40 flex flex-col bg-slate-900 lg:hidden"
        >
          {/* Overlay header */}
          <div className="flex h-16 items-center justify-between border-b border-slate-800 px-4">
            <span className="h-7 w-7.75 text-lg font-extrabold tracking-tight text-amber-400">
              <svg
                width="155"
                height="68"
                viewBox="0 0 155 68"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-full w-full"
              >
                <path
                  d="M12.75 67.5H0L28.453.469h13.36L70.875 67.5h-13.36l-7.64-18.281H27.609l4.266-10.782h13.5l-10.547-25.17zm119.766-3.094q-8.11 3.563-20.297 3.563-35.484 0-35.485-34.922Q76.734 0 112.828 0q11.015 0 19.688 3.281v11.25q-8.673-3.75-18.75-3.75-24.141 0-24.141 22.266 0 24.14 22.781 24.14 3.375 0 7.688-1.124v-19.5h12.422zm21.796-8.39V67.5h-12.421V56.016z"
                  fill="currentColor"
                />
              </svg>
            </span>
            <button
              ref={closeButtonRef}
              type="button"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg p-2 text-muted-foreground hover:bg-slate-800 hover:text-foreground focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none motion-safe:transition-colors"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Mobile nav links + CV */}
          <nav
            aria-label="Main navigation"
            className="flex flex-1 flex-col gap-6 px-4 py-6"
          >
            <NavLinks
              activeSection={activeSection}
              onLinkClick={() => setMobileOpen(false)}
            />
            <CVDownloadButton className="w-full justify-center" />
          </nav>
        </div>
      )}
    </>
  );
}
