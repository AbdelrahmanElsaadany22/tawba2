-- Seed: Tawba Academy Plans
-- All prices in SAR (Saudi Riyal)
-- Run in Supabase Dashboard → SQL Editor AFTER 002_create_plans.sql

-- ── Monthly 30-minute plans ──
insert into plans (category, duration_minutes, sessions_per_month, original_price, discounted_price, discount_percent, savings_amount, is_featured, is_active)
values
  ('monthly', 30, 8,  110.00, 80.00,  27, 30.00,  false, true),
  ('monthly', 30, 12, 180.00, 120.00, 33, 60.00,  true,  true),
  ('monthly', 30, 16, 260.00, 160.00, 38, 100.00, false, true);

-- ── Monthly 60-minute plans ──
insert into plans (category, duration_minutes, sessions_per_month, original_price, discounted_price, discount_percent, savings_amount, is_featured, is_active)
values
  ('monthly', 60, 4,  100.00, 72.00,  28, 28.00,  false, true),
  ('monthly', 60, 8,  210.00, 144.00, 31, 66.00,  false, true),
  ('monthly', 60, 12, 350.00, 216.00, 38, 134.00, true,  true),
  ('monthly', 60, 16, 460.00, 288.00, 41, 172.00, false, true);

-- ── Quarterly 30-minute plans ──
insert into plans (category, duration_minutes, sessions_per_month, original_price, discounted_price, discount_percent, savings_amount, is_featured, is_active)
values
  ('quarterly', 30, 8,  330.00, 240.00, 27, 90.00,  false, true),
  ('quarterly', 30, 12, 540.00, 340.00, 37, 200.00, true,  true),
  ('quarterly', 30, 16, 780.00, 450.00, 42, 330.00, false, true);

-- ── Quarterly 60-minute plans ──
insert into plans (category, duration_minutes, sessions_per_month, original_price, discounted_price, discount_percent, savings_amount, is_featured, is_active)
values
  ('quarterly', 60, 4,  300.00,  210.00, 30, 90.00,  false, true),
  ('quarterly', 60, 8,  630.00,  390.00, 38, 240.00, false, true),
  ('quarterly', 60, 12, 1050.00, 570.00, 46, 480.00, true,  true),
  ('quarterly', 60, 16, 1380.00, 720.00, 48, 660.00, false, true);
