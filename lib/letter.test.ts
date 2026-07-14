import { describe, expect, it } from 'vitest';
import { findActivity } from '../content';
import { composeLetter, scoreArchetype, type Answer } from './letter';
import type { ReflectionActivity } from './types';

const activity = findActivity('upc2-m6-letter-1') as ReflectionActivity;

/** Pick option `i` for every choice question; the free-text question gets `text`. */
const pickAll = (i: number, text = 'I see you.'): Answer[] =>
  activity.questions.map((q) => (q.kind === 'text' ? text : Math.min(i, q.options.length - 1)));

describe('reflection letter', () => {
  it('is wired into module 6 as a reflection activity', () => {
    expect(activity?.kind).toBe('reflection');
    expect(activity.questions).toHaveLength(10);
    expect(activity.questions.filter((q) => q.kind === 'text')).toHaveLength(1);
  });

  it('every choice option carries archetype weight, so no answer is inert', () => {
    for (const q of activity.questions) {
      if (q.kind !== 'choice') continue;
      for (const opt of q.options) {
        expect(Object.keys(opt.weight ?? {}).length, `"${opt.label}" has no weight`).toBeGreaterThan(
          0,
        );
      }
    }
  });

  it('scores the archetype the answers actually point at', () => {
    // option 0 across the board is the fence/systems column
    expect(scoreArchetype(activity, pickAll(0))).toBe('fence_builder');
    // option 3 is the noticing/first-responder column
    expect(scoreArchetype(activity, pickAll(3))).toBe('first_responder');
  });

  it('quotes their sentence back verbatim and addresses them by name', () => {
    const letter = composeLetter({
      activity,
      answers: pickAll(1, 'You are not the worst thing you have done.'),
      firstName: 'Maria',
      role: 'nurse_dentist',
    });
    expect(letter.greeting).toBe('Dear Maria,');
    expect(letter.quote).toBe('You are not the worst thing you have done.');
    expect(letter.signature).toBe('Jessy');
    // praise + role opening + answer-driven lines + archetype paragraph
    expect(letter.paragraphs.length).toBeGreaterThanOrEqual(4);
  });

  it('opens with praise and names three traits — the delight, not just the weight', () => {
    const letter = composeLetter({
      activity,
      answers: pickAll(3),
      firstName: 'Maria',
      role: 'counselor',
    });
    expect(letter.traits.split('·')).toHaveLength(3);
    // praise leads the letter, before anything heavier
    expect(letter.paragraphs[0]).toBe(letter.praise);
    expect(letter.praise).toMatch(/Here is what your answers say about you/);
  });

  it('contains no em dashes anywhere a participant can see them', () => {
    for (const answers of [pickAll(0), pickAll(1), pickAll(2), pickAll(3)]) {
      for (const role of ['head_teacher', 'nurse_dentist', 'counselor', 'admin'] as const) {
        const l = composeLetter({ activity, answers, firstName: 'Jessy', role });
        const prose = [...l.paragraphs, ...l.closing, l.greeting, l.traits].join(' ');
        expect(prose, `em dash in ${role}/${l.archetype} letter`).not.toMatch(/—/);
      }
    }
    // the questions they read on the way there, too
    for (const q of activity.questions) {
      expect(q.prompt).not.toMatch(/—/);
      if (q.kind === 'choice') {
        for (const o of q.options) {
          expect(o.label).not.toMatch(/—/);
          expect(o.line ?? '').not.toMatch(/—/);
        }
      }
    }
  });

  it('stays short enough to read on a phone at the end of a long day', () => {
    for (const answers of [pickAll(0), pickAll(1), pickAll(2), pickAll(3)]) {
      for (const role of ['head_teacher', 'nurse_dentist', 'counselor', 'admin'] as const) {
        const l = composeLetter({ activity, answers, firstName: 'Jessy', role });
        const words = l.paragraphs.join(' ').split(/\s+/).length;
        expect(words, `${role}/${l.archetype} body is ${words} words`).toBeLessThan(180);
      }
    }
  });

  it('falls back gracefully when the name is missing', () => {
    const letter = composeLetter({
      activity,
      answers: pickAll(0),
      firstName: '  ',
      role: 'admin',
    });
    expect(letter.greeting).toBe('Dear friend,');
  });

  it('survives a half-finished letter (weak wifi, quiz abandoned mid-way)', () => {
    const letter = composeLetter({
      activity,
      answers: [0, 1],
      firstName: 'Ana',
      role: 'counselor',
    });
    expect(letter.quote).toBeNull();
    expect(letter.paragraphs.length).toBeGreaterThan(0);
    expect(letter.archetypeTitle).toBeTruthy();
  });

  it('gives different people different letters — the whole point at 35 in one room', () => {
    const a = composeLetter({
      activity,
      answers: pickAll(0, 'I will not look away.'),
      firstName: 'Ana',
      role: 'head_teacher',
    });
    const b = composeLetter({
      activity,
      answers: pickAll(2, 'You matter more than this.'),
      firstName: 'Ben',
      role: 'admin',
    });
    expect(a.paragraphs.join()).not.toBe(b.paragraphs.join());
    expect(a.archetype).not.toBe(b.archetype);
    expect(a.quote).not.toBe(b.quote);
  });
});
