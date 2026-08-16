'use client';

type KickerProps = {
  children: React.ReactNode;
  className?: string;
};

/** Small-caps eyebrow label with a ruled accent — announces what's coming.
 *  Size comes from --text-eyebrow so a mode can raise it without forking the
 *  component: UPC keeps the 18.4px it shipped with (its poll slides already
 *  run 995px against a 907px safe box), The Catalyst gets the stage floor. */
export default function Kicker({ children, className = '' }: KickerProps) {
  return (
    <p
      className={`flex items-center gap-3 font-sans text-[length:var(--text-eyebrow)] font-bold uppercase tracking-[0.28em] text-[var(--accent)] ${className}`}
    >
      <span aria-hidden className="h-px w-8 bg-[var(--accent)]/70" />
      {children}
      <span aria-hidden className="h-px w-8 bg-[var(--accent)]/70" />
    </p>
  );
}
