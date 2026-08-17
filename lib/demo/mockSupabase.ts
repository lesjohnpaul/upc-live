/**
 * Singleton mock client for the demo, seeded with believable fake data so the
 * stage and dashboard look alive the moment you open them. Nothing here ever
 * touches Supabase — see mockClient.ts for the why.
 */
import type { SupabaseClient } from '@supabase/supabase-js';
import { MockClient } from './mockClient';
import { TOLERANCE_TAPS, rewardForTap } from '../tolerance';
import type { Role } from '../types';

export const DEMO_SESSION_ID = 'demo-session';
export const DEMO_CODE = 'DEMO';

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

/**
 * Build Your Barkada seed: nine schools, each an SSLG pair on two phones, so
 * the wall has to page. One pair writes to the 140-character ceiling and one
 * school has only the student answering — both are the layouts most likely to
 * break on a projector, so they belong in the rehearsal data.
 */
const SCHOOLS: { school: string; student: string; adviser?: string; when: string }[] = [
  {
    school: 'Bagong Silang National High School',
    student: 'A monthly BKD peer-mentoring circle every second Friday, run by the SSLG officers.',
    adviser: 'I will sign the activity permit for the whole quarter in one go, not per session.',
    when: 'Within 2 weeks',
  },
  {
    school: 'Sto. Niño Integrated School',
    student: 'An echo-seminar for all Grade 7 sections on what we learned here today.',
    adviser: 'I will give them the 2nd period of Homeroom Guidance so nobody misses class for it.',
    when: 'This quarter',
  },
  {
    school: 'Mataas na Paaralang Neptali A. Gonzales',
    // both at the 140-character ceiling — the tallest card the wall can ever get
    student:
      'A “Barkada Kontra Droga” corner in the library that our officers restock weekly, plus a suggestion box we read aloud at SSLG meetings.',
    adviser:
      'I will unblock the library space, fund the first month of printing, and sit in the first three meetings so this does not die by week four.',
    when: 'Before December',
  },
  {
    school: 'Pinagbuhatan High School',
    student: 'A drug-free pledge wall during Intramurals, signed by every homeroom.',
    adviser: 'I will fund the tarpaulin and get us a booth beside the registration table.',
    when: 'Within 2 weeks',
  },
  {
    school: 'Rizal Experimental Station High School',
    student: 'Weekly 15-minute SSLG segment in the flag ceremony on refusal skills.',
    adviser: 'I will put it on the official flag ceremony programme so it cannot be skipped.',
    when: 'This quarter',
  },
  {
    school: 'San Joaquin-Kalawaan High School',
    student: 'Train ten Grade 10 peer facilitators so this does not stop when we graduate.',
    adviser: 'I will name a co-adviser from Grade 9 so there is somebody after me.',
    when: 'Before December',
  },
  {
    school: 'Nagpayong High School',
    student: 'An anonymous “ask anything” box answered by the guidance counselor every month.',
    adviser: 'I will book the counselor one hour a month and protect it in her schedule.',
    when: 'This quarter',
  },
  {
    school: 'Manggahan High School',
    student: 'A sports clinic every Saturday morning so there is somewhere to be.',
    adviser: 'I will secure the covered court permit and the first-aid kit.',
    when: 'Within 2 weeks',
  },
  // adviser has not answered yet — the wall must still show the school
  {
    school: 'Kalawaan National High School',
    student: 'A film showing plus open forum for Grades 9 and 10 during Drug Abuse Prevention Week.',
    when: 'Before December',
  },
];

/** Every pledge line index — the seeded signers all read the whole thing. */
const ALL_LINES = [0, 1, 2, 3, 4, 5, 6, 7, 8];

const VOICES: { voice: string; school: string }[] = [
  { voice: 'Hindi ka mahihiya sa akin kung aayaw ka. Ako bahala.', school: 'Bagong Silang National High School' },
  { voice: 'You are allowed to just leave. That is not being torpe.', school: 'Sto. Niño Integrated School' },
  { voice: 'Isang beses lang daw. Ganoon din ang sabi sa lahat.', school: 'Mataas na Paaralang Neptali A. Gonzales' },
  { voice: 'Tell me and I will not tell anyone else. Pero sasamahan kita.', school: 'Kalawaan National High School' },
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
  // Beat the Brain writes one row per player, at the reveal — so these are
  // simply the people who tapped all the way through.
  [0, 1, 2, 3, 4, 5, 6, 7, 8].forEach((i) =>
    push(
      i,
      'demo-tolerance',
      {
        taps: TOLERANCE_TAPS,
        peakReward: rewardForTap(0),
        finalReward: rewardForTap(TOLERANCE_TAPS - 1),
        seconds: 14 + i,
      },
      2,
    ),
  );

  // Build Your Barkada: two extra participants per school, an SSLG pair, so the
  // wall can label whose commitment is whose.
  SCHOOLS.forEach(({ school, student, adviser, when }, s) => {
    const base = PEOPLE.length + s * 2;
    const join = (i: number, role: Role, nickname: string) =>
      db.participants.push({ id: pid(i), session_id: DEMO_SESSION_ID, role, nickname });

    join(base, 'student_leader', `SSLG ${school.split(' ')[0]}`);
    push(base, 'demo-plan', { school, commitment: student, when }, 1);
    if (adviser) {
      join(base + 1, 'adviser', `Adviser ${school.split(' ')[0]}`);
      // typed on a different phone — casing/spacing must still match on the wall
      push(base + 1, 'demo-plan', { school: school.toUpperCase(), commitment: adviser, when }, 1);
    }
  });

  // The pledge. Deliberately mixed: signed rows with a voice, a signed row with
  // no voice, and one that tapped every line but never hit sign — so the demo
  // wall shows that the counter tracks signatures, not openings.
  VOICES.forEach(({ voice, school }, i) =>
    push(i, 'demo-pledge', { signed: true, lines: ALL_LINES, school, voice }, 1),
  );
  push(VOICES.length, 'demo-pledge', { signed: true, lines: ALL_LINES, school: 'Manggahan High School', voice: '' }, 1);
  push(VOICES.length + 1, 'demo-pledge', { signed: false, lines: ALL_LINES, school: 'Manggahan High School', voice: 'drafted but never signed' }, 1);
}

let singleton: MockClient | null = null;

export function getMockClient(): SupabaseClient {
  if (!singleton) {
    singleton = new MockClient();
    buildSeed(singleton);
  }
  return singleton as unknown as SupabaseClient;
}
