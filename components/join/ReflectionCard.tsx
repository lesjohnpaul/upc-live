'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { ReflectionActivity, Role } from '@/lib/types';
import { composeLetter, type Answer } from '@/lib/letter';
import { SendStatus, useResponse } from './useResponse';

type Props = {
  activity: ReflectionActivity;
  sessionId: string;
  participantId: string;
  role: Role;
  tick: number;
};

/**
 * Ten reflection questions → a letter composed from the answers, signed by
 * Jessy, saveable as a PNG and shareable to the native share sheet.
 *
 * No scores, no timers, no wrong answers — this is the send-off gift, not an
 * assessment. Same weak-wifi armor as QuizCard: nothing renders and no answer
 * is accepted until hydration `settled`, so a reload mid-quiz cannot clobber
 * the stored row with a fresh `{answers: []}`.
 */
export default function ReflectionCard({
  activity,
  sessionId,
  participantId,
  role,
  tick,
}: Props) {
  const { remote, settled, state, send, retry } = useResponse(
    sessionId,
    participantId,
    activity.id,
    tick,
  );
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [firstName, setFirstName] = useState('');
  const [started, setStarted] = useState(false);
  const [opened, setOpened] = useState(false);
  const touched = useRef(false);
  const total = activity.questions.length;
  const current = answers.length;
  const question = current < total ? activity.questions[current] : null;
  const done = current >= total && firstName.trim() !== '';

  // hydrate from a previous device/reload — never over local edits
  useEffect(() => {
    if (touched.current || !remote) return;
    const a = remote.answers;
    if (Array.isArray(a)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-shot hydration
      setAnswers(a.slice(0, total) as Answer[]);
      setStarted(true);
    }
    if (typeof remote.firstName === 'string') setFirstName(remote.firstName);
  }, [remote, total]);

  const record = (value: Answer, forIndex: number) => {
    touched.current = true;
    setAnswers((prev) => {
      if (prev.length !== forIndex || prev.length >= total) return prev;
      const next = [...prev, value];
      send({ answers: next, firstName });
      return next;
    });
  };

  const saveName = (name: string) => {
    touched.current = true;
    setFirstName(name);
    send({ answers, firstName: name });
  };

  if (!settled) {
    return (
      <div className="flex flex-col items-center gap-5 py-10 text-center">
        <p className="animate-breathe font-display text-4xl" aria-hidden>
          ✉️
        </p>
        <p role="status" className="font-sans text-sm font-bold text-forest-600">
          Loading…
        </p>
      </div>
    );
  }

  if (done) {
    return (
      <LetterView
        letter={composeLetter({ activity, answers, firstName, role })}
        activityId={activity.id}
        participantId={participantId}
        opened={opened}
        onOpen={() => setOpened(true)}
        state={state}
        retry={retry}
      />
    );
  }

  // all questions answered, name still missing → the modal
  if (!question) {
    return <NameGate onSubmit={saveName} />;
  }

  if (!started) {
    return (
      <div className="flex flex-col items-center gap-6 py-8 text-center">
        <p className="font-display text-5xl" aria-hidden>
          ✉️
        </p>
        <h2 className="font-display text-3xl font-medium leading-snug">{activity.title}</h2>
        {activity.intro && (
          <p className="font-sans text-base leading-relaxed text-forest-700">{activity.intro}</p>
        )}
        <button
          type="button"
          onClick={() => setStarted(true)}
          className="min-h-14 w-full rounded-full bg-forest-700 px-6 font-sans text-lg font-bold text-cream-50"
        >
          Start
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h2 className="font-sans text-sm font-bold uppercase tracking-wider text-forest-600">
          {activity.title}
        </h2>
        <span className="font-sans text-sm font-bold tabular-nums text-forest-500">
          {current + 1} / {total}
        </span>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-cream-200">
        <motion.div
          className="h-full rounded-full bg-gold-500"
          initial={false}
          animate={{ width: `${(current / total) * 100}%` }}
          transition={{ type: 'spring', stiffness: 220, damping: 30 }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.22 }}
          className="flex flex-col gap-5"
        >
          <h3 className="font-display text-2xl font-medium leading-snug">{question.prompt}</h3>

          {question.kind === 'choice' ? (
            <div className="flex flex-col gap-3">
              {question.options.map((opt, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => record(i, current)}
                  className="min-h-14 rounded-2xl bg-cream-100 px-5 py-3 text-left font-sans text-base font-bold text-forest-900 ring-1 ring-cream-300 transition-colors active:bg-cream-200"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          ) : (
            <FreeText
              placeholder={question.placeholder}
              maxLength={question.maxLength ?? 180}
              onSubmit={(text) => record(text, current)}
            />
          )}
        </motion.div>
      </AnimatePresence>

      <SendStatus state={state} retry={retry} sentLabel="Saved ✓" />
    </div>
  );
}

function FreeText({
  placeholder,
  maxLength,
  onSubmit,
}: {
  placeholder?: string;
  maxLength: number;
  onSubmit: (text: string) => void;
}) {
  const [text, setText] = useState('');
  return (
    <div className="flex flex-col gap-3">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        maxLength={maxLength}
        rows={4}
        placeholder={placeholder}
        className="rounded-2xl bg-cream-100 p-5 font-sans text-base leading-relaxed text-forest-950 ring-1 ring-cream-300 placeholder:text-cream-500 focus:outline-none focus:ring-2 focus:ring-gold-500"
      />
      <p className="text-right font-sans text-xs text-forest-500">
        {text.length} / {maxLength}
      </p>
      <button
        type="button"
        onClick={() => onSubmit(text.trim())}
        disabled={text.trim().length < 3}
        className="min-h-14 rounded-full bg-forest-700 px-6 font-sans text-lg font-bold text-cream-50 disabled:opacity-40"
      >
        That’s my sentence
      </button>
    </div>
  );
}

/** Nickname is not good enough for something they will frame — ask properly. */
function NameGate({ onSubmit }: { onSubmit: (name: string) => void }) {
  const [name, setName] = useState('');
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-6 py-8 text-center"
    >
      <p className="font-display text-5xl" aria-hidden>
        🖋️
      </p>
      <h2 className="font-display text-3xl font-medium leading-snug">
        Before I write your letter…
      </h2>
      <p className="font-sans text-base leading-relaxed text-forest-700">
        What is your <strong>first name</strong>? I want to address this to you properly, not to a
        nickname.
      </p>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        maxLength={24}
        autoComplete="given-name"
        placeholder="Your first name"
        className="min-h-14 rounded-2xl bg-cream-100 px-5 text-center font-sans text-lg font-bold text-forest-950 ring-1 ring-cream-300 placeholder:font-normal placeholder:text-cream-500 focus:outline-none focus:ring-2 focus:ring-gold-500"
      />
      <button
        type="button"
        onClick={() => onSubmit(name.trim())}
        disabled={name.trim().length < 2}
        className="min-h-14 rounded-full bg-forest-700 px-6 font-sans text-lg font-bold text-cream-50 disabled:opacity-40"
      >
        Write my letter
      </button>
    </motion.div>
  );
}

function LetterView({
  letter,
  activityId,
  participantId,
  opened,
  onOpen,
  state,
  retry,
}: {
  letter: ReturnType<typeof composeLetter>;
  activityId: string;
  participantId: string;
  opened: boolean;
  onOpen: () => void;
  state: Parameters<typeof SendStatus>[0]['state'];
  retry: () => void;
}) {
  const [writing, setWriting] = useState(false);

  const open = () => {
    setWriting(true);
    // ponytail: the pause is the point — a letter that appears instantly reads
    // as a lookup table; one that takes a beat reads as written
    setTimeout(onOpen, 1800);
  };

  if (!opened) {
    return (
      <div className="flex flex-col items-center gap-6 py-10 text-center">
        <motion.p
          className="font-display text-7xl"
          aria-hidden
          animate={writing ? { rotate: [0, -6, 6, -4, 0] } : { y: [0, -8, 0] }}
          transition={
            writing
              ? { duration: 0.6, repeat: Infinity }
              : { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }
          }
        >
          {writing ? '🖋️' : '✉️'}
        </motion.p>
        {writing ? (
          <p role="status" className="font-display text-2xl font-medium text-forest-800">
            Jessy is writing your letter…
          </p>
        ) : (
          <>
            <h2 className="font-display text-3xl font-medium leading-snug">
              There is a letter here for you.
            </h2>
            <button
              type="button"
              onClick={open}
              className="min-h-14 w-full rounded-full bg-forest-700 px-6 font-sans text-lg font-bold text-cream-50"
            >
              Open it
            </button>
          </>
        )}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-5 py-4"
    >
      <article className="flex flex-col gap-4 rounded-3xl bg-cream-100 p-6 shadow-lg ring-1 ring-cream-300">
        <div className="flex flex-col items-center gap-1">
          <p className="font-sans text-xs font-bold uppercase tracking-[0.28em] text-gold-600">
            {letter.archetypeTitle}
          </p>
          <p className="font-display text-lg font-medium text-forest-600">{letter.traits}</p>
        </div>

        <p className="font-display text-2xl font-medium text-forest-950">{letter.greeting}</p>

        {letter.paragraphs.map((p, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 + i * 0.28, duration: 0.5 }}
            className="font-sans text-base leading-relaxed text-forest-800"
          >
            {p}
          </motion.p>
        ))}

        {letter.quote && (
          <motion.blockquote
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 + letter.paragraphs.length * 0.28, duration: 0.6 }}
            className="my-1 border-l-4 border-gold-400 pl-4"
          >
            <p className="font-sans text-sm font-bold text-forest-600">
              You wrote this, to a student who will never read it:
            </p>
            <p className="mt-2 font-display text-xl font-medium italic leading-snug text-forest-900">
              “{letter.quote}”
            </p>
          </motion.blockquote>
        )}

        {letter.closing.map((c, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 + letter.paragraphs.length * 0.28 + i * 0.2, duration: 0.5 }}
            className="font-display text-xl font-medium leading-snug text-forest-950"
          >
            {c}
          </motion.p>
        ))}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 + letter.paragraphs.length * 0.28, duration: 0.8 }}
          className="mt-2 border-t border-cream-300 pt-4"
        >
          <p className="font-hand text-5xl leading-none text-forest-800">{letter.signature}</p>
          <p className="mt-2 font-sans text-xs text-forest-500">{letter.signatureSub}</p>
        </motion.div>
      </article>

      <LetterActions
        activityId={activityId}
        participantId={participantId}
        name={letter.greeting}
      />
      <SendStatus state={state} retry={retry} sentLabel="Saved ✓" />
    </motion.div>
  );
}

