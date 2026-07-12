import Link from 'next/link';
import { days } from '@/content';
import StageDeck from '@/components/stage/StageDeck';

export const metadata = { title: 'Stage — UPC Live' };

export default async function StagePage({ params }: { params: Promise<{ code: string }> }) {
  const { code: raw } = await params;
  const code = raw.toUpperCase();
  const day = days.find((d) => d.course.toUpperCase() === code);

  if (!day) {
    return (
      <main className="flex min-h-svh flex-col items-center justify-center bg-forest-950 px-8 text-center text-cream-100">
        <p className="font-sans text-xs font-bold uppercase tracking-[0.28em] text-gold-400">
          UPC Live
        </p>
        <h1 className="mt-6 font-display text-[clamp(2rem,4vw,3.5rem)] font-medium">
          Session &ldquo;{raw}&rdquo; not found
        </h1>
        <p className="mt-4 max-w-md font-sans opacity-70">
          Check the session code. Available sessions are UPC1 (Day 1) and UPC2 (Day 2).
        </p>
        <Link
          href="/stage"
          className="mt-8 rounded-full bg-gold-400/15 px-6 py-3 font-sans font-bold text-gold-300 ring-1 ring-gold-400/40"
        >
          Choose a session
        </Link>
      </main>
    );
  }

  return <StageDeck code={code} modules={day.modules} />;
}
