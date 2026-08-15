import { describe, expect, it } from 'vitest';
import {
  TOLERANCE_TAPS,
  isToleranceReached,
  rewardForTap,
  urgeForTap,
} from './tolerance';

describe('rewardForTap', () => {
  it('gives a full hit on the very first tap', () => {
    expect(rewardForTap(0)).toBe(100);
  });

  it('decays monotonically', () => {
    for (let n = 1; n < 30; n++) {
      expect(rewardForTap(n)).toBeLessThan(rewardForTap(n - 1));
    }
  });

  it('has collapsed to a fraction of the first hit by the reveal', () => {
    expect(rewardForTap(TOLERANCE_TAPS)).toBeLessThan(20);
  });

  it('never goes negative', () => {
    expect(rewardForTap(500)).toBeGreaterThanOrEqual(0);
  });
});

describe('urgeForTap', () => {
  it('starts at zero and rises', () => {
    expect(urgeForTap(0)).toBe(0);
    expect(urgeForTap(5)).toBeGreaterThan(urgeForTap(1));
  });

  it('is bounded to 0..1', () => {
    expect(urgeForTap(1000)).toBeLessThanOrEqual(1);
  });

  // The meter is on a projector in front of a hall of students. A curve that
  // dipped even once would read as a bug, not a lesson. Paired with the
  // starts-at-zero case above, this also pins the lower half of the 0..1 bound.
  it('never goes backwards, so the meter only ever climbs', () => {
    for (let n = 1; n < 30; n++) {
      expect(urgeForTap(n)).toBeGreaterThanOrEqual(urgeForTap(n - 1));
    }
  });

  it('crosses the reward — the whole lesson', () => {
    // by the reveal tap, urge (0..1 → %) must exceed the reward
    expect(urgeForTap(TOLERANCE_TAPS) * 100).toBeGreaterThan(rewardForTap(TOLERANCE_TAPS));
  });

  // Crossing *at* the reveal is not good enough: the card names a feeling the
  // player is supposed to have already had. Requiring the crossing inside the
  // first half leaves most of the run in the working-harder-for-less state.
  // DECAY 0.9 + URGE_RATE 0.9915 passes every other test in this file and yet
  // crosses at tap 19 — one tap of lesson. This is the test that rejects it.
  it('crosses inside the first half, long before the card names it', () => {
    const taps = [...Array(TOLERANCE_TAPS * 2).keys()];
    const crossing = taps.find((n) => urgeForTap(n) * 100 > rewardForTap(n));
    expect(crossing).toBeDefined();
    expect(crossing).toBeLessThan(TOLERANCE_TAPS / 2);
  });
});

describe('isToleranceReached', () => {
  it('is false early and true at the reveal', () => {
    expect(isToleranceReached(3)).toBe(false);
    expect(isToleranceReached(TOLERANCE_TAPS)).toBe(true);
  });
});