/**
 * Save / share the letter as a PNG. The image is rendered server-side from the
 * stored answers (app/api/letter), so what they share is always the real letter
 * — not a screenshot of whatever the phone happened to have laid out.
 */
function LetterActions({
  activityId,
  participantId,
  name,
}: {
  activityId: string;
  participantId: string;
  name: string;
}) {
  const [busy, setBusy] = useState<'save' | 'share' | null>(null);
  const [failed, setFailed] = useState(false);

  const png = async (): Promise<File> => {
    const res = await fetch(`/api/letter?a=${activityId}&p=${participantId}`);
    if (!res.ok) throw new Error('render failed');
    const blob = await res.blob();
    return new File([blob], 'my-upc-letter.png', { type: 'image/png' });
  };

  const save = async () => {
    setBusy('save');
    setFailed(false);
    try {
      const file = await png();
      const url = URL.createObjectURL(file);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      setFailed(true);
    }
    setBusy(null);
  };

  const share = async () => {
    setBusy('share');
    setFailed(false);
    try {
      const file = await png();
      // canShare({files}) is the only reliable capability check — Android
      // Chrome exposes navigator.share but rejects file payloads
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: `${name} my UPC letter` });
      } else {
        await save();
      }
    } catch (e) {
      // user dismissing the share sheet is not an error
      if (!(e instanceof DOMException && e.name === 'AbortError')) setFailed(true);
    }
    setBusy(null);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => void save()}
          disabled={busy !== null}
          className="min-h-14 flex-1 rounded-full bg-forest-700 px-4 font-sans text-base font-bold text-cream-50 disabled:opacity-40"
        >
          {busy === 'save' ? 'Saving…' : 'Save as image'}
        </button>
        <button
          type="button"
          onClick={() => void share()}
          disabled={busy !== null}
          className="min-h-14 flex-1 rounded-full bg-gold-500 px-4 font-sans text-base font-bold text-forest-950 disabled:opacity-40"
        >
          {busy === 'share' ? 'Sharing…' : 'Share'}
        </button>
      </div>
      {failed && (
        <p className="text-center font-sans text-sm font-bold text-clay-600">
          Couldn’t make the image. The signal may be weak, so please try again.
        </p>
      )}
      <p className="text-center font-sans text-xs text-forest-500">
        Your letter is yours. Keep it somewhere you will see it on a hard day.
      </p>
    </div>
  );
}
