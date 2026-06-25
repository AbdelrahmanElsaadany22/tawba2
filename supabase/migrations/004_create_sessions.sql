create table if not exists sessions (
  id               uuid primary key default gen_random_uuid(),
  subscription_id  uuid not null references subscriptions(id) on delete cascade,
  student_id       uuid not null references profiles(id),
  teacher_id       uuid not null references profiles(id),
  scheduled_at     timestamptz not null,
  duration_minutes int  not null check (duration_minutes in (30, 60)),
  status           text not null default 'scheduled'
                     check (status in ('scheduled', 'completed', 'cancelled', 'no-show')),
  notes            text,
  meeting_link     text,
  created_at       timestamptz not null default now()
);
