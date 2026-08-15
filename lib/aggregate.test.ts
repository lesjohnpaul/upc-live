import { describe, it, expect } from 'vitest';
import {
  tallyPoll,
  tallyByRole,
  wordCloudCounts,
  quizLeaderboard,
  confidenceShift,
  groupBySchool,
  mergeSnapshot,
  type ResponseRow,
  type ParticipantRow,
} from './aggregate';
import type { QuizActivity } from './types';

const row = (participant_id: string, payload: unknown, activity_id = 'a1'): ResponseRow => ({
  participant_id,
  activity_id,
  payload,
});

describe('tallyPoll', () => {
  it('counts choices per option', () => {
    const responses = [
      row('p1', { choice: 0 }),
      row('p2', { choice: 1 }),
      row('p3', { choice: 1 }),
      row('p4', { choice: 2 }),
    ];
    expect(tallyPoll(responses, 3)).toEqual([1, 2, 1]);
  });

  it('returns zeros for no responses', () => {
    expect(tallyPoll([], 4)).toEqual([0, 0, 0, 0]);
  });

  it('ignores malformed payloads (missing, non-numeric, out-of-range, negative)', () => {
    const responses = [
      row('p1', { choice: 0 }),
      row('p2', {}),
      row('p3', null),
      row('p4', { choice: 'yes' }),
      row('p5', { choice: 5 }),
      row('p6', { choice: -1 }),
      row('p7', { choice: 1.5 }),
    ];
    expect(tallyPoll(responses, 3)).toEqual([1, 0, 0]);
  });
});

describe('tallyByRole', () => {
  it('segments counts by participant role', () => {
    const participants: ParticipantRow[] = [
      { id: 'p1', role: 'head_teacher' },
      { id: 'p2', role: 'head_teacher' },
      { id: 'p3', role: 'nurse_dentist' },
      { id: 'p4', role: 'counselor' },
    ];
    const responses = [
      row('p1', { choice: 0 }),
      row('p2', { choice: 1 }),
      row('p3', { choice: 1 }),
      row('p4', { choice: 0 }),
    ];
    const result = tallyByRole(responses, participants, 2);
    expect(result.head_teacher).toEqual([1, 1]);
    expect(result.nurse_dentist).toEqual([0, 1]);
    expect(result.counselor).toEqual([1, 0]);
    expect(result.admin).toEqual([0, 0]);
  });

  it('ignores responses from unknown participants and malformed payloads', () => {
    const participants: ParticipantRow[] = [{ id: 'p1', role: 'admin' }];
    const responses = [
      row('p1', { choice: 0 }),
      row('ghost', { choice: 1 }),
      row('p1', { choice: 99 }),
    ];
    expect(tallyByRole(responses, participants, 2).admin).toEqual([1, 0]);
  });
});

describe('wordCloudCounts', () => {
  it('normalizes words: trim, lowercase, collapse whitespace', () => {
    const responses = [
      row('p1', { word: '  Prevention ' }),
      row('p2', { word: 'prevention' }),
      row('p3', { word: 'PEER   pressure' }),
      row('p4', { word: 'peer pressure' }),
      row('p5', { word: 'hope' }),
    ];
    expect(wordCloudCounts(responses)).toEqual([
      { word: 'prevention', count: 2 },
      { word: 'peer pressure', count: 2 },
      { word: 'hope', count: 1 },
    ]);
  });

  it('sorts by count descending', () => {
    const responses = [
      row('p1', { word: 'a' }),
      row('p2', { word: 'b' }),
      row('p3', { word: 'b' }),
    ];
    expect(wordCloudCounts(responses)[0]).toEqual({ word: 'b', count: 2 });
  });

  it('ignores malformed payloads and empty/whitespace-only words', () => {
    const responses = [
      row('p1', {}),
      row('p2', null),
      row('p3', { word: 42 }),
      row('p4', { word: '   ' }),
      row('p5', { word: 'ok' }),
    ];
    expect(wordCloudCounts(responses)).toEqual([{ word: 'ok', count: 1 }]);
  });
});

