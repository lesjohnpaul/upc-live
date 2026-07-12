'use client';

/** "23/40 answered" — live answered-vs-joined counter under every result. */
export default function AnswerCount({
  answered,
  total,
  label = 'answered',
}: {
  answered: number;
  total: number;
  label?: string;
}) {
  return (
    <p className="font-sans text-[clamp(0.95rem,1.3vw,1.2rem)] text-cream-100/60">
      <span className="font-bold text-gold-300">{answered}</span>/{total} {label}
    </p>
  );
}
