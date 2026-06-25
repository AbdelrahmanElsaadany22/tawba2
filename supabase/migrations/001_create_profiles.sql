create table if not exists profiles (
  id          uuid references auth.users(id) on delete cascade primary key,
  name        text not null,
  phone       text,
  role        text not null default 'student'
                check (role in ('student', 'teacher', 'admin')),
  avatar_url  text,
  country     text,
  is_active   boolean not null default true,
  created_at  timestamptz not null default now()
);

create or replace function handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', 'مستخدم جديد')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

revoke execute on function handle_new_user() from public, anon, authenticated;
