import type { Module } from '@/lib/types';

/**
 * UPC 2 — Module 6: Grand Finale: From Science to Monday
 * Day 2 + whole-seminar send-off. The manual's written review (Learning
 * Assessment Competition) is replaced by a live, on-screen grand quiz
 * spanning both days. Facilitated by Jessica C. Oliver.
 */
export const module6: Module = {
  id: 'upc2-m6',
  course: 'upc2',
  number: 6,
  title: 'Grand Finale: From Science to Monday',
  tagline: 'Two days, one arc — and one promise you carry back to school.',
  minutes: 35,
  heroImage: '/images/upc2-m6/hero.jpg',
  images: ['/images/upc2-m6/concept.jpg'],
  slides: [
    {
      kind: 'title',
      kicker: 'Day 2 · Finale',
      title: 'Grand Finale: From Science to Monday',
      subtitle: 'Everything we learned — and what your school does with it now.',
      image: '/images/upc2-m6/hero.jpg',
      note: 'This is the championship round. Bring warmth and energy. Congratulate the room for finishing both days before you say anything else.',
    },
    {
      kind: 'statement',
      text: 'Two days, one arc. Day 1 taught us to build the fence. Day 2 showed us why the cliff is so steep.',
      attribution: 'Jessica C. Oliver',
      note: 'Pause after this. Day 1 gave the prevention science; Day 2 gave the biology that makes prevention urgent. Let them feel the two halves click together.',
    },
    {
      kind: 'recap',
      title: 'Day 2, in four breaths',
      points: [
        'Substances 101: four broad classes, each with its own grip on the body.',
        'The hijacked brain: addiction is a reward pathway captured, not a weak will.',
        'Stigma is the second disease — it keeps people from the help that works.',
        'Know the substances so you can spot risk early and speak with confidence.',
      ],
      note: 'One line each — do not re-teach. Ask the room to finish each sentence with you if energy allows.',
    },
    {
      kind: 'activity',
      activity: {
        id: 'upc2-m6-quiz-1',
        kind: 'quiz',
        title: 'The Grand Quiz — Two Days, One Championship',
        questions: [
          {
            prompt: 'What is the core goal of prevention science?',
            options: [
              'To punish those who use substances',
              'To stop the problem before it starts',
              'To treat addiction after it appears',
              'To frighten young people away from drugs',
            ],
            correct: 1,
            seconds: 20,
          },
          {
            prompt: 'When does substance use most often begin?',
            options: [
              'In middle age',
              'During early childhood',
              'During adolescence and the teen years',
              'After retirement',
            ],
            correct: 2,
            seconds: 20,
          },
          {
            prompt: 'What makes a prevention program "evidence-based"?',
            options: [
              'It is popular and widely shared online',
              'It has been tested and shown to work by research',
              'It relies on a powerful, scary story',
              'It was designed by a famous speaker',
            ],
            correct: 1,
            seconds: 20,
          },
          {
            prompt: 'In the school, the prevention coordinator mainly serves to:',
            options: [
              'Personally counsel every at-risk student alone',
              'Connect people, plans, and resources so prevention actually happens',
              'Police students and report them',
              'Replace the guidance counselor',
            ],
            correct: 1,
            seconds: 20,
          },
          {
            prompt: 'Alcohol and benzodiazepines (anti-anxiety medicines) both belong to which class?',
            options: ['Stimulants', 'Depressants', 'Hallucinogens', 'Opioids'],
            correct: 1,
            seconds: 20,
          },
          {
            prompt: 'What do addictive substances have in common inside the brain?',
            options: [
              'They all increase dopamine in the reward pathway',
              'They all shut down the reward pathway',
              'They only affect the muscles, not the brain',
              'They have no effect on brain chemistry',
            ],
            correct: 0,
            seconds: 20,
          },
          {
            prompt: 'Needing more of a substance to feel the same effect is called:',
            options: ['Dependence', 'Tolerance', 'Withdrawal', 'Recovery'],
            correct: 1,
            seconds: 20,
          },
          {
            prompt: 'Which phrase uses person-first language?',
            options: [
              '"An addict"',
              '"A junkie"',
              '"A person with a substance use disorder"',
              '"A drug abuser"',
            ],
            correct: 2,
            seconds: 20,
          },
          {
            prompt: 'Why does stigma make the drug problem worse?',
            options: [
              'It has no real effect on anyone',
              'It keeps people from seeking help that works',
              'It speeds up recovery',
              'It only affects the person, not the school',
            ],
            correct: 1,
            seconds: 20,
          },
        ],
      },
      note: 'This is the finale, on-screen and live. It REPLACES the manual\'s written Learning Assessment Competition. Nine questions span both days — UPC1 (prevention science, epidemiology, evidence, coordinator) then UPC2 (classes, reward pathway, tolerance, person-first, stigma). Celebrate the fastest correct answers; keep the championship energy high.',
    },
    {
      kind: 'activity',
      activity: {
        id: 'upc2-m6-confidence-after',
        kind: 'slider',
        phase: 'after',
        pairId: 'upc2-confidence',
        prompt: 'After two full days: how ready are you to lead prevention work in your school?',
        min: 1,
        max: 10,
        minLabel: 'Not ready yet',
        maxLabel: 'Fully ready',
      },
      note: 'The payoff reading. If a baseline was taken on Day 1, the stage shows the before → after shift. Name the growth out loud — this is proof the two days worked.',
    },
    {
      kind: 'activity',
      activity: {
        id: 'upc2-m6-cloud-1',
        kind: 'wordcloud',
        prompt: 'One thing your school will do differently this month.',
        maxWords: 3,
      },
      note: 'Read the biggest words aloud. This is their commitment, live on the wall. Tie a few back to specific moments from the two days.',
    },
    {
      kind: 'activity',
      activity: {
        id: 'upc2-m6-qna-1',
        kind: 'qna',
        prompt: 'Final open floor — ask Jessica anything before we close.',
      },
      note: 'The last chance. Answer honestly; if you do not know, say so and point them to a resource. Pull in any parked questions from earlier sessions.',
    },
    {
      kind: 'statement',
      text: 'The fence does not get built by this seminar. It gets built by the people in this room, on Monday morning.',
      attribution: 'Jessica C. Oliver',
      image: '/images/upc2-m6/concept.jpg',
      note: 'Thank them by name where you can. Make it clear the responsibility — and the power — now sits with them, not the trainer.',
    },
    {
      kind: 'statement',
      text: 'Maraming salamat. You came as teachers and nurses and counselors. You leave as the fence. Go build it.',
      attribution: 'Jessica C. Oliver — UPC 2, Complete',
      note: 'Certificate energy. Say it slowly, let the send-off land, then invite the applause. This is the final slide of the whole seminar — end on their names and their mission, not yours.',
    },
  ],
  notes: {
    timing: {
      hide: [
        'If very short on time: drop the confidence slider and go straight from the quiz to the wordcloud.',
        'The final send-off statement can be spoken over the closing applause rather than shown as its own beat.',
      ],
      summarize: [
        'Recap slide: read only the first two points aloud, let the room supply the rest.',
        'Q&A: answer two live, hand the rest to the follow-up contact.',
      ],
      emphasize: [
        'IMPORTANT: the manual\'s written Learning Assessment Competition is REPLACED by the live Grand Quiz on screen — no paper questions, no box. Say this to co-trainers before you start.',
        'The commitment wordcloud — this is the whole point of the finale. Do not rush it.',
        'The send-off — end on their names and their Monday, not on the trainer.',
      ],
    },
    fiveEs: {
      engage:
        'Open by asking the room to look around: two days ago, many did not know a depressant from a stimulant, or why stigma matters. Now they do. Ask a quick show of hands — "Who feels more ready than when they walked in?" Let the hands go up; that visible lift is the engagement. Name the arc out loud: Day 1 was the fence, Day 2 was the cliff. Tell them the finale is not a lecture but a championship — a chance to prove, together, how much the two days actually stuck.',
      explore:
        'Let the Grand Quiz do the exploring. Do not pre-teach the answers. Each question is a live self-check across both days — participants discover for themselves what landed and what is still fuzzy. When a question splits the room, pause on it for ten seconds and let a participant explain their reasoning before revealing the answer. The wrong answers are not failures; they are the last, cheap chance to correct a misunderstanding before everyone goes home and teaches it to a colleague.',
      explain:
        'After the quiz, tie the scattered questions back into one story: prevention science tells us to build the fence early (Day 1); the biology of the hijacked brain tells us exactly why the fence has to hold (Day 2); and person-first language plus fighting stigma is how we keep the gate open for anyone who slips. Keep it to ninety seconds. The explaining here is synthesis, not new content — you are handing them the single thread that ties two days into one usable idea they can repeat to their principal on Monday.',
      apply:
        'Move straight to the commitment wordcloud: "One thing your school will do differently this month." Insist on something concrete and small enough to actually happen — a huddle, a referral pathway, one policy line. Read the biggest words aloud and, for two or three, ask the person to say the specific first step. This turns two days of learning into a public, named commitment. A commitment spoken in front of peers is far more likely to survive the drive home than one kept quietly in a notebook.',
      evaluate:
        'The Grand Quiz is the summative check for the whole seminar — nine questions spanning both curricula. The confidence slider is the second measure: compare it against any Day 1 baseline to show growth in the room, not just in individuals. Together they answer the only question that matters: did two days change what these people can do? Close the loop by naming the shift you saw — "You came in at a five, you are leaving at an eight" — so the evaluation is felt, not just recorded on a form.',
    },
    examples: {
      head_teacher:
        'Monday morning: put a 15-minute prevention item on this week\'s Learning Action Cell agenda and name one teacher to own it.',
      nurse_dentist:
        'Monday morning: add person-first language to your intake notes — write "student with a substance concern," never "abuser" — and model it for the clinic staff.',
      counselor:
        'Monday morning: draft the referral steps for the School Mental Health Program so any teacher knows exactly where to send a worried case.',
      admin:
        'Monday morning: open a line in the Annual Implementation Plan for the school\'s NDEP prevention activities so the commitment has a budget, not just goodwill.',
    },
    policyAlignment: [
      {
        order: 'DepEd Order No. 37, s. 2017',
        connection:
          'The Comprehensive Drug Education Program (NDEP) expects each school to turn training into an action plan. The finale\'s commitment wordcloud is the seed of that plan — make it the first entry in the school\'s NDEP activity list for the year.',
      },
      {
        order: 'DepEd Order No. 37, s. 2017 (School Mental Health Program linkage)',
        connection:
          'The same order and its mental-health provisions require a clear referral pathway. Before leaving, coordinators should set up who receives a concern, who assesses it, and where it goes next — so a Monday-morning worry has somewhere to land.',
      },
    ],
    processingQuestions: [
      'Looking back at both days, which single idea most changed the way you will treat a student who is struggling?',
      'What is the one barrier most likely to stop your commitment from surviving the first busy week — and who in this room could help you get past it?',
    ],
  },
};
