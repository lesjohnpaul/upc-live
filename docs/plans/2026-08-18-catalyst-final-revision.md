# The Catalyst — Final Revision Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rebuild `content/catalyst/module-1.ts` from 8 acts into the 7-part
structure specified in `CATALYST_FINAL_REVISION.MD`, migrating and rewording
slides from UPC 2 Modules 2 and 5 for an audience of SSLG Presidents and their
Advisers, landing on a 60-minute runtime.

**Architecture:** All work lands in the single module file
`content/catalyst/module-1.ts` on the `the-catalyst` worktree. The UPC 2 source
modules are **read-only** — they are shipped Day 2 decks for adult staff; slides
are copied out and reworded, never edited in place. No new slide `kind` and no
new activity `kind` is introduced: every beat in the revision maps onto a
primitive the stage already renders. One new vitest file guards the restructure.

**Tech Stack:** Next.js 16 / React 19, TypeScript, Tailwind v4, framer-motion,
Supabase realtime, vitest. Deck content is a typed `Module` object; the stage
renders it via `components/stage/slides/SlideView.tsx`.

---

## Working location

```
/Users/lesjohnpauloliver/Code/UPC Presentation/upc-live/.worktrees/the-catalyst
```

Branch `the-catalyst` is already checked out there. `main` does not have this
deck. Do not `git checkout the-catalyst` from the main worktree — it will fail.

---

## Decisions already made (do not relitigate)

| # | Decision | Source |
|---|---|---|
| D1 | Runtime slot is **60 minutes**. The deck is built to 60, not built long-and-cut. | Jessica, 2026-08-18 |
| D2 | The three acts the revision does not name are **folded in**, not dropped: Act 2 brain science → Part 3; Act 5 vape → Part 5; Act 4 refusal + struggling-friend → Part 7. | Jessica, 2026-08-18 |
| D3 | UPC 2 modules 2 and 5 are **source material only**. `content/upc2/*.ts` is never modified. | Deployed Day 2 decks |
| D4 | English-first copy. Tagalog only for analogies and Taglish accents (`Ang Payong`, `Hindi cool ang bisyo…`). | `upc-live-language-english-first` |
| D5 | Stage type sizes stay on the `rally`/`calm` tokens. Never raise `[data-mode='upc']` tokens or a shared component default. | `catalyst-readability-tokens` |
| D6 | No new slide kinds. Part 6's "flip cards" reuse the existing `analogy` slide. | YAGNI — `AnalogySlide` already flips |

## Decisions that need Jessica's sign-off before Task 6 (flag, do not guess)

These three come out of the 60-minute budget. Each is a beat that currently
exists and that the revision does not mention. Raise all three in one message
and get an answer before writing Part 3 onward.

| # | Question | Recommendation |
|---|---|---|
| Q1 | The **pledge** (`catalyst-m1-pledge`, 9 lines + One Voice, ~4 min) is not named anywhere in the revision, and Part 7 already closes with the plan card *and* "I want to be the Leader who ___". Keep it? | **Drop it.** Build Your Barkada serves Part 7's stated goal (role → action, paired student/adviser prompts) and the leader word cloud is the revision's named closer. Three closing rituals do not fit 60 minutes. |
| Q2 | The **confidence slider pair** (`catalyst-confidence` before/after, ~2.5 min). The revision strips every "how ready are you" slider out of the migrated UPC 2 slides. Does that verdict extend to the Catalyst's own pair? | **Drop both.** Same framing the revision rejected. The plan wall and the leader word cloud become the evaluate evidence — a written, dated, two-name commitment beats a slider number. |
| Q3 | The deck would carry **five** flip cards: sari-sari store (Part 2), weather (Part 3), payong (Part 4), and three DepEd programs (Part 6). The revision says keep M5's analogy "as is". | **Keep sari-sari + payong + the three Part 6 cards; demote the weather analogy to one `bullets` slide in Part 3.** "As is" most defensibly means "do not rewrite the analogy text", and five flips of the same mechanic goes stale. |

If Jessica keeps any of these, the runtime budget below must lose an equivalent
number of minutes elsewhere — say which, in writing, before building.

---

## Copy rules for every slide written in this plan

Lifted from the module's existing header comment; the restructure does not
relax them.

1. **~12 words per stage slide.** One idea. No sub-bullets.
2. **No bullet longer than 14 words. No `bullets` slide with more than 5 bullets.** This is the guard against pasting UPC 2's paragraph prose onto a projector. Enforced by the test in Task 1.
3. Detail lives in `note`, where Jessica says it aloud. Notes can be long.
4. Audience is **15–18 year-old student leaders sitting beside their adviser**. UPC 2 copy addresses "a fellow teacher" and "your students" — every migrated line must be re-pointed. A line that still says "your students" is a bug.
5. Never scare-tactic, never single anyone out, never say "addict". RA 9165 §43 requires the patient-vs-dependent distinction; DO 30 s. 2018 mandates interactive methods and positive messaging.
6. `mode: 'calm'` is mandatory on any slide touching addiction-as-illness, self-harm, or personal disclosure. Everything else runs `rally`.

---

## Runtime budget — 60 minutes, ~47 slides

Build to this table. If a part runs over its slide count, cut inside that part;
do not borrow minutes from another.

