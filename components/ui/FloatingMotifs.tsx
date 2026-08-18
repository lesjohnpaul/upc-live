'use client';

import { createContext, useContext } from 'react';
import type { StageMode } from '@/lib/types';

/**
 * Which slide is on screen, so the motif layer can change as the deck advances.
 * A context rather than a prop because SlideShell sits under eleven different
 * slide components and not one of them has any business knowing about this.
 */
export const SlideSeedContext = createContext(0);

/**
 * Motif plates in /public/catalyst/motifs. Generated for rally mode against a
 * pure black ground, which is what lets `mix-blend-mode: screen` drop the
 * background — so these are plain JPEGs with no alpha channel, ~380KB for the
 * whole set instead of ~30MB of transparent PNGs.
 *
 * Each one is drawn from the deck's own material rather than being generic
 * decoration: the payong is Part 4's central analogy, rain is risk, vapor is
 * Part 5, the lattice is the catalyst itself, the ember is the finale, the
 * bottle is Part 2's sari-sari shelf, the neuron is Part 3's reward pathway.
 */
const MOTIFS = ['payong', 'rain', 'vapor', 'molecule', 'ember', 'bottle', 'neuron'] as const;

/**
 * Four berths in the margins, outside the centre column where every slide's
 * copy sits. Each bleeds off its own edge so the motif reads as atmosphere
 * behind the slide rather than as a picture competing with the words —
 * readability outranks decoration, and on this deck that is not a close call.
 */
const SLOTS = [
  { left: '-7%', top: '2%', size: 22, dur: 31, delay: '0s', rot: -9, lift: '-2.4vh' },
  { left: '81%', top: '6%', size: 18, dur: 37, delay: '-8s', rot: 11, lift: '2.1vh' },
  { left: '-4%', top: '57%', size: 17, dur: 34, delay: '-15s', rot: 7, lift: '2.6vh' },
  { left: '85%', top: '61%', size: 20, dur: 29, delay: '-22s', rot: -13, lift: '-2.2vh' },
];

/**
 * The ambient layer behind a Catalyst slide. Rally only: UPC keeps the palette
 * it shipped with, and the single calm slide ("Addiction is a health condition")
 * is the one beat in the hour that deliberately stops shouting — floating
 * decoration there would work against the only thing that slide is for.
 */
export default function FloatingMotifs({ mode }: { mode: StageMode }) {
  const seed = useContext(SlideSeedContext);

  if (mode !== 'rally') return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {SLOTS.map((slot, i) => (
        <span
          key={i}
          className="catalyst-motif absolute block bg-contain bg-center bg-no-repeat"
          style={{
            left: slot.left,
            top: slot.top,
            width: `${slot.size}vw`,
            height: `${slot.size}vw`,
            // Coprime-ish stride so consecutive slides never repeat a layout.
            backgroundImage: `url(/catalyst/motifs/${MOTIFS[(seed * 3 + i * 2) % MOTIFS.length]}.jpg)`,
            animationDuration: `${slot.dur}s`,
            animationDelay: slot.delay,
            ['--motif-rot' as string]: `${slot.rot}deg`,
            ['--motif-lift' as string]: slot.lift,
          }}
        />
      ))}
    </div>
  );
}
