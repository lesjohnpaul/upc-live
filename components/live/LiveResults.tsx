'use client';

import { useState } from 'react';
import type { Activity, DragDropActivity, ReflectionActivity } from '@/lib/types';
import PollResults from './PollResults';
import WordCloudLive from './WordCloudLive';
import QuizLeaderboardLive from './QuizLeaderboardLive';
import ConfidenceShiftLive, { SliderAverageLive } from './ConfidenceShiftLive';
import QnAWall from './QnAWall';
import FeedbackLive from './FeedbackLive';
import ToleranceLive from './ToleranceLive';
import PlanWallLive from './PlanWallLive';
import PledgeWallLive from './PledgeWallLive';
import { useLiveResponses } from './useLiveResponses';
import AnswerCount from './AnswerCount';

/** Presenter-only toggle: answers stay hidden until the room has committed. */
function RevealButton({
  reveal,
  onToggle,
  showLabel,
  hideLabel,
}: {
  reveal: boolean;
  onToggle: () => void;
  showLabel: string;
  hideLabel: string;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={reveal}
      className="mt-5 rounded-full bg-[var(--accent)]/15 px-5 py-2 font-sans text-sm font-bold text-[var(--accent-soft)] ring-1 ring-[var(--accent)]/40 transition-colors hover:bg-[var(--accent)]/25"
    >
      {reveal ? hideLabel : showLabel}
    </button>
  );
}

function DragDropLive({
  activity,
  sessionId,
  reveal,
}: {
  activity: DragDropActivity;
  sessionId: string;
  reveal: boolean;
}) {
  const { rows, participantCount } = useLiveResponses(sessionId, activity.id);

  if (!reveal) {
    return (
      <div className="flex flex-col items-center gap-4 py-10 text-center">
        <span aria-hidden className="text-[clamp(2.5rem,5vw,4rem)]">🧩</span>
        <p className="font-sans text-[clamp(1.1rem,1.8vw,1.6rem)] text-[var(--fg)]/70">
          Participants are still sorting…
        </p>
        <AnswerCount answered={rows.length} total={participantCount} />
      </div>
    );
  }

  // % of submitted sorts that put each item in its correct bucket
  const correctCount = activity.items.map(
    (item, i) =>
      rows.filter((r) => {
        const p = (r.payload as { placements?: unknown } | null)?.placements;
        return Array.isArray(p) && p[i] === item.bucket;
      }).length,
  );

  return (
    <div className="w-full max-w-5xl">
      <div
        className={`grid grid-cols-2 gap-4 ${
          activity.buckets.length > 2 ? 'lg:grid-cols-4' : 'mx-auto max-w-3xl'
        }`}
      >
        {activity.buckets.map((bucket, b) => (
          <div
            key={b}
            className="flex flex-col gap-2.5 rounded-xl bg-[var(--bg-raised)]/70 p-4 ring-1 ring-[var(--fg)]/10"
          >
            <span className="font-sans text-[clamp(0.8rem,1.2vw,1.1rem)] font-bold uppercase tracking-wider text-[var(--accent-soft)]">
              {bucket}
            </span>
            {activity.items.map((item, i) =>
              item.bucket === b ? (
                <div
                  key={i}
                  className="flex items-baseline justify-between gap-2 rounded-lg bg-[var(--fg)]/5 px-3 py-2"
                >
                  <span className="font-sans text-[clamp(0.9rem,1.4vw,1.25rem)] font-bold text-[var(--fg)]">
                    {item.label}
                  </span>
                  {rows.length > 0 && (
                    <span className="shrink-0 font-sans text-[clamp(0.75rem,1.1vw,1rem)] tabular-nums text-[var(--fg)]/60">
                      {Math.round((correctCount[i] / rows.length) * 100)}%
                    </span>
                  )}
                </div>
              ) : null,
            )}
          </div>
        ))}
      </div>
      {rows.length > 0 && (
        <p className="mt-4 text-center font-sans text-[clamp(0.85rem,1.3vw,1.1rem)] text-[var(--fg)]/50">
          % = how many of the room sorted it right
        </p>
      )}
    </div>
  );
}

/**
 * The reflection answers are private — they are the raw material of a personal
 * letter, not poll data. The stage shows only how many letters have been
 * written, never what anybody said.
 */
function LetterCountLive({
  activity,
  sessionId,
}: {
  activity: ReflectionActivity;
  sessionId: string;
}) {
  const { rows, participantCount } = useLiveResponses(sessionId, activity.id);
  const written = rows.filter((r) => {
    const p = r.payload as { firstName?: string } | null;
    return typeof p?.firstName === 'string' && p.firstName.trim() !== '';
  }).length;

  return (
    <div className="flex flex-col items-center gap-6 py-10 text-center">
      <span aria-hidden className="text-[clamp(3rem,7vw,6rem)]">✉️</span>
      <p className="font-display text-[clamp(2.5rem,6vw,5rem)] font-medium leading-none text-[var(--fg)]">
        {written} {written === 1 ? 'letter' : 'letters'} written
      </p>
      <p className="max-w-[28ch] font-sans text-[clamp(1.1rem,1.8vw,1.6rem)] text-[var(--fg)]/70">
        Their answers stay private. Each letter is theirs alone.
      </p>
      <AnswerCount answered={rows.length} total={participantCount} label="started" />
    </div>
  );
}

/** Dispatches the open activity to its live result renderer. */
export default function LiveResults({
  activity,
  sessionId,
}: {
  activity: Activity;
  sessionId: string;
}) {
  const [reveal, setReveal] = useState(false);

  switch (activity.kind) {
    case 'poll':
      return (
        <>
          <PollResults activity={activity} sessionId={sessionId} reveal={reveal} />
          {activity.correct !== undefined && (
            <RevealButton
              reveal={reveal}
              onToggle={() => setReveal((r) => !r)}
              showLabel="Show correct answer"
              hideLabel="Hide answer"
            />
          )}
        </>
      );
    case 'wordcloud':
      return <WordCloudLive activity={activity} sessionId={sessionId} />;
    case 'quiz':
      return (
        <>
          <QuizLeaderboardLive activity={activity} sessionId={sessionId} reveal={reveal} />
          <RevealButton
            reveal={reveal}
            onToggle={() => setReveal((r) => !r)}
            showLabel="Show answers"
            hideLabel="Show leaderboard"
          />
        </>
      );
    case 'slider':
      return activity.phase === 'before' ? (
        <SliderAverageLive activity={activity} sessionId={sessionId} />
      ) : (
        <ConfidenceShiftLive activity={activity} sessionId={sessionId} />
      );
    case 'qna':
      return <QnAWall activity={activity} sessionId={sessionId} />;
    case 'tolerance':
      return <ToleranceLive activity={activity} sessionId={sessionId} />;
    case 'feedback':
      return <FeedbackLive activity={activity} sessionId={sessionId} />;
    case 'dragdrop':
      return (
        <>
          <DragDropLive activity={activity} sessionId={sessionId} reveal={reveal} />
          <RevealButton
            reveal={reveal}
            onToggle={() => setReveal((r) => !r)}
            showLabel="Show answers"
            hideLabel="Hide answers"
          />
        </>
      );
    case 'reflection':
      return <LetterCountLive activity={activity} sessionId={sessionId} />;
    case 'plan':
      return <PlanWallLive activity={activity} sessionId={sessionId} />;
    case 'pledge':
      return <PledgeWallLive activity={activity} sessionId={sessionId} />;
  }
}
