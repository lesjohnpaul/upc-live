import { describe, expect, it } from 'vitest';
import type { Activity } from '../../lib/types';
import { module1 } from './module-1';

/**
 * Guards the restructure described in
 * docs/plans/2026-08-18-catalyst-final-revision.md.
 *
 * Two failure modes are silent and expensive here. Deleting one half of a
 * confidence slider leaves the stage rendering a before/after view with
 * nothing to compare against. And migrating a slide out of UPC 2 without
 * rewording it puts adult, teacher-facing paragraph prose on a projector in
 * front of 15-year-olds. Both are caught below.
 */

const slides = module1.slides;
const activities = slides.flatMap((s) => (s.kind === 'activity' ? [s.activity] : []));
const words = (s: string) => s.trim().split(/\s+/).length;

/**
 * "Out of 100 teens your age, how many use illegal drugs?" is a guess, not a
 * confidence reading — it deliberately has no `after` twin, and the stage
 * never renders it as a shift. Every other slider must be paired.
 */
const UNPAIRED_SLIDERS = new Set(['catalyst-m1-slider-guess-drugs']);

describe('The Catalyst deck integrity', () => {
  it('gives every activity a unique id', () => {
    const ids = activities.map((a) => a.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('never leaves a slider half without its pair', () => {
    const sliders = activities.filter(
      (a): a is Extract<Activity, { kind: 'slider' }> => a.kind === 'slider',
    );
    for (const s of sliders) {
      if (UNPAIRED_SLIDERS.has(s.id)) continue;
      const wanted = s.phase === 'before' ? 'after' : 'before';
      const twin = sliders.find((o) => o.pairId === s.pairId && o.phase === wanted);
      expect(twin, `slider ${s.id} has no ${wanted} twin`).toBeDefined();
    }
  });

  it('keeps every activity id namespaced to this deck', () => {
    // A raw upc2-* id here means a UPC 2 slide was pasted in rather than reworded.
    for (const a of activities) {
      expect(a.id.startsWith('catalyst-m1-'), `${a.id} is not a Catalyst id`).toBe(true);
    }
  });

  it('keeps bullets readable from the back row', () => {
    for (const s of slides) {
      if (s.kind !== 'bullets') continue;
      expect(s.bullets.length, `"${s.title}" has too many bullets`).toBeLessThanOrEqual(5);
      for (const b of s.bullets) {
        expect(words(b), `"${s.title}" — bullet too long: ${b}`).toBeLessThanOrEqual(14);
      }
    }
  });

  it('never addresses the room as teachers of students', () => {
    // UPC 2 copy talks to staff about "your students". This room IS the students.
    const onStage = slides
      .flatMap((s) => [
        'title' in s ? s.title : '',
        'text' in s ? s.text : '',
        'subtitle' in s && s.subtitle ? s.subtitle : '',
        s.kind === 'bullets' ? s.bullets.join(' ') : '',
        s.kind === 'recap' ? s.points.join(' ') : '',
      ])
      .join(' ')
      .toLowerCase();
    expect(onStage).not.toContain('your students');
    expect(onStage).not.toContain('fellow teacher');
    expect(onStage).not.toContain('prevention specialist');
  });

  it('has exactly one welcome, one qr and one finale', () => {
    for (const kind of ['welcome', 'qr', 'finale'] as const) {
      expect(slides.filter((s) => s.kind === kind), `${kind} slides`).toHaveLength(1);
    }
  });

  it('is booked for 60 minutes', () => {
    expect(module1.minutes).toBe(60);
  });
});
