-- Grant table privileges to the PostgREST roles (anon / authenticated / service_role).
-- Supabase Cloud applies these by default; local `db reset` does not, so the API
-- returns "permission denied for table ..." without them. Row access is still
-- governed by the RLS policies in 007_rls_policies.sql.

grant usage on schema public to anon, authenticated, service_role;

grant all on all tables    in schema public to anon, authenticated, service_role;
grant all on all sequences in schema public to anon, authenticated, service_role;
grant all on all functions in schema public to anon, authenticated, service_role;

alter default privileges in schema public grant all on tables    to anon, authenticated, service_role;
alter default privileges in schema public grant all on sequences to anon, authenticated, service_role;
alter default privileges in schema public grant all on functions to anon, authenticated, service_role;
