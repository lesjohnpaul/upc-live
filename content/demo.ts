import type { Module } from '@/lib/types';

/** Demo module exercising every slide kind — used for rehearsal and QA. */
export const demoModule: Module = {
  id: 'demo',
  course: 'upc1',
  number: 0,
  title: 'Demo: The Science of Prevention',
  tagline: 'A journey through prevention science — before we jump into the real modules.',
  minutes: 25,
  slides: [
    {
      kind: 'title',
      kicker: 'UPC 1 · Demo Module',
      title: 'Demo: The Science of Prevention',
      subtitle: 'A journey through prevention science — before we jump into the real modules.',
      note: 'Welcome the group warmly. Establish that this is a rehearsal deck — every slide kind appears once.',
    },
    {
      kind: 'qr',
      title: 'Join the session',
      note: 'Give participants 90 seconds to scan and join. Walk the aisles; help anyone stuck on WiFi.',
    },
    {
      kind: 'statement',
      text: 'Prevention is not about fear. It is about growing what protects.',
      attribution: 'Universal Prevention Curriculum, UNODC',
      note: 'Pause 5 seconds after this lands. Let the room read it twice.',
    },
    {
      kind: 'stat',
      value: '275M',
      label: 'people worldwide used illicit substances in the past year.',
      context:
        'Most started before age 18. That is why the school is the most important arena for prevention.',
      source: 'UNODC World Drug Report 2020',
      note: 'Convert: that is more than double the population of the Philippines. Let the number count up before speaking.',
    },
    {
      kind: 'bullets',
      title: 'What is prevention science?',
      bullets: [
        'The science of stopping a problem before it starts.',
        'Grounded in evidence — not fear, not guesswork.',
        'Strengthens protective factors; weakens risk factors.',
        'Works in the family, the school, and the community — all at once.',
      ],
      note: 'Land each bullet, then ask: which of these is new to you?',
    },
    {
      kind: 'analogy',
      title: 'Ang Bakod at ang Ambulansya',
      front:
        'A barangay has a cliff. They can build a fence at the top — or park an ambulance at the bottom. Which would you choose?',
      back:
        'Prevention science is building the fence before anyone falls. Treatment is the ambulance. We need both — but the fence is cheaper, and it saves more people.',
      note: 'Click the card to flip it. Ask a volunteer to explain the analogy in their own words before flipping.',
    },
    {
      kind: 'image',
      image: 'linear-gradient(140deg, oklch(0.37 0.062 158), oklch(0.185 0.032 165) 60%, oklch(0.59 0.115 68 / 0.35))',
      caption: 'The school as the fence: everyday protection, not a one-time lecture.',
      note: 'Placeholder visual — replace with a photo of a school community activity for the live run.',
    },
    {
      kind: 'activity',
      activity: {
        id: 'demo-poll',
        kind: 'poll',
        prompt: 'Where should the barangay spend most effectively?',
        options: [
          'A fence at the top of the cliff (prevention)',
          'An ambulance at the bottom (treatment)',
          'Both, but more on the fence',
          'Both, but more on the ambulance',
        ],
        correct: 2,
      },
      note: 'Expect a split room. Use the split to open the cost-effectiveness discussion.',
    },
    {
      kind: 'activity',
      activity: {
        id: 'demo-wordcloud',
        kind: 'wordcloud',
        prompt: 'In one word: what protects a child against drugs?',
        maxWords: 3,
      },
      note: 'Read the biggest words aloud. Connect them to protective factors: family, friends, teachers.',
    },
    {
      kind: 'activity',
      activity: {
        id: 'demo-slider-before',
        kind: 'slider',
        phase: 'before',
        pairId: 'demo-confidence',
        prompt: 'How confident are you that you could explain prevention science to a fellow teacher?',
        min: 1,
        max: 10,
        minLabel: 'Not ready yet',
        maxLabel: 'Fully ready',
      },
      note: 'Baseline reading — we repeat this exact slider at the end of the day to show growth.',
    },
    {
      kind: 'activity',
      activity: {
        id: 'demo-dragdrop',
        kind: 'dragdrop',
        prompt: 'Sort them: risk factor or protective factor?',
        buckets: ['Risk Factor', 'Protective Factor'],
        items: [
          { label: 'Early exposure to alcohol at home', bucket: 0 },
          { label: 'A close relationship with a teacher', bucket: 1 },
          { label: 'A peer group that uses substances', bucket: 0 },
          { label: 'Clear school policies', bucket: 1 },
          { label: 'No after-school activities', bucket: 0 },
          { label: 'Regular family meals', bucket: 1 },
        ],
      },
      note: 'Emphasize: no single factor decides — the accumulation is what matters.',
    },
    {
      kind: 'activity',
      activity: {
        id: 'demo-quiz',
        kind: 'quiz',
        title: 'Quick check: Prevention basics',
        questions: [
          {
            prompt: 'What is the primary goal of prevention science?',
            options: [
              'Punish those who use',
              'Stop the problem before it starts',
              'Treat addiction',
              'Scare the youth',
            ],
            correct: 1,
            seconds: 20,
          },
          {
            prompt: 'Which is an example of a protective factor?',
            options: [
              'Early exposure to substances',
              'No guidance at home',
              'A strong connection to school',
              'Peer pressure',
            ],
            correct: 2,
            seconds: 20,
          },
        ],
      },
      note: 'Keep it light — this is formative, not graded. Celebrate the fastest correct answers.',
    },
    {
      kind: 'activity',
      activity: {
        id: 'demo-tolerance',
        kind: 'tolerance',
        title: 'Beat the Brain',
        tapLabel: 'TAP',
        revealHeadline: 'That’s tolerance.',
        revealBody:
          'Nothing about the button changed. Your brain did. It turned down the reward and turned up the wanting — so you worked harder for less and barely noticed the trade. That is what a substance does, only it happens to a real person over months, not to a phone over twenty taps.',
      },
      note: 'Let them tap in silence. When the room goes quiet, ask: at what point did you notice you were working harder for less?',
    },
    {
      kind: 'activity',
      activity: {
        id: 'demo-qna',
        kind: 'qna',
        prompt: 'What questions do you have about prevention science? Type them on your phone.',
      },
      note: 'Triage questions: answer 2-3 now, park the rest for the end-of-day open forum.',
    },
    {
      kind: 'activity',
      activity: {
        id: 'demo-plan',
        kind: 'plan',
        title: 'Build Your Barkada',
        intro:
          'DDB Board Regulation No. 5, s. 2007 §8.6 already gives your Student Council this job — including “initiate BKD activities in their schools.” You have held this since 2007. Ninety days. One activity. Write it down.',
        schoolPrompt: 'Which school are you from?',
        prompts: {
          student_leader:
            'What is the ONE activity you will run in your school in the next 90 days?',
          adviser: 'What will you sign, fund, or unblock so it actually happens?',
        },
        whenPrompt: 'When does it start?',
        whenOptions: ['Within 2 weeks', 'This quarter', 'Before December'],
      },
      note: 'The pair fills this in together — but on two phones, with two different prompts. Read three schools aloud off the wall before moving on.',
    },
    {
      kind: 'activity',
      activity: {
        id: 'demo-pledge',
        kind: 'pledge',
        title: 'The Lead with Purpose Pledge',
        intro:
          'Nine lines. Tap each one you actually mean — the sign button will not unlock until you have read all nine. Then write the one sentence you would say to a friend under pressure.',
        lines: [
          'I choose to protect my health.',
          'I choose to make informed decisions.',
          'I choose not to pressure anyone into a harmful choice.',
          'I choose to speak up instead of staying quiet.',
          'I choose to support a friend who is struggling.',
          'I choose healthy ways to handle stress.',
          'I choose to use my influence on purpose.',
          'I choose to help build a smoke-free, vape-free school.',
          'I choose to lead with purpose.',
        ],
        schoolPrompt: 'Which school are you signing for?',
        voicePrompt: 'One sentence to someone your age being pressured right now. What do you say?',
        voicePlaceholder: 'Say it the way you would actually say it.',
        signLabel: 'Sign the pledge',
        signedHeadline: 'You signed it.',
      },
      note: 'Ask the room to stand before they open this. Then be quiet — nine taps is about forty seconds of reading, and that silence is the activity working.',
    },
    {
      kind: 'activity',
      activity: {
        id: 'demo-slider-after',
        kind: 'slider',
        phase: 'after',
        pairId: 'demo-confidence',
        prompt: 'Now that the demo is done: how confident are you that you could explain prevention science?',
        min: 1,
        max: 10,
        minLabel: 'Not ready yet',
        maxLabel: 'Fully ready',
      },
      note: 'The payoff moment — the stage shows the before → after confidence shift as the answers arrive.',
    },
    {
      kind: 'recap',
      title: 'The demo, in one breath',
      points: [
        'Prevention science: the fence before the ambulance.',
        '275M people used illicit substances in 2020 — most started young.',
        'Risk factors load the dice; protective factors unload them.',
        'The school is the most dependable fence we hold.',
      ],
      note: 'Read the points with the room, then bridge to Module 1.',
    },
  ],
  notes: {
    timing: {
      hide: [
        'If short on time: skip the image slide and the wordcloud.',
        'The quiz can be trimmed to a single question.',
      ],
      summarize: [
        'Bullets slide: read only the first two bullets, narrate the rest.',
        'Q&A: collect the questions but answer them in the afternoon.',
      ],
      emphasize: [
        'The fence-and-ambulance analogy ("Ang Bakod at ang Ambulansya") — it anchors the whole day.',
        'The slider baseline — it is required for the after reading later.',
      ],
    },
    fiveEs: {
      engage:
        'Open with the story of the barangay with a cliff. Ask: where would you put the money? Let seatmates debate for 2 minutes before showing the poll.',
      explore:
        'In the dragdrop, let them sort risk and protective factors with no prior explanation. Their wrong answers become the door into the discussion.',
      explain:
        'Use the bullets slide to formally name prevention science: evidence-based, developmental, and multi-setting. Tie it to the 275M UNODC figure.',
      apply:
        'Ask per role: as a head teacher / nurse / counselor / admin, what is one "fence" you could build in your school this month? Have them write it in the Q&A.',
      evaluate:
        'The two quiz questions are the formative check. The slider (before) is the baseline; compare it with the "after" reading at the end of the day.',
    },
    examples: {
      head_teacher:
        'In your learning action cell, dedicate a monthly 15-minute prevention huddle to discuss students showing risk factors.',
      nurse_dentist:
        'In the annual health assessment, add two questions about sleep and family meals — protective factors you can measure.',
      counselor:
        'Build a "fence list" — students with three or more risk factors — and prioritize them for small-group sessions before problems surface.',
      admin:
        'Make sure after-school programs have a dedicated budget line in the Annual Implementation Plan — its absence is itself a risk factor.',
    },
    policyAlignment: [
      {
        order: 'DepEd Order No. 37, s. 2017',
        connection:
          'The National Drug Education Program mandates preventive drug education at every level — this prevention science framework is the scientific foundation of its implementation.',
      },
      {
        order: 'DepEd Order No. 40, s. 2012',
        connection:
          'The Child Protection Policy rests on the same protective-factors logic: a safe, nurturing school is the widest fence against every kind of harm.',
      },
    ],
    processingQuestions: [
      'Which part of the fence-and-ambulance analogy resonates most with your experience at school?',
      'If you could strengthen only one protective factor in your school this year, which would it be and why?',
    ],
  },
};
