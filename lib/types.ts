export type Role =
  | 'head_teacher'
  | 'nurse_dentist'
  | 'counselor'
  | 'admin'
  // The Catalyst (symposium) audience — SSLG pairs, one of each per school.
  | 'student_leader'
  | 'adviser';

export const ROLES: Record<Role, string> = {
  head_teacher: 'Head Teacher',
  nurse_dentist: 'Nurse / Dentist',
  counselor: 'Guidance Counselor',
  admin: 'Admin Officer',
  student_leader: 'SSLG President',
  adviser: 'SSLG Adviser',
};

/** Roles offered on the join screen, per course. */
export const COURSE_ROLES: Record<string, Role[]> = {
  upc1: ['head_teacher', 'nurse_dentist', 'counselor', 'admin'],
  upc2: ['head_teacher', 'nurse_dentist', 'counselor', 'admin'],
  catalyst: ['student_leader', 'adviser'],
};

/**
 * Roles for a course id or session code (`UPC1`, `catalyst`, …). Anything
 * unrecognised (DEMO, a typo'd URL) gets the original adult four, so a student
 * role can never leak into a UPC session.
 */
export function rolesFor(course?: string): Role[] {
  return COURSE_ROLES[course?.toLowerCase() ?? ''] ?? COURSE_ROLES.upc1;
}

// --- Activities ---

export type PollActivity = {
  id: string;
  kind: 'poll';
  prompt: string;
  options: string[];
  correct?: number;
};

export type WordCloudActivity = {
  id: string;
  kind: 'wordcloud';
  prompt: string;
  maxWords?: number;
};

export type DragDropActivity = {
  id: string;
  kind: 'dragdrop';
  prompt: string;
  buckets: string[];
  /** bucket = index into buckets of the correct bucket */
  items: { label: string; bucket: number }[];
};

export type QuizQuestion = {
  prompt: string;
  options: string[];
  correct: number;
  seconds?: number;
};

export type QuizActivity = {
  id: string;
  kind: 'quiz';
  title: string;
  questions: QuizQuestion[];
};

export type SliderActivity = {
  id: string;
  kind: 'slider';
  prompt: string;
  phase: 'before' | 'after';
  /** links the before/after pair */
  pairId: string;
  min: number;
  max: number;
  minLabel?: string;
  maxLabel?: string;
};

export type QnaActivity = {
  id: string;
  kind: 'qna';
  prompt: string;
};

/**
 * Beat the Brain. The participant taps for a shrinking reward while the urge
 * meter climbs; at TOLERANCE_TAPS the card names what they just felt.
 * Payload: `{ taps, peakReward, finalReward, seconds }`.
 */
export type ToleranceActivity = {
  id: string;
  kind: 'tolerance';
  title: string;
  /** button label, e.g. "TAP" */
  tapLabel: string;
  /** shown full-screen once the curve has crossed */
  revealHeadline: string;
  revealBody: string;
};

/**
 * Closing feedback for the trainer. Star-rated dimensions plus one free-text
 * box. Payload: `{ stars: Record<dimensionId, 1..5>, comment: string }`.
 * The stage shows averages only — comments are for the dashboard and the CSV,
 * never the projector.
 */
export type FeedbackActivity = {
  id: string;
  kind: 'feedback';
  title: string;
  intro?: string;
  dimensions: { id: string; label: string }[];
  commentPrompt: string;
  commentPlaceholder?: string;
};

/**
 * Build Your Barkada — each SSLG pair drafts a 90-day commitment. Prompts
 * differ by role: the student names the activity, the adviser names what they
 * will sign, fund, or unblock. Payload: `{ school, commitment, when }`.
 */
export type PlanActivity = {
  id: string;
  kind: 'plan';
  title: string;
  intro?: string;
  schoolPrompt: string;
  prompts: { student_leader: string; adviser: string };
  whenPrompt: string;
  /** e.g. ['Within 2 weeks', 'This quarter', 'Before December'] */
  whenOptions: string[];
};

// --- Reflection → personalised letter ---

export type Archetype =
  | 'fence_builder'
  | 'first_responder'
  | 'bridge'
  | 'truth_teller'
  | 'anchor'
  | 'igniter';

export const ARCHETYPES: Record<Archetype, string> = {
  fence_builder: 'The Fence-Builder',
  first_responder: 'The First Responder',
  bridge: 'The Bridge',
  truth_teller: 'The Truth-Teller',
  anchor: 'The Anchor',
  igniter: 'The Igniter',
};

export type ReflectionOption = {
  label: string;
  /** archetype points awarded when chosen */
  weight?: Partial<Record<Archetype, number>>;
  /**
   * Sentence woven into the letter when chosen. Options carry their own prose
   * so the composer never has to know which question index meant what —
   * add/reorder questions freely without touching lib/letter.ts.
   */
  line?: string;
};

export type ReflectionQuestion =
  | { kind: 'choice'; prompt: string; options: ReflectionOption[] }
  /** free text, quoted verbatim in the letter */
  | { kind: 'text'; prompt: string; placeholder?: string; maxLength?: number };

export type ReflectionActivity = {
  id: string;
  kind: 'reflection';
  title: string;
  intro?: string;
  questions: ReflectionQuestion[];
};

export type Activity =
  | PollActivity
  | WordCloudActivity
  | DragDropActivity
  | QuizActivity
  | SliderActivity
  | QnaActivity
  | ToleranceActivity
  | FeedbackActivity
  | ReflectionActivity
  | PlanActivity;

// --- Slides ---

type SlideBase = {
  /** per-slide presenter note */
  note?: string;
};

export type Slide = SlideBase &
  (
    | { kind: 'welcome'; dayLabel: string; title: string; subtitle?: string; presenter: string } // animated walk-in/hold screen
    | { kind: 'title'; kicker?: string; title: string; subtitle?: string; image?: string }
    | { kind: 'statement'; text: string; attribution?: string; image?: string }
    | {
        kind: 'finale';
        headline: string;
        text: string;
        attribution?: string;
        badge?: string;
        image?: string;
      } // closing send-off: letter-by-letter headline, embers, shimmer
    | { kind: 'stat'; value: string; label: string; context?: string; source?: string }
    | { kind: 'bullets'; title: string; bullets: string[]; image?: string }
    | { kind: 'image'; image: string; caption?: string }
    | { kind: 'analogy'; title: string; front: string; back: string; image?: string } // click-to-flip card
    | { kind: 'recap'; title: string; points: string[] }
    | { kind: 'activity'; activity: Activity }
    | { kind: 'qr'; title?: string } // renders join QR for the session
  );

// --- Facilitator notes ---

export type FiveEs = {
  engage: string;
  explore: string;
  explain: string;
  apply: string;
  evaluate: string;
};

export type FacilitatorNotes = {
  timing: {
    hide: string[];
    summarize: string[];
    emphasize: string[];
  };
  fiveEs: FiveEs;
  examples: Partial<Record<Role, string>>;
  policyAlignment: { order: string; connection: string }[];
  processingQuestions: string[];
};

export type Module = {
  id: string;
  course: 'upc1' | 'upc2' | 'catalyst';
  number: number;
  title: string;
  tagline: string;
  minutes: number;
  heroImage?: string;
  images?: string[];
  analogy?: { title: string; front: string; back: string };
  slides: Slide[];
  notes: FacilitatorNotes;
};
