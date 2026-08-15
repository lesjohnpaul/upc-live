'use client';

import { useEffect, useRef, useState } from 'react';
import type { PlanActivity, Role } from '@/lib/types';
import { SendStatus, useResponse } from './useResponse';

/**
 * Hard cap, not a style choice: this commitment goes on a projector and has to
 * read from the back of a function room. Past ~140 characters the wall either
 * shrinks the type or pages so slowly nobody sees their own school.
 */
const MAX = 140;

type Draft = { school: string; commitment: string; when: string };

const EMPTY: Draft = { school: '', commitment: '', when: '' };

type Props = {
  activity: PlanActivity;
  sessionId: string;
  participantId: string;
  role: Role;
  tick: number;
};

/**
 * Build Your Barkada. Each SSLG pair drafts one 90-day commitment; the school
 * name is what joins the two phones into a single card on the wall, so it is
 * asked first and plainly.
 *
 * The two roles get different prompts on purpose — the student names the
 * activity they will run, the adviser names what they will sign, fund or
 * unblock. That asymmetry IS the session's thesis; do not collapse it into one
 * shared question.
 *
 * Same weak-wifi armor as the other cards: input is gated on `settled`, so a
 * reload cannot clobber a stored draft with an empty one, and every keystroke
 * calls `send` — safe because useResponse serialises in-flight upserts and
 * keeps only the newest pending payload.
 */
export default function PlanCard({ activity, sessionId, participantId, role, tick }: Props) {
  const { remote, settled, state, send, retry } = useResponse(
    sessionId,
    participantId,
    activity.id,
    tick,
  );
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const touched = useRef(false);

  // hydrate a returning phone — never over a local edit
  useEffect(() => {
    if (touched.current || !remote) return;
    const str = (v: unknown) => (typeof v === 'string' ? v : '');
    setDraft({ // one-shot hydration
      school: str(remote.school),
      commitment: str(remote.commitment).slice(0, MAX),
      when: str(remote.when),
    });
  }, [remote]);

  const update = (patch: Partial<Draft>) => {
    touched.current = true;
    const next = { ...draft, ...patch };
    setDraft(next);
    send(next);
  };

  if (!settled) {
    return (
      <div className="flex flex-col items-center gap-5 py-10 text-center">
        <p className="animate-breathe font-display text-4xl" aria-hidden>
          🤝
        </p>
        <p role="status" className="font-sans text-sm font-bold text-forest-600">
          Loading…
        </p>
      </div>
    );
  }

  const prompt = activity.prompts[role === 'adviser' ? 'adviser' : 'student_leader'];
  const left = MAX - draft.commitment.length;

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
        {/* both phones must type the same school or the wall shows two cards */}
        <span className="text-sm text-[var(--fg-muted)]">
          Type it the same way as your partner — this is how your two plans meet on one card.
        </span>
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-lg font-bold leading-snug">{prompt}</span>
        <textarea
          value={draft.commitment}
          /* maxLength blocks typing; the slice blocks a paste that slips past it */
          onChange={(e) => update({ commitment: e.target.value.slice(0, MAX) })}
          maxLength={MAX}
          rows={4}
          placeholder="One sentence. Say the thing you will actually do."
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

      <fieldset className="flex flex-col gap-3">
        <legend className="mb-3 text-lg font-bold leading-snug">{activity.whenPrompt}</legend>
        <div className="flex flex-wrap gap-3">
          {activity.whenOptions.map((option) => {
            const on = draft.when === option;
            return (
              <button
                key={option}
                type="button"
                aria-pressed={on}
                onClick={() => update({ when: option })}
                className={`min-h-14 rounded-full px-6 text-lg font-bold transition-colors ${
                  on
                    ? 'bg-[var(--accent)] text-[var(--bg)]'
                    : 'bg-[var(--bg-raised)] text-[var(--fg)]'
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
      </fieldset>

      <p role="status" className="text-base font-bold leading-snug text-[var(--accent)]">
        {draft.school.trim() && draft.commitment.trim()
          ? 'Your school is on the wall. Keep editing until it says what you mean.'
          : 'Fill in your school and your commitment — then watch the wall.'}
      </p>

      <SendStatus state={state} retry={retry} sentLabel="On the wall ✓" />
    </div>
  );
}
