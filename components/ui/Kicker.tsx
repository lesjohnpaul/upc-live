'use client';

type KickerProps = {
  children: React.ReactNode;
  className?: string;
};

/** Small-caps eyebrow label with a gold rule — announces what's coming. */
export default function Kicker({ children, className = '' }: KickerProps) {
  return (
    <p
      className={`flex items-center gap-3 font-sans text-[clamp(0.8rem,1.1vw,1.15rem)] font-bold uppercase tracking-[0.28em] text-gold-400 ${className}`}
    >
      <span aria-hidden className="h-px w-8 bg-gold-400/70" />
      {children}
      <span aria-hidden className="h-px w-8 bg-gold-400/70" />
    </p>
  );
}
