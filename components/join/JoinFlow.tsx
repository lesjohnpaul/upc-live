'use client';

import { useEffect, useState } from 'react';
import { getSupabase } from '@/lib/supabase';
import { resilientChannel } from '@/lib/realtime';
import { ROLES, type Activity, type Role } from '@/lib/types';
import {
  getStoredParticipant,
  storeParticipant,
  type StoredParticipant,
} from '@/lib/participant';
import { days, findActivity } from '@/content';
import RoleBadge from '@/components/ui/RoleBadge';
import WaitingScreen from './WaitingScreen';
import PollCard from './PollCard';
import WordCloudCard from './WordCloudCard';
import SliderCard from './SliderCard';
import DragDropCard from './DragDropCard';
import QuizCard from './QuizCard';
import QnACard from './QnACard';

type Session = { id: string; code: string; day: number; active_activity: string | null };

/**
 * Tracks sessions.active_activity via realtime, with weak-internet armor:
 * re-fetch on visibilitychange (phones lock/unlock constantly) and on every
 * (re)subscribe; reconnect logic lives in lib/realtime. `tick` increments on
 * every successful re-fetch so cards re-pull their own response.
 */
function useActiveActivity(session: Session) {
  const [activeId, setActiveId] = useState<string | null>(session.active_activity);
  const [connected, setConnected] = useState(true);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const refetch = async () => {
      try {
        const { data, error } = await getSupabase()
          .from('sessions')
          .select('active_activity')
          .eq('id', session.id)
          .maybeSingle();
        if (!cancelled && !error && data) {
          setActiveId(data.active_activity);
          setTick((t) => t + 1);
        }
      } catch {
        // weak wifi: stay on the current view; the next reconnect refetches
      }
    };

    const cleanupChannel = resilientChannel(
      `join-${session.id}`,
      (channel) => {
        channel.on(
          'postgres_changes',
          { event: 'UPDATE', schema: 'public', table: 'sessions', filter: `id=eq.${session.id}` },
          (payload) => {
            setActiveId((payload.new as { active_activity: string | null }).active_activity);
          },
        );
      },
      (isConnected) => {
        if (cancelled) return;
        setConnected(isConnected);
        if (isConnected) void refetch(); // catch anything missed while disconnected
      },
    );

    const onVisible = () => {
      if (document.visibilityState === 'visible') void refetch();
    };
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      cancelled = true;
      document.removeEventListener('visibilitychange', onVisible);
      cleanupChannel();
    };
  }, [session.id]);

  return { activeId, connected, tick };
}

/* light-theme role button hues, matching RoleBadge */
const roleHue: Record<Role, string> = {
  head_teacher: 'bg-gold-400/15 text-gold-600 ring-gold-400/40',
  nurse_dentist: 'bg-spruce-400/15 text-spruce-600 ring-spruce-400/40',
  counselor: 'bg-clay-400/15 text-clay-600 ring-clay-400/40',
  admin: 'bg-forest-400/15 text-forest-600 ring-forest-400/40',
};

