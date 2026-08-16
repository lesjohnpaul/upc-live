'use client';

import type { Slide, StageMode } from '@/lib/types';
import SlideShell from '@/components/ui/SlideShell';
import StatBlock from '@/components/ui/StatBlock';

export default function StatSlide({
  slide,
  mode,
}: {
  slide: Extract<Slide, { kind: 'stat' }>;
  mode: StageMode;
}) {
  return (
    <SlideShell mode={mode}>
      <StatBlock
        value={slide.value}
        label={slide.label}
        context={slide.context}
        source={slide.source}
      />
    </SlideShell>
  );
}
