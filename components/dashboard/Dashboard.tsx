'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getSupabase } from '@/lib/supabase';
import { ROLES, type Activity } from '@/lib/types';
import { days } from '@/content';
import { ACTIVITY_META, activityPrompt } from '@/components/live/activityMeta';
import { useSessionState } from '@/components/live/useSessionState';
import { useLiveResponses, type LiveResponse } from '@/components/live/useLiveResponses';

type QnaPayload = { question?: unknown; answered?: unknown };

function csvEscape(value: string): string {
  // leading = + - @ would execute as a formula in Excel — nicknames and
  // payloads are participant-controlled
  const safe = /^[=+\-@]/.test(value) ? `'${value}` : value;
  return `"${safe.replace(/"/g, '""')}"`;
}

/** In-flight phone upserts land within this window; deleting sooner resurrects rows. */
const RESET_SETTLE_MS = 1500;

const settle = () => new Promise((resolve) => setTimeout(resolve, RESET_SETTLE_MS));

/** Facilitator control panel: open/lock/reset activities, Q&A triage, CSV export. */
export default function Dashboard({ code }: { code: string }) {
  const { session, offline, setActive } = useSessionState(code);
  const { rows, participants, participantCount } = useLiveResponses(session?.id ?? null);
  const [busy, setBusy] = useState(false);
  const day = days.find((d) => d.course.toUpperCase() === code);

  if (!day) {
    return (
      <main className="flex min-h-svh flex-col items-center justify-center bg-cream-50 px-8 text-center">
        <h1 className="font-display text-3xl font-medium">Hindi mahanap ang session “{code}”</h1>
        <p className="mt-3 font-sans text-forest-700">Ang mga available na session ay UPC1 at UPC2.</p>
      </main>
    );
  }

  const activeId = session?.active_activity ?? null;
  const byId = new Map(participants.map((p) => [p.id, p]));
  const countFor = (activityId: string) => rows.filter((r) => r.activity_id === activityId).length;

  const run = async (fn: () => Promise<void>) => {
    if (busy) return;
    setBusy(true);
    try {
      await fn();
    } catch {
      // network hiccup: realtime/refetch will reconcile; keep the UI alive
    } finally {
      setBusy(false);
    }
  };

  const setActivity = (id: string | null) =>
    run(async () => {
      if (!session) return;
      setActive(id); // optimistic; realtime echo confirms
      await getSupabase().from('sessions').update({ active_activity: id }).eq('id', session.id);
    });

  const resetActivity = (activity: Activity) => {
    const n = countFor(activity.id);
    if (!window.confirm(`Burahin ang ${n} sagot para sa "${activityPrompt(activity)}"?`)) return;
    void run(async () => {
      if (!session) return;
      const supabase = getSupabase();
      if (activeId === activity.id) {
        // lock first and let in-flight phone upserts land, or they resurrect
        // rows right after the delete
        setActive(null);
        await supabase.from('sessions').update({ active_activity: null }).eq('id', session.id);
        await settle();
      }
      await supabase
        .from('responses')
        .delete()
        .eq('session_id', session.id)
        .eq('activity_id', activity.id);
    });
  };

  const resetSession = () => {
    if (
      !window.confirm(
        `Burahin ang LAHAT sa session ${code}: ${rows.length} sagot at ${participantCount} kalahok (kailangan nilang mag-scan muli)?`,
      )
    )
      return;
    if (!window.confirm('Sigurado ka? Hindi na ito maibabalik.')) return;
    void run(async () => {
      if (!session) return;
      const supabase = getSupabase();
      // lock first — phones stop sending — then wait out in-flight upserts
      setActive(null);
      await supabase.from('sessions').update({ active_activity: null }).eq('id', session.id);
      await settle();
      await supabase.from('responses').delete().eq('session_id', session.id);
      await supabase.from('participants').delete().eq('session_id', session.id);
    });
  };

  const toggleAnswered = (r: LiveResponse) =>
    run(async () => {
      const payload = r.payload as QnaPayload;
      await getSupabase()
        .from('responses')
        .update({ payload: { ...payload, answered: payload.answered !== true } })
        .eq('participant_id', r.participant_id)
        .eq('activity_id', r.activity_id);
    });

  const exportCsv = () => {
    const header = 'activity_id,role,nickname,payload,created_at';
    const lines = rows.map((r) => {
      const p = byId.get(r.participant_id);
      return [
        csvEscape(r.activity_id),
        csvEscape(p?.role ?? ''),
        csvEscape(p?.nickname ?? ''),
        csvEscape(JSON.stringify(r.payload)),
        csvEscape(r.created_at),
      ].join(',');
    });
    const blob = new Blob([[header, ...lines].join('\n')], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `upc-live-${code.toLowerCase()}-responses.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const qnaIds = new Set(
    day.modules.flatMap((m) =>
      m.slides.flatMap((s) => (s.kind === 'activity' && s.activity.kind === 'qna' ? [s.activity.id] : [])),
    ),
  );
  const qnaRows = rows
    .filter((r) => qnaIds.has(r.activity_id) && typeof (r.payload as QnaPayload)?.question === 'string')
    .sort((a, b) => b.created_at.localeCompare(a.created_at));

  return (
    <main className="mx-auto min-h-svh w-full max-w-5xl bg-cream-50 px-6 py-8 text-forest-950">
      <header className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <div>
          <p className="font-sans text-xs font-bold uppercase tracking-[0.28em] text-gold-600">
            UPC Live · Dashboard
          </p>
          <h1 className="mt-1 font-display text-3xl font-medium">Session {code}</h1>
        </div>
        <p className="rounded-full bg-forest-100 px-4 py-2 font-sans text-sm font-bold text-forest-800">
          {participantCount} kalahok
        </p>
        {(offline || !session) && (
          <p className="rounded-full bg-gold-400/25 px-4 py-2 font-sans text-sm font-bold text-gold-600">
            {offline ? 'Kumokonekta muli…' : 'Kumukuha ng session…'}
          </p>
        )}
        <nav className="ml-auto flex gap-3 font-sans text-sm font-bold">
          <Link
            href={`/stage/${code}`}
            target="_blank"
            className="rounded-full bg-forest-700 px-5 py-2.5 text-cream-50"
          >
            Stage ↗
          </Link>
          <Link
            href={`/join/${code}`}
            target="_blank"
            className="rounded-full bg-cream-200 px-5 py-2.5 text-forest-800 ring-1 ring-cream-300"
          >
            Join ↗
          </Link>
          <button
            type="button"
            onClick={exportCsv}
            className="rounded-full bg-cream-200 px-5 py-2.5 text-forest-800 ring-1 ring-cream-300"
          >
            I-export ang CSV
          </button>
        </nav>
      </header>

      {/* activities per module */}
      <section className="mt-8 space-y-6">
        {day.modules.map((mod) => {
          const activities = mod.slides.flatMap((s) => (s.kind === 'activity' ? [s.activity] : []));
          if (activities.length === 0) return null;
          return (
            <div key={mod.id}>
              <h2 className="font-sans text-sm font-bold uppercase tracking-[0.2em] text-forest-600">
                {mod.number > 0 ? `Module ${mod.number} · ` : ''}
                {mod.title}
              </h2>
              <ul className="mt-3 space-y-2">
                {activities.map((activity) => {
                  const isOpen = activeId === activity.id;
                  return (
                    <li
                      key={activity.id}
                      className={`flex flex-wrap items-center gap-3 rounded-2xl px-5 py-3.5 ring-1 transition-shadow ${
                        isOpen
                          ? 'bg-gold-400/15 ring-2 ring-gold-500 shadow-md'
                          : 'bg-cream-100 ring-cream-300'
                      }`}
                    >
                      <span aria-hidden className="text-xl">
                        {ACTIVITY_META[activity.kind].icon}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-sans font-bold">{activityPrompt(activity)}</p>
                        <p className="font-sans text-xs text-forest-600">
                          {ACTIVITY_META[activity.kind].label}
                          {isOpen && <span className="ml-2 font-bold text-gold-600">● BUKAS</span>}
                          <span className="ml-2">{countFor(activity.id)} sagot</span>
                        </p>
                      </div>
                      <div className="flex gap-2 font-sans text-sm font-bold">
                        {isOpen ? (
                          <button
                            type="button"
                            disabled={busy || !session}
                            onClick={() => void setActivity(null)}
                            className="rounded-full bg-forest-700 px-4 py-2 text-cream-50 disabled:opacity-40"
                          >
                            I-lock
                          </button>
                        ) : (
                          <button
                            type="button"
                            disabled={busy || !session}
                            onClick={() => void setActivity(activity.id)}
                            className="rounded-full bg-gold-500 px-4 py-2 text-forest-950 disabled:opacity-40"
                          >
                            Buksan
                          </button>
                        )}
                        <button
                          type="button"
                          disabled={busy || !session}
                          onClick={() => resetActivity(activity)}
                          className="rounded-full bg-cream-200 px-4 py-2 text-clay-600 ring-1 ring-cream-300 disabled:opacity-40"
                        >
                          Reset
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </section>

      {/* Q&A triage */}
      <section className="mt-10">
        <h2 className="font-sans text-sm font-bold uppercase tracking-[0.2em] text-forest-600">
          Q&A Triage
        </h2>
        {qnaRows.length === 0 ? (
          <p className="mt-3 font-sans text-sm text-forest-600">Wala pang tanong.</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {qnaRows.map((r) => {
              const p = byId.get(r.participant_id);
              const answered = (r.payload as QnaPayload).answered === true;
              return (
                <li
                  key={`${r.participant_id}-${r.activity_id}`}
                  className={`flex items-center gap-4 rounded-2xl px-5 py-3.5 ring-1 ${
                    answered ? 'bg-cream-100/60 ring-cream-200' : 'bg-cream-100 ring-cream-300'
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <p className={`font-sans font-bold ${answered ? 'text-forest-500 line-through' : ''}`}>
                      {(r.payload as QnaPayload).question as string}
                    </p>
                    <p className="font-sans text-xs text-forest-600">
                      {p ? p.nickname || ROLES[p.role] : '—'}
                    </p>
                  </div>
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => void toggleAnswered(r)}
                    aria-pressed={answered}
                    className={`rounded-full px-4 py-2 font-sans text-sm font-bold disabled:opacity-40 ${
                      answered
                        ? 'bg-cream-200 text-forest-700 ring-1 ring-cream-300'
                        : 'bg-forest-700 text-cream-50'
                    }`}
                  >
                    {answered ? 'Ibalik sa wall' : 'Sagot na ✓'}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      {/* danger zone */}
      <section className="mt-10 rounded-2xl bg-clay-400/10 p-5 ring-1 ring-clay-400/30">
        <h2 className="font-sans text-sm font-bold uppercase tracking-[0.2em] text-clay-600">
          Danger Zone
        </h2>
        <p className="mt-2 font-sans text-sm text-forest-700">
          I-lock ang session at burahin ang lahat ng sagot pati ang listahan ng kalahok — para sa
          bagong takbo. Kailangang mag-scan muli ng lahat.
        </p>
        <button
          type="button"
          disabled={busy || !session}
          onClick={resetSession}
          className="mt-3 rounded-full bg-clay-600 px-5 py-2.5 font-sans text-sm font-bold text-cream-50 disabled:opacity-40"
        >
          I-reset ang session
        </button>
      </section>
    </main>
  );
}
