import type { Module } from '@/lib/types';

/**
 * UPC 1 · Module 1 — Welcome & Why We're Here
 * Merges the manual's Module 0 (U.S. Department of State opening) and
 * Module 1 (Training Introduction, pp. 57–92) into one compressed 25-minute
 * opener for a DepEd Division echo training.
 */
export const module1: Module = {
  id: 'upc1-m1',
  course: 'upc1',
  number: 1,
  title: "Welcome & Why We're Here",
  tagline:
    'You are the face of prevention in your school — today we learn the science behind that job.',
  minutes: 25,
  heroImage: '/images/upc1-m1/hero.jpg',
  images: ['/images/upc1-m1/hero.jpg', '/images/upc1-m1/concept.jpg'],
  slides: [
    {
      kind: 'welcome',
      dayLabel: 'Day 1',
      title: 'Introduction to Prevention Science',
      subtitle: 'UPC Division Echo Training',
      presenter: 'with Jessica C. Oliver',
      note: 'Walk-in / hold screen. Leave this up while participants arrive and settle — it animates on its own. Advance to the title slide when you are ready to begin.',
    },
    {
      kind: 'title',
      kicker: 'Day 1 · Opening',
      title: "Welcome & Why We're Here",
      subtitle:
        'Universal Prevention Curriculum · Introduction to Prevention Science — with Jessica C. Oliver',
      image: '/images/upc1-m1/hero.jpg',
      note: 'Warm welcome — thank them for choosing to be here; that choice already says they care about their learners. Introduce yourself in one breath, fold housekeeping (restrooms, breaks) into a single sentence, and move.',
    },
    {
      kind: 'qr',
      title: 'First things first: get your phone out',
      note: 'Yes — phones OUT, not away. This whole day is interactive, so give them 90 seconds to scan and join now. Walk the aisles and rescue anyone stuck on WiFi; nobody gets left offline.',
    },
    {
      kind: 'activity',
      activity: {
        id: 'upc1-m1-poll-1',
        kind: 'poll',
        prompt: 'Honest check: how confident are you about prevention science today?',
        options: [
          'Prevention what? First time hearing it.',
          'I have heard the words, pero medyo malabo pa.',
          'I know the basics from NDEP work.',
          'Confident — I could teach a colleague.',
        ],
      },
      note: 'This is the icebreaker and your baseline in one. Read the spread aloud and normalize the low end: "Perfect — this day was built exactly for you." No wrong answers here.',
    },
    {
      kind: 'statement',
      text: 'Prevention is not just about stopping drug use. It is about the safe, healthy development of every child — so they can reach their full potential.',
      attribution: 'Universal Prevention Curriculum, Module 1',
      note: 'Pause and let this reframe land: we are not the "anti-drug police," we are builders of healthy development. This is the heart of the whole training (manual p. 74).',
    },
    {
      kind: 'stat',
      value: '275M',
      label: 'people aged 15–64 used illicit substances at least once in 2018.',
      context:
        'Of those, 31 million developed substance use problems. Prevention exists so young people never join that number.',
      source: 'UNODC World Drug Report 2020',
      note: 'Let the number count up before you speak. Then bring it home: behind global figures are classrooms — and every classroom in the Philippines has an NDEP Coordinator. That is why this training exists.',
    },
    {
      kind: 'bullets',
      title: 'Why you — why NDEP Coordinators?',
      bullets: [
        'Prevention helps young people avoid or delay first use — before problems ever start.',
        'You are the face of prevention in your school — and also its voice.',
        'You translate the science for teachers, parents, and your community.',
        'This works only when programs are evidence-based — that evidence is what we learn today.',
      ],
      image: '/images/upc1-m1/concept.jpg',
      note: 'Adapted from the manual\'s "Managers and Supervisors: The Face of Prevention" (p. 75) — for us, that face is the coordinator. Point at the room on bullet two; make it personal.',
    },
    {
      kind: 'activity',
      activity: {
        id: 'upc1-m1-cloud-1',
        kind: 'wordcloud',
        prompt: 'One word: what do you hope to bring back to your school?',
        maxWords: 1,
      },
      note: 'This replaces the manual\'s index-card "Training Expectations" exercise. Read the biggest words aloud and promise to revisit the cloud at day\'s end — it becomes your closing callback.',
    },
    {
      kind: 'bullets',
      title: 'Where today takes us',
      bullets: [
        'How substance use begins and progresses — and where prevention can interrupt it.',
        'The science of prevention and the UNODC International Standards.',
        'Making programs work: implementation, monitoring, and evaluation.',
        'Your turn: applying it all to your own school.',
      ],
      note: 'This compresses the manual\'s learning objectives (Slide 1.2, p. 64) into a Day 1 map. Set two ground rules as you close: ask questions and make mistakes freely — and what is shared in this room stays in this room.',
    },
    {
      kind: 'recap',
      title: 'The opener, in one breath',
      points: [
        '275 million people used illicit substances in 2018; 31 million developed problems (UNODC).',
        'Prevention = safe, healthy development — not fear, not lectures.',
        'You are the face and voice of prevention in your school.',
        'Phones stay out — the whole day is interactive.',
      ],
      note: 'Read the points with the room, thank them for the poll and wordcloud honesty, then bridge: "So how big is the problem here, and how does use actually begin? That is Module 2."',
    },
  ],
  notes: {
    timing: {
      hide: [
        'All of Module 0\'s organization walkthrough — ISSUP membership levels, ICUDDR, GCCC credentialing, and the UN drug control treaties/CND/INCB slides (manual pp. 35–56). Mention in one sentence that this curriculum is internationally developed, then move on.',
        'The 60-minute partner-introductions exercise (Slide 1.3, p. 65) — the confidence poll and wordcloud do the connecting work in 6 minutes.',
        'The "Curricula in the Series" tour, Slides 1.13–1.21 (pp. 79–87) — the nine-course catalog is irrelevant to a one-day echo.',
        'The training-materials walkthrough (Slide 1.4, pp. 67–69) — participants have no Participant Manuals or notebooks; the app replaces them.',
      ],
      summarize: [
        'Ceremonial welcome + housekeeping (pp. 61–62): fold into the title slide, two sentences maximum.',
        'Ground rules (pp. 62–63): compress the newsprint exercise to a 60-second verbal moment on the course-map slide — ask questions, make mistakes, respect, collaborate, confidentiality, have fun.',
        'The Degenhardt country-prevalence table (Slide 1.6, p. 72): one spoken sentence — "use varies widely across countries, but almost everywhere it starts young."',
        'The "Why is prevention important for any nation?" economics slide (1.7, p. 73): one line inside the stat slide narration.',
      ],
      emphasize: [
        'The 275M / 31M UNODC figures (Slide 1.5, p. 70) — the single evidence anchor of the opener; let the count-up animation finish before speaking.',
        'The "face and voice of prevention" identity (Slide 1.9, p. 75) reframed for NDEP Coordinators — it is the emotional engine of the day.',
        'The QR join moment — if phones are not connected here, every activity for the rest of the day limps.',
      ],
    },
    fiveEs: {
      engage:
        'Open with a question, not a slide: "When you heard you were assigned as NDEP Coordinator, what was your first feeling — honor or dread?" Let two or three answers land, laugh with them, then say: by the end of today, that assignment will feel less like extra paperwork and more like the most important fence your school owns. Then get every phone connected at the QR slide before anything else.',
      explore:
        'The confidence poll and the wordcloud are deliberate low-stakes exploration — participants reveal where they stand and what they want before you teach anything. Read both results aloud and treat them as data: "Most of us are at level two — good, that is exactly the starting line this course assumes." Their own words in the cloud become the hooks you hang the day on.',
      explain:
        'Use the statement, stat, and "Why you" slides to name three ideas formally: prevention aims at healthy development, not just avoided drug use; 275 million people used illicit substances in 2018 and 31 million developed problems, per the UNODC World Drug Report 2020; and coordinators are the face and voice of prevention who translate science for their communities. Everything after lunch builds on these three.',
      apply:
        'On the course-map slide, ask each person to silently pick which of the four stops matters most for their own school right now, and to hold that choice — it becomes their lens for the day. Invite one volunteer per role (head teacher, nurse, counselor, admin) to say theirs aloud, so the room hears that the same day serves four different jobs.',
      evaluate:
        'The poll is your baseline: note roughly what fraction chose the two lowest confidence options, and compare it against the end-of-day confidence check. The wordcloud is your success criteria written by the participants themselves — at closing, put it back on screen and ask, word by word, "did you get this?"',
    },
    examples: {
      head_teacher:
        'When you echo this to your faculty, open your learning action cell the same way we opened today — one honest confidence poll — so teachers feel like learners, not auditees.',
      nurse_dentist:
        'The 275M/31M figure is your bridge line for parents during health assessments: "most who develop problems started young — which is why we screen and talk early, hindi para manghusga."',
      counselor:
        'Borrow the reframe directly for advisory sessions: introduce yourself to students as someone who builds healthy futures, not someone who catches drug users — watch how differently they open up.',
      admin: 'When the Division asks what NDEP budget lines are for, use today\'s one-liner: prevention is evidence-based programming, not one-time posters — and evidence-based programs need recurring support in the AIP.',
    },
    policyAlignment: [
      {
        order: 'DepEd Order No. 37, s. 2017',
        connection:
          'The National Drug Education Program designates and mobilizes exactly the people in this room — school NDEP Coordinators — making this UPC opener the scientific onboarding for the role the Order created.',
      },
      {
        order: 'RA 9165 (Comprehensive Dangerous Drugs Act of 2002)',
        connection:
          'Section 43 mandates the integration of drug education into school curricula at all levels — the UPC provides the prevention-science foundation for delivering that mandate with evidence instead of scare tactics.',
      },
    ],
    processingQuestions: [
      'The manual calls prevention professionals "the face and voice of prevention." In your school, where does your face already show up — and where has your voice been missing?',
      'Which felt more surprising: the size of the global numbers, or the idea that prevention is about healthy development rather than stopping drug use? Why?',
    ],
  },
};
