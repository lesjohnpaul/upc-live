'use client';

import { useEffect, useRef, useState } from 'react';
import type { QuizActivity } from '@/lib/types';
import { SendStatus, useResponse } from './useResponse';

type Props = {
  activity: QuizActivity;
  sessionId: string;
  participantId: string;
  tick: number;
};

/**
 * One question at a time. Each answer is upserted immediately (partial
 * `{answers}` array) so a disconnect mid-quiz keeps earlier answers.
 * Timeout records -1 and auto-advances.
 *
 * Nothing renders / no countdown arms until hydration `settled` — otherwise a
 * reload mid-quiz starts at Q1 and the first send clobbers real answers.
 */
export default function QuizCard({ activity, sessionId, participantId, tick }: Props) {
  const { remote, settled, state, send, retry } = useResponse(
    sessionId,
    participantId,
    activity.id,
    tick,
  );
  const [answers, setAnswers] = useState<number[]>([]);
  const touched = useRef(false);
  const total = activity.questions.length;
  const current = answers.length; // derived: next unanswered question
  const question = current < total ? activity.questions[current] : null;

  useEffect(() => {
    const a = remote?.answers;
    if (!touched.current && Array.isArray(a) && a.every((n) => typeof n === 'number')) {
      setAnswers((a as number[]).slice(0, total));
    }
  }, [remote, total]);

  // forIndex pins the answer to the question it was given for — a stale
  // timeout or double-tap for an already-answered question is dropped
  const answer = (choice: number, forIndex: number) => {
    touched.current = true;
    setAnswers((prev) => {
      if (prev.length !== forIndex || prev.length >= total) return prev;
      const next = [...prev, choice];
      send({ answers: next });
      return next;
    });
  };

  // per-question countdown — armed only once hydration settled
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  useEffect(() => {
    const secs = question?.seconds;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- timer restarts per question
    setTimeLeft(secs ?? null);
    if (!settled || !secs) return;
    const started = Date.now();
    const forIndex = current;
    const id = setInterval(() => {
      const left = secs - Math.floor((Date.now() - started) / 1000);
      if (left <= 0) {
        clearInterval(id);
        answer(-1, forIndex);
      } else {
        setTimeLeft(left);
      }
    }, 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- restart only when the question changes or hydration settles
  }, [current, question?.seconds, settled]);

  if (!settled) {
    return (
      <div className="flex flex-col items-center gap-5 text-center">
        <h2 className="font-display text-2xl font-medium">{activity.title}</h2>
        <p className="animate-breathe font-display text-4xl" aria-hidden>
          ⚡
        </p>
        <p role="status" className="font-sans text-sm font-bold text-forest-600">
          Nilo-load ang quiz…
        </p>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="flex flex-col items-center gap-5 text-center">
        <h2 className="font-display text-2xl font-medium">{activity.title}</h2>
        <p className="font-display text-4xl">🎉</p>
        <p className="font-sans text-lg font-bold text-forest-800">
          Tapos na! Antayin ang resulta sa screen.
        </p>
        <SendStatus state={state} retry={retry} sentLabel="Naitala ang mga sagot mo ✓" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h2 className="font-sans text-sm font-bold uppercase tracking-wider text-forest-600">
          {activity.title}
        </h2>
        {timeLeft !== null && (
          <span
            className={`font-sans text-sm font-bold tabular-nums ${
              timeLeft <= 5 ? 'text-clay-600' : 'text-forest-600'
            }`}
          >
            {timeLeft}s
          </span>
        )}
      </div>

      {/* progress dots */}
      <div className="flex gap-2" aria-label={`Tanong ${current + 1} ng ${total}`}>
        {activity.questions.map((_, i) => (
          <span
            key={i}
            className={`size-2.5 rounded-full ${
              i < current
                ? 'bg-forest-600'
                : i === current
                  ? 'bg-gold-500 ring-2 ring-gold-300'
                  : 'bg-cream-300'
            }`}
          />
        ))}
      </div>

      <h3 className="font-display text-2xl font-medium leading-snug">{question.prompt}</h3>

      <div className="flex flex-col gap-3">
        {question.options.map((opt, i) => (
          <button
            key={i}
            type="button"
            onClick={() => answer(i, current)}
            className="min-h-14 rounded-2xl bg-cream-100 px-5 py-3 text-left font-sans text-base font-bold text-forest-900 ring-1 ring-cream-300 transition-colors active:bg-cream-200"
          >
            {opt}
          </button>
        ))}
      </div>
      <SendStatus state={state} retry={retry} sentLabel="Naitala ✓" />
    </div>
  );
}
