create table if not exists subscriptions (
  id                   uuid primary key default gen_random_uuid(),
  student_id           uuid not null references profiles(id) on delete cascade,
  teacher_id           uuid references profiles(id) on delete set null,
  plan_id              uuid not null references plans(id),
  status               text not null default 'active'
                         check (status in ('active', 'paused', 'expired', 'cancelled')),
  start_date           date not null default current_date,
  end_date             date not null,
  sessions_remaining   int  not null,
  total_sessions       int  not null,
  stripe_payment_id    text,
  preferred_times      text[],
  created_at           timestamptz not null default now()
);
