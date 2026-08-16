'use client';

import { QRCodeSVG } from 'qrcode.react';
import { useJoinUrl } from '@/lib/joinUrl';

/** Rice-paper QR card + the typeable join URL under it. Renders nothing until
 *  the origin is known (the join URL is derived client-side). */
export default function JoinQr({
  code,
  /** any Tailwind size utility — the stage slide and the QR slide want different scales */
  size = 'size-[min(40vh,40vw)]',
}: {
  code: string;
  size?: string;
}) {
  const joinUrl = useJoinUrl(code);
  if (!joinUrl) return null;

  return (
    <div className="flex flex-col items-center">
      {/* ponytail: the QR plate stays a light card with dark modules in every
          mode — that is a scanner requirement, not a palette choice */}
      <div className="rounded-3xl bg-cream-50 p-[3vmin] shadow-2xl shadow-[color:var(--shadow)]/60">
        <QRCodeSVG
          value={joinUrl}
          className={size}
          bgColor="transparent"
          fgColor="oklch(0.185 0.032 165)"
          level="M"
        />
      </div>
      <p className="mt-6 font-sans text-[clamp(1.1rem,2vw,2rem)] font-bold tracking-wide text-[var(--accent-soft)]">
        {joinUrl.replace(/^https?:\/\//, '')}
      </p>
    </div>
  );
}
