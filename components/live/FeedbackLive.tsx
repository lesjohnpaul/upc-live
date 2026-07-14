'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { FeedbackActivity } from '@/lib/types';
import { useLiveResponses } from './useLiveResponses';
import AnswerCount from './AnswerCount';

type FeedbackPayload = { stars?: Record<string, number>; comment?: string };

const avg = (ns: number[]) => (ns.length ? ns.reduce((a, b) => a + b, 0) / ns.length : 0);

/** Five stars, filled proportionally to the average (4.3 → four and a bit). */
function StarMeter({ value }: { value: number }) {
  return (
    <span aria-hidden className="relative inline-block font-sans leading-none">
      <span className="text-cream-100/20">★★★★★</span>
      <span
        className="absolute inset-0 overflow-hidden text-gold-400"
        style={{ width: `${(value / 5) * 100}%` }}
      >
        ★★★★★
      </span>
    </span>
  );
}

/**
 * The trainer's own scorecard, live. Averages only — the written comments are
 * for the dashboard and the CSV, never the projector.
 */
export default function FeedbackLive({
  activity,
  sessionId,
}: {
  activity: FeedbackActivity;
  sessionId: string;
}) {
  const reduce = useReducedMotion();
  const { rows, participantCount } = useLiveResponses(sessionId, activity.id);

  const starsFor = (dimensionId: string) =>
    rows
      .map((r) => (r.payload as FeedbackPayload)?.stars?.[dimensionId])
      .filter((n): n is number => typeof n === 'number' && n > 0);

  const perDimension = activity.dimensions.map((d) => ({ ...d, value: avg(starsFor(d.id)) }));
  const overall = avg(perDimension.map((d) => d.value).filter((v) => v > 0));
  const comments = rows.filter(
    (r) => ((r.payload as FeedbackPayload)?.comment ?? '').trim() !== '',
  ).length;

  return (
    <div className="flex w-full max-w-5xl flex-col items-center gap-8">
      <div className="flex flex-col items-center">
        <motion.p
          key={overall.toFixed(1)}
          initial={reduce ? false : { scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[clamp(4rem,11vw,9rem)] font-medium leading-none text-cream-50"
        >
          {overall ? overall.toFixed(1) : '—'}
          <span className="text-[0.35em] text-cream-100/40"> / 5</span>
        </motion.p>
        <span className="mt-2 text-[clamp(1.5rem,3vw,2.5rem)] tracking-[0.15em]">
          <StarMeter value={overall} />
        </span>
      </div>

      <ul className="w-full max-w-3xl space-y-3">
        {perDimension.map((d) => (
          <li key={d.id} className="flex items-center gap-4">
            <span className="min-w-0 flex-1 truncate font-sans text-[clamp(0.95rem,1.5vw,1.35rem)] text-cream-100/75">
              {d.label}
            </span>
            <span className="text-[clamp(1rem,1.7vw,1.5rem)] tracking-[0.12em]">
              <StarMeter value={d.value} />
            </span>
            <span className="w-12 text-right font-display text-[clamp(1rem,1.7vw,1.5rem)] font-medium text-gold-300">
              {d.value ? d.value.toFixed(1) : '—'}
            </span>
          </li>
        ))}
      </ul>

      <div className="flex flex-col items-center gap-2">
        <AnswerCount answered={rows.length} total={participantCount} />
        <p className="font-sans text-[clamp(0.85rem,1.2vw,1.1rem)] text-cream-100/50">
          {comments === 0
            ? 'Written comments stay private — the trainer reads them after.'
            : `${comments} written ${comments === 1 ? 'comment' : 'comments'} — private, for the trainer only.`}
        </p>
      </div>
    </div>
  );
}
