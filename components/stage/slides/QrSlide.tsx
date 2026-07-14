'use client';

import type { Slide } from '@/lib/types';
import SlideShell from '@/components/ui/SlideShell';
import Kicker from '@/components/ui/Kicker';
import JoinQr from '@/components/ui/JoinQr';

export default function QrSlide({
  slide,
  code,
}: {
  slide: Extract<Slide, { kind: 'qr' }>;
  code: string;
}) {
  return (
    <SlideShell>
      <Kicker>Session {code}</Kicker>
      {slide.title && (
        <h2 className="mt-6 text-center font-display text-[clamp(2rem,4vw,3.75rem)] font-medium tracking-tight [text-wrap:balance]">
          {slide.title}
        </h2>
      )}
      <div className="mt-10">
        <JoinQr code={code} />
      </div>
      <p className="mt-3 font-sans text-[clamp(0.95rem,1.4vw,1.3rem)] opacity-70">
        Scan the QR code or type the link on your phone
      </p>
    </SlideShell>
  );
}
