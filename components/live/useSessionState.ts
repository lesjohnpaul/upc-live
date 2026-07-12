'use client';

import { useCallback, useEffect, useState } from 'react';
import type { RealtimeChannel } from '@supabase/supabase-js';
import { getSupabase } from '@/lib/supabase';

export type LiveSession = {
  id: string;
  code: string;
  day: number;
  active_activity: string | null;
};

/** Live-layer props threaded from StageDeck down to ActivitySlide. */
export type StageLive = {
  sessionId: string | null;
  activeId: string | null;
  offline: boolean;
};

/**
 * Fetches the session row by code and tracks `active_activity` via realtime,
 * with the same weak-internet armor as the join surface: unique channel topic
 * per attempt (StrictMode double-mount kills shared topics), exponential
 * backoff on channel failure, and refetch on visibilitychange + resubscribe.
 * Fetch failures never throw — they surface as `offline` and retry.
 */
export function useSessionState(code: string) {
  const [session, setSession] = useState<LiveSession | null>(null);
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    const supabase = getSupabase();
    let cancelled = false;
    let retries = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let channel: RealtimeChannel | null = null;
    let sessionId: string | null = null;

    const schedule = (fn: () => void) => {
      timer = setTimeout(fn, Math.min(1000 * 2 ** retries++, 15000));
    };

    const refetch = async (id: string) => {
      try {
        const { data, error } = await supabase
          .from('sessions')
          .select('active_activity')
          .eq('id', id)
          .maybeSingle();
        if (cancelled || error || !data) return;
        setSession((s) => (s ? { ...s, active_activity: data.active_activity } : s));
      } catch {
        if (!cancelled) setOffline(true);
      }
    };

    const subscribe = (id: string) => {
      channel = supabase
        .channel(`session-${id}-${Date.now()}-${Math.random().toString(36).slice(2)}`)
        .on(
          'postgres_changes',
          { event: 'UPDATE', schema: 'public', table: 'sessions', filter: `id=eq.${id}` },
          (payload) => {
            const next = (payload.new as { active_activity: string | null }).active_activity;
            setSession((s) => (s ? { ...s, active_activity: next } : s));
          },
        )
        .subscribe((status) => {
          if (cancelled) return;
          if (status === 'SUBSCRIBED') {
            retries = 0;
            setOffline(false);
            void refetch(id); // catch anything missed while disconnected
          } else if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT' || status === 'CLOSED') {
            setOffline(true);
            if (channel) void supabase.removeChannel(channel);
            channel = null;
            schedule(() => subscribe(id));
          }
        });
    };

    const load = async () => {
      try {
        const { data, error } = await supabase
          .from('sessions')
          .select('id, code, day, active_activity')
          .ilike('code', code)
          .maybeSingle();
        if (cancelled) return;
        if (error) throw error;
        setOffline(false);
        if (!data) return; // unknown code: no live layer to track
        sessionId = data.id;
        setSession(data);
        subscribe(data.id);
      } catch {
        if (cancelled) return;
        setOffline(true);
        schedule(() => void load());
      }
    };

    void load();
    const onVisible = () => {
      if (document.visibilityState !== 'visible') return;
      if (sessionId) void refetch(sessionId);
      else void load();
    };
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
      document.removeEventListener('visibilitychange', onVisible);
      if (channel) void supabase.removeChannel(channel);
    };
  }, [code]);

  /** Optimistic local update so the dashboard highlights instantly. */
  const setActive = useCallback((id: string | null) => {
    setSession((s) => (s ? { ...s, active_activity: id } : s));
  }, []);

  return { session, offline, setActive };
}
