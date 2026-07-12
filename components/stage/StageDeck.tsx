'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { Module } from '@/lib/types';
import ProgressRail from '@/components/ui/ProgressRail';
import SlideView from './slides/SlideView';
import PresenterOverlay from './PresenterOverlay';

type FlatSlide = { m: number; s: number };

const variants = {
  enter: (dir: number) => ({ x: dir * 48, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir * -48, opacity: 0 }),
};

export default function StageDeck({ code, modules }: { code: string; modules: Module[] }) {
  const reduce = useReducedMotion();
  const flat = useMemo<FlatSlide[]>(
    () => modules.flatMap((mod, m) => mod.slides.map((_, s) => ({ m, s }))),
    [modules],
  );
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [overlayOpen, setOverlayOpen] = useState(false);

  // restore position from URL hash (#m0-s3) on mount
  useEffect(() => {
    const match = window.location.hash.match(/^#m(\d+)-s(\d+)$/);
    if (!match) return;
    const i = flat.findIndex((f) => f.m === Number(match[1]) && f.s === Number(match[2]));
    if (i >= 0) setIndex(i);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // write position to URL hash on change
  useEffect(() => {
    const pos = flat[index];
    if (pos) window.history.replaceState(null, '', `#m${pos.m}-s${pos.s}`);
  }, [index, flat]);

  const go = useCallback(
    (delta: number) => {
      setDir(delta > 0 ? 1 : -1);
      setIndex((i) => Math.min(Math.max(i + delta, 0), flat.length - 1));
    },
    [flat.length],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'n' || e.key === 'N') {
        setOverlayOpen((o) => !o);
        return;
      }
      if (e.key === 'Escape') {
        setOverlayOpen(false);
        return;
      }
      // let Space/Enter activate focused buttons (e.g. analogy card flip)
      if (e.key === ' ' && e.target instanceof HTMLElement && e.target.closest('button')) return;
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        go(1);
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        go(-1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go]);

  if (flat.length === 0) {
    return (
      <main className="flex min-h-svh flex-col items-center justify-center bg-forest-950 px-8 text-center text-cream-100">
        <p className="font-display text-[clamp(1.8rem,3.5vw,3rem)] font-medium">
          Wala pang laman ang session na ito.
        </p>
        <p className="mt-4 font-sans opacity-70">Session {code}</p>
      </main>
    );
  }

  const pos = flat[index];
  const mod = modules[pos.m];
  const slide = mod.slides[pos.s];

  return (
    <main className="relative h-svh w-full overflow-hidden bg-forest-950 text-cream-100">
      <AnimatePresence initial={false} custom={dir}>
        <motion.div
          key={index}
          custom={dir}
          variants={variants}
          initial={reduce ? false : 'enter'}
          animate="center"
          exit="exit"
          transition={{ duration: reduce ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <SlideView slide={slide} code={code} />
        </motion.div>
      </AnimatePresence>

      {/* click zones: left/right 20% edges */}
      <div
        aria-hidden
        onClick={() => go(-1)}
        className="absolute inset-y-0 left-0 z-30 w-[20%] cursor-w-resize"
      />
      <div
        aria-hidden
        onClick={() => go(1)}
        className="absolute inset-y-0 right-0 z-30 w-[20%] cursor-e-resize"
      />

      <ProgressRail
        groups={modules.map((m) => ({
          label: m.number > 0 ? `M${m.number}` : m.id.toUpperCase(),
          slides: m.slides.length,
        }))}
        current={index}
      />

      {overlayOpen && (
        <PresenterOverlay
          module={mod}
          moduleIndex={pos.m}
          moduleCount={modules.length}
          slideIndex={pos.s}
          slideCount={mod.slides.length}
          code={code}
          note={slide.note}
          onClose={() => setOverlayOpen(false)}
        />
      )}
    </main>
  );
}
