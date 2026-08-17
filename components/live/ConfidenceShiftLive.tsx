'use client';

import { motion } from 'framer-motion';
import { confidenceShift } from '@/lib/aggregate';
import type { SliderActivity } from '@/lib/types';
import { findSliderPair } from '@/content';
import { useLiveResponses, type LiveResponse } from './useLiveResponses';
import AnswerCount from './AnswerCount';

function liveAvg(rows: LiveResponse[]): number {
  return confidenceShift(rows, []).beforeAvg;
}

function BigNumber({ value, gold = false }: { value: number; gold?: boolean }) {
  return (
    <motion.span
      key={value.toFixed(1)}
      initial={{ scale: 0.85, opacity: 0.4 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 14 }}
      className={`block font-display text-[clamp(4rem,9vw,9rem)] font-medium leading-none tabular-nums ${
        gold ? 'text-[var(--accent-soft)]' : 'text-[var(--fg)]'
      }`}
    >
      {value.toFixed(1)}
    </motion.span>
  );
}

/** Live average for a single slider phase — the 'before' slide, mid-session. */
export function SliderAverageLive({
  activity,
  sessionId,
}: {
  activity: SliderActivity;
  sessionId: string;
}) {
  const { rows, participantCount } = useLiveResponses(sessionId, activity.id);
  return (
    <div className="flex w-full flex-col items-center text-center">
      <BigNumber value={liveAvg(rows)} gold />
      <p className="mt-4 font-sans text-[clamp(1rem,1.5vw,1.3rem)] text-[var(--fg)]/60">
        {activity.min} = {activity.minLabel ?? 'lowest'} · {activity.max} ={' '}
        {activity.maxLabel ?? 'highest'}
      </p>
      <div className="mt-4">
        <AnswerCount answered={rows.length} total={participantCount} />
      </div>
    </div>
  );
}

/**
 * Before vs after averages for a slider pair, with an animated arrow and the
 * delta. Rendered on the 'after' slide; the 'before' activity is found by
 * pairId in content.
 */
export default function ConfidenceShiftLive({
  activity,
  sessionId,
}: {
  activity: SliderActivity;
  sessionId: string;
}) {
  const before = findSliderPair(activity.pairId, 'before');
  const beforeLive = useLiveResponses(sessionId, before?.id ?? `${activity.pairId}-missing`);
  const afterLive = useLiveResponses(sessionId, activity.id);
  const shift = confidenceShift(beforeLive.rows, afterLive.rows);
  const rising = shift.delta >= 0;

  return (
    <div className="flex w-full flex-col items-center text-center">
      <div className="flex items-center justify-center gap-[clamp(2rem,5vw,5rem)]">
        <div>
          <p className="font-sans text-sm font-bold uppercase tracking-[0.24em] text-[var(--fg)]/50">
            Before
          </p>
          <BigNumber value={shift.beforeAvg} />
          <AnswerCount answered={beforeLive.rows.length} total={beforeLive.participantCount} />
        </div>

        <motion.span
          aria-hidden
          animate={{ x: [0, 14, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="font-display text-[clamp(2.5rem,5vw,5rem)] text-[var(--accent)]"
        >
          →
        </motion.span>

        <div>
          <p className="font-sans text-sm font-bold uppercase tracking-[0.24em] text-[var(--accent-soft)]/80">
            After
          </p>
          <BigNumber value={shift.afterAvg} gold />
          <AnswerCount answered={afterLive.rows.length} total={afterLive.participantCount} />
        </div>
      </div>

      <motion.p
        key={shift.delta.toFixed(1)}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`mt-8 inline-flex items-center gap-2 rounded-full px-6 py-2.5 font-sans text-[clamp(1.1rem,1.8vw,1.6rem)] font-bold ring-1 ${
          rising
            ? 'bg-[var(--accent)]/15 text-[var(--accent-soft)] ring-[var(--accent)]/40'
            : 'bg-[var(--accent-alt)]/15 text-[var(--accent-alt-soft)] ring-[var(--accent-alt)]/40'
        }`}
      >
        {rising ? '▲' : '▼'} {rising ? '+' : ''}
        {shift.delta.toFixed(1)}
      </motion.p>
    </div>
  );
}
