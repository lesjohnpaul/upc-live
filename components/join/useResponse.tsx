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
 *
 * Weak-wifi armor:
 * - `settled` flips true once hydration resolved (or gave up after retries).
 *   Cards that build on prior answers (QuizCard) must not accept input or
 *   arm timers before then, or a fresh `{answers:[...]}` clobbers the row.
 * - Sends are serialized: while an upsert is in flight only the LATEST
 *   pending payload is queued, so a slow older request can never land after
 *   (and silently overwrite) a newer answer.
 */
export function useResponse(
  sessionId: string,
  participantId: string,
  activityId: string,
  tick = 0,
) {
  const [remote, setRemote] = useState<Payload | null>(null);
  const [settled, setSettled] = useState(false);
  const [state, setState] = useState<SendState>('idle');
  const last = useRef<Payload | null>(null);
  const inFlight = useRef(false);
  const pending = useRef<Payload | null>(null);

  useEffect(() => {
    let on = true;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let attempt = 0;
    const load = async () => {
      try {
        const { data, error } = await getSupabase()
          .from('responses')
          .select('payload')
          .eq('participant_id', participantId)
          .eq('activity_id', activityId)
          .maybeSingle();
        if (!on) return;
        if (error) throw error;
        if (data && last.current === null) {
          setRemote(data.payload as Payload);
          setState('sent');
        }
        setSettled(true);
      } catch {
        if (!on) return;
        if (attempt >= 4) {
          // ponytail: give up after ~15s and treat as no prior answer — a
          // dead connection would block the card forever, and sends will
          // surface their own errors anyway
          setSettled(true);
          return;
        }
        timer = setTimeout(() => void load(), Math.min(1000 * 2 ** attempt++, 8000));
      }
    };
    void load();
    return () => {
      on = false;
      if (timer) clearTimeout(timer);
    };
  }, [participantId, activityId, tick]);

  const doSend = useCallback(
    async (payload: Payload) => {
      // drain loop: whatever was queued while this upsert was in flight goes
      // out next, until nothing is pending
      let outgoing: Payload | null = payload;
      while (outgoing) {
        inFlight.current = true;
        let error: unknown = null;
        try {
          ({ error } = await getSupabase()
            .from('responses')
            .upsert(
              {
                session_id: sessionId,
                participant_id: participantId,
                activity_id: activityId,
                payload: outgoing,
              },
              { onConflict: 'participant_id,activity_id' },
            ));
        } catch (e) {
          error = e;
        }
        inFlight.current = false;
        if (pending.current) {
          outgoing = pending.current;
          pending.current = null;
          continue;
        }
        // only reflect the outcome of the latest send
        if (last.current === outgoing) setState(error ? 'error' : 'sent');
        outgoing = null;
      }
    },
    [sessionId, participantId, activityId],
  );

  const send = useCallback(
    (payload: Payload) => {
      last.current = payload;
      setState('sending');
      if (inFlight.current) {
        pending.current = payload; // intermediate payloads are stale by definition
        return;
      }
      void doSend(payload);
    },
    [doSend],
  );

  const retry = useCallback(() => {
    if (last.current) send(last.current);
  }, [send]);

  return { remote, settled, state, send, retry };
}

/** Subtle sending → ✓ → retry-chip status line under every card. */
export function SendStatus({
  state,
  retry,
  sentLabel = 'Answer recorded ✓',
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
        Not sent — tap to try again
      </button>
    );
  return (
    <p
      role="status"
      className={`flex min-h-11 items-center justify-center font-sans text-sm font-bold ${
        state === 'sending' ? 'text-forest-500' : 'text-forest-600'
      }`}
    >
      {state === 'sending' ? 'Sending…' : sentLabel}
    </p>
  );
}
