'use client';

import type { Slide, StageMode } from '@/lib/types';
import SlideShell from '@/components/ui/SlideShell';
import Kicker from '@/components/ui/Kicker';
import JoinQr from '@/components/ui/JoinQr';
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
  code,
  live,
  mode,
}: {
  slide: Extract<Slide, { kind: 'activity' }>;
  code: string;
  live?: StageLive;
  mode: StageMode;
}) {
  const { activity } = slide;
  const meta = ACTIVITY_META[activity.kind];
  const prompt = activityPrompt(activity);
  const isOpen = !!live?.sessionId && live.activeId === activity.id;

  /**
   * Feedback is the closing slide and doubles as the rescue QR: phones that
   * closed the tab after the letter need a way back in, so the code stays on
   * screen whether the activity is locked or open.
   */
  if (activity.kind === 'feedback') {
    return (
      <SlideShell mode={mode}>
        <Kicker>
          Activity · {meta.label}
          {isOpen && (
            <span className="inline-flex items-center gap-2 text-[var(--accent-soft)]">
              <span aria-hidden className="size-2.5 animate-breathe rounded-full bg-[var(--accent)]" />
              LIVE
            </span>
          )}
        </Kicker>
        <h2 className="mx-auto mt-6 max-w-[24ch] text-center font-display text-[clamp(1.8rem,3.6vw,3.4rem)] font-medium leading-tight tracking-tight [text-wrap:balance]">
          {prompt}
        </h2>
        <div className="mt-10 flex w-full flex-col items-center justify-center gap-[clamp(2rem,5vw,5rem)] lg:flex-row lg:items-center">
          <JoinQr code={code} size="size-[min(30vh,30vw)]" />
          <div className="flex w-full max-w-3xl justify-center">
            {isOpen && live.sessionId ? (
              <LiveResults activity={activity} sessionId={live.sessionId} />
            ) : (
              <p className="inline-flex items-center gap-3 rounded-full bg-[var(--fg)]/8 px-6 py-3 text-center font-sans text-[clamp(0.95rem,1.4vw,1.3rem)] font-bold tracking-wide text-[var(--fg)]/70 ring-1 ring-[var(--fg)]/15">
                <span aria-hidden>{live?.offline ? '📡' : '🔒'}</span>
                {live?.offline
                  ? 'Offline — live results unavailable'
                  : 'Locked — open from the dashboard'}
              </p>
            )}
          </div>
        </div>
      </SlideShell>
    );
  }

  if (isOpen && live.sessionId) {
    return (
      <SlideShell mode={mode}>
        <Kicker>
          Activity · {meta.label}
          <span className="inline-flex items-center gap-2 text-[var(--accent-soft)]">
            <span aria-hidden className="size-2.5 animate-breathe rounded-full bg-[var(--accent)]" />
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
    <SlideShell mode={mode}>
      <Kicker>Activity · {meta.label}</Kicker>
      <div className="mt-10 w-full max-w-4xl rounded-3xl bg-[var(--bg-raised)]/80 p-[clamp(2rem,4vw,4rem)] text-center shadow-2xl shadow-[color:var(--shadow)]/60 ring-1 ring-[var(--fg)]/10">
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
                className="rounded-xl bg-[var(--bg-raised-2)]/70 px-6 py-3 font-sans text-[clamp(1rem,1.6vw,1.4rem)] ring-1 ring-[var(--fg)]/10"
              >
                <span className="mr-3 font-bold text-[var(--accent)]">{String.fromCharCode(65 + i)}</span>
                {option}
              </li>
            ))}
          </ul>
        )}
        <p className="mt-10 inline-flex items-center gap-3 rounded-full bg-[var(--fg)]/8 px-6 py-3 font-sans text-[clamp(0.95rem,1.4vw,1.3rem)] font-bold tracking-wide text-[var(--fg)]/70 ring-1 ring-[var(--fg)]/15">
          <span aria-hidden>{live?.offline ? '📡' : '🔒'}</span>
          {live?.offline
            ? 'Offline — live results unavailable'
            : 'Locked — open from the dashboard'}
        </p>
      </div>
    </SlideShell>
  );
}
