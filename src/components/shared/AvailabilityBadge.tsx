export function AvailabilityBadge() {
  return (
    <span
      aria-label="Available for freelance & full-time roles"
      className="inline-flex items-center text-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-950/50 px-3 py-1.5 text-xs font-semibold text-emerald-400 shadow-[0_0_12px_3px_oklch(0.696_0.17_162.48/0.25)] hover:shadow-[0_0_18px_4px_oklch(0.696_0.17_162.48/0.4)] motion-safe:transition-shadow motion-safe:duration-300"
    >
      {/* Pulsing live dot */}
      <span className="relative flex size-2 shrink-0" aria-hidden="true">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
        <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
      </span>
      Available for freelance &amp; full-time roles
    </span>
  );
}
