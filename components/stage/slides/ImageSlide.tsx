'use client';

import type { Slide, StageMode } from '@/lib/types';
import SlideShell from '@/components/ui/SlideShell';

export default function ImageSlide({
  slide,
  mode,
}: {
  slide: Extract<Slide, { kind: 'image' }>;
  mode: StageMode;
}) {
  /* ponytail: accept either a URL or a raw CSS gradient as the image value */
  const isGradient = slide.image.includes('gradient(');
  return (
    <SlideShell mode={mode}>
      <figure className="flex w-full max-w-5xl flex-col items-center">
        <div
          className="aspect-video w-full rounded-2xl bg-cover bg-center shadow-2xl shadow-[color:var(--shadow)]/60"
          style={{ backgroundImage: isGradient ? slide.image : `url(${slide.image})` }}
          role="img"
          aria-label={slide.caption ?? 'Slide image'}
        />
        {slide.caption && (
          <figcaption className="mt-6 max-w-[56ch] text-center font-sans text-[length:var(--text-caption)] leading-snug opacity-[var(--dim-sub)] [text-wrap:balance]">
            {slide.caption}
          </figcaption>
        )}
      </figure>
    </SlideShell>
  );
}
