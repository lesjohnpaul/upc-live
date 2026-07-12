'use client';

type SlideShellProps = {
  children: React.ReactNode;
  /** light variant for join/guide contexts; dark is the stage default */
  variant?: 'dark' | 'light';
  /** optional background image URL, rendered dimmed under a gradient scrim */
  dim?: string;
  className?: string;
};

/**
 * Full-viewport stage canvas. Deep forest, a faint lamplight glow from the
 * top, content centered with generous safe padding for projector overscan.
 */
export default function SlideShell({
  children,
  variant = 'dark',
  dim,
  className = '',
}: SlideShellProps) {
  const dark = variant === 'dark';
  return (
    <section
      className={`relative flex min-h-svh w-full flex-col items-center justify-center overflow-hidden px-[6vw] py-[8vh] ${
        dark ? 'bg-forest-950 text-cream-100' : 'bg-cream-50 text-forest-950'
      } ${className}`}
    >
      {/* lamplight glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: dark
            ? 'radial-gradient(90rem 55rem at 50% -18%, oklch(0.30 0.05 160 / 0.85), transparent 62%)'
            : 'radial-gradient(90rem 55rem at 50% -18%, oklch(0.94 0.025 146 / 0.9), transparent 62%)',
        }}
      />
      {dim && (
        <>
          <div
            aria-hidden
            className="absolute inset-0 bg-cover bg-center opacity-40"
            style={{ backgroundImage: `url(${dim})` }}
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background: dark
                ? 'linear-gradient(to top, oklch(0.185 0.032 165 / 0.95), oklch(0.185 0.032 165 / 0.55))'
                : 'linear-gradient(to top, oklch(0.982 0.008 95 / 0.95), oklch(0.982 0.008 95 / 0.55))',
            }}
          />
        </>
      )}
      <div className="relative z-10 flex w-full max-w-[92rem] flex-col items-center">
        {children}
      </div>
    </section>
  );
}
