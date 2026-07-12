'use client';

import { useEffect, useRef, useState } from 'react';
import type { PollActivity } from '@/lib/types';
import { SendStatus, useResponse } from './useResponse';

type Props = {
  activity: PollActivity;
  sessionId: string;
  participantId: string;
  tick: number;
};

export default function PollCard({ activity, sessionId, participantId, tick }: Props) {
  const { remote, state, send, retry } = useResponse(sessionId, participantId, activity.id, tick);
  const [choice, setChoice] = useState<number | null>(null);
  const touched = useRef(false);

  useEffect(() => {
    const c = remote?.choice;
    if (!touched.current && typeof c === 'number') setChoice(c);
  }, [remote]);

  const pick = (i: number) => {
    touched.current = true;
    setChoice(i);
    void send({ choice: i });
  };

  return (
    <div className="flex flex-col gap-5">
      <h2 className="font-display text-2xl font-medium leading-snug">{activity.prompt}</h2>
      <div className="flex flex-col gap-3" role="radiogroup" aria-label={activity.prompt}>
        {activity.options.map((opt, i) => (
          <button
            key={i}
            type="button"
            role="radio"
            aria-checked={choice === i}
            onClick={() => pick(i)}
            className={`min-h-14 rounded-2xl px-5 py-3 text-left font-sans text-base font-bold ring-1 transition-colors ${
              choice === i
                ? 'bg-forest-700 text-cream-50 ring-forest-700'
                : 'bg-cream-100 text-forest-900 ring-cream-300 active:bg-cream-200'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
      <SendStatus state={state} retry={retry} />
      {state === 'sent' && (
        <p className="-mt-4 text-center font-sans text-sm text-forest-500">
          You can still change your answer while the activity is open.
        </p>
      )}
    </div>
  );
}
