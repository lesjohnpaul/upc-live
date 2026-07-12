'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { tallyPoll } from '@/lib/aggregate';
import type { PollActivity } from '@/lib/types';
import { useLiveResponses } from './useLiveResponses';
import AnswerCount from './AnswerCount';
import RoleSplit from './RoleSplit';

/**
 * Horizontal bars per option, spring-animated widths, gold highlight on the
 * leading option. `reveal` marks the correct bar when the activity has one.
 */
export default function PollResults({
  activity,
  sessionId,
  reveal = false,
}: {
  activity: PollActivity;
  sessionId: string;
  reveal?: boolean;
}) {
  const { rows, participants, participantCount } = useLiveResponses(sessionId, activity.id);
  const [showRoles, setShowRoles] = useState(false);
  const counts = tallyPoll(rows, activity.options.length);
  const total = counts.reduce((sum, c) => sum + c, 0);
  const max = Math.max(...counts);

  return (
    <div className="w-full max-w-4xl text-center">
      <ul className="space-y-3 text-left">
        {activity.options.map((option, i) => {
          const count = counts[i];
          const pct = total ? Math.round((count / total) * 100) : 0;
          const leading = count > 0 && count === max;
          const isCorrect = reveal && activity.correct === i;
          const dimmed = reveal && activity.correct !== undefined && activity.correct !== i;
          return (
            <li
              key={i}
              className={`relative overflow-hidden rounded-xl bg-forest-800/70 ring-1 transition-opacity duration-500 ${
                isCorrect ? 'ring-2 ring-gold-400' : 'ring-cream-100/10'
              } ${dimmed ? 'opacity-45' : ''}`}
            >
              <motion.div
                aria-hidden
                className={`absolute inset-y-0 left-0 ${
                  leading || isCorrect ? 'bg-gold-400/25' : 'bg-forest-600/40'
                }`}
                initial={false}
                animate={{ width: `${total ? (count / total) * 100 : 0}%` }}
                transition={{ type: 'spring', stiffness: 60, damping: 16 }}
              />
              <div className="relative flex items-center gap-4 px-6 py-3.5 font-sans text-[clamp(1rem,1.6vw,1.4rem)]">
                <span className={`font-bold ${leading || isCorrect ? 'text-gold-300' : 'text-gold-400/70'}`}>
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="flex-1">{option}</span>
                {isCorrect && (
                  <span aria-label="Tamang sagot" className="font-bold text-gold-300">
                    ✓
                  </span>
                )}
                <span className={`tabular-nums ${leading ? 'font-bold text-gold-300' : 'text-cream-100/70'}`}>
                  {count} · {pct}%
                </span>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="mt-5 flex items-center justify-center gap-6">
        <AnswerCount answered={total} total={participantCount} />
        <button
          type="button"
          onClick={() => setShowRoles((s) => !s)}
          aria-pressed={showRoles}
          className="rounded-full bg-cream-100/10 px-4 py-1.5 font-sans text-sm font-bold text-cream-100/80 ring-1 ring-cream-100/20 transition-colors hover:bg-cream-100/15"
        >
          {showRoles ? 'Itago ang papel' : 'Ayon sa papel'}
        </button>
      </div>

      {showRoles && <RoleSplit rows={rows} participants={participants} options={activity.options} />}
    </div>
  );
}
