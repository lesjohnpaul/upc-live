import type { Module } from '@/lib/types';

/**
 * The Catalyst — Jessica C. Oliver's drug-prevention slot at the Division
 * Youth Leadership Symposium on Oplan Kalusugan sa DepEd (SDO Urdaneta City,
 * 21 August 2026). Audience: SSLG President + SSLG Adviser, paired, two per
 * school.
 *
 * Strategy: the room expects a scare lecture and has already sat through one.
 * The data says that lecture is wrong for this audience, so the deck concedes
 * the point first (Act 0), earns credibility with the numbers, and only then
 * teaches. No scare tactics — that is also policy: DO 30, s. 2018 mandates
 * interactive methods and positive messaging, and RA 9165 §43 requires
 * teaching the difference between medical patients and drug dependents to
 * avoid accidental stigmatization.
 *
 * Structure follows the NDEP Youth Leadership Lecture outline end to end:
 * the opening question (Act 0), understanding substance use (Act 1), the
 * adolescent brain (Act 2), risk and protective factors (Act 3), life skills
 * and scenarios (Act 4), the vape question and the tobacco/vape laws (Act 5),
 * peer influence and the leadership mandate (Act 6), know-your-why and the
 * pledge (Act 7).
 *
 * Copy rule for this deck: ~12 words per stage slide, one idea, no
 * sub-bullets. Audience feedback on previous decks was "hard to read, needs
 * bigger letters" — the lever is fewer words, not smaller type. Detail lives
 * in the presenter notes, where Jessica says it aloud.
 *
 * RUNTIME. Walked at a comfortable pace this deck is ~75 minutes. The booked
 * slot is 60. `notes.timing.hide` names the exact cut list that lands it on
 * 60 without breaking any act's spine — read it before the session, decide
 * the cuts in advance, and do not improvise them from the stage.
 *
 * Substance grounded in UPC 2 Modules 2, 3 and 5 (four substance classes,
 * route speed, reward pathway, tolerance, progression), but never labelled as
 * such — this is a teen deck under its own title.
 */
