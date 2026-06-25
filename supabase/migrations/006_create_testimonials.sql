create table if not exists testimonials (
  id           uuid primary key default gen_random_uuid(),
  author_name  text not null,
  author_city  text,
  author_role  text,
  avatar_url   text,
  content      text not null,
  rating       int  not null check (rating between 1 and 5),
  is_approved  boolean not null default false,
  created_at   timestamptz not null default now()
);