describe('quizLeaderboard', () => {
  const quiz: QuizActivity = {
    id: 'q1',
    kind: 'quiz',
    title: 'Quiz',
    questions: [
      { prompt: 'q1', options: ['a', 'b'], correct: 0 },
      { prompt: 'q2', options: ['a', 'b'], correct: 1 },
      { prompt: 'q3', options: ['a', 'b'], correct: 1 },
    ],
  };

  it('scores answers against correct indices and sorts descending', () => {
    const responses = [
      row('p1', { answers: [0, 1, 1] }), // 3
      row('p2', { answers: [0, 0, 1] }), // 2
      row('p3', { answers: [1, 0, 0] }), // 0
    ];
    expect(quizLeaderboard(responses, quiz)).toEqual([
      { participant_id: 'p1', score: 3 },
      { participant_id: 'p2', score: 2 },
      { participant_id: 'p3', score: 0 },
    ]);
  });

  it('breaks ties stably (input order preserved)', () => {
    const responses = [
      row('pA', { answers: [0, 1, 0] }), // 2
      row('pB', { answers: [0, 0, 1] }), // 2
      row('pC', { answers: [0, 1, 1] }), // 3
    ];
    expect(quizLeaderboard(responses, quiz)).toEqual([
      { participant_id: 'pC', score: 3 },
      { participant_id: 'pA', score: 2 },
      { participant_id: 'pB', score: 2 },
    ]);
  });

  it('ignores non-numeric answer elements', () => {
    const responses = [row('p1', { answers: ['0', 1, 1] })]; // '0' !== 0 → only q2, q3 score
    expect(quizLeaderboard(responses, quiz)).toEqual([{ participant_id: 'p1', score: 2 }]);
  });

  it('handles malformed payloads and short answer arrays', () => {
    const responses = [
      row('p1', { answers: [0] }), // 1
      row('p2', {}), // 0
      row('p3', null), // 0
    ];
    const result = quizLeaderboard(responses, quiz);
    expect(result[0]).toEqual({ participant_id: 'p1', score: 1 });
    expect(result.map((r) => r.score)).toEqual([1, 0, 0]);
  });
});

describe('confidenceShift', () => {
  it('computes averages and delta', () => {
    const before = [row('p1', { value: 2 }), row('p2', { value: 4 })];
    const after = [row('p1', { value: 4 }), row('p2', { value: 5 })];
    expect(confidenceShift(before, after)).toEqual({
      beforeAvg: 3,
      afterAvg: 4.5,
      delta: 1.5,
    });
  });

  it('returns zeros (no NaN) for empty arrays', () => {
    expect(confidenceShift([], [])).toEqual({ beforeAvg: 0, afterAvg: 0, delta: 0 });
  });

  it('handles one side empty without NaN', () => {
    const after = [row('p1', { value: 4 })];
    expect(confidenceShift([], after)).toEqual({ beforeAvg: 0, afterAvg: 4, delta: 4 });
  });

  it('ignores malformed payloads', () => {
    const before = [row('p1', { value: 3 }), row('p2', {}), row('p3', { value: 'high' })];
    const after = [row('p1', { value: 5 })];
    expect(confidenceShift(before, after)).toEqual({ beforeAvg: 3, afterAvg: 5, delta: 2 });
  });
});

describe('groupBySchool', () => {
  const people: ParticipantRow[] = [
    { id: 'p1', role: 'student_leader' },
    { id: 'p2', role: 'adviser' },
  ];

  it('lands a pair who typed the school differently on one card, student first', () => {
    const plans = groupBySchool(
      [
        row('p2', { school: 'bagong  silang nhs ', commitment: 'I will fund the tarpaulins' }),
        row('p1', { school: 'Bagong Silang NHS', commitment: 'Weekly BKD peer session' }),
      ],
      people,
    );
    expect(plans).toHaveLength(1);
    expect(plans[0].entries.map((e) => e.role)).toEqual(['student_leader', 'adviser']);
    // the display name keeps the spelling, the key does the matching
    expect(plans[0].name).toBe('bagong silang nhs');
  });

  it('drops drafts with no school or no commitment, and sorts schools by name', () => {
    const plans = groupBySchool(
      [
        row('p1', { school: 'Zaragoza NHS', commitment: 'Echo-seminar in November' }),
        row('p2', { school: '   ', commitment: 'no school yet' }),
        row('p1', { school: 'Angeles NHS', commitment: '  ' }),
        row('p2', { school: 'Angeles NHS' }),
      ],
      people,
    );
    expect(plans.map((p) => p.name)).toEqual(['Zaragoza NHS']);
  });

  it('keeps a commitment whose responder is not in the participants list', () => {
    const plans = groupBySchool([row('ghost', { school: 'X NHS', commitment: 'Do the thing' })], []);
    expect(plans[0].entries[0].role).toBeNull();
  });
});

describe('mergeSnapshot', () => {
  it('events win over the snapshot on key conflicts, new keys append', () => {
    const snapshot = [row('p1', { choice: 0 }), row('p2', { choice: 1 })];
    const events = [row('p2', { choice: 3 }), row('p3', { choice: 2 })];
    expect(mergeSnapshot(snapshot, events)).toEqual([
      row('p1', { choice: 0 }),
      row('p2', { choice: 3 }),
      row('p3', { choice: 2 }),
    ]);
  });

  it('same participant on different activities are distinct keys', () => {
    const snapshot = [row('p1', { choice: 0 }, 'a1')];
    const events = [row('p1', { word: 'x' }, 'a2')];
    expect(mergeSnapshot(snapshot, events)).toHaveLength(2);
  });
});
