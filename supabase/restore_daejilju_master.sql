-- =============================================================================
-- Restore 대질주 operator flags (keep pi_uid as-is, typically NULL)
-- File: supabase/restore_daejilju_master.sql
-- Safe to re-run. Does not change pi_uid.
-- =============================================================================

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS role text DEFAULT 'user';

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS is_master boolean DEFAULT false;

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS level_title text;

UPDATE public.profiles
SET
  role = 'master',
  is_master = true,
  level_title = '운영자'
WHERE trim(nickname) = '대질주';

UPDATE public.profiles
SET
  role = 'user',
  is_master = false
WHERE trim(nickname) = '파이조아';

-- Verify:
-- SELECT nickname, pi_uid, role, is_master, level_title
-- FROM public.profiles
-- WHERE trim(nickname) IN ('대질주', '파이조아');
