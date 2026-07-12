import type { Module } from '@/lib/types';

/**
 * UPC 2 · Module 1 — Training Introduction, reframed for the Day 2 morning open.
 * Source: UPC_2_TRAINER.pdf (Curriculum 2: Physiology and Pharmacology for
 * Prevention Specialists), Module 1, pp. 30–67. Facts drawn only from the manual.
 */
export const module1: Module = {
  id: 'upc2-m1',
  course: 'upc2',
  number: 1,
  title: 'Welcome Back: Why the Brain Matters',
  tagline:
    'Day 1 gave us the science of prevention. Today we go inside the body and the brain — because you cannot prevent what you do not understand.',
  minutes: 20,
  heroImage: '/images/upc2-m1/hero.jpg',
  images: ['/images/upc2-m1/concept.jpg'],
  slides: [
    {
      kind: 'title',
      kicker: 'Day 2 · Opening',
      title: 'Welcome Back: Why the Brain Matters',
      subtitle:
        'Curriculum 2 — Physiology and Pharmacology for Prevention Specialists · with Jessica C. Oliver',
      image: '/images/upc2-m1/hero.jpg',
      note: 'Open with real warmth — magandang umaga! This is Day 2; the room already knows each other. Keep it to 60 seconds, high energy, then move. The goal is momentum, not a re-introduction.',
    },
    {
      kind: 'qr',
      title: 'Phones out — let us reconnect',
      note: 'Same session as yesterday. Give 60 seconds to rejoin. Most already have the tab open; help only the one or two who closed it. Do NOT re-explain the whole platform — just "scan and you are back in."',
    },
    {
      kind: 'activity',
      activity: {
        id: 'upc2-m1-poll-1',
        kind: 'poll',
        prompt: 'Quick Day-1 callback: what was the "fence at the top of the cliff"?',
        options: [
          'Prevention — stopping the problem before it starts',
          'Treatment — helping after the problem appears',
          'Punishment — consequences for those who use',
          'Aba, honestly? I need more kape before I remember',
        ],
        correct: 0,
      },
      note: 'Pure warm-up — laugh with whoever picks the coffee option. The point is re-activation, not assessment. Read the split aloud, celebrate the room remembering, then bridge: "Yesterday was the WHY. Today is the HOW — inside the body."',
    },
    {
      kind: 'bullets',
      title: 'Why this day exists',
      bullets: [
        'You cannot prevent what you do not understand.',
        'Today is about what substances actually do inside the body and the brain.',
        'Curriculum 2 goal: understand the physiology of addiction as a brain disease.',
        'Curriculum 2 goal: understand the pharmacology of psychoactive substances.',
        ],
      image: '/images/upc2-m1/concept.jpg',
      note: 'EMPHASIZE this slide — it is the hinge of the whole day. Land the first line slowly, let it sit. The two goals come straight from the Curriculum 2 training goals (manual Slide 1.30). Do not rush; everything after today rests on this framing.',
    },
    {
      kind: 'bullets',
      title: 'Where Day 2 takes us',
      bullets: [
        'Substances: what they are, how they reach the brain (routes of administration).',
        'Addiction science: why addiction is understood as a brain disease.',
        'Stigma: how our view of addiction can block people from getting help.',
        'Substance classes: the major groups and their effects on mood and behavior.',
      ],
      note: 'This is the roadmap for the modules ahead (manual pp. 66–67). Point to each stop as a journey, not a syllabus. Reassure: "You do not need a medical background — we build this together, step by step."',
    },
    {
      kind: 'activity',
      activity: {
        id: 'upc2-m1-cloud-1',
        kind: 'wordcloud',
        prompt: 'One word: what do you want to understand about addiction?',
        maxWords: 2,
      },
      note: 'Let the words populate for 60–90 seconds. Read the biggest ones aloud and promise where in the day each gets answered — "brain," "why," "relapse," "help." This becomes your informal agenda and shows you are listening.',
    },
    {
      kind: 'statement',
      text:
        'For the rest of today, you stop being an outsider to the science. You become someone who can explain what a substance does — and why prevention works.',
      attribution: 'Curriculum 2 · Physiology and Pharmacology for Prevention Specialists',
      note: 'The launch line. Say it with conviction, then go straight into Module 2 — no long pause, keep the morning moving. This is the handoff from "welcome back" to real content.',
    },
  ],
  notes: {
    timing: {
      hide: [
        'Housekeeping and logistics (restrooms, breaks, WiFi) — cover in one sentence only; the room already knows from Day 1.',
        'Ground-rules recap and confidentiality — do not re-read the newsprint; a quick "same rules as yesterday" is enough.',
        'The full ceremonial welcome and partner introductions from the manual — those were Day 1; skip entirely on Day 2.',
      ],
      summarize: [
        'The Day-2 map slide: name the four stops quickly, do not preview each module in depth — that is what the modules are for.',
        'The Curriculum 2 goals: state them once and move; the physiology/pharmacology detail unfolds across the day.',
      ],
      emphasize: [
        'The "why brain science for prevention" framing on "Why this day exists" — this is the load-bearing idea; give it the most time and energy.',
        'The bridge from Day 1 (the WHY of prevention) to Day 2 (the HOW inside the body) — make the connection explicit and repeat it.',
      ],
    },
    fiveEs: {
      engage:
        'Open with the Day-1 callback poll. Because the room already bonded yesterday, you can be playful immediately — greet them by name, react to the coffee-option votes, and let the laughter reset the energy. The moment the split appears on screen, use it: "You remembered the fence. Good. Yesterday we learned WHY prevention matters. Today we open the hood and look at HOW substances work inside a person." Keep this under three minutes; the aim is a warm, fast re-entry, not a formal restart.',
      explore:
        'Before you explain anything, run the wordcloud: "One word — what do you want to understand about addiction?" Let participants surface their own curiosity and gaps. Do not correct or filter their words; a nurse might type "tolerance," a counselor "relapse," an admin "policy." Their words reveal the mental models already in the room and give you a living agenda. Read the largest words aloud and connect each to where the day will address it. This makes the science feel like an answer to their questions rather than a lecture imposed on them.',
      explain:
        'Use "Why this day exists" to formally frame the day. State the principle plainly: you cannot prevent what you do not understand. Then name the two Curriculum 2 goals directly from the manual — understanding the physiology of addiction as a brain disease, and the pharmacology of psychoactive substances. Keep the explanation tight and confident; this slide is about orientation, not content delivery. Reassure participants that no medical background is required and that every term will be built up together. The detailed teaching happens in Modules 2 through 5 — here you are only setting the map.',
      apply:
        'Ask each participant to hold one concrete question for the day, tied to their own role. Prompt: "As you sit here this morning, what is the one thing about how substances affect the brain that would change how you do your job?" Have them jot it in their journal (the manual assigns a notebook for exactly this). You are not answering it now — you are giving them a personal thread to follow through every module, so the science stays anchored to their real work in schools and clinics.',
      evaluate:
        'The Day-1 callback poll is your quick check that yesterday landed — if most miss "prevention," spend an extra minute re-anchoring before moving on. The wordcloud is a second, informal read: it tells you the room\'s starting knowledge and where the anxiety or curiosity sits. Note any word that appears repeatedly and return to it explicitly later in the day so participants feel heard. No formal grading here; Day 2 opens with formative, low-stakes signals only.',
    },
    examples: {
      head_teacher:
        'You set the tone for how your school talks about students who use. Today\'s brain-disease framing gives you language to lead a staff huddle that is scientific, not moralizing — "this is physiology, not weakness."',
      nurse_dentist:
        'You already read bodies for a living — blood pressure, oral signs, sleep, appetite. Today connects that clinical eye to what substances do inside the brain and via different routes of administration, so your observations become early-warning prevention data, not just treatment notes.',
      counselor:
        'When a student or parent says "just stop," you will soon be able to explain why the brain makes that hard. Today\'s stigma and brain-disease content gives you the science to counsel with compassion and credibility.',
      admin:
        'Understanding the physiology behind substance use helps you defend budget lines and policies with evidence, not opinion — you become the person who can explain to stakeholders why prevention programming is a health investment.',
    },
    policyAlignment: [
      {
        order: 'DepEd Order No. 37, s. 2017',
        connection:
          'The Comprehensive Drug Education Program mandates drug education across all levels. Understanding the physiology and pharmacology of substances is the scientific foundation that makes that education accurate rather than fear-based.',
      },
      {
        order: 'DepEd School Mental Health Program',
        connection:
          'Framing addiction as a brain disease — and confronting stigma — aligns directly with the mental-health-and-wellbeing lens of the program, positioning school staff to respond with support instead of judgment.',
      },
    ],
    processingQuestions: [
      'Yesterday we learned WHY prevention matters. Why is it not enough — why do prevention workers also need to understand what happens inside the body and brain?',
      'Which of the four stops on today\'s map (substances, addiction science, stigma, substance classes) feels most useful for your specific role, and what do you hope to walk away able to explain?',
    ],
  },
};
