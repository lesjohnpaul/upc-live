import type { Module } from '@/lib/types';

/**
 * The Catalyst: Youth Leadership for a Drug-Free School — Jessica C. Oliver's
 * slot at the Division Youth Leadership Symposium on Oplan Kalusugan sa DepEd
 * (SDO Urdaneta City, 21 August 2026). Audience: SSLG President + SSLG Adviser,
 * paired, two per school.
 *
 * STRUCTURE. Seven parts, per CATALYST_FINAL_REVISION.MD:
 *   1. The Catalyst — what the word means, and why it is the job description
 *   2. What is actually in your world — UPC 2 Module 2, reworded, + Beat the Brain
 *   3. Know the substances — UPC 2 Module 5, compressed, + the reward pathway
 *   4. Why one tries it and one does not — risk and protective factors
 *   5. Philippine Reality — the numbers, and the vape story
 *   6. The programs you already have — NDEP, EskweLA BAN, Barkada Kontra Droga
 *   7. From Programs to Action — role, recommendations, the 90-day commitment
 *
 * The build plan, the source→target map and the cut rationale are in
 * docs/plans/2026-08-18-catalyst-final-revision.md. Figures in Part 5 are
 * sourced in docs/research/2026-ph-youth-substance-data.md; Part 6's three
 * programs in docs/research/deped-programs-part-6.md.
 *
 * RUNTIME. 48 slides, seven activities, built to the booked 60 minutes — not
 * built long and cut. `notes.timing.hide` is therefore a RESERVE list (what to
 * pull back in if a part runs short) plus a short drop list, not a cut-to-fit
 * plan.
 *
 * Copy rule: ~12 words per stage slide, one idea, no sub-bullets, no bullet
 * over 14 words, never more than five bullets. Audience feedback on previous
 * decks was "hard to read, needs bigger letters" — the lever is fewer words,
 * not smaller type. Detail lives in the presenter notes, where Jessica says it
 * aloud. `content/catalyst/module-1.test.ts` enforces the mechanical half of
 * this, including that no migrated UPC 2 slide still addresses the room as
 * teachers of students.
 *
 * No scare tactics — that is also policy. DO 30, s. 2018 mandates interactive
 * methods and positive messaging, and RA 9165 §43 requires teaching the
 * difference between medical patients and drug dependents to avoid accidental
 * stigmatization.
 *
 * Substance grounded in UPC 2 Modules 2 and 5, reworded end to end for a room
 * of 15–18 year-olds sitting beside their advisers. The UPC 2 modules
 * themselves are never modified — they are shipped Day 2 decks for adult staff.
 */
