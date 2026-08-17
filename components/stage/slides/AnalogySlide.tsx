'use client';

import type { Slide, StageMode } from '@/lib/types';
import SlideShell from '@/components/ui/SlideShell';
import AnalogyCard from '@/components/ui/AnalogyCard';

export default function AnalogySlide({
  slide,
  mode,
}: {
  slide: Extract<Slide, { kind: 'analogy' }>;
  mode: StageMode;
}) {
  return (
    <SlideShell mode={mode}>
      <AnalogyCard
        title={slide.title}
        front={slide.front}
        back={slide.back}
        image={slide.image}
        mode={mode}
      />
    </SlideShell>
  );
}
