import type { Module } from '@/lib/types';

/**
 * UPC 1 · Module 5 — Evidence-Based Prevention Interventions and Policies:
 * The UNODC International Standards on Drug Use Prevention.
 * Source: UPC_1_TRAINER.pdf, Module 5 (manual pp. 313–409).
 */
export const module5: Module = {
  id: 'upc1-m5',
  course: 'upc1',
  number: 5,
  title: 'What Works: The UNODC Standards',
  tagline:
    'The world reviewed the evidence so we would not have to guess — what works, what does not, and what our schools should stop doing.',
  minutes: 60,
  heroImage: '/images/upc1-m5/hero.jpg',
  images: ['/images/upc1-m5/hero.jpg', '/images/upc1-m5/analogy.jpg', '/images/upc1-m5/concept.jpg'],
  analogy: {
    title: 'Gamot na May Rehistro',
    front:
      'A neighbor swears an unregistered remedy cured her cough — no FDA registration, just her testimonial. Would you give it to your students?',
    back:
      'Of course not. DOH/FDA registration is the standard of proof: tested, reviewed, shown to work. The UNODC International Standards are that registry for prevention programs. Before your school adopts any anti-drug activity, check the registry first.',
  },
  slides: [
    {
      kind: 'title',
      kicker: 'Day 1 · Module 5',
      title: 'What Works: The UNODC Standards',
      subtitle:
        'Evidence-based prevention interventions and policies — the UNODC International Standards on Drug Use Prevention.',
      image: '/images/upc1-m5/hero.jpg',
      note: 'Set the stakes: this is the module where we stop guessing. Everything from here on has been tested against research from around the world.',
    },
    {
      kind: 'statement',
      text: 'Most of what schools traditionally do for drug prevention has been proven NOT to work.',
      attribution: 'UNODC International Standards on Drug Use Prevention',
      note: 'Let this sting for a few seconds — many in the room have organized the very activities we are about to question. Then soften immediately: the good news is we now know exactly what DOES work, and that is what this hour is for. No blame; we did what we knew.',
    },
    {
      kind: 'activity',
      activity: {
        id: 'upc1-m5-poll-1',
        kind: 'poll',
        prompt: 'Which of these is proven effective at preventing student drug use?',
        options: [
          'A one-day anti-drug symposium with a celebrity speaker',
          'A tearful testimonial from a person in recovery',
          'A poster-making contest with scary drug images',
          'A skills-based curriculum taught over multiple sessions',
        ],
        correct: 3,
      },
      note: 'Most of the room will pick the symposium or the testimonial — that is the point. Do not reveal the answer yet if the room is split; say "hold your vote in your mind, and let us see what the evidence says." Return to this result after the what-does-not-work slide.',
    },
    {
      kind: 'activity',
      activity: {
        id: 'upc1-m5-slider-before',
        kind: 'slider',
        phase: 'before',
        pairId: 'upc1-m5-confidence',
        prompt: 'How confident are you right now in choosing prevention activities backed by evidence?',
        min: 1,
        max: 10,
        minLabel: 'Just starting',
        maxLabel: 'Ready to teach it',
      },
      note: 'Baseline reading. We repeat this exact slider at the end of the module to show growth. Expect low numbers — that is honest and fine.',
    },
    {
      kind: 'bullets',
      title: 'What does "evidence-based" actually mean?',
      bullets: [
        'Decisions made through systematic processes, not tradition or gut feel.',
        'Shown through scientific evidence to improve measurable outcomes.',
        'Relies on data from rigorous experimental research — control groups, follow-up.',
        'Multiple studies pointing the same way, not one success story.',
      ],
      note: 'Anchor on the Evidence-Based Practice Institute definition (manual p. 329): systematic decision-making + rigorous experimental data. Contrast: "we have always done it" and "it felt powerful" are testimonials, not evidence.',
    },
    {
      kind: 'stat',
      value: '584 → 256',
      label: 'studies were reviewed by 80+ UNODC experts; fewer than half survived the screening.',
      context:
        'Experts from 30+ countries screened every study for rigorous design — randomized trials, systematic reviews, meta-analyses. Each surviving intervention was then rated 1 to 5 stars for strength of evidence.',
      source: 'UPC-1 Trainer Manual, Module 5, pp. 319, 328, 338, 351',
      note: 'This is the quality filter. 328 studies were set aside for not meeting criteria. The star ratings (1 = limited to 5 = excellent) come up again on the what-works slides — plant the vocabulary here.',
    },
    {
      kind: 'analogy',
      title: 'Gamot na May Rehistro',
      front:
        'A neighbor swears an unregistered remedy cured her cough — no FDA registration, just her testimonial. Would you give it to your students?',
      back:
        'Of course not. DOH/FDA registration is the standard of proof: tested, reviewed, shown to work. The UNODC Standards are that registry for prevention programs. Before your school adopts any anti-drug activity, check the registry first.',
      image: '/images/upc1-m5/analogy.jpg',
      note: 'The anchor analogy of the module. Ask a volunteer: "Why do we demand FDA registration for medicine but accept any anti-drug activity on a testimonial?" Flip the card after they answer. Every later slide can be tied back to "may rehistro ba ito?"',
    },
    {
      kind: 'bullets',
      title: 'What works in the school',
      bullets: [
        'Skills-based prevention curricula — coping, personal, and social skills (★★★ good evidence).',
        'Classroom management training for teachers (★★★ good evidence).',
        'School policies and a positive school culture (★★ adequate evidence).',
        'Policies that keep children in school (★★ adequate evidence).',
      ],
      note: 'THE table for this audience (manual pp. 369, 380, 403). Notice what is on the list: ordinary school work done well — teaching skills, managing classrooms, clear policy. Nothing here is a one-day event. Parenting programs (★★★★) are the family-setting star; we touch them later.',
      image: '/images/upc1-m5/concept.jpg',
    },
    {
      kind: 'bullets',
      title: 'The recipe: why these work',
      bullets: [
        'Interactive methods — students practice skills, not just listen.',
        'A structured series of sessions, with boosters across school years.',
        'Trained teachers delivering the program as designed.',
        'Policy handled positively: counseling referral for violations, built with students, parents, and staff.',
      ],
      note: 'Content, structure, delivery — all ingredients must be present, "like a well-made cake" (manual p. 349). Stress the training bullet: the same curriculum with untrained teachers drops to no effect (p. 372). Policy detail from p. 384: specific substances named, access reduced, referral not punishment.',
    },
    {
      kind: 'bullets',
      title: 'What does NOT work',
      bullets: [
        'Scare tactics and fear arousal.',
        'Information-only lectures and one-off assemblies.',
        'Testimonials from former drug users.',
        'Punishing violations with suspension or expulsion — and random drug testing: "absolutely no evidence" it deters use.',
      ],
      note: 'The mic-drop slide (manual pp. 372, 383–384). Pause after each line. The drug-testing quote is verbatim from the manual (p. 384) — use it word for word when a policymaker pushes back. Also ineffective: self-esteem-only and emotional-education-only programs, unstructured dialogue sessions. Now revisit the opening poll: three of the four options are on this slide.',
    },
    {
      kind: 'activity',
      activity: {
        id: 'upc1-m5-drag-1',
        kind: 'dragdrop',
        prompt: 'Sort them: which side does the evidence support?',
        buckets: ['Evidence-based', 'Not supported by evidence'],
        items: [
          { label: 'Skills-based curriculum, multiple sessions, trained teachers', bucket: 0 },
          { label: 'One-time anti-drug assembly', bucket: 1 },
          { label: 'Parenting skills programs', bucket: 0 },
          { label: 'Scare tactics with graphic images', bucket: 1 },
          { label: 'Classroom management training for teachers', bucket: 0 },
          { label: 'Ex-drug-user testimonial in class', bucket: 1 },
          { label: 'Clear school policy with counseling referral for violations', bucket: 0 },
          { label: 'Information-only lecture on drug types', bucket: 1 },
        ],
      },
      note: 'The room now has the tools — expect high accuracy, which builds confidence. If someone protests "but the testimonial moved our students to tears," acknowledge it: emotion is not the outcome we measure; use does not go down (manual p. 383). Tears are not evidence.',
    },
    {
      kind: 'bullets',
      title: 'Beyond the school: policies that work',
      bullets: [
        'Parenting skills programs — the strongest card in the deck (★★★★ very good evidence).',
        'Policies limiting youth access to tobacco and alcohol.',
        'Brief interventions: short, one-to-one counseling by trained workers (★★★★).',
        'Community multi-component initiatives sustained beyond one year (★★★).',
      ],
      note: 'Summarize, do not dwell — family and community settings get dedicated courses later in the UPC series. The takeaway for coordinators: prevention is a system, and the school is one strong node in it. Brief interventions (manual p. 400) can be delivered in schools by trained counselors.',
    },
    {
      kind: 'activity',
      activity: {
        id: 'upc1-m5-cloud-1',
        kind: 'wordcloud',
        prompt: 'One word: what will you STOP doing?',
        maxWords: 1,
      },
      note: 'The commitment moment. Read the biggest words aloud without judgment — expect "symposium," "posters," "testimonial," "scare." Frame it as freedom: every peso and hour recovered from what does not work can fund what does.',
    },
    {
      kind: 'recap',
      title: 'The Standards, in one breath',
      points: [
        'Evidence-based = rigorous research, multiple studies — gamot na may rehistro.',
        'UNODC screened 584 studies down to 256 and star-rated what survived.',
        'The school’s proven tools: skills curricula, classroom management, positive policy and climate.',
        'Not supported: scare tactics, one-off assemblies, info-only lectures, testimonials, random drug testing.',
      ],
      note: 'Read the points with the room. Bridge forward: the next modules turn this "what" into the "how" for your own school’s NDEP plan.',
    },
    {
      kind: 'activity',
      activity: {
        id: 'upc1-m5-quiz-1',
        kind: 'quiz',
        title: 'Quick check: What works?',
        questions: [
          {
            prompt: 'What makes a prevention intervention "evidence-based"?',
            options: [
              'It has been done for many years',
              'It is endorsed by a famous personality',
              'Rigorous research shows it improves measurable outcomes',
              'Students say they enjoyed it',
            ],
            correct: 2,
            seconds: 20,
          },
          {
            prompt: 'Which school intervention has GOOD evidence behind it?',
            options: [
              'A one-time anti-drug symposium',
              'A skills-based curriculum taught by trained teachers',
              'A scary-poster contest',
              'A testimonial from a former drug user',
            ],
            correct: 1,
            seconds: 20,
          },
          {
            prompt: 'A student violates the school substance policy. What does the evidence say to do?',
            options: [
              'Suspend the student',
              'Expel the student',
              'Refer the student to counseling and support',
              'Start random drug testing for everyone',
            ],
            correct: 2,
            seconds: 20,
          },
          {
            prompt: 'What did the UNODC review find about random drug testing in schools?',
            options: [
              'It is the most effective deterrent',
              'It works only in high schools',
              'It works when paired with assemblies',
              'There is no evidence it deters substance use',
            ],
            correct: 3,
            seconds: 20,
          },
        ],
      },
      note: 'Formative, not graded — celebrate speed and honesty. Question 3 and 4 are the ones coordinators will be challenged on by parents and principals; make sure the room can defend them with the manual citation (p. 384).',
    },
    {
      kind: 'activity',
      activity: {
        id: 'upc1-m5-slider-after',
        kind: 'slider',
        phase: 'after',
        pairId: 'upc1-m5-confidence',
        prompt: 'Now: how confident are you in choosing prevention activities backed by evidence?',
        min: 1,
        max: 10,
        minLabel: 'Just starting',
        maxLabel: 'Ready to teach it',
      },
      note: 'The payoff — the stage shows the before → after shift. Name the growth out loud, then close: "You now hold the registry. Use it before every activity you approve."',
    },
  ],
  notes: {
    timing: {
      hide: [
        'If severely short on time: hide the "Beyond the school" slide entirely — family and community interventions get dedicated UPC courses later.',
        'The wordcloud can be dropped if the drag-and-drop discussion runs long; the commitment framing moves to the recap.',
      ],
      summarize: [
        'Family, community, and media intervention detail: name the star ratings and move on — participants will meet parenting programs, community coalitions, and media campaigns in depth in their dedicated courses.',
        'The 584→256 screening story: one breath is enough — the point is the filter exists, not its mechanics.',
      ],
      emphasize: [
        'The school-setting table (skills curricula, classroom management, school policy and climate) — this is the audience’s daily terrain and the heart of the module.',
        'The what-does-NOT-work list, especially the verbatim finding that there is "absolutely no evidence" random drug testing deters use, and that suspension/expulsion leaves use unchanged or worse — these overturn common practice and need unhurried air time.',
      ],
    },
    fiveEs: {
      engage:
        'Open cold with the statement slide: most traditional school drug prevention is proven not to work. Let the discomfort land, then immediately reassure — no blame, we did what we knew, and now we know better. Run the poll while the tension is fresh; most will choose the symposium or the testimonial. Do not correct them yet. Tell them their own votes will be the evidence later. This gap between what we believe works and what actually works is the engine of the whole module.',
      explore:
        'Before giving the lists, ask table groups to recall every anti-drug activity their schools ran in the last two years and write each on a sticky note. Keep the wall visible. As the what-works and what-does-not-work slides unfold, participants physically re-sort their own school’s activities. The drag-and-drop activity then formalizes what they discovered themselves: the sorting rules come from the UNODC review, not from the trainer’s opinion, and most of their wall sits on the unsupported side.',
      explain:
        'Name the machinery precisely: evidence-based means systematic decision-making backed by rigorous experimental research, not tradition or testimony. Walk the 584→256 screening and the 1-to-5-star ratings so participants trust the filter. Then teach the school table with its stars — skills curricula (★★★), classroom management (★★★), school policy and climate (★★) — and the recipe behind them: interactive delivery, structured sessions with boosters, trained teachers, policies that refer rather than punish. Anchor everything to "gamot na may rehistro."',
      apply:
        'Each participant drafts one concrete swap for their own school: one activity to stop (from the unsupported list) and the evidence-based activity that inherits its budget and hours — for example, replacing the annual symposium with a teacher-training day for a skills-based curriculum, or rewriting the student handbook’s drug clause from suspension to counseling referral. The wordcloud captures the "stop" commitment publicly; the swap goes into their NDEP action plan for Module 6.',
      evaluate:
        'Three reads: the recap quiz (four items targeting the definition, the school table, positive policy response, and drug testing — the claims coordinators must defend publicly); the drag-and-drop accuracy as a room-level check that the sorting rule transferred; and the before/after confidence pair, which shows each participant their own movement from "just starting" toward "ready to teach it." Park unresolved objections (usually drug testing) for the open forum.',
    },
    examples: {
      head_teacher:
        'Audit your school’s NDEP activity list against the Standards: if the line items are a symposium, a poster contest, and a testimonial assembly, redirect those hours into a skills-based curriculum block taught by teachers you send to training — the same budget, evidence-based this time.',
      nurse_dentist:
        'When a parent or principal proposes random drug testing, you are the clinical voice: cite the UNODC finding that there is no evidence it deters use, and offer the evidence-based alternative — validated screening and referral of students who show psychological vulnerabilities to trained counselors.',
      counselor:
        'Position yourself as the "positive sanction" the Standards require: propose that the student handbook route substance-policy violations to structured counseling sessions with you instead of suspension — the evidence shows punishment leaves use unchanged or worse, while referral protects both the child and the school’s climate.',
      admin:
        'Before signing any procurement or activity request labeled "drug prevention," ask the registry question: which evidence-based category does this fall under? Keep a one-page copy of the effective/ineffective lists at your desk — it turns budget review into prevention quality control.',
    },
    policyAlignment: [
      {
        order: 'DepEd Order No. 37, s. 2017',
        connection:
          'The National Drug Education Program calls for preventive drug education integrated into instruction — the UNODC Standards supply the quality bar for that mandate: skills-based curricula delivered by trained teachers in structured sessions, not one-off information campaigns.',
      },
      {
        order: 'Barkada Kontra Droga',
        connection:
          'Viewed honestly through the evidence lens: peer-group programs are only as good as their structure. A BKD chapter that runs one-time rallies and poster contests sits on the unsupported side of the ledger; a BKD chapter used as the vehicle for sustained, adult-facilitated skills sessions and positive school-climate work moves it toward what the Standards support. Keep the brand, upgrade the contents.',
      },
      {
        order: 'DepEd School Mental Health Program (per RA 11036, Mental Health Act)',
        connection:
          'The Standards’ evidence-based response to policy violations and to psychologically vulnerable students — screening with validated tools and referral to counseling by trained professionals — is exactly the pathway the school mental health program builds, making it the natural home for the "referral, not punishment" requirement.',
      },
    ],
    processingQuestions: [
      'Which activity in your own school’s current drug-prevention lineup landed on the "not supported by evidence" side today — and what made it feel effective all these years?',
      'If you could move one peso and one hour from an ineffective activity to an evidence-based one this school year, what exactly would the swap be, and who do you need to convince?',
    ],
  },
};
