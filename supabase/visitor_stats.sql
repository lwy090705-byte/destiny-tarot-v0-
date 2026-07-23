-- =============================================================================
-- Visitor stats — run in Supabase SQL Editor
-- File: supabase/visitor_stats.sql
-- =============================================================================
-- Prefer the unified RLS file for production:
--   supabase/rls_policies.sql  (includes this RPC + visit_logs + all tables)
--
-- This file remains for standalone visitor-stats-only deploys.
-- =============================================================================
-- REQUIRED: Section A (RPC) — fixes daily=0 caused by client selecting only
--           the first ~1000 of 7000+ visit_logs rows.
-- RECOMMENDED: Section B (RLS) — blocks anon SELECT of raw visit_logs.
--              Deploy Section A first (or together). After Section B, stats
--              must go through get_visitor_stats (client falls back only if SELECT
--              is still allowed).
-- =============================================================================

-- -----------------------------------------------------------------------------
-- Section A: get_visitor_stats(p_requester_nickname)
-- Unique visitors (prefer user_code, else lower(nickname))
-- Windows: Asia/Seoul calendar day / ISO week (Mon–Sun) / month / all-time
-- -----------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.get_visitor_stats(p_requester_nickname text)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  req text := lower(trim(coalesce(p_requester_nickname, '')));
  allowed boolean := false;
  today_kst date;
  week_start_kst date;
  month_start_kst date;
  v_daily integer := 0;
  v_weekly integer := 0;
  v_monthly integer := 0;
  v_total integer := 0;
BEGIN
  IF req = '' THEN
    RAISE EXCEPTION 'not authorized'
      USING ERRCODE = '42501';
  END IF;

  -- Prefer profiles.role / is_master; designated nickname is a secondary gate.
  -- Note: nickname is client-supplied (no Supabase Auth binding). Pair with RLS
  -- so raw visit_logs cannot be dumped; aggregates only via this function.
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles p
    WHERE lower(trim(p.nickname)) = req
      AND (
        p.is_master IS TRUE
        OR lower(trim(coalesce(p.role, ''))) IN ('master', 'operator')
        OR lower(trim(p.nickname)) = lower('대질주')
      )
  )
  INTO allowed;

  IF NOT allowed THEN
    RAISE EXCEPTION 'not authorized'
      USING ERRCODE = '42501';
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
    FROM public.visit_logs v
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
  FROM keyed k;

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

COMMENT ON FUNCTION public.get_visitor_stats(text) IS
  'Operator-only unique visitor counts (daily/weekly/monthly/total) using Asia/Seoul visit_date.';

REVOKE ALL ON FUNCTION public.get_visitor_stats(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_visitor_stats(text) TO anon, authenticated, service_role;

-- Smoke test (replace nickname if needed):
-- select public.get_visitor_stats('대질주');

-- -----------------------------------------------------------------------------
-- Section B: RLS — insert allowed, raw SELECT blocked for anon/authenticated
-- Duplicate visits: unique indexes → client treats 23505 as success.
-- -----------------------------------------------------------------------------

ALTER TABLE public.visit_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS visit_logs_insert_anyone ON public.visit_logs;
CREATE POLICY visit_logs_insert_anyone
  ON public.visit_logs
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- No SELECT/UPDATE/DELETE policies for anon|authenticated → denied by RLS.
GRANT INSERT ON public.visit_logs TO anon, authenticated;
REVOKE SELECT, UPDATE, DELETE ON public.visit_logs FROM anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.visit_logs TO service_role;
