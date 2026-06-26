-- Run in Supabase Dashboard → SQL Editor

-- Create avatars storage bucket (public)
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

-- Allow anyone to read avatars
create policy "Public can view avatars"
  on storage.objects for select
  using (bucket_id = 'avatars');

-- Allow authenticated users to upload their own avatar
create policy "Users can upload own avatar"
  on storage.objects for insert
  with check (
    bucket_id = 'avatars'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

-- Allow users to update/delete their own avatar
create policy "Users can update own avatar"
  on storage.objects for update
  using (
    bucket_id = 'avatars'
    and auth.uid()::text = (storage.foldername(name))[1]
  );
