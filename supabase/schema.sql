-- upc-live schema
--
-- Captured from the live project (aokvcatuogypbynvuovt) on 2026-08-16, after
-- restoring it from a month-long free-tier pause. Until that day this schema
-- existed nowhere but inside that one paused database — which made "just spin
-- up a new project" far more expensive than it looked. Keep this file current.
--
-- Apply to a fresh project with:  psql "$DATABASE_URL" -f supabase/schema.sql
--
-- Three tables. `responses` holds one row per (participant, activity), upserted
-- on conflict — see lib/types.ts and components/join/useResponse.tsx.

-- ---------------------------------------------------------------- sessions --
create table if not exists public.sessions (
  id              uuid primary key default gen_random_uuid(),
  code            text not null unique,   -- matches the course id: UPC1 / UPC2 / CATALYST
  day             integer not null,
  active_activity text,                   -- the activity currently open on phones
  created_at      timestamptz default now()
);

-- ------------------------------------------------------------ participants --
create table if not exists public.participants (
  id         uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.sessions (id),
  role       text not null,
  nickname   text,
  created_at timestamptz default now()
);

-- Roles must stay in sync with the `Role` union in lib/types.ts. The first four
-- are the adult UPC 1/2 audience; the last two are The Catalyst's SSLG pairs.
-- Widening this is safe (a looser CHECK cannot invalidate existing rows), but
-- forgetting to widen it means every join fails at insert with no client-side
-- clue — which is exactly what happened before 2026-08-21.
alter table public.participants
  drop constraint if exists participants_role_check;
alter table public.participants
  add constraint participants_role_check
  check (role = any (array[
    'head_teacher'::text,
    'nurse_dentist'::text,
    'counselor'::text,
    'admin'::text,
    'student_leader'::text,
    'adviser'::text
  ]));

-- --------------------------------------------------------------- responses --
create table if not exists public.responses (
  id             uuid primary key default gen_random_uuid(),
  session_id     uuid not null references public.sessions (id),
  participant_id uuid not null references public.participants (id),
  activity_id    text not null,
  payload        jsonb not null,
  created_at     timestamptz default now(),
  -- REQUIRED: useResponse upserts with onConflict 'participant_id,activity_id'.
  -- Without this constraint every answer insert fails.
  constraint responses_participant_id_activity_id_key
    unique (participant_id, activity_id)
);

-- --------------------------------------------------------------------- RLS --
-- Participants are anonymous by design — no auth, they just scan a QR code. So
-- the policies are permissive on purpose. The data is ephemeral seminar answers,
-- never anything personal beyond a self-chosen nickname.
alter table public.sessions     enable row level security;
alter table public.participants enable row level security;
alter table public.responses    enable row level security;

drop policy if exists "public read sessions"        on public.sessions;
drop policy if exists "public update sessions"      on public.sessions;
drop policy if exists "public read participants"    on public.participants;
drop policy if exists "public insert participants"  on public.participants;
drop policy if exists "anon delete participants"    on public.participants;
drop policy if exists "public read responses"       on public.responses;
drop policy if exists "public insert responses"     on public.responses;
drop policy if exists "public update responses"     on public.responses;
drop policy if exists "anon delete responses"       on public.responses;

create policy "public read sessions"   on public.sessions for select to public using (true);
create policy "public update sessions" on public.sessions for update to public using (true);

create policy "public read participants"   on public.participants for select to public using (true);
create policy "public insert participants" on public.participants for insert to public with check (true);
create policy "anon delete participants"   on public.participants for delete to anon   using (true);

create policy "public read responses"   on public.responses for select to public using (true);
create policy "public insert responses" on public.responses for insert to public with check (true);
create policy "public update responses" on public.responses for update to public using (true);
create policy "anon delete responses"   on public.responses for delete to anon   using (true);

-- ---------------------------------------------------------------- realtime --
-- REQUIRED and easy to miss. JoinFlow subscribes to postgres_changes on
-- `sessions` to learn which activity the presenter has opened; the live views
-- subscribe to `responses`. If a table is absent from this publication the app
-- connects cleanly, shows no error, and simply never updates.
alter publication supabase_realtime add table public.sessions;
alter publication supabase_realtime add table public.participants;
alter publication supabase_realtime add table public.responses;

-- ------------------------------------------------------------ seed sessions --
insert into public.sessions (code, day) values
  ('UPC1', 1),
  ('UPC2', 2),
  ('CATALYST', 3)
on conflict (code) do nothing;
