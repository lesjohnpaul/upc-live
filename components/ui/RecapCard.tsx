'use client';

import { motion, useReducedMotion } from 'framer-motion';

type RecapCardProps = {
  title: string;
  points: string[];
  className?: string;
};

/** Module recap — staggered checklist, each point landing with its check. */
export default function RecapCard({ title, points, className = '' }: RecapCardProps) {
  const reduce = useReducedMotion();
  return (
    <div className={`w-full max-w-3xl ${className}`}>
      <h2 className="font-display text-[clamp(2rem,4vw,3.75rem)] font-medium tracking-tight [text-wrap:balance]">
        {title}
      </h2>
      <motion.ul
        initial={reduce ? false : 'hidden'}
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.35, delayChildren: 0.4 } } }}
        className="mt-10 space-y-6"
      >
        {points.map((point, i) => (
          <motion.li
            key={i}
            variants={{
              hidden: { opacity: 0, x: -24 },
              show: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
              },
            }}
            className="flex items-start gap-4 font-sans text-[clamp(1.15rem,1.9vw,1.75rem)] leading-snug"
          >
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              className="mt-1 size-[1.1em] shrink-0 text-gold-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 12.5l5.5 5.5L20 6.5" />
            </svg>
            <span className="[text-wrap:balance]">{point}</span>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}
