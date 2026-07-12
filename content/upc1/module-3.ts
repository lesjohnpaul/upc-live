import type { Module } from '@/lib/types';

/**
 * UPC 1 · Module 3 — Prevention Science: Definitions and Principles.
 * Source: UPC_1_TRAINER.pdf, manual pp. 183–246 (Slides 3.1–3.48).
 * Compressed from the manual's 3h40m to a 75-minute echo-training block.
 */
export const module3: Module = {
  id: 'upc1-m3',
  course: 'upc1',
  number: 3,
  title: 'Prevention Science: Definitions and Principles',
  tagline: 'Why good intentions are not enough — and what the science of the fence actually says.',
  minutes: 75,
  heroImage: '/images/upc1-m3/hero.jpg',
  slides: [
    {
      kind: 'title',
      kicker: 'Day 1 · Module 3',
      title: 'Prevention Science: Definitions and Principles',
      subtitle: 'Why good intentions are not enough — and what the science of the fence actually says.',
      note: 'This is the conceptual heart of Day 1 — set the energy high. Tell the room: after this module, you will never look at a one-time drug lecture the same way again.',
    },
    {
      kind: 'statement',
      text: 'Good intentions do not prevent substance use. Good science does.',
      note: 'Pause after this lands. Ask for a show of hands: who has seen a well-meaning anti-drug activity that changed nothing? Almost every hand goes up — that tension powers the whole module.',
    },
    {
      kind: 'activity',
      activity: {
        id: 'upc1-m3-poll-open',
        kind: 'poll',
        prompt: 'Your school wants to stop substance use before it starts. Based on gut feel — which works best?',
        options: [
          'A one-time shock lecture with scary photos',
          'Posters and slogans around the campus',
          'An evidence-based program that builds skills over many sessions',
          'Surprise bag inspections',
        ],
        correct: 2,
      },
      note: 'Expect votes on the shock lecture — that is the "common sense" trap. Do not correct anyone yet; promise the science will settle it, then return to this result at the recap.',
    },
    {
      kind: 'activity',
      activity: {
        id: 'upc1-m3-slider-before',
        kind: 'slider',
        phase: 'before',
        pairId: 'upc1-m3-confidence',
        prompt: 'How confident are you right now that you could explain prevention science to your school staff?',
        min: 1,
        max: 10,
        minLabel: 'Just starting',
        maxLabel: 'Ready to teach it',
      },
      note: 'Baseline reading — reassure them low numbers are expected and honest. We repeat this exact slider at the end of the module to show growth.',
    },
    {
      kind: 'bullets',
      title: 'What is prevention science?',
      bullets: [
        'Its goal: improve public health by changing malleable — changeable — risk and protective factors.',
        'It tests whether interventions actually work (efficacy and effectiveness), not whether they feel right.',
        'It finds the best ways to spread what works (dissemination and diffusion).',
        'It has two arms that need each other: research and practice.',
      ],
      note: 'This is the SPR 2011 definition (manual p. 188, Slide 3.5). Stress the word "malleable" — we only aim at what we can actually change. You, the coordinators, are the practice arm.',
    },
    {
      kind: 'stat',
      value: '3',
      label: 'legs hold up prevention science: epidemiology & etiology, intervention development, and research methodology.',
      context:
        'Kick one leg away — skip the data, skip the design, or skip the evaluation — and the whole thing falls. That is why one-off activities rarely work.',
      source: 'UPC 1 Trainer Manual, p. 202 (Slide 3.16)',
      note: 'Make it concrete: epidemiology asks "what is happening to our learners?", intervention development asks "what do we do about it?", research asks "did it work?"',
    },
    {
      kind: 'analogy',
      title: 'Ang Bakod at ang Ambulansya',
      front:
        'A barangay has a cliff where people keep falling. They can build a fence at the top — or park an ambulance in the valley below. Saan mo ilalagay ang pondo?',
      back:
        'Prevention science is the engineering of the fence: where to put it, how tall, from what material — all measured, all tested. Treatment is the ambulance. We need both, but every peso on a well-engineered fence saves more people than a peso on the ambulance.',
      image: '/images/upc1-m3/analogy.jpg',
      note: 'Before flipping, let two volunteers argue fence vs ambulance for a minute. Then flip and land the twist: prevention science is not just choosing the fence — it is engineering it so it actually holds.',
    },
    {
      kind: 'bullets',
      title: 'What loads the dice: the Etiology Model',
      bullets: [
        'Personal characteristics: genetics, temperament, physiology.',
        'Micro-level environments: family, peers, school, workplace.',
        'Macro-level environments: poverty, the social and physical environment.',
        'These layers interact — together they shape beliefs, attitudes, and behavior.',
      ],
      image: '/images/upc1-m3/concept.jpg',
      note: 'Manual Slide 3.8 (p. 192). Key line: the layers do not act independently — a parent losing a job (macro) strains parenting at home (micro). And notice which micro-environment you control every single day: the school.',
    },
    {
      kind: 'activity',
      activity: {
        id: 'upc1-m3-dragdrop-factors',
        kind: 'dragdrop',
        prompt: 'Sort them: does this load the dice toward substance use, or unload it?',
        buckets: ['Risk Factor', 'Protective Factor'],
        items: [
          { label: 'Parents who use drugs or are negligent', bucket: 0 },
          { label: 'Positive, supportive parenting', bucket: 1 },
          { label: 'Belief that "most of my peers use it anyway"', bucket: 0 },
          { label: 'A practiced repertoire of refusal skills', bucket: 1 },
          { label: 'Home and school sending conflicting messages', bucket: 0 },
          { label: 'Teachers trained as socialization agents', bucket: 1 },
          { label: 'A disorganized, unsafe neighborhood', bucket: 0 },
          { label: 'Clear norms that substance use is not accepted', bucket: 1 },
        ],
      },
      note: 'All items come straight from the manual (pp. 195–196, 198, 215, 219–220). Debrief with the core rule: no single factor decides a child\'s fate — it is the accumulation, and the school can tip the balance.',
    },
    {
      kind: 'bullets',
      title: 'The developmental lens: why timing matters',
      bullets: [
        'Every stage of growing up has benchmarks — language, emotional control, social skills.',
        'Children who miss early benchmarks become the most vulnerable to later problems.',
        'Transitions raise risk — like moving from home into school for the first time.',
        'So prevention is matched to age and stage, not one-size-fits-all.',
      ],
      note: 'Manual pp. 190–191, 195. Speak to the room: a Grade 1 teacher and a Grade 10 adviser are guarding two different sections of the same fence — same cliff, different heights.',
    },
    {
      kind: 'bullets',
      title: 'Socialization: how children learn who to become',
      bullets: [
        'Socialization = learning the culture, attitudes, beliefs, language, and behavior of society.',
        'Its main agents: parents and teachers.',
        'Prevention specialists either train those agents — or step in and become one.',
        'In today\'s complex world (mobility, social media, home-vs-school conflicts), it often goes wrong on its own.',
      ],
      note: 'Manual pp. 194–198 (Slides 3.10–3.13). Land the identity shift: every teacher in your school is already a socialization agent — the only question is whether they are a trained one.',
    },
    {
      kind: 'activity',
      activity: {
        id: 'upc1-m3-wordcloud',
        kind: 'wordcloud',
        prompt: 'In one word: who most shaped your values when you were growing up?',
        maxWords: 3,
      },
      note: 'Watch "nanay", "tatay", "teacher", "lola" dominate the cloud. Read the biggest words aloud, then connect: those are socialization agents — and for many learners today, YOU are that word.',
    },
    {
      kind: 'bullets',
      title: 'Aiming the intervention: three levels of risk',
      bullets: [
        'Universal — everyone, risk unknown: a whole class in a regular school.',
        'Selective — known at-risk groups: children of substance users, children in poverty.',
        'Indicated — individuals already using, but not yet dependent.',
        'The school classroom is the classic universal setting — that is your home field.',
      ],
      note: 'Manual pp. 204–205 (Slide 3.18). Quick check: ask the room to classify a session for children of detained PDL parents (selective) versus a homeroom prevention lesson (universal).',
    },
    {
      kind: 'statement',
      text: 'Adapt the language, the examples, the images — never the core. When in doubt: add, rather than subtract.',
      attribution: 'Fidelity vs. adaptation — SAMHSA guidance, UPC 1 Trainer Manual, p. 229',
      note: 'This is the balancing act (Slides 3.34–3.38): tailoring to Filipino learners is encouraged, but stripping sessions or core skills out of an evidence-based program quietly kills what made it work.',
    },
    {
      kind: 'recap',
      title: 'Module 3, in one breath',
      points: [
        'Prevention science engineers the fence — it changes malleable risk and protective factors, and proves it.',
        'Three legs: epidemiology & etiology, intervention development, research methodology.',
        'Factors accumulate across child, family, school, and community — the school can tip the balance.',
        'Teachers are socialization agents; adapt the surface of programs, never the core.',
      ],
      note: 'Read the points with the room, then call back the opening poll: now the science has settled it — skills-based, sustained, evidence-based programs beat the shock lecture.',
    },
    {
      kind: 'activity',
      activity: {
        id: 'upc1-m3-quiz',
        kind: 'quiz',
        title: 'Quick check: the science of the fence',
        questions: [
          {
            prompt: 'What is the primary goal of prevention science?',
            options: [
              'To punish those who sell drugs near schools',
              'To improve public health by changing malleable risk and protective factors',
              'To treat learners who are already dependent',
              'To scare the youth with worst-case consequences',
            ],
            correct: 1,
            seconds: 20,
          },
          {
            prompt: 'Which are the three "legs" of prevention science?',
            options: [
              'Lecture, poster-making, drug testing',
              'Punishment, surveillance, rehabilitation',
              'Epidemiology & etiology, intervention development, research methodology',
              'Fear, discipline, motivation',
            ],
            correct: 2,
            seconds: 20,
          },
          {
            prompt: 'A prevention lesson delivered to an entire regular class, regardless of risk, is:',
            options: ['Universal', 'Selective', 'Indicated', 'Clinical'],
            correct: 0,
            seconds: 20,
          },
          {
            prompt: 'Socialization is best described as…',
            options: [
              'Making friends on social media',
              'Learning the culture, attitudes, beliefs, and behavior of society',
              'A school program for shy learners',
              'The stage when teens rebel against parents',
            ],
            correct: 1,
            seconds: 20,
          },
        ],
      },
      note: 'Formative, not graded — keep it playful. If a question splits the room, spend 30 seconds re-teaching that beat before moving on.',
    },
    {
      kind: 'activity',
      activity: {
        id: 'upc1-m3-slider-after',
        kind: 'slider',
        phase: 'after',
        pairId: 'upc1-m3-confidence',
        prompt: 'Now — how confident are you that you could explain prevention science to your school staff?',
        min: 1,
        max: 10,
        minLabel: 'Just starting',
        maxLabel: 'Ready to teach it',
      },
      note: 'The payoff moment — the stage shows the before → after confidence shift. Name the growth out loud, then bridge to the next module: now that we know the science, let us look at what evidence-based interventions exist.',
    },
  ],
  notes: {
    timing: {
      hide: [
        'Slide 3.24 (Stages of Research in Prevention Research Cycle) — too technical for a 1-day echo; the "three legs" stat slide carries the idea.',
        'Slides 3.28–3.30 (theoretical models and the Program "X" diagram) — mention Program X verbally in one sentence, skip the diagrams.',
        'Slide 3.36 (Castro fidelity-adaptation consequences table) — the "add, rather than subtract" statement slide replaces it.',
        'The 45-minute Small-group Exercise: Community Problem (Slide 3.42) — replaced by the live risk-vs-protective dragdrop.',
      ],
      summarize: [
        'Slides 3.25–3.27 (theory catalog) in 30s: name only Bandura\'s Social Learning Theory and Hawkins\' Risk and Protective Factors; say the rest live in the Participant Manual, p. 245.',
        'Slides 3.43–3.46 (Prevention Research Methodologies) in 30s: one line — efficacy asks "does it work in ideal conditions?", effectiveness asks "does it work in the real world?"',
        'Slides 3.18–3.21 (intervention and policy assumptions) in 30s: keep only universal/selective/indicated, which gets its own slide here.',
      ],
      emphasize: [
        'Slide 3.5 (SPR 2011 definition of prevention science) — this is the sentence they must be able to say back.',
        'Slides 3.7–3.10 (guiding principles, Etiology Model, developmental benchmarks, socialization) — the scientific core of the whole day.',
        'Slide 3.16 (the three major components / legs) — the mental filing cabinet for every later module.',
        'Slide 3.38 (fidelity vs. adaptation — "add, rather than subtract") — the rule that protects every program they will echo.',
        'Slide 3.47 (why prevention science matters to practitioners) — the send-off: it is cost-effective only when done with fidelity and sustained.',
      ],
    },
    fiveEs: {
      engage:
        'Open with the cliff. A barangay keeps losing people over the edge — fence at the top, or ambulance in the valley? Let seatmates argue for two minutes, then run the opening poll about the shock lecture. Most rooms vote wrong, and that is the gift: "Your gut just failed you — and that is exactly why prevention became a science." Do not resolve the tension yet. Promise them that in seventy-five minutes, they will know why the lecture fails and what actually holds the fence up.',
      explore:
        'Run the risk-vs-protective dragdrop before any formal teaching of factor theory. Let them sort "parents who use drugs," "refusal skills," "home and school sending conflicting messages" by instinct. Their wrong answers are doors: when someone puts "belief that most peers use it anyway" in the wrong bucket, you have the perfect entry into normative perceptions — one of the most powerful and least obvious risk factors in the manual. Follow with the wordcloud on who shaped their values; the room discovers socialization before you ever define it.',
      explain:
        'Now name what they just experienced. The SPR 2011 definition: improving public health by changing malleable risk and protective factors — stress "malleable," we aim only at what can change. The three legs: epidemiology tells us what is happening, intervention development tells us what to do, research methodology tells us if it worked. The Etiology Model stacks the layers — personal, micro, macro — and the developmental lens adds timing. Close the loop on the cliff: prevention science is not choosing the fence, it is engineering it.',
      apply:
        'Bring it home to their Division. Every role in the room touches a different plank of the fence: the head teacher shapes classroom climate, the nurse measures what is happening to learners, the counselor catches the children who missed developmental benchmarks, the admin officer writes the policies that set the norms. Ask each table: name one malleable factor in YOUR school you could realistically move this quarter — and which of the three risk levels (universal, selective, indicated) your idea targets. Two minutes, then harvest three answers.',
      evaluate:
        'The four-question quiz is the formative check — definition, three legs, universal targeting, socialization. Watch question two: if the room fumbles the three legs, the filing cabinet for Modules 4 and 5 is not built yet, so re-teach it in thirty seconds. Then close with the after-slider and put the confidence shift on screen. The distance between the before and after readings is the module\'s own efficacy study — say that out loud; it models the very science they just learned.',
    },
    examples: {
      head_teacher:
        'In your Learning Action Cell, audit one micro-environment you control: classroom climate. Pick a single malleable factor — for example, teachers greeting learners by name at the door and enforcing clear, consistent norms — and make it a school-wide positive behavior support routine for one grading period, then review referral data before and after.',
      nurse_dentist:
        'You own the epidemiology leg. In the annual medical and dental assessment, systematically record two or three risk indicators the manual names — sleep problems, signs of neglect, family instability — so the school has actual local data on vulnerability instead of guesswork when prioritizing prevention activities.',
      counselor:
        'Build a selective-level watchlist grounded in the manual\'s risk categories: learners with substance-using or absent caregivers, learners who missed developmental benchmarks, learners in transition (new transferees, Grade 7 entrants). Offer them small-group psychosocial sessions and a clear referral path to the RHU or CGC before any problem behavior surfaces.',
      admin:
        'Norms are set by policy. Review your School Improvement Plan and child protection documentation: is there a written, consistently enforced policy on substance-related incidents, and a budget line for sustained prevention activities — not one-time events? "Sustained with fidelity" is an administrative act before it is a teaching act.',
    },
    policyAlignment: [
      {
        order: 'DepEd Order No. 37, s. 2017 (National Drug Education Program)',
        connection:
          'The NDEP mandates preventive drug education integrated across the curriculum and sustained through the school year — exactly the "universal, sustained, evidence-based" prescription of this module, as opposed to the one-time symposium the science warns against.',
      },
      {
        order: 'DepEd Order No. 40, s. 2012 (Child Protection Policy)',
        connection:
          'The Child Protection Policy operationalizes protective factors: a safe, nurturing, non-violent school directly strengthens the micro-level environment the Etiology Model identifies, and its positive discipline provisions make every teacher a trained socialization agent.',
      },
      {
        order: 'Barkada Kontra Droga (DDB Board Regulation, school-based chapters)',
        connection:
          'BKD is peer-level prevention in action: it targets the peer micro-environment and normative beliefs — the "most of my peers use it anyway" risk factor — by making the visible, organized norm on campus one of non-use.',
      },
      {
        order: 'School Mental Health Program (RA 11036 / DepEd MHPSS issuances)',
        connection:
          'Missed developmental benchmarks and psychosocial distress are the vulnerability pathway this module describes; school mental health services are the selective and indicated layers of the same fence, catching learners the universal layer cannot hold alone.',
      },
    ],
    processingQuestions: [
      'Think of your own school: which single risk factor from today\'s sorting activity is doing the most damage — and which protective factor is your cheapest, fastest counter-move?',
      'Where has your school been "parking the ambulance" — spending effort reacting to incidents — when a fence would have been cheaper?',
    ],
  },
};
