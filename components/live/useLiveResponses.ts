'use client';

import { useEffect, useState } from 'react';
import type { RealtimeChannel } from '@supabase/supabase-js';
import { getSupabase } from '@/lib/supabase';
import type { Role } from '@/lib/types';

export type LiveResponse = {
  participant_id: string;
  activity_id: string;
  payload: unknown;
  created_at: string;
};

export type LiveParticipant = { id: string; role: Role; nickname: string };

/**
 * Live responses + participants for one activity (or the whole session when
 * `activityId` is omitted — the dashboard uses that). Initial fetch, then a
 * postgres_changes subscription maintains rows in state: INSERT/UPDATE upsert
 * the row (unique per participant+activity), DELETE triggers a refetch (the
 * old record only carries its PK), participants INSERT keeps the live count.
 * Weak-internet armor mirrors the join surface: unique channel topic per
 * attempt, backoff reconnect, refetch on visibilitychange and on resubscribe.
 */
export function useLiveResponses(sessionId: string | null, activityId?: string) {
  const [rows, setRows] = useState<LiveResponse[]>([]);
  const [participants, setParticipants] = useState<LiveParticipant[]>([]);
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    if (!sessionId) return;
    const supabase = getSupabase();
    let cancelled = false;
    let retries = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let channel: RealtimeChannel | null = null;

    const refetch = async () => {
      try {
        let query = supabase
          .from('responses')
          .select('participant_id, activity_id, payload, created_at')
          .eq('session_id', sessionId);
        if (activityId) query = query.eq('activity_id', activityId);
        const [res, ppl] = await Promise.all([
          query,
          supabase.from('participants').select('id, role, nickname').eq('session_id', sessionId),
        ]);
        if (cancelled) return;
        if (res.error || ppl.error) {
          setOffline(true);
          return;
        }
        setRows(res.data as LiveResponse[]);
        setParticipants(ppl.data as LiveParticipant[]);
        setOffline(false);
      } catch {
        if (!cancelled) setOffline(true);
      }
    };

    const upsertRow = (raw: unknown) => {
      const row = raw as LiveResponse;
      if (activityId && row.activity_id !== activityId) return;
      setRows((cur) => {
        const i = cur.findIndex(
          (x) => x.participant_id === row.participant_id && x.activity_id === row.activity_id,
        );
        if (i === -1) return [...cur, row];
        const next = cur.slice();
        next[i] = row;
        return next;
      });
    };

    const subscribe = () => {
      // unique topic per attempt: a shared topic gets torn down by the other
      // subscriber's cleanup (StrictMode double-mount, reconnect races)
      channel = supabase
        .channel(`live-${activityId ?? 'all'}-${Date.now()}-${Math.random().toString(36).slice(2)}`)
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'responses', filter: `session_id=eq.${sessionId}` },
          (p) => upsertRow(p.new),
        )
        .on(
          'postgres_changes',
          { event: 'UPDATE', schema: 'public', table: 'responses', filter: `session_id=eq.${sessionId}` },
          (p) => upsertRow(p.new),
        )
        .on(
          // DELETE old records only carry the PK (no session/activity filter
          // possible) — a dashboard reset is rare, so just refetch
          'postgres_changes',
          { event: 'DELETE', schema: 'public', table: 'responses' },
          () => void refetch(),
        )
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'participants', filter: `session_id=eq.${sessionId}` },
          (p) => {
            const row = p.new as LiveParticipant;
            setParticipants((cur) => (cur.some((x) => x.id === row.id) ? cur : [...cur, row]));
          },
        )
        .subscribe((status) => {
          if (cancelled) return;
          if (status === 'SUBSCRIBED') {
            retries = 0;
            setOffline(false);
            void refetch(); // catch anything missed while disconnected
          } else if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT' || status === 'CLOSED') {
            setOffline(true);
            if (channel) void supabase.removeChannel(channel);
            channel = null;
            timer = setTimeout(subscribe, Math.min(1000 * 2 ** retries++, 15000));
          }
        });
    };

    void refetch();
    subscribe();
    const onVisible = () => {
      if (document.visibilityState === 'visible') void refetch();
    };
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
      document.removeEventListener('visibilitychange', onVisible);
      if (channel) void supabase.removeChannel(channel);
    };
  }, [sessionId, activityId]);

  return {
    rows,
    participants,
    participantCount: participants.length,
    // no session id means the stage itself couldn't reach the network
    offline: sessionId ? offline : true,
  };
}
