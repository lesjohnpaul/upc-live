# Why I built UPC Live

## The short version

My wife, Jessica, was tapped to run a two-day **Universal Prevention Curriculum
(UPC)** echo training for a DepEd division — teaching head teachers, school
nurses, guidance counselors, and admin officers the science of keeping kids away
from drugs before the problem ever starts.

She had the content. What she didn't have was a way to make a room of ~40 tired
educators *participate* for two full days instead of watching slides go by. So I
built one: a live, phone-based audience-response platform that runs the whole
seminar — the projector, the participants' phones, and the facilitator's control
panel — as one connected experience.

This document is the "why" behind the decisions.

## The problem with the default

The default tool for a seminar like this is PowerPoint plus a paper feedback
form at the end. That fails in three specific ways:

1. **No feedback loop during the session.** The presenter can't see whether a
   concept landed until it's too late to reteach it. A poll on paper takes ten
   minutes to collect and never gets tallied live.
2. **No evidence of learning.** Echo training exists to be echoed — participants
   are supposed to bring this back to their own schools. But nobody could show
   that confidence or understanding actually moved during the day.
3. **Passive rooms disengage.** Adults sitting through eight hours of lecture
   check out. Prevention science is, ironically, about *engagement as a
   protective factor* — the medium was contradicting the message.

## The idea

Make the seminar interactive without adding friction. Everyone already has a
phone. So:

- The **stage** is the projector — animated slides the presenter drives with
  arrow keys, plus live activity results that fill in as answers arrive.
- **Participants join by scanning a QR code** — no app, no account, just a role
  (teacher / nurse / counselor / admin) and an optional nickname.
- The **facilitator dashboard** lets Jessica open one activity at a time, watch
  responses land in real time, triage questions, and export everything to CSV
  afterward.

The whole thing is one shared, live-synced session. Open an activity on the
dashboard and it appears on every phone and animates onto the projector at the
same instant.

## Decisions I'm glad I made

**Design for weak venue wifi first, not last.** Government training venues have
unreliable internet. Every realtime subscription has reconnect armor with
exponential backoff; every phone answer is an optimistic, serialized upsert that
survives a dropped connection and retries; the presenter deck works fully even
with zero network — the live results just quietly wait. This "weak-wifi armor"
is the least glamorous and most important part of the codebase.

**Show the learning, don't just claim it.** The signature activity is a
*before/after confidence slider*: at the start of a topic, "how ready are you to
explain this to a colleague?" — then the exact same question at the end. The
stage animates the shift. That delta is the evidence echo training is supposed
to produce, made visible in the room.

**Respect what's private.** Not everything belongs on a projector. The closing
reflection composes a **personalized letter** for each participant based on their
answers — that stays on their phone and is theirs alone; the stage only shows a
count of letters written. Speaker feedback comments go to the dashboard and the
CSV, never the screen. The system is opinionated about what's shared and what
isn't.

**Localize the analogies, not the whole thing.** The training is delivered in
English, but the anchoring analogies are Filipino — *"Ang Bakod at ang
Ambulansya"* (the fence and the ambulance) for prevention vs. treatment. The one
Taglish accent kept in the UI is the join button: *"Sali na!"* ("Join now!").

## What it's built on

- **Next.js (App Router)** — server-rendered pages, client components for the
  live surfaces.
- **Supabase** — Postgres plus realtime subscriptions carry the whole live
  layer (`sessions`, `participants`, `responses`).
- **Tailwind + Framer Motion** — a warm forest-and-gold theme and motion that's
  purposeful, not decorative.
- **Vercel** — deployment.

The three tables are all it takes: a session, the people in it, and one response
row per person per activity (unique, so a phone can change its answer and it
upserts rather than duplicates).

## The public demo

The real seminar's responses are private, so the [public demo](../app/demo)
runs on an **in-memory mock** seeded with fake participants and answers. On any
`/demo` route the app swaps its Supabase client for a local stand-in — there is
no network call, so the real training data is not just hidden but physically
unreachable from the demo. You can open the stage, join as a participant, and
drive the facilitator dashboard, all against sample data. Open Join and Stage in
two tabs and you'll see an answer on one move the results on the other, live.

## The honest reason

The deadline was midnight before her first session. I built it because she
needed it to work, in a real room, in front of real people, the next morning —
and because a lecture about protecting kids deserved a better medium than a
slide that nobody remembers. It worked. That's the whole reason.
