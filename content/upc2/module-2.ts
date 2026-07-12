import type { Module } from '@/lib/types';

/**
 * UPC 2 · Module 2 — Psychoactive Substances 101
 * Source: UPC Curriculum 2 (Physiology and Pharmacology for Prevention
 * Specialists), Trainer Manual, Module 2 — "Introduction to Psychoactive
 * Substance Use", pages 87–131 (Slides 2.1–2.34 + Resource Page 2.1).
 * All facts are drawn from the manual; no external statistics are invented.
 */
export const module2: Module = {
  id: 'upc2-m2',
  course: 'upc2',
  number: 2,
  title: 'Psychoactive Substances 101',
  tagline:
    'The most familiar of these substances sit on the sari-sari store shelf. This module names them, sorts them into four classes, and untangles "legal" from "safe".',
  minutes: 60,
  heroImage: '/images/upc2-m2/hero.jpg',
  images: ['/images/upc2-m2/analogy.jpg', '/images/upc2-m2/concept.jpg'],
  analogy: {
    title: 'Ang Estante ng Sari-Sari Store',
    front:
      'A sari-sari store sells kape at the counter and gin behind it, right next to the cigarettes. Same store, all legal. So which one is "safe"?',
    back:
      'None are "safe" simply because they are legal. Coffee, tobacco, and alcohol are all psychoactive — they act on the brain. Where a substance sits on the shelf is decided by law and culture, not by how much harm it can do. Pharmacology does not read laws; the body responds the same whether a substance is legal or not.',
  },
  slides: [
    {
      kind: 'title',
      kicker: 'Day 2 · Module 2',
      title: 'Psychoactive Substances 101',
      subtitle:
        'What these substances are, the four classes they fall into, and why "legal" is not the same as "safe".',
      image: '/images/upc2-m2/hero.jpg',
      note: 'Set the tone: this module handles substance names plainly and factually. No horror stories, no glamor — just the science a prevention specialist needs to answer questions in the community.',
    },
    {
      kind: 'statement',
      text: 'The most familiar psychoactive substances are not hidden. They are on the sari-sari store shelf — coffee, cigarettes, and gin.',
      attribution: 'UPC Curriculum 2 · Module 2',
      note: 'Let this land. Most participants expect "drugs" to mean illegal drugs. Naming everyday, legal substances first is the hook for the whole session.',
    },
    {
      kind: 'activity',
      activity: {
        id: 'upc2-m2-poll-1',
        kind: 'poll',
        prompt: 'Which of these is a psychoactive substance?',
        options: [
          'Kape (coffee)',
          'Shabu (methamphetamine)',
          'Alak (alcohol / gin)',
          'Lahat ng nabanggit (all of the above)',
        ],
        correct: 3,
      },
      note: 'Expect most of the room to pick only shabu. Reveal that all three are psychoactive — they all act on the brain. The gap between the answer people give and the correct answer is the lesson. Do not shame anyone for guessing wrong; the whole point is that it is a common assumption.',
    },
    {
      kind: 'activity',
      activity: {
        id: 'upc2-m2-slider-before',
        kind: 'slider',
        phase: 'before',
        pairId: 'upc2-m2-confidence',
        prompt:
          'Right now, how ready do you feel to explain what a psychoactive substance is to a fellow teacher?',
        min: 1,
        max: 10,
        minLabel: 'Just starting',
        maxLabel: 'Ready to teach it',
      },
      note: 'This is the baseline reading. We repeat the exact question at the end to show growth. Tell participants there are no wrong answers — this is about their confidence, not a test.',
    },
    {
      kind: 'bullets',
      title: 'What is a psychoactive substance?',
      bullets: [
        'Any substance that affects feelings, perceptions, thought processes, and/or behavior.',
        'It does this by altering the functioning of the nervous system — especially the brain.',
        'It includes both illegal substances and legal ones, including some medications.',
        'All medications are substances, but not all substances are medications.',
      ],
      note: 'Definition is from Slides 2.6–2.8. Anchor on the mechanism: a substance is "psychoactive" because it changes how the brain works. The medications line prevents the common mix-up between a prescribed medicine and an abused substance.',
    },
    {
      kind: 'bullets',
      title: 'Four things they change — and where they come from',
      bullets: [
        'They alter mood, thoughts, sensory perceptions, and behavior.',
        'Legal examples: alcohol, tobacco, inhalants, and certain prescription drugs.',
        'Illegal examples: hashish / cannabis, heroin, and methamphetamines.',
        'The change happens when the substance crosses the blood–brain barrier.',
      ],
      image: '/images/upc2-m2/concept.jpg',
      note: 'From Slides 2.11 and 2.16. Keep it concrete: a substance can make someone more alert or more relaxed, sharpen or distort what they see, and change what they do. Legal and illegal both appear on the list — set up the analogy that follows.',
    },
    {
      kind: 'analogy',
      title: 'Ang Estante ng Sari-Sari Store',
      front:
        'A sari-sari store sells kape at the counter and gin behind it, right next to the cigarettes. Same store, all legal. So which one is "safe"?',
      back:
        'None are "safe" simply because they are legal. Coffee, tobacco, and alcohol are all psychoactive — they act on the brain. Where a substance sits on the shelf is decided by law and culture, not by how much harm it can do. Pharmacology does not read laws; the body responds the same whether a substance is legal or not.',
      image: '/images/upc2-m2/analogy.jpg',
      note: 'This is the anchor of the module (Slide 2.22). Flip only after a volunteer explains the front in their own words. The manual is explicit: legality is generally a result of tradition, culture, or political and religious factors — not a measure of harm.',
    },
    {
      kind: 'bullets',
      title: 'The four main classes',
      bullets: [
        'Stimulants — speed up the CNS (cocaine, amphetamine, methamphetamine; also nicotine and caffeine).',
        'Depressants — slow down the CNS (alcohol, barbiturates, benzodiazepines).',
        'Opioids / narcotics — reduce pain, induce sleep (heroin, morphine, opium).',
        'Hallucinogens — produce vivid sensory distortions (LSD, mescaline, ecstasy, mushrooms).',
      ],
      note: 'From Slide 2.21. Note that nicotine, caffeine, and alcohol — all legal — sit inside this chart. Mention the "others" that do not fit neatly: cannabis, khat/miraa, dissociatives like PCP, and inhalants (Slide 2.23). Do not dwell on any single substance.',
    },
    {
      kind: 'bullets',
      title: 'How it gets in — and why speed matters',
      bullets: [
        'Nine routes: swallowing, snorting, smoking, inhaling fumes, IM / SC / IV injection, topical, and sublingual.',
        'The faster a substance reaches the brain, the greater and more reinforcing its effect.',
        'Fastest first: smoking 7–10 seconds, IV injection 15–30 seconds.',
        'Slower: injection into muscle or under skin 3–5 minutes; swallowing 20–30 minutes.',
      ],
      note: 'From Slides 2.25–2.29. The key prevention point: route of administration is not a detail — the faster the hit, the more rewarding it feels, and the greater the potential for addiction. Present the numbers factually, not dramatically.',
    },
    {
      kind: 'bullets',
      title: 'Why people use — and how use can progress',
      bullets: [
        'Experimental / recreational — social, occasional, driven by curiosity or peer pressure.',
        'Circumstantial / occasional — used to cope, relax, or meet a demand (e.g., to feel less shy).',
        'Intensified / regular — daily use for ongoing relief; problems begin. This level is abuse.',
        'Compulsive / addictive — the substance becomes the center of life. This level is addiction.',
      ],
      note: 'From Resource Page 2.1. Progression usually starts with a first rewarding experience; if it is unpleasant, the person often does not repeat it. Stress that not everyone progresses — this is a pattern, not a destiny. Module 3 covers the science of addiction.',
    },
    {
      kind: 'activity',
      activity: {
        id: 'upc2-m2-drag-1',
        kind: 'dragdrop',
        prompt: 'Sort each substance into its class.',
        buckets: ['Stimulants', 'Depressants', 'Opioids', 'Hallucinogens'],
        items: [
          { label: 'Shabu (methamphetamine)', bucket: 0 },
          { label: 'Caffeine (kape)', bucket: 0 },
          { label: 'Alcohol (gin)', bucket: 1 },
          { label: 'Benzodiazepines (Valium)', bucket: 1 },
          { label: 'Heroin', bucket: 2 },
          { label: 'Morphine', bucket: 2 },
          { label: 'LSD', bucket: 3 },
          { label: 'Ecstasy', bucket: 3 },
        ],
      },
      note: 'Items come straight from the manual chart (Slide 2.21). Watch for the "legal" ones — caffeine as a stimulant and alcohol as a depressant surprise people. Use any wrong sorts to reinforce the class effects, not to correct sharply.',
    },
    {
      kind: 'activity',
      activity: {
        id: 'upc2-m2-cloud-1',
        kind: 'wordcloud',
        prompt: 'Name one legal psychoactive substance sold in your community.',
        maxWords: 3,
      },
      note: 'Read the biggest words aloud. Expect kape, sigarilyo, alak, energy drinks. Connect back to the sari-sari store analogy: legal and everywhere does not mean without effect on the brain.',
    },
    {
      kind: 'recap',
      title: 'Module 2, in one breath',
      points: [
        'A psychoactive substance changes mood, thoughts, senses, and behavior by acting on the brain.',
        'Four classes: stimulants, depressants, opioids, hallucinogens — plus "others" like cannabis and inhalants.',
        'Legal does not mean safe; the faster a substance reaches the brain, the greater the risk.',
        'Use can progress: experimental → circumstantial → intensified → compulsive.',
      ],
      note: 'Read the points with the room. Bridge forward: tomorrow, Module 3 explains why some people move down that progression and others do not.',
    },
    {
      kind: 'activity',
      activity: {
        id: 'upc2-m2-quiz-1',
        kind: 'quiz',
        title: 'Quick check: Psychoactive substances',
        questions: [
          {
            prompt: 'What makes a substance "psychoactive"?',
            options: [
              'It is illegal',
              'It alters the functioning of the nervous system, especially the brain',
              'It is sold only with a prescription',
              'It is addictive to everyone who tries it',
            ],
            correct: 1,
            seconds: 20,
          },
          {
            prompt: 'Which of these is a legal psychoactive substance?',
            options: ['Heroin', 'Shabu', 'Caffeine', 'LSD'],
            correct: 2,
            seconds: 20,
          },
          {
            prompt: 'Which route delivers a substance to the brain the fastest?',
            options: ['Swallowing', 'Smoking', 'Topical (on the skin)', 'Sublingual (under the tongue)'],
            correct: 1,
            seconds: 20,
          },
          {
            prompt: 'What does it mean that a substance is "legal"?',
            options: [
              'It is safer than any illegal substance',
              'It has no effect on the brain',
              'It cannot be addictive',
              'Its legality reflects law and culture, not how harmful it is',
            ],
            correct: 3,
            seconds: 20,
          },
        ],
      },
      note: 'Formative, not graded. Q2 and Q4 carry the module\'s core message. Celebrate fast correct answers; if the room misses Q4, re-tell the sari-sari store analogy in one line.',
    },
    {
      kind: 'activity',
      activity: {
        id: 'upc2-m2-slider-after',
        kind: 'slider',
        phase: 'after',
        pairId: 'upc2-m2-confidence',
        prompt:
          'Now: how ready do you feel to explain what a psychoactive substance is to a fellow teacher?',
        min: 1,
        max: 10,
        minLabel: 'Just starting',
        maxLabel: 'Ready to teach it',
      },
      note: 'The payoff. The stage shows the before → after shift as answers arrive. Name the growth out loud — it validates the hour and closes Day 2.',
    },
  ],
  notes: {
    timing: {
      hide: [
        'If short on time: drop the wordcloud (Slide 12) — the drag-and-drop already checks the four classes.',
        'The quiz can be trimmed to Q2 and Q4, which carry the "legal is not safe" message.',
      ],
      summarize: [
        '"Four things they change" slide: read the first two bullets, narrate the rest.',
        'Routes slide: state the smoking and IV speeds, summarize the slower routes verbally.',
      ],
      emphasize: [
        'The sari-sari store analogy ("Ang Estante ng Sari-Sari Store") — it anchors the legal-vs-safe point.',
        'The before slider — it is required for the after reading that closes the day.',
      ],
    },
    fiveEs: {
      engage:
        'Open with the sari-sari store the whole room knows. Ask what it sells that acts on the brain, then run the poll: "Which is a psychoactive substance?" Most will pick only shabu. Let the split sit for a moment before revealing that kape, alak, and shabu all qualify. The surprise is the doorway — participants realize the category is far wider, and far closer to home, than they assumed. Keep the tone curious, never accusatory; the wrong guess is the common one, and naming it gently is what earns their attention for the rest of the hour.',
      explore:
        'Have participants sort real substances into the four classes in the drag-and-drop before you formally teach the classes. Let them wrestle with the surprises — caffeine as a stimulant, alcohol as a depressant. Their placements, right and wrong, reveal what they already believe about which substances are "serious" and which are harmless. Walk the room, listen for the reasoning behind each drop, and hold your corrections. The confusion they surface here is exactly the material the explain phase resolves, so treat wrong answers as useful data rather than mistakes to fix on the spot.',
      explain:
        'Name the four classes plainly using the manual chart: stimulants speed up the CNS, depressants slow it down, opioids reduce pain and induce sleep, hallucinogens distort the senses. Point out that nicotine, caffeine, and alcohol sit inside the chart despite being legal. Then teach routes of administration and the one rule that matters most for prevention: the faster a substance reaches the brain, the greater and more reinforcing its effect. Present substance names and speed figures factually, with no dramatization — the credibility of a prevention specialist rests on handling this material calmly and accurately.',
      apply:
        'Ask each participant, in their own role, to name one place their school or community treats a legal substance as automatically harmless. A head teacher might point to staff smoking areas; a nurse to energy-drink use before exams. Have them write it into the wordcloud or share aloud. The goal is transfer: participants leave able to spot the "legal equals safe" assumption in their own setting and to answer it with the pharmacology, not with fear. Keep examples grounded in what they can actually observe and act on this month.',
      evaluate:
        'The four-question quiz is the formative check; Q2 and Q4 confirm whether the "legal is not safe" message landed. The confidence slider brackets the hour — the before reading is the baseline, the after reading shows the shift. Compare the two live and name the movement. If the after scores lag, it usually means the four classes need one more concrete pass; revisit the drag-and-drop items rather than re-reading the definition. Treat a low score as information about your teaching, not about the participants.',
    },
    examples: {
      head_teacher:
        'In a learning action cell, walk staff through the sari-sari store analogy so teachers stop treating tobacco and alcohol as "not really drugs" when they talk with students.',
      nurse_dentist:
        'In the annual health assessment, ask factually about caffeine, tobacco, and alcohol use alongside other substances — all four classes act on the body, and legal ones are the ones you will see most.',
      counselor:
        'When a student discloses use, use the progression levels (experimental → circumstantial → intensified → compulsive) to gauge where they are, instead of reacting to the substance\'s legal status alone.',
      admin:
        'Review school policy so that legal substances on campus — vape, energy drinks, tobacco near gates — are addressed on the evidence of harm, not waved through because they are legal to buy.',
    },
    policyAlignment: [
      {
        order: 'DepEd Order No. 37, s. 2017',
        connection:
          'The Comprehensive National Drug Education Program requires accurate, preventive drug education. Correctly defining psychoactive substances — including legal ones — is the factual foundation teachers need to deliver it without myth or scare tactics.',
      },
      {
        order: 'DepEd Order No. 40, s. 2012',
        connection:
          'The Child Protection Policy calls for a safe, drug-free learning environment. Understanding the four classes and how legal substances also act on the developing brain lets staff protect learners from harm that a "legal equals safe" mindset would miss.',
      },
      {
        order: 'OK sa DepEd (health promotion)',
        connection:
          'The department\'s health-promotion thrust favors non-stigmatizing, evidence-based messaging. This module models exactly that: substances are named factually, without glamor or fear, so prevention messages stay credible with both learners and colleagues.',
      },
    ],
    processingQuestions: [
      'Which substance surprised you most to find inside the four-class chart, and why did it surprise you?',
      'Where in your own school does the "legal means safe" assumption show up, and how would you answer it using what you learned today?',
    ],
  },
};
