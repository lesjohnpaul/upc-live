'use client';

import { useEffect, useState } from 'react';
import { animate, motion, useReducedMotion } from 'framer-motion';

type StatBlockProps = {
  /** e.g. "1 in 7", "68%", "₱4.8B" — the first number counts up on mount */
  value: string;
  label: string;
  context?: string;
  source?: string;
  className?: string;
};

/** Splits value around its first number so only the digits animate. */
function splitValue(value: string): [string, number | null, number, string] {
  const m = value.match(/(\d+(?:\.\d+)?)/);
  if (!m || m.index === undefined) return [value, null, 0, ''];
  const decimals = m[1].includes('.') ? m[1].split('.')[1].length : 0;
  return [
    value.slice(0, m.index),
    parseFloat(m[1]),
    decimals,
    value.slice(m.index + m[1].length),
  ];
}

export default function StatBlock({
  value,
  label,
  context,
  source,
  className = '',
}: StatBlockProps) {
  const reduce = useReducedMotion();
  const [prefix, target, decimals, suffix] = splitValue(value);
  // always start at 0 so server and client first paint agree (useReducedMotion
  // is unknowable during SSR); the effect snaps to the final value instantly
  // for reduced-motion users via a zero-duration animation.
  const [n, setN] = useState(target === null ? null : 0);

  useEffect(() => {
    if (target === null) return;
    const controls = animate(0, target, {
      duration: reduce ? 0 : 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setN(parseFloat(v.toFixed(decimals))),
    });
    return () => controls.stop();
  }, [target, decimals, reduce]);

  return (
    <div className={`text-center ${className}`}>
      <p className="font-display text-stat font-semibold tracking-tighter text-gold-300 tabular-nums">
        {prefix}
        {target !== null && (n ?? target).toFixed(decimals)}
        {suffix}
      </p>
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="mt-4 font-sans text-[clamp(1.4rem,2.6vw,2.6rem)] font-medium [text-wrap:balance]">
          {label}
        </p>
        {context && (
          <p className="mx-auto mt-4 max-w-[46ch] font-sans text-[clamp(1rem,1.5vw,1.4rem)] opacity-75 [text-wrap:balance]">
            {context}
          </p>
        )}
        {source && (
          <p className="mt-6 font-sans text-[clamp(0.75rem,0.95vw,0.95rem)] uppercase tracking-[0.18em] opacity-50">
            {source}
          </p>
        )}
      </motion.div>
    </div>
  );
}
