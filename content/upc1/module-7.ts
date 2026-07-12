import type { Module } from '@/lib/types';

/**
 * UPC 1 · Module 7 — Day 1 Grand Recap
 * Source: UPC_1_TRAINER.pdf pp. 519–530 ("Review: Application to Practice").
 * The manual's written small-group plan + review is adapted into a live
 * grand quiz, a commitment wordcloud, and a celebratory close of Day 1.
 */
export const module7: Module = {
  id: 'upc1-m7',
  course: 'upc1',
  number: 7,
  title: 'Day 1 Grand Recap',
  tagline: 'One day, one journey: from flood maps to fences to conductors — now prove it, then promise it.',
  minutes: 30,
  heroImage: '/images/upc1-m7/hero.jpg',
  images: ['/images/upc1-m7/concept.jpg'],
  slides: [
    {
      kind: 'title',
      kicker: 'Day 1 · Finale',
      title: 'Day 1 Grand Recap',
      subtitle: 'Everything you learned today — one game, one promise, one goodbye.',
      image: '/images/upc1-m7/hero.jpg',
      note: 'Bring the energy UP, not down — this is a finale, not a wind-down. Tell them: "Phones out. The last thirty minutes of Day 1 are a game, and the leaderboard remembers."',
    },
    {
      kind: 'statement',
      text: 'Today was one journey: we mapped the flood, we designed the fence, we found the levers, we chose only what works — and we learned who conducts the orchestra.',
      note: 'Deliver this slowly, counting the five stops on your fingers. This is the through-line of the whole day — if they remember one sentence tomorrow, it is this one. Pause, then say: "Let us see how much of that journey stayed with you."',
    },
    {
      kind: 'recap',
      title: 'The five big ideas of Day 1',
      points: [
        'Epidemiology maps the problem — who, where, how much — before we act.',
        'Prevention science engineers the fence: stop the harm before it starts.',
        'Risk and protective factors are the levers every program pulls.',
        'Only evidence-based programs deserve school time — good intentions are not enough.',
        'The prevention coordinator conducts: family, school, and community playing together.',
      ],
      note: 'Do not lecture these — call on five volunteers, one idea each, and ask them to say it back in their own words. Applaud each one. This warms the room up for the quiz.',
    },
    {
      kind: 'activity',
      activity: {
        id: 'upc1-m7-quiz-1',
        kind: 'quiz',
        title: 'The Grand Quiz: All of Day 1',
        questions: [
          {
            prompt: 'Epidemiology, in prevention work, is best described as…',
            options: [
              'Treating people who are already sick',
              'Mapping who is affected, where, and how much',
              'A list of banned substances',
              'A counseling technique',
            ],
            correct: 1,
            seconds: 20,
          },
          {
            prompt: 'The number of NEW cases appearing during a given period is called…',
            options: ['Prevalence', 'Incidence', 'Mortality', 'Morbidity'],
            correct: 1,
            seconds: 20,
          },
          {
            prompt: 'The primary goal of prevention science is to…',
            options: [
              'Punish those who use substances',
              'Scare the youth with worst-case stories',
              'Stop the problem before it starts',
              'Replace treatment programs',
            ],
            correct: 2,
            seconds: 20,
          },
          {
            prompt: 'In the fence-and-ambulance analogy, prevention is…',
            options: [
              'The ambulance at the bottom of the cliff',
              'The cliff itself',
              'The fence at the top of the cliff',
              'The hospital down the road',
            ],
            correct: 2,
            seconds: 20,
          },
          {
            prompt: 'Which of these is a PROTECTIVE factor?',
            options: [
              'Early exposure to alcohol at home',
              'A strong connection to school',
              'A peer group that uses substances',
              'No after-school activities',
            ],
            correct: 1,
            seconds: 20,
          },
          {
            prompt: 'Prevention programs work mainly by…',
            options: [
              'Reducing risk factors and strengthening protective factors',
              'Testing students for substances',
              'Removing at-risk students from class',
              'Giving one big lecture per year',
            ],
            correct: 0,
            seconds: 20,
          },
          {
            prompt: 'According to the UNODC International Standards, a program earns school time when…',
            options: [
              'It is free and easy to run',
              'The speaker is famous',
              'It uses dramatic, fear-based stories',
              'Evidence shows it actually works',
            ],
            correct: 3,
            seconds: 20,
          },
          {
            prompt: 'The prevention coordinator is best compared to…',
            options: [
              'A soloist performing alone',
              'A conductor keeping family, school, and community in tune',
              'A referee handing out penalties',
              'A spectator watching from the stands',
            ],
            correct: 1,
            seconds: 20,
          },
        ],
      },
      note: 'THE moment of the day. Narrate the leaderboard between questions like a sports commentator — "Table 3 is on fire!" Milk the final reveal: countdown, drumroll on the tables, then crown the champion with real applause. Keep it fast and generous; wrong answers get a cheer for bravery.',
    },
    {
      kind: 'statement',
      text: 'Tomorrow, we go inside: what these substances actually do inside the brain — and why the adolescent brain is the most important brain to protect.',
      image: '/images/upc1-m7/concept.jpg',
      note: 'This is the cliffhanger — say it like a movie trailer. Day 1 was the map and the fence; Day 2 is the biology. Tell them to come back curious, hindi takot (curious, not afraid).',
    },
    {
      kind: 'activity',
      activity: {
        id: 'upc1-m7-cloud-1',
        kind: 'wordcloud',
        prompt: 'One thing you will START doing Monday.',
        maxWords: 3,
      },
      note: 'The manual closes this course with each group presenting a prevention plan to take home — this wordcloud is that commitment, distilled. Read the biggest words aloud and attach names where volunteers allow: "Sino ang nagsulat ng \'listen\'? Tell us more." A commitment said aloud is a commitment kept.',
    },
    {
      kind: 'statement',
      text: 'Thank you for a brilliant Day 1. You came as teachers, nurses, counselors, and admins — you leave tonight as prevention workers. See you tomorrow.',
      attribution: 'Jessica C. Oliver, Day 1 Facilitator',
      note: 'The manual ends with a completion ceremony and applause — give them that moment now. Lead one big round of applause for the room, thank the quiz champion by name, remind them to exchange contact details with their tablemates (the manual asks for exactly this networking), and announce tomorrow\'s start time. End ON time — a punctual finale is part of the celebration.',
    },
  ],
  notes: {
    timing: {
      hide: [
        'If the day is running long, hide the Day-2 bridge statement — fold its one line into the closing thank-you instead.',
        'The recap volunteer round can be cut to a straight read-through of the five points (saves ~4 minutes).',
      ],
      summarize: [
        "The manual's written small-group exercise (a full community prevention plan, pp. 521–523) is REPLACED by the live grand quiz plus the Monday-commitment wordcloud — say this openly: \"The manual asks you to write a plan; instead, you will play for it and promise it.\" The full written plan belongs in the school's follow-through after training.",
        "The manual's paper evaluation form (p. 525) is summarized into the wordcloud moment; distribute the formal evaluation form as they exit rather than spending seated time on it.",
      ],
      emphasize: [
        'The grand quiz leaderboard reveal — it is the emotional payoff of the entire day; never rush it.',
        'The Monday-commitment wordcloud — a public commitment is the closest live equivalent of the manual\'s take-home plan.',
        'Ending exactly on time — the finale energy dies if the close drags.',
      ],
    },
    fiveEs: {
      engage:
        'A strong close begins by re-lighting the room, not dimming it. Open the finale with the one-sentence journey — flood maps, fences, levers, evidence, conductors — delivered on your fingers like a countdown. Then issue the challenge: "Everything from today is now a game, and the leaderboard remembers." The shift from learner to competitor wakes up even the 4:30 PM crowd. Engagement at the end of a day is not about new content; it is about giving them a reason to care about the content they already have.',
      explore:
        'Exploration in a recap module means letting participants rediscover the day in their own words before you restate it. The five-volunteer recap round does this: each volunteer must explain one big idea without notes, and the room hears five imperfect, personal versions of the day. Resist correcting them mid-sentence — small inaccuracies surface exactly the misconceptions the quiz will catch minutes later, and that sequence (say it wrong, see it corrected on the leaderboard) is where the learning locks in.',
      explain:
        'The explanation moment of this module lives between quiz questions. After each reveal, give one crisp sentence of "why" — why incidence is not prevalence, why the fence beats the ambulance, why evidence beats charisma. Keep every explanation under fifteen seconds; the manual\'s review session did this work as a discussion, and your job is the compressed, high-energy version. A recap that re-teaches at full length teaches the room that your summaries can be ignored.',
      apply:
        'Application is the wordcloud: one thing they will START doing Monday. This is the manual\'s take-home prevention plan shrunk to its actionable seed — assessment, program selection, and coordination all begin with one concrete Monday behavior. Push for verbs, not virtues: "listen" beats "commitment." When you read the biggest words aloud and invite owners to claim them, the room converts a training day into a set of witnessed promises — which is what application means when everyone goes home in ten minutes.',
      evaluate:
        'This module IS the evaluation of Day 1. The eight-question grand quiz is the formative measure — its per-question results show you tonight which module needs a two-minute refresher tomorrow morning. The wordcloud is the attitudinal measure: if the commitments are vague, the day informed but did not move. Close the loop honestly: tell participants what the leaderboard revealed about the room, and open Day 2 by re-asking the single most-missed question. Evaluation that feeds back into tomorrow is what separates a course from a ceremony.',
    },
    examples: {
      head_teacher:
        'Commitment example: "Starting Monday, I will open our weekly learning action cell with five minutes on one risk or protective factor we saw in class that week."',
      nurse_dentist:
        'Commitment example: "Starting Monday, I will add two protective-factor questions — sleep and family meals — to every student health interview I conduct."',
      counselor:
        'Commitment example: "Starting Monday, I will begin a running list of students showing multiple risk factors and book the first three for a check-in chat, hindi interrogation."',
      admin:
        'Commitment example: "Starting Monday, I will check whether our after-school activities have a budget line for next year — and draft the request if they do not."',
    },
    policyAlignment: [
      {
        order: 'DepEd Order No. 37, s. 2017',
        connection:
          'The National Drug Education Program requires schools to implement preventive drug education, not merely discuss it. Day 1 gave the science; the Monday commitments collected here are the first implementation step DO 37 asks for — turn the wordcloud into the opening agenda of your next school NDEP planning meeting.',
      },
      {
        order: 'DepEd Order No. 37, s. 2017 (coordination provisions)',
        connection:
          'DO 37 assigns clear school-level roles for drug education. The "coordinator as conductor" idea from today maps directly onto that structure: identify who in your school formally holds the coordination role, and hand them the participant commitments from this session as their starting inventory.',
      },
    ],
    processingQuestions: [
      'Looking back on the whole day, which single idea changed how you see your own role in the school — and what did you believe before?',
      'Your Monday commitment is now public. What is the first obstacle you expect to meet, and who in this room could help you past it?',
    ],
  },
};
