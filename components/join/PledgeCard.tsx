'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { PledgeActivity } from '@/lib/types';
import { SendStatus, useResponse } from './useResponse';

/**
 * Same 140-character cap as the commitment wall, for the same reason: this
 * sentence goes on a projector and has to read from the back of a function
 * room.
 */
const MAX = 140;

type Draft = { lines: number[]; school: string; voice: string; signed: boolean };

const EMPTY: Draft = { lines: [], school: '', voice: '', signed: false };

type Props = {
  activity: PledgeActivity;
  sessionId: string;
  participantId: string;
  tick: number;
};

/**
 * The Lead with Purpose Pledge.
 *
 * The design constraint that shapes everything here: a pledge you scroll past
 * is not a pledge. So each line is a tap target that must be pressed
 * individually, the sign button stays disabled until every line is held, and
 * the counter tells you exactly how many are left. It costs nine taps and
 * about forty seconds — which is the point, because those are forty seconds
 * of reading the commitments instead of skimming them.
 *
 * The One Voice sentence rides on the same card. The outline runs it as a
 * separate beat, but it is the same emotional moment ("what would you say to
 * someone under pressure?") and splitting it across two activities would mean
 * two joins, two waits, and a room that has cooled down in between.
 *
 * Weak-wifi armor matches PlanCard: input gated on `settled` so a reload
 * cannot clobber a stored draft, every change calls `send`, and useResponse
 * serialises in-flight upserts keeping only the newest payload.
 */
