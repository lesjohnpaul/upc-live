'use client';

import { motion } from 'framer-motion';
import { wordCloudCounts } from '@/lib/aggregate';
import type { WordCloudActivity } from '@/lib/types';
import { useLiveResponses } from './useLiveResponses';
import AnswerCount from './AnswerCount';

const MAX_WORDS = 40;

/** Words sized by count (1rem–4.5rem), floating in on a center-weighted wrap. */
export default function WordCloudLive({
  activity,
  sessionId,
}: {
  activity: WordCloudActivity;
  sessionId: string;
}) {
  const { rows, participantCount } = useLiveResponses(sessionId, activity.id);
  const words = wordCloudCounts(rows).slice(0, MAX_WORDS);
  const max = Math.max(1, ...words.map((w) => w.count));

  return (
    <div className="w-full max-w-5xl text-center">
      {words.length === 0 ? (
        <p className="py-16 font-sans text-[clamp(1.1rem,1.8vw,1.6rem)] text-cream-100/50">
          Waiting for the first words…
        </p>
      ) : (
        <ul className="flex flex-wrap items-center justify-center gap-x-[1.2em] gap-y-2 py-6">
          {words.map(({ word, count }) => {
            const scale = count / max;
            return (
              <motion.li
                key={word}
                layout
                initial={{ opacity: 0, y: 14, scale: 0.85 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 90, damping: 16 }}
                style={{ fontSize: `${(1 + 3.5 * scale).toFixed(2)}rem` }}
                className={`font-display font-medium leading-tight ${
                  scale > 0.66 ? 'text-gold-300' : scale > 0.33 ? 'text-cream-100' : 'text-cream-100/70'
                }`}
              >
                {word}
              </motion.li>
            );
          })}
        </ul>
      )}
      <div className="mt-4 flex justify-center">
        <AnswerCount answered={rows.length} total={participantCount} />
      </div>
    </div>
  );
}
