import Link from 'next/link';
import { days } from '@/content';

export const metadata = { title: 'Choose a session — UPC Live' };

export default function StageChooserPage() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center bg-forest-950 px-8 text-cream-100">
      <p className="font-sans text-xs font-bold uppercase tracking-[0.28em] text-gold-400">
        UPC Live · Stage
      </p>
      <h1 className="mt-6 font-display text-[clamp(2rem,4vw,3.5rem)] font-medium">
        Choose a session
      </h1>
      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        {days.map((day) => (
          <Link
            key={day.course}
            href={`/stage/${day.course.toUpperCase()}`}
            className="rounded-2xl bg-forest-900 px-8 py-6 ring-1 ring-cream-100/10 transition-colors hover:ring-gold-400/50"
          >
            <span className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-gold-300">
              Day {day.day} · {day.course.toUpperCase()}
            </span>
            <span className="mt-2 block max-w-xs font-display text-xl font-medium">
              {day.courseTitle}
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
