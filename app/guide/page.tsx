import type { Metadata } from 'next';
import type { Role, Slide } from '@/lib/types';
import { ROLES } from '@/lib/types';
import { days } from '@/content';
import { ACTIVITY_META, activityPrompt } from '@/components/live/activityMeta';
import RoleBadge from '@/components/ui/RoleBadge';
import PrintButton from '@/components/guide/PrintButton';

export const metadata: Metadata = {
  title: "Facilitator's Guide — UPC Live",
  description: 'Full review and rehearsal document for the UPC Live Division echo training.',
};

/* ---------- content helpers (all static, generated from content/) ---------- */

const SLIDE_KIND: Record<Slide['kind'], string> = {
  title: 'Title',
  statement: 'Statement',
  stat: 'Stat',
  bullets: 'Bullets',
  image: 'Image',
  analogy: 'Analogy',
  recap: 'Recap',
  activity: 'Activity',
  qr: 'Join QR',
};

function slideText(slide: Slide): string {
  switch (slide.kind) {
    case 'title':
      return slide.title;
    case 'statement':
      return slide.text;
    case 'stat':
      return `${slide.value} — ${slide.label}`;
    case 'bullets':
    case 'recap':
    case 'analogy':
      return slide.title;
    case 'image':
      return slide.caption ?? 'Image';
    case 'activity':
      return `${ACTIVITY_META[slide.activity.kind].label}: ${activityPrompt(slide.activity)}`;
    case 'qr':
      return slide.title ?? 'Scan to join';
  }
}

function firstWords(text: string, n = 14): string {
  const words = text.split(/\s+/);
  return words.length <= n ? text : `${words.slice(0, n).join(' ')}…`;
}

/* ---------- small presentational pieces ---------- */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="font-sans text-xs font-bold uppercase tracking-[0.24em] text-forest-600">
      {children}
    </h4>
  );
}

