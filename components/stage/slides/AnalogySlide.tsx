'use client';

import type { Slide } from '@/lib/types';
import SlideShell from '@/components/ui/SlideShell';
import AnalogyCard from '@/components/ui/AnalogyCard';

export default function AnalogySlide({ slide }: { slide: Extract<Slide, { kind: 'analogy' }> }) {
  return (
    <SlideShell>
      <AnalogyCard title={slide.title} front={slide.front} back={slide.back} image={slide.image} />
    </SlideShell>
  );
}
