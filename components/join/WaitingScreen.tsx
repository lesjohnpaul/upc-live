'use client';

import type { StoredParticipant } from '@/lib/participant';
import { ROLES } from '@/lib/types';
import RoleBadge from '@/components/ui/RoleBadge';

export default function WaitingScreen({ participant }: { participant: StoredParticipant }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 text-center">
      {/* breathing leaf — pure CSS, no JS animation */}
      <div className="relative flex size-36 items-center justify-center" aria-hidden>
        <span className="absolute inset-0 animate-breathe rounded-full bg-forest-400/15" />
        <span className="absolute inset-6 animate-breathe rounded-full bg-forest-400/20 [animation-delay:-2s]" />
        <span className="text-5xl">🌿</span>
      </div>

      <p className="max-w-xs font-display text-2xl font-medium leading-snug text-forest-900">
        Hintayin ang susunod na aktibidad…
      </p>

      <div className="flex flex-col items-center gap-2">
        <RoleBadge role={participant.role} />
        <p className="font-sans text-sm font-bold text-forest-700">
          {participant.nickname || ROLES[participant.role]}
        </p>
      </div>
    </div>
  );
}
