'use client';

import { useState } from 'react';
import type { Activity, DragDropActivity } from '@/lib/types';
import PollResults from './PollResults';
import WordCloudLive from './WordCloudLive';
import QuizLeaderboardLive from './QuizLeaderboardLive';
import ConfidenceShiftLive, { SliderAverageLive } from './ConfidenceShiftLive';
import QnAWall from './QnAWall';
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
        Nagbubukod pa ang mga kalahok…
      </p>
      <AnswerCount answered={rows.length} total={participantCount} />
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
              {reveal ? 'Itago ang sagot' : 'Ipakita ang tamang sagot'}
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
    case 'dragdrop':
      return <DragDropLive activity={activity} sessionId={sessionId} />;
  }
}
