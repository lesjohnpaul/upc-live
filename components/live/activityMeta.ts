import type { Activity } from '@/lib/types';

/** Kind icon + label, shared by the stage activity slide and the dashboard. */
export const ACTIVITY_META: Record<Activity['kind'], { icon: string; label: string }> = {
  poll: { icon: '📊', label: 'Poll' },
  wordcloud: { icon: '💬', label: 'Word Cloud' },
  slider: { icon: '🎚️', label: 'Slider' },
  dragdrop: { icon: '🧩', label: 'Sorting' },
  quiz: { icon: '⚡', label: 'Quiz' },
  qna: { icon: '❓', label: 'Q&A' },
  tolerance: { icon: '🧠', label: 'Beat the Brain' },
  feedback: { icon: '⭐', label: 'Feedback' },
  reflection: { icon: '✉️', label: 'Letter' },
  plan: { icon: '🤝', label: 'Commitment' },
  pledge: { icon: '✋', label: 'Pledge' },
};

/** Display prompt for any activity kind (title-bearing kinds use their title). */
export function activityPrompt(activity: Activity): string {
  return 'title' in activity ? activity.title : activity.prompt;
}
