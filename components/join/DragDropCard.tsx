'use client';

import { useEffect, useRef, useState } from 'react';
import type { DragDropActivity } from '@/lib/types';
import { SendStatus, useResponse } from './useResponse';

type Props = {
  activity: DragDropActivity;
  sessionId: string;
  participantId: string;
  tick: number;
};

/** Phone-friendly sorter: tap an item, then tap a bucket. No HTML5 drag. */
export default function DragDropCard({ activity, sessionId, participantId, tick }: Props) {
  const { remote, state, send, retry } = useResponse(sessionId, participantId, activity.id, tick);
  const [placements, setPlacements] = useState<(number | null)[]>(
    () => activity.items.map(() => null),
  );
  const [selected, setSelected] = useState<number | null>(null);
  const touched = useRef(false);

  useEffect(() => {
    const p = remote?.placements;
    if (
      !touched.current &&
      Array.isArray(p) &&
      p.length === activity.items.length &&
      p.every((n) => typeof n === 'number')
    ) {
      setPlacements(p as number[]);
    }
  }, [remote, activity.items.length]);

  const trayItems = activity.items
    .map((item, i) => ({ item, i }))
    .filter(({ i }) => placements[i] === null);
  const allPlaced = placements.every((p) => p !== null);

  const place = (bucket: number) => {
    if (selected === null) return;
    touched.current = true;
    setPlacements((prev) => prev.map((p, i) => (i === selected ? bucket : p)));
    setSelected(null);
  };

  const unplace = (i: number) => {
    touched.current = true;
    setPlacements((prev) => prev.map((p, idx) => (idx === i ? null : p)));
  };

  return (
    <div className="flex flex-col gap-5">
      <h2 className="font-display text-2xl font-medium leading-snug">{activity.prompt}</h2>
      <p className="font-sans text-sm text-forest-600">
        I-tap ang item, tapos i-tap ang tamang kahon. I-tap ang nailagay para ibalik.
      </p>

      {/* tray */}
      {trayItems.length > 0 && (
        <div className="flex flex-col gap-2">
          {trayItems.map(({ item, i }) => (
            <button
              key={i}
              type="button"
              aria-pressed={selected === i}
              onClick={() => setSelected(selected === i ? null : i)}
              className={`min-h-14 rounded-2xl px-4 py-2 text-left font-sans text-sm font-bold ring-1 transition-colors ${
                selected === i
                  ? 'bg-gold-400/25 text-gold-600 ring-2 ring-gold-500'
                  : 'bg-cream-100 text-forest-900 ring-cream-300'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}

      {/* buckets — divs (not buttons): chips inside are real buttons */}
      <div className="grid grid-cols-2 gap-3">
        {activity.buckets.map((bucket, b) => (
          <div
            key={b}
            role="button"
            tabIndex={selected !== null ? 0 : -1}
            aria-label={`Ilagay sa ${bucket}`}
            onClick={() => place(b)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                place(b);
              }
            }}
            className={`flex min-h-28 flex-col gap-2 rounded-2xl p-3 text-left ring-1 transition-colors ${
              selected !== null
                ? 'cursor-pointer bg-forest-400/10 ring-2 ring-forest-500'
                : 'bg-cream-100 ring-cream-300'
            }`}
          >
            <span className="font-sans text-xs font-bold uppercase tracking-wider text-forest-600">
              {bucket}
            </span>
            {activity.items.map((item, i) =>
              placements[i] === b ? (
                <button
                  key={i}
                  type="button"
                  aria-label={`Ibalik: ${item.label}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    // while an item is selected, the whole bucket (chips
                    // included) is a drop target — never an accidental unplace
                    if (selected !== null) place(b);
                    else unplace(i);
                  }}
                  className="rounded-xl bg-forest-700 px-3 py-2.5 text-left font-sans text-xs font-bold leading-snug text-cream-50"
                >
                  {item.label}
                </button>
              ) : null,
            )}
          </div>
        ))}
      </div>

      <button
        type="button"
        disabled={!allPlaced}
        onClick={() => void send({ placements: placements as number[] })}
        className="min-h-14 rounded-full bg-forest-700 px-6 font-sans text-base font-bold text-cream-50 disabled:opacity-40"
      >
        {allPlaced
          ? state === 'sent'
            ? 'Ipadala muli'
            : 'Ipadala'
          : `Maglagay pa ng ${trayItems.length}`}
      </button>
      <SendStatus state={state} retry={retry} />
    </div>
  );
}