export const module1: Module = {
  id: 'catalyst-m1',
  course: 'catalyst',
  number: 1,
  title: 'The Catalyst: Youth Leadership for a Drug-Free School',
  tagline:
    'What a catalyst actually does, what is actually in your world — and the mandate your Student Council has held since 2007.',
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
      subtitle: 'Youth Leadership for a Drug-Free School',
      presenter: 'Jessica C. Oliver',
      note: 'Walk-in / hold screen. Leave it up while the room fills — it animates on its own. Presidents and advisers are seated in pairs; ask them to sit together NOW, because the commitment card in Part 7 gives the two of them different prompts on two different phones and will not work otherwise.',
    },
    {
      kind: 'qr',
      title: 'Scan to join',
      note: 'Ninety seconds. Walk the aisles. Both the president AND the adviser join — the adviser is not a spectator here. Say it plainly: "Advisers, your phone too. You have a different job on this thing than your president does."',
    },

    // -------------------------------------------------- Part 1 · the word
    {
      kind: 'title',
      kicker: 'Part 1',
      title: 'The Catalyst',
      image: '/catalyst/act0-auditorium.jpg',
      note: 'Open cold on the word itself — do not preview the drug content yet. The room came expecting an anti-drug lecture and has already sat through one; starting with a chemistry word buys you their attention because it is not what they braced for. Say: "Before anything else, I want to teach you one word. It is a science word, and by the end of this hour it will be your job title."',
    },
    {
      kind: 'bullets',
      title: 'What a catalyst does',
      bullets: [
        'It starts a reaction that would not start on its own.',
        'It makes that reaction happen faster.',
        'It is not used up. It is still there afterwards.',
      ],
      note: 'Keep it concrete with one example and only one — yeast in bread, or the converter in a jeep\'s exhaust. The third bullet is the one that matters and the one nobody expects: the catalyst is not consumed. It does not have to burn itself out for the reaction to happen. Say it plainly, because half this room is already exhausted from being the reliable one: "Being the catalyst does not mean you get used up."',
    },
    {
      kind: 'statement',
      text: 'The catalyst never becomes the product. It only makes the reaction possible.',
      note: 'Pause here. Then make it human: "You are not going to end the drug problem in Pangasinan. That is not the job, and anyone who tells you it is has set you up to fail. Your job is to be the thing that makes the change possible in one school — yours."',
    },
    {
      kind: 'statement',
      text: '"Lead with Purpose" is not a slogan. It is the job description of a catalyst.',
      note: 'This lands the symposium theme into the deck\'s own frame, and it is the bridge into Part 2. Say: "So here is what we are going to do. First I am going to tell you the truth about what is actually in your world — and some of it will annoy you, because it is not what you have been warned about. Then I am going to show you the job you already have."',
    },

    // --------------------------------- Part 2 · what is in your world (M2)
    {
      kind: 'title',
      kicker: 'Part 2',
      title: 'What is actually in your world',
      image: '/catalyst/act1-specimens.jpg',
      note: 'Transition: "Every talk you have heard starts with the scary list. I am going to start somewhere else." The four objects behind you are deliberately neutral — a cup, a tin, a bottle, a packet. Nobody can tell which is which, and that is the point you are about to make. Ground: UPC 2 Module 2, reworded for this room.',
    },
    {
      kind: 'bullets',
      title: 'Psychoactive',
      bullets: ['Changes how your brain works.', 'That is the whole definition.'],
      note: 'One idea only. Do not put examples on the slide — say them: kape, vape, beer, cough syrup, shabu. The point is that the word has nothing to do with legality. Legal is not the same as safe, and illegal is not the same as dangerous. That distinction is the whole of Part 2, and it is the thing most adults in the room have never had said to them either.',
    },
    {
      kind: 'analogy',
      title: 'Ang Estante ng Sari-Sari Store',
      front:
        'A sari-sari store sells kape at the counter and gin behind it, right next to the sigarilyo. Same store, all legal. So which one is "safe"?',
      back:
        'None of them are safe just because they are legal. Kape, sigarilyo and alak all act on your brain. What sits where on that shelf was decided by law and by kaugalian — not by how much harm it can do. Your body does not read laws.',
      image: '/images/upc2-m2/analogy.jpg',
      note: 'The anchor of Part 2, from UPC 2 Module 2. Ask a volunteer to explain the front in their own words BEFORE you flip it — they will get it, because every one of them has stood in that store. Then land the manual\'s own point: legality follows tradition, culture and politics, not harm. NOTE: this plate was art-directed for the UPC decks, not for rally mode — it is a known visual mismatch pending a replacement.',
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
      note: 'Let them sort with no explanation first — the wrong answers ARE the lesson. Coffee in the same bucket as shabu is the one that lands; alcohol as a depressant is the one that surprises. Only after they commit, give the four classes in one sentence: stimulants speed the nervous system up, depressants and opioids slow it down, hallucinogens distort it. Do not teach the four classes as a slide; this activity is the slide.',
    },
    {
      kind: 'statement',
      text: 'Coffee and shabu are in the same column. The difference is how hard, how fast, how long.',
      note: 'The Part 2 payoff. Pause five seconds, then advance — the next slide unpacks the three. Expect pushback on this one; welcome it. "I am not telling you kape is shabu. I am telling you the category is not the thing that decides. The three things on the next slide are."',
    },
    {
      kind: 'bullets',
      title: 'How hard. How fast. How long.',
      bullets: [
        'How hard — the dose, and how strong the thing is.',
        'How fast — smoked hits your brain in 7 seconds. Swallowed, 30 minutes.',
        'How long — once, or every day for eight months.',
      ],
      note: 'EMPHASIZE the middle one; it is the whole case against "it is just vape." The faster a substance reaches the brain, the more reinforcing it is — and vape IS the fast route, same as smoking. Say it plainly: "Vape is not the mild version. Vape is the fast version." Ground: route of administration and speed of onset, UPC 2 Module 2 — smoking 7–10 seconds, swallowing 20–30 minutes.',
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
      note: 'Moved here from the science act on purpose: they FEEL tolerance now, and Part 3 names the mechanism afterwards. Experience first, explanation second. Let them tap in silence — do not narrate over it. When the room goes quiet, ask: "At what point did you notice you were working harder for less?" IMPORTANT about the count on screen: "N of 60 have felt it" is a floor, not a census — each phone writes one row at the reveal tap, and a wifi blip loses it silently. Say "look how many of you have already felt it", never "only 41 of you finished."',
    },

    // ------------------------------------ Part 3 · know the substances (M5)
    {
      kind: 'title',
      kicker: 'Part 3',
      title: 'Know the substances',
      image: '/catalyst/act2-craving.jpg',
      note: 'Transition: "You just felt what your brain does. Now let us name the things that do it to you." Keep this part moving — it is the most information-dense stretch of the hour and the room can only hold so much. Ground: UPC 2 Module 5, compressed hard for this audience.',
    },
    {
      kind: 'activity',
      activity: {
        id: 'catalyst-m1-poll-threat',
        kind: 'poll',
        prompt: 'Biggest threat in YOUR school right now?',
        options: ['Alak (alcohol)', 'Vape / sigarilyo', 'Shabu', 'Rugby / solvents'],
      },
      // Four options, not five: at 1920x1080 a five-option poll card runs past
      // the bottom edge and the shell clips it. Marijuana was the one to drop —
      // it is the least load-bearing here, since shabu already plays the
      // "feels most dangerous" role that makes the perception gap land.
      note: 'Opinion poll — there is deliberately no correct answer, and do not let the room think one exists. Read the spread aloud. Whatever wins, name the gap: what feels most dangerous and what is most available are rarely the same thing, and Part 5 will show them the numbers. Reworded from UPC 2 Module 5, which asked staff about "your students" — here the room is answering about itself, which is a very different question. Do not ask who uses. Ever.',
    },
    {
      kind: 'bullets',
      title: 'What speeds you up. What slows you down.',
      bullets: [
        'Speeds you up: vape, sigarilyo, kape, shabu.',
        'Slows you down: alak, sleeping pills, tranquilizers.',
        'Kills pain and warning both: codeine cough syrup, tramadol.',
        'Bends what you see: marijuana, LSD.',
      ],
      note: 'This one slide replaces five dense adult slides from UPC 2 Module 5. Give one consequence per line as you read it, no more: shabu costs you sleep, appetite and eventually your teeth; alak lowers what you would normally never do; opioids remove the pain AND the warning that something is wrong; marijuana takes your memory and your interest in school. Person-first language throughout — "a person who uses shabu", never "an addict". If a student asks about a substance not on this list, answer factually and move.',
    },
    {
      kind: 'bullets',
      title: 'The one nobody warns you about',
      bullets: [
        'Rugby, thinner, correction fluid, butane. Cheap, legal, under the sink.',
        'The high lasts minutes, so people inhale again and again.',
        'Looks like drunkenness. Chemical smell, sores around the mouth.',
        'One session can stop a healthy heart. Once is enough.',
      ],
      note: 'EMPHASIZE, and say the last line exactly once, calmly, as fact — not as a threat. Inhalants are usually the FIRST substance a young person meets, because they cost nothing and are already at home, and they are the one nobody runs a campaign about. This is also the slide most relevant to the younger siblings of everybody in this room. Source: UPC 2 Module 5, Resource Page 5.6.',
    },
    {
      kind: 'bullets',
      title: 'Dopamine',
      bullets: ['The brain’s "do that again" signal.', 'Drugs flood it. Nature loses.'],
      image: '/catalyst/reward-pathway.jpg',
      note: 'Sixty seconds maximum — Beat the Brain already taught this better than you can, and they have already felt it. Dopamine is not the pleasure; it is the sticky note that says do that again. It exists to make you repeat what keeps you alive: eating, friendship, winning. Substances release far more than any of those, so the brain learns the wrong lesson fast. ALSO SAY HERE (the slide that used to carry it was cut for time): the part of your brain that stops you is not finished until about 25, while the part that wants the reward is already fully online. That gap is normal, temporary, and exactly why the first offer usually comes at your age — and why you decide BEFORE you are standing in the moment.',
    },
    {
      kind: 'statement',
      text: 'Addiction is a health condition. Not a character flaw.',
      image: '/catalyst/calm-portrait.jpg',
      // The one beat that stops shouting: mist ground, slate type, slow
      // motion. Everything either side of it stays rally, so the drop in
      // volume is the point. NEVER CUT — RA 9165 §43.
      mode: 'calm',
      note: 'Slow down. Drop your volume. This is RA 9165 §43 made human: students must be taught the difference between a person with a medical condition and a criminal, precisely so nobody in this room learns to despise a classmate. Say it plainly: nobody ever plans this, and the person it happens to needs a referral, not a rumour. Never say "addict" from this stage — say "a person with a substance use disorder" — and correct it gently if the room says otherwise.',
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
      note: 'The beat with the highest chance of mattering to somebody in this room tonight, and it sits here because the slide before it just said addiction is an illness — so this is what you do about an illness. EMPHASIZE the last bullet and say it twice. Name the actual people in their school: SSLG adviser, school nurse, guidance counselor — and ask the advisers present to raise a hand so students can see who they are. Be honest about the hard part: the friend may be angry at first. Ask the room "would you rather have an angry friend or a sick one?" and let them answer it themselves.',
    },

    // -------------------------------- Part 4 · what influences us (Act 3)
    {
      kind: 'activity',
      activity: {
        id: 'catalyst-m1-wordcloud-influences',
        kind: 'wordcloud',
        prompt: 'One word: what makes someone your age try it the first time?',
        maxWords: 2,
      },
      note: 'PULLED UP DELIBERATELY — this runs BEFORE Part 4\'s title slide, so the room writes the lesson before you name it. Do NOT prompt with examples first; let the words arrive cold. What always comes back: barkada, curiosity, stress, pressure, problema sa bahay, social media, trip lang. Read four aloud, then name the pattern: "Nobody wrote \'because I wanted to become an addict.\' Every word you gave me is about belonging, feeling, or escape. Hold that." Then advance into the part they just wrote.',
    },
    {
      kind: 'title',
      kicker: 'Part 4',
      title: 'Why one tries it and one does not',
      image: '/catalyst/act3-shelter.jpg',
      note: 'Retitled in plain language at Jessica\'s request — the old heading ("What tips the scale") did not read clearly to a student. Transition: "Two students. Same school, same barkada, same everything. One tries it, one never does. The difference is almost never willpower." This part turns the hour from information into a job they can actually do.',
    },
    {
      kind: 'bullets',
      title: 'What makes it more likely',
      bullets: [
        'Stress with nowhere to put it.',
        'A barkada where it is already normal.',
        'Nobody at home asking where you are.',
        'It is cheap, near, and sold to anyone.',
      ],
      note: 'Read these as conditions, never as accusations — several students in this room are living at least one of them and must not hear a diagnosis of themselves. Say it out loud: "If you just recognised your own house in one of these, that is not a verdict on you. It means you get to be deliberate where other people get to be lucky." Point back at the word cloud they just filled: these are the same answers, sorted.',
    },
    {
      kind: 'bullets',
      title: 'What makes it less likely',
      bullets: [
        'One adult who actually listens.',
        'Something you belong to — team, org, choir, court.',
        'A way to handle stress that is not a substance.',
        'Knowing what you are working toward.',
      ],
      note: 'EMPHASIZE — NEVER CUT. Every one of these four is something an SSLG can literally build, with no budget, this school year. That is the argument of the entire session, so do not rush it. "You cannot delete anybody\'s risk. You can add protection, and protection is the side you actually control." Point at the advisers on the first bullet: for a lot of students, the one adult who listens is already sitting in this room.',
    },
    {
      kind: 'analogy',
      title: 'Ang Payong',
      front:
        'Umuulan. You cannot stop the rain, and you cannot choose who walks home in it. So what CAN you do?',
      back:
        'You can hand someone a payong. Risk is the rain — barkada, stress, an empty house, a store that sells to anyone. Protection is the umbrella: one adult who listens, a team to belong to, a reason to get home dry. Prevention is not stopping the rain. It is making sure nobody walks through it alone.',
      image: '/catalyst/analogy-payong.jpg',
      note: 'CENTRAL ANALOGY of the whole deck. Ask a volunteer to guess the back before you flip it — teenagers get this one immediately, which is exactly why it works. Then draw the payoff explicitly: you are not being asked to end the drug problem in Pangasinan. You are being asked to hand out umbrellas. That is a job a seventeen-year-old can actually finish, and it is the same point Part 1 made about the catalyst.',
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
      note: 'Refusal skills, the practical version, and it belongs here because Part 4 is about influence — this is what you do when the influence is pointed at you. The key idea is the first bullet: a reason about yourself cannot be argued with, but a judgement about them starts a fight you will lose. Have two students actually say the line aloud — it feels ridiculous in a bright auditorium, which is exactly why rehearsing it here makes it available later.',
    },
    {
      kind: 'statement',
      text: 'You cannot stop the rain. You can hand someone a payong.',
      note: 'Say it once and move. This is the line you want repeated back to you in the evaluation forms, so do not bury it in explanation. If you have time for one more sentence, make it the other permission slip: you do not have to win the argument, you only have to leave the room. Leaving is not losing.',
    },

    // ------------------------------------------- Part 5 · Philippine Reality
    {
      kind: 'title',
      kicker: 'Part 5',
      title: 'Philippine Reality',
      image: '/catalyst/act3-vapour.jpg',
      note: 'THE CREDIBILITY ACT — do not trim it. Say the concession out loud before the first number: "You have all heard the anti-drug talk. Some of you have heard it three times. I am not going to exaggerate at you — I am going to show you the actual numbers, and some of them will annoy you." That sentence is what buys everything after it. Every figure in this part is sourced in docs/research/2026-ph-youth-substance-data.md; if a student challenges one, name the survey and the sample size.',
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
      note: 'The hook. Read the live average aloud before advancing — most rooms land between 20 and 50. Do NOT correct it yet. Say "hold that number", then advance. This slider deliberately has no "after" pair; it is a guess, not a confidence reading, and the integrity test exempts it by id.',
    },
    {
      kind: 'stat',
      value: 'Almost none',
      label: 'of Filipino youth use illegal drugs',
      source: 'YAFS5 2021 · UP Population Institute',
      note: 'The credibility slide. The real figure is 0.1%, down from 2.4% in 2002 — the year RA 9165 passed. Say the full picture aloud, deliberately NOT on the screen: "Of every 10 young Filipinos, about 3 drink and almost none uses illegal drugs." Then name what you just did: "Every adult who told you this country is drowning in shabu was overstating it. I am not going to do that." If challenged: 10,949 youth aged 15–24, 900+ barangays, nationally representative. Watch the advisers here too — most have never seen this number either. CAUTION: do NOT say youth smoking is falling. YAFS5 caught it at the bottom of a decline and the 2023 data has it turning back up — see the next two slides.',
    },
    {
      kind: 'stat',
      value: '1 in 7',
      label: 'Filipinos aged 13–15 who vape right now',
      source: 'Global Youth Tobacco Survey, 2019',
      note: 'The pivot. "The thing adults keep warning you about is rare. The thing they mostly ignore is in this room." The precise figure is 14.1% currently vaping, and 24.6% have tried it — that second number doubled in four years. Ask for a show of hands on how many KNOW someone who vapes — NEVER ask who vapes. Never single anyone out; that is exactly the stigmatization RA 9165 §43 warns against.',
    },
    {
      kind: 'stat',
      value: '423,185',
      label: 'young vape users in 2023',
      context: 'From 37,513 in 2021.',
      source: 'DOST-FNRI, Expanded National Nutrition Survey, 2021 and 2023',
      note: 'Let the counter run all the way up before you speak — the climb is the message. Then: "Two years. Eleven times more. Nobody ran an information campaign about that." ALSO FROM THIS SURVEY, say it here: smoking among 10–19 year-olds doubled in the same two years, 2.3% to 4.8%, and among teens who smoke, vaping went from 7.5% to nearly 40%. That closes the obvious comeback — "but smoking is going down." It is not. It turned around, and this is the thing that turned it.',
    },
    {
      kind: 'bullets',
      title: 'What is actually in the cloud',
      bullets: [
        'Nicotine — the most addictive thing most teens will ever meet.',
        'It is aerosol, not steam. Steam is water. This is not.',
        'One pod can carry the nicotine of a whole pack.',
      ],
      note: 'Correct the single biggest myth in the country here. Aerosol is fine liquid particles suspended in air, carrying nicotine, flavouring chemicals and traces of metal from the coil — water vapour is what comes off a kettle. Do NOT over-claim beyond that; you do not need to. The nicotine alone is the whole argument, and an exaggeration is exactly what this room is waiting to catch you on.',
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
      note: 'The beat that flips the room from being warned to being angry — and anger at an industry is far more useful than shame at a classmate. Say it: "You are the most marketed-to generation in Philippine history, and you are extremely good at spotting when a brand is trying to be your friend. Point that skill at this." Ground: youth-targeted flavour and design marketing, WHO and DOH tobacco-control findings.',
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
          { prompt: 'Alcohol is a stimulant.', options: ['Myth', 'Fact'], correct: 0, seconds: 15 },
          {
            prompt: 'Most Filipino teens use illegal drugs.',
            options: ['Myth', 'Fact'],
            correct: 0,
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
      note: 'Trimmed from eight items to five for the 60-minute build — about two minutes. Do not lecture between questions; debrief only the two or three that split the room. The usual splits: "vape is just water vapor" (aerosol carrying nicotine and metals, not steam), "alcohol is a stimulant" (it is a depressant — it lowers inhibition on the way down, which is why it feels like the opposite), and "relapse means treatment failed" (relapse is part of every chronic condition, and the correct response is more support, not punishment). The three dropped items are in notes.timing.hide if you have room.',
    },

    // ------------------------------------------- Part 6 · the programs
    {
      kind: 'title',
      kicker: 'Part 6',
      title: 'The programs you already have',
      note: 'The turn of the whole hour. Say it before the first card: "Everything until now was so you understand it. From here it is your job — and here is the part nobody told you. You are not being recruited today. Your school already runs three programs for this, and one of them has had your name on it since 2007." TED-talk pacing for this part: one idea per card, open each with the question on the front, and only flip after somebody in the room answers.',
    },
    {
      kind: 'analogy',
      title: 'NDEP',
      front: 'Your school already runs an anti-drug program. Can you name it?',
      back:
        'NDEP — the National Drug Education Program. Every school has one, and your principal is personally accountable for it. The law says it must build life skills, not just hand out warnings. Someone has to run the student side. That is you.',
      note: 'Let them fail to name it first — that silence is the teaching moment. Ground: DepEd Memorandum 200, s. 2016 says school heads are "fully responsible for its effective implementation", and DepEd Order 30, s. 2018 makes preventive drug education an OPCRF performance objective. ADVISERS: that means this is your documented deliverable, not a favour. Its twin purpose is written into the memo — awareness of ill effects AND positive behaviour and life skills. The second half is why this session looks like this.',
    },
    {
      kind: 'analogy',
      title: 'EskweLA BAN sa Sigarilyo',
      front: 'Why is it illegal for a store to sell cigarettes right outside your gate?',
      back:
        'DepEd Order 48 bans selling or advertising tobacco within 100 metres of any school — that campaign is EskweLA BAN sa Sigarilyo. For vapes, RA 11900 does the same. A store near you breaking it is not gossip. It is a violation your adviser can report.',
      note: 'Point out the pun — eskwelahan / eskwela ban — it is DepEd\'s own joke and it makes the name stick. This card exists to hand them leverage, not to threaten them. The usable fact is the 100 metres: a student can pace that out on the way home. BE PRECISE: DO 48, s. 2016 is a tobacco policy and predates the vape surge — it is RA 11900 (2022) that covers vapes, with an access age of 18 and restrictions near schools. Do not claim DO 48 bans vapes. ADVISERS: this is the concrete thing you can bring to the school head this month.',
    },
    {
      kind: 'analogy',
      title: 'Barkada Kontra Droga',
      front: 'Which program actually puts students in charge?',
      back:
        'Barkada Kontra Droga. It was built on one finding — young people listen to young people. It gives your Student Council six official duties, and its centre is supposed to sit in your own office. Nineteen years old, and probably news to you.',
      note: 'Also called Barkada Kontra Bisyo — that is the colloquial name, not an official rename; say "also known as". DDB Board Regulation No. 5, s. 2007, built with UNODC support and piloted in Antipolo, Cainta and Tanay. The pilot finding is the good part: youth are the most effective messengers to other youth, which is WHY the program is peer-led rather than lecture-led. §7.3a puts the BKD Center in the Student Council office and obliges the school to supply it — advisers can ask this week whether theirs exists. Hold back the six duties; the next slide is the reveal.',
    },
    {
      kind: 'stat',
      value: '6',
      label: 'duties your Student Council already has',
      source: 'DDB Board Regulation No. 5, s. 2007 §8.6',
      note: 'The reveal. Say it before the counter finishes: "You are not being recruited today. Barkada Kontra Droga already assigns six duties to every Student Council in this country, and yours is one of them." Read the five aloud from here — encourage participation, integrate BKD into existing SSLG programs, initiate BKD activities, provide life-skills training, support the BKD Center — then say "I left one out" and advance. Do not put the five on a slide; they were the least legible thing in the old deck.',
    },
    {
      kind: 'statement',
      text: 'Duty four: conduct an echo-seminar.',
      note: 'The hinge of the entire hour. Pause five seconds before you speak. Then: "Conduct an echo-seminar or training on the prevention and control of dangerous drugs among the student populace. That is the regulation\'s exact wording, and it is exactly what this hour is asking you to go home and do." Every president here is already expected to bring this back and teach it. Then the date: this has been their duty since 2007 — most of this room was born around that year. "Nobody handed you the paper. I am handing it to you now."',
    },

    // ------------------------------------ Part 7 · from programs to action
    {
      kind: 'title',
      kicker: 'Part 7',
      title: 'From Programs to Action',
      image: '/catalyst/act4-leaders.jpg',
      note: 'Transition: "A program you do not run is just a paragraph. So here is what running it actually looks like — and it is different depending on which one of you is holding the phone." Presidents and advisers get one slide each; make each half look at the other while their slide is up.',
    },
    {
      kind: 'bullets',
      title: 'If you are the President',
      bullets: [
        'Run the echo-seminar you already owe — on vaping, not shabu.',
        'Build one protective factor this quarter. It costs nothing.',
        'Report the store that sells to Grade 8 students.',
        'Barkada to barkada. Not assembly to audience.',
      ],
      note: 'Four concrete moves, each tied to something already established in this deck, so none of them arrive as a new ask. Bullet 1 is duty four from Part 6, pointed where Part 5 showed the room actually is. Bullet 2 is the payong list from Part 4 — a club, a team, a standing space to belong to, no budget required. Bullet 3 is the 100-metre rule from Part 6. Bullet 4 is the Barkada Kontra Droga pilot finding: youth listen to youth, which is why an assembly changes less than one conversation. Say: "Being the person who tells the truth is what makes the rest of your term credible."',
    },
    {
      kind: 'bullets',
      title: 'If you are the Adviser',
      bullets: [
        'Put it in the School Improvement Plan this week.',
        'Name the budget line. Then sign it.',
        'Be the adult who actually listens. No memo needed.',
        'Name who inherits it before you leave the post.',
      ],
      note: 'Read this one slowly and directly at the advisers. Bullet 1 and 2: DO 30, s. 2018 makes preventive drug education an OPCRF objective and requires MOOE allocation, so this is documented performance, not extra work. Bullet 3 is the first item on the Part 4 protection list — the only one on this slide that costs nothing and starts Monday. Bullet 4 IS the sustainability answer: the program that survives is the one written down and handed over, not the one that was popular. Say it plainly: "Every good school program in this division has died the year its adviser got promoted. Write down who is next."',
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
      note: 'Do not over-explain the four — the deck already taught each one. Land on DECIDE: "Leadership is not the version of you that shows up at a symposium. It is the version of you at 9pm on a Saturday when nobody from this room can see you." If you want one quotable line in the whole hour, put it here and then go straight into the commitment card. Do not let the energy leak.',
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
      note: 'THE most important four minutes of the hour. The pair fills this in together but on two phones, with two different prompts — the president names the activity, the adviser names what they will sign, fund or unblock. Tell them to type the school name EXACTLY the same way as their partner; that is how the two plans meet on one card. Then read three schools aloud off the wall, adviser line included, before you move on. This is the impressive moment and it is impressive because it is theirs, in their own words, with two names on it.',
    },

    // ------------------------------------------------------------- close
    {
      kind: 'activity',
      activity: {
        id: 'catalyst-m1-wordcloud-leader',
        kind: 'wordcloud',
        prompt: 'I want to be the Leader who ______',
        maxWords: 3,
      },
      note: 'Ninety seconds, three words maximum — the constraint is what makes the wall readable and the answers honest. Expect: listens, stays, tells the truth, does not judge, shows up, starts things. Read five aloud, slowly, and say nothing clever afterwards. This is the emotional peak of the hour; do not step on it with a joke or a summary. Leave the wall up while you walk to the finale.',
    },
    {
      kind: 'finale',
      headline: 'You Are the Catalyst',
      image: '/catalyst/finale-catalyst.jpg',
      text: 'You start the reaction. You are not used up by it. Go.',
      attribution: 'Jessica C. Oliver',
      badge: 'Lead with Purpose',
      note: 'The headline writes itself letter by letter — say NOTHING for the first four seconds. Then close the loop Part 1 opened, and land the thing you held back: the Dangerous Drugs Board wrote in 2007 that the whole point of Barkada Kontra Droga is to make each student "the catalyst within his peer groups." That is not Jessica\'s metaphor. That is the regulation. Nineteen years ago somebody wrote down what they are, and this hour was just delivering the message. Then, slowly: "You do not have to be famous to be influential. You do not have to be an adult to be a leader. Start with your circle. Start with one decision." Read the line on screen and stop talking. Leave the plan wall and the leader wall up on the second screen if you have one — the summary is already there, in their own handwriting.',
    },
  ],
  notes: {
    timing: {
      hide: [
        'THIS IS A RESERVE LIST, NOT A CUT LIST. The deck is built to the booked 60 minutes. These are the beats that were cut to get there — pull one back only if a part runs short or the room asks for it.',
        'RESERVE (Part 2): the opening poll "Which of these changes how your brain works?" (kape / vape / alak / all of them). Cut because Sort the Substance and the sari-sari analogy already teach legal-is-not-safe. +90s.',
        'RESERVE (Part 4): the "Which side of the scale?" sorting activity — eight items across "raises the risk" and "builds protection". The two bullets slides carry the same content. +3 min.',
        'RESERVE (Part 4): STOP · THINK · CHECK · CHOOSE, and the scenario poll ("Isa lang, try mo"). Strong material; there was no room for a fourth activity. +4 min.',
        'RESERVE (Part 5): the three dropped Myth-or-Fact items — smoking hits the brain in ~10 seconds (Fact), you cannot get addicted to something legal (Myth), starting young raises addiction risk (Fact). +90s.',
        'RESERVE (Part 5): "The law is already on your side" — RA 11900, RA 9211, RA 10643 as their own slide. The usable half now lives on the EskweLA BAN card. +2 min.',
        'IF RUNNING LATE, drop in this order: (1) the Part 3 threat poll, (2) the Part 5 guess slider — but then you must still say the "almost none" figure, (3) "You are the target market". Nothing else.',
        'NEVER CUT: Part 1 in full, "Addiction is a health condition" (RA 9165 §43), "When your friend is the one struggling", "What makes it less likely", the Part 6 mandate reveal and duty four, Build Your Barkada, the leader word cloud, the finale.',
      ],
      summarize: [
        'The four substance classes: do not teach them as a slide. Sort the Substance is the slide — then one sentence, up / down / down / distort.',
        'The brain finishing at 25: this lost its own slide. Say it over the dopamine slide, in two sentences, and move.',
        'The five other Barkada Kontra Droga duties: read them aloud over the "6" counter. They are deliberately not on a slide.',
        'The three tobacco and vape laws: name them on the EskweLA BAN card, do not explain them. The usable fact is the 100-metre rule.',
        'The L·E·A·D acronym: the deck already taught all four ideas. Read the four lines, land on DECIDE, move.',
      ],
      emphasize: [
        'Part 5 opened with the concession — "adults have been overstating this, I am not going to." That sentence buys the rest of the hour. Never trim it to save time.',
        '"What makes it less likely" in Part 4. Every one of the four is something an SSLG can build with no budget, which is the entire argument of the session.',
        '"When your friend is the one struggling" — helping is not snitching, silence is not loyalty. Most likely slide in the deck to matter to somebody tonight. Name the actual adults and have them raise a hand.',
        'The Part 6 mandate reveal — the three cards, the "6", and duty four. They already hold the job, so this is a reminder, not a recruitment.',
        'Build Your Barkada. If only one thing survives the hour, it is a written, dated 90-day commitment with a president and an adviser attached to it.',
      ],
    },
    fiveEs: {
      engage:
        'Open on a chemistry word, not a warning. The room braced for the anti-drug lecture they have already sat through twice, and Part 1 refuses to give it to them — it teaches what a catalyst is, and lands the fact nobody expects: a catalyst is not consumed by the reaction it starts. Only then does the deck turn to substances, and it opens that turn with the sari-sari store shelf every one of them has stood in front of. The real engagement beat, though, is Part 5, where an adult tells them the truth about their own world for the first time: almost no Filipino teenager uses illegal drugs, and the thing the adults ignore — vaping — went up elevenfold in two years. Conceding that the warnings were overstated is what buys the hour.',
      explore:
        'Four discovery beats, none of them explained beforehand. Sort the Substance runs cold, so coffee lands beside shabu and alcohol gets read as a stimulant — the wrong placements are the lesson. Beat the Brain has them tap for a reward that quietly shrinks while the urge climbs, and the card names what they just felt; it now runs BEFORE the dopamine explanation, so they experience tolerance and then learn its name. The word cloud that opens Part 4 has the room write the risk factors in their own vocabulary before anyone teaches them, and not one student writes "because I wanted to become an addict". The guess slider in Part 5 makes them commit to a number in public before the real figure corrects it. They commit first, then find out.',
      explain:
        'Five ideas, in order. One: psychoactive means it changes how your brain works — legality has nothing to do with it, which is why coffee and shabu share a column and the real difference is how hard, how fast, how long. Two: substances sort into what speeds you up, what slows you down, what kills pain and warning together, and what bends what you see — with inhalants as the accessible one nobody campaigns about. Three: dopamine is the "do that again" signal, substances flood it far past anything nature offers, and the brain answers by turning the reward down and the wanting up; that is tolerance, and they already felt it. Four: risk is the rain and protection is the payong — you cannot stop the rain, and the umbrella is the side you control. Five: addiction is a health condition, not a character flaw.',
      apply:
        'Two commitments, split by role, because the room is paired. The SSLG President names one activity they will run in their own school inside 90 days — an echo-seminar for the student body is the obvious first move, and it is literally duty four under §8.6. The SSLG Adviser names what they will sign, fund, or unblock so that activity actually happens. Both answers land on the same card on the projector wall, matched by school name, and three are read aloud with the adviser line included. Part 7 hands each half its own four concrete moves first, so neither is guessing when the card opens. The closing word cloud — "I want to be the Leader who ______", three words — is the smaller, harder ask: not what they will do, but who they intend to be.',
      evaluate:
        'The five-item Myth or Fact quiz is the knowledge check — the two or three items that split the room tell Jessica exactly what to revisit before they echo this in their own schools. The affective check is deliberately not a slider. This deck removed the "how ready are you" readings that the UPC modules used, because the same framing was cut from the migrated slides and because a written commitment is stronger evidence than a self-reported number. What replaces it: the plan wall, which produces a dated 90-day commitment with two names and a school attached to each one, and the closing word cloud. A room that fills the plan wall has demonstrably moved; a room that does not has told Jessica something a high slider score would have hidden.',
    },
    examples: {
      student_leader:
        'Your first move is the echo-seminar you already owe under §8.6 — but run it on vaping, not shabu, because that is where your classmates actually are. Open it the way this session opened: ask them to guess how many teens use illegal drugs, then show them the real figure. Being the person who tells the truth is what makes the rest of your term credible. Then do the part that costs nothing and matters most: pick one protective factor off the payong list and build it this quarter. Not a poster campaign — a thing people can belong to. And remember the finding the whole program rests on: your classmates will hear it from you in a way they will never hear it from an assembly.',
      adviser:
        'Put the president\'s activity into the School Improvement Plan and the calendar before the week ends, and name the budget line. Under DepEd Memorandum 200, s. 2016 the school head carries full responsibility for the NDEP, and DepEd Order 30, s. 2018 makes preventive drug education outcomes an OPCRF performance objective — so this is your documented deliverable, not a favour you are doing a student. Two things only you can do: ask whether your school actually has the BKD Center that §7.3a says belongs in the Student Council office, and name your successor on this program before you leave the post. Every good program in this division has died the year its adviser moved on. And be the first item on the Part 4 protection list — the adult who actually listens is a role you can take on Monday without a memo.',
    },
    policyAlignment: [
      {
        order: 'DepEd Memorandum No. 200, s. 2016',
        connection:
          'The National Drug Education Program memorandum makes school heads fully responsible for drug education in their schools and directs them to establish Barkada Kontra Droga chapters and involve student organizations. That is the line that puts the SSLG President and the SSLG Adviser in the same room — the president is not volunteering, and the adviser is not doing a favour. Its stated twin purpose — awareness of ill effects AND positive behaviour and life skills — is the mandate for Parts 4 and 7.',
      },
      {
        order: 'DepEd Order No. 30, s. 2018',
        connection:
          'The Preventive Drug Education Program guidelines require drug education "characterized by interactive methods and positive messaging." That is the authority for this deck\'s whole design: live activities instead of a lecture, and honest numbers instead of fear. It also makes PDE outcomes an OPCRF performance objective for school heads, which is why an adviser can commit resources on the spot — and its own enclosure cites the Universal Prevention Curriculum by name, so this material is the one DepEd policy already points to.',
      },
      {
        order: 'DepEd Order No. 48, s. 2016',
        connection:
          'The Policy and Guidelines on Comprehensive Tobacco Control bans smoking on school premises, prohibits the sale or advertisement of tobacco within a 100-metre perimeter of any school, and bars tobacco-industry sponsorship. The EskweLA BAN sa Sigarilyo campaign exists to make those bans known. Part 6 hands the 100-metre rule to the room as leverage. Note its limit: DO 48 is a tobacco policy and predates the vape surge — RA 11900 carries the vape half.',
      },
      {
        order: 'DDB Board Regulation No. 5, s. 2007',
        connection:
          'Section 8.6 assigns Student Councils six Barkada Kontra Droga duties: encourage participation, integrate BKD into existing SSLG programs, initiate BKD activities, conduct echo-seminars, provide life-skills training, and support the BKD Center. This is the spine of Parts 6 and 7 — the mandate is nineteen years old and already theirs. The regulation also describes its own aim as making each student "the catalyst within his peer groups", which is where this deck takes its title.',
      },
      {
        order: 'Republic Act No. 9165, §43',
        connection:
          'The Comprehensive Dangerous Drugs Act requires instruction that distinguishes a patient under medical care from a person who is drug dependent, expressly "to avoid confusion and accidental stigmatization in the consciousness of the students." That statutory requirement is why this session never uses scare imagery, never asks who uses, and states plainly — in calm mode, at lowered volume — that addiction is a health condition, not a character flaw.',
      },
      {
        order: 'Republic Act No. 11900',
        connection:
          'The Vaporized Nicotine and Non-Nicotine Products Regulation Act sets the access age at 18 and restricts sale and use near schools. Part 6 pairs it with DO 48 so the room gets the whole perimeter picture: cigarettes under the DepEd order, vapes under the statute. A store selling to Grade 8 students beside a campus is not a rumour to keep, it is a violation an adviser can escalate.',
      },
      {
        order: 'Republic Act No. 9211 and Republic Act No. 10643',
        connection:
          'The Tobacco Regulation Act and the Graphic Health Warnings Law are the older half of the same framework — no selling to minors, no smoking in designated places, mandatory pictorial warnings. They are held in reserve rather than given a slide: the legal scaffolding for a smoke-free and vape-free school already exists, and what is missing in most schools is somebody willing to use it.',
      },
      {
        order: 'DepEd Order No. 28, s. 2018',
        connection:
          'Oplan Kalusugan sa DepEd bundles six flagship school health programs so schools implement them as one package, with NDEP and tobacco control as pillar five. That is the frame of the symposium this deck sits inside, and it is why Part 6 presents three programs rather than one — in policy they already travel together.',
      },
    ],
    processingQuestions: [
      'You came in expecting the usual warning about illegal drugs. What did the actual numbers change about who you think needs looking after in your school?',
      'Of the four things that make it less likely — one adult who listens, something to belong to, a way to handle stress, a reason to work toward — which is thinnest in your school right now, and which could your Student Council build before December?',
      'Your Student Council has held these six duties since 2007. Which one has your school genuinely never done — and what is stopping it, a rule or just nobody asking?',
      'Part 1 said a catalyst is not used up by the reaction it starts. Where in your term so far have you been letting yourself get used up, and what would doing it as a catalyst look like instead?',
    ],
  },
};
