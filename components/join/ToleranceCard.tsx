'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { ToleranceActivity } from '@/lib/types';
import {
  REWARD_BASE,
  TOLERANCE_TAPS,
  isToleranceReached,
  rewardForTap,
  urgeForTap,
} from '@/lib/tolerance';
import { SendStatus, useResponse } from './useResponse';

/**
 * The tap where urge overtakes payout — the crossing the two meters draw, and
 * the one mid-run beat worth announcing. Derived rather than written as 6, so
 * it follows DECAY/URGE_RATE if the curves get tuned in rehearsal.
 */
const CROSSING_TAP = (() => {
  for (let n = 1; n < TOLERANCE_TAPS; n++)
    if (urgeForTap(n) > rewardForTap(n) / REWARD_BASE) return n;
  return TOLERANCE_TAPS;
})();

type Props = {
  activity: ToleranceActivity;
  sessionId: string;
  participantId: string;
  tick: number;
};

/**
 * Beat the Brain. One giant button pays a reward that shrinks with every tap
 * while the urge bar climbs past it; at TOLERANCE_TAPS the card stops and names
 * what they just felt.
 *
 * Two things carry the whole lesson and must not be "tidied" away:
 * - the payout number physically shrinks and dims with its value (a constant-
 *   size number teaches nothing), and
 * - payout and urge are drawn as two bars in the same geometry, so the crossing
 *   at tap 6 is something they watch happen rather than something we assert.
 *
 * One row is written, on the reveal — never per tap. 60 phones upserting on
 * every tap would take the session down. That also means any remote payload is
 * proof this phone already finished, so hydration restores the reveal.
 */