export const module1: Module = {
  id: 'catalyst-m1',
  course: 'catalyst',
  number: 1,
  title: 'The Catalyst',
  tagline:
    'The truth about what is actually in your world — and the mandate you have held since 2007.',
  minutes: 60,
  heroImage: '/catalyst/act0-auditorium.jpg',
  images: ['/catalyst/act4-leaders.jpg', '/catalyst/finale-catalyst.jpg'],
  analogy: {
    title: 'Ang Payong',
    front:
      'Umuulan. You cannot stop the rain, and you cannot choose who walks home in it. So what CAN you do?',
    back:
      'You can hand someone a payong. Risk is the rain — barkada, stress, an empty house, a store that sells to anyone. Protection is the umbrella: one adult who listens, a team to belong to, a reason to get home dry. Prevention is not stopping the rain. It is making sure nobody walks through it alone.',
  },
  slides: [
    // ---------------------------------------------------------------- open
    {
      kind: 'welcome',
      dayLabel: 'Lead with Purpose · SDO Urdaneta City',
      title: 'The Catalyst',
      presenter: 'Jessica C. Oliver',
      note: 'Walk-in / hold screen. Leave it up while the room fills — it animates on its own. Presidents and advisers are seated in pairs; ask them to sit together NOW, because the commitment card near the end gives the two of them different prompts on two different phones and will not work otherwise.',
    },
    {
      kind: 'qr',
      title: 'Scan to join',
      note: 'Ninety seconds. Walk the aisles. Both the president AND the adviser join — the adviser is not a spectator here. Say it plainly: "Advisers, your phone too. You have a different job on this thing than your president does."',
    },

    // ------------------------------------------------------- Act 0 · truth
    {
      kind: 'title',
      kicker: 'Act 0',
      title: 'Alam Mo Ba Talaga?',
      image: '/catalyst/act0-auditorium.jpg',
      note: 'Say the concession out loud before anything else: "You have all heard the anti-drug talk. Some of you have heard it three times. Today I am not going to exaggerate at you — I am going to show you the actual numbers, and some of them will annoy you." That sentence buys the next 55 minutes.',
    },
    {
      kind: 'statement',
      text: 'One decision today. Two futures — yours, and the person beside you.',
      note: 'The outline\'s opening hook, said slowly. Then make it literal: "Look at the person you came with. Every choice you make about this stuff moves them a little too. That is not a motivational line — that is the actual finding, and I will show you the mechanism in twenty minutes." Do not resolve it yet; the peer-influence act pays it off.',
    },
    {
      kind: 'activity',
      activity: {
        id: 'catalyst-m1-wordcloud-influences',
        kind: 'wordcloud',
        prompt: 'One word: what makes someone your age try it the first time?',
        maxWords: 2,
      },
      note: 'The room writes the lesson before you teach it. Do NOT prompt them with examples first — let the words arrive cold. What always comes back: barkada, curiosity, stress, pressure, problema sa bahay, social media, gusto masaya, pantasya, trip lang. Read four aloud, then name the pattern: "Nobody wrote \'because I wanted to become an addict.\' Every single word you gave me is about belonging, feeling, or escape. Hold that — it is the whole reason a lecture about drugs never works." This slide replaces a lecture on risk factors; it earns Act 3 for free.',
    },
    {
      kind: 'activity',
      activity: {
        id: 'catalyst-m1-slider-confidence-before',
        kind: 'slider',
        phase: 'before',
        pairId: 'catalyst-confidence',
        prompt: 'How ready are you to lead drug prevention in your school?',
        min: 1,
        max: 10,
        minLabel: 'Not yet',
        maxLabel: 'Ready now',
      },
      note: 'Baseline — required for the closing slider. Collect it fast, do not discuss the number. Same question for presidents and advisers on purpose: the gap between the two is worth naming at the end if it shows.',
    },
    {
      kind: 'activity',
      activity: {
        id: 'catalyst-m1-slider-guess-drugs',
        kind: 'slider',
        phase: 'before',
        pairId: 'guess-drugs',
        prompt: 'Out of 100 teens your age, how many use illegal drugs?',
        min: 0,
        max: 100,
        minLabel: 'None',
        maxLabel: 'All 100',
      },
      note: 'The hook. Read the live average aloud before advancing — most rooms land somewhere between 20 and 50. Do not correct it yet. Say: "Hold that number." Then advance. This slider has no "after" pair; it is a guess, not a confidence reading.',
    },
    {
      kind: 'stat',
      value: 'Almost none',
      label: 'of Filipino youth use illegal drugs',
      source: 'YAFS5 2021 · UP Population Institute',
      note: 'The credibility slide. Say the full picture aloud — it is deliberately NOT on the screen: "Of every 10 young Filipinos, about 3 drink, about 1 smokes, and almost none uses illegal drugs." Then name what you just did: "Every adult who told you the country is drowning in shabu was overstating it. I am not going to do that." Watch the advisers here too — many have never seen this figure either.',
    },
    {
      kind: 'stat',
      value: '1 in 7',
      label: 'Filipinos aged 13–15 who vape right now',
      source: 'Global Youth Tobacco Survey',
      note: 'The pivot. "The thing adults keep warning you about is rare. The thing they mostly ignore is in this room." Ask for a show of hands on how many KNOW someone who vapes — never ask who vapes. Never single anyone out; that is exactly the stigmatization RA 9165 §43 warns against.',
    },
    {
      kind: 'stat',
      value: '423,185',
      label: 'young vape users in 2023',
      context: 'From 37,513 in 2021.',
      source: 'Global Youth Tobacco Survey, 2021 and 2023',
      note: 'Let the counter run all the way up before you speak — the climb is the message. Then: "Two years. Eleven times more. Nobody ran an information campaign about that." This is the slide that earns you Act 1.',
    },

    // ------------------------------------------ Act 1 · what actually counts
    {
      kind: 'title',
      kicker: 'Act 1',
      title: 'What actually counts',
      image: '/catalyst/act1-specimens.jpg',
      note: 'Transition: "So if the scary list is not the real list, what IS the list?" Keep the pace up — Act 1 is short. The four objects behind you are deliberately neutral — a cup, a tin, a bottle, a packet. Nobody can tell which is which, and that is the point you are about to make.',
    },
    {
      kind: 'bullets',
      title: 'Psychoactive',
      bullets: ['Changes how your brain works.', 'That is the whole definition.'],
      note: 'One idea only. Do not add examples on the slide — say them: kape, vape, beer, cough syrup, shabu. The point is that the word has nothing to do with legality. Legal is not the same as safe, and illegal is not the same as dangerous — that distinction is the whole of Act 1.',
    },
    {
      kind: 'activity',
      activity: {
        id: 'catalyst-m1-dragdrop-classes',
        kind: 'dragdrop',
        prompt: 'Sort the Substance: which class does each belong to?',
        buckets: ['Stimulant', 'Depressant', 'Opioid', 'Hallucinogen'],
        items: [
          { label: 'Coffee', bucket: 0 },
          { label: 'Nicotine (vape)', bucket: 0 },
          { label: 'Shabu', bucket: 0 },
          { label: 'Alcohol', bucket: 1 },
          { label: 'Sleeping pills', bucket: 1 },
          { label: 'Codeine cough syrup', bucket: 2 },
          { label: 'Tramadol', bucket: 2 },
          { label: 'Marijuana', bucket: 3 },
        ],
      },
      note: 'Let them sort with no explanation first — the wrong answers are the lesson. Coffee in the same bucket as shabu is the one that lands; alcohol as a depressant is the one that surprises. Only after they commit: stimulants speed the nervous system up, depressants and opioids slow it down, hallucinogens distort it.',
    },
    {
      kind: 'statement',
      text: 'Coffee and shabu are in the same column. The difference is how hard, how fast, how long.',
      note: 'The Act 1 payoff. Pause five seconds, then advance — the next slide unpacks the three.',
    },
    {
      kind: 'bullets',
      title: 'How hard. How fast. How long.',
      bullets: [
        'How hard — the dose, and how strong the thing is.',
        'How fast — smoked reaches your brain in 7 seconds. Swallowed takes 30 minutes.',
        'How long — once, or every day for eight months.',
      ],
      note: 'EMPHASIZE the middle one; it is the whole case against "it is just vape." The faster a substance reaches the brain, the more addictive it is — and vape IS the fast route, same as smoking. Say it plainly: "Vape is not the mild version. Vape is the fast version." Ground: route of administration and speed of onset, UPC 2 Module 2.',
    },
    {
      kind: 'bullets',
      title: 'Nobody jumps straight to the end',
      bullets: [
        'Trying it — once, usually with people you like.',
        'Risky use — often enough that it is now a habit.',
        'Dependence — your body expects it.',
        'Addiction — you keep using even though it is costing you.',
      ],
      note: 'The progression, from the outline\'s "what is substance use". Walk it slowly and land the real point: "Nobody at step one is planning step four. Everybody at step four passed through step one, with people they liked, feeling fine." That is why prevention lives at step one — and why the person at step four needs a referral, not a lecture. Do not moralise any step.',
    },

    // ------------------------------------------- Act 2 · why it hooks you
    {
      kind: 'title',
      kicker: 'Act 2',
      title: 'Why it hooks you',
      image: '/catalyst/act2-craving.jpg',
      note: 'Transition: "Nobody plans this. So how does anybody end up there?" Act 2 is the science, and it is the part that dismantles the blame.',
    },
    {
      kind: 'bullets',
      title: 'Dopamine',
      bullets: ['The brain’s "do that again" signal.', 'Drugs flood it. Nature loses.'],
      image: '/catalyst/reward-pathway.jpg',
      note: 'Dopamine is not the pleasure — it is the sticky note that says do that again. It exists to make you repeat things that keep you alive: eating, friendship, winning. Substances release far more of it than any of those, so the brain learns the wrong lesson very fast. Keep this to sixty seconds; the next activity teaches it better than you can.',
    },
    {
      kind: 'activity',
      activity: {
        id: 'catalyst-m1-tolerance',
        kind: 'tolerance',
        title: 'Beat the Brain',
        tapLabel: 'TAP',
        revealHeadline: 'That’s tolerance.',
        revealBody:
          'Nothing about the button changed. Your brain did. It turned the reward down and the wanting up — so you worked harder for less and barely noticed the trade. That is tolerance. In a real person it takes months instead of twenty taps, and it never asks permission.',
      },
      note: 'Let them tap in silence — do not narrate over it. When the room goes quiet, ask: "At what point did you notice you were working harder for less?" IMPORTANT about the count on screen: "N of 60 have felt it" is a floor, not a census. Each phone writes one row, once, at the reveal tap; a wifi blip on that tap loses it silently. Say "look how many of you have already felt it" — never "only 41 of you finished."',
    },
    {
      kind: 'stat',
      value: '25',
      label: 'the age your brakes finish developing',
      source: 'Prefrontal cortex maturation · NIDA',
      note: 'The brakes are the prefrontal cortex — judgment, planning, stopping yourself. Say the honest version: "This is not an insult. It is the reason prevention works at your age and lectures do not." Advisers: this is why a disciplinary-first reflex misreads the biology.',
    },
    {
      kind: 'bullets',
      title: 'Accelerator done. Brakes still under construction.',
      bullets: [
        'The part that wants the reward is fully online at your age.',
        'The part that stops you is still being built.',
        'That gap is normal, temporary — and exactly why the first offer usually comes now.',
      ],
      note: 'The outline\'s "why are young people vulnerable", said without insult. Be careful here: this explains, it never excuses. Say it: "This is not a licence to be reckless. It is the reason you should decide what you will do BEFORE you are standing in the situation — because in the moment, your accelerator is louder than your brakes." That sentence is the bridge into Act 4.',
    },
    {
      kind: 'statement',
      text: 'Addiction is a health condition. Not a character flaw.',
      image: '/catalyst/calm-portrait.jpg',
      // The one beat that stops shouting: mist ground, slate type, slow
      // motion. Everything either side of it stays rally, so the drop in
      // volume is the point. The plate was generated for exactly this slide.
      mode: 'calm',
      note: 'Slow down. This is the RA 9165 §43 requirement made human: students must be taught the difference between a person with a medical condition and a criminal, precisely so nobody in this room learns to despise a classmate. Say it plainly: nobody ever plans this, and the person it happens to needs a referral, not a rumour. Never say "addict" from this stage — say "a person with a substance use disorder", and correct it gently if the room says otherwise.',
    },

    // ------------------------------------------ Act 3 · risk and protection
    {
      kind: 'title',
      kicker: 'Act 3',
      title: 'What tips the scale',
      image: '/catalyst/act3-shelter.jpg',
      note: 'Transition: "Two students, same school, same barkada. One tries it, one never does. The difference is almost never willpower." Act 3 is the outline\'s risk-and-protective-factors core, and it is the act that turns this from information into a job they can actually do.',
    },
    {
      kind: 'bullets',
      title: 'What raises the odds',
      bullets: [
        'Stress with nowhere to put it.',
        'A barkada where it is already normal.',
        'Nobody at home asking where you are.',
        'It is cheap, near, and sold to anyone.',
      ],
      note: 'Read these as conditions, never as accusations — several students in the room are living at least one of them, and they must not hear a diagnosis of themselves. Say it out loud: "If you just recognised your own house in one of these, that is not a verdict on you. It means you get to be deliberate where other people get to be lucky." Ground: individual, peer, family and community risk factors, UPC 2 / NDEP.',
    },
    {
      kind: 'bullets',
      title: 'What lowers them',
      bullets: [
        'One adult who actually listens.',
        'Something you belong to — team, org, choir, court.',
        'A way to handle stress that is not a substance.',
        'Knowing what you are working toward.',
      ],
      note: 'EMPHASIZE. Every one of these four is something an SSLG can literally build — that is the argument of the whole session, so do not rush it. "You cannot delete anybody\'s risk. You can add protection, and protection is the side of the scale you actually control." Point at the advisers on the first bullet: for a lot of students, the one adult who listens is standing in this room.',
    },
    {
      kind: 'activity',
      activity: {
        id: 'catalyst-m1-dragdrop-scale',
        kind: 'dragdrop',
        prompt: 'Which side of the scale? Sort each one.',
        buckets: ['Raises the risk', 'Builds protection'],
        items: [
          { label: 'A barkada who already vape', bucket: 0 },
          { label: 'Stress with no way to release it', bucket: 0 },
          { label: 'Nobody at home asking where you are', bucket: 0 },
          { label: 'A store that sells to anyone, any age', bucket: 0 },
          { label: 'One adult who actually listens', bucket: 1 },
          { label: 'A team, an org, a craft you belong to', bucket: 1 },
          { label: 'Friends who do not pressure you', bucket: 1 },
          { label: 'Knowing what you are working toward', bucket: 1 },
        ],
      },
      note: 'Fast — ninety seconds, this one is not meant to be hard. The teaching happens after: ask "how many of the protection items could your Student Council build this school year, with no budget?" The honest answer is most of them, and that realisation is what Act 6 cashes in. If you are behind schedule, this is the first activity to cut — say the eight items aloud instead.',
    },
    {
      kind: 'analogy',
      title: 'Ang Payong',
      front:
        'Umuulan. You cannot stop the rain, and you cannot choose who walks home in it. So what CAN you do?',
      back:
        'You can hand someone a payong. Risk is the rain — barkada, stress, an empty house, a store that sells to anyone. Protection is the umbrella: one adult who listens, a team to belong to, a reason to get home dry. Prevention is not stopping the rain. It is making sure nobody walks through it alone.',
      image: '/catalyst/analogy-payong.jpg',
      note: 'CENTRAL ANALOGY. Ask a volunteer to guess the back before you flip it — teenagers get this one immediately, which is exactly why it works. Then draw the payoff explicitly: you are not being asked to end the drug problem in Pangasinan. You are being asked to hand out umbrellas. That is a job a seventeen-year-old can actually finish.',
    },
    {
      kind: 'statement',
      text: 'You cannot stop the rain. You can hand someone a payong.',
      note: 'Say it once and move. This is the line you want repeated back to you in the evaluation forms, so do not bury it in explanation.',
    },

    // ------------------------------------- Act 4 · the moment of pressure
    {
      kind: 'title',
      kicker: 'Act 4',
      title: 'The five seconds that matter',
      image: '/catalyst/act4-decision.jpg',
      note: 'Transition: "Everything so far was so you understand it. This act is so you survive the actual moment — because the moment is about five seconds long and your brakes are not finished." Act 4 is the outline\'s life-skills core.',
    },
    {
      kind: 'bullets',
      title: 'Before you answer',
      bullets: [
        'STOP — buy yourself three seconds.',
        'THINK — what actually happens next?',
        'CHECK — does this match what I want?',
        'CHOOSE — then say it out loud.',
      ],
      note: 'Do not just read the four words — make them rehearse the first one. "STOP is not a feeling, it is a physical move: step back, look at your phone, drink your water. Any action that buys three seconds is enough, because three seconds is how long your brakes need to catch up with your accelerator." Tell them to decide their STOP move now, in the seat, before they ever need it.',
    },
    {
      kind: 'activity',
      activity: {
        id: 'catalyst-m1-poll-scenario',
        kind: 'poll',
        prompt: 'Your barkada is vaping after class. "Isa lang, try mo." What do you actually do?',
        options: [
          'Take it — mas madali kaysa mag-explain',
          'Say no and stay',
          'Say no and leave',
          'Change the subject and stall',
        ],
      },
      note: 'There is deliberately NO correct answer marked — do not let the room think one exists. Read the split aloud, then teach into it. "Say no and stay" is the hardest and the most honest; "change the subject" is a real and underrated skill; "take it" always gets votes and you must not shame those votes — say "thank you for being honest, that is the most common answer in the country." Then give the reframe on the next slide. This is the outline\'s Scenario 1; scenarios 2 and 4 live in the presenter notes if the room wants them.',
    },
    {
      kind: 'bullets',
      title: 'Say no without losing the barkada',
      bullets: [
        'Give a reason about you, not about them.',
        '"Hindi ako umiinom, sayang ang training."',
        'Say it once. Do not argue it twice.',
        'Have an exit ready before you need one.',
      ],
      note: 'Refusal skills, the practical version. The key idea is the first bullet: a reason about yourself cannot be argued with, but a judgement about them starts a fight you will lose. Have two students actually say the line aloud — it feels ridiculous in a bright auditorium, which is exactly why rehearsing it here makes it available later.',
    },
    {
      kind: 'statement',
      text: 'You do not have to win the argument. You have to leave the room.',
      note: 'The permission slip, and for a lot of students the most useful sentence of the hour. Say it plainly: leaving is not losing, and it is not being torpe. The only thing you owe a moment like that is your own exit.',
    },
    {
      kind: 'bullets',
      title: 'When your friend is the one struggling',
      bullets: [
        'Stay. Do not lecture, do not spread it.',
        'You cannot keep this one a secret.',
        'Bring one trusted adult in — adviser, nurse, guidance.',
        'Helping is not snitching. Silence is not loyalty.',
      ],
      note: 'The outline\'s Scenario 3, and the beat with the highest chance of mattering to somebody in this room tonight. EMPHASIZE the last bullet and say it twice. Name the actual people in their school: SSLG adviser, school nurse, guidance counselor — and tell the advisers present to raise a hand so students can see who they are. Be honest about the hard part: the friend may be angry at first. Ask the room "would you rather have an angry friend or a sick one?" and let them answer it themselves.',
    },

    // ---------------------------------------------- Act 5 · the vape question
    {
      kind: 'title',
      kicker: 'Act 5',
      title: 'It’s just vapor… right?',
      image: '/catalyst/act3-vapour.jpg',
      note: 'Transition: "Now the thing that is actually in this room." Keep it fast and loud — this is the energy peak before the mandate.',
    },
    {
      kind: 'bullets',
      title: 'What is actually in the cloud',
      bullets: [
        'Nicotine — the most addictive thing most teens will ever meet.',
        'It is aerosol, not steam. Steam is water. This is not.',
        'One pod can carry the nicotine of a whole pack.',
      ],
      note: 'Correct the single biggest myth in the country here. Aerosol is fine liquid particles suspended in air, and it carries nicotine, flavouring chemicals and traces of metal from the coil — water vapour is what comes off a kettle. Do not over-claim beyond that; you do not need to. The nicotine alone is the whole argument, and an exaggeration is what the room is expecting and waiting to catch you on.',
    },
    {
      kind: 'activity',
      activity: {
        id: 'catalyst-m1-quiz-myth-fact',
        kind: 'quiz',
        title: 'Myth or Fact',
        questions: [
          { prompt: 'Vape is just water vapor.', options: ['Myth', 'Fact'], correct: 0, seconds: 15 },
          {
            prompt: 'Caffeine and nicotine are both stimulants.',
            options: ['Myth', 'Fact'],
            correct: 1,
            seconds: 15,
          },
          {
            prompt: 'You can’t get addicted to something legal.',
            options: ['Myth', 'Fact'],
            correct: 0,
            seconds: 15,
          },
          {
            prompt: 'Smoking hits the brain in about 10 seconds.',
            options: ['Myth', 'Fact'],
            correct: 1,
            seconds: 15,
          },
          { prompt: 'Alcohol is a stimulant.', options: ['Myth', 'Fact'], correct: 0, seconds: 15 },
          {
            prompt: 'Most Filipino teens use illegal drugs.',
            options: ['Myth', 'Fact'],
            correct: 0,
            seconds: 15,
          },
          {
            prompt: 'Starting young raises the risk of addiction.',
            options: ['Myth', 'Fact'],
            correct: 1,
            seconds: 15,
          },
          {
            prompt: 'Relapse means the treatment failed.',
            options: ['Myth', 'Fact'],
            correct: 0,
            seconds: 15,
          },
        ],
      },
      note: 'Eight items, fifteen seconds each — about three minutes. Do not lecture between questions; debrief only the two or three that split the room. The usual splits: "vape is just water vapor" (aerosol carrying nicotine and metals, not steam), "alcohol is a stimulant" (it is a depressant — it lowers inhibition on the way down, which is why it feels like the opposite), and "relapse means treatment failed" (relapse is part of every chronic condition, and the correct response is more support, not punishment). If time is short, cut items 5 and 7.',
    },
    {
      kind: 'bullets',
      title: 'You are the target market',
      bullets: [
        'Cotton candy. Mango graham. Yakult.',
        'Nobody invented those flavours for a 45-year-old smoker.',
        'The device looks like a highlighter for a reason.',
      ],
      image: '/catalyst/act5-marketing.jpg',
      note: 'The beat that flips the room from being warned to being angry, and anger at an industry is far more useful than shame at a classmate. Say it: "You are the most marketed-to generation in Philippine history, and you are extremely good at spotting when a brand is trying to be your friend. Point that skill at this." Ground: youth-targeted flavour and design marketing, WHO and DOH tobacco-control findings.',
    },
    {
      kind: 'bullets',
      title: 'The law is already on your side',
      bullets: [
        'RA 11900 — vapes are 18+, and banned near schools.',
        'RA 9211 — no smoking, no selling to minors.',
        'RA 10643 — the graphic warnings on every pack.',
      ],
      note: 'Keep this short and factual — this is the outline\'s tobacco and vape policy section, and it exists to hand them leverage, not to threaten them. The line that matters: "If a store near your school is selling to Grade 8 students, that is not a rumour you keep. That is a violation your adviser can escalate, and RA 11900 already forbids selling near a school." Advisers: this is the concrete thing you can bring to the school head this month.',
    },
    {
      kind: 'recap',
      title: 'Where we are so far',
      points: [
        'The scary list was not the real list. Vape is.',
        'Coffee and shabu differ by how hard, how fast, how long.',
        'Your brain turns the reward down and the wanting up.',
        'Risk is the rain. Protection is the payong.',
      ],
      note: 'Read the four points WITH the room, then stop and let it breathe. This is the hinge: everything before it was so they understand, everything after it is their job. Say exactly that before advancing.',
    },

    // ------------------------------------------ Act 6 · lead with purpose
    {
      kind: 'title',
      kicker: 'Act 6',
      title: 'Lead with Purpose',
      image: '/catalyst/act4-leaders.jpg',
      note: 'The turn. Say it before the next slide: "Here is the part nobody told you. You are not being recruited today. You already have this job, and you have had it your whole life."',
    },
    {
      kind: 'statement',
      text: 'If barkada can pull one way, barkada can pull the other.',
      note: 'The outline\'s pivot question, made into a statement because the room already knows the answer. Ask it anyway and wait for the yes: "If friends can talk somebody into it — can friends talk somebody out of it?" Then the payoff: peer influence is not the problem to be solved, it is the tool that is already in their hands. Every one of them is using it right now, in one direction or the other.',
    },
    {
      kind: 'activity',
      activity: {
        id: 'catalyst-m1-wordcloud-friend',
        kind: 'wordcloud',
        prompt: 'I want to be the friend who ______',
        maxWords: 3,
      },
      note: 'The outline\'s "Be the Friend" activity. Ninety seconds, three words maximum — the constraint is what makes the wall readable and the answers honest. Expect: listens, stays, tells the truth, does not judge, walks me home, reminds me. Read five aloud, slowly, and say nothing clever afterwards. This is the emotional peak of the hour; do not step on it with a joke or a summary.',
    },
    // The mandate beat, split three ways. BulletsSlide renders its list at a
    // fixed clamp no matter how few bullets it holds, so six duties on one
    // bullets slide was the least legible thing in the deck. The number and the
    // one duty that matters therefore move onto `stat` and `statement`, which
    // render far larger; the remaining five stay a light supporting list.
    {
      kind: 'stat',
      value: '6',
      label: 'duties your Student Council already has',
      source: 'DDB Board Regulation No. 5, s. 2007 §8.6',
      note: 'The reveal. Say it before the counter finishes: "You are not being recruited today. Barkada Kontra Droga already assigns six duties to every Student Council in this country, and yours is one of them." Do not list them yet — the next slide shows five and holds one back on purpose.',
    },
    {
      kind: 'bullets',
      title: 'The other five',
      bullets: [
        'Encourage participation',
        'Integrate into SSLG programs',
        'Initiate activities',
        'Life-skills training',
        'Support the BKD Center',
      ],
      note: 'Read these five out; do not elaborate on any of them. The regulation\'s own wording is: encourage participation, integrate BKD into existing SSLG programs, initiate BKD activities in their schools, provide life-skills training, and support the BKD Center. Then say "I left one out" and advance — the sixth line on the list is the one this whole symposium is about.',
    },
    {
      kind: 'statement',
      text: 'Duty four: conduct an echo-seminar.',
      note: 'The turn. Pause five seconds before you speak. Then: "Conduct an echo-seminar or training on the prevention and control of dangerous drugs among the student populace. That is the regulation\'s wording, and that is exactly what this hour is asking you to go home and do." Every president in this room is already expected to bring this back and teach it. Advisers: DepEd Memorandum 200, s. 2016 makes the school head fully responsible for the NDEP and directs schools to establish BKD chapters through student organizations — so the president is not asking you for a favour.',
    },
    {
      kind: 'stat',
      value: '2007',
      label: 'the year this became your job',
      source: 'DDB Board Regulation No. 5, s. 2007 §8.6',
      note: 'Most of this room was born around this year. Say it: "This has been your Student Council\'s duty since before you could read. Nobody handed you the paper. I am handing it to you now."',
    },
    {
      kind: 'bullets',
      title: 'L · E · A · D',
      bullets: [
        'LISTEN — before you judge, before you repeat it.',
        'ENCOURAGE — be the reason somebody chose better.',
        'ACT — run the thing. Do not just post about it.',
        'DECIDE — the same way when nobody is watching.',
      ],
      note: 'The outline\'s acronym, and the summary of everything they are being asked for. Do not over-explain the four — the deck already taught each one. Land on DECIDE: "Leadership is not the version of you that shows up at a symposium. It is the version of you at 9pm on a Saturday when nobody from this room can see you." Then straight into the commitment card; do not let the energy leak.',
    },
    {
      kind: 'activity',
      activity: {
        id: 'catalyst-m1-plan-barkada',
        kind: 'plan',
        title: 'Build Your Barkada',
        intro:
          'DDB Board Regulation No. 5, s. 2007 §8.6 already gives your Student Council this job — including "initiate BKD activities in their schools." Ninety days. One activity. Write it down.',
        schoolPrompt: 'Which school are you from?',
        prompts: {
          student_leader:
            'What is the ONE activity you will run in your school in the next 90 days?',
          adviser: 'What will you sign, fund, or unblock so it actually happens?',
        },
        whenPrompt: 'When does it start?',
        whenOptions: ['Within 2 weeks', 'This quarter', 'Before December'],
      },
      note: 'The pair fills this in together but on two phones, with two different prompts — the president names the activity, the adviser names what they will sign, fund, or unblock. Tell them to type the school name exactly the same way as their partner — that is how the two plans meet on one card. Then read three schools aloud off the wall, adviser line included, before you move on.',
    },

    // ------------------------------------------------- Act 7 · know your why
    {
      kind: 'title',
      kicker: 'Act 7',
      title: 'Know your why',
      subtitle: '"Just say no" is a sentence. A reason is what makes you able to say it.',
      image: '/catalyst/act7-why.jpg',
      note: 'Drop the volume here — you are landing the plane. Say the outline\'s move out loud: "Every campaign you have ever seen ends with just say no. Nobody has ever been talked out of anything by a slogan. What actually holds is a reason." Then let the next slide be quiet.',
    },
    {
      kind: 'bullets',
      title: 'So — what are you protecting?',
      bullets: [
        'What are you working toward?',
        'Who is counting on you?',
        'What would you lose that you cannot replace?',
        'Who do you want to be at 25?',
      ],
      note: 'Ask these four slowly, with a real pause between each. Do not take answers — this one is internal, and taking answers turns it into a performance. Then close it: "When you know your why, no stops being a thing you have to defend. It becomes obvious." That sentence is the door into the pledge.',
    },
    {
      kind: 'statement',
      text: 'Hindi cool ang bisyo. Mas cool ang may purpose.',
      image: '/catalyst/pledge-hands.jpg',
      note: 'The one full-Tagalog line in the deck, and it is deliberate — say it exactly as written, do not translate it, do not explain it. Then straight into the pledge.',
    },
    {
      kind: 'activity',
      activity: {
        id: 'catalyst-m1-pledge',
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
        voicePrompt:
          'One sentence to someone your age being pressured right now. What do you say?',
        voicePlaceholder: 'Say it the way you would actually say it.',
        signLabel: 'Sign the pledge',
        signedHeadline: 'You signed it.',
        // The outline runs the pledge and the "One Voice" activity as two
        // separate beats. They are the same emotional moment, and splitting
        // them costs a second join, a second wait, and a room that cooled
        // down in between — so the One Voice sentence rides on this card.
      },
      note: 'ASK THE ROOM TO STAND before they open this — the standing is the ritual, and it does not survive being done seated with a phone. Then be quiet. Nine taps takes about forty seconds, and that silence is forty seconds of them reading commitments instead of skimming them. When the signature counter starts climbing on the wall, read three or four of the One Voice sentences aloud with the school names — slowly, exactly as written, no commentary. Do not editorialise anybody\'s sentence. If the count stalls below the room size, do not announce it: the phones that signed are the phones that signed, and naming a shortfall is the one thing that would break this beat.',
    },
    {
      kind: 'activity',
      activity: {
        id: 'catalyst-m1-slider-confidence-after',
        kind: 'slider',
        phase: 'after',
        pairId: 'catalyst-confidence',
        prompt: 'Now: how ready are you to lead drug prevention?',
        min: 1,
        max: 10,
        minLabel: 'Not yet',
        maxLabel: 'Ready now',
      },
      note: 'The payoff — the stage shows before → after as the answers land. Name the shift out loud. If it barely moved, do not paper over it: ask what would close the gap, and point them at the plan they just wrote. A flat line here usually means the adviser half of the room needs the DepEd Memorandum 200, s. 2016 point repeated.',
    },
    {
      kind: 'finale',
      headline: 'You Are the Catalyst',
      image: '/catalyst/finale-catalyst.jpg',
      text: 'Your plan is on that wall. Go.',
      attribution: 'Jessica C. Oliver',
      badge: 'Lead with Purpose',
      note: 'Leave the plan wall up on the second screen if you have one. The headline writes itself letter by letter — say nothing for the first four seconds. Then the outline\'s closing, slowly: "You do not have to be famous to be influential. You do not have to be an adult to be a leader. Start with your circle. Start with one decision." Read the line on screen and stop talking. Do not add a summary; the summary is on the wall in their own handwriting.',
    },
  ],
  notes: {
    timing: {
      hide: [
        'THE 60-MINUTE CUT LIST. Walked comfortably this deck is ~75 minutes; the booked slot is 60. Decide these before the session, not from the stage.',
        'Cut 1 (−3 min): the "Which side of the scale?" sorting activity in Act 3. Say the eight items aloud against the two preceding slides instead — they carry the same content.',
        'Cut 2 (−2 min): the "Nobody jumps straight to the end" progression slide in Act 1. Fold it into one sentence after the Sort the Substance debrief.',
        'Cut 3 (−2 min): the "Accelerator done. Brakes still under construction." slide. The 25 stat already carries it; say the accelerator line over that stat.',
        'Cut 4 (−2 min): the Myth or Fact quiz drops from eight items to six — keep vape, alcohol, "most teens use illegal drugs", and relapse.',
        'Cut 5 (−2 min): the "Where we are so far" recap. Only do this if you are still behind after cuts 1–4; the hinge it marks is worth two minutes.',
        'Cut 6 (−2 min): the "You are the target market" marketing slide. Last resort — it is the slide that turns the room from warned to angry.',
        'NEVER cut: Act 0 in full, "Say no without losing the barkada", "When your friend is the one struggling", the mandate beat, Build Your Barkada, or the pledge.',
      ],
      summarize: [
        'Act 1 substance classes: do not teach all four in detail. Sort, then give one sentence — up, down, down, distort.',
        'The dopamine slide: sixty seconds maximum. Beat the Brain teaches tolerance better than any explanation, so spend the time there instead.',
        'The three tobacco and vape laws: name them, do not explain them. The usable fact is that selling near a school is already illegal — everything else is a handout.',
        'The L·E·A·D acronym: the deck already taught all four ideas. Read the four lines, land on DECIDE, and move.',
      ],
      emphasize: [
        'Act 0 in full. The concession ("adults have been overstating this") is what buys the rest of the hour — never trim it to save time.',
        '"What lowers them" in Act 3. Every one of the four protective factors is something an SSLG can build with no budget, which is the entire argument of the session.',
        '"When your friend is the one struggling" — helping is not snitching, silence is not loyalty. This is the slide most likely to matter to somebody in the room tonight. Name the actual adults in their school and have them raise a hand.',
        'The mandate beat — the "6", the five, "duty four", and the 2007 stat. They already hold the mandate, so the close is a reminder, not a recruitment. If you trim here, trim the list of five, never "duty four".',
        'Build Your Barkada and the pledge. If only two things survive the hour, they are a written 90-day commitment with an adviser attached, and nine lines somebody actually read.',
      ],
    },
    fiveEs: {
      engage:
        'Open by conceding the point the room is already thinking: they have sat through the anti-drug lecture before, and they suspect it was exaggerated. Then hand them the microphone before you use it — the opening word cloud ("what makes someone your age try it the first time?") has the room write the risk factors in their own vocabulary, and not one of them writes "because I wanted to become an addict." Run the guess slider next and read their average aloud without correcting it. The three stats that follow (almost none use illegal drugs; 1 in 7 aged 13–15 vape; 37,513 to 423,185 in two years) do the correcting for you. The engagement is not a game; it is the moment an adult tells them the truth about their own world for the first time.',
      explore:
        'Four discovery beats, none of them explained beforehand. Sort the Substance runs cold, so coffee lands beside shabu and alcohol gets read as a stimulant — the wrong placements are the lesson. Beat the Brain has them tap for a reward that quietly shrinks while the urge climbs, and the card names what they just felt. The risk-and-protection sort makes them handle both sides of the scale before anyone tells them which side they can control. The scenario poll puts them in the actual moment with no correct answer marked, so the room sees its own split honestly. They commit first, then find out.',
      explain:
        'Five ideas, in order. One: psychoactive means it changes how your brain works — legality has nothing to do with it, which is why coffee and shabu share a column and the real difference is how hard, how fast, how long. Two: dopamine is the "do that again" signal, substances flood it far past anything nature offers, and the brain compensates by turning the reward down and the wanting up — that is tolerance, and they just felt it on their own phones. Three: the accelerator is finished and the brakes are not, until about 25, which is exactly why prevention works at this age and why the decision has to be made before the moment. Four: risk is the rain and protection is the payong — you cannot stop the rain, and the umbrella side is the side they control. Five: addiction is a health condition, not a character flaw.',
      apply:
        'Two commitments, split by role, because the room is paired. The SSLG President names one activity they will run in their own school inside 90 days — an echo-seminar for the student body is the obvious first move, and it is literally one of their six duties under §8.6. The SSLG Adviser names what they will sign, fund, or unblock so that activity actually happens. Both answers land on the same card on the projector wall, matched by school name. Then the pledge asks for something smaller and harder: nine lines each tapped individually, plus one sentence they would actually say to a friend under pressure. Nobody leaves with a slogan; they leave with a dated commitment that has two names on it and a sentence in their own words.',
      evaluate:
        'The eight-item Myth or Fact quiz is the knowledge check — the two or three items that split the room tell you exactly what to revisit before they echo this in their schools. The confidence slider pair is the affective check: the baseline was taken at the top of Act 0, the closing reading comes after they have written their plan and signed, and the stage shows the shift. If the shift is small, the plan wall and the signature count are the fallback evidence — a written, dated, two-signature commitment is a better outcome than a high number on a slider.',
    },
    examples: {
      student_leader:
        'Run the echo-seminar you already owe under §8.6, but run it on vaping, not on shabu — that is where your classmates actually are. Open it the way this session opened: ask them to guess how many teens use illegal drugs, then show them the real figure. Then do the part that costs nothing and matters most — pick one protective factor off the payong list and build it this quarter. Being the person who tells the truth is what makes the rest of your term credible.',
      adviser:
        'Put the president\'s activity into the School Improvement Plan and the calendar before the week ends, and name the budget line. Under DepEd Memorandum 200, s. 2016 the school head carries full responsibility for the NDEP, and DepEd Order 30, s. 2018 makes preventive drug education outcomes an OPCRF performance objective — so this is your documented deliverable, not extra work you are doing as a favour. And be the first protective factor on the list: the adult who actually listens is a role you can take on Monday without a memo.',
    },
    policyAlignment: [
      {
        order: 'DepEd Memorandum No. 200, s. 2016',
        connection:
          'The National Drug Education Program memorandum makes school heads fully responsible for drug education in their schools and directs them to establish Barkada Kontra Droga chapters and involve student organizations. That is the line that puts the SSLG President and the SSLG Adviser in the same room — the president is not volunteering, and the adviser is not doing a favour.',
      },
      {
        order: 'DepEd Order No. 30, s. 2018',
        connection:
          'The Preventive Drug Education Program guidelines require drug education "characterized by interactive methods and positive messaging." That is the authority for this deck\'s whole design: live activities instead of a lecture, and honest numbers instead of fear. It also makes PDE outcomes an OPCRF performance objective for school heads, which is why an adviser can commit resources on the spot.',
      },
      {
        order: 'DDB Board Regulation No. 5, s. 2007',
        connection:
          'Section 8.6 assigns Student Councils six Barkada Kontra Droga duties: encourage participation, integrate BKD into existing SSLG programs, initiate BKD activities, conduct echo-seminars, provide life-skills training, and support the BKD Center. This is the spine of Act 6 — the mandate is nineteen years old and already theirs.',
      },
      {
        order: 'Republic Act No. 9165, §43',
        connection:
          'The Comprehensive Dangerous Drugs Act requires instruction that distinguishes a patient under medical care from a person who is drug dependent, expressly "to avoid confusion and accidental stigmatization in the consciousness of the students." That statutory requirement is why this session never uses scare imagery, never asks who uses, and states plainly that addiction is a health condition, not a character flaw.',
      },
      {
        order: 'Republic Act No. 11900',
        connection:
          'The Vaporized Nicotine and Non-Nicotine Products Regulation Act sets the access age at 18 and restricts sale and use near schools. Act 5 hands this to the room as leverage rather than as a threat: a store selling to Grade 8 students beside a campus is not a rumour to keep, it is a violation an adviser can escalate.',
      },
      {
        order: 'Republic Act No. 9211 and Republic Act No. 10643',
        connection:
          'The Tobacco Regulation Act and the Graphic Health Warnings Law are the older half of the same framework — no selling to minors, no smoking in designated places, mandatory pictorial warnings. They are named in Act 5 to show that the legal scaffolding for a smoke-free and vape-free school already exists; what is missing in most schools is somebody willing to use it.',
      },
    ],
    processingQuestions: [
      'You came in expecting the usual warning about illegal drugs. What did the actual numbers change about who you think needs looking after in your school?',
      'Of the four things that lower the odds — one adult who listens, something to belong to, a way to handle stress, a reason to work toward — which one is thinnest in your school right now, and which one could your Student Council build before December?',
      'Your Student Council has held these six duties since 2007. Which one has your school genuinely never done — and what is stopping it, a rule or just nobody asking?',
    ],
  },
};
