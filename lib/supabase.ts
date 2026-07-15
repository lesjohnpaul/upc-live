import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { getMockClient } from './demo/mockSupabase';

let client: SupabaseClient | null = null;

/**
 * On `/demo` routes in the browser, hand back an in-memory mock client instead
 * of the real one — the public demo must never read or write the live seminar's
 * Supabase rows. Selection is per-call by current path, so navigating between
 * demo and real pages always resolves to the right client. Server renders and
 * every non-demo path use the real client unchanged.
 */
export function getSupabase(): SupabaseClient {
  if (typeof window !== 'undefined' && window.location.pathname.startsWith('/demo')) {
    return getMockClient();
  }
  if (!client) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) {
      throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY');
    }
    client = createClient(url, key);
  }
  return client;
}
