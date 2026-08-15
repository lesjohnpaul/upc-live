/**
 * Beat the Brain — the maths of tolerance.
 *
 * The player taps for a reward. Each tap pays less than the last (receptor
 * downregulation) while the urge to tap keeps climbing (sensitised wanting).
 * Somewhere around TOLERANCE_TAPS the two curves cross: the player is working
 * harder for less. That crossing IS the lesson, so it is tested, not eyeballed.
 *
 * ponytail: plain exponential decay, no pharmacokinetic model. If the felt
 * experience needs tuning, change DECAY/URGE_RATE — the curves stay honest.
 */

/** First hit, in arbitrary "reward units" rendered as a number on screen. */
export const REWARD_BASE = 100;

/** Per-tap multiplier on the reward. Lower = harsher, faster lesson. */
export const DECAY = 0.88;

/** How fast wanting saturates. Lower = urge climbs faster. */
export const URGE_RATE = 0.9;

/** Tap index at which the card reveals the lesson. */
export const TOLERANCE_TAPS = 20;

/** Reward paid for a 0-indexed tap. Monotonically decreasing, never negative. */
export function rewardForTap(tapIndex: number): number {
  if (tapIndex < 0) return REWARD_BASE;
  return Math.max(0, Math.round(REWARD_BASE * DECAY ** tapIndex * 100) / 100);
}

/** Urge to tap again, 0..1. Rises asymptotically — it never fully satisfies. */
export function urgeForTap(tapIndex: number): number {
  if (tapIndex <= 0) return 0;
  return Math.min(1, 1 - URGE_RATE ** tapIndex);
}

/** Has the player earned the reveal? */
export function isToleranceReached(tapIndex: number): boolean {
  return tapIndex >= TOLERANCE_TAPS;
}
