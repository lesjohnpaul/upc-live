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

export type SchoolPlan = {
  /** normalised match key — see groupBySchool */
  key: string;
  name: string;
  entries: { role: Role | null; commitment: string; when: string }[];
};

/** the pair reads as "we will run X" then "I will unblock it" */
const planRank = (role: Role | null) =>
  role === 'student_leader' ? 0 : role === 'adviser' ? 1 : 2;

/**
 * Build Your Barkada, grouped for the projector wall. The school name is typed
 * by hand on two different phones, so the match key is case- and
 * whitespace-insensitive — "Bagong Silang NHS" and "bagong  silang nhs" must
 * land on one card or the pairing that the whole session is built on breaks.
 * Rows without a school AND a commitment are drafts, not plans; they are
 * dropped. Schools sort alphabetically so an arriving row inserts in place
 * instead of reshuffling the wall.
 */
export function groupBySchool(
  responses: ResponseRow[],
  participants: ParticipantRow[],
): SchoolPlan[] {
  const roleById = new Map(participants.map((p) => [p.id, p.role]));
  const schools = new Map<string, SchoolPlan>();

  for (const r of responses) {
    const p = r.payload as { school?: unknown; commitment?: unknown; when?: unknown } | null;
    if (typeof p?.school !== 'string' || typeof p.commitment !== 'string') continue;
    const name = p.school.trim().replace(/\s+/g, ' ');
    const commitment = p.commitment.trim().replace(/\s+/g, ' ');
    if (!name || !commitment) continue;
    const key = name.toLowerCase();
    const school = schools.get(key) ?? { key, name, entries: [] };
    school.entries.push({
      role: roleById.get(r.participant_id) ?? null,
      commitment,
      when: typeof p.when === 'string' ? p.when.trim() : '',
    });
    schools.set(key, school);
  }

  for (const school of schools.values())
    school.entries.sort((a, b) => planRank(a.role) - planRank(b.role));
  return [...schools.values()].sort((a, b) => a.name.localeCompare(b.name));
}

export type PledgeTally = {
  /** rows whose `signed` flag is true — the number the room is watching */
  signed: number;
  /** distinct schools with at least one signature, alphabetical */
  schools: string[];
  /** One Voice lines from signed pledges, newest first (insertion order reversed) */
  voices: { school: string; voice: string }[];
};

/**
 * Lead with Purpose Pledge, tallied for the projector.
 *
 * Only signed rows count. Everything before the sign tap is a half-read
 * pledge, and a wall that inflates its number the moment someone opens the
 * card would make the ritual a lie. School names are matched the same
 * case- and whitespace-insensitive way as groupBySchool, since they are typed
 * by hand on two phones per school; the first spelling seen wins the display.
 *
 * Voices are capped by the caller, not here — this returns every one so the
 * dashboard CSV keeps the full set.
 */
export function tallyPledge(responses: ResponseRow[]): PledgeTally {
  const schools = new Map<string, string>();
  const voices: { school: string; voice: string }[] = [];
  let signed = 0;

  for (const r of responses) {
    const p = r.payload as { signed?: unknown; school?: unknown; voice?: unknown } | null;
    if (p?.signed !== true) continue;
    signed++;
    const name = typeof p.school === 'string' ? p.school.trim().replace(/\s+/g, ' ') : '';
    if (name && !schools.has(name.toLowerCase())) schools.set(name.toLowerCase(), name);
    const voice = typeof p.voice === 'string' ? p.voice.trim().replace(/\s+/g, ' ') : '';
    if (voice) voices.push({ school: name, voice });
  }

  return {
    signed,
    schools: [...schools.values()].sort((a, b) => a.localeCompare(b)),
    voices: voices.reverse(),
  };
}

/**
 * Merge a fetched snapshot with realtime events that were applied while the
 * snapshot query was in flight — events are newer, so they win on key
 * conflicts (unique per participant+activity). Used by useLiveResponses so a
 * slow refetch can't roll back rows that already arrived over the socket.
 */
export function mergeSnapshot<T extends { participant_id: string; activity_id: string }>(
  snapshot: T[],
  events: T[]
): T[] {
  const merged = new Map(snapshot.map((r) => [`${r.participant_id} ${r.activity_id}`, r]));
  for (const r of events) merged.set(`${r.participant_id} ${r.activity_id}`, r);
  return [...merged.values()];
}
