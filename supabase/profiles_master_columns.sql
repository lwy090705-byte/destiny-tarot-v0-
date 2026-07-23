-- Run in Supabase SQL editor if columns are missing on `profiles`.
-- Prefer the fuller script: supabase/migrate_pi_profile.sql (includes pi_uid + RPC).
--
-- Existing rows are preserved; new columns get defaults only.

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS pi_uid text;

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS role text DEFAULT 'user';

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS is_master boolean DEFAULT false;

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS level_title text;

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS total_points int4 DEFAULT 0;

UPDATE public.profiles SET role = 'user' WHERE role IS NULL;
UPDATE public.profiles SET is_master = false WHERE is_master IS NULL;

CREATE UNIQUE INDEX IF NOT EXISTS profiles_pi_uid_unique
  ON public.profiles (pi_uid)
  WHERE pi_uid IS NOT NULL AND length(trim(pi_uid)) > 0;

-- Optional bootstrap (after linking pi_uid via the app):
-- UPDATE public.profiles
-- SET role = 'master', is_master = true, level_title = '운영자'
-- WHERE trim(nickname) = '대질주';
