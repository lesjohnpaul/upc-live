'use client';

import type { Slide } from '@/lib/types';
import SlideShell from '@/components/ui/SlideShell';

export default function ImageSlide({ slide }: { slide: Extract<Slide, { kind: 'image' }> }) {
  /* ponytail: accept either a URL or a raw CSS gradient as the image value */
  const isGradient = slide.image.includes('gradient(');
  return (
    <SlideShell>
      <figure className="flex w-full max-w-5xl flex-col items-center">
        <div
          className="aspect-video w-full rounded-2xl bg-cover bg-center shadow-2xl shadow-forest-950/60"
          style={{ backgroundImage: isGradient ? slide.image : `url(${slide.image})` }}
          role="img"
          aria-label={slide.caption ?? 'Slide image'}
        />
        {slide.caption && (
          <figcaption className="mt-6 max-w-[56ch] text-center font-sans text-[clamp(1rem,1.5vw,1.4rem)] opacity-75 [text-wrap:balance]">
            {slide.caption}
          </figcaption>
        )}
      </figure>
    </SlideShell>
  );
}