| Part | Title | Slides | Min | Activities |
|---|---|---|---|---|
| — | Open: welcome, QR | 2 | 3 | — |
| 1 | The Catalyst | 4 | 5 | — |
| 2 | What is actually in your world | 8 | 12 | Sort the Substance, **Beat the Brain** |
| 3 | Know the substances | 6 | 8 | reworded threat poll |
| 4 | Understand what influences us | 6 | 8 | **wordcloud pulled up before the part** |
| 5 | Philippine Reality | 8 | 11 | guess slider, Myth or Fact (5 items) |
| 6 | DepEd programs | 6 | 8 | — |
| 7 | From Programs to Action | 5 | 9 | Build Your Barkada |
| — | Close | 2 | 4 | "I want to be the Leader who ___" |
| | **Total** | **47** | **~58** | 7 activities |

Two minutes of slack is deliberate — a live room always spends it.

---

## Source → target map

Read this before touching content. Left column is where the material lives
today; right column is where it goes.

### Deleted outright (revision, lines 6–10)

Named for deletion. These are UPC 2 activity ids — they are **not** copied into
the Catalyst deck. The UPC 2 modules keep them; they simply do not migrate.

| id | What it is | Why it goes |
|---|---|---|
| `upc2-m2-slider-before` | "how ready…to explain psychoactive substance to a fellow teacher" | named |
| `upc2-m2-slider-after` | its `after` twin | **not named, but must go** — an `after` with no `before` renders a broken confidence-shift view. Removing the pair is the only coherent reading. |
| `upc2-m2-cloud-1` | "Name one legal psychoactive substance sold in your community" | named |
| `upc2-m5-slider-before` | "how ready are you to teach a student about these substances" | named |
| `upc2-m5-slider-after` | its `after` twin | named |
| `upc2-m5-drag-1` | "Sort each substance into its class (reinforcing Module 2)" | named — and the Catalyst already has `catalyst-m1-dragdrop-classes` doing this job in Part 2 |
| `upc2-m5-cloud-1` | "One word: what will you watch for now?" | named |

### Reworded, not deleted

| id | Change |
|---|---|
| `upc2-m5-poll-1` | "Which substance do you believe is the biggest threat to **your students**?" → re-point at the student audience. New id `catalyst-m1-poll-threat`. Options stay the five substances; add nothing. |

### Migrated from UPC 2 · Module 2 → Part 2

| UPC 2 M2 slide | Becomes |
|---|---|
| statement "the most familiar…sari-sari store shelf" | Part 2 statement, reworded away from prevention-specialist framing |
| poll `upc2-m2-poll-1` "Which of these is a psychoactive substance?" | keep as a fast opener, new id `catalyst-m1-poll-psychoactive` |
| bullets "What is a psychoactive substance?" (4 long bullets) | compressed to the Catalyst's existing 2-bullet `Psychoactive` slide — that slide already exists and already obeys the copy rule |
| analogy "Ang Estante ng Sari-Sari Store" | keep, flip card, text as written (already student-legible) |
| bullets "The four main classes" | folded into the `Sort the Substance` debrief — one sentence, not a slide |
| bullets "How it gets in — and why speed matters" | → the Catalyst's existing "How hard. How fast. How long." slide |
| bullets "Why people use — and how use can progress" | → the Catalyst's existing "Nobody jumps straight to the end" slide |
| dragdrop `upc2-m2-drag-1` | superseded by `catalyst-m1-dragdrop-classes` (already student-worded, has vape in it) |
| recap, quiz `upc2-m2-quiz-1` | **do not migrate** — the Part 5 Myth-or-Fact quiz is the deck's one knowledge check |

### Migrated from UPC 2 · Module 5 → Part 3

| UPC 2 M5 slide | Becomes |
|---|---|
| statement "the substances your students meet first are the legal ones" | reworded to second person: "The first one is almost never the scary one." |
| analogy "Apat na Klase ng Panahon" | see Q3 — recommend demoting to one 4-bullet slide |
| bullets alcohol / nicotine / cannabis / shabu / inhalants (5 slides, 4 long bullets each) | **compressed to 2 slides.** One `bullets` on what speeds you up vs slows you down, one on inhalants (the accessible-and-lethal one, and the only one the room will not have heard about). 20 dense adult bullets cannot go on this projector. |
| bullets "What can school staff actually see?" | re-pointed at students and advisers: what you would notice in a friend. Lands next to the struggling-friend beat referenced from Part 7. |
| recap, quiz `upc2-m5-quiz-1` | **do not migrate** |

### Folded in from the existing Catalyst acts (decision D2)

| Existing act | Goes to |
|---|---|
| Act 2 — `Dopamine`, `25`, `Accelerator done. Brakes still under construction.`, `Addiction is a health condition` (calm) | Part 3, after the substances. It explains what they do. **The `calm` addiction slide is never-cut** — RA 9165 §43. |
| Act 2 — `catalyst-m1-tolerance` (Beat the Brain) | **Part 2**, per revision line 27 |
| Act 3 — everything | Part 4, retitled and reworded (see Task 7) |
| Act 5 — vape act: "What is actually in the cloud", `catalyst-m1-quiz-myth-fact`, "You are the target market", "The law is already on your side" | Part 5 |
| Act 6 — the mandate beat: `6`, "The other five", "Duty four", `2007`, `L·E·A·D` | Part 6 (the `6`/five/duty-four/2007 run) and Part 7 (`L·E·A·D`) |
| Act 4 — "Say no without losing the barkada", "You do not have to win the argument", "When your friend is the one struggling" | Part 7 |
| Act 4 — `catalyst-m1-poll-scenario`, "Before you answer" (STOP/THINK/CHECK/CHOOSE) | **cut.** The 60-minute budget does not hold a fourth activity plus a four-step framework. The refusal and struggling-friend slides carry the life-skills load. |
| Act 6 — `catalyst-m1-wordcloud-friend` ("I want to be the friend who ___") | becomes the closer, reprompted to **"I want to be the Leader who ______"** (revision line 41) |
| Act 7 — `catalyst-m1-pledge` | see Q1 |

