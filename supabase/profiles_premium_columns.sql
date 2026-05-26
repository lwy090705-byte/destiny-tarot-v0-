-- Premium subscription columns on profiles (run in Supabase SQL editor if missing).
alter table public.profiles
  add column if not exists premium_active boolean default false,
  add column if not exists premium_type text,
  add column if not exists premium_started_at timestamptz,
  add column if not exists premium_expires_at timestamptz;

comment on column public.profiles.premium_active is 'True while subscription is active (synced with premium_expires_at)';
comment on column public.profiles.premium_type is 'monthly | quarterly | yearly';
comment on column public.profiles.premium_started_at is 'First premium activation (UTC)';
comment on column public.profiles.premium_expires_at is 'Premium access expiry (UTC)';
