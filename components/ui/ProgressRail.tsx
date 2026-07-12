'use client';

type ProgressRailProps = {
  /** ordered groups, e.g. one per module: { label: "M3", slides: 8 } */
  groups: { label: string; slides: number }[];
  /** global slide index across all groups, 0-based */
  current: number;
  className?: string;
};

/**
 * Thin bottom rail: one segment cluster per module, one tick per slide.
 * Done = dim green, active = gold, upcoming = faint. Unobtrusive by design.
 */
export default function ProgressRail({ groups, current, className = '' }: ProgressRailProps) {
  let offset = 0;
  return (
    <nav
      aria-label="Slide progress"
      className={`pointer-events-none fixed inset-x-0 bottom-0 z-20 flex items-end justify-center gap-5 px-8 pb-4 ${className}`}
    >
      {groups.map((group) => {
        const start = offset;
        offset += group.slides;
        const groupActive = current >= start && current < start + group.slides;
        return (
          <div key={group.label} className="flex flex-col items-center gap-1.5">
            <span
              className={`font-sans text-[0.6rem] font-bold uppercase tracking-[0.2em] transition-opacity duration-500 ${
                groupActive ? 'text-gold-300 opacity-100' : 'text-cream-200 opacity-0'
              }`}
            >
              {group.label}
            </span>
            <div className="flex gap-1">
              {Array.from({ length: group.slides }, (_, i) => {
                const idx = start + i;
                return (
                  <span
                    key={i}
                    className={`h-1 rounded-full transition-all duration-500 ${
                      idx === current
                        ? 'w-6 bg-gold-400'
                        : idx < current
                          ? 'w-2 bg-forest-400/70'
                          : 'w-2 bg-cream-100/20'
                    }`}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </nav>
  );
}
