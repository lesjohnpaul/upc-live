import type { Module } from '@/lib/types';

/**
 * The Catalyst — Jessica C. Oliver's 60-minute drug-prevention slot at the
 * Division Youth Leadership Symposium on Oplan Kalusugan sa DepEd
 * (SDO Urdaneta City, 21 August 2026). Audience: SSLG President + SSLG
 * Adviser, paired, two per school.
 *
 * Strategy: the room expects a scare lecture and has already sat through one.
 * The data says that lecture is wrong for this audience, so the deck concedes
 * the point first (Act 0), earns credibility with the numbers, and only then
 * teaches. No scare tactics — that is also policy: DO 30, s. 2018 mandates
 * interactive methods and positive messaging, and RA 9165 §43 requires
 * teaching the difference between medical patients and drug dependents to
 * avoid accidental stigmatization.
 *
 * Copy rule for this deck: ~12 words per stage slide, one idea, no
 * sub-bullets. Audience feedback on previous decks was "hard to read, needs
 * bigger letters" — the lever is fewer words, not smaller type. Detail lives
 * in the presenter notes, where Jessica says it aloud.
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
  slides: [
    // ---------------------------------------------------------------- open
    {
      kind: 'welcome',
      dayLabel: 'Lead with Purpose · SDO Urdaneta City',
      title: 'The Catalyst',
      presenter: 'Jessica C. Oliver',
      note: 'Walk-in / hold screen. Leave it up while the room fills — it animates on its own. Presidents and advisers are seated in pairs; ask them to sit together now, because two slides later they answer different prompts on two phones.',
    },
    {
      kind: 'qr',
      title: 'Scan to join',
      note: 'Ninety seconds. Walk the aisles. Both the president AND the adviser join — the adviser is not a spectator here, and the Build Your Barkada card at the end will not work if only one phone is in.',
    },

    // ------------------------------------------------------- Act 0 · truth
    {
      kind: 'title',
      kicker: 'Act 0',
      title: 'Alam Mo Ba Talaga?',
      note: 'Say the concession out loud before the slider: "You have all heard the anti-drug talk. Some of you have heard it three times. Today I am not going to exaggerate at you — I am going to show you the actual numbers, and some of them will annoy you." That sentence buys the next 55 minutes.',
    },
    {
      kind: 'activity',
      activity: {
        id: 'catalyst-slider-confidence-before',
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
        id: 'catalyst-slider-guess-drugs',
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
      note: 'The pivot. "The thing adults keep warning you about is rare. The thing they mostly ignore is in this room." Ask for a show of hands on how many know someone who vapes — do not ask who vapes. Never single anyone out; that is the stigmatization RA 9165 §43 warns against.',
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
      note: 'Transition: "So if the scary list is not the real list, what IS the list?" Keep the pace up — Act 1 is short.',
    },
    {
      kind: 'bullets',
      title: 'Psychoactive',
      bullets: ['Changes how your brain works.', 'That is the whole definition.'],
      note: 'One idea only. Do not add examples on the slide — say them: coffee, vape, beer, cough syrup, shabu. The point is that the word has nothing to do with legality. Legal is not the same as safe, and illegal is not the same as dangerous — that distinction is the whole of Act 1.',
    },
    {
      kind: 'activity',
      activity: {
        id: 'catalyst-dragdrop-classes',
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
      note: 'The Act 1 payoff. Pause five seconds. Then unpack the three: how hard (dose and potency), how fast (route — smoking reaches the brain in 7 to 10 seconds, swallowing takes 20 to 30 minutes, and the faster the hit the more addictive it is), how long (how often, over how many months). This is why "it is just vape" is not a defence: vape is the fast route.',
    },

    // ------------------------------------------- Act 2 · why it hooks you
    {
      kind: 'title',
      kicker: 'Act 2',
      title: 'Why it hooks you',
      note: 'Transition: "Nobody plans this. So how does anybody end up there?" Act 2 is the science, and it is the part that dismantles the blame.',
    },
    {
      kind: 'bullets',
      title: 'Dopamine',
      bullets: ['The brain’s "do that again" signal.', 'Drugs flood it. Nature loses.'],
      note: 'Dopamine is not the pleasure — it is the sticky note that says do that again. It exists to make you repeat things that keep you alive: eating, friendship, winning. Substances release far more of it than any of those, so the brain learns the wrong lesson very fast. Keep this to sixty seconds; the next activity teaches it better than you can.',
    },
    {
      kind: 'activity',
      activity: {
        id: 'catalyst-tolerance',
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
      note: 'The brakes are the prefrontal cortex — judgment, planning, stopping yourself. The accelerator (the reward system) is fully online in your teens; the brakes are not finished until the mid-twenties. Say the honest version: "This is not an insult. It is the reason prevention works at your age and lectures do not." Advisers: this is why a disciplinary-first reflex misreads the biology.',
    },
    {
      kind: 'statement',
      text: 'Addiction is a health condition. Not a character flaw.',
      note: 'Slow down. This is the RA 9165 §43 requirement made human: students must be taught the difference between a person with a medical condition and a criminal, precisely so nobody in this room learns to despise a classmate. Say it plainly: nobody ever plans this, and the person it happens to needs a referral, not a rumour.',
    },

    // -------------------------------------- Act 3 · what is actually out there
    {
      kind: 'title',
      kicker: 'Act 3',
      title: 'What’s actually out there',
      note: 'Transition: "You have heard the myths for years. Ten questions. No score goes on any record." Keep it fast and loud — this is the energy peak before the mandate.',
    },
    {
      kind: 'activity',
      activity: {
        id: 'catalyst-quiz-myth-fact',
        kind: 'quiz',
        title: 'Myth or Fact',
        questions: [
          {
            prompt: 'Vape is just water vapor.',
            options: ['Myth', 'Fact'],
            correct: 0,
            seconds: 15,
          },
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
          {
            prompt: 'Alcohol is a stimulant.',
            options: ['Myth', 'Fact'],
            correct: 0,
            seconds: 15,
          },
          {
            prompt: 'Codeine cough syrup is an opioid.',
            options: ['Myth', 'Fact'],
            correct: 1,
            seconds: 15,
          },
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
          {
            prompt: 'Addiction can be managed, but not cured.',
            options: ['Myth', 'Fact'],
            correct: 1,
            seconds: 15,
          },
        ],
      },
      note: 'Ten items, fifteen seconds each — about four minutes. Do not lecture between questions; debrief only the three that split the room. The usual splits: "vape is just water vapor" (it is an aerosol carrying nicotine and metals, not steam), "alcohol is a stimulant" (it is a depressant — it lowers inhibition on the way down, which is why it feels like the opposite), and "relapse means treatment failed" (relapse is part of every chronic condition, and the correct response is more support, not punishment). If time is short, cut items 6 and 8.',
    },

    // ------------------------------------------ Act 4 · lead with purpose
    {
      kind: 'title',
      kicker: 'Act 4',
      title: 'Lead with Purpose',
      note: 'The turn. Say it before the next slide: "Here is the part nobody told you. You are not being recruited today. You already have this job, and you have had it your whole life."',
    },
    // The mandate beat, split three ways. BulletsSlide renders its list at a
    // fixed clamp (28px at 1920) no matter how few bullets it holds, so six
    // duties on one bullets slide was the least legible thing in the deck.
    // The number and the one duty that matters therefore move onto `stat` and
    // `statement`, which render at 240px and 112px; the remaining five stay a
    // light supporting list.
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
      note: 'Most of this room was born around this year. Say it: "This has been your Student Council\'s duty since before you could read. Nobody handed you the paper. I am handing it to you now." Then go straight to the commitment card — do not let the energy leak.',
    },
    {
      kind: 'activity',
      activity: {
        id: 'catalyst-plan-barkada',
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

    // ------------------------------------------------------------- close
    {
      kind: 'activity',
      activity: {
        id: 'catalyst-slider-confidence-after',
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
      text: 'Your plan is on that wall. Go.',
      attribution: 'Jessica C. Oliver',
      badge: 'Lead with Purpose',
      note: 'Leave the plan wall up on the second screen if you have one. The headline writes itself letter by letter — say nothing for the first four seconds. Then read the line slowly and stop talking. Do not add a summary; the summary is on the wall in their own handwriting.',
    },
  ],
  notes: {
    timing: {
      hide: [
        'If you lose more than five minutes to the join: cut the "25" brakes stat and say the number while the tolerance reveal is still on screen.',
        'The Myth or Fact quiz can drop to six items — keep vape, alcohol, "most teens use illegal drugs", and relapse.',
      ],
      summarize: [
        'Act 1 substance classes: do not teach all four in detail. Sort, then give one sentence — up, down, down, distort.',
        'The dopamine slide: sixty seconds maximum. Beat the Brain teaches tolerance better than any explanation, so spend the time there instead.',
      ],
      emphasize: [
        'Act 0 in full. The concession ("adults have been overstating this") is what buys the rest of the hour — never trim it to save time.',
        'The mandate beat — the "6", the five, "duty four", and the 2007 stat. This is the entire ask: they already hold the mandate, so the close is a reminder, not a recruitment. If you trim anything here, trim the list of five, never "duty four".',
        'Build Your Barkada. If only one thing survives the hour, it is a written 90-day commitment with an adviser\'s signature attached.',
      ],
    },
    fiveEs: {
      engage:
        'Open by conceding the point the room is already thinking: they have sat through the anti-drug lecture before, and they suspect it was exaggerated. Then run the guess slider — "out of 100 teens your age, how many use illegal drugs?" — and read their average aloud without correcting it. The three stats that follow (almost none use illegal drugs; 1 in 7 aged 13–15 vape; 37,513 to 423,185 in two years) do the correcting for you. The engagement is not a game; it is the moment an adult tells them the truth about their own world for the first time.',
      explore:
        'Sort the Substance runs before any teaching. Let them place coffee, vape, shabu, alcohol, sleeping pills, codeine syrup, tramadol and marijuana into the four classes cold — the wrong placements are the lesson, especially coffee landing beside shabu and alcohol being read as a stimulant. Beat the Brain is the second discovery: they tap for a reward that quietly shrinks while the urge climbs, and the card names what they just felt. Neither activity is explained beforehand. They commit first, then find out.',
      explain:
        'Three ideas, in order. One: psychoactive means it changes how your brain works — legality has nothing to do with it, which is why coffee and shabu share a column and the real difference is how hard, how fast, how long. Two: dopamine is the "do that again" signal, substances flood it far past anything nature offers, and the brain compensates by turning the reward down and the wanting up — that is tolerance, and they just felt it on their own phones. Three: the brakes, the prefrontal cortex, are not finished until about 25, which is exactly why prevention works at this age. Close the explanation on the reframe: addiction is a health condition, not a character flaw.',
      apply:
        'Split by role, because the room is paired. The SSLG President names one activity they will run in their own school inside 90 days — an echo-seminar for the student body is the obvious first move, and it is literally one of their six duties. The SSLG Adviser names what they will sign, fund, or unblock so that activity actually happens. Both answers land on the same card on the projector wall, matched by school name. Nobody leaves with a slogan; they leave with a commitment that has two names on it.',
      evaluate:
        'The ten-item Myth or Fact quiz is the knowledge check — the three items that split the room tell you exactly what to revisit before they echo this in their schools. The confidence slider pair is the affective check: the baseline was taken at the top of Act 0, the closing reading comes after they have written their plan, and the stage shows the shift. If the shift is small, the plan wall is the fallback evidence — a written, dated, two-signature commitment is a better outcome than a high number.',
    },
    examples: {
      student_leader:
        'Run the echo-seminar you already owe under §8.6, but run it on vaping, not on shabu — that is where your classmates actually are. Open it the way this session opened: ask them to guess how many teens use illegal drugs, then show them the real figure. Being the person who tells the truth is what makes the rest of your term credible.',
      adviser:
        'Put the president\'s activity into the School Improvement Plan and the calendar before the week ends, and name the budget line. Under DepEd Memorandum 200, s. 2016 the school head carries full responsibility for the NDEP, and DepEd Order 30, s. 2018 makes preventive drug education outcomes an OPCRF performance objective — so this is your documented deliverable, not extra work you are doing as a favour.',
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
          'Section 8.6 assigns Student Councils six Barkada Kontra Droga duties: encourage participation, integrate BKD into existing SSLG programs, initiate BKD activities, conduct echo-seminars, provide life-skills training, and support the BKD Center. This is the spine of Act 4 — the mandate is nineteen years old and already theirs.',
      },
      {
        order: 'Republic Act No. 9165, §43',
        connection:
          'The Comprehensive Dangerous Drugs Act requires instruction that distinguishes a patient under medical care from a person who is drug dependent, expressly "to avoid confusion and accidental stigmatization in the consciousness of the students." That statutory requirement is why this session never uses scare imagery, never asks who uses, and states plainly that addiction is a health condition, not a character flaw.',
      },
    ],
    processingQuestions: [
      'You came in expecting the usual warning about illegal drugs. What did the actual numbers change about who you think needs looking after in your school?',
      'Your Student Council has held these six duties since 2007. Which one has your school genuinely never done — and what is stopping it, a rule or just nobody asking?',
    ],
  },
};
