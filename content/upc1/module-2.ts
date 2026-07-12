import type { Module } from '@/lib/types';

/**
 * UPC 1 · Module 2 — Epidemiology of Substance Use and the Role of Prevention.
 * Source: UPC_1_TRAINER.pdf, Trainer Manual pp. 103–182 (slides 2.1–2.66).
 */
export const module2: Module = {
  id: 'upc1-m2',
  course: 'upc1',
  number: 2,
  title: 'Epidemiology & the Role of Prevention',
  tagline:
    'Before you build the dike, read the flood map — how data tells us where prevention effort goes.',
  minutes: 60,
  heroImage: '/images/upc1-m2/hero.jpg',
  slides: [
    {
      kind: 'title',
      kicker: 'Day 1 · Module 2',
      title: 'Epidemiology & the Role of Prevention',
      subtitle:
        'Before you build the dike, read the flood map — how data tells us where prevention effort goes.',
      image: '/images/upc1-m2/hero.jpg',
      note: 'Bridge from Module 1: we said prevention is a science. This module is where the science gets its eyes — data. Promise the room: by lunch you will be able to read your school like an epidemiologist.',
    },
    {
      kind: 'stat',
      value: '1 in 10',
      label: 'of all new HIV infections worldwide are the result of injecting drug use.',
      context:
        'UNODC estimated 11 to 21 million people injected drugs in 2009. Substance use is not only a discipline problem — it is a public health problem that spreads.',
      source: 'UNODC / WHO, cited in UPC Trainer Manual, Module 2 (Slide 2.16)',
      note: 'Let the number land before speaking. Then pivot: "How do we even KNOW this number? Someone counted. That counting discipline is called epidemiology — and it is today\'s topic."',
    },
    {
      kind: 'activity',
      activity: {
        id: 'upc1-m2-poll-1',
        kind: 'poll',
        prompt: 'Myth or fact? "Most young people who try a substance will progress to addiction."',
        options: [
          'Fact — trying it almost always leads to addiction',
          'Myth — many discontinue, and not all who continue develop problems',
          'Fact — but only for illegal drugs, not alcohol or tobacco',
          'It is impossible to know either way',
        ],
        correct: 1,
      },
      note: 'Expect most of the room to pick "Fact" — the scare-tactics era trained us that way. The manual\'s natural history model (Slide 2.60) shows many initiators discontinue, and some who continue never develop problems. The point is NOT that use is safe — it is that earlier initiation means higher risk, which is exactly why prevention targets the young.',
    },
    {
      kind: 'activity',
      activity: {
        id: 'upc1-m2-slider-before',
        kind: 'slider',
        phase: 'before',
        pairId: 'upc1-m2-confidence',
        prompt:
          'How confident are you that you could explain what epidemiology means for your school\'s NDEP work?',
        min: 1,
        max: 10,
        minLabel: 'Just starting',
        maxLabel: 'Ready to teach it',
      },
      note: 'Baseline reading. Reassure them: "epidemiology" sounds intimidating, but in 45 minutes you will own the word. We repeat this exact slider before the recap.',
    },
    {
      kind: 'bullets',
      title: 'What is epidemiology?',
      bullets: [
        'WHO: the study of the distribution and determinants of health-related states or events in populations.',
        'Distribution — who is affected, where, and how much.',
        'Determinants — what factors drive or protect against the problem.',
        'Its purpose is application: controlling diseases and other health problems, including substance use.',
      ],
      note: 'Plain-language it: distribution = "sino, saan, gaano karami"; determinants = "bakit". Emphasize the last bullet — epidemiology is not trivia collection, it exists so we can act. Source: WHO definition, manual Slide 2.22.',
    },
    {
      kind: 'bullets',
      title: 'Two words you will use forever: prevalence & incidence',
      bullets: [
        'Prevalence — existing cases: everyone currently using, whether they started yesterday or years ago.',
        'Incidence — new cases: those who just began.',
        'To shrink a health problem, do BOTH: treat existing cases and prevent new ones.',
        'Prevention owns the incidence side — stopping the new cases.',
      ],
      note: 'Quick check for understanding: "If our division survey counts all students who currently vape, is that prevalence or incidence?" (Prevalence.) The treat-existing + prevent-new pairing is manual Slide 2.24 and returns in the quiz.',
    },
    {
      kind: 'analogy',
      title: 'Ang Flood Map ng Barangay',
      front:
        'A wise barangay does not build dikes everywhere. First it maps which puroks flood, how deep, and every how many years — THEN it builds where the water actually goes. What is the school version of that map?',
      back:
        'Epidemiology is the community\'s flood map for substance use. It shows where use is rising, who is most exposed, and when it usually starts — so prevention effort goes where the water actually rises, not where we merely guess.',
      image: '/images/upc1-m2/analogy.jpg',
      note: 'Anchor analogy for the whole module. Ask a volunteer to answer the front question before flipping. Callbacks to use all day: survey data = rain gauge; age of initiation = the month the flood season starts; guessing without data = building a dike on the dry side of the barangay.',
    },
    {
      kind: 'bullets',
      title: 'What the flood map shows: who, what, when, where, how',
      bullets: [
        'WHAT substances are used and HOW they are used.',
        'WHO uses them — age of initiation, gender, geographic location.',
        'WHEN and WHERE to target: if onset is at 14, prevention must start by 12.',
        'It even points to the message: non-use tracks with perceived harm and social disapproval.',
      ],
      image: '/images/upc1-m2/concept.jpg',
      note: 'This is manual Slides 2.30 and 2.56 compressed. The "onset at 14 → intervene at 12" line is verbatim manual logic — repeat it slowly, it is the most practical sentence of the day. The harm-perception point comes from the US Monitoring the Future data (Johnston et al., 2013): use and perceived risk move as mirror images.',
    },
    {
      kind: 'bullets',
      title: 'Substance use starts with the young',
      bullets: [
        'Across countries, first use of alcohol, tobacco, and cannabis clusters in late childhood and adolescence.',
        'Patterns vary widely by country — 63% of New Zealanders reported cannabis use versus 1.4% in China (18–29 year olds).',
        'Variation is the point: your school\'s pattern is not the neighboring division\'s pattern.',
        'Conclusion the manual repeats all day: prevention must begin early.',
      ],
      note: 'Data: Degenhardt et al. (2008), WHO World Mental Health Surveys — manual Slides 2.26–2.27. Do not read the 13-country table; the NZ-vs-China contrast carries the idea. Land the third bullet hard: this is why DepEd schools need their OWN data, not borrowed assumptions.',
    },
    {
      kind: 'bullets',
      title: 'The progression of use — not a light switch, a path',
      bullets: [
        'Initiation → some discontinue → some continue use (more frequent, multiple substances).',
        'Of those who continue: some develop problems — dependency, health, emotional, social — and some do not.',
        'The younger the age of initiation, the higher the risk of progressing to a substance use disorder.',
        'Every arrow on this path is a point where prevention can intervene.',
      ],
      note: 'EMPHASIZE — this is the conceptual heart of the module (manual Slides 2.59–2.60, the Natural History model). Walk the path slowly with a student persona: "Si Marco tries a cigarette at 12..." Personal characteristics and environment influence the early arrows; pharmacology takes over as use continues. This slide is what makes the drag-drop and the quiz make sense.',
    },
    {
      kind: 'activity',
      activity: {
        id: 'upc1-m2-drag-1',
        kind: 'dragdrop',
        prompt: 'Sort them: what can epidemiology tell us — and what can it not?',
        buckets: ['Epidemiology tells us', 'Epidemiology cannot tell us'],
        items: [
          { label: 'Which substances are being used in a population, and how', bucket: 0 },
          { label: 'The typical age when young people first try a substance', bucket: 0 },
          { label: 'Which exact student in your advisory class will develop a disorder', bucket: 1 },
          { label: 'Where and when prevention programs should be targeted', bucket: 0 },
          { label: 'That a specific child used drugs because of one single cause', bucket: 1 },
          { label: 'Whether a program worked, without actually evaluating it', bucket: 1 },
        ],
      },
      note: 'Debrief the "cannot" bucket carefully: epidemiology describes populations, never predicts individuals — so it must NEVER be used to label or shame a particular child. That distinction is also your child-protection guardrail under DO 40. The last item bridges forward: data justifies programs, evaluation proves them.',
    },
    {
      kind: 'bullets',
      title: 'One continuum of care — prevention to treatment to maintenance',
      bullets: [
        'Any population holds a range: vulnerable non-users, new initiators, and those already using.',
        'A range of patterns requires a range of services — prevention, treatment, and maintenance as one spectrum.',
        'Prevention itself has tiers: universal (everyone), selective (at-risk groups), indicated (those who have initiated).',
        'Schools live mostly in the universal and selective tiers — and refer onward for the rest.',
      ],
      note: 'Manual Slides 2.59, 2.61–2.62 (IOM Spectrum, National Research Council 1994). Flood-map callback: dikes for the whole barangay (universal), sandbags for the low puroks (selective), rescue boats for houses already flooding (indicated → referral). Be explicit: teachers are not treatment providers — knowing your lane IS the competence.',
    },
    {
      kind: 'activity',
      activity: {
        id: 'upc1-m2-cloud-1',
        kind: 'wordcloud',
        prompt: "One word: what does your school's 'flood map' need?",
        maxWords: 3,
      },
      note: 'Expect words like "data", "survey", "honesty", "time", "support", "training". Read the biggest words aloud and connect each back to an epidemiology concept — e.g., "survey" = prevalence measurement, "honesty" = data quality. Park anything program-specific for Module 3.',
    },
    {
      kind: 'activity',
      activity: {
        id: 'upc1-m2-slider-after',
        kind: 'slider',
        phase: 'after',
        pairId: 'upc1-m2-confidence',
        prompt:
          'Now, after the module: how confident are you that you could explain what epidemiology means for your school\'s NDEP work?',
        min: 1,
        max: 10,
        minLabel: 'Just starting',
        maxLabel: 'Ready to teach it',
      },
      note: 'The payoff moment — the stage shows the before → after shift. If the gain is modest, name it honestly and point to the recap and quiz as one more pass at the core ideas.',
    },
    {
      kind: 'recap',
      title: 'The flood map, in one breath',
      points: [
        'Epidemiology = distribution + determinants + action — the community\'s flood map for substance use.',
        'Prevalence counts existing cases; incidence counts new ones. Prevention owns incidence.',
        'Use starts young and progresses along a path — the earlier the start, the higher the risk.',
        'One continuum of care: universal, selective, indicated prevention, then treatment and maintenance.',
      ],
      note: 'Read the points with the room, flood-map callbacks and all. Then set up the quiz: "Four questions, twenty seconds each — let\'s see how well the map is drawn."',
    },
    {
      kind: 'activity',
      activity: {
        id: 'upc1-m2-quiz-1',
        kind: 'quiz',
        title: 'Quick check: Epidemiology & prevention',
        questions: [
          {
            prompt:
              'A division survey counts ALL students who currently use e-cigarettes. That number is the…',
            options: ['Incidence', 'Prevalence', 'Etiology', 'Intervention rate'],
            correct: 1,
            seconds: 20,
          },
          {
            prompt: 'The WHO defines epidemiology as the study of…',
            options: [
              'The chemistry of psychoactive substances',
              'How to punish drug offenses effectively',
              'The distribution and determinants of health-related states, applied to control health problems',
              'Individual counseling techniques',
            ],
            correct: 2,
            seconds: 20,
          },
          {
            prompt: 'Which statement about the progression of substance use is TRUE?',
            options: [
              'Everyone who initiates use develops a disorder',
              'The younger the age of initiation, the higher the risk of progression',
              'Progression is purely genetic — environment plays no role',
              'Only adults ever progress to dependence',
            ],
            correct: 1,
            seconds: 20,
          },
          {
            prompt: 'To reduce a health problem like substance use, a community must…',
            options: [
              'Treat existing cases only',
              'Prevent new cases only',
              'Wait for the problem to resolve on its own',
              'Treat existing cases AND prevent new ones',
            ],
            correct: 3,
            seconds: 20,
          },
        ],
      },
      note: 'Formative, not graded — celebrate speed and honest mistakes. Question 3 closes the loop with the opening poll; call that back explicitly. Bridge out: "The map is drawn. Module 3 is where we choose what to build on it."',
    },
  ],
  notes: {
    timing: {
      hide: [
        'If short on time: skip the wordcloud — its reflection is partly covered by the processing questions.',
        'The second-hand smoke evidence table and the workplace-policies table (manual Slides 2.8, 2.14) — do not attempt them live; they are reference material.',
      ],
      summarize: [
        'The 13-country prevalence table (Degenhardt et al., manual Slide 2.26): give only the New Zealand 63% vs China 1.4% cannabis contrast and move on.',
        'The alcohol/tobacco disease lists (manual Slides 2.11–2.13): compress to one sentence — "alcohol and tobacco are causally linked to disease across nearly every organ system."',
        'The Etiology Model detail (manual Slides 2.43–2.53) is a full topic in itself: name micro- and macro-level influences in passing and point to the follow-up session.',
      ],
      emphasize: [
        'The progression-of-use path (manual Slides 2.59–2.60) — spend the extra minutes here; it is the module\'s conceptual heart and the quiz depends on it.',
        'The flood map analogy ("Ang Flood Map ng Barangay") — return to it on every major beat so the day has one spine.',
        '"If onset is at 14, prevention must start by 12" — the single most actionable sentence for school planning.',
        'Treat existing cases AND prevent new ones — the continuum framing that keeps prevention and referral in the same breath.',
      ],
    },
    fiveEs: {
      engage:
        'Open with the 1-in-10 HIV statistic and let it sit. Then ask: how would anyone even know that number? Someone counted — carefully, across countries, for years. Run the myth-or-fact poll next; most of the room will say "trying leads to addiction," and their surprise at the real answer is the door into the whole module. Curiosity about where numbers come from is exactly the epidemiologist\'s instinct we are building.',
      explore:
        'Before defining anything, flip the flood map analogy card and let a volunteer guess what the school version of a flood map is. In the drag-drop, let them sort the "tells us / cannot tell us" statements with no coaching — the wrong sorts, especially anyone putting individual prediction in the "tells us" bucket, become the richest discussion material about what population data can and cannot do.',
      explain:
        'Formally land the WHO definition: distribution, determinants, and application to control. Separate prevalence from incidence with the vaping-survey example, then walk the progression path slowly — initiation, discontinuation, continuation, problems or no problems — naming the manual finding that younger initiation means higher risk. Close the explanation with the continuum of care: universal, selective, indicated, then treatment and maintenance as one spectrum.',
      apply:
        'Ask each role to name one data source their school already holds that could become a page of its flood map — clinic logs, guidance referral records, attendance patterns, anecdotal reports from advisers. Have them type answers in the wordcloud or say them aloud. Push for the "onset at 14 → intervene at 12" logic: given what they suspect about their own learners, at which grade level should their prevention push actually start?',
      evaluate:
        'The four-question quiz is the formative check — question 3 deliberately re-tests the opening poll misconception, so compare the two results out loud. The confidence slider pair (before near the start, after before the recap) gives the visible growth reading. Listen during the drag-drop debrief for the key discriminator: can they say, unprompted, that epidemiology describes populations but never predicts individuals?',
    },
    examples: {
      head_teacher:
        'In your learning action cell, spend ten minutes building a one-page "flood map" of your grade level: which sections have rising absences, which corners of campus are unsupervised, what advisers are hearing. That page — not a hunch — is what should decide where your homeroom guidance emphasis goes next quarter.',
      nurse_dentist:
        'Your clinic records are the school\'s richest epidemiological dataset. Annual health assessments, BMI trends, complaints of headaches or sleep problems, dental signs of tobacco or vape use — tallied by grade level and term, they show distribution and timing. You are not diagnosing individuals; you are drawing the flood map the whole NDEP team plans from.',
      counselor:
        'Track your referral and intake data as incidence: how many NEW concerns each month, from which grade levels, at what ages. If concerns cluster at Grade 8, your selective prevention groups belong in Grade 7 — the manual\'s "onset at 14, intervene at 12" logic applied to your own caseload. Population patterns guide programs; individual cases stay confidential.',
      admin:
        'You own the reporting pipeline that turns school observations into division-level epidemiology. Standardize how NDEP activities and incident documentation are filed, and ensure returns to the Division Office are complete and on time — aggregated school reports ARE the flood map that decides where division prevention resources flow. Incomplete documentation means an invisible school.',
    },
    policyAlignment: [
      {
        order: 'DepEd Order No. 37, s. 2017',
        connection:
          'Operationalizes the National Drug Education Program, including the framework under which mandatory random drug testing is conducted. Epidemiology is the honest frame for it: testing and surveys are prevalence tools that describe the school population so prevention can be targeted — never instruments for singling out and punishing individual learners.',
      },
      {
        order: 'DepEd Order No. 40, s. 2012',
        connection:
          'The Child Protection Policy sets the guardrail for every data practice in this module: information about learners\' risk and substance exposure must be handled with confidentiality and a protective, non-punitive intent. Epidemiology describes populations; the moment data is used to shame a particular child, it stops being prevention.',
      },
      {
        order: 'DepEd Order No. 28, s. 2018 (Oplan Kalusugan sa DepEd)',
        connection:
          'OK sa DepEd bundles school health programs — including health assessments and the school clinic services that generate the data this module calls the flood map. NDEP prevention planning should read those existing OK sa DepEd data streams first, rather than inventing new surveys from scratch.',
      },
    ],
    processingQuestions: [
      'If you drew your school\'s "flood map" today, which zone would you shade first — and what evidence, not gut feel, would you shade it with?',
      'The manual says that if onset is at age 14, prevention must start by 12. In your school\'s context, what grade level is your "age 12" — and is anything actually scheduled there?',
    ],
  },
};
