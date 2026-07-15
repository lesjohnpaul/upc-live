/**
 * Singleton mock client for the demo, seeded with believable fake data so the
 * stage and dashboard look alive the moment you open them. Nothing here ever
 * touches Supabase — see mockClient.ts for the why.
 */
import type { SupabaseClient } from '@supabase/supabase-js';
import { MockClient } from './mockClient';

export const DEMO_SESSION_ID = 'demo-session';
export const DEMO_CODE = 'DEMO';

type Role = 'head_teacher' | 'nurse_dentist' | 'counselor' | 'admin';

const PEOPLE: { nickname: string; role: Role }[] = [
  { nickname: 'Teacher Ana', role: 'head_teacher' },
  { nickname: 'Teacher Ben', role: 'head_teacher' },
  { nickname: 'Sir Carlo', role: 'head_teacher' },
  { nickname: 'Nurse Divine', role: 'nurse_dentist' },
  { nickname: 'Dr. Elena', role: 'nurse_dentist' },
  { nickname: 'Ma’am Faith', role: 'counselor' },
  { nickname: 'Guidance Gio', role: 'counselor' },
  { nickname: 'Counselor Hazel', role: 'counselor' },
  { nickname: 'Admin Ivan', role: 'admin' },
  { nickname: 'Ma’am Jen', role: 'admin' },
  { nickname: 'Teacher Kip', role: 'head_teacher' },
  { nickname: 'Nurse Lily', role: 'nurse_dentist' },
];

// deterministic ids so cross-tab broadcasts dedupe cleanly
const pid = (i: number) => `demo-p${i}`;

const POLL_CHOICES = [0, 2, 2, 1, 2, 3, 2, 0, 2, 1, 2, 2]; // leans to "both, more on the fence" (correct = 2)
const WORDS = ['family', 'teachers', 'love', 'friends', 'faith', 'family', 'school', 'belonging', 'family', 'hope', 'teachers', 'attention'];
const QUIZ = [[1, 2], [1, 2], [1, 0], [1, 2], [3, 2], [1, 2], [0, 2], [1, 1], [1, 2], [1, 2]]; // correct = [1,2]
const BEFORE = [4, 3, 5, 6, 4, 5, 3, 4, 6, 5]; // pre-training confidence, low-ish
const QUESTIONS = [
  'How do we start a prevention huddle without scaring the students?',
  'Is there a cheaper alternative to after-school programs for small schools?',
  'How do we measure protective factors during the annual health check?',
];

function buildSeed(client: MockClient) {
  const db = client.db;

  db.sessions.push({
    id: DEMO_SESSION_ID,
    code: DEMO_CODE,
    day: 1,
    active_activity: 'demo-poll',
  });

  PEOPLE.forEach((p, i) => {
    db.participants.push({ id: pid(i), session_id: DEMO_SESSION_ID, role: p.role, nickname: p.nickname });
  });

  const t = (mins: number) => new Date(Date.now() - mins * 60_000).toISOString();
  const push = (participantIndex: number, activity_id: string, payload: unknown, mins: number) =>
    db.responses.push({
      id: `demo-r-${activity_id}-${participantIndex}`,
      session_id: DEMO_SESSION_ID,
      participant_id: pid(participantIndex),
      activity_id,
      payload,
      created_at: t(mins),
    });

  POLL_CHOICES.forEach((choice, i) => push(i, 'demo-poll', { choice }, 8));
  WORDS.forEach((word, i) => push(i, 'demo-wordcloud', { word }, 7));
  QUIZ.forEach((answers, i) => push(i, 'demo-quiz', { answers }, 6));
  BEFORE.forEach((value, i) => push(i, 'demo-slider-before', { value }, 5));
  // dragdrop is count-only on the stage — a handful of submissions is enough
  [0, 1, 2, 3, 4, 5, 6].forEach((i) => push(i, 'demo-dragdrop', { placed: true }, 4));
  QUESTIONS.forEach((question, i) => push(i, 'demo-qna', { question, answered: i === 0 }, 3));
}

let singleton: MockClient | null = null;

export function getMockClient(): SupabaseClient {
  if (!singleton) {
    singleton = new MockClient();
    buildSeed(singleton);
  }
  return singleton as unknown as SupabaseClient;
}
