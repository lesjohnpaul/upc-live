import Link from 'next/link';

export const metadata = {
  title: 'Live Demo — UPC Live',
  description:
    'Explore the UPC Live audience-response platform with mock data. No real seminar records are shown.',
};

const surfaces = [
  {
    href: '/demo/stage',
    label: 'The Stage',
    blurb:
      'The projector view. Animated slides, a flip-card analogy, count-up stats, and live activity results that fill in as answers arrive.',
    cta: 'Open the stage →',
  },
  {
    href: '/demo/join',
    label: 'Join on your phone',
    blurb:
      'What a participant sees. Pick a role, then answer the poll, word cloud, quiz, slider and Q&A — the same cards used in the room.',
    cta: 'Join the session →',
  },
  {
    href: '/demo/dashboard',
    label: 'Facilitator dashboard',
    blurb:
      'The control panel. Open and lock activities, triage Q&A, watch responses land in real time, and export a CSV — no password in the demo.',
    cta: 'Open the dashboard →',
  },
];

export default function DemoHome() {
  return (
    <main className="flex min-h-svh flex-col items-center bg-forest-950 px-6 py-16 text-cream-100">
      <header className="max-w-2xl text-center">
        <p className="flex items-center justify-center gap-3 font-sans text-xs font-bold uppercase tracking-[0.32em] text-gold-400">
          <span aria-hidden className="h-px w-10 bg-gold-400/70" />
          Public Demo
          <span aria-hidden className="h-px w-10 bg-gold-400/70" />
        </p>
        <h1 className="mt-6 font-display text-[clamp(2.8rem,8vw,5rem)] font-medium leading-none tracking-tight">
          UPC <span className="italic text-gold-300">Live</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl font-sans text-lg text-cream-100/80">
          A live audience-response platform built for a DepEd prevention-science training. Explore
          all three surfaces below — everything here runs on mock data.
        </p>
      </header>

      <p className="mt-8 flex max-w-xl items-center gap-3 rounded-2xl bg-gold-400/10 px-5 py-3 text-center font-sans text-sm text-cream-100/80 ring-1 ring-gold-400/30">
        <span aria-hidden className="text-lg">🔒</span>
        Sample data only. The demo never connects to the real seminar database — no participant
        record or response from the actual training is shown.
      </p>

      <div className="mt-12 grid w-full max-w-4xl gap-5 sm:grid-cols-3">
        {surfaces.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="group flex flex-col rounded-3xl bg-forest-900 p-7 ring-1 ring-cream-100/10 transition-all hover:ring-gold-400/60 hover:shadow-[0_0_40px_-12px_var(--color-gold-500)]"
          >
            <h2 className="font-display text-2xl font-medium leading-snug">{s.label}</h2>
            <p className="mt-3 flex-1 font-sans text-sm text-cream-100/60">{s.blurb}</p>
            <p className="mt-5 font-sans text-sm font-bold text-gold-400 transition-transform group-hover:translate-x-1">
              {s.cta}
            </p>
          </Link>
        ))}
      </div>

      <p className="mt-10 max-w-xl text-center font-sans text-sm text-cream-100/50">
        Tip: open <span className="text-cream-100/80">Join</span> and{' '}
        <span className="text-cream-100/80">Stage</span> in two tabs — answer on one and watch the
        results move on the other, live.
      </p>

      <nav className="mt-10 font-sans text-sm text-cream-100/60">
        <Link href="/" className="transition-colors hover:text-gold-300">
          ← Back to UPC Live
        </Link>
      </nav>
    </main>
  );
}
