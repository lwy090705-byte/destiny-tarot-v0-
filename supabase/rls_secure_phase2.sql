-- =============================================================================
-- RLS SECURE PHASE 2 — Pi session / service_role mutations
-- File: supabase/rls_secure_phase2.sql
-- =============================================================================
-- Prerequisites:
--   1. supabase/rls_safe_phase1.sql already applied
--   2. Server has SUPABASE_SERVICE_ROLE_KEY (never expose to browser)
--   3. Deploy Next.js routes under app/api/operator/* and app/api/community/*
--   4. Link profiles.pi_uid when users authenticate with Pi
--
-- This file:
--   • Adds profiles.pi_uid for binding Pi identity → profile
--   • Creates operator visit-stats RPC keyed by pi_uid (NOT nickname)
--   • Ensures anon has NO UPDATE/DELETE policies (re-assert Phase 1)
--   • Does NOT re-open anon UPDATE/DELETE
--
-- SECURITY DEFINER rules used here:
--   • SET search_path = public (fixed; all objects schema-qualified)
--   • EXECUTE granted to service_role only (called from server after Pi cookie verify)
--   • Operator check uses profiles.pi_uid + is_master/role — not raw nickname alone
-- =============================================================================

-- ############################################################################
-- A. Bind Pi UID on profiles
-- ############################################################################

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS pi_uid text;

CREATE UNIQUE INDEX IF NOT EXISTS profiles_pi_uid_unique
  ON public.profiles (pi_uid)
  WHERE pi_uid IS NOT NULL AND length(trim(pi_uid)) > 0;

COMMENT ON COLUMN public.profiles.pi_uid IS
  'Pi Network user uid from verified session; required for operator/server mutations.';

-- ############################################################################
-- B. Operator visitor stats by Pi UID (no nickname spoof)
-- ############################################################################

CREATE OR REPLACE FUNCTION public.get_visitor_stats_for_pi_uid(p_pi_uid text)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  uid text := trim(coalesce(p_pi_uid, ''));
  allowed boolean := false;
  today_kst date;
  week_start_kst date;
  month_start_kst date;
  v_daily integer := 0;
  v_weekly integer := 0;
  v_monthly integer := 0;
  v_total integer := 0;
BEGIN
  IF uid = '' THEN
    RAISE EXCEPTION 'not authorized' USING ERRCODE = '42501';
  END IF;

  -- Operator must have matching pi_uid AND master/operator flag.
  -- Nickname string alone is never sufficient.
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles AS p
    WHERE p.pi_uid = uid
      AND (
        p.is_master IS TRUE
        OR lower(trim(coalesce(p.role, ''))) IN ('master', 'operator')
      )
  )
  INTO allowed;

  IF NOT allowed THEN
    RAISE EXCEPTION 'not authorized' USING ERRCODE = '42501';
  END IF;

  today_kst := (timezone('Asia/Seoul', now()))::date;
  week_start_kst := today_kst - ((EXTRACT(ISODOW FROM today_kst)::integer) - 1);
  month_start_kst := date_trunc('month', today_kst::timestamp)::date;

  WITH keyed AS (
    SELECT
      v.visit_date,
      CASE
        WHEN nullif(trim(v.user_code), '') IS NOT NULL
          THEN 'code:' || upper(trim(v.user_code))
        WHEN nullif(trim(v.nickname), '') IS NOT NULL
          THEN 'nick:' || lower(trim(v.nickname))
        ELSE NULL
      END AS visitor_key
    FROM public.visit_logs AS v
  )
  SELECT
    COUNT(DISTINCT k.visitor_key) FILTER (
      WHERE k.visitor_key IS NOT NULL AND k.visit_date = today_kst
    ),
    COUNT(DISTINCT k.visitor_key) FILTER (
      WHERE k.visitor_key IS NOT NULL
        AND k.visit_date >= week_start_kst
        AND k.visit_date <= today_kst
    ),
    COUNT(DISTINCT k.visitor_key) FILTER (
      WHERE k.visitor_key IS NOT NULL
        AND k.visit_date >= month_start_kst
        AND k.visit_date <= today_kst
    ),
    COUNT(DISTINCT k.visitor_key) FILTER (
      WHERE k.visitor_key IS NOT NULL
    )
  INTO v_daily, v_weekly, v_monthly, v_total
  FROM keyed AS k;

  RETURN json_build_object(
    'daily', coalesce(v_daily, 0),
    'weekly', coalesce(v_weekly, 0),
    'monthly', coalesce(v_monthly, 0),
    'total', coalesce(v_total, 0),
    'timezone', 'Asia/Seoul',
    'today', to_char(today_kst, 'YYYY-MM-DD')
  );
END;
$$;

COMMENT ON FUNCTION public.get_visitor_stats_for_pi_uid(text) IS
  'Operator unique visitor stats; authorize via profiles.pi_uid + master role.';

REVOKE ALL ON FUNCTION public.get_visitor_stats_for_pi_uid(text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.get_visitor_stats_for_pi_uid(text) FROM anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_visitor_stats_for_pi_uid(text) TO service_role;

-- Keep deprecated nickname RPC disabled for clients
CREATE OR REPLACE FUNCTION public.get_visitor_stats(p_requester_nickname text)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RAISE EXCEPTION 'not authorized: use get_visitor_stats_for_pi_uid via server'
    USING ERRCODE = '42501';
END;
$$;

REVOKE ALL ON FUNCTION public.get_visitor_stats(text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.get_visitor_stats(text) FROM anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_visitor_stats(text) TO service_role;

-- ############################################################################
-- C. Soft-hide / delete helpers (service_role only — called after Pi verify)
--     Column-limited updates; ownership enforced in Next.js using pi_uid map.
-- ############################################################################

CREATE OR REPLACE FUNCTION public.admin_hide_community_post(
  p_post_id uuid,
  p_hidden_by text
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.community_posts AS cp
  SET
    is_hidden = true,
    hidden_by = nullif(trim(p_hidden_by), ''),
    hidden_at = now()
  WHERE cp.id = p_post_id;

  RETURN FOUND;
END;
$$;

CREATE OR REPLACE FUNCTION public.admin_delete_community_post(p_post_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.community_post_likes AS l WHERE l.post_id = p_post_id;
  DELETE FROM public.community_comments AS c WHERE c.post_id = p_post_id;
  DELETE FROM public.community_posts AS p WHERE p.id = p_post_id;
  RETURN FOUND;
END;
$$;

CREATE OR REPLACE FUNCTION public.admin_delete_community_comment(p_comment_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.community_comments AS c WHERE c.id = p_comment_id;
  RETURN FOUND;
END;
$$;

CREATE OR REPLACE FUNCTION public.admin_hide_community_comment(
  p_comment_id uuid,
  p_hidden_by text
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.community_comments AS c
  SET
    is_hidden = true,
    hidden_by = nullif(trim(p_hidden_by), ''),
    hidden_at = now()
  WHERE c.id = p_comment_id;

  RETURN FOUND;
END;
$$;

REVOKE ALL ON FUNCTION public.admin_hide_community_post(uuid, text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.admin_delete_community_post(uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.admin_delete_community_comment(uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.admin_hide_community_comment(uuid, text) FROM PUBLIC;

REVOKE ALL ON FUNCTION public.admin_hide_community_post(uuid, text) FROM anon, authenticated;
REVOKE ALL ON FUNCTION public.admin_delete_community_post(uuid) FROM anon, authenticated;
REVOKE ALL ON FUNCTION public.admin_delete_community_comment(uuid) FROM anon, authenticated;
REVOKE ALL ON FUNCTION public.admin_hide_community_comment(uuid, text) FROM anon, authenticated;

GRANT EXECUTE ON FUNCTION public.admin_hide_community_post(uuid, text) TO service_role;
GRANT EXECUTE ON FUNCTION public.admin_delete_community_post(uuid) TO service_role;
GRANT EXECUTE ON FUNCTION public.admin_delete_community_comment(uuid) TO service_role;
GRANT EXECUTE ON FUNCTION public.admin_hide_community_comment(uuid, text) TO service_role;

-- ############################################################################
-- D. Re-assert: no anon UPDATE/DELETE policies
-- ############################################################################

DROP POLICY IF EXISTS profiles_update_anon ON public.profiles;
DROP POLICY IF EXISTS profiles_delete_anon ON public.profiles;
DROP POLICY IF EXISTS community_posts_update_anon ON public.community_posts;
DROP POLICY IF EXISTS community_posts_delete_anon ON public.community_posts;
DROP POLICY IF EXISTS community_comments_update_anon ON public.community_comments;
DROP POLICY IF EXISTS community_comments_delete_anon ON public.community_comments;
DROP POLICY IF EXISTS community_post_likes_delete_anon ON public.community_post_likes;
DROP POLICY IF EXISTS referral_codes_update_anon ON public.referral_codes;
DROP POLICY IF EXISTS fortune_results_update_anon ON public.fortune_results;

REVOKE UPDATE, DELETE ON public.profiles FROM anon, authenticated;
REVOKE UPDATE, DELETE ON public.community_posts FROM anon, authenticated;
REVOKE UPDATE, DELETE ON public.community_comments FROM anon, authenticated;
REVOKE UPDATE, DELETE ON public.community_post_likes FROM anon, authenticated;
REVOKE UPDATE, DELETE ON public.points FROM anon, authenticated;
REVOKE UPDATE, DELETE ON public.referral_codes FROM anon, authenticated;
REVOKE UPDATE, DELETE ON public.referrals FROM anon, authenticated;
REVOKE UPDATE, DELETE ON public.fortune_results FROM anon, authenticated;
REVOKE SELECT, UPDATE, DELETE ON public.visit_logs FROM anon, authenticated;

-- Manual operator bootstrap (run once with service role / SQL editor as postgres):
-- UPDATE public.profiles
-- SET pi_uid = '<verified-pi-uid>', role = 'master', is_master = true, level_title = '운영자'
-- WHERE lower(trim(nickname)) = lower('대질주');
