'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { Slide } from '@/lib/types';

/* stylized leaf silhouettes (24×24 viewBox), reused by index */
const LEAF_PATHS = [
  'M12 2C7 8 5 13 7 17c1.6 3.2 3.5 5 5 5s3.4-1.8 5-5c2-4 0-9-5-15z',
  'M12 2C9 9 8 15 12 22c4-7 3-13 0-20z',
  'M12 3C5 5 3 12 6 17c2.5 4 7 5 12 4 1-5 0-9.5-2-13-1.5-2.7-2.5-4-4-5z',
];

const GOLD = 'oklch(0.775 0.115 79)';
const CREAM = 'oklch(0.962 0.013 93)';

/* ponytail: deterministic per-index params (no Math.random) — SSR-safe, stable across renders */
const PARTICLES = Array.from({ length: 14 }, (_, i) => {
  const isLeaf = i % 4 === 3; // indices 3, 7, 11 → three leaves
  const dur = 28 + ((i * 7) % 22); // 28–49s
  return {
    isLeaf,
    left: (i * 37 + 7) % 100, // vw %
    size: isLeaf ? 22 + ((i * 5) % 14) : 7 + ((i * 13) % 16),
    dur,
    delay: -((i * 9) % dur), // negative → mid-flight on mount
    sway: ((i * 17) % 90) - 45, // px horizontal drift
    spin: (i % 2 ? 1 : -1) * (40 + ((i * 23) % 50)),
    peak: 0.14 + ((i * 3) % 4) * 0.07,
    gold: i % 3 !== 1,
  };
});

const CSS = `
@keyframes welcome-rise {
  0% { transform: translate3d(0, 0, 0) rotate(0deg); opacity: 0; }
  8% { opacity: var(--peak); }
  85% { opacity: var(--peak); }
  100% { transform: translate3d(var(--sway), -112vh, 0) rotate(var(--spin)); opacity: 0; }
}
@keyframes welcome-drift-a {
  from { transform: translate3d(-4%, -3%, 0) scale(1); }
  to { transform: translate3d(4%, 3%, 0) scale(1.15); }
}
@keyframes welcome-drift-b {
  from { transform: translate3d(3%, 4%, 0) scale(1.1); }
  to { transform: translate3d(-4%, -3%, 0) scale(1); }
}
@keyframes welcome-shimmer {
  from { background-position: 0% center; }
  to { background-position: -200% center; }
}
`;

/**
 * Animated walk-in / hold screen — the audience's first impression of the day.
 * Slow-drifting forest gradients, floating gold orbs and leaves, gentle
 * Fraunces entrance. prefers-reduced-motion → static gradient, instant text.
 */
export default function WelcomeSlide({ slide }: { slide: Extract<Slide, { kind: 'welcome' }> }) {
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.18, delayChildren: 0.2 } },
  };
  const item = {
    hidden: { opacity: 0, y: 26 },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const } },
  };

  return (
    <section className="relative flex min-h-svh w-full flex-col items-center justify-center overflow-hidden bg-forest-950 px-[6vw] py-[8vh] text-cream-100">
      {!reduce && <style>{CSS}</style>}

      {/* layered slow-drifting radial gradients */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-[12%]"
        style={{
          background:
            'radial-gradient(70rem 50rem at 30% 20%, oklch(0.295 0.052 160 / 0.75), transparent 65%)',
          animation: reduce ? undefined : 'welcome-drift-a 46s ease-in-out infinite alternate',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-[12%]"
        style={{
          background:
            'radial-gradient(60rem 45rem at 72% 78%, oklch(0.26 0.05 185 / 0.6), transparent 62%)',
          animation: reduce ? undefined : 'welcome-drift-b 58s ease-in-out infinite alternate',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-[12%]"
        style={{
          background:
            'radial-gradient(50rem 36rem at 55% 45%, oklch(0.5 0.09 84 / 0.14), transparent 60%)',
          animation: reduce ? undefined : 'welcome-drift-a 34s ease-in-out infinite alternate-reverse',
        }}
      />

      {/* floating orbs + leaves */}
      {!reduce &&
        PARTICLES.map((p, i) => (
          <span
            key={i}
            aria-hidden
            className="pointer-events-none absolute top-full"
            style={
              {
                left: `${p.left}%`,
                width: p.size,
                height: p.size,
                opacity: 0,
                '--peak': p.peak,
                '--sway': `${p.sway}px`,
                '--spin': `${p.spin}deg`,
                animation: `welcome-rise ${p.dur}s linear ${p.delay}s infinite`,
                willChange: 'transform, opacity',
              } as React.CSSProperties
            }
          >
            {p.isLeaf ? (
              <svg viewBox="0 0 24 24" fill={p.gold ? GOLD : CREAM} className="size-full">
                <path d={LEAF_PATHS[Math.floor(i / 4) % LEAF_PATHS.length]} />
              </svg>
            ) : (
              <span
                className="block size-full rounded-full"
                style={{
                  background: p.gold ? GOLD : CREAM,
                  filter: `blur(${p.size > 14 ? 3 : 1.5}px)`,
                }}
              />
            )}
          </span>
        ))}

      <motion.div
        variants={container}
        initial={reduce ? 'show' : 'hidden'}
        animate="show"
        className="relative z-10 flex max-w-[92rem] flex-col items-center text-center"
      >
        <motion.p
          variants={item}
          className="font-sans text-[clamp(1rem,1.6vw,1.5rem)] font-bold uppercase tracking-[0.32em]"
          style={
            reduce
              ? { color: GOLD }
              : {
                  background: `linear-gradient(90deg, ${GOLD}, ${CREAM}, ${GOLD})`,
                  backgroundSize: '200% auto',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                  animation: 'welcome-shimmer 7s linear infinite',
                }
          }
        >
          {slide.dayLabel}
        </motion.p>
        <motion.h1
          variants={item}
          className="mt-8 max-w-[16ch] font-display text-statement font-medium tracking-tight [text-wrap:balance]"
        >
          {slide.title}
        </motion.h1>
        {slide.subtitle && (
          <motion.p
            variants={item}
            className="mt-7 max-w-[52ch] font-sans text-[clamp(1.1rem,1.8vw,1.8rem)] leading-relaxed opacity-75 [text-wrap:balance]"
          >
            {slide.subtitle}
          </motion.p>
        )}
        <motion.p
          variants={item}
          className="mt-10 font-display text-[clamp(1.2rem,2vw,2rem)] italic text-cream-200/85"
        >
          {slide.presenter}
        </motion.p>
      </motion.div>
    </section>
  );
}
