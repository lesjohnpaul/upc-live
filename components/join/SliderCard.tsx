'use client';

import { useEffect, useRef, useState } from 'react';
import type { SliderActivity } from '@/lib/types';
import { SendStatus, useResponse } from './useResponse';

type Props = {
  activity: SliderActivity;
  sessionId: string;
  participantId: string;
  tick: number;
};

export default function SliderCard({ activity, sessionId, participantId, tick }: Props) {
  const { remote, state, send, retry } = useResponse(sessionId, participantId, activity.id, tick);
  const mid = Math.round((activity.min + activity.max) / 2);
  const [value, setValue] = useState(mid);
  const touched = useRef(false);

  useEffect(() => {
    const v = remote?.value;
    if (!touched.current && typeof v === 'number') setValue(v);
  }, [remote]);

  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-display text-2xl font-medium leading-snug">{activity.prompt}</h2>

      <p className="text-center font-display text-7xl font-medium text-forest-700" aria-hidden>
        {value}
      </p>

      <input
        type="range"
        min={activity.min}
        max={activity.max}
        step={1}
        value={value}
        onChange={(e) => {
          touched.current = true;
          setValue(Number(e.target.value));
        }}
        aria-label={activity.prompt}
        aria-valuetext={String(value)}
        className="h-14 w-full accent-gold-500"
      />
      <div className="-mt-4 flex justify-between font-sans text-sm font-bold text-forest-600">
        <span>
          {activity.min} · {activity.minLabel ?? ''}
        </span>
        <span>
          {activity.maxLabel ?? ''} · {activity.max}
        </span>
      </div>

      <button
        type="button"
        onClick={() => {
          touched.current = true;
          void send({ value });
        }}
        className="min-h-14 rounded-full bg-forest-700 px-6 font-sans text-base font-bold text-cream-50"
      >
        {state === 'sent' ? 'Ipadala muli' : 'Ipadala'}
      </button>
      <SendStatus state={state} retry={retry} />
    </div>
  );
}
