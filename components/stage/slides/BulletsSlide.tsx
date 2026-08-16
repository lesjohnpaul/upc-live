'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { Slide, StageMode } from '@/lib/types';
import SlideShell from '@/components/ui/SlideShell';

/**
 * Bullet size. This was the deck's weakest type: one fixed clamp (28px at
 * 1920, against a 60px title) no matter how many bullets the slide held.
 *
 * UPC keeps that clamp. Measured on its densest bullets slide (upc2 m5 s9,
 * four bullets, 178 characters in the longest): at --text-stage-body the list
 * grows from 419px to 1216px and the slide runs 1609px tall on a 1080px
 * projector. Even --text-stage-min, which does fit bullets, is not safe to
 * apply deck-wide — UPC's poll slides already measure 995px against a 907px
 * safe box. Raising shared type across 13 deployed modules is its own change,
 * with its own visual sign-off.
 *
 * The Catalyst's bullets are short, so they start at the readability floor and
 * take full body copy when there are few enough of them to breathe.
 */
function bulletSize(mode: StageMode, count: number) {
  if (mode === 'upc') return 'text-[clamp(1.15rem,1.9vw,1.75rem)]';
  return count <= 3 ? 'text-stage-body' : 'text-stage-min';
}

export default function BulletsSlide({
  slide,
  mode,
}: {
  slide: Extract<Slide, { kind: 'bullets' }>;
  mode: StageMode;
}) {
  const reduce = useReducedMotion();
  const size = bulletSize(mode, slide.bullets.length);
  return (
    <SlideShell mode={mode} dim={slide.image}>
      <div className="w-full max-w-4xl">
        <h2 className="font-display text-[clamp(2rem,4vw,3.75rem)] font-medium tracking-tight [text-wrap:balance]">
          {slide.title}
        </h2>
        <motion.ul
          initial={reduce ? false : 'hidden'}
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.25, delayChildren: 0.3 } } }}
          className="mt-10 space-y-6"
        >
          {slide.bullets.map((bullet, i) => (
            <motion.li
              key={i}
              variants={{
                hidden: { opacity: 0, x: -20 },
                show: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
              }}
              className={`flex items-start gap-4 font-sans leading-snug ${size}`}
            >
              <span
                aria-hidden
                className="mt-[0.55em] size-2 shrink-0 rounded-full bg-[var(--accent)]"
              />
              <span className="[text-wrap:balance]">{bullet}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </SlideShell>
  );
}
