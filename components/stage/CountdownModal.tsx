'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type Phase = 'setup' | 'running' | 'paused' | 'done';

const PRESETS = [3, 5, 10, 15];
const R = 130;
const CIRC = 2 * Math.PI * R;

function fmt(ms: number): string {
  const s = Math.max(0, Math.ceil(ms / 1000));
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
}

/**
 * Activity time-box timer. Stays mounted in the deck so the countdown keeps
 * running while the modal is closed (a small chip stays visible bottom-left).
 * Toggled with `t` or the Timer pill on activity slides.
 */
export default function CountdownModal({
  open,
  onClose,
  onOpen,
}: {
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
}) {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>('setup');
  const [totalMs, setTotalMs] = useState(0);
  const [remainingMs, setRemainingMs] = useState(0);
  const [customMin, setCustomMin] = useState('');
  const remainRef = useRef(0); // wall-clock source of truth, survives pause/close

  const start = (minutes: number) => {
    const ms = Math.round(minutes * 60_000);
    setTotalMs(ms);
    setRemainingMs(ms);
    remainRef.current = ms;
    setPhase('running');
  };

  // ponytail: 250ms tick recomputed from an epoch deadline — immune to setInterval drift.
  // Date.now lives only in this effect (react-hooks/purity keeps it out of render scope).
  useEffect(() => {
    if (phase !== 'running') return;
    const endsAt = Date.now() + remainRef.current; // re-anchor on every start/resume
    const id = setInterval(() => {
      const left = endsAt - Date.now();
      remainRef.current = Math.max(0, left);
      if (left <= 0) {
        setRemainingMs(0);
        setPhase('done');
      } else {
        setRemainingMs(left);
      }
    }, 250);
    return () => clearInterval(id);
  }, [phase]);

  // "Time!" flash auto-clears after ~4s (or on click)
  useEffect(() => {
    if (phase !== 'done') return;
    const id = setTimeout(() => setPhase('setup'), 4000);
    return () => clearTimeout(id);
  }, [phase]);

  // pause freezes remainRef (kept current by the tick); resume re-anchors in the effect
  const pause = () => setPhase('paused');
  const resume = () => setPhase('running');

  const ticking = phase === 'running' || phase === 'paused';
  const finalTen = phase === 'running' && remainingMs <= 10_000;
  const customValid = /^\d+$/.test(customMin) && +customMin >= 1 && +customMin <= 60;

  return (
    <>
      {/* zero: gentle full-screen gold flash */}
      {phase === 'done' && (
        <motion.button
          type="button"
          onClick={() => setPhase('setup')}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-50 flex items-center justify-center outline-none"
          style={{ background: 'oklch(0.775 0.115 79 / 0.28)' }}
        >
          <span className="rounded-3xl bg-forest-950/80 px-14 py-8 font-display text-[clamp(3rem,8vw,7rem)] font-medium text-gold-300 shadow-2xl backdrop-blur-sm">
            Time!
          </span>
        </motion.button>
      )}

      {/* unobtrusive running chip while modal is closed */}
      {!open && ticking && (
        <button
          type="button"
          onClick={onOpen}
          aria-label="Reopen timer"
          className={`absolute bottom-5 left-5 z-40 rounded-full bg-forest-900/70 px-4 py-1.5 font-sans text-sm tabular-nums ring-1 ring-cream-100/15 backdrop-blur-sm transition hover:bg-forest-800 ${
            finalTen ? 'animate-pulse text-gold-300' : 'text-cream-200/80'
          }`}
        >
          ◷ {fmt(remainingMs)}
          {phase === 'paused' && <span className="ml-1.5 opacity-60">⏸</span>}
        </button>
      )}

      {open && phase !== 'done' && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Countdown timer"
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-forest-950/85 backdrop-blur-sm"
        >
          {phase === 'setup' ? (
            <div className="flex flex-col items-center rounded-3xl bg-forest-900/90 p-10 shadow-2xl ring-1 ring-cream-100/15">
              <p className="font-sans text-xs font-bold uppercase tracking-[0.28em] text-gold-300">
                Countdown timer
              </p>
              <div className="mt-6 flex gap-3">
                {PRESETS.map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => start(m)}
                    className="rounded-2xl bg-forest-800 px-6 py-4 font-display text-2xl font-medium text-cream-100 ring-1 ring-cream-100/15 transition hover:bg-forest-700 hover:ring-gold-400/50"
                  >
                    {m}
                    <span className="ml-1 font-sans text-sm opacity-60">min</span>
                  </button>
                ))}
              </div>
              <div className="mt-5 flex items-center gap-3">
                <input
                  type="number"
                  min={1}
                  max={60}
                  value={customMin}
                  onChange={(e) => setCustomMin(e.target.value)}
                  placeholder="Custom"
                  aria-label="Custom minutes (1–60)"
                  className="w-28 rounded-xl bg-forest-800 px-4 py-2.5 text-center font-sans text-cream-100 ring-1 ring-cream-100/15 outline-none placeholder:text-cream-100/40 focus:ring-gold-400/60"
                />
                <button
                  type="button"
                  disabled={!customValid}
                  onClick={() => start(+customMin)}
                  className="rounded-xl bg-gold-400 px-5 py-2.5 font-sans font-bold text-forest-950 transition hover:bg-gold-300 disabled:cursor-not-allowed disabled:opacity-35"
                >
                  Start
                </button>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="mt-6 font-sans text-sm text-cream-100/50 transition hover:text-cream-100"
              >
                Esc to close
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="relative flex items-center justify-center">
                <svg
                  viewBox="0 0 300 300"
                  className="size-[min(60vh,60vw)] -rotate-90"
                  aria-hidden
                >
                  <circle
                    cx="150"
                    cy="150"
                    r={R}
                    fill="none"
                    stroke="oklch(0.295 0.052 160)"
                    strokeWidth="7"
                  />
                  <circle
                    cx="150"
                    cy="150"
                    r={R}
                    fill="none"
                    stroke="oklch(0.775 0.115 79)"
                    strokeWidth="7"
                    strokeLinecap="round"
                    strokeDasharray={CIRC}
                    strokeDashoffset={CIRC * (1 - (totalMs ? remainingMs / totalMs : 0))}
                    style={{ transition: 'stroke-dashoffset 0.25s linear' }}
                  />
                </svg>
                <span
                  className={`absolute font-display text-[clamp(4rem,12vw,10rem)] font-medium tabular-nums ${
                    finalTen ? 'animate-pulse text-gold-300' : 'text-cream-100'
                  }`}
                >
                  {fmt(remainingMs)}
                </span>
              </div>
              <div className="mt-4 flex gap-3">
                {phase === 'running' ? (
                  <button
                    type="button"
                    onClick={pause}
                    className="rounded-xl bg-forest-800 px-6 py-2.5 font-sans font-bold text-cream-100 ring-1 ring-cream-100/15 transition hover:bg-forest-700"
                  >
                    Pause
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={resume}
                    className="rounded-xl bg-gold-400 px-6 py-2.5 font-sans font-bold text-forest-950 transition hover:bg-gold-300"
                  >
                    Resume
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setPhase('setup')}
                  className="rounded-xl bg-forest-800 px-6 py-2.5 font-sans font-bold text-cream-100 ring-1 ring-cream-100/15 transition hover:bg-forest-700"
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-xl px-6 py-2.5 font-sans font-bold text-cream-100/60 ring-1 ring-cream-100/15 transition hover:text-cream-100"
                >
                  Close
                </button>
              </div>
              <p className="mt-4 font-sans text-sm text-cream-100/50">
                Closing keeps the timer running — a chip stays on stage
              </p>
            </div>
          )}
        </motion.div>
      )}
    </>
  );
}
