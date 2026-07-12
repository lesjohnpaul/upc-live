'use client';

import type { Activity, Slide } from '@/lib/types';
import SlideShell from '@/components/ui/SlideShell';
import Kicker from '@/components/ui/Kicker';

const ACTIVITY_META: Record<Activity['kind'], { icon: string; label: string }> = {
  poll: { icon: '📊', label: 'Poll' },
  wordcloud: { icon: '💬', label: 'Word Cloud' },
  slider: { icon: '🎚️', label: 'Slider' },
  dragdrop: { icon: '🧩', label: 'Pagbubukod' },
  quiz: { icon: '⚡', label: 'Quiz' },
  qna: { icon: '❓', label: 'Q&A' },
};

/**
 * Placeholder panel for activity slides — the live layer swaps this
 * component for real-time results in the next task.
 */
export default function ActivitySlide({ slide }: { slide: Extract<Slide, { kind: 'activity' }> }) {
  const { activity } = slide;
  const meta = ACTIVITY_META[activity.kind];
  const prompt = activity.kind === 'quiz' ? activity.title : activity.prompt;

  return (
    <SlideShell>
      <Kicker>Aktibidad · {meta.label}</Kicker>
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
        <p className="mt-10 inline-flex items-center gap-3 rounded-full bg-gold-400/15 px-6 py-3 font-sans text-[clamp(0.95rem,1.4vw,1.3rem)] font-bold tracking-wide text-gold-300 ring-1 ring-gold-400/40">
          <span aria-hidden>📱</span> Sagutin sa inyong phone
        </p>
      </div>
    </SlideShell>
  );
}
