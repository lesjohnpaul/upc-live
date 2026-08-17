'use client';

import { motion } from 'framer-motion';
import { quizLeaderboard } from '@/lib/aggregate';
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

/** Top 10 quiz scores with animated reorder; gold/silver/bronze top 3. */
export default function QuizLeaderboardLive({
  activity,
  sessionId,
}: {
  activity: QuizActivity;
  sessionId: string;
}) {
  const { rows, participants, participantCount } = useLiveResponses(sessionId, activity.id);
  const board = quizLeaderboard(rows, activity).slice(0, 10);
  const byId = new Map(participants.map((p) => [p.id, p]));

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
