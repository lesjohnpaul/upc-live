'use client';

import type { Slide } from '@/lib/types';
import SlideShell from '@/components/ui/SlideShell';
import Kicker from '@/components/ui/Kicker';
import { ACTIVITY_META, activityPrompt } from '@/components/live/activityMeta';
import LiveResults from '@/components/live/LiveResults';
import type { StageLive } from '@/components/live/useSessionState';

/**
 * Activity slide: when this activity is the session's open one, render the
 * live results layer; otherwise a locked placeholder. Renders fine with zero
 * network — `live.offline` just swaps the hint text, deck nav is untouched.
 */
export default function ActivitySlide({
  slide,
  live,
}: {
  slide: Extract<Slide, { kind: 'activity' }>;
  live?: StageLive;
}) {
  const { activity } = slide;
  const meta = ACTIVITY_META[activity.kind];
  const prompt = activityPrompt(activity);
  const isOpen = !!live?.sessionId && live.activeId === activity.id;

  if (isOpen && live.sessionId) {
    return (
      <SlideShell>
        <Kicker>
          Activity · {meta.label}
          <span className="inline-flex items-center gap-2 text-gold-300">
            <span aria-hidden className="size-2.5 animate-breathe rounded-full bg-gold-400" />
            LIVE
          </span>
        </Kicker>
        <p className="mx-auto mt-6 max-w-[36ch] text-center font-display text-[clamp(1.5rem,2.6vw,2.5rem)] font-medium leading-tight [text-wrap:balance]">
          {prompt}
        </p>
        <div className="mt-8 flex w-full flex-col items-center">
          <LiveResults activity={activity} sessionId={live.sessionId} />
        </div>
      </SlideShell>
    );
  }

  return (
    <SlideShell>
      <Kicker>Activity · {meta.label}</Kicker>
      <div className="mt-10 w-full max-w-4xl rounded-3xl bg-forest-900/80 p-[clamp(2rem,4vw,4rem)] text-center shadow-2xl shadow-forest-950/60 ring-1 ring-cream-100/10">
        <span aria-hidden className="text-[clamp(3rem,6vw,5rem)]">
          {meta.icon}
        </span>
        <p className="mx-auto mt-6 max-w-[28ch] font-display text-[clamp(1.8rem,3.4vw,3.2rem)] font-medium leading-tight [text-wrap:balance]">
          {prompt}
        </p>
        {activity.kind === 'poll' && (
          <ul className="mx-auto mt-8 max-w-2xl space-y-3 text-left">
            {activity.options.map((option, i) => (
              <li
                key={i}
                className="rounded-xl bg-forest-800/70 px-6 py-3 font-sans text-[clamp(1rem,1.6vw,1.4rem)] ring-1 ring-cream-100/10"
              >
                <span className="mr-3 font-bold text-gold-400">{String.fromCharCode(65 + i)}</span>
                {option}
              </li>
            ))}
          </ul>
        )}
        <p className="mt-10 inline-flex items-center gap-3 rounded-full bg-cream-100/8 px-6 py-3 font-sans text-[clamp(0.95rem,1.4vw,1.3rem)] font-bold tracking-wide text-cream-100/70 ring-1 ring-cream-100/15">
          <span aria-hidden>{live?.offline ? '📡' : '🔒'}</span>
          {live?.offline
            ? 'Offline — live results unavailable'
            : 'Locked — open from the dashboard'}
        </p>
      </div>
    </SlideShell>
  );
}
