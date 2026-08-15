'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ROLES, type PlanActivity } from '@/lib/types';
import { groupBySchool, type SchoolPlan } from '@/lib/aggregate';
import { useLiveResponses } from './useLiveResponses';
import AnswerCount from './AnswerCount';

/**
 * Schools per page. Deliberately small: two 140-character commitments at
 * --text-stage-min already fill half a 1080p stage, and the rule here is that
 * the wall PAGES rather than shrinks. If the type ever gets bigger this number
 * goes down, never the other way round.
 */
const PAGE_SIZE = 2;
const PAGE_MS = 7000;

/**
 * A pair who both wrote near the 140-character cap makes a card too tall to
 * share a row on a 1080p stage — measured, not guessed. They get the page to
 * themselves and the full slide width, which halves their wrapped line count
 * at the same type size. Shrinking the type instead is the one thing this wall
 * must never do.
 */
const isWide = (school: SchoolPlan) =>
  school.entries.reduce((n, e) => n + e.commitment.length, 0) > 200;

function paginate(schools: SchoolPlan[]): SchoolPlan[][] {
  const pages: SchoolPlan[][] = [];
  for (const school of schools) {
    const last = pages.at(-1);
    if (!last || last.length >= PAGE_SIZE || isWide(school) || last.some(isWide))
      pages.push([school]);
    else last.push(school);
  }
  return pages;
}

/**
 * The wall. Every school's 90-day commitment, with the school's own name on it,
 * grouped so the SSLG president and their adviser share one card.
 *
 * Overflow is handled by cycling pages on a timer — never by shrinking the
 * type. A room that cannot read its own school name from the back row has not
 * had the moment this activity exists for.
 */
export default function PlanWallLive({
  activity,
  sessionId,
}: {
  activity: PlanActivity;
  sessionId: string;
}) {
  const { rows, participants, participantCount } = useLiveResponses(sessionId, activity.id);
  const paged = paginate(groupBySchool(rows, participants));
  const schoolCount = paged.reduce((n, p) => n + p.length, 0);
  const pages = Math.max(1, paged.length);

  // free-running counter, taken modulo at render: the timer never needs to know
  // the page count, so a school arriving mid-cycle can't strand us past the end
  const [ticks, setTicks] = useState(0);
  useEffect(() => {
    if (pages <= 1) return;
    const timer = setInterval(() => setTicks((t) => t + 1), PAGE_MS);
    return () => clearInterval(timer);
  }, [pages]);
  const page = ticks % pages;
  const visible = paged[page] ?? [];

  return (
    <div data-mode="rally" className="w-full font-catalyst-body text-[var(--fg)]">
      {schoolCount === 0 ? (
        <p className="py-16 text-center text-stage-body text-[var(--fg-muted)]">
          Waiting for the first school…
        </p>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            /* 260ms = rally's --motion-slow */
            transition={{ duration: 0.26 }}
            className={`grid items-start gap-6 ${visible.length > 1 ? 'md:grid-cols-2' : ''}`}
          >
            {visible.map((school) => (
              <SchoolCard key={school.key} school={school} />
            ))}
          </motion.div>
        </AnimatePresence>
      )}

      <div className="mt-4 flex items-center justify-center gap-6">
        <AnswerCount answered={rows.length} total={participantCount} label="committed" />
        <p className="text-stage-min font-bold tabular-nums text-[var(--fg-muted)]">
          {schoolCount} {schoolCount === 1 ? 'school' : 'schools'}
        </p>
        {pages > 1 && (
          <p className="flex items-center gap-3 text-stage-min font-bold tabular-nums text-[var(--fg-muted)]">
            <span className="flex gap-1.5" aria-hidden>
              {Array.from({ length: pages }, (_, i) => (
                <span
                  key={i}
                  className={`size-2.5 rounded-full ${
                    i === page ? 'bg-[var(--accent)]' : 'bg-[var(--fg-muted)]'
                  }`}
                />
              ))}
            </span>
            {page + 1} / {pages}
          </p>
        )}
      </div>
    </div>
  );
}

function SchoolCard({ school }: { school: SchoolPlan }) {
  return (
    <div className="flex flex-col gap-3 rounded-3xl border-l-4 border-[var(--accent)] bg-[var(--bg-raised)] p-[clamp(1.25rem,1.5vw,1.5rem)]">
      <h3 className="font-catalyst-display text-[clamp(1.6rem,2.2vw,2.25rem)] font-extrabold uppercase leading-tight tracking-tight text-[var(--accent)] [text-wrap:balance]">
        {school.name}
      </h3>
      {school.entries.map((entry, i) => (
        <div key={i} className="flex flex-col gap-1">
          <p className="text-stage-min font-bold uppercase text-[var(--fg-muted)]">
            {entry.role ? ROLES[entry.role] : 'Commitment'}
            {entry.when && ` · ${entry.when}`}
          </p>
          {/* --text-stage-min is the floor for anything on the projector */}
          <p className="text-stage-min leading-snug text-[var(--fg)]">{entry.commitment}</p>
        </div>
      ))}
    </div>
  );
}
