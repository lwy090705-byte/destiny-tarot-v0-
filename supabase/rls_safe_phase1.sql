-- =============================================================================
-- RLS SAFE PHASE 1 — enable RLS without granting anon UPDATE/DELETE
-- File: supabase/rls_safe_phase1.sql
-- =============================================================================
-- Run this FIRST in Supabase SQL Editor (entire file).
--
-- Goals:
--   • Clear "rls_disabled_in_public" by ENABLE ROW LEVEL SECURITY
--   • Allow SELECT + limited INSERT needed for core reads / create flows
--   • Protect visit_logs (INSERT only; no SELECT dump)
--   • Do NOT grant anon/authenticated UPDATE or DELETE on any app table
--
-- Does NOT make the app fully secure: INSERT with forged nickname still possible.
-- Does block the worst PostgREST attacks: arbitrary UPDATE/DELETE of other rows.
--
-- After Phase 1, apply supabase/rls_secure_phase2.sql and deploy server APIs
-- for mutations that previously used client UPDATE/DELETE.
--
-- DO NOT run the old supabase/rls_policies.sql (it granted unsafe UPDATE/DELETE).
-- =============================================================================

-- ############################################################################
-- A. Visitor stats RPC — service_role / authenticated server only later (Phase 2)
--    Phase 1 still creates it but REVOKES anon EXECUTE (no nickname spoof gate).
-- ############################################################################

CREATE OR REPLACE FUNCTION public.get_visitor_stats(p_requester_nickname text)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Deprecated for anon callers. Use /api/operator/visit-stats (Pi session).
  RAISE EXCEPTION 'not authorized: use server visit-stats API'
    USING ERRCODE = '42501';
END;
$$;

COMMENT ON FUNCTION public.get_visitor_stats(text) IS
  'Deprecated nickname gate. Disabled for clients; use Phase 2 server API.';

REVOKE ALL ON FUNCTION public.get_visitor_stats(text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.get_visitor_stats(text) FROM anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_visitor_stats(text) TO service_role;

-- Community counter RPCs (already SECURITY DEFINER): keep for Phase 1 likes/comments.
-- Risk: anyone can bump counters — classified temporary until Phase 2 API wraps them.
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_proc p
    JOIN pg_namespace n ON n.oid = p.pronamespace
    WHERE n.nspname = 'public' AND p.proname = 'increment_community_post_likes'
  ) THEN
    EXECUTE 'GRANT EXECUTE ON FUNCTION public.increment_community_post_likes(uuid) TO anon, authenticated, service_role';
  END IF;
  IF EXISTS (
    SELECT 1 FROM pg_proc p
    JOIN pg_namespace n ON n.oid = p.pronamespace
    WHERE n.nspname = 'public' AND p.proname = 'adjust_community_post_comments'
  ) THEN
    EXECUTE 'GRANT EXECUTE ON FUNCTION public.adjust_community_post_comments(uuid, integer) TO anon, authenticated, service_role';
  END IF;
END $$;

-- ############################################################################
-- B. ENABLE ROW LEVEL SECURITY
-- ############################################################################

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_post_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.points ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referral_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fortune_results ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF to_regclass('public.achievements') IS NOT NULL THEN
    EXECUTE 'ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY';
  END IF;
  IF to_regclass('public.notifications') IS NOT NULL THEN
    EXECUTE 'ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY';
  END IF;
END $$;

-- ############################################################################
-- C. Drop legacy / unsafe policies (including prior rls_policies.sql names)
-- ############################################################################

-- profiles
DROP POLICY IF EXISTS "profiles_select_community_display" ON public.profiles;
DROP POLICY IF EXISTS profiles_select_anon ON public.profiles;
DROP POLICY IF EXISTS profiles_insert_anon ON public.profiles;
DROP POLICY IF EXISTS profiles_update_anon ON public.profiles;
DROP POLICY IF EXISTS profiles_delete_anon ON public.profiles;

-- community_posts
DROP POLICY IF EXISTS "community_posts_select_anon" ON public.community_posts;
DROP POLICY IF EXISTS "community_posts_insert_anon" ON public.community_posts;
DROP POLICY IF EXISTS community_posts_select_anon ON public.community_posts;
DROP POLICY IF EXISTS community_posts_insert_anon ON public.community_posts;
DROP POLICY IF EXISTS community_posts_update_anon ON public.community_posts;
DROP POLICY IF EXISTS community_posts_delete_anon ON public.community_posts;

