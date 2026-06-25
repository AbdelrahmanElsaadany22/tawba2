create table if not exists progress_reports (
  id               uuid primary key default gen_random_uuid(),
  student_id       uuid not null references profiles(id),
  teacher_id       uuid not null references profiles(id),
  subscription_id  uuid not null references subscriptions(id),
  report_date      date not null default current_date,
  tajweed_level    text check (tajweed_level in ('beginner', 'intermediate', 'advanced')),
  hifz_progress    text,
  notes            text,
  next_goals       text,
  created_at       timestamptz not null default now()
);
