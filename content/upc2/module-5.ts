import type { Module } from '@/lib/types';

/** UPC 2 · Module 5 — Know the Substances (Substances of Abuse: Characteristics and Consequences). */
export const module5: Module = {
  id: 'upc2-m5',
  course: 'upc2',
  number: 5,
  title: 'Know the Substances',
  tagline: 'Four kinds of weather, one schoolyard — read the sky early.',
  minutes: 75,
  heroImage: '/images/upc2-m5/hero.jpg',
  images: ['/images/upc2-m5/concept.jpg'],
  analogy: {
    title: 'Apat na Klase ng Panahon',
    front:
      'One schoolyard. Four kinds of weather can roll in — and each one changes how the day feels and how safe it is.',
    back:
      'Stimulants are the noon-time sun: everything speeds up, then burns. Depressants are the heavy rain: everything slows, and judgment floods. Opioids are the fog: they numb all pain — and all warning. Hallucinogens are the habagat winds: the world bends and you cannot trust the ground. One schoolyard, four forecasts, one job — read the sky early.',
  },
  slides: [
    {
      kind: 'title',
      kicker: 'Day 2 · Module 5',
      title: 'Know the Substances',
      subtitle: 'Substances of abuse: characteristics and consequences — stated plainly.',
      image: '/images/upc2-m5/hero.jpg',
      note: 'Welcome the group to the last stretch. Frame the goal: not to become pharmacologists, but to recognize the substances our students actually meet — and what they do to a still-growing body and mind.',
    },
    {
      kind: 'statement',
      text: 'The substances your students meet first are usually the legal ones: alcohol, nicotine, and the solvents under the sink.',
      attribution: 'UPC 2, Module 5',
      note: 'This is the ENGAGE hook. Let it sit. The room expects "drugs" to mean shabu or heroin — but early exposure is far more often to what is cheap, legal, and already at home. Early use raises the chance of more serious use later (Slide 5.22 in the manual).',
    },
    {
      kind: 'activity',
      activity: {
        id: 'upc2-m5-poll-1',
        kind: 'poll',
        prompt: 'Which substance do you believe is the biggest threat to YOUR students?',
        options: [
          'Alcohol',
          'Tobacco / nicotine (including vapes)',
          'Cannabis (marijuana)',
          'Shabu (methamphetamine)',
          'Inhalants / solvents',
        ],
      },
      note: 'Opinion poll — no right answer. Read the spread aloud. Whatever wins, note it: perception and prevalence do not always match. Return to this at recap.',
    },
    {
      kind: 'activity',
      activity: {
        id: 'upc2-m5-slider-before',
        kind: 'slider',
        phase: 'before',
        pairId: 'upc2-m5-confidence',
        prompt: 'Right now, how ready are you to teach a student about these substances and their effects?',
        min: 1,
        max: 10,
        minLabel: 'Just starting',
        maxLabel: 'Ready to teach it',
      },
      note: 'Baseline reading. We repeat this exact slider at the very end to show the shift. Do not skip — the after-slide needs this to compare against.',
    },
    {
      kind: 'analogy',
      title: 'Apat na Klase ng Panahon',
      front:
        'One schoolyard. Four kinds of weather can roll in — and each one changes how the day feels and how safe it is.',
      back:
        'Stimulants = the noon-time sun (everything speeds up, then burns). Depressants = the heavy rain (everything slows, judgment floods). Opioids = the fog (numbs all pain and all warning). Hallucinogens = the habagat winds (the world bends, you cannot trust the ground). One schoolyard, four forecasts, one job — read the sky early.',
      image: '/images/upc2-m5/analogy.jpg',
      note: 'Click to flip. This maps directly onto the Module 2 classification (Slide 5.11): stimulants increase CNS activity; depressants and opioids decrease it; hallucinogens distort the senses. Ask a volunteer to name a substance for each "weather" before you flip.',
    },
    {
      kind: 'bullets',
      title: 'Alcohol — the heavy rain (a depressant)',
      bullets: [
        'Slows the central nervous system: relaxation and lowered inhibitions first, then slurred speech, poor coordination, and impaired judgment.',
        'Heavy or long-term use can cause or worsen depression, and damage the liver.',
        'Women tend to develop alcohol-related problems, such as cirrhosis, sooner than men — even at similar intake (US CSAT, TIP 51, 2009).',
        'Mixing alcohol with other depressants or opioids sharply raises the risk of fatal slowed breathing.',
      ],
      note: 'Person-first: "a student who drinks," not "a drinker." Emphasize the combination risk — this is where deaths happen. Source: Resource Page 5.3 (Depressants) and Slide 5.16.',
    },
    {
      kind: 'bullets',
      title: 'Tobacco / nicotine — a stimulant',
      bullets: [
        'Nicotine is a stimulant, and tobacco is one of the substances a young person is most likely to try first.',
        'Tolerance and addiction develop quickly — quitting becomes genuinely hard.',
        'Long-term consequences: chronic lung disease, cardiovascular disease, stroke, and cancer.',
        'Used during pregnancy, it is linked to adverse pregnancy outcomes.',
      ],
      note: 'Source: Resource Page 5.9 summary table (nicotine). VAPING NOTE: e-cigarettes are not covered in this manual, but they deliver the same addictive nicotine — treat a vape as a nicotine-delivery device, and align it with DepEd tobacco- and vape-free schools policy. Keep the tone factual, never scare-tactic.',
    },
    {
      kind: 'bullets',
      title: 'Cannabis (marijuana) — outside the four classes',
      bullets: [
        'From the plant Cannabis sativa; usually smoked (effects in minutes, wear off in 2–3 hours) or eaten (onset 30–60 min, up to 6 hours).',
        'Short-term: bloodshot eyes, poor coordination and depth perception, difficulty thinking and solving problems; sometimes panic reactions.',
        'Heavy long-term use: chronic cough, short-term memory and learning problems lasting days to weeks, delayed emotional development.',
        'A "motivational syndrome" can develop — reduced energy and reduced interest in school; withdrawal (irritability, poor sleep, low appetite) is mild.',
      ],
      note: 'Source: Resource Page 5.7. Note it does not fit neatly into the four classes. Land the school-relevant part: memory, concentration, and loss of interest in schoolwork are what staff actually see.',
    },
    {
      kind: 'bullets',
      title: 'Methamphetamine (shabu) — the noon-time sun',
      bullets: [
        'A powerful stimulant, known locally as shabu; smoked, snorted, or injected. Effects last 4–6 hours, or 8+ hours when smoked.',
        'Short-term: high energy and alertness, little appetite, agitation; at higher doses, aggression, paranoia, and formication (a feeling of bugs crawling on the skin).',
        'Long-term: extreme weight loss, severe dental decay ("meth mouth"), facial and body sores from scratching, heart and lung damage, paranoid psychosis.',
        'Chronic use changes the brain; some changes persist long after use stops, though some reverse after sustained abstinence — about 2 years.',
      ],
      note: 'Source: Resource Page 5.2 (Stimulants), pp. 296–300. The PH-relevant substance — give it room. Person-first: "a person who uses shabu." Consequences plainly, no glamor, no fear-mongering.',
    },
    {
      kind: 'bullets',
      title: 'Inhalants — watch the youngest learners',
      bullets: [
        'Everyday products: solvents (glue, paint thinner, correction fluid), aerosols, and gases (butane, lighter fluid) — cheap, legal, and found under the sink.',
        'The "high" lasts only minutes, so a user inhales again and again over hours.',
        'Short-term: headache, confusion, slurred speech, drowsiness, poor coordination — it can look like drunkenness; a chemical smell and sores around the mouth or nose may be visible.',
        'Serious risk: even one session can cause sudden heart failure or suffocation in an otherwise healthy young person; long-term use damages the brain, hearing, liver, and kidneys.',
      ],
      note: 'Source: Resource Page 5.6, pp. 309–311. EMPHASIZE for those who teach younger learners — inhalants are often the very first substance because they are so accessible. State the sudden-death risk once, calmly, as fact.',
    },
    {
      kind: 'activity',
      activity: {
        id: 'upc2-m5-drag-1',
        kind: 'dragdrop',
        prompt: 'Sort each substance into its class (reinforcing Module 2).',
        buckets: ['Stimulants', 'Depressants', 'Opioids', 'Hallucinogens'],
        items: [
          { label: 'Shabu (methamphetamine)', bucket: 0 },
          { label: 'Cocaine', bucket: 0 },
          { label: 'Nicotine', bucket: 0 },
          { label: 'Alcohol', bucket: 1 },
          { label: 'Benzodiazepines (Valium, Xanax)', bucket: 1 },
          { label: 'Heroin', bucket: 2 },
          { label: 'Morphine', bucket: 2 },
          { label: 'LSD', bucket: 3 },
          { label: '"Magic mushroom" (psilocybin)', bucket: 3 },
        ],
      },
      note: 'Classifications from the manual (Slides 5.11–5.12, Resource Page 5.9). This is where opioids, depressants, and hallucinogens as classes get reinforced. Note aloud: cannabis and inhalants are deliberately left out — the manual treats them as "other," outside the four classes.',
    },
    {
      kind: 'bullets',
      title: 'What can school staff actually see?',
      bullets: [
        'Sped up (shabu, nicotine, cocaine): restless, awake for long stretches, sudden weight loss, irritable or aggressive, skin-picking sores.',
        'Slowed down (alcohol, opioids): slurred speech, poor coordination, drowsy or nodding off, "pinpoint" pupils with opioids, smell of alcohol.',
        'Cannabis: bloodshot eyes, memory and concentration problems, loss of interest in schoolwork.',
        'Inhalants (watch the youngest): chemical smell on breath or clothes, sores around mouth or nose, a dazed, drunk-like look.',
      ],
      image: '/images/upc2-m5/concept.jpg',
      note: 'EMPHASIZE. Drawn from the side-effect lists in Resource Pages 5.1–5.7. These are observations, not diagnoses — a sign is a reason to care and refer, never a verdict. Route through the guidance counselor and follow child-protection procedures.',
    },
    {
      kind: 'activity',
      activity: {
        id: 'upc2-m5-cloud-1',
        kind: 'wordcloud',
        prompt: 'One word: what will you watch for now?',
        maxWords: 3,
      },
      note: 'Read the biggest words aloud. Connect them back to the observable signs and to the four "weathers." Keep it moving — 60 seconds.',
    },
    {
      kind: 'recap',
      title: 'The module, in one breath',
      points: [
        'Four weathers, one schoolyard: stimulants speed up, depressants and opioids slow down, hallucinogens distort.',
        'The first substances are usually the legal ones — alcohol, nicotine, inhalants under the sink.',
        'Shabu and inhalants carry the heaviest PH-school stakes; state consequences plainly, never sensationally.',
        'You are not diagnosing — you are noticing early and referring, the way you read the sky before the rain.',
      ],
      note: 'Tie back to the opening poll: did the room name what the evidence names? Bridge forward: recognizing early is the start; the next curriculum covers treatment and the continuum of care.',
    },
    {
      kind: 'activity',
      activity: {
        id: 'upc2-m5-quiz-1',
        kind: 'quiz',
        title: 'Quick check: know the substances',
        questions: [
          {
            prompt: 'Which class speeds up the central nervous system?',
            options: ['Depressants', 'Stimulants', 'Opioids', 'Hallucinogens'],
            correct: 1,
            seconds: 20,
          },
          {
            prompt: 'Shabu (methamphetamine) is classified as a…',
            options: ['Depressant', 'Opioid', 'Stimulant', 'Hallucinogen'],
            correct: 2,
            seconds: 20,
          },
          {
            prompt: 'Which of these is a depressant?',
            options: ['Nicotine', 'Alcohol', 'Cocaine', 'LSD'],
            correct: 1,
            seconds: 20,
          },
          {
            prompt: 'Inhalants are especially dangerous partly because…',
            options: [
              'They are illegal and hard to find',
              'Even a single session can cause sudden heart failure or suffocation',
              'They have no effect on the brain',
              'Withdrawal is medically dangerous',
            ],
            correct: 1,
            seconds: 20,
          },
          {
            prompt: 'A visible sign often linked to opioid use is…',
            options: [
              'Dilated pupils and restlessness',
              '"Pinpoint" pupils and nodding off',
              'Bloodshot eyes and coughing',
              'A chemical smell on the breath',
            ],
            correct: 1,
            seconds: 20,
          },
        ],
      },
      note: 'Formative, not graded. Celebrate fast correct answers. If Q4 or Q5 trips people up, re-show the inhalants and observable-signs slides.',
    },
    {
      kind: 'activity',
      activity: {
        id: 'upc2-m5-slider-after',
        kind: 'slider',
        phase: 'after',
        pairId: 'upc2-m5-confidence',
        prompt: 'Now: how ready are you to teach a student about these substances and their effects?',
        min: 1,
        max: 10,
        minLabel: 'Just starting',
        maxLabel: 'Ready to teach it',
      },
      note: 'The payoff. The stage shows the before → after shift. Name the movement out loud and thank the group.',
    },
  ],
  notes: {
    timing: {
      hide: [
        'Skip pharmacokinetic depth — exact durations of action, half-lives, and metabolism mechanisms are not needed for school staff.',
        'If short on time, the opioids/depressants/hallucinogens detail lives in the dragdrop; do not add a separate lecture on them.',
      ],
      summarize: [
        'Routes of administration and mechanism: mention once, do not dwell.',
        'The women/child-development research (telescoping, fetal effects): summarize the headline, keep the citations in your pocket.',
      ],
      emphasize: [
        'The PH-relevant substances: alcohol, nicotine, cannabis, shabu, and inhalants.',
        'Observable signs school staff can actually see — this is the take-home skill.',
      ],
    },
    fiveEs: {
      engage:
        'Open with the hook: the substances students meet first are the legal ones — alcohol, nicotine, and solvents under the sink. Run the poll and let the room argue for a minute about which is the biggest threat to their students. The gap between what feels dangerous (shabu, heroin) and what is actually most accessible is the doorway into the whole module.',
      explore:
        'Before teaching the four classes, flip the "Apat na Klase ng Panahon" card and ask volunteers to place a substance under each weather. Let them guess where alcohol, nicotine, and shabu belong. Their sorting — right or wrong — surfaces what they already carry from Module 2 and shows you where the confusion sits before you correct it.',
      explain:
        'Walk the five priority substances plainly, one slide each, consequences straight from the manual with no embellishment. Anchor each to its weather: shabu and nicotine to the sun, alcohol to the rain, and inhalants to the accessible everyday. Name the class, name what it does to a still-growing brain, and move on. Person-first language throughout: a student who uses, never an "addict."',
      apply:
        'Run the dragdrop to lock the four classes, then the observable-signs slide so staff can translate pharmacology into what they will notice in a corridor or clinic. Ask each participant to picture one real student and name one sign they would now watch for. This is the module turning into practice.',
      evaluate:
        'The five-question quiz is the formative check — celebrate speed, re-teach anything that trips the room. The confidence slider (before at the start, after at the end) measures the shift from "just starting" to "ready to teach it," and the word cloud captures, in one word each, what every participant will carry back to school.',
    },
    examples: {
      nurse_dentist:
        'You are positioned to catch the physical and oral signs: "meth mouth" and cracked teeth from shabu, sores around the mouth or nose from inhalants, pinpoint pupils, sudden weight loss, or the smell of alcohol during a routine check. In the annual health assessment, note these calmly and refer — an observation is a reason to care, not a diagnosis.',
      head_teacher:
        'You see the classroom behavior changes: a student suddenly restless and sleepless (stimulants), or drowsy and uncoordinated (depressants), or losing all interest in schoolwork (cannabis). Frame these in your learning action cell as "read the sky early" — patterns worth a quiet conversation and a referral, never a public accusation.',
      counselor:
        'You are the referral hub. When a teacher or nurse flags a sign, you hold the confidential conversation, connect the four-class picture to what the student is actually experiencing, and decide next steps under the child-protection framework. Keep a low-key watch list of students showing several signs, and prioritize them for support before problems deepen.',
      admin:
        'Make sure the pathway works: that staff know who to tell, that referrals are documented and confidential, and that the school environment supports the tobacco- and vape-free policy. The absence of a clear reporting route is itself a risk factor — put the process in the Annual Implementation Plan.',
    },
    policyAlignment: [
      {
        order: 'DepEd Order No. 37, s. 2017',
        connection:
          'The Comprehensive National Drug Education Program requires preventive drug education at every level. Knowing the substances students actually meet — and their plainly-stated consequences — is the content teachers need to deliver it credibly and without scare tactics.',
      },
      {
        order: 'DepEd Order No. 40, s. 2012',
        connection:
          'The Child Protection Policy frames how staff respond to a suspected sign: notice, refer through the counselor, keep it confidential, and protect the child. Observable signs are a trigger for care, never for punishment or public labeling.',
      },
      {
        order: 'DepEd tobacco- and vape-free schools policy',
        connection:
          'DepEd bars tobacco and e-cigarette use on school grounds. Because a vape delivers the same addictive nicotine covered here, this module gives staff the factual basis to enforce the policy as protection, not merely a rule.',
      },
    ],
    processingQuestions: [
      'Which "weather" do you think you will notice most often in your own school, and what is the one sign you would watch for first?',
      'Thinking of a real student you have known, how would recognizing the substance class earlier have changed what you did?',
    ],
  },
};
