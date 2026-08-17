'use client';

import { useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import type { StageMode } from '@/lib/types';

type AnalogyCardProps = {
  title: string;
  front: string;
  back: string;
  /** design mode — decides both the palette and the type scale */
  mode: StageMode;
  /** optional image URL for the front panel; falls back to a mode gradient */
  image?: string;
  className?: string;
};

/**
 * Tap-to-flip analogy card. A real <button>, so Enter/Space and focus come
 * free. 3D flip is skipped for reduced-motion users (instant swap instead).
 *
 * Two things are mode-driven here, and both were bugs before The Catalyst
 * had an analogy slide to expose them:
 *
 * 1. Palette. This card was the last component still painting literal forest
 *    and gold shades, so on the rally deck it rendered a green card with gold
 *    type on an ink-blue ground. Every colour now reads a semantic alias. The
 *    UPC values are unchanged by construction — [data-mode='upc'] maps
 *    --bg-raised to forest-900 and --fg to cream-100, which is exactly what
 *    was hardcoded. The one deliberate shift is the "tap to flip back" hint on
 *    the inverted face, previously forest-600 and now --bg at 70%; it is a
 *    decorative hint, and the alternative was a per-mode token for one word.
 *
 * 2. Size. The card was a fixed 26rem tall with 16px body copy — phone-sized
 *    type on a 1920 projector, which is the "needs bigger letters" complaint
 *    in its purest form. UPC keeps those shipped metrics (raising type across
 *    13 deployed modules is its own change with its own sign-off); The
 *    Catalyst gets a larger card and the --text-stage-min readability floor.
 */
export default function AnalogyCard({
  title,
  front,
  back,
  mode,
  image,
  className = '',
}: AnalogyCardProps) {
  const [flipped, setFlipped] = useState(false);
  const reduce = useReducedMotion();
  const upc = mode === 'upc';

  const size = upc
    ? {
        card: 'h-[26rem] max-w-xl',
        pad: 'p-8',
        eyebrow: 'text-xs',
        title: 'text-[clamp(1.6rem,2.6vw,2.4rem)]',
        front: 'text-base',
        back: 'text-[clamp(1.2rem,1.9vw,1.7rem)]',
        hint: 'text-sm',
      }
    : {
        card: 'h-[min(64vh,36rem)] max-w-4xl',
        pad: 'p-[clamp(1.75rem,2.5vw,2.75rem)]',
        eyebrow: 'text-[length:var(--text-eyebrow)]',
        title: 'text-[clamp(2.25rem,3.6vw,3.5rem)]',
        front: 'text-[length:var(--text-stage-min)]',
        back: 'text-[length:var(--text-stage-min)]',
        hint: 'text-[length:var(--text-meta)]',
      };

  const face =
    'absolute inset-0 flex flex-col overflow-hidden rounded-2xl [backface-visibility:hidden]';

  return (
    <button
      type="button"
      aria-pressed={flipped}
      onClick={() => setFlipped((f) => !f)}
      className={`group relative block w-full cursor-pointer text-left [perspective:1600px] focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)] ${size.card} ${className}`}
    >
      <span
        className="relative block h-full w-full [transform-style:preserve-3d]"
        style={{
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transition: reduce ? 'none' : 'transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        {/* front */}
        <span
          className={`${face} bg-[var(--bg-raised)] text-[var(--fg)] shadow-2xl shadow-[color:var(--shadow)]/60`}
        >
          <span
            aria-hidden
            className="block h-1/2 w-full bg-cover bg-center"
            style={{
              backgroundImage: image ? `url(${image})` : 'var(--ambient-a), var(--glow)',
            }}
          />
          <span className={`flex flex-1 flex-col justify-end ${size.pad}`}>
            <span
              className={`font-sans font-bold uppercase tracking-[0.25em] text-[var(--accent)] ${size.eyebrow}`}
            >
              Analogy
            </span>
            <span
              className={`mt-2 font-display font-medium leading-tight [text-wrap:balance] ${size.title}`}
            >
              {title}
            </span>
            <span className={`mt-3 font-sans leading-snug opacity-80 ${size.front}`}>{front}</span>
            <span
              className={`mt-4 font-sans text-[var(--accent-soft)] opacity-80 transition-opacity group-hover:opacity-100 ${size.hint}`}
            >
              Tap to flip →
            </span>
          </span>
        </span>
        {/* back — the faces invert, so --fg becomes the ground and --bg the ink */}
        <span
          className={`${face} justify-center bg-[var(--fg)] text-[var(--bg)] shadow-2xl shadow-[color:var(--shadow)]/60 [transform:rotateY(180deg)] ${size.pad}`}
        >
          <span
            className={`font-sans font-bold uppercase tracking-[0.25em] opacity-70 ${size.eyebrow}`}
          >
            The point
          </span>
          <span
            className={`mt-4 font-display leading-snug [text-wrap:balance] ${size.back}`}
          >
            {back}
          </span>
          <span className={`mt-6 font-sans text-[var(--bg)]/70 ${size.hint}`}>
            ← Tap to flip back
          </span>
        </span>
      </span>
    </button>
  );
}
