'use client';

import type { ToleranceActivity } from '@/lib/types';
import { TOLERANCE_TAPS } from '@/lib/tolerance';
import { useLiveResponses } from './useLiveResponses';
import AnswerCount from './AnswerCount';

type Payload = { peakReward?: number; finalReward?: number };

/**
 * The room's collective curve. A row is only written at the reveal, so every
 * row is somebody who tapped all the way through and felt the payout die —
 * the count IS the "have felt it" number, no filtering needed.
 */
export default function ToleranceLive({
  activity,
  sessionId,
}: {
  activity: ToleranceActivity;
  sessionId: string;
}) {
  const { rows, participantCount } = useLiveResponses(sessionId, activity.id);

  const ratios = rows.flatMap((r) => {
    const p = r.payload as Payload | null;
    return typeof p?.peakReward === 'number' &&
      p.peakReward > 0 &&
      typeof p.finalReward === 'number'
      ? [p.finalReward / p.peakReward]
      : [];
  });
  const pct = ratios.length
    ? Math.round((ratios.reduce((a, b) => a + b, 0) / ratios.length) * 100)
    : null;

  return (
    <div data-mode="rally" className="flex flex-col items-center gap-5 py-8 text-center">
      <p className="font-catalyst-display text-stat font-black tracking-tighter text-[var(--accent)] tabular-nums">
        {rows.length}
        <span className="text-[var(--fg-muted)]"> of </span>
        {participantCount}
      </p>
      <p className="font-catalyst-display text-stage-body font-extrabold uppercase leading-none tracking-tight text-[var(--fg)]">
        have felt it
      </p>
      {pct !== null && (
        <p className="max-w-[26ch] font-catalyst-body text-stage-min leading-snug text-[var(--fg-muted)]">
          {/* every player stops at the same tap, so the ordinal is fixed;
              16th and 20th both take "th" */}
          Their {TOLERANCE_TAPS}th tap paid{' '}
          <strong className="font-bold text-[var(--accent-hot)]">{pct}%</strong> of their first.
        </p>
      )}
      <AnswerCount answered={rows.length} total={participantCount} />
    </div>
  );
}
