'use client';

import { useEffect, useRef, useState } from 'react';
import type { FeedbackActivity } from '@/lib/types';
import { SendStatus, useResponse } from './useResponse';

type Props = {
  activity: FeedbackActivity;
  sessionId: string;
  participantId: string;
  tick: number;
};

type Stars = Record<string, number>;

const SCALE = [1, 2, 3, 4, 5];
const SCALE_LABEL: Record<number, string> = {
  1: 'Poor',
  2: 'Fair',
  3: 'Good',
  4: 'Very good',
  5: 'Excellent',
};

/** Five tappable stars. Each star is its own 44px+ target — thumbs, not styluses. */
function StarRow({
  label,
  value,
  onPick,
}: {
  label: string;
  value: number;
  onPick: (n: number) => void;
}) {
  return (
    <fieldset className="rounded-2xl bg-cream-100 p-4 ring-1 ring-cream-300">
      <legend className="px-1 font-sans text-sm font-bold text-forest-800">{label}</legend>
      <div className="mt-2 flex items-center justify-between gap-1">
        {SCALE.map((n) => {
          const on = n <= value;
          return (
            <button
              key={n}
              type="button"
              onClick={() => onPick(n)}
              aria-label={`${n} of 5 — ${SCALE_LABEL[n]}`}
              aria-pressed={value === n}
              className={`flex size-14 items-center justify-center rounded-xl text-3xl transition-transform active:scale-90 ${
                on ? 'text-gold-500' : 'text-cream-400'
              }`}
            >
              {on ? '★' : '☆'}
            </button>
          );
        })}
      </div>
      <p className="mt-1 min-h-5 text-center font-sans text-xs font-bold text-forest-600">
        {value ? SCALE_LABEL[value] : ''}
      </p>
    </fieldset>
  );
}

export default function FeedbackCard({ activity, sessionId, participantId, tick }: Props) {
  const { remote, state, send, retry } = useResponse(sessionId, participantId, activity.id, tick);
  const [stars, setStars] = useState<Stars>({});
  const [comment, setComment] = useState('');
  const touched = useRef(false);

  useEffect(() => {
    if (touched.current || !remote) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-shot hydration
    if (remote.stars && typeof remote.stars === 'object') setStars(remote.stars as Stars);
    if (typeof remote.comment === 'string') setComment(remote.comment);
  }, [remote]);

  const pick = (dimensionId: string, n: number) => {
    touched.current = true;
    setStars((s) => ({ ...s, [dimensionId]: n }));
  };

  // one star is enough to submit; the comment is always optional
  const rated = activity.dimensions.some((d) => stars[d.id] > 0);

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="font-display text-2xl font-medium leading-snug">{activity.title}</h2>
        {activity.intro && (
          <p className="mt-2 font-sans text-forest-700">{activity.intro}</p>
        )}
      </div>

      {activity.dimensions.map((d) => (
        <StarRow
          key={d.id}
          label={d.label}
          value={stars[d.id] ?? 0}
          onPick={(n) => pick(d.id, n)}
        />
      ))}

      <label className="flex flex-col gap-2">
        <span className="font-sans text-sm font-bold text-forest-800">
          {activity.commentPrompt}{' '}
          <span className="font-normal text-forest-500">(optional)</span>
        </span>
        <textarea
          value={comment}
          onChange={(e) => {
            touched.current = true;
            setComment(e.target.value);
          }}
          maxLength={400}
          rows={4}
          placeholder={activity.commentPlaceholder}
          className="rounded-2xl bg-cream-100 p-4 font-sans text-base text-forest-950 ring-1 ring-cream-300 placeholder:text-cream-500 focus:outline-none focus:ring-2 focus:ring-gold-500"
        />
        <span className="text-right font-sans text-xs text-forest-500">{comment.length}/400</span>
      </label>

      <button
        type="button"
        disabled={!rated}
        onClick={() => {
          touched.current = true;
          void send({ stars, comment: comment.trim() });
        }}
        className="min-h-14 rounded-full bg-forest-700 px-6 font-sans text-base font-bold text-cream-50 disabled:opacity-40"
      >
        {state === 'sent' ? 'Update my feedback' : 'Send feedback'}
      </button>
      <SendStatus state={state} retry={retry} sentLabel="Feedback recorded ✓ Salamat!" />
    </div>
  );
}