function Onboarding({
  session,
  onJoined,
}: {
  session: Session;
  onJoined: (p: StoredParticipant) => void;
}) {
  const [role, setRole] = useState<Role | null>(null);
  const [nickname, setNickname] = useState('');
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);
  const courseTitle = days.find((d) => d.course.toUpperCase() === session.code.toUpperCase())
    ?.courseTitle;

  const join = async () => {
    if (!role || busy) return;
    setBusy(true);
    setFailed(false);
    const { data, error } = await getSupabase()
      .from('participants')
      .insert({ session_id: session.id, role, nickname: nickname.trim() })
      .select('id')
      .single();
    setBusy(false);
    if (error || !data) {
      setFailed(true);
      return;
    }
    const participant: StoredParticipant = { id: data.id, role, nickname: nickname.trim() };
    storeParticipant(session.code, participant);
    onJoined(participant);
  };

  return (
    <main className="mx-auto flex min-h-svh w-full max-w-md flex-col gap-6 px-5 py-10">
      <header className="text-center">
        <p className="font-sans text-xs font-bold uppercase tracking-[0.28em] text-gold-600">
          UPC Live · {session.code}
        </p>
        <h1 className="mt-3 font-display text-3xl font-medium leading-snug">
          {courseTitle ?? `Day ${session.day}`}
        </h1>
        <p className="mt-2 font-sans text-forest-700">Maligayang pagdating! Ano ang papel mo?</p>
      </header>

      <div className="flex flex-col gap-3">
        {(Object.keys(ROLES) as Role[]).map((r) => (
          <button
            key={r}
            type="button"
            aria-pressed={role === r}
            onClick={() => setRole(r)}
            className={`min-h-14 rounded-2xl px-5 text-left font-sans text-base font-bold ring-1 transition-shadow ${roleHue[r]} ${
              role === r ? 'ring-2 shadow-md' : 'ring-inset'
            }`}
          >
            {ROLES[r]}
          </button>
        ))}
      </div>

      <label className="flex flex-col gap-2">
        <span className="font-sans text-sm font-bold text-forest-700">
          Palayaw <span className="font-normal text-forest-500">(opsyonal)</span>
        </span>
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          maxLength={20}
          placeholder="Hal. Teacher Ana"
          className="min-h-14 rounded-2xl bg-cream-100 px-5 font-sans text-base text-forest-950 ring-1 ring-cream-300 placeholder:text-cream-500 focus:outline-none focus:ring-2 focus:ring-gold-500"
        />
      </label>

      {failed && (
        <p className="text-center font-sans text-sm font-bold text-clay-600">
          Hindi nakapasok — mahina yata ang signal. Subukan muli.
        </p>
      )}

      <button
        type="button"
        onClick={() => void join()}
        disabled={!role || busy}
        className="min-h-14 rounded-full bg-forest-700 px-6 font-sans text-lg font-bold text-cream-50 disabled:opacity-40"
      >
        {busy ? 'Sumasali…' : failed ? 'Subukan muli' : 'Sali na!'}
      </button>
    </main>
  );
}

function ActivityCard({
  activity,
  sessionId,
  participantId,
  tick,
}: {
  activity: Activity;
  sessionId: string;
  participantId: string;
  tick: number;
}) {
  const props = { sessionId, participantId, tick };
  switch (activity.kind) {
    case 'poll':
      return <PollCard activity={activity} {...props} />;
    case 'wordcloud':
      return <WordCloudCard activity={activity} {...props} />;
    case 'slider':
      return <SliderCard activity={activity} {...props} />;
    case 'dragdrop':
      return <DragDropCard activity={activity} {...props} />;
    case 'quiz':
      return <QuizCard activity={activity} {...props} />;
    case 'qna':
      return <QnACard activity={activity} {...props} />;
  }
}

export default function JoinFlow({ session }: { session: Session }) {
  // undefined = not yet read from localStorage (avoids SSR mismatch)
  const [participant, setParticipant] = useState<StoredParticipant | null | undefined>(undefined);
  const [justReturned, setJustReturned] = useState(false);
  const { activeId, connected, tick } = useActiveActivity(session);

  useEffect(() => {
    const stored = getStoredParticipant(session.code);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage only exists on the client
    setParticipant(stored);
    if (stored) setJustReturned(true);
  }, [session.code]);

  if (participant === undefined) return <main className="min-h-svh bg-cream-50" />;
  if (participant === null) return <Onboarding session={session} onJoined={setParticipant} />;

  const activity = activeId ? findActivity(activeId) : null;

  return (
    <main className="mx-auto flex min-h-svh w-full max-w-md flex-col px-5 pb-10">
      {!connected && (
        <div className="sticky top-0 z-10 -mx-5 bg-gold-400/25 px-5 py-2 text-center font-sans text-sm font-bold text-gold-600">
          Kumokonekta muli…
        </div>
      )}

      <header className="flex items-center justify-between gap-3 py-4">
        <p className="font-sans text-xs font-bold uppercase tracking-[0.28em] text-gold-600">
          UPC Live · {session.code}
        </p>
        <RoleBadge role={participant.role} className="min-h-8 px-3 text-xs" />
      </header>

      {justReturned && (
        <p className="pb-3 font-sans text-sm text-forest-600">
          Welcome back, {participant.nickname || ROLES[participant.role]}!
        </p>
      )}

      {activity ? (
        <ActivityCard
          key={activity.id}
          activity={activity}
          sessionId={session.id}
          participantId={participant.id}
          tick={tick}
        />
      ) : (
        <WaitingScreen participant={participant} />
      )}
    </main>
  );
}
