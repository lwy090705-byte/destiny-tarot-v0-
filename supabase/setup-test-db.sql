-- =============================================================================
-- Destiny Tarot — test Supabase schema (single-file bootstrap)
-- =============================================================================
-- Run in a NEW Supabase project SQL Editor (or psql) to replicate core tables
-- used by this app. RLS is OFF for easier local/test client access.
--
-- Includes:
--   profiles (+ referral, master, premium columns)
--   points
--   referrals
--   referral_codes
--   visit_logs
--   fortune_results
--
-- Does NOT include community_* tables (posts, comments, likes).
-- =============================================================================

BEGIN;

-- ---------------------------------------------------------------------------
-- Extensions (Supabase usually has these; safe to ensure)
-- ---------------------------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ---------------------------------------------------------------------------
-- profiles
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  nickname text NOT NULL,
  birthdate date,
  gender text,
  referral_code text,
  user_code text,
  role text NOT NULL DEFAULT 'user',
  is_master boolean NOT NULL DEFAULT false,
  level_title text,
  level int4,
  total_points int4 NOT NULL DEFAULT 0,
  premium_active boolean NOT NULL DEFAULT false,
  premium_type text,
  premium_started_at timestamptz,
  premium_expires_at timestamptz,
  CONSTRAINT profiles_premium_type_check
    CHECK (premium_type IS NULL OR premium_type IN ('monthly', 'quarterly', 'yearly'))
);

COMMENT ON TABLE public.profiles IS 'User profiles (nickname is the app identity key)';
COMMENT ON COLUMN public.profiles.referral_code IS 'User-owned referral code (6 chars)';
COMMENT ON COLUMN public.profiles.user_code IS 'Same as referral_code in app; used for visit_logs identity';
COMMENT ON COLUMN public.profiles.role IS 'user | master | operator';
COMMENT ON COLUMN public.profiles.premium_active IS 'True while subscription is active (sync with premium_expires_at)';
COMMENT ON COLUMN public.profiles.premium_type IS 'monthly | quarterly | yearly';
COMMENT ON COLUMN public.profiles.premium_started_at IS 'First premium activation (UTC)';
COMMENT ON COLUMN public.profiles.premium_expires_at IS 'Premium access expiry (UTC)';

CREATE INDEX IF NOT EXISTS profiles_created_at_idx
  ON public.profiles (created_at DESC);

CREATE INDEX IF NOT EXISTS profiles_nickname_lower_idx
  ON public.profiles (lower(trim(nickname)));

CREATE UNIQUE INDEX IF NOT EXISTS profiles_nickname_unique_lower
  ON public.profiles (lower(trim(nickname)));

CREATE INDEX IF NOT EXISTS profiles_referral_code_idx
  ON public.profiles (referral_code)
  WHERE referral_code IS NOT NULL;

CREATE INDEX IF NOT EXISTS profiles_user_code_idx
  ON public.profiles (user_code)
  WHERE user_code IS NOT NULL;

CREATE INDEX IF NOT EXISTS profiles_premium_active_idx
  ON public.profiles (premium_active)
  WHERE premium_active = true;

-- ---------------------------------------------------------------------------
-- points (ledger; balance = sum(amount) per nickname)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.points (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  nickname text NOT NULL,
  point_type text NOT NULL,
  amount int4 NOT NULL,
  description text
);

COMMENT ON TABLE public.points IS 'Point transaction ledger (positive = earn, negative = spend)';
COMMENT ON COLUMN public.points.point_type IS 'e.g. fortune_tarot, referral_bonus, referral_reward, purchase';

CREATE INDEX IF NOT EXISTS points_nickname_idx
  ON public.points (nickname);

CREATE INDEX IF NOT EXISTS points_nickname_point_type_idx
  ON public.points (nickname, point_type);

CREATE INDEX IF NOT EXISTS points_created_at_idx
  ON public.points (created_at DESC);

-- ---------------------------------------------------------------------------
-- referrals (referrer_code → referred_code relationships)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.referrals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  referrer_code text NOT NULL,
  referred_code text NOT NULL,
  reward_points int4 NOT NULL DEFAULT 30,
  status text NOT NULL DEFAULT 'completed'
);

COMMENT ON TABLE public.referrals IS 'Referral relationships; reward_points default matches REFERRER_REWARD_POINTS (30)';