---

## Task 1: Content-integrity test

The restructure deletes slider halves and pastes adult prose into a teen deck.
Both failure modes are silent. One test file catches both.

**Files:**
- Create: `content/catalyst/module-1.test.ts`

**Step 1: Write the test**

```ts
import { describe, expect, it } from 'vitest';
import type { Activity } from '@/lib/types';
import { module1 } from './module-1';

const slides = module1.slides;
const activities = slides.flatMap((s) => (s.kind === 'activity' ? [s.activity] : []));
const words = (s: string) => s.trim().split(/\s+/).length;

describe('The Catalyst deck integrity', () => {
  it('gives every activity a unique id', () => {
    const ids = activities.map((a) => a.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('never leaves a slider half without its pair', () => {
    const sliders = activities.filter((a): a is Extract<Activity, { kind: 'slider' }> =>
      a.kind === 'slider',
    );
    for (const s of sliders) {
      const twin = sliders.find(
        (o) => o.pairId === s.pairId && o.phase !== s.phase,
      );
      expect(twin, `slider ${s.id} has no ${s.phase === 'before' ? 'after' : 'before'} twin`)
        .toBeDefined();
    }
  });

  it('keeps every activity id namespaced to this deck', () => {
    // A raw upc2-* id here means a UPC 2 slide was pasted in rather than reworded.
    for (const a of activities) expect(a.id.startsWith('catalyst-m1-')).toBe(true);
  });

  it('keeps bullets readable from the back row', () => {
    for (const s of slides) {
      if (s.kind !== 'bullets') continue;
      expect(s.bullets.length, `"${s.title}" has too many bullets`).toBeLessThanOrEqual(5);
      for (const b of s.bullets)
        expect(words(b), `"${s.title}" — bullet too long: ${b}`).toBeLessThanOrEqual(14);
    }
  });

  it('never addresses the room as teachers of students', () => {
    // UPC 2 copy talks about "your students". This room IS the students.
    const onStage = slides
      .flatMap((s) => [
        'title' in s ? s.title : '',
        'text' in s ? s.text : '',
        s.kind === 'bullets' ? s.bullets.join(' ') : '',
        s.kind === 'recap' ? s.points.join(' ') : '',
      ])
      .join(' ')
      .toLowerCase();
    expect(onStage).not.toContain('your students');
    expect(onStage).not.toContain('fellow teacher');
  });

  it('has exactly one welcome, one qr and one finale', () => {
    for (const kind of ['welcome', 'qr', 'finale'] as const)
      expect(slides.filter((s) => s.kind === kind)).toHaveLength(1);
  });

  it('fits the booked slot', () => {
    expect(module1.minutes).toBe(60);
    expect(slides.length).toBeLessThanOrEqual(50);
  });
});
```

**Step 2: Run it against the deck as it stands today**

Run: `npm test -- content/catalyst/module-1.test.ts`

