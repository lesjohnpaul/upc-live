import Link from 'next/link';
import { days } from '@/content';

export default function Home() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center bg-forest-950 px-6 py-16 text-cream-100">
      {/* wordmark */}
      <header className="text-center">
        <p className="flex items-center justify-center gap-3 font-sans text-xs font-bold uppercase tracking-[0.32em] text-gold-400">
          <span aria-hidden className="h-px w-10 bg-gold-400/70" />
          DepEd Division Echo Training
          <span aria-hidden className="h-px w-10 bg-gold-400/70" />
        </p>
        <h1 className="mt-6 font-display text-[clamp(3.5rem,10vw,7rem)] font-medium leading-none tracking-tight">
          UPC <span className="italic text-gold-300">Live</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl font-sans text-lg text-cream-100/80">
          Universal Prevention Curriculum — Division Echo Training
        </p>
        <p className="mt-2 font-sans text-sm font-bold uppercase tracking-[0.2em] text-cream-100/60">
          Presented by Jessica C. Oliver
        </p>
      </header>

      {/* day cards */}
      <div className="mt-14 grid w-full max-w-3xl gap-5 sm:grid-cols-2">
        {days.map((day) => (
          <Link
            key={day.course}
            href={`/stage/${day.course.toUpperCase()}`}
            className="group rounded-3xl bg-forest-900 p-8 ring-1 ring-cream-100/10 transition-all hover:ring-gold-400/60 hover:shadow-[0_0_40px_-12px_var(--color-gold-500)]"
          >
            <p className="font-sans text-xs font-bold uppercase tracking-[0.24em] text-gold-300">
              Day {day.day} · {day.course.toUpperCase()}
            </p>
            <h2 className="mt-3 font-display text-2xl font-medium leading-snug">
              {day.courseTitle}
            </h2>
            <p className="mt-3 font-sans text-sm text-cream-100/60">
              {day.modules.length} modules ·{' '}
              {Math.round(day.modules.reduce((sum, m) => sum + m.minutes, 0) / 60)} hours
            </p>
            <p className="mt-5 font-sans text-sm font-bold text-gold-400 transition-transform group-hover:translate-x-1">
              Open the stage →
            </p>
          </Link>
        ))}
      </div>

      {/* quieter secondary links */}
      <nav className="mt-12 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 font-sans text-sm text-cream-100/60">
        <Link href="/guide" className="transition-colors hover:text-gold-300">
          Facilitator&apos;s Guide
        </Link>
        <Link href="/handbook" className="transition-colors hover:text-gold-300">
          User&apos;s Handbook
        </Link>
        <span className="flex items-center gap-2">
          Dashboards:
          <Link href="/dashboard/UPC1" className="transition-colors hover:text-gold-300">
            UPC1
          </Link>
          ·
          <Link href="/dashboard/UPC2" className="transition-colors hover:text-gold-300">
            UPC2
          </Link>
        </span>
        <span className="flex items-center gap-2">
          Join:
          <Link href="/join/UPC1" className="transition-colors hover:text-gold-300">
            UPC1
          </Link>
          ·
          <Link href="/join/UPC2" className="transition-colors hover:text-gold-300">
            UPC2
          </Link>
        </span>
      </nav>
    </main>
  );
}
