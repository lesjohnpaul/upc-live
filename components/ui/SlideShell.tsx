'use client';

import type { StageMode } from '@/lib/types';
import FloatingMotifs from './FloatingMotifs';

type SlideShellProps = {
  children: React.ReactNode;
  /** design mode for this slide — remaps every semantic alias in the subtree */
  mode: StageMode;
  /** optional background image URL, rendered dimmed under a gradient scrim */
  dim?: string;
  className?: string;
};

/**
 * Full-viewport stage canvas. The mode's ground, a faint glow from the top,
 * content centered with generous safe padding for projector overscan.
 * Nothing here names a palette shade — `data-mode` decides what the ground,
 * the glow and the image scrim are made of.
 */
export default function SlideShell({ children, mode, dim, className = '' }: SlideShellProps) {
  return (
    <section
      data-mode={mode}
      className={`relative flex min-h-svh w-full flex-col items-center justify-center overflow-hidden bg-[var(--bg)] px-[6vw] py-[8vh] text-[var(--fg)] ${className}`}
    >
      {/* glow from above the top edge */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: 'var(--glow)' }}
      />
      {dim && (
        <>
          <div
            aria-hidden
            className="absolute inset-0 bg-cover bg-center opacity-40"
            style={{ backgroundImage: `url(${dim})` }}
          />
          <div aria-hidden className="absolute inset-0" style={{ background: 'var(--scrim)' }} />
        </>
      )}
      {/* ambient motif layer — above the ground and the image scrim, below the copy */}
      <FloatingMotifs mode={mode} />
      <div className="relative z-10 flex w-full max-w-[92rem] flex-col items-center">
        {children}
      </div>
    </section>
  );
}
