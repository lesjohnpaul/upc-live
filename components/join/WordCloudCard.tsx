'use client';

import { useEffect, useRef, useState } from 'react';
import type { WordCloudActivity } from '@/lib/types';
import { SendStatus, useResponse } from './useResponse';

type Props = {
  activity: WordCloudActivity;
  sessionId: string;
  participantId: string;
  tick: number;
};

export default function WordCloudCard({ activity, sessionId, participantId, tick }: Props) {
  const { remote, state, send, retry } = useResponse(sessionId, participantId, activity.id, tick);
  const [word, setWord] = useState('');
  const touched = useRef(false);

  useEffect(() => {
    const w = remote?.word;
    if (!touched.current && typeof w === 'string') setWord(w);
  }, [remote]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = word.trim();
    if (!trimmed) return;
    touched.current = true;
    void send({ word: trimmed });
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-5">
      <h2 className="font-display text-2xl font-medium leading-snug">{activity.prompt}</h2>
      <input
        type="text"
        value={word}
        onChange={(e) => {
          touched.current = true;
          setWord(e.target.value);
        }}
        maxLength={30}
        placeholder="Isang salita…"
        enterKeyHint="send"
        className="min-h-14 rounded-2xl bg-cream-100 px-5 font-sans text-lg text-forest-950 ring-1 ring-cream-300 placeholder:text-cream-500 focus:outline-none focus:ring-2 focus:ring-gold-500"
      />
      <button
        type="submit"
        disabled={!word.trim()}
        className="min-h-14 rounded-full bg-forest-700 px-6 font-sans text-base font-bold text-cream-50 disabled:opacity-40"
      >
        {state === 'sent' ? 'Ipadala muli' : 'Ipadala'}
      </button>
      <SendStatus state={state} retry={retry} sentLabel="Naitala ang salita mo ✓" />
    </form>
  );
}
