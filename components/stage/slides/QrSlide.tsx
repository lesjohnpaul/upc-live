'use client';

import { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import type { Slide } from '@/lib/types';
import SlideShell from '@/components/ui/SlideShell';
import Kicker from '@/components/ui/Kicker';

export default function QrSlide({
  slide,
  code,
}: {
  slide: Extract<Slide, { kind: 'qr' }>;
  code: string;
}) {
  /* resolved on the client to avoid SSR/env mismatch */
  const [joinUrl, setJoinUrl] = useState<string | null>(null);
  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_BASE_URL || window.location.origin;
    setJoinUrl(`${base.replace(/\/$/, '')}/join/${code}`);
  }, [code]);

  return (
    <SlideShell>
      <Kicker>Session {code}</Kicker>
      {slide.title && (
        <h2 className="mt-6 text-center font-display text-[clamp(2rem,4vw,3.75rem)] font-medium tracking-tight [text-wrap:balance]">
          {slide.title}
        </h2>
      )}
      <div className="mt-10 rounded-3xl bg-cream-50 p-[3vmin] shadow-2xl shadow-forest-950/60">
        {joinUrl && (
          <QRCodeSVG
            value={joinUrl}
            className="size-[min(40vh,40vw)]"
            bgColor="transparent"
            fgColor="oklch(0.185 0.032 165)"
            level="M"
          />
        )}
      </div>
      {joinUrl && (
        <p className="mt-8 font-sans text-[clamp(1.3rem,2.4vw,2.4rem)] font-bold tracking-wide text-gold-300">
          {joinUrl.replace(/^https?:\/\//, '')}
        </p>
      )}
      <p className="mt-3 font-sans text-[clamp(0.95rem,1.4vw,1.3rem)] opacity-70">
        I-scan ang QR code o i-type ang link sa inyong phone
      </p>
    </SlideShell>
  );
}
