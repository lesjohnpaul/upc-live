'use client';

import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { useJoinUrl } from '@/lib/joinUrl';

/**
 * Full-screen join-QR rescue overlay for latecomers. Toggled with `q` or the
 * QR pill on activity slides; Esc (handled by the deck) or any click closes.
 */
export default function QrOverlay({ code, onClose }: { code: string; onClose: () => void }) {
  const reduce = useReducedMotion();
  const joinUrl = useJoinUrl(code);
  const ref = useRef<HTMLButtonElement>(null);

  // steal focus so the pill that opened us can't re-trigger on Space,
  // and so nothing inside a removed subtree holds focus after close
  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <motion.button
      ref={ref}
      type="button"
      aria-label="Join QR code — press Escape or click anywhere to close"
      onClick={onClose}
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex cursor-pointer flex-col items-center justify-center bg-forest-950/85 backdrop-blur-sm outline-none"
    >
      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center rounded-3xl bg-cream-50 p-[4vmin] shadow-2xl shadow-forest-950"
      >
        {joinUrl && (
          <>
            <QRCodeSVG
              value={joinUrl}
              className="size-[min(55vh,55vw)]"
              bgColor="transparent"
              fgColor="oklch(0.185 0.032 165)"
              level="M"
            />
            <p className="mt-6 font-sans text-[clamp(1.2rem,2.2vw,2.2rem)] font-bold tracking-wide text-forest-900">
              {joinUrl.replace(/^https?:\/\//, '')}
            </p>
          </>
        )}
      </motion.div>
      <p className="mt-6 font-sans text-[clamp(0.9rem,1.3vw,1.2rem)] text-cream-100/70">
        Press Esc or click anywhere to close
      </p>
    </motion.button>
  );
}
