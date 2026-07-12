'use client';

import { motion, useReducedMotion } from 'framer-motion';

type BigStatementProps = {
  children: React.ReactNode;
  attribution?: string;
  className?: string;
};

/** Huge display statement — the TED slide. Balanced wrapping, Fraunces. */
export default function BigStatement({
  children,
  attribution,
  className = '',
}: BigStatementProps) {
  const reduce = useReducedMotion();
  return (
    <figure className={`text-center ${className}`}>
      <motion.blockquote
        initial={reduce ? false : { opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-[19ch] font-display text-statement font-medium tracking-tight [text-wrap:balance]"
      >
        {children}
      </motion.blockquote>
      {attribution && (
        <motion.figcaption
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.7 }}
          className="mt-8 font-sans text-[clamp(1rem,1.5vw,1.5rem)] tracking-wide text-gold-300"
        >
          — {attribution}
        </motion.figcaption>
      )}
    </figure>
  );
}
