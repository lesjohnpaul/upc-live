import type { Module } from '@/lib/types';

/**
 * UPC 1 · Module 4 — Monitoring & Evaluation
 * Source: UPC_1_TRAINER.pdf pp. 251–316 (Module 4: Introduction to Monitoring
 * and Evaluation: Key to Prevention Research).
 */
export const module4: Module = {
  id: 'upc1-m4',
  course: 'upc1',
  number: 4,
  title: 'Monitoring & Evaluation',
  tagline: 'How do we know our prevention program actually worked? Keep a class record.',
  minutes: 45,
  heroImage: '/images/upc1-m4/hero.jpg',
  images: ['/images/upc1-m4/hero.jpg', '/images/upc1-m4/analogy.jpg', '/images/upc1-m4/concept.jpg'],
  analogy: {
    title: 'Ang Class Record',
    front:
      'A good teacher never waits for the final exam to find out who is struggling. Quizzes, seatwork, recitation — the class record tells the story while there is still time to act.',
    back:
      'Prevention programs need a class record too. Monitoring is the quizzes and seatwork: did we deliver the sessions, who attended, did we follow the guide? Evaluation is the final grade: did attitudes and behavior actually change? Kung walang class record, hulaan lang.',
  },
  slides: [
    {
      kind: 'title',
      kicker: 'Day 1 · Module 4',
      title: 'Monitoring & Evaluation',
      subtitle: 'How do we know our prevention program actually worked?',
      image: '/images/upc1-m4/hero.jpg',
      note: 'Bridge from Module 3: we have chosen what to do — this module asks how we will know it worked. Set an honest, non-threatening tone: M&E is not an audit of teachers, it is a tool for teachers.',
    },
    {
      kind: 'statement',
      text: 'A program can feel inspiring, gather a full gymnasium, earn certificates — and still change nothing. Scare-tactic assemblies taught us that feelings are not findings.',
      note: 'The hook. Recall the Module 2/3 lesson on scare tactics: emotionally powerful, evidence says ineffective. Pause, then ask the room: how would we even know the difference between a program that feels good and one that works?',
    },
    {
      kind: 'activity',
      activity: {
        id: 'upc1-m4-poll-1',
        kind: 'poll',
        prompt: 'How does your school currently know if a prevention activity worked?',
        options: [
          'Attendance sheets and photos for the report',
          'Feedback forms right after the activity',
          'We compare student surveys before and after',
          'Honestly — we do not really check',
        ],
      },
      note: 'No correct answer — this is a mirror, not a test. Expect most votes on attendance/photos. Name it kindly: that is monitoring evidence, and it matters, but it cannot tell us if anything changed. That gap is today’s topic.',
    },
    {
      kind: 'activity',
      activity: {
        id: 'upc1-m4-slider-before',
        kind: 'slider',
        phase: 'before',
        pairId: 'upc1-m4-confidence',
        prompt: 'How confident are you that you could explain monitoring vs evaluation to your school head?',
        min: 1,
        max: 10,
        minLabel: 'Just starting',
        maxLabel: 'Ready to teach it',
      },
      note: 'Baseline reading — point out the irony out loud: this slider IS a pre-test. We are doing a one-group pre-test/post-test evaluation on ourselves today. We repeat it at the end of the module.',
    },
    {
      kind: 'analogy',
      title: 'Ang Class Record',
      front:
        'A good teacher never waits for the final exam to find out who is struggling. Quizzes, seatwork, recitation — the class record tells the story while there is still time to act.',
      back:
        'Prevention programs need a class record too. Monitoring is the quizzes and seatwork: did we deliver the sessions, who attended, did we follow the guide? Evaluation is the final grade: did attitudes and behavior actually change? Kung walang class record, hulaan lang.',
      image: '/images/upc1-m4/analogy.jpg',
      note: 'The anchor for the whole module. Ask a teacher to explain it back before flipping the card. Every technical term today maps to something they already do daily with a class record.',
    },
    {
      kind: 'bullets',
      title: 'Monitoring: the quizzes and seatwork',
      bullets: [
        'Monitoring (process evaluation) asks: what did we do, and how much?',
        'Who participated? Who delivered it? Was it delivered as intended?',
        'It runs continuously, while the program is happening — not after.',
        'The manual is emphatic: monitor even when no outcome evaluation is planned.',
      ],
      note: 'Manual pp. 268, 271: process evaluation/monitoring documents delivery and is "very important EVEN WHEN AN EVALUATION IS NOT PLANNED." For DepEd this is the everyday paper trail: attendance, session logs, activity completion reports.',
    },
    {
      kind: 'bullets',
      title: 'Evaluation: the final grade',
      bullets: [
        'Outcome evaluation asks: did we achieve what we wanted to achieve?',
        'It measures change in knowledge, attitudes, intentions, and behavior.',
        'Compares those who received the program with how they started — or with those who did not.',
        'The long-term outcome we care about: reduced or prevented substance use.',
      ],
      note: 'Manual pp. 253, 269. Keep the pairing tight: monitoring = what we did; evaluation = what changed. Mention the simplest design a school can run — the one-group pre-test/post-test (manual p. 287) — the same survey before and after the program.',
    },
    {
      kind: 'bullets',
      title: 'Indicators and fidelity: what the class record tracks',
      bullets: [
        'An indicator is a measurable sign of progress — a number tied to a question.',
        'Process indicators: sessions delivered, learners reached, facilitators trained.',
        'Outcome indicators: change in attitudes, intentions, reported behavior.',
        'Fidelity: was the program delivered as designed — right content, dose, and method?',
      ],
      image: '/images/upc1-m4/concept.jpg',
      note: 'Manual pp. 253, 266, 268: dosage, implementation fidelity, and "was the intervention implemented as intended" are core process questions, and fidelity of delivery is linked to outcomes. Classroom translation: a quiz only works if you actually taught the lesson it tests, the way it was designed to be taught.',
    },
    {
      kind: 'bullets',
      title: 'Data is for deciding, not just reporting',
      bullets: [
        'Measure what matters: be explicit about what counts and how it is counted.',
        'Numbers say how much; words say why — you need both to read the situation.',
        'Low attendance? Weak fidelity? Adjust the program while it runs.',
        'No evaluation is complete until the results reach the people who decide.',
      ],
      note: 'Manual pp. 297 (measurements must be carefully defined), 299–301 (quantitative and qualitative both needed), 309 (reporting results completes the evaluation). Punchline for the room: an M&E form that no one reads back is just paperwork — the class record exists so the teacher can act.',
    },
    {
      kind: 'activity',
      activity: {
        id: 'upc1-m4-drag-1',
        kind: 'dragdrop',
        prompt: 'Class record time: is each item Monitoring or Evaluation?',
        buckets: ['Monitoring', 'Evaluation'],
        items: [
          { label: 'Attendance sheet from every NDEP session', bucket: 0 },
          { label: 'Comparing student attitude surveys before and after the program', bucket: 1 },
          { label: 'Checklist: were all 8 sessions delivered as scheduled?', bucket: 0 },
          { label: 'Fewer learners reporting intent to try alcohol at year end', bucket: 1 },
          { label: 'Log of who facilitated each session and how long it ran', bucket: 0 },
          { label: 'Did learners’ refusal skills actually improve?', bucket: 1 },
        ],
      },
      note: 'The test: "what/how much did we do" = Monitoring; "what changed" = Evaluation. Expect debate on the sessions checklist — that is fidelity, squarely monitoring. Praise wrong answers; the confusion is exactly why the two get merged in reports.',
    },
    {
      kind: 'recap',
      title: 'The class record, in one breath',
      points: [
        'A program that feels good is not the same as a program that works.',
        'Monitoring = quizzes and seatwork: what we did, who we reached, fidelity to the design.',
        'Evaluation = the final grade: did knowledge, attitudes, and behavior change?',
        'Monitor always — even without a formal evaluation — and use the data to decide.',
      ],
      note: 'Read the points with the room. Bridge forward: Module 5 (International Standards) is built on programs that passed exactly this kind of evaluation.',
    },
    {
      kind: 'activity',
      activity: {
        id: 'upc1-m4-quiz-1',
        kind: 'quiz',
        title: 'Quick check: Monitoring & Evaluation',
        questions: [
          {
            prompt: 'Which question belongs to monitoring (process evaluation)?',
            options: [
              'Did substance use go down?',
              'What did we do, and how much of it?',
              'Was the program worth its cost?',
              'Which program is more effective?',
            ],
            correct: 1,
            seconds: 20,
          },
          {
            prompt: 'Outcome evaluation mainly asks whether…',
            options: [
              'the budget was fully spent',
              'the sessions were photographed',
              'knowledge, attitudes, or behavior actually changed',
              'the facilitators enjoyed the program',
            ],
            correct: 2,
            seconds: 20,
          },
          {
            prompt: '"Fidelity" in a prevention program means…',
            options: [
              'learners trusting their teachers',
              'delivering the program as it was designed',
              'keeping the results confidential',
              'finishing the program early',
            ],
            correct: 1,
            seconds: 20,
          },
          {
            prompt: 'When should a school monitor its prevention program?',
            options: [
              'Only when an outcome evaluation is planned',
              'Only when DepEd asks for a report',
              'Only at the end of the school year',
              'Always — even when no formal evaluation is planned',
            ],
            correct: 3,
            seconds: 20,
          },
        ],
      },
      note: 'Formative, not graded. Q4 is the takeaway of the module — if the room gets that one right, the hour landed. Revisit any question with under ~70% correct before moving on.',
    },
    {
      kind: 'activity',
      activity: {
        id: 'upc1-m4-slider-after',
        kind: 'slider',
        phase: 'after',
        pairId: 'upc1-m4-confidence',
        prompt: 'Now: how confident are you that you could explain monitoring vs evaluation to your school head?',
        min: 1,
        max: 10,
        minLabel: 'Just starting',
        maxLabel: 'Ready to teach it',
      },
      note: 'The payoff. As the before/after shift appears on screen, name what just happened: same measure, same group, before and after — a live one-group pre-test/post-test. They just experienced the design they can run in their own schools.',
    },
  ],
  notes: {
    timing: {
      hide: [
        'Research designs deep-dive (RCT / classical experimental, interrupted time series, validity threats — manual pp. 274–289): skip entirely in the 1-day format; the UPC has a dedicated M&E course for this.',
        'Sampling, probability, and descriptive/inferential statistics (manual pp. 290–308): hide; mention only that these exist and are covered in the follow-up M&E course.',
      ],
      summarize: [
        'Efficacy vs effectiveness (manual p. 265): compress to one sentence — "tested under ideal conditions vs tested in real schools" — only if asked.',
        'Quantitative vs qualitative measures (manual pp. 299–301): fold into one bullet on the "Data is for deciding" slide; do not run it as its own segment.',
        'Purposes of evaluation (impact, reach, costs, comparison — manual pp. 259–260): narrate briefly while on the "final grade" slide instead of listing all four.',
      ],
      emphasize: [
        '"How do we know it works?" — the framing question of the whole module. Return to it after every activity.',
        'The class record analogy ("Ang Class Record") — every technical term must be translated back into it.',
        'Monitoring matters even without a formal evaluation (manual p. 271) — this is the single behavior change we want from coordinators.',
        'The live before/after slider — it doubles as content: participants experience a pre-test/post-test design first-hand.',
      ],
    },
    fiveEs: {
      engage:
        'Open with the statement slide: a packed gymnasium, moving testimonies, certificates for everyone — and no way of knowing whether a single learner changed. Connect it to the scare-tactics lesson from earlier modules: emotional impact fooled us before. Then run the opening poll about how their own school currently checks whether an activity worked. The honest option — "we do not really check" — usually gets quiet laughter; that discomfort is the engine of the module. Frame the next 45 minutes as replacing guesswork with a class record.',
      explore:
        'Before defining any terms, let participants wrestle with the drag-and-drop instinctively — hold it loosely in mind during the analogy discussion by asking: which parts of your NDEP paperwork are "quizzes" and which are the "final grade"? Ask a volunteer teacher to explain the class record analogy back in their own words before flipping the card. Their existing craft knowledge — formative vs summative assessment — already contains the monitoring/evaluation distinction; the exploration is helping them discover they know this.',
      explain:
        'Name the framework formally across the three concept slides: monitoring (process evaluation) answers what we did, how much, for whom, and with what fidelity; outcome evaluation answers whether knowledge, attitudes, intentions, and behavior changed, with reduced substance use as the long-term outcome. Define indicator and fidelity precisely, and stress the manual’s strongest claim: monitoring is essential even when no outcome evaluation is planned, because it documents delivery and enables mid-course correction. Keep every definition tethered to the class record.',
      apply:
        'Run the drag-and-drop as the application moment: six real artifacts from school prevention work, sorted into Monitoring vs Evaluation. Debrief the contested items — the fidelity checklist is where the learning consolidates. Then ask each role to name one indicator they could realistically start tracking this quarter for their school’s NDEP activities: one process indicator (e.g., sessions delivered) and one outcome indicator (e.g., pre/post attitude survey). Have them type it into the session so it is captured, not just spoken.',
      evaluate:
        'Three layers of evidence, all built in. The 4-question recap quiz checks the core distinctions — flag any question scoring below roughly 70% and reteach on the spot. The confidence slider pair gives a before/after reading on the module itself, and the reveal moment doubles as a live demonstration of a one-group pre-test/post-test design. Finally, the processing questions surface whether coordinators can apply the lens to their own school: if they can name what their current reports prove and do not prove, the module worked.',
    },
    examples: {
      head_teacher:
        'Your learning action cell is a monitoring instrument: after each NDEP session, log delivery, attendance, and one fidelity note ("delivered as designed? what was adapted?"). At quarter’s end, review the log with teachers and adjust the next quarter’s sessions — that is data used for deciding, not just reporting.',
      nurse_dentist:
        'Your health records are outcome data waiting to be used. Administer the same short questionnaire on substance-related knowledge and attitudes during annual health assessment, before and after the year’s prevention activities — a ready-made pre-test/post-test that costs one extra page.',
      counselor:
        'Track both sides of the class record for your small-group sessions: a process log (who attended, how many sessions, what was covered) and a simple outcome measure (a 5-item attitudes-and-intentions checklist at first and last session). The comparison tells you which groups need a different approach.',
      admin:
        'This is your module — M&E runs on documentation, and documentation runs on you. Design one simple NDEP monitoring form (session, date, facilitator, attendance, fidelity check) and make it the standard attachment to every activity report. When Division asks whether the program worked, your files are the difference between an answer and a guess.',
    },
    policyAlignment: [
      {
        order: 'DepEd Order No. 37, s. 2017',
        connection:
          'The National Drug Education Program requires schools to implement and report on preventive drug education. Monitoring gives those reports substance: session logs, reach, and fidelity records turn compliance reporting into evidence of delivery — and outcome measures show whether the program is achieving what the order intends.',
      },
      {
        order: 'DepEd Order No. 28, s. 2018 (Oplan Kalusugan sa DepEd)',
        connection:
          'OK sa DepEd embeds monitoring and evaluation in every school health program under its umbrella. The process/outcome framework from this module is exactly the M&E logic those programs expect: track implementation continuously, measure change against baseline, and feed results back into school health planning.',
      },
    ],
    processingQuestions: [
      'Look at your school’s most recent NDEP or prevention activity report: what does it prove you did, and what does it not prove about what changed?',
      'If you could add only one indicator to your school’s class record this year — one process or one outcome measure — which would you choose, and who would act on the result?',
    ],
  },
};
