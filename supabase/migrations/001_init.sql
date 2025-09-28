create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  created_at timestamptz default now()
);

create table if not exists public.calendars (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  name text not null,
  color text default '#3b82f6',
  is_default boolean default false,
  created_at timestamptz default now()
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  calendar_id uuid not null references public.calendars(id) on delete cascade,
  user_id uuid not null references public.users(id) on delete cascade,
  title text not null,
  description text,
  location text,
  start timestamptz not null,
  "end" timestamptz not null,
  all_day boolean default false,
  timezone text default 'Europe/Madrid',
  rrule text,
  exdates jsonb default '[]'::jsonb,
  attendees jsonb default '[]'::jsonb,
  color text,
  visibility text check (visibility in ('public','private')) default 'private',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  user_id uuid not null references public.users(id) on delete cascade,
  method text check (method in ('email','push')) not null,
  minutes_before int not null,
  created_at timestamptz default now()
);

create index if not exists idx_calendars_user on public.calendars(user_id);
create index if not exists idx_events_user on public.events(user_id);
create index if not exists idx_events_calendar on public.events(calendar_id);
create index if not exists idx_events_start on public.events(start);
create index if not exists idx_events_end on public.events("end");

alter table public.calendars enable row level security;
alter table public.events enable row level security;
alter table public.notifications enable row level security;

create policy if not exists "owner calendars" on public.calendars
for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy if not exists "owner/invited events" on public.events
for all using (
  auth.uid() = user_id
  or exists (
    select 1 from jsonb_to_recordset(coalesce(attendees,'[]'::jsonb)) as a(email text)
    join public.users u on u.email = a.email
    where u.id = auth.uid()
  )
) with check (auth.uid() = user_id);

create policy if not exists "owner notifications" on public.notifications
for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