export default function PledgeCard({ activity, sessionId, participantId, tick }: Props) {
  const { remote, settled, state, send, retry } = useResponse(
    sessionId,
    participantId,
    activity.id,
    tick,
  );
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const touched = useRef(false);
  const reduce = useReducedMotion();
  /**
   * Mirrors the newest draft so `update` composes on it rather than on the
   * render closure. Nine tap targets sit next to each other on a phone, and
   * two taps landing in one React batch would otherwise both read the same
   * stale `draft` — the second overwrites the first and a line the user
   * definitely pressed silently comes back up.
   */
  const latest = useRef<Draft>(EMPTY);

  // hydrate a returning phone — never over a local edit
  useEffect(() => {
    if (touched.current || !remote) return;
    const str = (v: unknown) => (typeof v === 'string' ? v : '');
    const lines = Array.isArray(remote.lines)
      ? remote.lines.filter(
          (n): n is number => typeof n === 'number' && n >= 0 && n < activity.lines.length,
        )
      : [];
    const hydrated: Draft = {
      lines: [...new Set(lines)],
      school: str(remote.school),
      voice: str(remote.voice).slice(0, MAX),
      signed: remote.signed === true,
    };
    latest.current = hydrated;
    setDraft(hydrated);
  }, [remote, activity.lines.length]);

  const update = (patch: Partial<Draft>) => {
    touched.current = true;
    const next = { ...latest.current, ...patch };
    latest.current = next;
    setDraft(next);
    send(next);
  };

  const toggleLine = (i: number) => {
    // held lines only accumulate — un-taking a commitment mid-pledge is not a
    // gesture this card needs, and it would let the counter run backwards
    const held = latest.current.lines;
    if (held.includes(i)) return;
    update({ lines: [...held, i] });
  };

  if (!settled) {
    return (
      <div className="flex flex-col items-center gap-5 py-10 text-center">
        <p className="animate-breathe font-display text-4xl" aria-hidden>
          ✋
        </p>
        <p role="status" className="font-sans text-sm font-bold text-forest-600">
          Loading…
        </p>
      </div>
    );
  }

  const held = draft.lines.length;
  const total = activity.lines.length;
  const allHeld = held === total;
  const left = MAX - draft.voice.length;

  if (draft.signed) {
    return (
      <div
        data-mode="rally"
        className="-mx-5 -mb-10 flex min-h-[88svh] flex-col items-center justify-center gap-6 bg-[var(--bg)] px-5 pb-10 pt-5 text-center font-catalyst-body text-[var(--fg)]"
      >
        <motion.p
          aria-hidden
          className="text-6xl"
          initial={reduce ? false : { scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          ✋
        </motion.p>
        <h2 className="font-catalyst-display text-3xl font-extrabold uppercase leading-tight tracking-tight text-[var(--accent)]">
          {activity.signedHeadline}
        </h2>
        {draft.school.trim() && (
          <p className="text-lg font-bold text-[var(--fg)]">{draft.school.trim()}</p>
        )}
        {draft.voice.trim() && (
          <blockquote className="max-w-[32ch] border-l-4 border-[var(--accent)] pl-5 text-left text-lg leading-relaxed text-[var(--fg-muted)]">
            “{draft.voice.trim()}”
          </blockquote>
        )}
        <button
          type="button"
          onClick={() => update({ signed: false })}
          className="min-h-11 text-base font-bold text-[var(--fg-muted)] underline"
        >
          Edit my pledge
        </button>
        <SendStatus state={state} retry={retry} sentLabel="Signed ✓" />
      </div>
    );
  }

  return (
    <div
      data-mode="rally"
      /* -mb-10 cancels JoinFlow's page padding so the ink runs to the bottom edge */
      className="-mx-5 -mb-10 flex min-h-[88svh] flex-col gap-6 bg-[var(--bg)] px-5 pb-10 pt-5 font-catalyst-body text-[var(--fg)]"
    >
      <div className="flex flex-col gap-2">
        <h2 className="font-catalyst-display text-2xl font-extrabold uppercase tracking-tight">
          {activity.title}
        </h2>
        {activity.intro && (
          <p className="text-base leading-relaxed text-[var(--fg-muted)]">{activity.intro}</p>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <p role="status" className="text-base font-bold text-[var(--accent)]">
          {allHeld
            ? 'Every line is yours. Sign it.'
            : `Tap each line you commit to — ${total - held} to go`}
        </p>
        <ul className="flex flex-col gap-3">
          {activity.lines.map((line, i) => {
            const on = draft.lines.includes(i);
            return (
              <li key={i}>
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggleLine(i)}
                  className={`flex min-h-16 w-full items-start gap-4 rounded-2xl p-4 text-left text-lg leading-snug transition-colors ${
                    on
                      ? 'bg-[var(--accent)]/15 font-bold text-[var(--fg)] ring-2 ring-[var(--accent)]'
                      : 'bg-[var(--bg-raised)] text-[var(--fg-muted)] ring-1 ring-[var(--bg-raised)]'
                  }`}
                >
                  <span
                    aria-hidden
                    className={`mt-0.5 grid size-7 shrink-0 place-items-center rounded-full text-base font-bold ${
                      on
                        ? 'bg-[var(--accent)] text-[var(--bg)]'
                        : 'bg-[var(--bg-raised-2)] text-[var(--fg-muted)]'
                    }`}
                  >
                    {on ? '✓' : i + 1}
                  </span>
                  <span>{line}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <label className="flex flex-col gap-2">
        <span className="text-lg font-bold leading-snug">{activity.schoolPrompt}</span>
        <input
          type="text"
          value={draft.school}
          onChange={(e) => update({ school: e.target.value })}
          maxLength={80}
          autoComplete="organization"
          placeholder="e.g. Bagong Silang National High School"
          className="min-h-14 rounded-2xl bg-[var(--bg-raised)] px-5 text-lg font-bold text-[var(--fg)] outline-none ring-1 ring-[var(--bg-raised)] placeholder:font-normal placeholder:text-[var(--fg-muted)] focus:ring-2 focus:ring-[var(--accent)]"
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-lg font-bold leading-snug">{activity.voicePrompt}</span>
        <textarea
          value={draft.voice}
          /* maxLength blocks typing; the slice blocks a paste that slips past it */
          onChange={(e) => update({ voice: e.target.value.slice(0, MAX) })}
          maxLength={MAX}
          rows={3}
          placeholder={activity.voicePlaceholder ?? 'One sentence. Say it the way you would say it.'}
          className="rounded-2xl bg-[var(--bg-raised)] p-5 text-lg leading-relaxed text-[var(--fg)] outline-none ring-1 ring-[var(--bg-raised)] placeholder:text-[var(--fg-muted)] focus:ring-2 focus:ring-[var(--accent)]"
        />
        <span
          className={`text-right text-sm font-bold tabular-nums ${
            left <= 20 ? 'text-[var(--accent-hot)]' : 'text-[var(--fg-muted)]'
          }`}
        >
          {left} characters left
        </span>
      </label>

      <button
        type="button"
        disabled={!allHeld}
        onClick={() => update({ signed: true })}
        className="min-h-16 rounded-full bg-[var(--accent)] px-6 text-xl font-extrabold uppercase tracking-wide text-[var(--bg)] transition-opacity disabled:bg-[var(--bg-raised)] disabled:text-[var(--fg-muted)]"
      >
        {allHeld ? activity.signLabel : `${total - held} lines left to tap`}
      </button>

      <SendStatus state={state} retry={retry} sentLabel="Saved ✓" />
    </div>
  );
}
