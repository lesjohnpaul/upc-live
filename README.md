# UPC Live

A live, phone-based audience-response platform for a two-day **Universal
Prevention Curriculum** echo training run for a DepEd division. It turns a
static seminar into one connected experience — the projector, every
participant's phone, and the facilitator's control panel, synced live.

**[▶ Try the public demo](https://jessica-oliver-upc.vercel.app/demo)** · **[Why I built it →](docs/WHY.md)**

> The demo runs entirely on seeded mock data. It never touches the real
> seminar's database — see [How the demo stays safe](#how-the-demo-stays-safe).

## What it does

- **Stage** — the projector view the presenter drives with arrow keys: animated
  slides, a flip-card analogy, count-up stats, an embered finale, and live
  activity results that fill in as answers arrive.
- **Join** — participants scan a QR code, pick a role (head teacher / nurse /
  counselor / admin), and answer from their phone. No app, no account.
- **Dashboard** — the facilitator opens and locks one activity at a time,
  triages Q&A, watches responses land in real time, reads speaker feedback, and
  exports everything to CSV.

Eight activity types: poll, word cloud, drag-and-drop sort, timed quiz with
leaderboard, before/after confidence slider, live Q&A wall, star-rated speaker
feedback, and a reflection that composes a **private personalized letter** for
each participant.

Built to survive weak venue wifi: reconnect armor on every realtime
subscription, optimistic serialized upserts on every answer, and a presenter
deck that works with zero network.

## Stack

Next.js (App Router) · Supabase (Postgres + realtime) · Tailwind CSS · Framer
Motion · deployed on Vercel.

The data model is three tables: `sessions`, `participants`, and `responses`
(one row per participant per activity, upserted).

## Run it locally

```bash
npm install
cp .env.example .env.local   # fill in your Supabase project + dashboard passwords
npm run dev
```

Open <http://localhost:3000>. The `/demo` routes work without any Supabase
configuration — they run on the in-memory mock.

### Environment

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `NEXT_PUBLIC_BASE_URL` | Base URL used to build join QR codes |
| `DASHBOARD_PASSWORDS` | Comma-separated facilitator passwords (server-only) gating `/dashboard/[code]` |

## How the demo stays safe

Every Supabase call in the app goes through a single `getSupabase()` accessor.
On any `/demo` path in the browser it returns an **in-memory mock client**
([`lib/demo/`](lib/demo)) instead of the real one, seeded with fake participants
and responses. Because the demo makes no network call, the real UPC1/UPC2
seminar records are physically unreachable from it. The real `/dashboard/[code]`
routes keep their server-side password gate untouched.

## Layout

```
app/            routes: home, /stage, /join, /dashboard, /demo, /guide, /handbook
components/     stage/ join/ live/ dashboard/ ui/ — the surfaces
content/        the curriculum as typed modules + slides + activities
lib/            supabase client, realtime armor, aggregation, letter composer
lib/demo/       in-memory mock client that powers the public demo
```

## Tests

```bash
npx vitest run
```

Covers response aggregation, the letter composer, and the demo mock client.
