-- Enable RLS on all tables
alter table profiles         enable row level security;
alter table plans            enable row level security;
alter table subscriptions    enable row level security;
alter table sessions         enable row level security;
alter table progress_reports enable row level security;
alter table testimonials     enable row level security;

-- Helper: is current user an admin?
create or replace function is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from profiles where id = auth.uid() and role = 'admin'
  );
$$;

revoke execute on function is_admin() from public, anon, authenticated;

-- profiles
create policy "Users view own profile"
  on profiles for select using (auth.uid() = id);

create policy "Users update own profile"
  on profiles for update using (auth.uid() = id);

create policy "Admins view all profiles"
  on profiles for select using (is_admin());

create policy "Admins update all profiles"
  on profiles for update using (is_admin());

-- plans
create policy "Public can view active plans"
  on plans for select using (is_active = true);

create policy "Admins manage plans"
  on plans for all using (is_admin());

-- subscriptions
create policy "Students view own subscriptions"
  on subscriptions for select using (auth.uid() = student_id);

create policy "Teachers view assigned subscriptions"
  on subscriptions for select using (auth.uid() = teacher_id);

create policy "Admins manage subscriptions"
  on subscriptions for all using (is_admin());

-- sessions
create policy "Participants view own sessions"
  on sessions for select
  using (auth.uid() = student_id or auth.uid() = teacher_id);

create policy "Teachers update own sessions"
  on sessions for update using (auth.uid() = teacher_id);

create policy "Admins manage sessions"
  on sessions for all using (is_admin());

-- progress_reports
create policy "Students view own reports"
  on progress_reports for select using (auth.uid() = student_id);

create policy "Teachers manage their reports"
  on progress_reports for all using (auth.uid() = teacher_id);

create policy "Admins view all reports"
  on progress_reports for select using (is_admin());

-- testimonials
create policy "Public views approved testimonials"
  on testimonials for select using (is_approved = true);

create policy "Auth users submit testimonials"
  on testimonials for insert with check (auth.uid() is not null);

create policy "Admins manage testimonials"
  on testimonials for all using (is_admin());
