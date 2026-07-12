export type Role = 'head_teacher' | 'nurse_dentist' | 'counselor' | 'admin';

export const ROLES: Record<Role, string> = {
  head_teacher: 'Head Teacher',
  nurse_dentist: 'Nurse / Dentist',
  counselor: 'Guidance Counselor',
  admin: 'Admin Officer',
};

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

export type Activity =
  | PollActivity
  | WordCloudActivity
  | DragDropActivity
  | QuizActivity
  | SliderActivity
  | QnaActivity;

// --- Slides ---

type SlideBase = {
  /** per-slide presenter note */
  note?: string;
};

export type Slide = SlideBase &
  (
    | { kind: 'title'; kicker?: string; title: string; subtitle?: string; image?: string }
    | { kind: 'statement'; text: string; attribution?: string; image?: string }
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
  examples: Record<Role, string>;
  policyAlignment: { order: string; connection: string }[];
  processingQuestions: string[];
};

export type Module = {
  id: string;
  course: 'upc1' | 'upc2';
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
