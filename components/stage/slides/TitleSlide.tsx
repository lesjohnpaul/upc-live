'use client';

import type { Slide, StageMode } from '@/lib/types';
import SlideShell from '@/components/ui/SlideShell';
import Kicker from '@/components/ui/Kicker';

export default function TitleSlide({
  slide,
  mode,
}: {
  slide: Extract<Slide, { kind: 'title' }>;
  mode: StageMode;
}) {
  return (
    <SlideShell mode={mode} dim={slide.image}>
      {slide.kicker && <Kicker>{slide.kicker}</Kicker>}
      <h1 className="mt-8 max-w-[16ch] text-center font-display text-statement font-medium tracking-tight [text-wrap:balance]">
        {slide.title}
      </h1>
      {slide.subtitle && (
        <p className="mt-8 max-w-[52ch] text-center font-sans text-[clamp(1.1rem,1.8vw,1.8rem)] leading-relaxed opacity-75 [text-wrap:balance]">
          {slide.subtitle}
        </p>
      )}
    </SlideShell>
  );
}
