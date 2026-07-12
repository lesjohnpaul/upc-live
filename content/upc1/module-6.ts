import type { Module } from '@/lib/types';

/**
 * UPC 1 · Module 6 — Your Role: The Prevention Coordinator
 * Source: UPC_1_TRAINER.pdf, Module 6 (manual pp. 411–508), adapted for
 * DepEd NDEP Coordinators. "Prevention Manager and Supervisor" is mapped
 * onto the school NDEP Coordinator role throughout.
 */
export const module6: Module = {
  id: 'upc1-m6',
  course: 'upc1',
  number: 6,
  title: 'Your Role: The Prevention Coordinator',
  tagline: 'You are not the program. You are the conductor — of teachers, nurses, counselors, and admin, playing one score.',
  minutes: 40,
  heroImage: '/images/upc1-m6/hero.jpg',
  images: ['/images/upc1-m6/analogy.jpg', '/images/upc1-m6/concept.jpg'],
  analogy: {
    title: 'Ang Konduktor ng Orkestra',
    front:
      'A conductor walks on stage holding no instrument. The violinists, the drummers, the flutists — they make every sound. So why does the orchestra fall apart without the conductor?',
    back:
      'Because the conductor decides whether the music works: who plays, when, how loud, in what order — all reading one score. The NDEP Coordinator does not deliver every lesson. You bring teachers, the nurse, the counselor, and admin into one prevention score — and keep them in time.',
  },
  slides: [
    {
      kind: 'title',
      kicker: 'Day 1 · Module 6',
      title: 'Your Role: The Prevention Coordinator',
      subtitle: 'The UPC calls this role the "Prevention Manager and Supervisor." In your school, that is you — the NDEP Coordinator.',
      image: '/images/upc1-m6/hero.jpg',
      note: 'This module is about THEM, not about theory. Name it early: "Everything today has been building to this — your job." The UPC term is Prevention Manager and Supervisor; keep translating it to "NDEP Coordinator" every time it appears.',
    },
    {
      kind: 'statement',
      text: 'You are not the program. You are the conductor.',
      note: 'Let this sit for a full 5 seconds. Many coordinators burn out trying to personally deliver every symposium and every module. This sentence gives them permission to stop — and reframes their real job. Do not explain it yet; the analogy slide will.',
    },
    {
      kind: 'activity',
      activity: {
        id: 'upc1-m6-poll-1',
        kind: 'poll',
        prompt: 'What eats most of your NDEP time today?',
        options: [
          'Paperwork — reports, accomplishment forms, documentation',
          'Chasing people — getting teachers and partners to show up',
          'Delivering everything myself — I am the whole program',
          'Hunting for budget, materials, and admin support',
        ],
      },
      note: 'No correct answer — this is a mirror, not a quiz. Read the biggest bar aloud and connect it: "Notice that none of these options is prevention itself. That is the coordinator\'s paradox — and today we fix the score, not the musicians." Keep the result on screen 30 seconds.',
    },
    {
      kind: 'activity',
      activity: {
        id: 'upc1-m6-slider-before',
        kind: 'slider',
        phase: 'before',
        pairId: 'upc1-m6-confidence',
        prompt: 'Right now: how confident are you leading your school\'s NDEP as its coordinator?',
        min: 1,
        max: 10,
        minLabel: 'Just starting',
        maxLabel: 'Ready to lead',
      },
      note: 'Baseline reading — required for the matching "after" slider at the end of this module. Reassure the room that low numbers are normal and anonymous; most coordinators inherited the role with no orientation.',
    },
    {
      kind: 'analogy',
      title: 'Ang Konduktor ng Orkestra',
      front:
        'A conductor walks on stage holding no instrument. The violinists, the drummers, the flutists — they make every sound. So why does the orchestra fall apart without the conductor?',
      back:
        'Because the conductor decides whether the music works: who plays, when, how loud, in what order — all reading one score. The NDEP Coordinator does not deliver every lesson. You bring teachers, the nurse, the counselor, and admin into one prevention score — and keep them in time.',
      image: '/images/upc1-m6/analogy.jpg',
      note: 'The anchor of the module. Before flipping, ask a volunteer to guess the answer. After flipping, ask: "Sino ang mga musikero sa school ninyo?" Collect 3-4 answers — you will reuse them on the stakeholders slide. UPC frames this role as the "face and voice of prevention" in the community (manual p. 416).',
    },
    {
      kind: 'bullets',
      title: 'The score: your four tasks as coordinator',
      bullets: [
        'Assess the problem — know the nature and extent of risk in YOUR school before choosing any activity.',
        'Inventory your resources — people, time, skills, partners, and programs already available.',
        'Select and implement — choose evidence-based prevention that fits the need, not just the tradition.',
        'Monitor and evaluate — check the music while it plays, and adjust.',
      ],
      image: '/images/upc1-m6/concept.jpg',
      note: 'Straight from the UPC primary tasks (manual pp. 429-430): assessment, community resources, selecting programming and implementation, monitoring and evaluation. Land the contrast: most schools start at task 3 (an activity someone liked) and skip 1, 2, and 4. The conductor reads the whole score, not one page.',
    },
    {
      kind: 'bullets',
      title: 'The craft: four skills of a conductor',
      bullets: [
        'Technical — you know prevention science; that is what this training builds.',
        'Human relations — you get busy, skeptical people to play together.',
        'Conceptual — you see how each activity connects to the whole score.',
        'Decision-making — you weigh the information and call it, section by section.',
      ],
      note: 'The UPC supervisory skills (manual p. 427). Communication runs through all four: listen to your audience, analyze what you see, write and speak in language fitted to each listener — principal, parent, or student (pp. 436-437). Ask: "Which of the four is your weakest? That is your professional development target."',
    },
    {
      kind: 'bullets',
      title: 'The ethics of the podium',
      bullets: [
        'Know your limits — coordinate and refer; do not counsel or diagnose beyond your competence.',
        'Do no harm — an activity that shames a learner is worse than no activity.',
        'Confidentiality — anything a learner discloses is safeguarded, never gossip, never announced.',
        'Non-stigmatizing language — "a learner who needs support," never "adik" or "problem student."',
      ],
      note: 'EMPHASIZE — this is the heart of the module. UPC ethics codes share four elements: scope of competency, do no harm, confidentiality, integrity (manual p. 482). Confidentiality covers even verbal disclosures and unsecured records (p. 501). Make it concrete: a student\'s disclosure repeated in the faculty room is an ethics breach, not chismis. Words either open a referral pathway or slam it shut.',
    },
    {
      kind: 'bullets',
      title: 'Your orchestra: who plays which part',
      bullets: [
        'Inside the school — advisers and head teachers, the nurse and clinic, guidance, admin and the child protection committee.',
        'The families — parents and guardians reinforce the melody at home.',
        'The barangay — officials, health workers, and community groups extend the fence beyond the gate.',
        'Your job — one score, agreed roles, regular rehearsal. Not solo performances.',
      ],
      note: 'UPC stakeholder mapping (pp. 438-444): effective partnerships need leadership, membership, structure, and shared vision — and each stakeholder joins for THEIR reason, so shape the invitation to their interest. The nurse hears "health data," the barangay hears "community safety," parents hear "my child protected." Same score, different invitations.',
    },
    {
      kind: 'activity',
      activity: {
        id: 'upc1-m6-qna-1',
        kind: 'qna',
        prompt: 'What\'s the hardest part of YOUR coordinator role? Ask anything.',
      },
      note: 'The most personal moment of Day 1 — give it real time. Expect: "no budget," "no one attends my meetings," "the principal gives me other loads," "I inherited this with zero turnover." Answer 2-3 live using the four tasks and the stakeholder framing; park the rest for the open forum. Never dismiss a struggle — validate first, then reframe as a coordination problem with a next step.',
    },
    {
      kind: 'recap',
      title: 'The coordinator, in one breath',
      points: [
        'You are the conductor: you orchestrate prevention, you do not perform every part.',
        'Four tasks: assess, inventory resources, select and implement, monitor and evaluate.',
        'Ethics is the podium: confidentiality and respectful language are non-negotiable.',
        'One score, many musicians: teachers, nurse, counselor, admin, parents, barangay.',
      ],
      note: 'Read the four points with the room, echoing the poll from the start: "Whatever ate your time this morning — the score is how you take it back." Then bridge to the quiz: "Prove to yourselves you own this."',
    },
    {
      kind: 'activity',
      activity: {
        id: 'upc1-m6-quiz-1',
        kind: 'quiz',
        title: 'Recap quiz: The conductor\'s test',
        questions: [
          {
            prompt: 'The Grade 9 advisers propose a big anti-drug poster contest. As coordinator, your FIRST move is to:',
            options: [
              'Approve it — any prevention activity helps',
              'Check what the assessment says your learners actually need',
              'Ask the police to judge the contest',
              'Deliver a lecture during the awarding instead',
            ],
            correct: 1,
            seconds: 20,
          },
          {
            prompt: 'A teacher tells you a learner disclosed a family member\'s drug use during an NDEP session. You should:',
            options: [
              'Share it at the faculty meeting so everyone can watch the learner',
              'Post a general warning to parents in the group chat',
              'Safeguard the information and refer through the guidance counselor',
              'Call the learner out privately to confirm the story',
            ],
            correct: 2,
            seconds: 20,
          },
          {
            prompt: 'Which is non-stigmatizing language for a coordinator to use?',
            options: [
              '"Yung mga adik sa Section B"',
              '"The problem students we monitor"',
              '"A learner at risk who needs our support"',
              '"The users\' list"',
            ],
            correct: 2,
            seconds: 20,
          },
          {
            prompt: 'In the conductor analogy, the coordinator\'s core job is to:',
            options: [
              'Play every instrument better than the musicians',
              'Bring the stakeholders into one coordinated prevention plan',
              'Replace musicians who miss a note',
              'Perform a solo when the orchestra is busy',
            ],
            correct: 1,
            seconds: 20,
          },
        ],
      },
      note: 'Formative, not graded — celebrate speed and streaks. Q2 and Q3 are the ethics checks; if either splits the room, stop and reteach from the ethics slide before moving on. These two behaviors are the ones that protect children on Monday.',
    },
    {
      kind: 'activity',
      activity: {
        id: 'upc1-m6-slider-after',
        kind: 'slider',
        phase: 'after',
        pairId: 'upc1-m6-confidence',
        prompt: 'Now: how confident are you leading your school\'s NDEP as its coordinator?',
        min: 1,
        max: 10,
        minLabel: 'Just starting',
        maxLabel: 'Ready to lead',
      },
      note: 'The payoff — the stage shows the before → after shift live. Narrate the movement, however small: "That gap is what one module did. Imagine what the rest of the course does." Close warm: they walked in as designated coordinators; they walk out as conductors.',
    },
  ],
  notes: {
    timing: {
      hide: [
        'UPC organizational supervision detail — organizing, staffing, hiring, and controlling employees (manual pp. 426-427). School coordinators do not hire staff; fold "leading and monitoring people" into the four-skills slide note instead.',
        'The EMCDDA and IC&RC competency standards frameworks by name (pp. 421-424) — keep the competencies, drop the acronyms.',
        'The nine stages of community readiness (p. 446) — interesting but a full model too many for 40 minutes.',
      ],
      summarize: [
        'Barriers to partnerships (pp. 447-448): compress to one spoken line — "partnerships fail from conflict, turnover, and missing resources — so put structure and agreed roles in writing."',
        'The White and Popovits list of seventeen values (pp. 489-490): name only the four that survive on the ethics slide; offer the full list as a handout reference.',
        'Communication sub-skills (listening, analyzing, writing, speaking, pp. 436-437): narrate inside the four-skills slide rather than giving them their own slide.',
      ],
      emphasize: [
        'The ethics slide — confidentiality and non-stigmatizing language. If the day runs short, cut anything else before this. Re-teach on the spot if quiz Q2 or Q3 splits the room.',
        'The stakeholder-coordination slide — the shift from "I deliver everything" to "I orchestrate everyone" is the module\'s behavior change.',
        'The conductor analogy ("Ang Konduktor ng Orkestra") — return to it on every slide; it carries the whole module.',
        'The before-slider is required early — the closing after-slider has no payoff without it.',
      ],
    },
    fiveEs: {
      engage:
        'Open with the statement slide — "You are not the program. You are the conductor." — then immediately run the time poll. The poll makes the module personal within three minutes: every coordinator in the room recognizes their own week in those four options. Read the winning bar aloud and promise that by the end of the module they will know how to take that time back. Do not explain the conductor line yet; curiosity about it powers the next ten minutes until the analogy card resolves it.',
      explore:
        'At the analogy slide, before flipping the card, let the room wrestle with the riddle: why does an orchestra with excellent musicians still need someone holding no instrument? Then ask seatmates to list their school\'s "musicians" — who actually touches prevention in their campus — for two minutes. Collect answers on the board without correcting anything. Their raw lists (usually missing parents and the barangay) become the gap you name later on the stakeholders slide, so their own omissions do the teaching.',
      explain:
        'The three content beats carry the formal teaching. Name the four coordinator tasks from the UPC — assess, inventory resources, select and implement, monitor and evaluate — and be explicit that this is the international standard for the role DepEd calls NDEP Coordinator. Then the four skills, then the ethics slide. On ethics, slow down: define confidentiality as covering even verbal disclosures, and model the language swap out loud — say the stigmatizing phrase once, replace it, and never say it again.',
      apply:
        'The Q&A activity is the application: "What\'s the hardest part of YOUR coordinator role?" Take real problems from the floor and publicly work 2-3 of them through the module\'s tools — is this an assessment gap, a resource gap, a stakeholder-invitation problem, or an ethics line? Then ask each participant to write one sentence: the first stakeholder they will invite into their orchestra next week, and the invitation framed to that person\'s interest. That sentence is homework they take to Module 7.',
      evaluate:
        'Three instruments, in order. The four-question recap quiz checks the concepts — watch Q2 (confidentiality referral) and Q3 (non-stigmatizing language) specifically; a split room there means re-teach before proceeding. The after-slider closes the confidence pair opened before the analogy and shows the room its own growth. And the Q&A submissions are your qualitative read: if questions are still "how do I do everything alone?", the orchestration reframe has not landed and needs one more pass at the recap.',
    },
    examples: {
      head_teacher:
        'You are the first violins — the section the rest of the orchestra follows. When the coordinator sets the score, your part is embedding prevention into instruction: homeroom time, integration in subjects, and your learning action cell. One agreement with the coordinator per quarter — which weeks, which classes, which message — and the biggest section of the orchestra plays in time.',
      nurse_dentist:
        'You are the woodwinds — quieter, but you carry the melody others miss. Your clinic sees the early signs first: sleep problems, unexplained absences, health complaints that cluster. Feed anonymized patterns to the coordinator as assessment data, and be the trusted referral point when a screening conversation is needed. No one else in the orchestra can play your part.',
      counselor:
        'You are the soloist the whole score protects. Every ethics rule in this module — confidentiality, non-stigmatizing language, referral over exposure — is the pathway that ends at your door. Agree with the coordinator on a written referral protocol: who refers, how it stays confidential, what happens next. When teachers know the pathway, disclosures become help instead of gossip.',
      admin:
        'You are the percussion — you keep the tempo, and nothing moves without you. Calendars, budget lines, permits for parent sessions, and the memo that makes an NDEP meeting official instead of optional. When the coordinator brings the score, your part is making it executable: a schedule slot, a budget line in the AIP, and the paper trail that lets the music continue next year.',
    },
    policyAlignment: [
      {
        order: 'DepEd Order No. 37, s. 2017',
        connection:
          'The National Drug Education Program assigns schools a designated NDEP Coordinator to plan, implement, and monitor preventive drug education. Module 6\'s four coordinator tasks — assess, inventory resources, select and implement, monitor and evaluate — are the international (UPC) blueprint for exactly the duties this order assigns.',
      },
      {
        order: 'DepEd Order No. 40, s. 2012',
        connection:
          'The Child Protection Policy\'s school committee already convenes the same orchestra — school head, teachers, guidance, parents, and community representatives. The NDEP Coordinator should coordinate with, not duplicate, this committee: shared membership, shared confidentiality rules, one referral pathway for learners at risk.',
      },
      {
        order: 'DepEd School Mental Health Program',
        connection:
          'The module\'s ethics beat — safeguard disclosures, use non-stigmatizing language, refer instead of expose — is the front end of the school mental health referral pathway. The coordinator\'s job is ensuring every teacher knows the route: adviser to guidance counselor to appropriate services, with confidentiality intact at every hand-off.',
      },
    ],
    processingQuestions: [
      'Think of your last school year as NDEP Coordinator: which of the four tasks — assess, inventory resources, select and implement, monitor and evaluate — did you actually do, and which did you skip? What did skipping it cost?',
      'Who is the one "musician" missing from your school\'s orchestra right now, and what invitation — framed to THEIR interest, not yours — would bring them in this month?',
    ],
  },
};
