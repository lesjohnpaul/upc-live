'use client';

import { useCallback, useEffect, useState } from 'react';
import { getSupabase } from '@/lib/supabase';
import { resilientChannel } from '@/lib/realtime';

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
 * Fetches the session row by code and tracks `active_activity` via realtime.
 * The initial fetch retries with backoff and never throws — failures surface
 * as `offline`. Subscription reconnect armor lives in lib/realtime; a refetch
 * runs on every (re)subscribe and on visibilitychange.
 */
export function useSessionState(code: string) {
  const [session, setSession] = useState<LiveSession | null>(null);
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    const supabase = getSupabase();
    let cancelled = false;
    let retries = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let cleanupChannel: (() => void) | null = null;
    let sessionId: string | null = null;

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
      cleanupChannel = resilientChannel(
        `session-${id}`,
        (channel) => {
          channel.on(
            'postgres_changes',
            { event: 'UPDATE', schema: 'public', table: 'sessions', filter: `id=eq.${id}` },
            (payload) => {
              const next = (payload.new as { active_activity: string | null }).active_activity;
              setSession((s) => (s ? { ...s, active_activity: next } : s));
            },
          );
        },
        (connected) => {
          if (cancelled) return;
          setOffline(!connected);
          if (connected) void refetch(id); // catch anything missed while disconnected
        },
      );
    };

    const load = async () => {
      if (timer) clearTimeout(timer); // one retry chain only (visibilitychange can re-enter)
      try {
        const { data, error } = await supabase
          .from('sessions')
          .select('id, code, day, active_activity')
          .eq('code', code.toUpperCase())
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
        timer = setTimeout(() => void load(), Math.min(1000 * 2 ** retries++, 15000));
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
      cleanupChannel?.();
    };
  }, [code]);

  /** Optimistic local update so the dashboard highlights instantly. */
  const setActive = useCallback((id: string | null) => {
    setSession((s) => (s ? { ...s, active_activity: id } : s));
  }, []);

  return { session, offline, setActive };
}
