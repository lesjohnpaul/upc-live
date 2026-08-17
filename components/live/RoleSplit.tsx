'use client';

import { tallyByRole } from '@/lib/aggregate';
import { ROLES, type Role } from '@/lib/types';
import type { LiveParticipant, LiveResponse } from './useLiveResponses';

/* dark-stage hues per role — 400-level so they read against forest-950 */
const roleBar: Record<Role, string> = {
  head_teacher: 'bg-gold-400',
  nurse_dentist: 'bg-spruce-400',
  counselor: 'bg-clay-400',
  admin: 'bg-forest-400',
  // Catalyst roles never share a room with the four above, so reusing hues is safe.
  student_leader: 'bg-spruce-400',
  adviser: 'bg-clay-400',
};

const roleText: Record<Role, string> = {
  head_teacher: 'text-gold-300',
  nurse_dentist: 'text-spruce-200',
  counselor: 'text-clay-200',
  admin: 'text-forest-300',
  student_leader: 'text-spruce-200',
  adviser: 'text-clay-200',
};

/** Compact grouped bars: per role, the distribution across poll options. */
export default function RoleSplit({
  rows,
  participants,
  options,
}: {
  rows: LiveResponse[];
  participants: LiveParticipant[];
  options: string[];
}) {
  const byRole = tallyByRole(rows, participants, options.length);
  const roles = (Object.keys(ROLES) as Role[]).filter((r) =>
    byRole[r].some((count) => count > 0),
  );
  if (roles.length === 0) return null;
  const max = Math.max(1, ...roles.flatMap((r) => byRole[r]));

  return (
    <div className="mt-6 grid w-full grid-cols-2 gap-x-10 gap-y-5 text-left lg:grid-cols-4">
      {roles.map((role) => (
        <div key={role}>
          <p className={`flex items-center gap-2 font-sans text-sm font-bold tracking-wide ${roleText[role]}`}>
            <span aria-hidden className={`size-2 rounded-full ${roleBar[role]}`} />
            {ROLES[role]}
          </p>
          <ul className="mt-2 space-y-1.5">
            {options.map((_, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="w-4 font-sans text-xs font-bold text-[var(--fg)]/50">
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="h-2 flex-1 overflow-hidden rounded-full bg-[var(--bg-raised-2)]/80">
                  <span
                    className={`block h-full rounded-full ${roleBar[role]} transition-[width] duration-500`}
                    style={{ width: `${(byRole[role][i] / max) * 100}%` }}
                  />
                </span>
                <span className="w-5 text-right font-sans text-xs tabular-nums text-[var(--fg)]/60">
                  {byRole[role][i]}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
