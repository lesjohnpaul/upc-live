'use client';

type ProgressRailProps = {
  /** ordered groups, e.g. one per module: { label: "M3", slides: 8 } */
  groups: { label: string; slides: number }[];
  /** global slide index across all groups, 0-based */
  current: number;
  className?: string;
};

/**
 * Thin bottom rail. Small decks get one tick per slide; decks with more
 * than 40 slides collapse each module into a proportional fill bar so the
 * rail never overflows a 1280px projector.
 */
export default function ProgressRail({ groups, current, className = '' }: ProgressRailProps) {
  /* ponytail: O(n²) prefix sums — n is module count, always tiny */
  const starts = groups.map((_, i) =>
    groups.slice(0, i).reduce((sum, g) => sum + g.slides, 0),
  );
  const total = groups.reduce((sum, g) => sum + g.slides, 0);
  const dense = total > 40;

  return (
    <nav
      aria-label="Slide progress"
      className={`pointer-events-none fixed inset-x-0 bottom-0 z-20 flex items-end justify-center gap-4 px-8 pb-4 ${className}`}
    >
      {groups.map((group, gi) => {
        const start = starts[gi];
        const groupActive = current >= start && current < start + group.slides;
        return (
          <div
            key={gi}
            className="flex min-w-0 flex-col items-center gap-1.5"
            style={dense ? { flexGrow: group.slides, flexBasis: 0 } : undefined}
          >
            <span
              className={`max-w-full truncate font-sans text-[0.6rem] font-bold uppercase tracking-[0.2em] transition-opacity duration-500 ${
                groupActive ? 'text-gold-300 opacity-100' : 'text-cream-200 opacity-0'
              }`}
            >
              {group.label}
            </span>
            {dense ? (
              <div className="h-1 w-full overflow-hidden rounded-full bg-cream-100/20">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    groupActive ? 'bg-gold-400' : 'bg-forest-400/70'
                  }`}
                  style={{
                    width:
                      current >= start + group.slides
                        ? '100%'
                        : groupActive
                          ? `${((current - start + 1) / group.slides) * 100}%`
                          : '0%',
                  }}
                />
              </div>
            ) : (
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
            )}
          </div>
        );
      })}
    </nav>
  );
}
