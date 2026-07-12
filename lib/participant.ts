import type { Role } from './types';

export type StoredParticipant = {
  id: string;
  role: Role;
  nickname: string;
};

const key = (sessionCode: string) => `upc-live:participant:${sessionCode}`;

export function getStoredParticipant(sessionCode: string): StoredParticipant | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(key(sessionCode));
    return raw ? (JSON.parse(raw) as StoredParticipant) : null;
  } catch {
    return null;
  }
}

export function storeParticipant(sessionCode: string, participant: StoredParticipant): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key(sessionCode), JSON.stringify(participant));
  } catch {
    // ponytail: private-mode/quota failures just mean re-join next visit
  }
}
