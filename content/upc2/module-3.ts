import type { Module } from '@/lib/types';

/**
 * UPC 2 · Module 3 — The Science of Addiction ("The Hijacked Brain").
 * Day 2's heavyweight (~75 min). Source: UPC 2 Trainer Manual, Module 3,
 * slides 3.1–3.72 (PDF pp. 137–217). Voice: English-first, science-first,
 * zero-stigma. Slide text says "person with a substance use disorder", never
 * "addict". All manual stats carry a source; no invented numbers.
 */
export const module3: Module = {
  id: 'upc2-m3',
  course: 'upc2',
  number: 3,
  title: 'The Hijacked Brain',
  tagline:
    'How substances hijack the brain’s reward circuit — and why the science asks for compassion, not blame.',
  minutes: 75,
  heroImage: '/images/upc2-m3/hero.jpg',
  images: ['/images/upc2-m3/analogy.jpg', '/images/upc2-m3/concept.jpg'],
  analogy: {
    title: 'Ang Daan ng Traysikel',
    front:
      'A tricycle drives the same dirt road every day. Slowly its wheels carve deep ruts into the ground. What happens when the driver tries to steer somewhere new?',
    back:
      'The wheels keep falling back into the ruts — even when the driver turns the handlebars away. Repeated substance use carves ruts in the brain’s reward circuit: tolerance and craving. Recovery is not weakness — it is the slow, supported work of building a brand-new road.',
  },
  slides: [
    {
      kind: 'title',
      kicker: 'Day 2 · Module 3',
      title: 'The Hijacked Brain',
      subtitle: 'The science of addiction — what substances do to the brain, and why it is a disease, not a choice made in weakness.',
      image: '/images/upc2-m3/hero.jpg',
      note: 'This is the heaviest module of Day 2. Set the tone: we are going to be scientists AND stay compassionate. Name the ground rule now — in this room we say "a person with a substance use disorder", never "an addict". The language models the science.',
    },
    {
      kind: 'statement',
      text: 'The brain’s thinking-and-judgment center is the last part to finish maturing. Every Grade 7 student in your classroom is walking around with wet cement.',
      note: 'ENGAGE hook. Manual grounding: substance use is a developmental problem and "by adolescence, the brain and body have not reached maturity" (slides 3.57–3.58, pp. 201–202); the cerebral cortex is the thinking-and-judgment center (slide 3.42, p. 186). Let it land 5 seconds. The point: our students are not finished — which is exactly why prevention works and why judgment lapses are developmental, not moral.',
    },
    {
      kind: 'activity',
      activity: {
        id: 'upc2-m3-poll-1',
        kind: 'poll',
        prompt: 'Is addiction a disease or a choice?',
        options: [
          'A disease',
          'A choice',
          'Both — it starts with a choice but becomes a disease',
          'Not sure',
        ],
      },
      note: 'Opening poll — no right answer shown. The room WILL split; that is the point. Do not resolve it now. Tell them: "Hold your answer. We will ask this exact question again at the end and see if the room moved." Note the rough split aloud so the shift is visible later.',
    },
    {
      kind: 'bullets',
      title: 'The Brain’s "Do That Again" Button',
      bullets: [
        'Deep in the limbic system sits the reward circuit — wired to make us repeat life-sustaining acts like eating and connection.',
        'It runs on dopamine, a chemical that tags an experience as "worth repeating".',
        'Dopamine is not the pleasure itself — it is the sticky note that says: do that again.',
        'This system kept our ancestors alive. Substances turn it against us.',
      ],
      image: '/images/upc2-m3/concept.jpg',
      note: 'Reward-pathway beat. Manual: reward circuit in the limbic system is critical to addiction; brains are wired to repeat life-sustaining activities via pleasure/reward, largely through dopamine (slides 3.43, 3.45, pp. 187–189). Summarize the deep neuroanatomy — do not lecture on synapses and reuptake. Keep it to the "do that again" sticker.',
    },
    {
      kind: 'analogy',
      title: 'Ang Daan ng Traysikel',
      front:
        'A tricycle drives the same dirt road every day. Slowly its wheels carve deep ruts into the ground. What happens when the driver tries to steer somewhere new?',
      back:
        'The wheels keep falling back into the ruts — even when the driver turns the handlebars away. Repeated substance use carves ruts in the brain’s reward circuit: tolerance and craving. Recovery is not weakness — it is the slow, supported work of building a brand-new road.',
      image: '/images/upc2-m3/analogy.jpg',
      note: 'CENTRAL ANALOGY — anchor the whole module here. Ask a volunteer to guess the "back" before you flip it. Then draw the two payoffs explicitly: (1) the ruts are tolerance and craving — real, physical grooves in the reward circuit; (2) recovery = building a new road, which takes time AND support. This is your bridge to the compassion reframe later.',
    },
    {
      kind: 'bullets',
      title: 'How Substances Hijack the Circuit',
      bullets: [
        'Some substances (like heroin) mimic natural neurotransmitters and fool the receptors — a key that fits the wrong lock.',
        'Others (like cocaine) block reuptake, so dopamine floods the space between neurons.',
        'Either way, the reward circuit is flooded far beyond anything nature produces.',
        'The brain learns the lesson hard: repeat this, above all else.',
      ],
      note: 'Hijacking beat. Manual: psychoactive substances mimic OR disrupt normal signalling (slide 3.36, p. 177); cocaine blocks transporters/reuptake so dopamine keeps flooding receptors (slides 3.37, 3.48, pp. 178, 192). Key-and-lock metaphor is from the manual (slide 3.32, p. 171). Summarize the mechanics — the takeaway is "flooded, not finished".',
    },
    {
      kind: 'stat',
      value: '2–10×',
      label: 'more dopamine than natural rewards',
      context:
        'Some substances release 2 to 10 times the dopamine that food or human connection do — often within seconds. The reward from substances dwarfs natural reward, and the brain cannot compete.',
      source: 'UPC 2 Trainer Manual, Module 3, slide 3.46 (NIDA)',
      note: 'Let the number count up before you speak. This is the "why it is so powerful" slide. Manual: substances can release 2 to 10 times the dopamine of natural rewards, sometimes almost immediately when smoked or injected (slide 3.46, p. 190; slide 3.47 "dwarfs" comparison, p. 191). If short on time, fold this figure into the previous slide and cut this one.',
    },
    {
      kind: 'bullets',
      title: 'Tolerance, Dependence, Withdrawal',
      bullets: [
        'Flooded again and again, the brain compensates: it makes less dopamine and fewer receptors.',
        'Now the person needs more of the substance just to feel normal — this is tolerance.',
        'Without it they feel listless and cannot enjoy what once brought pleasure — dependence and withdrawal.',
        'WHO’s signs: strong desire, loss of control, use despite harm, rising tolerance.',
      ],
      note: 'Tolerance / dependence / withdrawal beat. Manual: the brain adjusts by producing less dopamine or fewer receptors (slide 3.48, p. 192); this leaves the person listless and unable to feel normal pleasure (slide 3.49, p. 193); tolerance = needing more for the same effect (slide 3.51, p. 195). WHO ICD-10 dependence criteria (slide 3.56, p. 200; WHO, 2007, ICD-10). Tie back to the tricycle: the ruts are now deep.',
    },
    {
      kind: 'bullets',
      title: 'Why the School Years Matter Most',
      bullets: [
        'Substance use is a developmental problem — first use peaks in adolescence.',
        'The teenage brain has not finished maturing, especially its thinking-and-judgment center.',
        'The earlier use begins, the more likely it is to progress to serious harm.',
        'Prevention that intervenes early, in each developmental phase, changes the whole trajectory.',
      ],
      note: 'EMPHASIZE — this is a school audience; slow down here. Manual: substance use is a developmental problem, first-time cannabis use disorder peaks in adolescence (slide 3.57, p. 201, NIAAA National Epidemiological Survey, 2003); the adolescent brain has not reached maturity and disruption raises vulnerability (slide 3.58, p. 202); the earlier use begins, the more likely serious abuse follows (slide 3.62, p. 206). Connect back to the wet-cement hook: their students are the most vulnerable brains in the building — and the most reachable.',
    },
    {
      kind: 'bullets',
      title: 'A Brain Disease, Not a Moral Failing',
      bullets: [
        'Addiction is a chronic, relapsing brain disease: compulsive use despite harm.',
        'It is not a character flaw or a lack of willpower — brain scans show real, physical change.',
        'Like diabetes or hypertension, it cannot be cured but it can be managed.',
        'No one ever plans to become addicted.',
      ],
      note: 'EMPHASIZE — the compassion reframe, the heart of the module. Manual: addiction is NOT a character flaw or moral failing, it IS a health problem (slide 3.7, p. 145); a chronic, relapsing brain disease (slide 3.8, p. 146, NIDA); substances physically change brain structure, visible on scans (slides 3.13, 3.21, 3.50); cannot be cured but can be managed (slide 3.20, p. 158); "no one ever plans to become addicted" (slide 3.59, p. 203). Watch your own language and theirs — correct "addict" gently to "person with a substance use disorder".',
    },
    {
      kind: 'stat',
      value: '40–60%',
      label: 'relapse rate for substance use disorders',
      context:
        'Almost identical to Type 1 diabetes (30–50%) and hypertension (50–70%). Relapse is part of every chronic disease — not proof that treatment failed or that the person did not try.',
      source: 'McLellan et al., 2000, JAMA 284(13), 1689–1695',
      note: 'Relapse-as-part-of-the-condition beat. Manual: relapse rates — drug addiction 40–60%, diabetes 30–50%, hypertension and asthma 50–70% (slide 3.23, p. 161, McLellan et al., 2000). Distinguish lapse (brief, one-time return) from relapse (full return); a lapse can lead to relapse but does not always, and relapse can be avoided (slide 3.24, p. 162). The reframe: relapse is a signal to adjust support, not to punish.',
    },
    {
      kind: 'activity',
      activity: {
        id: 'upc2-m3-drag-1',
        kind: 'dragdrop',
        prompt: 'Sort each statement: Myth or Science?',
        buckets: ['Myth', 'Science'],
        items: [
          { label: 'Addiction is a moral failing or weak character.', bucket: 0 },
          { label: 'A person can simply choose to stop once dependence sets in.', bucket: 0 },
          { label: 'Relapse means the treatment failed.', bucket: 0 },
          { label: 'Substances change the physical structure of the brain.', bucket: 1 },
          { label: 'As much as 40–60% of vulnerability to addiction is genetic.', bucket: 1 },
          { label: 'Substances flood the reward circuit with far more dopamine than nature.', bucket: 1 },
        ],
      },
      note: 'Let them sort before you explain. Each "Myth" is one the manual explicitly corrects; each "Science" is a manual claim: brain-structure change (slides 3.13/3.21), 40–60% genetic vulnerability (slide 3.63, p. 207, NIDA, 2010), dopamine flood (slide 3.46). Use wrong answers as the doorway — they reveal exactly the stigma this module dismantles.',
    },
    {
      kind: 'activity',
      activity: {
        id: 'upc2-m3-poll-2',
        kind: 'poll',
        prompt: 'Is addiction a disease or a choice?',
        options: [
          'A disease',
          'A choice',
          'Both — it starts with a choice but becomes a disease',
          'Not sure',
        ],
      },
      note: 'Same question as the opener — the payoff. The stage shows the shift from poll-1 to poll-2. Name what moved: most rooms slide toward "both — starts as a choice, becomes a disease", which is exactly the science (voluntary first use → compulsive brain disease, slide 3.59). If the room did NOT move, that is fine too — ask what would change their mind.',
    },
    {
      kind: 'recap',
      title: 'The Hijacked Brain, in one breath',
      points: [
        'Dopamine is the brain’s "do that again" signal for survival.',
        'Substances flood that circuit with 2–10× the dopamine — carving ruts like a tricycle on a dirt road.',
        'Tolerance, dependence, and withdrawal follow as the brain compensates.',
        'Addiction is a manageable brain disease — and the adolescent brain is the most vulnerable, and the most worth protecting.',
      ],
      note: 'Read the points with the room. Land the last one hardest — it is the bridge from "the science" to "so what do I do Monday". Then move to the quick check and the confidence sliders.',
    },
    {
      kind: 'activity',
      activity: {
        id: 'upc2-m3-quiz-1',
        kind: 'quiz',
        title: 'Quick check: The science of addiction',
        questions: [
          {
            prompt: 'What does dopamine do in the brain’s reward circuit?',
            options: [
              'Controls breathing and heart rate',
              'Signals "do that again" by tagging an act as worth repeating',
              'Stores long-term memories',
              'Blocks all pain permanently',
            ],
            correct: 1,
            seconds: 20,
          },
          {
            prompt: 'How much dopamine can substances release compared with natural rewards?',
            options: ['About the same', 'Half as much', '2 to 10 times as much', '100 times as much'],
            correct: 2,
            seconds: 20,
          },
          {
            prompt: 'Why does tolerance develop?',
            options: [
              'The substance gets weaker over time',
              'The brain makes less dopamine and fewer receptors to compensate',
              'The person stops enjoying the substance on purpose',
              'The liver removes the substance faster',
            ],
            correct: 1,
            seconds: 20,
          },
          {
            prompt: 'Which best describes addiction?',
            options: [
              'A moral failing',
              'A simple lack of willpower',
              'A chronic, relapsing brain disease',
              'A temporary bad habit',
            ],
            correct: 2,
            seconds: 20,
          },
        ],
      },
      note: 'Formative, not graded — keep it light and celebrate fast correct answers. Every question maps to a slide: dopamine (3.45), 2–10× (3.46), tolerance mechanism (3.48/3.51), disease definition (3.8). If time is tight, drop Q2.',
    },
    {
      kind: 'activity',
      activity: {
        id: 'upc2-m3-slider-before',
        kind: 'slider',
        phase: 'before',
        pairId: 'upc2-m3-confidence',
        prompt: 'How confident are you that you could explain the science of addiction to a fellow teacher — without stigma?',
        min: 1,
        max: 10,
        minLabel: 'Just starting',
        maxLabel: 'Ready to teach it',
      },
      note: 'Baseline reading — required for the "after" comparison in the next slide. Collect quickly; do not discuss numbers yet.',
    },
    {
      kind: 'activity',
      activity: {
        id: 'upc2-m3-slider-after',
        kind: 'slider',
        phase: 'after',
        pairId: 'upc2-m3-confidence',
        prompt: 'Now: how confident are you that you could explain the science of addiction — without stigma?',
        min: 1,
        max: 10,
        minLabel: 'Just starting',
        maxLabel: 'Ready to teach it',
      },
      note: 'The payoff — the stage shows the before → after shift as answers arrive. Name the growth. If the shift is small, ask what would close the gap and point them to the case-study exercise and Module 4.',
    },
  ],
  notes: {
    timing: {
      hide: [
        'If short on time: cut the 2–10× dopamine stat slide and fold the figure into "How Substances Hijack the Circuit".',
        'The quiz can be trimmed to two questions (dopamine and the disease definition).',
      ],
      summarize: [
        'Deep neuroanatomy — neuron structure, synapses, reuptake, transporters: summarize to "flooded, not finished". Do not lecture the mechanics.',
        'The disease-terminology chain (etiological agent, pathogenesis, symptom vs sign): narrate in a sentence rather than slide by slide.',
      ],
      emphasize: [
        'The adolescent brain — "Why the School Years Matter Most". This is a school audience; this is the reason the training exists.',
        'The disease-model / compassion reframe — "A Brain Disease, Not a Moral Failing" and the relapse stat. Correct "addict" to "person with a substance use disorder" every time.',
      ],
    },
    fiveEs: {
      engage:
        'Open with the wet-cement hook: the thinking-and-judgment center of the brain is the last part to finish maturing, so every Grade 7 student is still under construction. Let it sit five seconds, then run the opening poll — "disease or choice?" Do not resolve the split. Tell the room you will ask the exact same question at the end and watch it move. The unresolved tension is what carries attention through the science.',
      explore:
        'Use "Ang Daan ng Traysikel" and the Myth/Science drag-and-drop as discovery, not lecture. Ask a volunteer to predict the flip side of the tricycle card before revealing it. In the sort, let people place statements wrong — the wrong placements are exactly the stigma the module dismantles, and they surface it in the room’s own words. Only after they commit do you explain why each myth is a myth and each science claim is grounded in a brain scan or a number.',
      explain:
        'Walk the causal chain slowly: the reward circuit exists to make us repeat survival behaviours through dopamine — the "do that again" signal. Substances flood it with 2 to 10 times the dopamine of natural rewards, using key-and-lock mimicry or by blocking reuptake. Flooded repeatedly, the brain compensates by making less dopamine and fewer receptors — which is tolerance, dependence, and withdrawal. Keep pointing back to the ruts in the road. Close on the disease definition: chronic, relapsing, manageable, physically visible.',
      apply:
        'Make it role-specific. Ask each participant: given that this is a brain disease and not a moral failing, what is one response you would change on Monday? A head teacher rethinks how "defiance" is read in a LAC session; a counselor replaces a disciplinary reflex with a referral; a nurse documents a health sign without judgement; an admin checks whether policy routes a student to help. Have them write one concrete change — it becomes their bridge into Module 4.',
      evaluate:
        'The four-question quiz is the knowledge check — each item ties to a specific slide, so wrong answers tell you exactly what to revisit. The confidence slider pair is the affective check: the before reading was taken at the recap, the after reading closes the module, and the stage shows the shift. Pair a low quiz score or a flat slider with a pointer to the case-study exercise and the next module.',
    },
    examples: {
      head_teacher:
        'In a Learning Action Cell, spend 15 minutes on the "progression of addiction" idea: train teachers to notice when a student’s world narrows — sports, friends, and schoolwork crowded out by one preoccupation — and to read that as an early health signal, not a discipline problem.',
      nurse_dentist:
        'Treat the physical signs as signs of a disease: an abscess at an injection site, sudden weight or sleep change. Document them factually, screen without stigma, and refer through the health pathway — the same way you would flag any other chronic condition.',
      counselor:
        'Referral, not punishment. A student showing signs of a substance use disorder is showing symptoms of a treatable brain disease. Route them into the School Mental Health Program pathway, protect confidentiality, and resist any disciplinary-first reflex. Your job is the new road, not the pothole.',
      admin:
        'Audit your disciplinary policy: does a substance-related incident route a student toward help and referral, or straight to suspension? Under a child-protection lens, build the referral pathway a budget line and a named person, so the help exists before it is needed.',
    },
    policyAlignment: [
      {
        order: 'DepEd Order No. 37, s. 2017',
        connection:
          'The mandated drug education program needs a scientific foundation. The addiction-as-brain-disease model in this module is that evidence base — it lets teachers explain "why" accurately instead of relying on fear.',
      },
      {
        order: 'DepEd Order No. 40, s. 2012',
        connection:
          'The Child Protection Policy requires that disciplinary responses run through a child-protection lens. If addiction is a brain disease, a disciplinary-first response to a student with a substance use disorder is a protection failure — help and referral come first.',
      },
      {
        order: 'DepEd School Mental Health Program',
        connection:
          'A student with a substance use disorder needs a health and mental-health referral pathway, not stigma. This module’s disease model is the rationale for connecting at-risk students to that program early, in each developmental phase.',
      },
    ],
    processingQuestions: [
      'Think of a student behaviour you once read as "defiance" or "laziness." How does the brain-disease model change how you would respond to that same student tomorrow?',
      'The tricycle carves its ruts over time, not overnight. In your role, where is the earliest point you could help a student start building a different road?',
    ],
  },
};
