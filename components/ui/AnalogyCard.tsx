'use client';

import { useState } from 'react';
import { useReducedMotion } from 'framer-motion';

type AnalogyCardProps = {
  title: string;
  front: string;
  back: string;
  /** optional image URL for the front panel; falls back to a leaf gradient */
  image?: string;
  className?: string;
};

/**
 * Tap-to-flip analogy card. A real <button>, so Enter/Space and focus come
 * free. 3D flip is skipped for reduced-motion users (instant swap instead).
 */
export default function AnalogyCard({
  title,
  front,
  back,
  image,
  className = '',
}: AnalogyCardProps) {
  const [flipped, setFlipped] = useState(false);
  const reduce = useReducedMotion();

  const face =
    'absolute inset-0 flex flex-col overflow-hidden rounded-2xl [backface-visibility:hidden]';

  return (
    <button
      type="button"
      aria-pressed={flipped}
      onClick={() => setFlipped((f) => !f)}
      className={`group relative block h-[26rem] w-full max-w-xl cursor-pointer text-left [perspective:1600px] focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-gold-400 ${className}`}
    >
      <span
        className="relative block h-full w-full [transform-style:preserve-3d]"
        style={{
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transition: reduce
            ? 'none'
            : 'transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        {/* front */}
        <span className={`${face} bg-forest-900 text-cream-100 shadow-2xl shadow-forest-950/60`}>
          <span
            aria-hidden
            className="block h-1/2 w-full bg-cover bg-center"
            style={{
              backgroundImage: image
                ? `url(${image})`
                : 'radial-gradient(40rem 20rem at 20% 0%, oklch(0.46 0.078 156), transparent 70%), linear-gradient(140deg, oklch(0.37 0.062 158), oklch(0.235 0.042 162))',
            }}
          />
          <span className="flex flex-1 flex-col justify-end p-8">
            <span className="font-sans text-xs font-bold uppercase tracking-[0.25em] text-gold-400">
              Analogy
            </span>
            <span className="mt-2 font-display text-[clamp(1.6rem,2.6vw,2.4rem)] font-medium leading-tight [text-wrap:balance]">
              {title}
            </span>
            <span className="mt-3 font-sans text-base opacity-70">{front}</span>
            <span className="mt-4 font-sans text-sm text-gold-300 opacity-80 transition-opacity group-hover:opacity-100">
              Tap to flip →
            </span>
          </span>
        </span>
        {/* back */}
        <span
          className={`${face} justify-center bg-cream-100 p-8 text-forest-950 shadow-2xl shadow-forest-950/60 [transform:rotateY(180deg)]`}
        >
          <span className="font-sans text-xs font-bold uppercase tracking-[0.25em] text-gold-600">
            The point
          </span>
          <span className="mt-4 font-display text-[clamp(1.2rem,1.9vw,1.7rem)] leading-snug [text-wrap:balance]">
            {back}
          </span>
          <span className="mt-6 font-sans text-sm text-forest-600">
            ← Tap to flip back
          </span>
        </span>
      </span>
    </button>
  );
}
