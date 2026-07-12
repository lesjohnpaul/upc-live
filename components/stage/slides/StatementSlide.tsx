'use client';

import type { Slide } from '@/lib/types';
import SlideShell from '@/components/ui/SlideShell';
import BigStatement from '@/components/ui/BigStatement';

export default function StatementSlide({ slide }: { slide: Extract<Slide, { kind: 'statement' }> }) {
  return (
    <SlideShell dim={slide.image}>
      <BigStatement attribution={slide.attribution}>{slide.text}</BigStatement>
    </SlideShell>
  );
}