Expected: **FAIL** on `keeps bullets readable` (Act 1's "How fast — smoked
reaches your brain in 7 seconds. Swallowed takes 30 minutes." is 15 words) and
possibly on slide count. That is correct — the test is describing the deck we
are about to build, not the one we have.

**Step 3: Fix only the pre-existing violations, nothing else**

Shorten the offending bullets in place. `How fast — smoked hits your brain in 7
seconds. Swallowed, 30 minutes.` is 13.

**Step 4: Re-run**

Run: `npm test -- content/catalyst/module-1.test.ts`
Expected: PASS

**Step 5: Commit**

```bash
git add content/catalyst/module-1.test.ts content/catalyst/module-1.ts
git commit -m "test: guard the Catalyst deck against orphan sliders and adult prose"
```

---

## Task 2: Research — Philippine youth substance data, current as of 2026

Part 5 is the credibility act. Every number on it must be sourced and current,
because this room has been lied to with statistics before and Act 0's entire
strategy is refusing to do that.

**Files:**
- Create: `docs/research/2026-ph-youth-substance-data.md`

**Step 1: Confirm the two figures Jessica explicitly keeps**

Revision line 32 names these as must-stay. Verify both are still the latest
release, and capture the exact survey year and publishing body:

- `1 in 7` Filipinos aged 13–15 who currently vape — Global Youth Tobacco Survey
- `423,185` young vape users in 2023, up from `37,513` in 2021 — GYTS 2021 vs 2023

**Step 2: Refresh the surrounding picture**

Search for the most recent available figures on:
- Illegal drug use prevalence among Filipino youth (current baseline is YAFS5 2021, UP Population Institute — check for a YAFS6 or a 2024/2025 DDB household survey)
- Youth smoking prevalence (GYTS / NNS / DOH)
- Youth alcohol use (YAFS / GSHS)
- Anything Pangasinan- or Region I-specific — a local number outperforms a national one with this room

**Step 3: Write the note**

For each figure record: the number, the exact wording to put on the slide, the
survey, the year, the publisher, and a one-line "what this licenses Jessica to
say". Mark anything you could not verify as **UNVERIFIED — do not put on a
slide**. An unverifiable number does not go in the deck; the deck's whole
credibility play is that it is the one talk that did not exaggerate.

**Step 4: Commit**

```bash
git add docs/research/2026-ph-youth-substance-data.md
git commit -m "docs: source the Philippine Reality figures for Part 5"
```

---

## Task 3: Research — the three DepEd programs

Part 6 names three programs. Two are already documented in the deck's
`policyAlignment`; the middle one is not, and its exact name is uncertain from
the revision's dictation ("Eskwela Ban sa Sigarilyo" / "Kuwila ban sa sigarilyo").

**Files:**
- Create: `docs/research/deped-programs-part-6.md`

**Step 1: National Drug Education Program**

Already grounded: DepEd Memorandum No. 200, s. 2016 (school heads carry full
NDEP responsibility, directs establishment of BKD chapters through student
organizations, monthly reporting to BLSS-SHD) and DepEd Order No. 30, s. 2018
(PDEP guidelines — interactive methods, positive messaging, OPCRF objective).
Pull the seven directives from DM 200 into the note verbatim.

**Step 2: The tobacco programme — resolve the name**

Find the actual DepEd issuance behind a smoke-free / tobacco-free schools
campaign and confirm the campaign name Jessica means. Candidates to check:
DepEd Order No. 6, s. 2012 (public health policies on tobacco control), the
100% Smoke-Free Environment policy, and any current DepEd campaign branding.
**Record the verified name and issuance number.** If the campaign name cannot
be verified, put the verified issuance on the card and flag the branding
question for Jessica rather than inventing a programme title.

**Step 3: Barkada Kontra Droga**

Already grounded: DDB Board Regulation No. 5, s. 2007 §8.6 — six Student
Council duties (encourage participation, integrate into SSLG programs, initiate
activities, **conduct echo-seminars**, life-skills training, support the BKD
Center). Confirm §8.6 wording and check whether "Barkada Kontra Bisyo" is an
official variant or a colloquial one.

**Step 4: For each of the three, draft the flip-card pair**

Front: the question a 16-year-old would actually ask ("What even *is* NDEP?").
Back: the plain-language answer in under 40 words, ending in what it means for
*them*. No acronym goes unexpanded on first use.

**Step 5: Commit**

```bash
git add docs/research/deped-programs-part-6.md
git commit -m "docs: ground the three DepEd programs for Part 6"
```

---

## Task 4: Retitle the module and rebuild the opening

**Files:**
- Modify: `content/catalyst/module-1.ts`

**Step 1: Update the module header**

- `title`: `'The Catalyst: Youth Leadership for a Drug-Free School'` (revision line 23)
- `tagline`: rewrite for the new spine — the catalyst idea, the real numbers, the mandate they already hold.
- `minutes`: stays `60`
- Rewrite the file's header comment: it currently documents 8 acts and a 75-minute over-length build. Replace with the 7-part structure and the 60-minute budget table above.

**Step 2: Rebuild the open (2 slides)**

Keep the `welcome` and `qr` slides. Update `welcome.title` to the new title and
keep the seat-in-pairs instruction in the note — Build Your Barkada still
depends on it.

Per Q2, delete `catalyst-m1-slider-confidence-before` here and its `after` twin
in the close. Do not delete until Q2 is answered.

**Step 3: Verify**

Run: `npm test -- content/catalyst/module-1.test.ts && npx tsc --noEmit`
Expected: PASS, no type errors

**Step 4: Commit**

```bash
git add content/catalyst/module-1.ts
git commit -m "feat: retitle The Catalyst and rebuild the opening"
```

---

## Task 5: Part 1 — The Catalyst (4 slides, 5 min)

Revision line 26: *what "catalyst" means, how it makes change, and the
correlation between being the catalyst and leading with purpose — expand this.*

This part is entirely new and it is the whole deck's frame. The finale (Task 12)
pays it off, so write both with the same sentence in mind.

**Files:**
- Modify: `content/catalyst/module-1.ts`

**Step 1: Write the four slides**

| # | kind | Content |
|---|---|---|
| 1 | `title` | kicker `Part 1`, title `The Catalyst`, image `/catalyst/act0-auditorium.jpg` |
| 2 | `bullets` | The chemistry definition, in three bullets under 14 words each: it starts the reaction, it makes it happen faster, **it is not used up**. |
| 3 | `statement` | The turn: the catalyst does not become the product. It makes the reaction possible and walks away unchanged. |
| 4 | `statement` | The correlation, and the symposium's theme landing: *"Lead with Purpose" is not a slogan — it is the description of a catalyst.* |

**Step 2: Load the notes**

Slide 2's note carries the classroom example Jessica says aloud (a catalyst in a
car's converter, or yeast — pick one and keep it concrete). Slide 4's note
carries the pivot into Part 2: *"You are not being asked to fix the drug problem
in Pangasinan. You are being asked to be the thing that starts the reaction in
your own school."*

Do **not** explain the title fully here. The finale re-opens it (Task 12,
revision line 45). Part 1 defines the word; the finale hands it to them.

**Step 3: Verify + commit**

```bash
npm test -- content/catalyst/module-1.test.ts
git add content/catalyst/module-1.ts
git commit -m "feat: Part 1 — what a catalyst is and why it is the frame"
```

---

## Task 6: Part 2 — What is actually in your world (8 slides, 12 min)

UPC 2 Module 2, reworded, plus **Beat the Brain** (revision line 27).

**Files:**
- Modify: `content/catalyst/module-1.ts`
- Read only: `content/upc2/module-2.ts`

**Step 1: Assemble the eight slides in this order**

| # | kind | Source | Notes |
|---|---|---|---|
| 1 | `title` | new | kicker `Part 2`, image `/catalyst/act1-specimens.jpg` |
| 2 | `activity` poll | `upc2-m2-poll-1` reworded | new id `catalyst-m1-poll-psychoactive`. "Which of these changes how your brain works?" Options: Kape, Vape, Alak, All of them. `correct: 3`. Fast — 60 seconds. |
| 3 | `bullets` | existing `Psychoactive` slide | keep as-is: two bullets, already obeys the copy rule |
| 4 | `analogy` | M2's `Ang Estante ng Sari-Sari Store` | text as written, image `/images/upc2-m2/analogy.jpg` — **check the file exists in this worktree's `public/`; if not, it needs generating in Task 13** |
| 5 | `activity` dragdrop | existing `catalyst-m1-dragdrop-classes` | unchanged — already student-worded and already has vape in it |
| 6 | `statement` | existing | "Coffee and shabu are in the same column. The difference is how hard, how fast, how long." |
| 7 | `bullets` | existing `How hard. How fast. How long.` | with Task 1's shortened middle bullet |
| 8 | `activity` tolerance | `catalyst-m1-tolerance` | **moved here from Act 2** per revision line 27 |

**Step 2: Re-point every migrated note**

M2's notes address prevention specialists ("the credibility of a prevention
specialist rests on…"). Rewrite each note for a presenter speaking to student
leaders. The dragdrop's teaching payoff — coffee landing beside shabu — is the
same; the framing is not.

**Step 3: Handle the Beat the Brain move**

Its existing note references Act 2's dopamine slide, which now lives in Part 3.
Rewrite the note so the activity stands alone: they feel tolerance here, and
Part 3 names the mechanism afterwards. This ordering is *better* — they
experience it before it is explained.

**Step 4: Confirm the deletions did not migrate**

Run: `npm test -- content/catalyst/module-1.test.ts`
The `keeps every activity id namespaced` test fails loudly if any `upc2-m2-*`
id was pasted in.

**Step 5: Commit**

```bash
git add content/catalyst/module-1.ts
git commit -m "feat: Part 2 — psychoactive 101 reworded for student leaders, with Beat the Brain"
```

---

## Task 7: Part 3 — Know the substances (6 slides, 8 min)

UPC 2 Module 5, compressed hard, with the Act 2 brain science folded in (D2).
Module 5 is 15 slides and 75 minutes of adult content going into 6 slides and
8 minutes. Compression is the task, not a side effect of it.

**Files:**
- Modify: `content/catalyst/module-1.ts`
- Read only: `content/upc2/module-5.ts`

**Step 1: Assemble**

| # | kind | Source | Notes |
|---|---|---|---|
| 1 | `title` | new | kicker `Part 3` |
| 2 | `activity` poll | `upc2-m5-poll-1` **reworded** (revision line 8) | new id `catalyst-m1-poll-threat`. Re-point: "Which one do you think is the biggest threat in **your school**?" Five options unchanged. No correct answer. |
| 3 | `bullets` | M5's five substance slides, compressed | **Speeds you up / slows you down** — 4 bullets max, one line per behaviour a friend would notice. Per Q3, the weather analogy's four lines land here rather than as a flip card. |
| 4 | `bullets` | M5 inhalants slide, compressed | The one nobody warns them about: cheap, legal, under the sink, and a single session can kill. Four bullets, plainly, once. |
| 5 | `bullets` | existing Act 2 `Dopamine` | image `/catalyst/reward-pathway.jpg`. Now lands *after* they felt tolerance in Part 2 — rewrite the note to say so. |
| 6 | `statement` **`mode: 'calm'`** | existing `Addiction is a health condition. Not a character flaw.` | image `/catalyst/calm-portrait.jpg`. **Never cut.** RA 9165 §43. |

**Step 2: Decide the fate of the `25` and `Accelerator/Brakes` slides**

Both are Act 2 material and both are good, but Part 3 has no room. Fold the
brain-at-25 fact into the note on slide 5 and say it over the dopamine slide.
Record this in `notes.timing.summarize`.

**Step 3: Re-point every migrated note**

M5's notes are written for nurses and head teachers spotting signs in students
("You are positioned to catch the physical and oral signs"). Here the observer
is a 16-year-old noticing something in a friend, which is a different act with
different stakes — Part 7's struggling-friend slide is where it gets resolved.
Point forward to it explicitly.

**Step 4: Verify + commit**

```bash
npm test -- content/catalyst/module-1.test.ts
git add content/catalyst/module-1.ts
git commit -m "feat: Part 3 — substances and the reward pathway, compressed for the room"
```

---

## Task 8: Part 4 — Understand what influences us (6 slides, 8 min)

The revision is most specific here. Line 29: pull the word cloud up so it runs
**before** the part starts. Line 30: retain Act 3, retitle "What tips the scale"
into something a student understands, and reword the entire act into layman's
terms.

**Files:**
- Modify: `content/catalyst/module-1.ts`

**Step 1: The word cloud goes first, before the title slide**

`catalyst-m1-wordcloud-influences` — "One word: what makes someone your age try
it the first time?" — moves out of Act 0 and sits immediately **before** Part 4's
title slide. Its note already says the room writes the lesson before you teach
it; that is now literally true of the part boundary.

**Step 2: Retitle the part (revision line 30)**

"What tips the scale" is out — Jessica said she does not understand it, and if
she does not, neither will the room. Replace with something a 16-year-old reads
once and gets. Candidates, pick one:
- `Why one tries it and one doesn't`
- `Same school. Same barkada. Different choice.`
- `What actually makes the difference`

**Step 3: Reword the whole act into plain language**

Every slide in Act 3 gets a plain-language pass. The two `bullets` slides
already read reasonably — "What raises the odds" / "What lowers them" — but
"odds" is a gambling word; prefer "What makes it more likely" / "What makes it
less likely". The presenter notes are where Jessica's depth lives; they can stay
rich. **The stage copy is what gets simplified, not the notes.**

**Step 4: Assemble**

| # | kind | Content |
|---|---|---|
| 0 | `activity` wordcloud | `catalyst-m1-wordcloud-influences` — sits before the title slide |
| 1 | `title` | kicker `Part 4`, retitled per Step 2, image `/catalyst/act3-shelter.jpg` |
| 2 | `bullets` | What makes it more likely — 4 bullets, conditions never accusations |
| 3 | `bullets` | What makes it less likely — 4 bullets. **Never cut.** Every one is something an SSLG can build with no budget; that is the argument of the whole session. |
| 4 | `analogy` | `Ang Payong` — text as written, image `/catalyst/analogy-payong.jpg` |
| 5 | `statement` | "You cannot stop the rain. You can hand someone a payong." |

**Step 5: Cut `catalyst-m1-dragdrop-scale`**

The risk/protection sorting activity is already first on the existing cut list
and the budget has no room. The two `bullets` slides carry the same eight items.
Record the cut in `notes.timing.hide` as a *reserve* item, not a live slide.

**Step 6: Verify + commit**

```bash
npm test -- content/catalyst/module-1.test.ts
git add content/catalyst/module-1.ts
git commit -m "feat: Part 4 — influences, retitled and reworded in plain language"
```

---

## Task 9: Part 5 — Philippine Reality (8 slides, 11 min)

Revision line 32, plus the folded-in vape act (D2). The goal Jessica states is
awareness: *"para may feed sa kanila na ganito na yung numbers"* — the room
should leave knowing how many people around them are actually doing this.

**Depends on:** Task 2.

**Files:**
- Modify: `content/catalyst/module-1.ts`

**Step 1: Assemble**

| # | kind | Content |
|---|---|---|
| 1 | `title` | kicker `Part 5`, title `Philippine Reality` |
| 2 | `activity` slider | `catalyst-m1-slider-guess-drugs` — "Out of 100 teens your age, how many use illegal drugs?" Unpaired guess slider, kept. **Note: the Task 1 slider-pair test must special-case this id, or it fails.** Add the exemption with a comment naming why. |
| 3 | `stat` | `Almost none` — of Filipino youth use illegal drugs. Source from Task 2. The credibility slide; the full 3-drink/1-smoke/almost-none picture stays in the note, spoken not shown. |
| 4 | `stat` | `1 in 7` — Filipinos aged 13–15 who vape right now. **Explicitly retained by Jessica.** |
| 5 | `stat` | `423,185` young vape users in 2023, context `From 37,513 in 2021.` **Explicitly retained.** Let the counter run before speaking. |
| 6 | `bullets` | What is actually in the cloud — from Act 5, unchanged. Aerosol, not steam; nicotine; one pod ≈ a pack. |
| 7 | `bullets` | You are the target market — from Act 5, image `/catalyst/act5-marketing.jpg`. The slide that turns the room from warned to angry. |
| 8 | `activity` quiz | `catalyst-m1-quiz-myth-fact` **trimmed 8 → 5 items**: vape-is-water-vapor, alcohol-is-a-stimulant, most-teens-use-illegal-drugs, relapse-means-failure, caffeine-and-nicotine-are-both-stimulants. 15s each ≈ 2 min. |

**Step 2: Cut "The law is already on your side"**

RA 11900 / 9211 / 10643 do not get their own slide at this budget. The usable
fact — *selling near a school is already illegal, and that is a violation your
adviser can escalate* — moves into Part 6's Eskwela-ban flip card, where it
belongs anyway. Keep all three laws in `notes.policyAlignment`.

**Step 3: Add any Pangasinan/Region I figure Task 2 surfaced**

If Task 2 found a local number, it goes on slide 3 or 4 as `context`. A local
number lands harder than a national one with this room. If none was verifiable,
add nothing.

**Step 4: Verify + commit**

```bash
npm test -- content/catalyst/module-1.test.ts
git add content/catalyst/module-1.ts
git commit -m "feat: Part 5 — the Philippine numbers and the vape story"
```

---

## Task 10: Part 6 — DepEd programs (6 slides, 8 min)

Revision line 35: discuss all three programs, layman's terms, TED-talk style,
**flip cards**. Reuse the `analogy` slide kind — it is already a click-to-flip
card and needs no new component (D6).

**Depends on:** Task 3.

**Files:**
- Modify: `content/catalyst/module-1.ts`

**Step 1: Assemble**

| # | kind | Content |
|---|---|---|
| 1 | `title` | kicker `Part 6`, title `The programs you already have` |
| 2 | `analogy` | **NDEP** — front: the question a student would ask. Back: ≤40 words, ending in what it means for them. From Task 3 Step 1. |
| 3 | `analogy` | **the tobacco programme** (verified name from Task 3 Step 2) — back carries the leverage line: a store selling to Grade 8 students beside a campus is already a violation. |
| 4 | `analogy` | **Barkada Kontra Droga / Kontra Bisyo** — back sets up the mandate reveal that follows. |
| 5 | `stat` | `6` — duties your Student Council already has. Source `DDB Board Regulation No. 5, s. 2007 §8.6`. Do not list them; the next slide holds one back. |
| 6 | `statement` | `Duty four: conduct an echo-seminar.` Five-second pause before speaking. This is the hinge of the whole deck. |

**Step 2: Cut "The other five"**

The five-item list slide was a legibility problem before and the budget cannot
hold it. Read the five aloud from the note over slide 5's counter, then advance
to duty four. Record in `notes.timing.summarize`.

**Step 3: Cut the `2007` stat slide**

Fold "this has been your duty since before you could read" into slide 6's note.
It is a sentence, not a slide.

**Step 4: TED-talk pacing**

Jessica asked for TED-talk style. Concretely that means: one idea per card,
each card opened with a question to the room and flipped only after somebody
answers, and no acronym left unexpanded. Put that instruction in each card's
note, not on the slide.

**Step 5: Verify + commit**

```bash
npm test -- content/catalyst/module-1.test.ts
git add content/catalyst/module-1.ts
git commit -m "feat: Part 6 — the three DepEd programs as flip cards, and the mandate"
```

---

## Task 11: Part 7 — From Programs to Action (5 slides, 9 min)

Revision line 38 is the most demanding paragraph in the document: the finale of
the teaching, role clarity for both halves of every pair, recommended
student-led activities, an enumerated adviser list, sustainability, and
*"something impressive"*.

**Files:**
- Modify: `content/catalyst/module-1.ts`

**Step 1: Assemble**

| # | kind | Content |
|---|---|---|
| 1 | `title` | kicker `Part 7`, title `From Programs to Action`, image `/catalyst/act4-leaders.jpg` |
| 2 | `bullets` | **If you are the President** — 4 recommended student-led activities, each one nameable and runnable with no budget. See Step 2. |
| 3 | `bullets` | **If you are the Adviser** — 4 things only an adviser can do. See Step 3. |
| 4 | `bullets` | `L · E · A · D` — from Act 6, unchanged. Land on DECIDE, then straight into the activity; do not let the energy leak. |
| 5 | `activity` plan | `catalyst-m1-plan-barkada` — Build Your Barkada, unchanged. Paired prompts, matched by school name, wall on the projector. |

**Step 2: The student recommendations (Jessica asked for these by name)**

Four, each concrete enough to start on Monday, each tied to something already
established in the deck:

1. **Run the echo-seminar you already owe** under §8.6 — but run it on vaping, not shabu, because Part 5 showed where the room actually is.
2. **Build one protective factor** off the payong list this quarter — a club, a team, a standing space to belong to. Costs nothing.
3. **A vape-free campus pledge drive** through the SSLG, using the leverage from Part 6: report the store, do not just warn each other about it.
4. **Peer-to-peer, not assembly-to-audience** — the Part 4 word cloud proved the room already knows the reasons; the format that works is barkada talking to barkada.

**Step 3: The adviser list (Jessica asked for enumeration + sustainability)**

1. Put the president's activity in the **School Improvement Plan and the calendar** this week, with a named budget line.
2. **Be the first protective factor** — the adult who actually listens is a role you can take on Monday without a memo.
3. **Document it for the NDEP monthly report** to BLSS-SHD — the reporting line already exists under DM 200, s. 2016.
4. **Hand it over before you leave the post** — sustainability is a turnover file, not enthusiasm. Name who inherits it.

Bullet 4 is the sustainability answer Jessica asked for. Say it plainly: the
programme that survives is the one written down, not the one that was popular.

**Step 4: The "impressive" requirement**

Do not build a new mechanic for this. The deck already carries three things
nobody else in the division can do: Beat the Brain (they *feel* tolerance on
their own phone), the paired plan wall (two roles, two prompts, one card,
matched live by school), and the finale. Part 7's job is to land the plan wall
hard — read three schools aloud, adviser line included. That is the impressive
moment; it is impressive because it is *theirs*.

Where the inspirational quotes go: one line in slide 4's note, said over
DECIDE. Not on a slide. A quote on a slide at this budget costs a real beat.

**Step 5: Verify + commit**

```bash
npm test -- content/catalyst/module-1.test.ts
git add content/catalyst/module-1.ts
git commit -m "feat: Part 7 — role, recommendations, sustainability, and the plan wall"
```

---

## Task 12: The close (2 slides, 4 min)

Revision lines 41 and 45.

**Files:**
- Modify: `content/catalyst/module-1.ts`

**Step 1: The closing activity**

`catalyst-m1-wordcloud-friend` is reprompted and renamed:

```ts
{
  kind: 'activity',
  activity: {
    id: 'catalyst-m1-wordcloud-leader',
    kind: 'wordcloud',
    prompt: 'I want to be the Leader who ______',
    maxWords: 3,
  },
  note: '…',
}
```

Three words maximum — the constraint is what makes the wall readable and the
answers honest. Ninety seconds. Read five aloud, slowly, and say nothing clever
afterwards. This is the emotional peak; do not step on it with a summary.

**Step 2: The finale — and the explanation of the title**

Revision line 45: animations, delight, inspirational, memorable, **and explain
why it is called "The Catalyst"**. The existing `finale` slide already does the
first four — letter-by-letter headline, embers, shimmer. The fifth is a copy
change:

- `headline`: `You Are the Catalyst`
- `text`: the payoff of Part 1, in one line. The catalyst is not consumed by the reaction. It starts it, and it is still there afterwards, unchanged, ready to start the next one.
- `badge`: `Lead with Purpose`
- `attribution`: `Jessica C. Oliver`

The note carries the spoken close: say nothing for the first four seconds while
the headline writes itself, then land it. Part 1 defined the word; this is where
they get handed it. *"You do not have to be famous to be influential. You do not
have to be an adult to be a leader. Start with your circle. Start with one
decision."* Then read the line on screen and stop talking.

**Step 3: Verify + commit**

```bash
npm test -- content/catalyst/module-1.test.ts
git add content/catalyst/module-1.ts
git commit -m "feat: the close — I want to be the Leader who ___, and why it is called The Catalyst"
```

---

## Task 13: Rebuild the facilitator notes

`notes` still describes the 8-act deck. All five sections are now wrong.

**Files:**
- Modify: `content/catalyst/module-1.ts`

**Step 1: `notes.timing`**

- `hide`: this is no longer a cut-to-60 list — the deck *is* 60. Rewrite it as the **reserve list**: what to pull back in if a part runs short or the room asks (the risk/protection sort, the "other five" duties, the STOP/THINK/CHECK/CHOOSE slide, the three tobacco laws), plus what to drop if running late.
- `summarize`: the beats now living only in notes — brain-at-25, the five BKD duties, the 2007 date, the four substance classes.
- `emphasize`: never-cut list. The `calm` addiction slide (RA 9165 §43), "What makes it less likely" in Part 4, the struggling-friend material, duty four, Build Your Barkada, the finale.

**Step 2: `notes.fiveEs`** — rewrite all five against the new 7-part flow. The
engage story changed most: the deck no longer opens by conceding the numbers,
it opens by defining a catalyst.

**Step 3: `notes.examples`** — `student_leader` and `adviser` now duplicate Part
7's on-stage content. Rewrite them as the *deeper* version Jessica reads from
the presenter overlay, not a repeat of the slide.

**Step 4: `notes.policyAlignment`** — keep all six entries. Add the tobacco
issuance verified in Task 3.

**Step 5: `notes.processingQuestions`** — rewrite the three against the new
structure; the current ones reference acts that no longer exist.

**Step 6: Verify + commit**

```bash
npm test && npx tsc --noEmit
git add content/catalyst/module-1.ts
git commit -m "docs: rebuild facilitator notes for the 7-part structure"
```

---

## Task 14: Imagery for the new parts

**Depends on:** Tasks 4–12 complete. Per `youth-symposium-interaction-and-media`,
media is not generated until the structure is agreed. It now is.

**Files:**
- Create: `public/catalyst/*.jpg`
- Modify: `content/catalyst/module-1.ts` (image paths)

**Step 1: Audit what exists vs what is referenced**

14 plates exist in `public/catalyst/`. The restructure orphans some and needs
new ones. Check specifically:
- Part 1 has no plate — the catalyst idea needs one
- Part 6 has no plate — the three programs / the mandate
- The sari-sari store analogy points at `/images/upc2-m2/analogy.jpg`; confirm that path resolves in this worktree, and if it does not, generate a Catalyst-mode replacement

**Step 2: Generate via HiggsField MCP**

Art direction is `youth-symposium-design-system`: rally-mode plates are
near-black with a blue cast, electric teal and hot coral; the one calm plate
already exists. Never stock-illustration style. Match the existing 14 plates —
open two of them first and match their grade.

**Step 3: Height-check and commit**

```bash
git add public/catalyst content/catalyst/module-1.ts
git commit -m "feat: imagery for Parts 1 and 6"
```

---

## Task 15: Runtime and legibility pass

**Files:** none — this is verification.

**Step 1: Typecheck, lint, test**

```bash
npx tsc --noEmit && npm run lint && npm test
```
Expected: clean

**Step 2: Build**

```bash
npm run build
```
Expected: clean

**Step 3: Walk the deck at 1920×1080**

Run `npm run dev`, open the stage surface, and step every slide at projector
resolution. Per `catalyst-readability-tokens`, **every slide must be
height-checked at 1920×1080** — the failure mode is content overflowing the safe
box, and the fix is paging the content, never shrinking the type. Flag any slide
that overflows; do not fix it by reducing font size.

**Step 4: Time it**

Walk the deck aloud at presenting pace with a timer, part by part, against the
budget table. Record actuals. If a part is over, cut inside that part.

**Step 5: Commit any fixes**

```bash
git add -A
git commit -m "fix: legibility and runtime pass at 1920x1080"
```

---

## Task 16: Ship

**Files:** none

Per `upc-live-deploy-method`: push to the GitHub remote for history, ship with
`npx vercel --prod`, then hand-repoint the `jessica-oliver-upc` alias. Do not
assume the alias follows the deployment.

Confirm with Jessica before shipping — the symposium is 21 August 2026 and the
live URL is the one she will open on stage.

---

## Open questions to raise before Task 6

1. **Q1, Q2, Q3** from the decisions table above — the pledge, the confidence sliders, and the fifth flip card. All three are budget calls that change what gets built.
2. **The tobacco programme's real name** (Task 3, Step 2). If it cannot be verified, Jessica needs to name it rather than the deck inventing a programme title.
3. **Runtime reality check.** Seven parts, seven activities, and two full UPC 2 modules in 60 minutes is genuinely tight even after the compression above. If the walked runtime in Task 15 lands over 65, the honest options are cutting Part 3 to four slides or asking the organisers for 75. Bring the measured number, not an estimate.
