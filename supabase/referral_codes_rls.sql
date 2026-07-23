-- DEPRECATED for production: use supabase/rls_policies.sql instead.
-- Run in Supabase SQL Editor for cross-device referrer +30P payouts.

CREATE TABLE IF NOT EXISTS public.referral_codes (
  referral_code text PRIMARY KEY,
  nickname text NOT NULL,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.referral_codes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "referral_codes_select_anon" ON public.referral_codes;
DROP POLICY IF EXISTS "referral_codes_insert_anon" ON public.referral_codes;
DROP POLICY IF EXISTS "referral_codes_update_anon" ON public.referral_codes;

CREATE POLICY "referral_codes_select_anon"
  ON public.referral_codes
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "referral_codes_insert_anon"
  ON public.referral_codes
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "referral_codes_update_anon"
  ON public.referral_codes
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);
