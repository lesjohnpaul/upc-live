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
import { useLiveResponses } from './useLiveResponses';
import AnswerCount from './AnswerCount';

/* ponytail: no per-item dragdrop visualization yet — just the live answer
   count; add a per-bucket accuracy chart if a module leans on this activity */
function DragDropLive({ activity, sessionId }: { activity: DragDropActivity; sessionId: string }) {
  const { rows, participantCount } = useLiveResponses(sessionId, activity.id);
  return (
    <div className="flex flex-col items-center gap-4 py-10 text-center">
      <span aria-hidden className="text-[clamp(2.5rem,5vw,4rem)]">🧩</span>
      <p className="font-sans text-[clamp(1.1rem,1.8vw,1.6rem)] text-cream-100/70">
        Participants are still sorting…
      </p>
      <AnswerCount answered={rows.length} total={participantCount} />
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
      <p className="font-display text-[clamp(2.5rem,6vw,5rem)] font-medium leading-none text-cream-50">
        {written} {written === 1 ? 'letter' : 'letters'} written
      </p>
      <p className="max-w-[28ch] font-sans text-[clamp(1.1rem,1.8vw,1.6rem)] text-cream-100/70">
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
            <button
              type="button"
              onClick={() => setReveal((r) => !r)}
              aria-pressed={reveal}
              className="mt-5 rounded-full bg-gold-400/15 px-5 py-2 font-sans text-sm font-bold text-gold-300 ring-1 ring-gold-400/40 transition-colors hover:bg-gold-400/25"
            >
              {reveal ? 'Hide answer' : 'Show correct answer'}
            </button>
          )}
        </>
      );
    case 'wordcloud':
      return <WordCloudLive activity={activity} sessionId={sessionId} />;
    case 'quiz':
      return <QuizLeaderboardLive activity={activity} sessionId={sessionId} />;
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
      return <DragDropLive activity={activity} sessionId={sessionId} />;
    case 'reflection':
      return <LetterCountLive activity={activity} sessionId={sessionId} />;
    case 'plan':
      return <PlanWallLive activity={activity} sessionId={sessionId} />;
  }
}
