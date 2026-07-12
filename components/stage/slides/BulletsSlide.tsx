'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { Slide } from '@/lib/types';
import SlideShell from '@/components/ui/SlideShell';

export default function BulletsSlide({ slide }: { slide: Extract<Slide, { kind: 'bullets' }> }) {
  const reduce = useReducedMotion();
  return (
    <SlideShell dim={slide.image}>
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
              className="flex items-start gap-4 font-sans text-[clamp(1.15rem,1.9vw,1.75rem)] leading-snug"
            >
              <span aria-hidden className="mt-[0.55em] size-2 shrink-0 rounded-full bg-gold-400" />
              <span className="[text-wrap:balance]">{bullet}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </SlideShell>
  );
}