function TimingChips({ label, items, tone }: { label: string; items: string[]; tone: string }) {
  if (items.length === 0) return null;
  return (
    <div>
      <p className={`font-sans text-xs font-bold uppercase tracking-[0.2em] ${tone}`}>{label}</p>
      <ul className="mt-2 space-y-2">
        {items.map((item) => (
          <li
            key={item}
            className="rounded-xl bg-cream-100 px-4 py-2.5 font-sans text-sm leading-relaxed text-forest-800 ring-1 ring-cream-300"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

const FIVE_E_ORDER = ['engage', 'explore', 'explain', 'apply', 'evaluate'] as const;

function AnswerKey({ activity }: { activity: import('@/lib/types').Activity }) {
  switch (activity.kind) {
    case 'poll':
      return (
        <ol className="mt-3 space-y-1.5">
          {activity.options.map((opt, i) => {
            const isCorrect = activity.correct === i;
            return (
              <li
                key={opt}
                className={`flex gap-2 font-sans text-sm leading-relaxed ${
                  isCorrect ? 'font-bold text-gold-600' : 'text-forest-800'
                }`}
              >
                <span className="w-5 shrink-0 text-forest-500">{String.fromCharCode(65 + i)}.</span>
                <span>
                  {opt}
                  {isCorrect && <span className="ml-2">✓ correct</span>}
                </span>
              </li>
            );
          })}
          {activity.correct === undefined && (
            <li className="font-sans text-sm italic text-forest-600">
              Open poll — no single correct answer; use it as a discussion starter.
            </li>
          )}
        </ol>
      );
    case 'quiz':
      return (
        <ol className="mt-3 space-y-4">
          {activity.questions.map((q, qi) => (
            <li key={q.prompt}>
              <p className="font-sans text-sm font-bold text-forest-900">
                {qi + 1}. {q.prompt}
                {q.seconds ? (
                  <span className="ml-2 font-normal text-forest-600">({q.seconds}s)</span>
                ) : null}
              </p>
              <ul className="mt-1.5 space-y-1">
                {q.options.map((opt, oi) => (
                  <li
                    key={opt}
                    className={`flex gap-2 font-sans text-sm leading-relaxed ${
                      q.correct === oi ? 'font-bold text-gold-600' : 'text-forest-800'
                    }`}
                  >
                    <span className="w-5 shrink-0 text-forest-500">
                      {String.fromCharCode(65 + oi)}.
                    </span>
                    <span>
                      {opt}
                      {q.correct === oi && <span className="ml-2">✓ correct</span>}
                    </span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      );
    case 'dragdrop':
      return (
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          {activity.buckets.map((bucket, bi) => (
            <div key={bucket}>
              <p className="font-sans text-sm font-bold text-forest-900">{bucket}</p>
              <ul className="mt-1.5 list-disc space-y-1 pl-5 font-sans text-sm leading-relaxed text-forest-800">
                {activity.items
                  .filter((item) => item.bucket === bi)
                  .map((item) => (
                    <li key={item.label}>{item.label}</li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      );
    case 'slider':
      return (
        <p className="mt-3 font-sans text-sm text-forest-800">
          Scale {activity.min}–{activity.max}
          {activity.minLabel && activity.maxLabel
            ? ` (${activity.minLabel} → ${activity.maxLabel})`
            : ''}
          . Phase: <strong>{activity.phase}</strong> — paired with the{' '}
          {activity.phase === 'before' ? 'after' : 'before'} slider to show the confidence shift.
        </p>
      );
    case 'wordcloud':
      return (
        <p className="mt-3 font-sans text-sm italic text-forest-600">
          Free-text word cloud{activity.maxWords ? ` — up to ${activity.maxWords} words each` : ''};
          no answer key.
        </p>
      );
    case 'qna':
      return (
        <p className="mt-3 font-sans text-sm italic text-forest-600">
          Open Q&A wall — triage questions from the dashboard; no answer key.
        </p>
      );
  }
}

/* ---------- page ---------- */

export default function GuidePage() {
  return (
    <div className="guide-root bg-cream-50 text-forest-950">
      {/* black-on-white, no shadows when printed */}
      <style>{`@media print {
        body { background: #fff !important; }
        .guide-root, .guide-root * { color: #000 !important; box-shadow: none !important; background: transparent !important; }
      }`}</style>

      {/* sticky mini-nav (desktop) */}
      <nav
        aria-label="Modules"
        className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-1.5 xl:flex print:hidden"
      >
        {days.map((day) =>
          day.modules.map((mod) => (
            <a
              key={mod.id}
              href={`#${mod.id}`}
              title={mod.title}
              className="flex size-9 items-center justify-center rounded-full bg-cream-100 font-sans text-xs font-bold text-forest-700 ring-1 ring-cream-300 transition-colors hover:bg-gold-400/20 hover:text-gold-600 hover:ring-gold-400/50"
            >
              {day.day}.{mod.number}
            </a>
          )),
        )}
      </nav>

      <main className="mx-auto w-full max-w-4xl px-6 py-14 print:max-w-none print:py-0">
        {/* header */}
        <header>
          <p className="font-sans text-xs font-bold uppercase tracking-[0.28em] text-gold-600">
            UPC Live · Facilitator&apos;s Guide
          </p>
          <h1 className="mt-3 font-display text-[clamp(2.2rem,5vw,3.6rem)] font-medium leading-tight">
            Facilitator&apos;s Guide — UPC Live Division Echo Training
          </h1>
          <p className="mt-4 font-sans text-lg font-bold text-forest-800">
            Presenter: Jessica C. Oliver
          </p>
          <dl className="mt-6 space-y-1.5 font-sans text-forest-800">
            {days.map((day) => (
              <div key={day.course} className="flex gap-3">
                <dt className="font-bold text-forest-600">Day {day.day}</dt>
                <dd>
                  {day.courseTitle}{' '}
                  <span className="text-forest-600">
                    ({day.course.toUpperCase()} · {day.modules.length} modules)
                  </span>
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-6">
            <PrintButton />
          </div>
        </header>

        {/* table of contents */}
        <section aria-label="Table of contents" className="mt-12 rounded-2xl bg-cream-100 p-6 ring-1 ring-cream-300 print:rounded-none print:p-0 print:ring-0">
          <h2 className="font-sans text-sm font-bold uppercase tracking-[0.24em] text-forest-600">
            Contents
          </h2>
          {days.map((day) => (
            <div key={day.course} className="mt-4">
              <p className="font-sans text-sm font-bold text-gold-600">
                Day {day.day} — {day.courseTitle}
              </p>
              <ol className="mt-2 space-y-1">
                {day.modules.map((mod) => (
                  <li key={mod.id}>
                    <a
                      href={`#${mod.id}`}
                      className="font-sans text-forest-800 underline decoration-cream-400 underline-offset-4 transition-colors hover:text-gold-600 hover:decoration-gold-400"
                    >
                      Module {mod.number} · {mod.title}
                      <span className="ml-2 text-sm text-forest-600">{mod.minutes} min</span>
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </section>

        {/* modules */}
        {days.map((day) =>
          day.modules.map((mod) => {
            const analogySlide = mod.slides.find(
              (s): s is Extract<Slide, { kind: 'analogy' }> => s.kind === 'analogy',
            );
            const analogy = mod.analogy ?? analogySlide;
            const activities = mod.slides.flatMap((s) =>
              s.kind === 'activity' ? [s.activity] : [],
            );
            return (
              <article
                key={mod.id}
                id={mod.id}
                className="mt-16 scroll-mt-8 border-t border-cream-300 pt-12 print:break-before-page print:border-t-0 print:pt-8"
              >
                {/* module header */}
                <header>
                  <p className="font-sans text-xs font-bold uppercase tracking-[0.28em] text-gold-600">
                    Day {day.day} · Module {mod.number} · {mod.minutes} minutes
                  </p>
                  <h2 className="mt-2 font-display text-[clamp(1.7rem,3.5vw,2.5rem)] font-medium leading-tight">
                    {mod.title}
                  </h2>
                  <p className="mt-2 font-sans text-lg italic text-forest-700">{mod.tagline}</p>
                </header>

                {/* central analogy */}
                {analogy && (
                  <section className="mt-8 rounded-2xl bg-gold-400/10 p-6 ring-1 ring-gold-400/40">
                    <SectionLabel>Central analogy</SectionLabel>
                    <h3 className="mt-2 font-display text-2xl font-medium text-forest-900">
                      {analogy.title}
                    </h3>
                    <p className="mt-3 font-sans leading-relaxed text-forest-800">
                      <span className="font-bold text-gold-600">Front — </span>
                      {analogy.front}
                    </p>
                    <p className="mt-2 font-sans leading-relaxed text-forest-800">
                      <span className="font-bold text-gold-600">Back — </span>
                      {analogy.back}
                    </p>
                  </section>
                )}

                {/* slide map */}
                <section className="mt-8">
                  <SectionLabel>Slide map</SectionLabel>
                  <ol className="mt-3 space-y-2.5">
                    {mod.slides.map((slide, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="w-6 shrink-0 pt-0.5 text-right font-sans text-sm font-bold text-forest-500">
                          {i + 1}
                        </span>
                        <div className="min-w-0">
                          <p className="font-sans leading-snug text-forest-900">
                            <span className="mr-2 inline-block rounded-md bg-forest-100 px-2 py-0.5 align-middle font-sans text-xs font-bold uppercase tracking-wide text-forest-700">
                              {SLIDE_KIND[slide.kind]}
                            </span>
                            {firstWords(slideText(slide))}
                          </p>
                          {slide.note && (
                            <p className="mt-1 font-sans text-sm italic leading-relaxed text-forest-600">
                              {slide.note}
                            </p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ol>
                </section>

                {/* timing */}
                <section className="mt-8">
                  <SectionLabel>Timing — compressing the full manual</SectionLabel>
                  <div className="mt-3 space-y-5">
                    <TimingChips label="Hide" items={mod.notes.timing.hide} tone="text-clay-600" />
                    <TimingChips
                      label="Summarize"
                      items={mod.notes.timing.summarize}
                      tone="text-spruce-600"
                    />
                    <TimingChips
                      label="Emphasize"
                      items={mod.notes.timing.emphasize}
                      tone="text-gold-600"
                    />
                  </div>
                </section>

                {/* the 5Es */}
                <section className="mt-8">
                  <SectionLabel>The 5Es</SectionLabel>
                  <div className="mt-3 space-y-5">
                    {FIVE_E_ORDER.map((e) => (
                      <div key={e} className="border-l-2 border-gold-400 pl-4">
                        <h4 className="font-sans text-sm font-bold uppercase tracking-[0.2em] text-gold-600">
                          {e}
                        </h4>
                        <p className="mt-1.5 font-sans leading-relaxed text-forest-800">
                          {mod.notes.fiveEs[e]}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* role examples */}
                <section className="mt-8">
                  <SectionLabel>Role examples</SectionLabel>
                  <div className="mt-3 grid gap-4 sm:grid-cols-2">
                    {(Object.keys(ROLES) as Role[]).map((role) => (
                      <div
                        key={role}
                        className="rounded-2xl bg-cream-100 p-5 ring-1 ring-cream-300"
                      >
                        <RoleBadge role={role} />
                        <p className="mt-3 font-sans text-sm leading-relaxed text-forest-800">
                          {mod.notes.examples[role]}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* policy alignment */}
                <section className="mt-8">
                  <SectionLabel>Policy alignment</SectionLabel>
                  <ul className="mt-3 space-y-4">
                    {mod.notes.policyAlignment.map((p) => (
                      <li key={p.order}>
                        <p className="font-sans font-bold text-forest-900">{p.order}</p>
                        <p className="mt-1 font-sans text-sm leading-relaxed text-forest-800">
                          {p.connection}
                        </p>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* processing questions */}
                <section className="mt-8">
                  <SectionLabel>Processing questions</SectionLabel>
                  <ol className="mt-3 list-decimal space-y-2 pl-6 font-sans leading-relaxed text-forest-800">
                    {mod.notes.processingQuestions.map((q) => (
                      <li key={q}>{q}</li>
                    ))}
                  </ol>
                </section>

                {/* activities + answer keys */}
                {activities.length > 0 && (
                  <section className="mt-8">
                    <SectionLabel>Activities &amp; answer keys</SectionLabel>
                    <div className="mt-3 space-y-4">
                      {activities.map((activity) => (
                        <div
                          key={activity.id}
                          className="rounded-2xl border-2 border-dashed border-gold-400/60 bg-cream-100/60 p-5"
                        >
                          <p className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-gold-600">
                            {ACTIVITY_META[activity.kind].icon} {ACTIVITY_META[activity.kind].label}{' '}
                            · Answer key
                            <span className="ml-2 normal-case tracking-normal text-forest-500">
                              {activity.id}
                            </span>
                          </p>
                          <p className="mt-2 font-sans font-bold text-forest-900">
                            {activityPrompt(activity)}
                          </p>
                          <AnswerKey activity={activity} />
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </article>
            );
          }),
        )}

        <footer className="mt-16 border-t border-cream-300 pt-8 pb-4 font-sans text-sm text-forest-600 print:hidden">
          Generated from the UPC Live content files — always in sync with the slides on stage.
        </footer>
      </main>
    </div>
  );
}
