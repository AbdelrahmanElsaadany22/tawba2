create table if not exists plans (
  id                  uuid primary key default gen_random_uuid(),
  category            text not null check (category in ('monthly', 'quarterly')),
  duration_minutes    int  not null check (duration_minutes in (30, 60)),
  sessions_per_month  int  not null check (sessions_per_month in (4, 8, 12, 16)),
  original_price      numeric(10,2) not null,
  discounted_price    numeric(10,2) not null,
  discount_percent    int  not null,
  savings_amount      numeric(10,2) not null,
  is_featured         boolean not null default false,
  is_active           boolean not null default true,
  created_at          timestamptz not null default now()
);
