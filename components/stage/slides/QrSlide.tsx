'use client';

import { QRCodeSVG } from 'qrcode.react';
import type { Slide } from '@/lib/types';
import SlideShell from '@/components/ui/SlideShell';
import Kicker from '@/components/ui/Kicker';
import { useJoinUrl } from '@/lib/joinUrl';

export default function QrSlide({
  slide,
  code,
}: {
  slide: Extract<Slide, { kind: 'qr' }>;
  code: string;
}) {
  const joinUrl = useJoinUrl(code);

  return (
    <SlideShell>
      <Kicker>Session {code}</Kicker>
      {slide.title && (
        <h2 className="mt-6 text-center font-display text-[clamp(2rem,4vw,3.75rem)] font-medium tracking-tight [text-wrap:balance]">
          {slide.title}
        </h2>
      )}
      {joinUrl && (
        <>
          <div className="mt-10 rounded-3xl bg-cream-50 p-[3vmin] shadow-2xl shadow-forest-950/60">
            <QRCodeSVG
              value={joinUrl}
              className="size-[min(40vh,40vw)]"
              bgColor="transparent"
              fgColor="oklch(0.185 0.032 165)"
              level="M"
            />
          </div>
          <p className="mt-8 font-sans text-[clamp(1.3rem,2.4vw,2.4rem)] font-bold tracking-wide text-gold-300">
            {joinUrl.replace(/^https?:\/\//, '')}
          </p>
        </>
      )}
      <p className="mt-3 font-sans text-[clamp(0.95rem,1.4vw,1.3rem)] opacity-70">
        Scan the QR code or type the link on your phone
      </p>
    </SlideShell>
  );
}
