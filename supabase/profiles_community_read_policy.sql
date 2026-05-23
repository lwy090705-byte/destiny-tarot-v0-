-- Run in Supabase SQL Editor if community author levels always show as 입문자.
-- Allows anon/authenticated clients to read display fields on profiles for community UI.

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "profiles_select_community_display" ON public.profiles;

CREATE POLICY "profiles_select_community_display"
  ON public.profiles
  FOR SELECT
  TO anon, authenticated
  USING (true);
