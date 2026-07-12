import type { Module } from '@/lib/types';

/**
 * UPC 2 · Module 4 — Social Stigma
 * Source: UPC_2_TRAINER.pdf, Trainer Manual pp. 219–241 (Module 4).
 */
export const module4: Module = {
  id: 'upc2-m4',
  course: 'upc2',
  number: 4,
  title: 'Stigma: The Second Disease',
  tagline: 'A substance use disorder harms the body. Stigma makes sure no one asks for help.',
  minutes: 40,
  heroImage: '/images/upc2-m4/hero.jpg',
  images: ['/images/upc2-m4/hero.jpg', '/images/upc2-m4/analogy.jpg', '/images/upc2-m4/concept.jpg'],
  analogy: {
    title: 'Ang Selyo',
    front:
      'A rubber stamp lands on a document — REJECTED. From that moment, every office that touches the paper treats the stamp as the truth. No one reads the document anymore.',
    back:
      'Stigma is a stamp on a child. Once a school marks a student "adik," every classroom, clinic, and office reads the stamp instead of the child. Person-first language — "a student with a substance use disorder" — is how we lift the stamp and read the child again.',
  },
  slides: [
    {
      kind: 'title',
      kicker: 'Day 2 · Module 4',
      title: 'Stigma: The Second Disease',
      subtitle: 'A substance use disorder harms the body. Stigma makes sure no one asks for help.',
      image: '/images/upc2-m4/hero.jpg',
      note: 'Set the tone deliberately: this module is about our own words and reflexes, not about students. Model person-first language from the first sentence and never break it.',
    },
    {
      kind: 'statement',
      text: 'The words we use decide who asks for help — and who hides.',
      note: 'ENGAGE hook. Read it once, pause, read it again. Ask the room to sit with the claim before defending or attacking it. Do not resolve it yet — the whole module is the answer.',
    },
    {
      kind: 'activity',
      activity: {
        id: 'upc2-m4-poll-1',
        kind: 'poll',
        prompt: 'A student is caught with substances. What happens at your school FIRST?',
        options: [
          'A referral to the guidance office',
          'A discipline case is opened',
          'The parents are called in — and shamed',
          'A quiet cover-up to protect the school’s name',
        ],
      },
      note: 'No correct answer on purpose — this is a mirror, not a test. Results are anonymous; say so out loud so people answer honestly. If discipline or cover-up wins, name it without blame: "That is stigma operating as procedure."',
    },
    {
      kind: 'bullets',
      title: 'What stigma is',
      bullets: [
        'Severe social disapproval of characteristics or beliefs that go against cultural norms.',
        'It grows where the true nature of a condition is not understood.',
        'It leads to status loss, discrimination, and exclusion from meaningful participation.',
        'Prejudice is the thought; discrimination is the action that follows it.',
      ],
      note: 'Definition is from the manual (pp. 223, 228–230). Land the prejudice/discrimination distinction with the manual’s example: thinking a person in recovery is weak-willed is prejudice; refusing to enroll or hire them is discrimination.',
    },
    {
      kind: 'bullets',
      title: 'The three faces of stigma',
      bullets: [
        'Public stigma — the community’s disapproval: gossip, labels, exclusion.',
        'Self-stigma — the student internalizes the hate and turns it into shame.',
        'Structural stigma — policies and habits: automatic discipline cases, leaders avoiding the issue.',
        'All three block the same door: the door to help.',
      ],
      image: '/images/upc2-m4/concept.jpg',
      note: 'The manual describes these effects (pp. 223–224, 231, 234) — internalized shame, community disapproval, and decision-makers not wanting to address substance use in schools. The public/self/structural framing is your organizing tool; keep it simple.',
    },
    {
      kind: 'analogy',
      title: 'Ang Selyo',
      front:
        'A rubber stamp lands on a document — REJECTED. From that moment, every office that touches the paper treats the stamp as the truth. No one reads the document anymore.',
      back:
        'Stigma is a stamp on a child. Once a school marks a student "adik," every classroom, clinic, and office reads the stamp instead of the child. Person-first language — "a student with a substance use disorder" — is how we lift the stamp and read the child again.',
      image: '/images/upc2-m4/analogy.jpg',
      note: 'Central analogy — click to flip. Every Filipino school worker knows the pila of offices where the stamp decides everything. Ask before flipping: "What happens to a stamped document in your division office?" Let them say it, then flip.',
    },
    {
      kind: 'stat',
      value: '60%',
      label: 'of people in treatment said others treated them differently after learning of their substance use.',
      context:
        'In the same study, 46% said others were afraid of them, 45% said family members gave up on them, and 38% said friends rejected them. The people closest to them read the stamp first.',
      source: 'Luoma et al., 2007 — cited in the UPC 2 Trainer Manual, p. 232',
      note: 'Real figures from the manual’s stigma study slide (197 people in treatment, University of Nevada). Do not soften or round further. Bridge: if adults in treatment feel this, imagine a 15-year-old facing the whole school.',
    },
    {
      kind: 'bullets',
      title: 'How stigma blocks help',
      bullets: [
        'Shame makes a person reluctant to seek treatment at all.',
        'The stress of hiding the problem causes new medical and social harm.',
        'Adolescents hide it from parents; parents, once ashamed, fight less hard for care.',
        'It feeds a self-fulfilling prophecy: "they can’t recover anyway" — so no one helps them recover.',
      ],
      note: 'Straight from the manual (pp. 224, 231, 233–234, 237): stigma interferes with treatment, negatively affects recovery, and the study found people tended to become MORE dependent as a result of stigma. Stigma is not neutral — it actively worsens the disorder.',
    },
    {
      kind: 'bullets',
      title: 'Lift the stamp: person-first language',
      bullets: [
        'Say "a person with a substance use disorder" — never "addict," "abuser," or "user."',
        'Say "a student who uses substances" — the behavior, not the identity.',
        'Say "a person in recovery" — not "ex-addict" or "former abuser."',
        'Name the person first, the condition second. The order is the whole point.',
      ],
      note: 'This is the module’s skill. The manual models SUD-first terminology throughout; the counteracting-stigma objective (p. 221) is delivered here. Practice one swap aloud with the room: have them convert "adik na bata" to "a student with a substance use disorder."',
    },
    {
      kind: 'activity',
      activity: {
        id: 'upc2-m4-drag-1',
        kind: 'dragdrop',
        prompt: 'Sort the phrase: does it stamp the child, or read the child?',
        buckets: ['Stigmatizing', 'Person-first'],
        items: [
          { label: '"Addict"', bucket: 0 },
          { label: '"A person with a substance use disorder"', bucket: 1 },
          { label: '"Drug abuser"', bucket: 0 },
          { label: '"A student who uses substances"', bucket: 1 },
          { label: '"User"', bucket: 0 },
          { label: '"A person in recovery"', bucket: 1 },
          { label: '"Ex-addict"', bucket: 0 },
          { label: '"A student receiving support"', bucket: 1 },
        ],
      },
      note: 'The pattern to surface: every stigmatizing phrase is a noun that replaces the person; every person-first phrase starts with the person. When the sort is done, ask which phrases they have heard in their own faculty room this month.',
    },
    {
      kind: 'activity',
      activity: {
        id: 'upc2-m4-qna-1',
        kind: 'qna',
        prompt: 'What stigma have you seen in schools? Share anonymously.',
      },
      note: 'Anonymity is the safety valve — repeat that no names of schools or students should appear. Read 3–4 aloud, sorting each into public, self, or structural stigma as you go. Expect stories about records, seating, and parent meetings; do not moralize, just classify.',
    },
    {
      kind: 'recap',
      title: 'The module, in one breath',
      points: [
        'Stigma is severe social disapproval — and it grows where understanding is missing.',
        'It wears three faces: public, self, and structural.',
        'It blocks help: shame, hiding, and hopelessness keep students from the guidance office.',
        'Person-first language lifts the stamp — the school reads the child again.',
      ],
      note: 'Read the four points with the room. Close the loop with the opening poll: whatever happens FIRST at your school is your school’s stigma level, and it is changeable.',
    },
    {
      kind: 'activity',
      activity: {
        id: 'upc2-m4-quiz-1',
        kind: 'quiz',
        title: 'Quick check: Stigma',
        questions: [
          {
            prompt: 'Social stigma is best defined as:',
            options: [
              'A medical symptom of substance use',
              'Severe social disapproval of traits or beliefs against cultural norms',
              'A legal penalty for substance offenses',
              'A treatment method for substance use disorders',
            ],
            correct: 1,
            seconds: 20,
          },
          {
            prompt: 'Thinking a person in recovery is weak-willed is prejudice. What turns it into discrimination?',
            options: [
              'Saying it out loud to a colleague',
              'Feeling it more strongly',
              'Acting on it — like refusing to enroll or hire the person',
              'Nothing; they are the same thing',
            ],
            correct: 2,
            seconds: 20,
          },
          {
            prompt: 'According to the manual, how does stigma affect help-seeking?',
            options: [
              'It motivates people to seek treatment faster',
              'It has no measurable effect',
              'It only affects adults, not adolescents',
              'Shame and hiding make people reluctant to seek treatment',
            ],
            correct: 3,
            seconds: 20,
          },
          {
            prompt: 'Which phrase models person-first language?',
            options: [
              '"The addict in Grade 9"',
              '"A student with a substance use disorder"',
              '"The user we caught last week"',
              '"That drug abuser’s parents"',
            ],
            correct: 1,
            seconds: 20,
          },
        ],
      },
      note: 'Formative, not graded — keep it brisk at 20 seconds per question. Question 2 is the one most rooms miss; if they do, replay the manual’s employer example before moving on.',
    },
    {
      kind: 'activity',
      activity: {
        id: 'upc2-m4-slider-before',
        kind: 'slider',
        phase: 'before',
        pairId: 'upc2-m4-confidence',
        prompt: 'How confident are you that you could teach person-first language to your co-teachers?',
        min: 1,
        max: 10,
        minLabel: 'Just starting',
        maxLabel: 'Ready to teach it',
      },
      note: 'Baseline reading before the commitment moment. Frame it honestly: the quiz tested knowledge; this measures readiness to carry it back to school. Low numbers are fine — they make the after reading meaningful.',
    },
    {
      kind: 'activity',
      activity: {
        id: 'upc2-m4-slider-after',
        kind: 'slider',
        phase: 'after',
        pairId: 'upc2-m4-confidence',
        prompt: 'One last read: how confident are you now that you could teach person-first language?',
        min: 1,
        max: 10,
        minLabel: 'Just starting',
        maxLabel: 'Ready to teach it',
      },
      note: 'The payoff — the stage shows the before → after shift live. Before revealing, ask one volunteer what moved their number. Close Day 2 on the shift itself: "That movement is what we want every faculty room to feel."',
    },
  ],
  notes: {
    timing: {
      hide: [
        'If short on time: hide the stat slide and fold the 60% figure into the "How stigma blocks help" narration.',
        'The Q&A can be collected silently and processed during the Day 2 wrap-up instead of live.',
      ],
      summarize: [
        'The "three faces of stigma" slide can be narrated over the definition slide — name the three faces verbally instead of clicking through.',
        'Quiz: if the room is confident, run only questions 2 and 4 (discrimination and person-first language).',
      ],
      emphasize: [
        'Ang Selyo — the stamp analogy anchors the module; let the room answer the flip question before you reveal the back.',
        'The person-first language slide and dragdrop — this is the one behavior participants must carry home.',
        'The opening poll — return to it in the recap; it is the module’s before-and-after mirror for the whole school.',
      ],
    },
    fiveEs: {
      engage:
        'Open with the statement slide — "the words we use decide who asks for help" — then immediately run the poll about what happens FIRST when a student is caught. The anonymity matters: participants will confess discipline-first and cover-up cultures they would never admit aloud. Do not comment on the results yet; just leave the chart on screen for three silent seconds. The tension between what they know should happen and what actually happens is the engine of the whole module.',
      explore:
        'Run the dragdrop before over-explaining the rules of person-first language. Let participants sort "addict," "user," and "a person in recovery" on instinct — most will sort correctly, which proves the point: they already know which words wound. The exploration is not learning new labels; it is noticing that the stigmatizing phrases are all nouns that swallow the person. Use their own sorted board, not your slide, as the evidence.',
      explain:
        'Formally define social stigma from the manual — severe social disapproval of characteristics or beliefs against cultural norms — and walk the causal chain: misunderstanding breeds stigma, stigma breeds shame, shame blocks help-seeking, and blocked help deepens the disorder. Distinguish prejudice (the thought) from discrimination (the act) using the manual’s employer example. Anchor the Luoma study: 60% treated differently, 45% given up on by family — stigma is measurable, not a feeling.',
      apply:
        'Assign each role one artifact to rewrite before leaving the room: head teachers redraft one line of their anecdotal record language, admin officers redraft one line of a case documentation template, counselors sketch their confidential referral pathway, nurses rewrite one intake question. The test for every rewrite is the same: does the sentence start with the person or with the label? Collect two volunteer examples and read them aloud as models.',
      evaluate:
        'The four-question quiz checks the definitions, the prejudice–discrimination line, the help-seeking mechanism, and the language skill — the module’s three learning objectives from p. 221 of the manual. The confidence pair is the readiness measure: the before slider lands after the recap, the after slider closes the module, and the visible shift is your evidence of transfer. Any participant still below 5 on the after reading is a coaching conversation during the Day 2 wrap-up.',
    },
    examples: {
      head_teacher:
        'Audit your class record and anecdotal reports: replace every "adik," "pasaway," or "problem student" with behavior-based, person-first wording. What you write follows the child from adviser to adviser — your pen is the stamp or the eraser.',
      nurse_dentist:
        'In health assessments, ask about substance use the way you ask about asthma — same tone, same privacy, same follow-up. A clinical, shame-free intake in the clinic is often the first place a student discovers that disclosure does not equal punishment.',
      counselor:
        'Map and publish your confidential referral pathway: who a student can approach, what stays private, and exactly when parents are involved. Students avoid the guidance office when the route from "I need help" to "everyone knows" is one signature long — confidentiality is your anti-stigma infrastructure.',
      admin:
        'Case documentation outlives the case. Write incident reports and endorsement letters in person-first, behavior-specific language — "the student was found in possession of..." not "the drug user was caught..." — because your file is read by every future school, scholarship board, and employer that requests the record.',
    },
    policyAlignment: [
      {
        order: 'DepEd Order No. 40, s. 2012',
        connection:
          'The Child Protection Policy is the strongest alignment: it obliges schools to respond to child-at-risk situations with protection, not punishment. A stigma-driven discipline-first or shaming response to a student found with substances is precisely the harm the policy prohibits — the child in question is a child in need of protection.',
      },
      {
        order: 'DepEd Order No. 37, s. 2017',
        connection:
          'The National Drug Education Program is explicitly preventive and non-punitive in intent. Person-first language and referral-first responses operationalize that intent at the classroom level; a school that stamps students defeats the very program it is implementing.',
      },
      {
        order: 'RA 11036 · School Mental Health Program',
        connection:
          'The Mental Health Act and the school-based mental health program treat substance use disorders as health conditions deserving care. Reducing stigma is a stated barrier-removal goal: students will only use school mental health services if seeking help carries no stamp.',
      },
    ],
    processingQuestions: [
      'Think of the last time your school handled a student substance incident. Which face of stigma — public, self, or structural — did the student meet first, and what would a stamp-free response have looked like?',
      'Person-first language costs nothing and needs no budget line. What actually stops a faculty room from adopting it — and what is one thing you, in your role, can do about that this month?',
    ],
  },
};
