'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { getSupabase } from '@/lib/supabase';

export type SendState = 'idle' | 'sending' | 'sent' | 'error';
export type Payload = Record<string, unknown>;

/**
 * One response row per (participant, activity). Optimistic: callers set their
 * local answer first, then `send`; on failure the last payload is kept for
 * `retry`. `remote` hydrates cards when the tab joined after answering
 * elsewhere (or reloaded mid-activity); it never overwrites a local answer.
 */
export function useResponse(
  sessionId: string,
  participantId: string,
  activityId: string,
  tick = 0,
) {
  const [remote, setRemote] = useState<Payload | null>(null);
  const [state, setState] = useState<SendState>('idle');
  const last = useRef<Payload | null>(null);

  useEffect(() => {
    let on = true;
    void getSupabase()
      .from('responses')
      .select('payload')
      .eq('participant_id', participantId)
      .eq('activity_id', activityId)
      .maybeSingle()
      .then(({ data }) => {
        if (on && data && last.current === null) {
          setRemote(data.payload as Payload);
          setState('sent');
        }
      });
    return () => {
      on = false;
    };
  }, [participantId, activityId, tick]);

  const send = useCallback(
    async (payload: Payload) => {
      last.current = payload;
      setState('sending');
      const { error } = await getSupabase()
        .from('responses')
        .upsert(
          {
            session_id: sessionId,
            participant_id: participantId,
            activity_id: activityId,
            payload,
          },
          { onConflict: 'participant_id,activity_id' },
        );
      // only reflect the outcome of the latest send
      if (last.current === payload) setState(error ? 'error' : 'sent');
      return !error;
    },
    [sessionId, participantId, activityId],
  );

  const retry = useCallback(() => {
    if (last.current) void send(last.current);
  }, [send]);

  return { remote, state, send, retry };
}

/** Subtle sending → ✓ → retry-chip status line under every card. */
export function SendStatus({
  state,
  retry,
  sentLabel = 'Naitala ang sagot mo ✓',
}: {
  state: SendState;
  retry: () => void;
  sentLabel?: string;
}) {
  if (state === 'idle') return <p className="min-h-11" aria-hidden />;
  if (state === 'error')
    return (
      <button
        type="button"
        onClick={retry}
        className="mx-auto flex min-h-11 items-center gap-2 rounded-full bg-gold-400/20 px-5 font-sans text-sm font-bold text-gold-600 ring-1 ring-gold-500/50"
      >
        Hindi naipadala — i-tap para subukan muli
      </button>
    );
  return (
    <p
      role="status"
      className={`flex min-h-11 items-center justify-center font-sans text-sm font-bold ${
        state === 'sending' ? 'text-forest-500' : 'text-forest-600'
      }`}
    >
      {state === 'sending' ? 'Ipinapadala…' : sentLabel}
    </p>
  );
}
