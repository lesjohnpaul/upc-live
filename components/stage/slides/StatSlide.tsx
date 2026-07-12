'use client';

import type { Slide } from '@/lib/types';
import SlideShell from '@/components/ui/SlideShell';
import StatBlock from '@/components/ui/StatBlock';

export default function StatSlide({ slide }: { slide: Extract<Slide, { kind: 'stat' }> }) {
  return (
    <SlideShell>
      <StatBlock
        value={slide.value}
        label={slide.label}
        context={slide.context}
        source={slide.source}
      />
    </SlideShell>
  );
}
