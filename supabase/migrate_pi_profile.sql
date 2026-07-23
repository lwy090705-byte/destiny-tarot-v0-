-- =============================================================================
-- TEMP_PI_PROFILE_MIGRATION + profiles schema for Pi link / operator flags
-- File: supabase/migrate_pi_profile.sql
--
-- Run once in Supabase SQL Editor (safe to re-run).
-- Preserves all existing profile rows and columns; only ADDs missing columns.
-- =============================================================================

-- ---------------------------------------------------------------------------
-- 1) Schema: add columns if missing (existing data kept)
-- ---------------------------------------------------------------------------
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS pi_uid text;

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS role text DEFAULT 'user';

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS is_master boolean DEFAULT false;

-- Used when promoting operator during migrate (optional but referenced by app)
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS level_title text;

COMMENT ON COLUMN public.profiles.pi_uid IS
  'Pi Network user uid from verified session; at most one profile per uid.';
COMMENT ON COLUMN public.profiles.role IS
  'user | master | operator';
COMMENT ON COLUMN public.profiles.is_master IS
  'True for designated operator accounts';

-- Backfill NULLs only (do not overwrite existing role / is_master values)
UPDATE public.profiles
SET role = 'user'
WHERE role IS NULL;

UPDATE public.profiles
SET is_master = false
WHERE is_master IS NULL;

-- ---------------------------------------------------------------------------
-- 2) Unique index: one non-empty pi_uid → one profile
--    (nullable / empty pi_uid allowed on many rows)
-- ---------------------------------------------------------------------------
CREATE UNIQUE INDEX IF NOT EXISTS profiles_pi_uid_unique
  ON public.profiles (pi_uid)
  WHERE pi_uid IS NOT NULL AND length(trim(pi_uid)) > 0;

-- ---------------------------------------------------------------------------
-- 3) Atomic migrate: move pi_uid + master flags source → target
--    EXECUTE: service_role only (called from Next.js admin client)
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.migrate_pi_profile_link(
  p_source_nickname text,
  p_target_nickname text,
  p_session_pi_uid text
)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  src_nick text := trim(coalesce(p_source_nickname, ''));
  tgt_nick text := trim(coalesce(p_target_nickname, ''));
  uid text := trim(coalesce(p_session_pi_uid, ''));
  src record;
  tgt record;
BEGIN
  IF src_nick = '' OR tgt_nick = '' OR uid = '' THEN
    RAISE EXCEPTION 'invalid arguments' USING ERRCODE = '22023';
  END IF;

  IF lower(src_nick) = lower(tgt_nick) THEN
    RAISE EXCEPTION 'source and target must differ' USING ERRCODE = '22023';
  END IF;

  SELECT p.nickname, p.pi_uid, p.role, p.is_master
  INTO src
  FROM public.profiles AS p
  WHERE lower(trim(p.nickname)) = lower(src_nick)
  LIMIT 1;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'source profile not found' USING ERRCODE = 'P0002';
  END IF;

  SELECT p.nickname, p.pi_uid, p.role, p.is_master
  INTO tgt
  FROM public.profiles AS p
  WHERE lower(trim(p.nickname)) = lower(tgt_nick)
  LIMIT 1;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'target profile not found' USING ERRCODE = 'P0002';
  END IF;

  IF src.pi_uid IS NULL OR trim(src.pi_uid) <> uid THEN
    RAISE EXCEPTION 'session does not own source pi_uid' USING ERRCODE = '42501';
  END IF;

  IF tgt.pi_uid IS NOT NULL
     AND length(trim(tgt.pi_uid)) > 0
     AND trim(tgt.pi_uid) <> uid THEN
    RAISE EXCEPTION 'target already linked to another pi_uid' USING ERRCODE = '23505';
  END IF;

  -- Clear this uid from every profile (avoids unique conflicts)
  UPDATE public.profiles AS p
  SET
    pi_uid = NULL,
    is_master = CASE
      WHEN lower(trim(p.nickname)) = lower(src_nick) THEN false
      ELSE coalesce(p.is_master, false)
    END,
    role = CASE
      WHEN lower(trim(p.nickname)) = lower(src_nick) THEN 'user'
      ELSE coalesce(nullif(trim(p.role), ''), 'user')
    END
  WHERE p.pi_uid IS NOT NULL AND trim(p.pi_uid) = uid;

  UPDATE public.profiles AS p
  SET
    pi_uid = NULL,
    is_master = false,
    role = 'user'
  WHERE lower(trim(p.nickname)) = lower(src_nick);

  UPDATE public.profiles AS p
  SET
    pi_uid = uid,
    is_master = true,
    role = 'master',
    level_title = '운영자'
  WHERE lower(trim(p.nickname)) = lower(tgt_nick);

  RETURN json_build_object(
    'success', true,
    'pi_uid', uid,
    'source_nickname', src.nickname,
    'target_nickname', tgt.nickname,
    'linked_nickname', tgt.nickname,
    'is_master', true,
    'role', 'master'
  );
END;
$$;

COMMENT ON FUNCTION public.migrate_pi_profile_link(text, text, text) IS
  'TEMP_PI_PROFILE_MIGRATION: move pi_uid + master flags from source to target nickname.';

REVOKE ALL ON FUNCTION public.migrate_pi_profile_link(text, text, text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.migrate_pi_profile_link(text, text, text) FROM anon, authenticated;
GRANT EXECUTE ON FUNCTION public.migrate_pi_profile_link(text, text, text) TO service_role;

-- ---------------------------------------------------------------------------
-- 4) Verify after run (optional)
-- ---------------------------------------------------------------------------
-- SELECT column_name, data_type, column_default
-- FROM information_schema.columns
-- WHERE table_schema = 'public' AND table_name = 'profiles'
--   AND column_name IN ('pi_uid', 'role', 'is_master', 'level_title');
--
-- SELECT nickname, pi_uid, role, is_master
-- FROM public.profiles
-- WHERE lower(trim(nickname)) IN (lower('파이조아'), lower('대질주'));
