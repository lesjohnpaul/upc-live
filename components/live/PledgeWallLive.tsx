'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { PledgeActivity } from '@/lib/types';
import { tallyPledge } from '@/lib/aggregate';
import { useLiveResponses } from './useLiveResponses';
import AnswerCount from './AnswerCount';

/** One rotation drives both the school pills and the quote — a single rhythm. */
const ROTATE_MS = 6000;

/**
 * School pills per page. Measured on a 1080p stage: a real school name
 * ("Mataas na Paaralang Neptali A. Gonzales") is ~670px wide at the
 * --text-stage-min floor, so pills land roughly one per row and each row costs
 * ~74px. Four is what fits once the count, the quote and the footer have taken
 * their share. The room is ~30 schools, so the list pages rather than shrinks —
 * same rule as the commitment wall: a school that cannot read its own name from
 * the back row has not had the moment this activity exists for.
 */
const PAGE_SIZE = 4;

/**
 * The signing wall. A big signature count, the schools paging through as they
 * sign, and one One Voice sentence at a time underneath.
 *
 * Two deliberate choices. The count is signatures, not participants: the
 * pledge card only writes `signed: true` on the sign tap, so the number can
 * never run ahead of the room's actual commitment. And the voices rotate
 * rather than tile — the whole point of the beat is that one sentence lands,
 * and eight sentences at once is a wall nobody reads.
 */
export default function PledgeWallLive({
  activity,
  sessionId,
}: {
  activity: PledgeActivity;
  sessionId: string;
}) {
  const { rows, participantCount } = useLiveResponses(sessionId, activity.id);
  const { signed, schools, voices } = tallyPledge(rows);
  const reduce = useReducedMotion();

  const pages = Math.max(1, Math.ceil(schools.length / PAGE_SIZE));
  const spins = Math.max(pages, voices.length, 1);

  // free-running counter taken modulo at render, so a signature arriving
  // mid-cycle can never strand the rotation past the end of either list
  const [ticks, setTicks] = useState(0);
  useEffect(() => {
    if (spins <= 1) return;
    const timer = setInterval(() => setTicks((t) => t + 1), ROTATE_MS);
    return () => clearInterval(timer);
  }, [spins]);

  const page = ticks % pages;
  const shown = schools.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);
  const voice = voices.length ? voices[ticks % voices.length] : null;

  return (
    <div data-mode="rally" className="flex w-full flex-col items-center gap-5 text-center">
      {/* count and label share a baseline: stacking them cost ~100px of a
          1080p stage that the quote needs more than the whitespace does */}
      <p className="flex flex-wrap items-baseline justify-center gap-x-5 gap-y-1">
        <span className="font-catalyst-display text-[clamp(3.5rem,8vw,8rem)] font-black leading-none tracking-tighter text-[var(--accent)] tabular-nums">
          {signed}
        </span>
        <span className="font-catalyst-display text-stage-body font-extrabold uppercase leading-none tracking-tight text-[var(--fg)]">
          {signed === 1 ? 'leader has signed' : 'leaders have signed'}
        </span>
      </p>

      {shown.length > 0 && (
        <AnimatePresence mode="wait">
          <motion.ul
            key={`p${page}`}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -12 }}
            /* 260ms = rally's --motion-slow */
            transition={{ duration: 0.26 }}
            className="flex max-w-6xl flex-wrap items-center justify-center gap-2.5"
          >
            {shown.map((school) => (
              <li
                key={school}
                className="rounded-full bg-[var(--bg-raised)] px-5 py-1.5 font-catalyst-body text-stage-min font-bold text-[var(--fg)] ring-1 ring-[var(--accent)]/40"
              >
                {school}
              </li>
            ))}
          </motion.ul>
        </AnimatePresence>
      )}

      {voice && (
        <AnimatePresence mode="wait">
          <motion.figure
            key={`v${ticks % Math.max(1, voices.length)}`}
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -14 }}
            transition={{ duration: 0.26 }}
          >
            {/* rem, not ch: `ch` resolves against the figure's inherited 16px,
                not the blockquote's own size, and silently caps this at ~280px */}
            <blockquote className="mx-auto max-w-[48rem] font-catalyst-body text-stage-body font-medium leading-snug text-[var(--fg)] [text-wrap:balance]">
              “{voice.voice}”
            </blockquote>
            {voice.school && (
              <figcaption className="mt-2 font-catalyst-body text-stage-min font-bold uppercase tracking-wide text-[var(--accent)]">
                {voice.school}
              </figcaption>
            )}
          </motion.figure>
        </AnimatePresence>
      )}

      <div className="flex items-center gap-6">
        <AnswerCount answered={signed} total={participantCount} label="signed" />
        {schools.length > 0 && (
          <p className="font-catalyst-body text-[length:var(--text-meta)] font-bold tabular-nums text-[var(--fg)]/60">
            {schools.length} {schools.length === 1 ? 'school' : 'schools'}
            {pages > 1 && ` · ${page + 1}/${pages}`}
          </p>
        )}
      </div>
    </div>
  );
}