CREATE INDEX IF NOT EXISTS referrals_referrer_code_idx
  ON public.referrals (referrer_code);

CREATE INDEX IF NOT EXISTS referrals_referred_code_idx
  ON public.referrals (referred_code);

CREATE UNIQUE INDEX IF NOT EXISTS referrals_pair_unique
  ON public.referrals (referrer_code, referred_code);

-- ---------------------------------------------------------------------------
-- referral_codes (code → nickname map for cross-device referrer lookup)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.referral_codes (
  referral_code text PRIMARY KEY,
  nickname text NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.referral_codes IS 'Referral code to nickname mapping (upserted with profiles)';

CREATE INDEX IF NOT EXISTS referral_codes_nickname_idx
  ON public.referral_codes (nickname);

-- ---------------------------------------------------------------------------
-- visit_logs (one row per user per KST calendar day)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.visit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  nickname text,
  user_code text,
  visit_date date NOT NULL
);

COMMENT ON TABLE public.visit_logs IS 'Daily visit records (KST visit_date); deduped by partial unique indexes';

CREATE INDEX IF NOT EXISTS visit_logs_visit_date_idx
  ON public.visit_logs (visit_date DESC);

CREATE UNIQUE INDEX IF NOT EXISTS visit_logs_user_code_date
  ON public.visit_logs (visit_date, user_code)
  WHERE user_code IS NOT NULL AND user_code <> '';

CREATE UNIQUE INDEX IF NOT EXISTS visit_logs_nickname_date_no_code
  ON public.visit_logs (visit_date, nickname)
  WHERE user_code IS NULL OR user_code = '';

-- ---------------------------------------------------------------------------
-- fortune_results (cached fortune payloads keyed by seed_key)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.fortune_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  user_code text,
  profile_id text,
  fortune_type text NOT NULL,
  category text,
  period_key text,
  seed_key text NOT NULL,
  result jsonb NOT NULL,
  CONSTRAINT fortune_results_seed_key_unique UNIQUE (seed_key)
);

COMMENT ON TABLE public.fortune_results IS 'Cached fortune readings; result jsonb holds { language, data }';
COMMENT ON COLUMN public.fortune_results.seed_key IS 'Deterministic cache key (upsert on conflict)';

CREATE INDEX IF NOT EXISTS fortune_results_profile_id_idx
  ON public.fortune_results (profile_id)
  WHERE profile_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS fortune_results_user_code_idx
  ON public.fortune_results (user_code)
  WHERE user_code IS NOT NULL;

CREATE INDEX IF NOT EXISTS fortune_results_fortune_type_idx
  ON public.fortune_results (fortune_type);

-- ---------------------------------------------------------------------------
-- Row Level Security — DISABLED for test projects
-- ---------------------------------------------------------------------------
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.points DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.referrals DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.referral_codes DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.visit_logs DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.fortune_results DISABLE ROW LEVEL SECURITY;

-- Drop common policies if re-running on a project that had RLS enabled
DROP POLICY IF EXISTS "profiles_select_community_display" ON public.profiles;
DROP POLICY IF EXISTS "referral_codes_select_anon" ON public.referral_codes;
DROP POLICY IF EXISTS "referral_codes_insert_anon" ON public.referral_codes;
DROP POLICY IF EXISTS "referral_codes_update_anon" ON public.referral_codes;
DROP POLICY IF EXISTS "fortune_results_anon_insert" ON public.fortune_results;
DROP POLICY IF EXISTS "fortune_results_anon_select" ON public.fortune_results;

-- ---------------------------------------------------------------------------
-- API roles (Supabase: allow anon/authenticated clients without RLS)
-- ---------------------------------------------------------------------------
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO anon, authenticated, service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.points TO anon, authenticated, service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.referrals TO anon, authenticated, service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.referral_codes TO anon, authenticated, service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.visit_logs TO anon, authenticated, service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.fortune_results TO anon, authenticated, service_role;

COMMIT;

-- =============================================================================
-- Optional seed (uncomment for operator smoke test)
-- =============================================================================
-- INSERT INTO public.profiles (nickname, birthdate, gender, role, is_master, level_title)
-- VALUES ('대질주', NULL, NULL, 'master', true, '운영자')
-- ON CONFLICT DO NOTHING;
