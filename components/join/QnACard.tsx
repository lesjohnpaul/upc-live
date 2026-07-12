'use client';

import { useEffect, useRef, useState } from 'react';
import type { QnaActivity } from '@/lib/types';
import { SendStatus, useResponse } from './useResponse';

type Props = {
  activity: QnaActivity;
  sessionId: string;
  participantId: string;
  tick: number;
};

/** One question per participant per activity — resubmit replaces (upsert). */
export default function QnACard({ activity, sessionId, participantId, tick }: Props) {
  const { remote, state, send, retry } = useResponse(sessionId, participantId, activity.id, tick);
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState<string | null>(null);
  const touched = useRef(false);

  useEffect(() => {
    const q = remote?.question;
    if (!touched.current && typeof q === 'string') {
      setSubmitted(q);
      setText(q);
    }
  }, [remote]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    touched.current = true;
    setSubmitted(trimmed);
    void send({ question: trimmed });
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-5">
      <h2 className="font-display text-2xl font-medium leading-snug">{activity.prompt}</h2>

      {submitted && (
        <div className="rounded-2xl bg-forest-400/10 p-4 ring-1 ring-forest-500/25">
          <p className="font-sans text-xs font-bold uppercase tracking-wider text-forest-600">
            Your question
          </p>
          <p className="mt-1 font-sans text-forest-900">{submitted}</p>
        </div>
      )}

      <textarea
        value={text}
        onChange={(e) => {
          touched.current = true;
          setText(e.target.value);
        }}
        maxLength={200}
        rows={4}
        placeholder="Type your question…"
        className="rounded-2xl bg-cream-100 p-4 font-sans text-base text-forest-950 ring-1 ring-cream-300 placeholder:text-cream-500 focus:outline-none focus:ring-2 focus:ring-gold-500"
      />
      <div className="-mt-3 text-right font-sans text-xs text-forest-500">{text.length}/200</div>

      <button
        type="submit"
        disabled={!text.trim()}
        className="min-h-14 rounded-full bg-forest-700 px-6 font-sans text-base font-bold text-cream-50 disabled:opacity-40"
      >
        {submitted ? 'Change question' : 'Send question'}
      </button>
      <SendStatus state={state} retry={retry} sentLabel="Question recorded ✓" />
    </form>
  );
}