-- community_comments
DROP POLICY IF EXISTS community_comments_select_anon ON public.community_comments;
DROP POLICY IF EXISTS community_comments_insert_anon ON public.community_comments;
DROP POLICY IF EXISTS community_comments_update_anon ON public.community_comments;
DROP POLICY IF EXISTS community_comments_delete_anon ON public.community_comments;

-- community_post_likes
DROP POLICY IF EXISTS community_post_likes_select_anon ON public.community_post_likes;
DROP POLICY IF EXISTS community_post_likes_insert_anon ON public.community_post_likes;
DROP POLICY IF EXISTS community_post_likes_delete_anon ON public.community_post_likes;
DROP POLICY IF EXISTS community_post_likes_update_anon ON public.community_post_likes;

-- points
DROP POLICY IF EXISTS points_select_anon ON public.points;
DROP POLICY IF EXISTS points_insert_anon ON public.points;
DROP POLICY IF EXISTS points_update_anon ON public.points;
DROP POLICY IF EXISTS points_delete_anon ON public.points;

-- visit_logs
DROP POLICY IF EXISTS visit_logs_insert_anyone ON public.visit_logs;
DROP POLICY IF EXISTS visit_logs_insert_anon ON public.visit_logs;
DROP POLICY IF EXISTS visit_logs_select_anon ON public.visit_logs;
DROP POLICY IF EXISTS visit_logs_update_anon ON public.visit_logs;
DROP POLICY IF EXISTS visit_logs_delete_anon ON public.visit_logs;

-- referral_codes
DROP POLICY IF EXISTS "referral_codes_select_anon" ON public.referral_codes;
DROP POLICY IF EXISTS "referral_codes_insert_anon" ON public.referral_codes;
DROP POLICY IF EXISTS "referral_codes_update_anon" ON public.referral_codes;
DROP POLICY IF EXISTS referral_codes_select_anon ON public.referral_codes;
DROP POLICY IF EXISTS referral_codes_insert_anon ON public.referral_codes;
DROP POLICY IF EXISTS referral_codes_update_anon ON public.referral_codes;
DROP POLICY IF EXISTS referral_codes_delete_anon ON public.referral_codes;

-- referrals
DROP POLICY IF EXISTS referrals_select_anon ON public.referrals;
DROP POLICY IF EXISTS referrals_insert_anon ON public.referrals;
DROP POLICY IF EXISTS referrals_update_anon ON public.referrals;
DROP POLICY IF EXISTS referrals_delete_anon ON public.referrals;

-- fortune_results
DROP POLICY IF EXISTS "fortune_results_anon_insert" ON public.fortune_results;
DROP POLICY IF EXISTS "fortune_results_anon_select" ON public.fortune_results;
DROP POLICY IF EXISTS fortune_results_select_anon ON public.fortune_results;
DROP POLICY IF EXISTS fortune_results_insert_anon ON public.fortune_results;
DROP POLICY IF EXISTS fortune_results_update_anon ON public.fortune_results;
DROP POLICY IF EXISTS fortune_results_delete_anon ON public.fortune_results;

-- ############################################################################
-- D. Phase 1 policies — SELECT + INSERT only (no UPDATE/DELETE for clients)
-- ############################################################################

-- ---------- profiles ----------
-- Ownership NOT verified (nickname is client-supplied).
-- Block elevating to master/operator via INSERT.
CREATE POLICY profiles_select_anon
  ON public.profiles
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY profiles_insert_anon
  ON public.profiles
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    nullif(trim(nickname), '') IS NOT NULL
    AND coalesce(is_master, false) = false
    AND lower(coalesce(nullif(trim(role), ''), 'user')) = 'user'
  );

-- ---------- community_posts ----------
CREATE POLICY community_posts_select_anon
  ON public.community_posts
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY community_posts_insert_anon
  ON public.community_posts
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    nullif(trim(author), '') IS NOT NULL
    AND nullif(trim(title), '') IS NOT NULL
    AND nullif(trim(content), '') IS NOT NULL
  );

-- ---------- community_comments ----------
CREATE POLICY community_comments_select_anon
  ON public.community_comments
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY community_comments_insert_anon
  ON public.community_comments
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    post_id IS NOT NULL
    AND nullif(trim(author), '') IS NOT NULL
    AND nullif(trim(content), '') IS NOT NULL
  );

