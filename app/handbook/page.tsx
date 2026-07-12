import type { Metadata } from 'next';
import Link from 'next/link';
import { days } from '@/content';
import PrintButton from '@/components/guide/PrintButton';

export const metadata: Metadata = {
  title: "User's Handbook — UPC Live",
  description: 'How to operate UPC Live on training day.',
};

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-block rounded-md border border-cream-400 bg-cream-100 px-2 py-0.5 font-sans text-[0.85em] font-bold text-forest-800 shadow-[0_1px_0_var(--color-cream-400)]">
      {children}
    </kbd>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-12 print:break-inside-avoid">
      <h2 className="font-display text-[clamp(1.5rem,3vw,2.1rem)] font-medium text-forest-900">
        {title}
      </h2>
      <div className="mt-4 space-y-4 font-sans leading-relaxed text-forest-800">{children}</div>
    </section>
  );
}

export default function HandbookPage() {
  return (
    <div className="handbook-root bg-cream-50 text-forest-950">
      <style>{`@media print {
        body { background: #fff !important; }
        .handbook-root, .handbook-root * { color: #000 !important; box-shadow: none !important; background: transparent !important; }
      }`}</style>

      <main className="mx-auto w-full max-w-3xl px-6 py-14 print:max-w-none print:py-0">
        <header>
          <p className="font-sans text-xs font-bold uppercase tracking-[0.28em] text-gold-600">
            UPC Live · User&apos;s Handbook
          </p>
          <h1 className="mt-3 font-display text-[clamp(2.2rem,5vw,3.4rem)] font-medium leading-tight">
            Running UPC Live on training day
          </h1>
          <p className="mt-4 font-sans text-lg text-forest-700">
            A practical operator&apos;s manual for the presenter and the tech buddy. Keep this open
            on a phone or print it.
          </p>
          <div className="mt-6">
            <PrintButton />
          </div>
        </header>

        <Section title="The four screens">
          <ul className="space-y-3">
            <li>
              <strong>Stage</strong> —{' '}
              <Link href="/stage/UPC1" className="text-gold-600 underline underline-offset-4">
                /stage/UPC1
              </Link>{' '}
              (Day 2 uses <span className="font-bold">/stage/UPC2</span>). The projected slides.
              Only the laptop connected to the projector opens this, fullscreen.
            </li>
            <li>
              <strong>Join</strong> —{' '}
              <Link href="/join/UPC1" className="text-gold-600 underline underline-offset-4">
                /join/UPC1
              </Link>
              . What participants get when they scan the QR code on the stage. Their phones — you
              never open it yourself except to test.
            </li>
            <li>
              <strong>Dashboard</strong> —{' '}
              <Link href="/dashboard/UPC1" className="text-gold-600 underline underline-offset-4">
                /dashboard/UPC1
              </Link>
              . The control panel: open, lock, and reset activities; triage Q&amp;A; export the
              CSV. Runs on a second device — the tech buddy&apos;s laptop or a phone.
            </li>
            <li>
              <strong>Facilitator&apos;s Guide</strong> —{' '}
              <Link href="/guide" className="text-gold-600 underline underline-offset-4">
                /guide
              </Link>
              . The full rehearsal document with notes, timing, and answer keys. Read it before,
              print it, keep the paper copy at the podium.
            </li>
          </ul>
          <p>
            All four read the same session code (<span className="font-bold">UPC1</span> on Day 1,{' '}
            <span className="font-bold">UPC2</span> on Day 2), so they stay in sync automatically —
            no pairing step.
          </p>
        </Section>

        <Section title="Before the training day">
          <ul className="list-none space-y-2.5">
            {[
              <>
                Open the dashboard and the stage side by side; click <strong>Open</strong> on one
                activity and confirm it appears on the stage.
              </>,
              <>
                Scan the stage QR code with your own phone, join, and send one test answer. Then
                <strong> Reset</strong> that activity from the dashboard.
              </>,
              <>Print the Facilitator&apos;s Guide (or save it as PDF on a tablet).</>,
              <>Charge the laptop fully and bring the charger — a dead stage is a dead session.</>,
              <>
                Offline fallback plan: know which activities you would run verbally (see “When the
                internet drops” below), and bring the printed guide — it has every answer key.
              </>,
            ].map((item, i) => (
              <li key={i} className="flex gap-3">
                <span
                  aria-hidden
                  className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-md border-2 border-forest-400 font-sans text-xs"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Driving the stage">
          <p>
            Next / previous slide: <Kbd>→</Kbd> <Kbd>←</Kbd> <Kbd>Space</Kbd> <Kbd>PageDown</Kbd>{' '}
            <Kbd>PageUp</Kbd> — a presentation clicker sends PageUp/PageDown, so clickers just
            work.
          </p>
          <p>
            Presenter notes overlay: <Kbd>N</Kbd> toggles it, <Kbd>Esc</Kbd> closes it. It shows
            the current slide&apos;s note — participants only see the projected slide.
          </p>
          <p>
            No keyboard handy? Click the <strong>left or right edge</strong> of the screen (outer
            20%) to go back or forward.
          </p>
          <p>
            The URL hash tracks your position (e.g. <span className="font-mono text-sm">#m2-s5</span>).
            If the browser crashes or you hit refresh, the stage reopens on the exact same slide —
            nothing is lost.
          </p>
        </Section>

        <Section title="Running live activities">
          <ul className="list-disc space-y-2.5 pl-5">
            <li>
              The tech buddy drives the dashboard: <strong>Open</strong> an activity when the
              presenter reaches its slide, <strong>Lock</strong> it when answers should stop,{' '}
              <strong>Reset</strong> to wipe its answers for a re-run.
            </li>
            <li>
              Results appear on the stage <strong>automatically</strong> — no refresh, no clicking
              on the stage. Only one activity is open at a time; opening one locks the previous.
            </li>
            <li>
              Poll results on stage have a <strong>By role</strong> toggle — use it to show how
              head teachers voted versus nurses, counselors, and admin officers.
            </li>
            <li>
              Q&amp;A: questions land in the dashboard&apos;s <strong>Q&amp;A Triage</strong> list.
              Mark each <strong>Answered ✓</strong> as the presenter handles it; it stays visible
              but crossed out.
            </li>
            <li>
              <strong>Reset session</strong> (Danger Zone) wipes <em>everything</em> — all answers
              and the participant list. Every phone must re-scan the QR code. Use it only between
              rehearsal and the real run.
            </li>
          </ul>
        </Section>

        <Section title="When the internet drops">
          <ul className="list-disc space-y-2.5 pl-5">
            <li>
              <strong>Slides always work.</strong> Navigation, notes, analogy cards — none of it
              needs the network. Keep presenting.
            </li>
            <li>
              Live activity slides show a <strong>reconnecting</strong> state. Do not restart
              anything — just run the activity verbally: read the prompt, take hands, use the
              printed answer key.
            </li>
            <li>
              Answers phones already sent are <strong>safe on the server</strong> — nothing is
              lost.
            </li>
            <li>
              Phones and the stage <strong>reconnect automatically</strong> when the network
              returns; results catch up on their own.
            </li>
          </ul>
        </Section>

        <Section title="Run of show">
          {days.map((day) => (
            <div key={day.course} className="print:break-inside-avoid">
              <h3 className="mt-2 font-sans text-sm font-bold uppercase tracking-[0.2em] text-gold-600">
                Day {day.day} · {day.course.toUpperCase()} — {day.courseTitle}
              </h3>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full min-w-[560px] border-collapse font-sans text-sm">
                  <thead>
                    <tr className="border-b-2 border-cream-300 text-left text-forest-600">
                      <th className="py-2 pr-3 font-bold">Module</th>
                      <th className="py-2 pr-3 font-bold">Min</th>
                      <th className="py-2 font-bold">Activities, in order</th>
                    </tr>
                  </thead>
                  <tbody>
                    {day.modules.map((mod) => {
                      const ids = mod.slides.flatMap((s) =>
                        s.kind === 'activity' ? [s.activity.id] : [],
                      );
                      return (
                        <tr key={mod.id} className="border-b border-cream-200 align-top">
                          <td className="py-2.5 pr-3">
                            <span className="font-bold">M{mod.number}</span> · {mod.title}
                          </td>
                          <td className="py-2.5 pr-3 whitespace-nowrap">{mod.minutes}</td>
                          <td className="py-2.5 font-mono text-xs leading-relaxed text-forest-700">
                            {ids.length > 0 ? ids.join(' → ') : '—'}
                          </td>
                        </tr>
                      );
                    })}
                    <tr className="text-forest-600">
                      <td className="py-2.5 pr-3 font-bold">Total</td>
                      <td className="py-2.5 pr-3">
                        {day.modules.reduce((sum, m) => sum + m.minutes, 0)}
                      </td>
                      <td className="py-2.5" />
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </Section>

        <Section title="Exporting evidence">
          <p>
            After each day, click <strong>Export CSV</strong> in the dashboard header. It downloads
            every response — activity id, participant role, nickname, answer, and timestamp — ready
            for the post-training report and attendance evidence. Export <em>before</em> you use
            Reset session, or the data is gone.
          </p>
        </Section>

        <footer className="mt-16 border-t border-cream-300 pt-8 pb-4 font-sans text-sm text-forest-600 print:hidden">
          Pair this with the{' '}
          <Link href="/guide" className="text-gold-600 underline underline-offset-4">
            Facilitator&apos;s Guide
          </Link>{' '}
          — this page is how to drive; the guide is what to say.
        </footer>
      </main>
    </div>
  );
}
