import { createHash } from 'crypto';

// Server-only: reads DASHBOARD_PASSWORDS (never NEXT_PUBLIC). Hash logic lives
// here only — nothing else derives the cookie value.

/**
 * Expected `upc-dash` cookie value: SHA-256 hex of a stable string derived from
 * DASHBOARD_PASSWORDS (NOT any raw password). null when unconfigured → fail closed.
 */
export function expectedCookie(): string | null {
  const raw = process.env.DASHBOARD_PASSWORDS;
  if (!raw || !raw.trim()) return null;
  return createHash('sha256').update('upc-live-ok:' + raw).digest('hex');
}

/** True when `pw` (trimmed) is one of the comma-separated configured passwords. */
export function passwordValid(pw: string): boolean {
  const list = (process.env.DASHBOARD_PASSWORDS ?? '')
    .split(',')
    .map((p) => p.trim())
    .filter(Boolean);
  return list.includes(pw.trim());
}