export default function ToleranceCard({ activity, sessionId, participantId, tick }: Props) {
  const { remote, settled, state, send, retry } = useResponse(
    sessionId,
    participantId,
    activity.id,
    tick,
  );
  const reduce = useReducedMotion();
  const [taps, setTaps] = useState(0);
  // The count lives in a ref as well as state: this button gets hammered, and a
  // render that hasn't flushed yet would hand two rapid taps the same index.
  const tapsRef = useRef(0);
  const touched = useRef(false);
  const startedAt = useRef<number | null>(null);
  const revealRef = useRef<HTMLHeadingElement>(null);

  /** what a prior run on this phone left behind; 0 when this is a first arrival */
  const priorTaps = typeof remote?.taps === 'number' ? remote.taps : 0;

  useEffect(() => {
    if (!touched.current && priorTaps > 0) {
      tapsRef.current = priorTaps;
      setTaps(priorTaps);
    }
  }, [priorTaps]);

  const done = isToleranceReached(taps);

  // The button they were activating is gone at the reveal, so focus would fall
  // to <body> and the payoff would land in silence. Move it to the headline,
  // once, on the flip.
  useEffect(() => {
    if (done) revealRef.current?.focus();
  }, [done]);
  /** what another tap would pay — the bar the urge is racing */
  const nextReward = rewardForTap(taps);
  /** what the tap they just made paid */
  const lastReward = rewardForTap(Math.max(0, taps - 1));
  const urge = urgeForTap(taps);
  /* floor is 0.5, not 0.35: this runs on their own phones, possibly dimmed, in
     a bright function room. The font-size multiplier carries the shrink. */
  const flashOpacity = 0.5 + 0.5 * (lastReward / REWARD_BASE);

  const tap = () => {
    if (!settled || isToleranceReached(tapsRef.current)) return;
    touched.current = true;
    startedAt.current ??= Date.now();
    const next = tapsRef.current + 1;
    tapsRef.current = next;
    setTaps(next);
    if (isToleranceReached(next))
      send({
        taps: next,
        peakReward: rewardForTap(0),
        finalReward: rewardForTap(next - 1),
        seconds: Math.round((Date.now() - startedAt.current) / 1000),
      });
  };

  // `settled` gates input: a card that accepted taps before hydration resolved
  // could overwrite a finished row with a fresh, shorter run. Hold one beat
  // longer while a restore is still landing, or a rejoin paints the tap screen
  // for a frame — and a tap in that frame discards the restore for good.
  // `taps === 0` stands in for "the restore hasn't run yet": tapping sets
  // touched and taps together, so this cannot outlast either outcome.
  if (!settled || (priorTaps > 0 && taps === 0)) {
    return (
      <div className="flex flex-col items-center gap-5 py-10 text-center">
        <p className="animate-breathe font-display text-4xl" aria-hidden>
          🧠
        </p>
        <p role="status" className="font-sans text-sm font-bold text-forest-600">
          Loading…
        </p>
      </div>
    );
  }

  if (done)
    return (
      <div
        data-mode="calm"
        // the reveal is where the deck stops shouting
        className="-mx-5 -mb-10 flex min-h-[80svh] flex-col justify-center gap-6 bg-[var(--bg)] px-5 py-10 font-catalyst-body text-[var(--fg)]"
      >
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          /* 600ms = calm's --motion-slow */
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-6"
        >
          <p className="text-base font-bold uppercase tracking-[0.28em] text-[var(--fg-muted)]">
            {activity.title}
          </p>
          <h2
            ref={revealRef}
            tabIndex={-1}
            className="font-catalyst-display text-[clamp(2.25rem,9vw,3.5rem)] font-extrabold leading-[1.05] tracking-tight outline-none [text-wrap:balance]"
          >
            {activity.revealHeadline}
          </h2>

          <dl className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-[var(--bg-raised)] p-5">
              <dt className="text-base font-bold uppercase tracking-wider text-[var(--fg-muted)]">
                First tap
              </dt>
              <dd className="font-catalyst-display text-5xl font-extrabold tabular-nums">
                {Math.round(rewardForTap(0))}
              </dd>
            </div>
            <div className="rounded-2xl bg-[var(--bg-raised)] p-5">
              <dt className="text-base font-bold uppercase tracking-wider text-[var(--fg-muted)]">
                Tap {taps}
              </dt>
              <dd className="font-catalyst-display text-5xl font-extrabold tabular-nums text-[var(--accent)]">
                {Math.round(lastReward)}
              </dd>
            </div>
          </dl>

          {/* full --fg, not muted: the room's standing feedback is "bigger,
              easier to read" and this paragraph is the whole point */}
          <p className="text-lg leading-relaxed text-[var(--fg)]">{activity.revealBody}</p>
          <SendStatus state={state} retry={retry} sentLabel="Saved ✓" />
        </motion.div>
      </div>
    );

  return (
    <div
      data-mode="rally"
      /* -mb-10 cancels JoinFlow's page padding so the ink runs to the bottom edge */
      className="-mx-5 -mb-10 flex min-h-[88svh] flex-col gap-4 bg-[var(--bg)] px-5 pb-10 pt-5 font-catalyst-body text-[var(--fg)]"
    >
      <h2 className="font-catalyst-display text-2xl font-extrabold uppercase tracking-tight">
        {activity.title}
      </h2>

      <div className="flex flex-col gap-2">
        {/* "Next", because this is what another tap would pay — the big number
            below reports what the last one did */}
        <Meter
          label="Next payout"
          value={nextReward / REWARD_BASE}
          color="var(--accent)"
          reduce={reduce}
        />
        <Meter label="Urge" value={urge} color="var(--accent-hot)" reduce={reduce} />
      </div>

      <button
        type="button"
        onClick={tap}
        className="flex h-[60svh] w-full touch-manipulation select-none flex-col items-center justify-center rounded-[2.5rem] bg-[var(--accent)] text-[var(--bg)] [-webkit-tap-highlight-color:transparent] active:brightness-90"
      >
        {/*
          Payout zone: fixed height so the shrinking number never shifts the
          layout, and the number STAYS between taps — a flash that vanished
          would leave nothing to compare tap 10 against tap 1.
        */}
        <span className="relative flex h-[45%] w-full items-center justify-center">
          {taps > 0 && (
            <motion.span
              key={taps}
              /* size AND opacity track the payout — this is the mechanic.
                 Reduced motion keeps both and simply drops the pop. */
              style={{
                fontSize: `calc(${0.34 + 0.66 * (lastReward / REWARD_BASE)} * clamp(4rem, 22vw, 9rem))`,
              }}
              initial={reduce ? { opacity: flashOpacity } : { opacity: flashOpacity, scale: 1.3 }}
              animate={{ opacity: flashOpacity, scale: 1 }}
              transition={reduce ? { duration: 0 } : { duration: 0.26, ease: 'easeOut' }}
              className="absolute font-catalyst-display font-black leading-none tabular-nums"
            >
              +{Math.round(lastReward)}
            </motion.span>
          )}
        </span>
        <span className="font-catalyst-display text-[clamp(2.5rem,13vw,4.5rem)] font-black uppercase leading-none tracking-[0.12em]">
          {activity.tapLabel}
        </span>
      </button>

      <p className="text-center text-lg font-bold tabular-nums text-[var(--fg-muted)]">
        {taps} {taps === 1 ? 'tap' : 'taps'}
      </p>
      {/* the mechanic is size and colour, which a screen reader cannot see —
          this is the same lesson in words. Only on the beats that teach: the
          first tap and the crossing. Announcing all twenty queues up faster
          than they play, so by tap 20 you are hearing tap 5. The third beat,
          the collapse, is the reveal taking focus — this region is unmounted
          by then. */}
      <p role="status" className="sr-only">
        {taps > 0 &&
          (taps === 1 || taps === CROSSING_TAP) &&
          `Tap ${taps} paid ${Math.round(lastReward)}. Urge ${Math.round(urge * 100)} percent.`}
      </p>
    </div>
  );
}

/** Payout and urge in the same geometry, so the crossing is watchable. */
function Meter({
  label,
  value,
  color,
  reduce,
}: {
  label: string;
  value: number;
  color: string;
  reduce: boolean | null;
}) {
  const pct = Math.round(value * 100);
  return (
    <div className="flex items-center gap-3">
      <span className="w-[5.5rem] shrink-0 text-base font-bold uppercase tracking-wider text-[var(--fg-muted)]">
        {label}
      </span>
      <div className="h-4 flex-1 overflow-hidden rounded-full bg-[var(--bg-raised)]">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={false}
          animate={{ width: `${pct}%` }}
          /* 200ms = rally's --motion-fast */
          transition={reduce ? { duration: 0 } : { duration: 0.2 }}
        />
      </div>
      <span className="w-14 shrink-0 text-right text-base font-bold tabular-nums">{pct}%</span>
    </div>
  );
}
