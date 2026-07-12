'use client';

import type { RealtimeChannel } from '@supabase/supabase-js';
import { getSupabase } from './supabase';

/**
 * Realtime subscription with weak-wifi armor, shared by every subscriber
 * (join, stage, dashboard). Guarantees the subtle bits that were previously
 * copy-pasted (and subtly wrong) in three places:
 *
 * - unique topic per attempt: a shared topic gets torn down by the other
 *   subscriber's cleanup (StrictMode double-mount, reconnect races)
 * - status callbacks from a replaced channel are ignored — removeChannel()
 *   synchronously re-fires CLOSED, which would double-schedule reconnects
 *   and let an old chain remove a newer healthy channel
 * - at most one reconnect timer exists, with exponential backoff
 *
 * `configure` registers the channel's `.on(...)` handlers. `onStatus(true)`
 * fires on every (re)subscribe — refetch there to catch missed events.
 * Returns a cleanup function.
 */
export function resilientChannel(
  topicPrefix: string,
  configure: (channel: RealtimeChannel) => void,
  onStatus: (connected: boolean) => void,
): () => void {
  const supabase = getSupabase();
  let cancelled = false;
  let retries = 0;
  let timer: ReturnType<typeof setTimeout> | undefined;
  let current: RealtimeChannel | null = null;

  const subscribe = () => {
    const channel = supabase.channel(
      `${topicPrefix}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    );
    configure(channel);
    current = channel;
    channel.subscribe((status) => {
      if (cancelled || channel !== current) return; // stale attempt
      if (status === 'SUBSCRIBED') {
        retries = 0;
        onStatus(true);
      } else if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT' || status === 'CLOSED') {
        onStatus(false);
        current = null; // before removeChannel: it re-fires CLOSED synchronously
        void supabase.removeChannel(channel);
        if (timer) clearTimeout(timer);
        timer = setTimeout(subscribe, Math.min(1000 * 2 ** retries++, 15000));
      }
    });
  };

  subscribe();
  return () => {
    cancelled = true;
    if (timer) clearTimeout(timer);
    if (current) {
      void supabase.removeChannel(current);
      current = null;
    }
  };
}
