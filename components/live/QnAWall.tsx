'use client';

import { AnimatePresence, motion } from 'framer-motion';
import type { QnaActivity } from '@/lib/types';
import { ROLES } from '@/lib/types';
import { useLiveResponses } from './useLiveResponses';
import AnswerCount from './AnswerCount';

const MAX_VISIBLE = 12;

type QnaPayload = { question?: unknown; answered?: unknown };

/**
 * Moderated question wall: only unanswered questions (dashboard toggles
 * payload.answered), newest first, capped at 12, in a column flow.
 */
export default function QnAWall({
  activity,
  sessionId,
}: {
  activity: QnaActivity;
  sessionId: string;
}) {
  const { rows, participants, participantCount } = useLiveResponses(sessionId, activity.id);
  const byId = new Map(participants.map((p) => [p.id, p]));
  const visible = rows
    .filter((r) => {
      const p = r.payload as QnaPayload | null;
      return typeof p?.question === 'string' && p.question.trim() && p.answered !== true;
    })
    .sort((a, b) => b.created_at.localeCompare(a.created_at))
    .slice(0, MAX_VISIBLE);

  return (
    <div className="w-full max-w-6xl text-center">
      {visible.length === 0 ? (
        <p className="py-16 font-sans text-[clamp(1.1rem,1.8vw,1.6rem)] text-cream-100/50">
          Waiting for questions…
        </p>
      ) : (
        <div className="columns-1 gap-5 text-left md:columns-2 xl:columns-3 [&>*]:mb-5">
          <AnimatePresence>
            {visible.map((r) => {
              const p = byId.get(r.participant_id);
              return (
                <motion.div
                  key={r.participant_id}
                  layout
                  initial={{ opacity: 0, y: 18, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ type: 'spring', stiffness: 90, damping: 18 }}
                  className="break-inside-avoid rounded-2xl bg-[var(--bg-raised)]/80 p-5 ring-1 ring-[var(--fg)]/10"
                >
                  <p className="font-display text-[clamp(1.05rem,1.6vw,1.4rem)] font-medium leading-snug">
                    {(r.payload as QnaPayload).question as string}
                  </p>
                  {p && (
                    <p className="mt-3 font-sans text-[length:var(--text-meta)] text-[var(--fg)]/50">
                      {p.nickname || ROLES[p.role]}
                    </p>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
      <div className="mt-4 flex justify-center">
        <AnswerCount answered={rows.length} total={participantCount} label="asked" />
      </div>
    </div>
  );
}
