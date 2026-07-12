'use client';

import { useEffect, useState } from 'react';
import { getSupabase } from '@/lib/supabase';
import { resilientChannel } from '@/lib/realtime';
import { mergeSnapshot } from '@/lib/aggregate';
import type { Role } from '@/lib/types';

export type LiveResponse = {
  participant_id: string;
  activity_id: string;
  payload: unknown;
  created_at: string;
};

export type LiveParticipant = { id: string; role: Role; nickname: string };

const rowKey = (r: LiveResponse) => `${r.participant_id} ${r.activity_id}`;

/**
 * Live responses + participants for one activity (or the whole session when
 * `activityId` is omitted — the dashboard uses that). Initial fetch, then a
 * postgres_changes subscription maintains rows in state: INSERT/UPDATE upsert
 * the row (unique per participant+activity), DELETE triggers a debounced
 * refetch (the old record only carries its PK), participants INSERT keeps the
 * live count. Events that arrive while a snapshot query is in flight are
 * buffered and win over the snapshot, so a slow refetch can't roll back newer
 * realtime rows. Reconnect armor lives in lib/realtime.
 */
export function useLiveResponses(sessionId: string | null, activityId?: string) {
  const [rows, setRows] = useState<LiveResponse[]>([]);
  const [participants, setParticipants] = useState<LiveParticipant[]>([]);
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    if (!sessionId) return;
    const supabase = getSupabase();
    let cancelled = false;
    let fetchSeq = 0;
    let buffer: LiveResponse[] | null = null; // events seen while a snapshot is in flight
    let deleteTimer: ReturnType<typeof setTimeout> | undefined;

    const refetch = async () => {
      const seq = ++fetchSeq;
      buffer ??= [];
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
        if (cancelled || seq !== fetchSeq) return; // superseded by a newer refetch
        const events = buffer ?? [];
        buffer = null;
        if (res.error || ppl.error) {
          setOffline(true);
          return;
        }
        setRows(mergeSnapshot(res.data as LiveResponse[], events));
        setParticipants(ppl.data as LiveParticipant[]);
        setOffline(false);
      } catch {
        if (!cancelled && seq === fetchSeq) {
          buffer = null;
          setOffline(true);
        }
      }
    };

    const upsertRow = (raw: unknown) => {
      const row = raw as LiveResponse;
      if (activityId && row.activity_id !== activityId) return;
      buffer?.push(row);
      setRows((cur) => {
        const i = cur.findIndex((x) => rowKey(x) === rowKey(row));
        if (i === -1) return [...cur, row];
        const next = cur.slice();
        next[i] = row;
        return next;
      });
    };

    const cleanupChannel = resilientChannel(
      `live-${activityId ?? 'all'}`,
      (channel) => {
        channel
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
            // possible) — debounce so a bulk reset triggers one refetch
            'postgres_changes',
            { event: 'DELETE', schema: 'public', table: 'responses' },
            () => {
              if (deleteTimer) clearTimeout(deleteTimer);
              deleteTimer = setTimeout(() => void refetch(), 300);
            },
          )
          .on(
            'postgres_changes',
            { event: 'INSERT', schema: 'public', table: 'participants', filter: `session_id=eq.${sessionId}` },
            (p) => {
              const row = p.new as LiveParticipant;
              setParticipants((cur) => (cur.some((x) => x.id === row.id) ? cur : [...cur, row]));
            },
          );
      },
      (connected) => {
        if (cancelled) return;
        setOffline(!connected);
        if (connected) void refetch(); // catch anything missed while disconnected
      },
    );

    void refetch();
    const onVisible = () => {
      if (document.visibilityState === 'visible') void refetch();
    };
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      cancelled = true;
      if (deleteTimer) clearTimeout(deleteTimer);
      document.removeEventListener('visibilitychange', onVisible);
      cleanupChannel();
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