-- ---------- community_post_likes ----------
CREATE POLICY community_post_likes_select_anon
  ON public.community_post_likes
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY community_post_likes_insert_anon
  ON public.community_post_likes
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    post_id IS NOT NULL
    AND nullif(trim(user_code), '') IS NOT NULL
    AND nullif(trim(nickname), '') IS NOT NULL
  );

-- ---------- points ----------
-- HIGH RISK: forged nickname can mint points. Temporary until Phase 2 API.
CREATE POLICY points_select_anon
  ON public.points
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY points_insert_anon
  ON public.points
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    nullif(trim(nickname), '') IS NOT NULL
    AND nullif(trim(point_type), '') IS NOT NULL
    AND amount IS NOT NULL
    AND amount <> 0
    AND abs(amount) <= 100000
  );

-- ---------- visit_logs ----------
CREATE POLICY visit_logs_insert_anon
  ON public.visit_logs
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    visit_date IS NOT NULL
    AND (
      nullif(trim(coalesce(user_code, '')), '') IS NOT NULL
      OR nullif(trim(coalesce(nickname, '')), '') IS NOT NULL
    )
  );

-- ---------- referral_codes (INSERT only — no UPDATE hijack in Phase 1) ----------
CREATE POLICY referral_codes_select_anon
  ON public.referral_codes
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY referral_codes_insert_anon
  ON public.referral_codes
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    nullif(trim(referral_code), '') IS NOT NULL
    AND nullif(trim(nickname), '') IS NOT NULL
  );

-- ---------- referrals ----------
CREATE POLICY referrals_select_anon
  ON public.referrals
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY referrals_insert_anon
  ON public.referrals
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    nullif(trim(referrer_code), '') IS NOT NULL
    AND nullif(trim(referred_code), '') IS NOT NULL
  );

-- ---------- fortune_results (INSERT only — upsert UPDATE → Phase 2) ----------
CREATE POLICY fortune_results_select_anon
  ON public.fortune_results
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY fortune_results_insert_anon
  ON public.fortune_results
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    nullif(trim(seed_key), '') IS NOT NULL
    AND nullif(trim(fortune_type), '') IS NOT NULL
    AND result IS NOT NULL
  );

-- ############################################################################
-- E. Privileges aligned with Phase 1 (revoke client UPDATE/DELETE)
-- ############################################################################

GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;

GRANT SELECT, INSERT ON public.profiles TO anon, authenticated;
REVOKE UPDATE, DELETE ON public.profiles FROM anon, authenticated;

GRANT SELECT, INSERT ON public.community_posts TO anon, authenticated;
REVOKE UPDATE, DELETE ON public.community_posts FROM anon, authenticated;

GRANT SELECT, INSERT ON public.community_comments TO anon, authenticated;
REVOKE UPDATE, DELETE ON public.community_comments FROM anon, authenticated;

GRANT SELECT, INSERT ON public.community_post_likes TO anon, authenticated;
REVOKE UPDATE, DELETE ON public.community_post_likes FROM anon, authenticated;

GRANT SELECT, INSERT ON public.points TO anon, authenticated;
REVOKE UPDATE, DELETE ON public.points FROM anon, authenticated;

GRANT INSERT ON public.visit_logs TO anon, authenticated;
REVOKE SELECT, UPDATE, DELETE ON public.visit_logs FROM anon, authenticated;

GRANT SELECT, INSERT ON public.referral_codes TO anon, authenticated;
REVOKE UPDATE, DELETE ON public.referral_codes FROM anon, authenticated;

GRANT SELECT, INSERT ON public.referrals TO anon, authenticated;
REVOKE UPDATE, DELETE ON public.referrals FROM anon, authenticated;

GRANT SELECT, INSERT ON public.fortune_results TO anon, authenticated;
REVOKE UPDATE, DELETE ON public.fortune_results FROM anon, authenticated;

GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;

DO $$
BEGIN
  IF to_regclass('public.achievements') IS NOT NULL THEN
    EXECUTE 'REVOKE ALL ON public.achievements FROM anon, authenticated';
  END IF;
  IF to_regclass('public.notifications') IS NOT NULL THEN
    EXECUTE 'REVOKE ALL ON public.notifications FROM anon, authenticated';
  END IF;
END $$;
