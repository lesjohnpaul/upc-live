'use client';

import type { Slide, StageMode } from '@/lib/types';
import SlideShell from '@/components/ui/SlideShell';
import Kicker from '@/components/ui/Kicker';
import RecapCard from '@/components/ui/RecapCard';

export default function RecapSlide({
  slide,
  mode,
}: {
  slide: Extract<Slide, { kind: 'recap' }>;
  mode: StageMode;
}) {
  return (
    <SlideShell mode={mode}>
      <div className="w-full max-w-3xl">
        <Kicker className="justify-start">Bago tayo magpatuloy</Kicker>
        <RecapCard className="mt-8" title={slide.title} points={slide.points} />
      </div>
    </SlideShell>
  );
}
