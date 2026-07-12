import type { Role } from './types';
import { ROLES } from './types';

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
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null) return null;
    const { id, role, nickname } = parsed as Record<string, unknown>;
    if (typeof id !== 'string') return null;
    if (nickname !== undefined && typeof nickname !== 'string') return null;
    if (typeof role !== 'string' || !(role in ROLES)) return null;
    return { id, role: role as Role, nickname: nickname as string };
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
