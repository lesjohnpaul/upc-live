import { ARCHETYPES, type Archetype, type ReflectionActivity, type Role } from './types';

/**
 * Composes each participant's closing letter from their reflection answers.
 *
 * Uniqueness (35 participants, all comparing phones afterwards): the letter is
 * assembled from sentence-level blocks, not whole-letter templates.
 * 4 role openings x 6 praise paragraphs x 4x4x4 answer-driven lines gives
 * ~1,500 distinct bodies, plus their own Q9 sentence verbatim and their name.
 * Two identical letters in one room is effectively impossible.
 *
 * House style: SHORT (they read this at the tail end of a two-day seminar, on a
 * phone, while tired) and NO EM DASHES anywhere in participant-facing prose.
 *
 * ponytail: deterministic, no LLM. Swap `paragraphs` for a generated body later
 * if a real API key shows up; the shape below is the fallback either way.
 */

export type Answer = number | string;

export type Letter = {
  greeting: string;
  archetype: Archetype;
  archetypeTitle: string;
  /** "Observant · Warm · Quietly brave" */
  traits: string;
  /** the full letter, shown on their phone */
  paragraphs: string[];
  /**
   * Just the praise paragraph. The shareable PNG carries this rather than the
   * whole body: a keepsake nobody shares is a wall of text, and a short image
   * can never clip.
   */
  praise: string;
  /** their own words, quoted back at them: the emotional payload */
  quote: string | null;
  closing: string[];
  signature: string;
  signatureSub: string;
};

/**
 * One line. They already know their own job; this just names it back to them.
 * ponytail: Partial — this letter lives in UPC 2 module 6 and is written for the
 * adult four. A role without an opening simply gets one paragraph fewer.
 */
const ROLE_OPENING: Partial<Record<Role, string>> = {
  head_teacher:
    'You walked in already carrying other people’s classrooms as well as your own. You walk out carrying something more.',
  nurse_dentist:
    'You are the person this school sends its hurting children to. You could always read a body in trouble. Now you can read a mind in trouble too.',
  counselor:
    'You were already doing this work, often alone, often without anyone saying that it mattered. Consider this the saying.',
  admin:
    'Somebody once assumed this work was not really about you. But nothing in a school becomes real until it lives in a plan, and the plan is yours.',
};

/**
 * Three adjectives, shown as a badge under the archetype title and printed in
 * the shareable image. This is the papuri: the bit they screenshot.
 */
const ARCHETYPE_TRAITS: Record<Archetype, string> = {
  fence_builder: 'Far-sighted · Patient · Relentless',
  first_responder: 'Observant · Warm · Quietly brave',
  bridge: 'Resourceful · Generous · Dependable',
  truth_teller: 'Thoughtful · Courageous · Kind',
  anchor: 'Steady · Present · Deeply trusted',
  igniter: 'Bold · Inspiring · Contagious',
};

/**
 * The praise. Deliberately specific rather than generic: "you are amazing"
 * flatters nobody, "you notice the child who has gone quiet" is recognition.
 */
const ARCHETYPE_PRAISE: Record<Archetype, string> = {
  fence_builder:
    'Here is what your answers say about you. You think in years, not in days, and that is rare. You want the problem gone for good, not handled by Friday. That patience is a quiet kind of courage, and schools are held up by people exactly like you.',
  first_responder:
    'Here is what your answers say about you. You are someone who sees. In a building full of noise, you notice the one child who has gone quiet, and you refuse to shrug it off. That instinct cannot be taught in any seminar. You already had it.',
  bridge:
    'Here is what your answers say about you. You are the one people quietly rely on, the one who always knows who to call. A frightened child does not need somebody with every answer. They need somebody who will not let them fall through the gap. That is you.',
  truth_teller:
    'Here is what your answers say about you. You were brave enough to admit you once feared saying the wrong thing. That honesty is worth more than confidence. You understand that one careless sentence can close a door, and one kind sentence can open it. You will open many.',
  anchor:
    'Here is what your answers say about you. You are steady. In a profession that rewards the loud, you are the one who simply stays, and everyone who was ever rescued was rescued by somebody who stayed. A student will come back in ten years to thank you by name.',
  igniter:
    'Here is what your answers say about you. You make other people want to move. You refuse to be the only one in the building who understands this, and that refusal is worth more than any certificate. Bold people are common. Bold people who bring everyone with them are not.',
};

const CLOSING = [
  'You are not going home with a certificate. You are going home as the fence.',
  'Go build it.',
];

/** Highest score wins; ties break by the order in ARCHETYPES (stable, not random). */
export function scoreArchetype(activity: ReflectionActivity, answers: Answer[]): Archetype {
  const scores = new Map<Archetype, number>();
  activity.questions.forEach((q, i) => {
    if (q.kind !== 'choice') return;
    const picked = answers[i];
    if (typeof picked !== 'number') return;
    const weight = q.options[picked]?.weight;
    if (!weight) return;
    for (const [a, points] of Object.entries(weight) as [Archetype, number][]) {
      scores.set(a, (scores.get(a) ?? 0) + points);
    }
  });

  let best: Archetype = 'anchor'; // every participant is at least this
  let bestScore = -1;
  for (const a of Object.keys(ARCHETYPES) as Archetype[]) {
    const s = scores.get(a) ?? 0;
    if (s > bestScore) {
      best = a;
      bestScore = s;
    }
  }
  return best;
}

export function composeLetter({
  activity,
  answers,
  firstName,
  role,
}: {
  activity: ReflectionActivity;
  answers: Answer[];
  firstName: string;
  role: Role;
}): Letter {
  const archetype = scoreArchetype(activity, answers);

  // answer-driven sentences, in question order
  const lines: string[] = [];
  let quote: string | null = null;
  activity.questions.forEach((q, i) => {
    const picked = answers[i];
    if (q.kind === 'text') {
      if (typeof picked === 'string' && picked.trim()) quote = picked.trim();
      return;
    }
    if (typeof picked !== 'number') return;
    const line = q.options[picked]?.line;
    if (line) lines.push(line);
  });

  const name = firstName.trim();
  const praise = ARCHETYPE_PRAISE[archetype];
  const opening = ROLE_OPENING[role];
  return {
    greeting: name ? `Dear ${name},` : 'Dear friend,',
    archetype,
    archetypeTitle: ARCHETYPES[archetype],
    traits: ARCHETYPE_TRAITS[archetype],
    // praise first: the letter should land as warmth before it lands as weight
    paragraphs: opening ? [praise, opening, ...lines] : [praise, ...lines],
    praise,
    quote,
    closing: CLOSING,
    signature: 'Jessy',
    signatureSub: 'Jessica C. Oliver · UPC Echo Training',
  };
}
