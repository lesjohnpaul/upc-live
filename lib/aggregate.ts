import type { Role, QuizActivity } from './types';
import { ROLES } from './types';

/**
 * DB invariant: `responses` has UNIQUE(participant_id, activity_id) — clients
 * upsert — so aggregators assume at most one row per participant per activity.
 */
export type ResponseRow = {
  participant_id: string;
  activity_id: string;
  payload: unknown;
};

export type ParticipantRow = {
  id: string;
  role: Role;
};

function validChoice(payload: unknown, optionCount: number): number | null {
  const choice = (payload as { choice?: unknown } | null)?.choice;
  if (typeof choice !== 'number' || !Number.isInteger(choice)) return null;
  if (choice < 0 || choice >= optionCount) return null;
  return choice;
}

export function tallyPoll(responses: ResponseRow[], optionCount: number): number[] {
  const counts = new Array<number>(optionCount).fill(0);
  for (const r of responses) {
    const choice = validChoice(r.payload, optionCount);
    if (choice !== null) counts[choice]++;
  }
  return counts;
}

export function tallyByRole(
  responses: ResponseRow[],
  participants: ParticipantRow[],
  optionCount: number
): Record<Role, number[]> {
  const roleById = new Map(participants.map((p) => [p.id, p.role]));
  const result = Object.fromEntries(
    (Object.keys(ROLES) as Role[]).map((role) => [role, new Array<number>(optionCount).fill(0)])
  ) as Record<Role, number[]>;
  for (const r of responses) {
    const role = roleById.get(r.participant_id);
    if (!role) continue;
    const choice = validChoice(r.payload, optionCount);
    if (choice !== null) result[role][choice]++;
  }
  return result;
}

export function wordCloudCounts(responses: ResponseRow[]): { word: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const r of responses) {
    const raw = (r.payload as { word?: unknown } | null)?.word;
    if (typeof raw !== 'string') continue;
    const word = raw.trim().toLowerCase().replace(/\s+/g, ' ');
    if (!word) continue;
    counts.set(word, (counts.get(word) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([word, count]) => ({ word, count }))
    .sort((a, b) => b.count - a.count);
}

export function quizLeaderboard(
  responses: ResponseRow[],
  quiz: QuizActivity
): { participant_id: string; score: number }[] {
  return responses
    .map((r) => {
      const answers = (r.payload as { answers?: unknown } | null)?.answers;
      let score = 0;
      if (Array.isArray(answers)) {
        quiz.questions.forEach((q, i) => {
          if (answers[i] === q.correct) score++;
        });
      }
      return { participant_id: r.participant_id, score };
    })
    .sort((a, b) => b.score - a.score); // Array.prototype.sort is stable → ties keep input order
}

function avg(responses: ResponseRow[]): number {
  const values = responses
    .map((r) => (r.payload as { value?: unknown } | null)?.value)
    .filter((v): v is number => typeof v === 'number' && Number.isFinite(v));
  return values.length ? values.reduce((sum, v) => sum + v, 0) / values.length : 0;
}

export function confidenceShift(
  before: ResponseRow[],
  after: ResponseRow[]
): { beforeAvg: number; afterAvg: number; delta: number } {
  const beforeAvg = avg(before);
  const afterAvg = avg(after);
  return { beforeAvg, afterAvg, delta: afterAvg - beforeAvg };
}
