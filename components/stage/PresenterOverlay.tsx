'use client';

import type { FiveEs, Module, Role } from '@/lib/types';
import RoleBadge from '@/components/ui/RoleBadge';

type Props = {
  module: Module;
  moduleIndex: number;
  moduleCount: number;
  slideIndex: number;
  slideCount: number;
  code: string;
  note?: string;
  onClose: () => void;
};

const FIVE_ES: { key: keyof FiveEs; label: string; accent: string }[] = [
  { key: 'engage', label: 'ENGAGE', accent: 'text-gold-300' },
  { key: 'explore', label: 'EXPLORE', accent: 'text-spruce-200' },
  { key: 'explain', label: 'EXPLAIN', accent: 'text-forest-300' },
  { key: 'apply', label: 'APPLY', accent: 'text-clay-200' },
  { key: 'evaluate', label: 'EVALUATE', accent: 'text-cream-300' },
];

function TimingChips({ label, items, tone }: { label: string; items: string[]; tone: string }) {
  if (items.length === 0) return null;
  return (
    <div>
      <p className={`font-sans text-[0.65rem] font-bold uppercase tracking-[0.2em] ${tone}`}>
        {label}
      </p>
      <ul className="mt-1.5 space-y-1.5">
        {items.map((item, i) => (
          <li
            key={i}
            className="rounded-lg bg-cream-100/5 px-3 py-1.5 text-sm leading-snug ring-1 ring-cream-100/10"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Presenter-only notes panel. Only mounted while open — the audience
 * never sees it. Toggled with `n`, closed with Escape (handled by the deck).
 */
export default function PresenterOverlay({
  module: mod,
  moduleIndex,
  moduleCount,
  slideIndex,
  slideCount,
  code,
  note,
  onClose,
}: Props) {
  const { notes } = mod;
  return (
    <aside
      aria-label="Presenter notes"
      className="fixed inset-y-0 right-0 z-40 flex w-full max-w-md flex-col bg-forest-950/95 font-sans text-cream-100 shadow-2xl shadow-forest-950 ring-1 ring-cream-100/15 backdrop-blur-md"
    >
      {/* HUD row */}
      <div className="flex items-center gap-3 border-b border-cream-100/10 px-5 py-3 text-xs font-bold uppercase tracking-[0.15em]">
        <span className="text-gold-300">
          Slide {slideIndex + 1}/{slideCount}
        </span>
        <span className="opacity-60">
          Module {moduleIndex + 1}/{moduleCount}
        </span>
        <span className="opacity-60">{code}</span>
        <button
          type="button"
          onClick={onClose}
          className="ml-auto rounded-md px-2 py-1 text-cream-100/70 ring-1 ring-cream-100/20 hover:text-cream-100"
        >
          Esc ✕
        </button>
      </div>

      <div className="flex-1 space-y-7 overflow-y-auto px-5 py-5">
        {/* current slide note, pinned at top */}
        {note && (
          <div className="rounded-xl bg-gold-400/15 p-4 ring-1 ring-gold-400/40">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-gold-300">
              This slide
            </p>
            <p className="mt-1.5 text-sm leading-relaxed">{note}</p>
          </div>
        )}

        <div>
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-cream-300">
            {mod.title} · {mod.minutes} min
          </p>
        </div>

        {/* timing */}
        <section className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-cream-100/50">
            Timing
          </h3>
          <TimingChips label="Emphasize" items={notes.timing.emphasize} tone="text-gold-300" />
          <TimingChips label="Summarize" items={notes.timing.summarize} tone="text-spruce-200" />
          <TimingChips label="Hide if short" items={notes.timing.hide} tone="text-clay-200" />
        </section>

        {/* 5Es */}
        <section className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-cream-100/50">5Es</h3>
          {FIVE_ES.map(({ key, label, accent }) => (
            <div key={key}>
              <p className={`text-[0.65rem] font-bold uppercase tracking-[0.25em] ${accent}`}>
                {label}
              </p>
              <p className="mt-1 text-sm leading-relaxed opacity-90">{notes.fiveEs[key]}</p>
            </div>
          ))}
        </section>

        {/* role examples */}
        <section className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-cream-100/50">
            Role examples
          </h3>
          {(Object.keys(notes.examples) as Role[]).map((role) => (
            <div key={role}>
              <RoleBadge role={role} className="!min-h-8 !px-3 !text-xs" />
              <p className="mt-1.5 text-sm leading-relaxed opacity-90">{notes.examples[role]}</p>
            </div>
          ))}
        </section>

        {/* policy alignment */}
        <section className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-cream-100/50">
            Policy alignment
          </h3>
          {notes.policyAlignment.map((p, i) => (
            <div key={i} className="rounded-xl bg-cream-100/5 p-3 ring-1 ring-cream-100/10">
              <p className="text-sm font-bold text-gold-300">{p.order}</p>
              <p className="mt-1 text-sm leading-relaxed opacity-90">{p.connection}</p>
            </div>
          ))}
        </section>

        {/* processing questions */}
        <section className="space-y-2 pb-4">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-cream-100/50">
            Processing questions
          </h3>
          <ol className="list-decimal space-y-2 pl-5">
            {notes.processingQuestions.map((q, i) => (
              <li key={i} className="text-sm leading-relaxed opacity-90">
                {q}
              </li>
            ))}
          </ol>
        </section>
      </div>
    </aside>
  );
}
