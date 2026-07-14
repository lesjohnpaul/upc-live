import type { Activity } from '@/lib/types';

/** Kind icon + label, shared by the stage activity slide and the dashboard. */
export const ACTIVITY_META: Record<Activity['kind'], { icon: string; label: string }> = {
  poll: { icon: '📊', label: 'Poll' },
  wordcloud: { icon: '💬', label: 'Word Cloud' },
  slider: { icon: '🎚️', label: 'Slider' },
  dragdrop: { icon: '🧩', label: 'Sorting' },
  quiz: { icon: '⚡', label: 'Quiz' },
  qna: { icon: '❓', label: 'Q&A' },
  feedback: { icon: '⭐', label: 'Feedback' },
  reflection: { icon: '✉️', label: 'Letter' },
};

/** Display prompt for any activity kind (quiz/reflection/feedback use their title). */
export function activityPrompt(activity: Activity): string {
  return activity.kind === 'quiz' ||
    activity.kind === 'reflection' ||
    activity.kind === 'feedback'
    ? activity.title
    : activity.prompt;
}
