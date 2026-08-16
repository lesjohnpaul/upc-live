'use client';

import type { Slide, StageMode } from '@/lib/types';
import SlideShell from '@/components/ui/SlideShell';
import BigStatement from '@/components/ui/BigStatement';

export default function StatementSlide({
  slide,
  mode,
}: {
  slide: Extract<Slide, { kind: 'statement' }>;
  mode: StageMode;
}) {
  return (
    <SlideShell mode={mode} dim={slide.image}>
      <BigStatement attribution={slide.attribution}>{slide.text}</BigStatement>
    </SlideShell>
  );
}
