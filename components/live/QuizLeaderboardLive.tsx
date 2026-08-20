'use client';

import { motion } from 'framer-motion';
import { quizLeaderboard, type ResponseRow } from '@/lib/aggregate';
import { ROLES, type QuizActivity } from '@/lib/types';
import RoleBadge from '@/components/ui/RoleBadge';
import { useLiveResponses } from './useLiveResponses';
import AnswerCount from './AnswerCount';

const medal: Record<number, string> = {
  0: 'bg-[var(--accent)]/15 ring-[var(--accent)]/50',
  1: 'bg-[var(--fg)]/10 ring-[var(--fg-muted)]/40',
  2: 'bg-[var(--accent-alt)]/15 ring-[var(--accent-alt)]/50',
};

const rankText: Record<number, string> = {
  0: 'text-[var(--accent-soft)]',
  1: 'text-[var(--fg-muted)]',
  2: 'text-[var(--accent-alt-soft)]',
};

/** Answer key, revealed only when the presenter asks: correct option per
    question plus how much of the room got it — the split questions are the
    ones to debrief. */
function QuizAnswers({ activity, rows }: { activity: QuizActivity; rows: ResponseRow[] }) {
  const answered = rows.filter((r) => {
    const a = (r.payload as { answers?: unknown } | null)?.answers;
    return Array.isArray(a) && a.length > 0;
  });

  return (
    <ol className="w-full max-w-3xl space-y-2.5 text-left">
      {activity.questions.map((q, i) => {
        const correct = answered.filter((r) => {
          const a = (r.payload as { answers?: unknown } | null)?.answers;
          return Array.isArray(a) && a[i] === q.correct;
        }).length;
        const pct = answered.length ? Math.round((correct / answered.length) * 100) : null;
        return (
          <li
            key={i}
            className="flex items-center gap-4 rounded-xl bg-[var(--bg-raised)]/70 px-5 py-3 ring-1 ring-[var(--fg)]/10"
          >
            <span className="flex-1 font-sans text-[clamp(1rem,1.6vw,1.4rem)] font-bold text-[var(--fg)]">
              {q.prompt}
            </span>
            <span className="shrink-0 rounded-full bg-[var(--accent)]/15 px-4 py-1.5 font-sans text-[clamp(0.85rem,1.3vw,1.15rem)] font-bold text-[var(--accent-soft)] ring-1 ring-[var(--accent)]/40">
              {q.options[q.correct]}
            </span>
            {pct !== null && (
              <span className="w-14 shrink-0 text-right font-display text-[clamp(1rem,1.7vw,1.5rem)] font-medium tabular-nums text-[var(--fg)]/70">
                {pct}%
              </span>
            )}
          </li>
        );
      })}
    </ol>
  );
}

/** Top 10 quiz scores with animated reorder; gold/silver/bronze top 3. */
export default function QuizLeaderboardLive({
  activity,
  sessionId,
  reveal = false,
}: {
  activity: QuizActivity;
  sessionId: string;
  reveal?: boolean;
}) {
  const { rows, participants, participantCount } = useLiveResponses(sessionId, activity.id);
  const board = quizLeaderboard(rows, activity).slice(0, 10);
  const byId = new Map(participants.map((p) => [p.id, p]));

  if (reveal) {
    return (
      <div className="flex w-full max-w-3xl flex-col items-center">
        <QuizAnswers activity={activity} rows={rows} />
        <p className="mt-4 font-sans text-[clamp(0.85rem,1.3vw,1.1rem)] text-[var(--fg)]/50">
          % = how many of the room got it right
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl text-center">
      {board.length === 0 ? (
        <p className="py-16 font-sans text-[clamp(1.1rem,1.8vw,1.6rem)] text-[var(--fg)]/50">
          Waiting for the first answers…
        </p>
      ) : (
        <ol className="space-y-2.5 text-left">
          {board.map(({ participant_id, score }, rank) => {
            const p = byId.get(participant_id);
            return (
              <motion.li
                key={participant_id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 90, damping: 18 }}
                className={`flex items-center gap-4 rounded-xl px-5 py-3 ring-1 ${
                  medal[rank] ?? 'bg-[var(--bg-raised)]/70 ring-[var(--fg)]/10'
                }`}
              >
                <span
                  className={`w-8 font-display text-[clamp(1.2rem,2vw,1.8rem)] font-medium tabular-nums ${
                    rankText[rank] ?? 'text-[var(--fg)]/50'
                  }`}
                >
                  {rank + 1}
                </span>
                <span className="flex-1 truncate font-sans text-[clamp(1rem,1.6vw,1.4rem)] font-bold">
                  {p ? p.nickname || ROLES[p.role] : '—'}
                </span>
                {p && <RoleBadge role={p.role} className="min-h-7 px-3 !text-xs" />}
                <span
                  className={`font-display text-[clamp(1.2rem,2vw,1.8rem)] font-medium tabular-nums ${
                    rankText[rank] ?? 'text-[var(--fg)]/80'
                  }`}
                >
                  {score}
                  <span className="ml-1 font-sans text-sm text-[var(--fg)]/50">
                    /{activity.questions.length}
                  </span>
                </span>
              </motion.li>
            );
          })}
        </ol>
      )}
      <div className="mt-5 flex justify-center">
        <AnswerCount answered={rows.length} total={participantCount} />
      </div>
    </div>
  );
}
