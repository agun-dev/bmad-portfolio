"use client";

import { useEffect, useRef, useState } from "react";
import { CVDownloadButton } from "@/components/shared/CVDownloadButton";
import { AvailabilityBadge } from "@/components/shared/AvailabilityBadge";
import type { NavItem } from "@/types";

const NAV_ITEMS: NavItem[] = [
  { label: "Overview", href: "#hero", sectionId: "hero" },
  { label: "About", href: "#about", sectionId: "about" },
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
              className={[
                "block rounded-lg px-4 py-2.5 text-sm font-medium motion-safe:transition-colors motion-safe:duration-150",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400",
                isActive
                  ? "bg-amber-950/40 text-amber-400 font-semibold"
                  : "text-muted-foreground hover:bg-slate-800 hover:text-slate-100",
              ].join(" ")}
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
      <aside className="hidden lg:flex fixed inset-y-0 left-0 w-60 flex-col bg-slate-900 border-r border-slate-800 z-30">
        {/* Brand mark */}
        <div className="flex items-center px-6 py-5 border-b border-slate-800">
          <span className="text-lg font-extrabold tracking-tight text-amber-400">
            AG.
          </span>
        </div>

        {/* Profile block */}
        <div className="flex flex-col items-center gap-3 px-6 py-6 border-b border-slate-800">
          {/* Avatar placeholder */}
          <div
            className="h-16 w-16 rounded-full bg-slate-700 ring-2 ring-amber-400 ring-offset-2 ring-offset-slate-900"
            aria-hidden="true"
          />
          <div className="text-center">
            <p className="text-base font-semibold text-foreground">
              Agun Gunawan
            </p>
            <p className="text-sm text-muted-foreground">Frontend Developer</p>
          </div>
          <AvailabilityBadge />
        </div>

        {/* Nav */}
        <nav
          aria-label="Main navigation"
          className="flex-1 overflow-y-auto px-3 py-4"
        >
          <NavLinks activeSection={activeSection} />
        </nav>

        {/* CV download pinned to bottom */}
        <div className="px-4 py-4 border-t border-slate-800">
          <CVDownloadButton className="w-full justify-center" />
        </div>
      </aside>

      {/* ── Mobile Top Bar ──────────────────────────────── */}
      <header className="flex lg:hidden fixed inset-x-0 top-0 h-16 items-center justify-between px-4 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 z-30">
        {/* Logo */}
        <span className="text-lg font-extrabold tracking-tight text-amber-400">
          AG.
        </span>
        {/* Hamburger */}
        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(true)}
          className="rounded-lg p-2 text-muted-foreground hover:text-foreground hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 motion-safe:transition-colors"
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
          className="lg:hidden fixed inset-0 z-40 flex flex-col bg-slate-900"
        >
          {/* Overlay header */}
          <div className="flex items-center justify-between px-4 h-16 border-b border-slate-800">
            <span className="text-lg font-extrabold tracking-tight text-amber-400">
              AG.
            </span>
            <button
              ref={closeButtonRef}
              type="button"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg p-2 text-muted-foreground hover:text-foreground hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 motion-safe:transition-colors"
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
            className="flex flex-col flex-1 px-4 py-6 gap-6"
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
