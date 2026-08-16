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
    /* size via --text-meta: this label sat below --text-stage-min, the token
       that exists to be a floor. UPC keeps its shipped metric; Catalyst gets
       the floor. */
    <p className="font-sans text-[length:var(--text-meta)] text-[var(--fg)]/60">
      <span className="font-bold text-[var(--accent-soft)]">{answered}</span>/{total} {label}
    </p>
  );
}
