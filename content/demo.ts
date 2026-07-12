import type { Module } from '@/lib/types';

/** Demo module exercising every slide kind — used for rehearsal and QA. */
export const demoModule: Module = {
  id: 'demo',
  course: 'upc1',
  number: 0,
  title: 'Demo: Ang Agham ng Pag-iwas',
  tagline: 'Isang paglalakbay sa prevention science — bago tayo tumalon sa mga totoong module.',
  minutes: 25,
  slides: [
    {
      kind: 'title',
      kicker: 'UPC 1 · Demo Module',
      title: 'Demo: Ang Agham ng Pag-iwas',
      subtitle: 'Isang paglalakbay sa prevention science — bago tayo tumalon sa mga totoong module.',
      note: 'Welcome the group warmly. Establish that this is a rehearsal deck — every slide kind appears once.',
    },
    {
      kind: 'qr',
      title: 'Sumali sa session',
      note: 'Give participants 90 seconds to scan and join. Walk the aisles; help anyone stuck on WiFi.',
    },
    {
      kind: 'statement',
      text: 'Ang pag-iwas ay hindi tungkol sa takot. Ito ay tungkol sa pagpapalago ng nagpoprotekta.',
      attribution: 'Universal Prevention Curriculum, UNODC',
      note: 'Pause 5 seconds after this lands. Let the room read it twice.',
    },
    {
      kind: 'stat',
      value: '275M',
      label: 'people worldwide used illicit substances in the past year.',
      context:
        'Karamihan ay nagsimula bago mag-18. Kaya ang eskwela ang pinakamahalagang larangan ng prevention.',
      source: 'UNODC World Drug Report 2020',
      note: 'Convert: that is more than double the population of the Philippines. Let the number count up before speaking.',
    },
    {
      kind: 'bullets',
      title: 'Ano ang prevention science?',
      bullets: [
        'Agham na nag-aaral kung paano pigilan ang problema bago pa ito magsimula.',
        'Nakabatay sa ebidensya — hindi sa takot, hindi sa haka-haka.',
        'Pinapalakas ang protective factors; pinapahina ang risk factors.',
        'Gumagana ito sa pamilya, eskwela, at komunidad — sabay-sabay.',
      ],
      note: 'Land each bullet, then ask: alin dito ang bago sa inyong pandinig?',
    },
    {
      kind: 'analogy',
      title: 'Ang Bakod at ang Ambulansya',
      front:
        'Isang barangay ang may bangin. Naglagay sila ng bakod sa taas — o ambulansya sa ibaba. Alin ang pipiliin ninyo?',
      back:
        'Ang prevention science ay ang paggawa ng bakod bago pa mahulog ang tao. Ang treatment ang ambulansya. Kailangan pareho — pero mas mura ang bakod, at mas marami itong naililigtas.',
      note: 'Click the card to flip it. Ask a volunteer to explain the analogy in their own words before flipping.',
    },
    {
      kind: 'image',
      image: 'linear-gradient(140deg, oklch(0.37 0.062 158), oklch(0.185 0.032 165) 60%, oklch(0.59 0.115 68 / 0.35))',
      caption: 'Ang eskwela bilang bakod: araw-araw na proteksyon, hindi minsanang lektyur.',
      note: 'Placeholder visual — replace with a photo of a school community activity for the live run.',
    },
    {
      kind: 'activity',
      activity: {
        id: 'demo-poll',
        kind: 'poll',
        prompt: 'Saan pinaka-epektibong gumastos ang barangay?',
        options: [
          'Bakod sa taas ng bangin (prevention)',
          'Ambulansya sa ibaba (treatment)',
          'Pareho, pero mas malaki sa bakod',
          'Pareho, pero mas malaki sa ambulansya',
        ],
        correct: 2,
      },
      note: 'Expect a split room. Use the split to open the cost-effectiveness discussion.',
    },
    {
      kind: 'activity',
      activity: {
        id: 'demo-wordcloud',
        kind: 'wordcloud',
        prompt: 'Sa isang salita: ano ang nagpoprotekta sa isang bata laban sa droga?',
        maxWords: 3,
      },
      note: 'Read the biggest words aloud. Connect them to protective factors: pamilya, kaibigan, guro.',
    },
    {
      kind: 'activity',
      activity: {
        id: 'demo-slider-before',
        kind: 'slider',
        phase: 'before',
        pairId: 'demo-confidence',
        prompt: 'Gaano ka kakumpiyansa na maipapaliwanag mo ang prevention science sa isang kapwa guro?',
        min: 1,
        max: 10,
        minLabel: 'Hindi pa handa',
        maxLabel: 'Handang-handa',
      },
      note: 'Baseline reading — we repeat this exact slider at the end of the day to show growth.',
    },
    {
      kind: 'activity',
      activity: {
        id: 'demo-dragdrop',
        kind: 'dragdrop',
        prompt: 'Pagbukurin: risk factor o protective factor?',
        buckets: ['Risk Factor', 'Protective Factor'],
        items: [
          { label: 'Maagang pagkakalantad sa alak sa bahay', bucket: 0 },
          { label: 'Malapit na relasyon sa isang guro', bucket: 1 },
          { label: 'Barkadang gumagamit ng substances', bucket: 0 },
          { label: 'Malinaw na patakaran ng paaralan', bucket: 1 },
          { label: 'Kawalan ng after-school activities', bucket: 0 },
          { label: 'Regular na family meals', bucket: 1 },
        ],
      },
      note: 'Emphasize: walang isang factor na nagpapasya — ang akumulasyon ang mahalaga.',
    },
    {
      kind: 'activity',
      activity: {
        id: 'demo-quiz',
        kind: 'quiz',
        title: 'Quick check: Prevention basics',
        questions: [
          {
            prompt: 'Ano ang pangunahing layunin ng prevention science?',
            options: [
              'Parusahan ang gumagamit',
              'Pigilan ang problema bago magsimula',
              'Gamutin ang adiksyon',
              'Takutin ang kabataan',
            ],
            correct: 1,
            seconds: 20,
          },
          {
            prompt: 'Alin ang halimbawa ng protective factor?',
            options: [
              'Maagang pagkakalantad sa substances',
              'Kawalan ng gabay sa bahay',
              'Malakas na ugnayan sa paaralan',
              'Presyon ng barkada',
            ],
            correct: 2,
            seconds: 20,
          },
        ],
      },
      note: 'Keep it light — this is formative, not graded. Celebrate the fastest correct answers.',
    },
    {
      kind: 'activity',
      activity: {
        id: 'demo-qna',
        kind: 'qna',
        prompt: 'Anong tanong ninyo tungkol sa prevention science? I-type sa inyong phone.',
      },
      note: 'Triage questions: answer 2-3 now, park the rest for the end-of-day open forum.',
    },
    {
      kind: 'activity',
      activity: {
        id: 'demo-slider-after',
        kind: 'slider',
        phase: 'after',
        pairId: 'demo-confidence',
        prompt: 'Ngayong tapos na ang demo: gaano ka na kakumpiyansa na maipapaliwanag mo ang prevention science?',
        min: 1,
        max: 10,
        minLabel: 'Hindi pa handa',
        maxLabel: 'Handang-handa',
      },
      note: 'The payoff moment — the stage shows the before → after confidence shift as the answers arrive.',
    },
    {
      kind: 'recap',
      title: 'Ang demo, sa isang hininga',
      points: [
        'Prevention science: bakod bago ang ambulansya.',
        '275M ang gumamit ng illicit substances noong 2020 — karamihan nagsimulang bata.',
        'Risk factors ang nagpapabigat; protective factors ang nagpapagaan.',
        'Ang eskwela ang pinaka-maaasahang bakod na hawak natin.',
      ],
      note: 'Read the points with the room, then bridge to Module 1.',
    },
  ],
  notes: {
    timing: {
      hide: [
        'Kung kulang sa oras: laktawan ang image slide at ang wordcloud.',
        'Ang quiz ay maaaring gawing isang tanong lang.',
      ],
      summarize: [
        'Bullets slide: basahin lang ang unang dalawang bullet, ikuwento ang natitira.',
        'Q&A: kolektahin ang mga tanong pero sagutin sa hapon.',
      ],
      emphasize: [
        'Ang analogy ng bakod at ambulansya — ito ang anchor ng buong araw.',
        'Ang slider baseline — kailangan ito para sa after reading mamaya.',
      ],
    },
    fiveEs: {
      engage:
        'Simulan sa kuwento ng barangay na may bangin. Itanong: saan kayo maglalagay ng pera? Hayaang magtalo ang magkatabi ng 2 minuto bago ipakita ang poll.',
      explore:
        'Sa dragdrop, hayaan silang magbukod ng risk at protective factors nang walang paunang paliwanag. Ang mali nilang sagot ang magiging pinto ng talakayan.',
      explain:
        'Gamitin ang bullets slide para pormal na bigyang-pangalan ang prevention science: evidence-based, developmental, at multi-setting. Iugnay sa 275M na datos ng UNODC.',
      apply:
        'Itanong per role: bilang head teacher / nurse / counselor / admin, ano ang isang "bakod" na kaya ninyong itayo sa inyong paaralan ngayong buwan? Ipasulat sa Q&A.',
      evaluate:
        'Ang dalawang quiz questions ang formative check. Ang slider (before) ang baseline; ihahambing sa "after" reading sa pagtatapos ng araw.',
    },
    examples: {
      head_teacher:
        'Sa inyong learning action cell, italaga ang isang buwanang 15-minutong prevention huddle kung saan pinag-uusapan ang mga batang nagpapakita ng risk factors.',
      nurse_dentist:
        'Sa annual health assessment, idagdag ang dalawang tanong tungkol sa sleep at family meals — mga protective factor na nasusukat.',
      counselor:
        'Gumawa ng "fence list" — mga estudyanteng may tatlo o higit pang risk factors — at unahin sila sa small-group sessions bago pa lumitaw ang problema.',
      admin:
        'Siguraduhing may nakalaang budget line ang after-school programs sa Annual Implementation Plan — ang kawalan nito ay isang risk factor mismo.',
    },
    policyAlignment: [
      {
        order: 'DepEd Order No. 37, s. 2017',
        connection:
          'Ang National Drug Education Program ay nag-uutos ng preventive drug education sa lahat ng antas — ang prevention science framework na ito ang siyentipikong pundasyon ng pagpapatupad nito.',
      },
      {
        order: 'DepEd Order No. 40, s. 2012',
        connection:
          'Ang Child Protection Policy ay nakabatay sa parehong lohika ng protective factors: ang ligtas at mapagkalingang paaralan ang pinakamalapad na bakod laban sa lahat ng uri ng panganib.',
      },
    ],
    processingQuestions: [
      'Anong bahagi ng analohiya ng bakod at ambulansya ang pinaka-tumama sa inyong karanasan sa paaralan?',
      'Kung isa lang ang protective factor na mapapalakas ninyo sa inyong paaralan ngayong taon, alin ito at bakit?',
    ],
  },
};
