-- DEPRECATED: Pi profile migrate is not used.
-- Prefer supabase/restore_daejilju_master.sql for 대질주 master flags.

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS pi_uid text;

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS role text DEFAULT 'user';

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS is_master boolean DEFAULT false;

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS level_title text;

CREATE UNIQUE INDEX IF NOT EXISTS profiles_pi_uid_unique
  ON public.profiles (pi_uid)
  WHERE pi_uid IS NOT NULL AND length(trim(pi_uid)) > 0;
