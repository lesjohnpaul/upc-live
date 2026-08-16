'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { Slide, StageMode } from '@/lib/types';
import SlideShell from '@/components/ui/SlideShell';

/** Deterministic pseudo-random in [0,1) — same value on server and client, so no hydration drift. */
const rand = (i: number, salt: number) => {
  const v = Math.sin((i + 1) * salt) * 10000;
  return v - Math.floor(v);
};

const EMBERS = Array.from({ length: 22 }, (_, i) => ({
  left: rand(i, 12.9898) * 100,
  size: 3 + rand(i, 4.117) * 6,
  delay: rand(i, 78.233) * 9,
  duration: 10 + rand(i, 37.719) * 9,
  drift: (rand(i, 9.71) - 0.5) * 90,
  peak: 0.25 + rand(i, 21.3) * 0.5,
}));

const EASE = [0.22, 1, 0.36, 1] as const;

export default function FinaleSlide({
  slide,
  mode,
}: {
  slide: Extract<Slide, { kind: 'finale' }>;
  mode: StageMode;
}) {
  const reduce = useReducedMotion();
  const chars = [...slide.headline];
  const words = slide.text.split(' ');

  return (
    <SlideShell mode={mode} dim={slide.image}>
      {/* rising sampaguita embers */}
      {!reduce && (
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          {EMBERS.map((e, i) => (
            <motion.span
              key={i}
              className="absolute bottom-[-6vh] rounded-full bg-[var(--accent-soft)]"
              style={{ left: `${e.left}%`, width: e.size, height: e.size }}
              initial={{ y: 0, x: 0, opacity: 0 }}
              animate={{
                y: ['0vh', '-112vh'],
                x: [0, e.drift],
                opacity: [0, e.peak, e.peak, 0],
              }}
              transition={{
                duration: e.duration,
                delay: e.delay,
                repeat: Infinity,
                ease: 'linear',
                times: [0, 0.15, 0.75, 1],
              }}
            />
          ))}
        </div>
      )}

      {/* one slow ceremonial swell of light behind the headline */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[18%] -z-0 h-[130vh] w-[130vh] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: 'var(--swell)' }}
        initial={reduce ? false : { scale: 0.4, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.4, ease: EASE }}
      />

      <figure className="relative z-10 text-center">
        {/* headline: letter-by-letter rise, with a gold shimmer sweeping across once it lands */}
        <motion.h1
          aria-label={slide.headline}
          className="mx-auto max-w-[14ch] bg-clip-text font-display text-[clamp(3rem,9vw,10rem)] font-medium leading-[1.02] tracking-tight text-transparent [text-wrap:balance]"
          style={{
            backgroundImage:
              'linear-gradient(100deg, var(--fg) 0%, var(--fg) 35%, var(--accent-soft) 50%, var(--fg) 65%, var(--fg) 100%)',
            backgroundSize: '250% 100%',
          }}
          initial={reduce ? false : { backgroundPosition: '150% 0%' }}
          animate={{ backgroundPosition: '-50% 0%' }}
          transition={{ delay: 1.5, duration: 2.6, ease: 'easeInOut' }}
        >
          {chars.map((c, i) => (
            <motion.span
              key={i}
              aria-hidden
              className="inline-block whitespace-pre"
              initial={reduce ? false : { opacity: 0, y: '0.5em', rotateX: -70 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: 0.25 + i * 0.045, duration: 0.85, ease: EASE }}
            >
              {c}
            </motion.span>
          ))}
        </motion.h1>

        {/* gold rule drawing itself outward */}
        <motion.div
          aria-hidden
          className="mx-auto mt-10 h-px w-[min(34rem,60vw)] origin-center bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent"
          initial={reduce ? false : { scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.25 + chars.length * 0.045, duration: 1.1, ease: EASE }}
        />

        {/* the send-off, word by word */}
        <p className="mx-auto mt-10 max-w-[26ch] font-display text-[clamp(1.6rem,3.2vw,3.4rem)] font-medium leading-[1.25] tracking-tight text-[var(--fg)]/90 [text-wrap:balance]">
          {words.map((w, i) => (
            <motion.span
              key={i}
              className="inline-block whitespace-pre"
              initial={reduce ? false : { opacity: 0, y: 16, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{
                delay: 0.9 + chars.length * 0.045 + i * 0.07,
                duration: 0.7,
                ease: EASE,
              }}
            >
              {w}
              {i < words.length - 1 ? ' ' : ''}
            </motion.span>
          ))}
        </p>

        {slide.attribution && (
          <motion.figcaption
            className="mt-12 font-sans text-[clamp(1rem,1.5vw,1.5rem)] tracking-wide text-[var(--accent-soft)]"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 1.3 + chars.length * 0.045 + words.length * 0.07,
              duration: 1.1,
              ease: EASE,
            }}
          >
            — {slide.attribution}
          </motion.figcaption>
        )}

        {slide.badge && (
          <motion.p
            className="mt-8 inline-block rounded-full px-6 py-2 font-sans text-[clamp(0.8rem,1vw,1.05rem)] uppercase tracking-[0.35em] text-[var(--accent-pale)] ring-1 ring-[var(--accent)]/40"
            initial={reduce ? false : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 1.9 + chars.length * 0.045 + words.length * 0.07,
              duration: 1,
              ease: EASE,
            }}
          >
            {slide.badge}
          </motion.p>
        )}
      </figure>
    </SlideShell>
  );
}
