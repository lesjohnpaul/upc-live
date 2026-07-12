'use client';

import { useEffect, useState } from 'react';

/**
 * Join URL for a session code, resolved on the client to avoid SSR/env
 * mismatch. Returns null until mounted.
 */
export function useJoinUrl(code: string): string | null {
  const [joinUrl, setJoinUrl] = useState<string | null>(null);
  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_BASE_URL || window.location.origin;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- SSR boundary: window.location.origin fallback only exists on the client
    setJoinUrl(`${base.replace(/\/$/, '')}/join/${code}`);
  }, [code]);
  return joinUrl;
}
