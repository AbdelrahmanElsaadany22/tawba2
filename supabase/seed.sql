-- Seed data for plans
-- Monthly 30 min
insert into plans (category, duration_minutes, sessions_per_month, original_price, discounted_price, discount_percent, savings_amount, is_featured)
values
  ('monthly', 30, 8,  110, 80,  27, 30, false),
  ('monthly', 30, 12, 180, 120, 33, 60, true),
  ('monthly', 30, 16, 260, 160, 38, 100, false);

-- Monthly 60 min
insert into plans (category, duration_minutes, sessions_per_month, original_price, discounted_price, discount_percent, savings_amount, is_featured)
values
  ('monthly', 60, 4,  100, 72,  28, 28,  false),
  ('monthly', 60, 8,  210, 144, 31, 66,  false),
  ('monthly', 60, 12, 350, 216, 38, 134, true),
  ('monthly', 60, 16, 460, 288, 41, 172, false);

-- Quarterly 30 min
insert into plans (category, duration_minutes, sessions_per_month, original_price, discounted_price, discount_percent, savings_amount, is_featured)
values
  ('quarterly', 30, 8,  330, 240, 27, 90,  false),
  ('quarterly', 30, 12, 540, 340, 37, 200, true),
  ('quarterly', 30, 16, 780, 450, 42, 330, false);

-- Quarterly 60 min
insert into plans (category, duration_minutes, sessions_per_month, original_price, discounted_price, discount_percent, savings_amount, is_featured)
values
  ('quarterly', 60, 4,  300,  210, 30, 90,  false),
  ('quarterly', 60, 8,  630,  390, 38, 240, false),
  ('quarterly', 60, 12, 1050, 570, 46, 480, true),
  ('quarterly', 60, 16, 1380, 720, 48, 660, false);
