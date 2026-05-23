-- Run in Supabase SQL Editor if inserts/selects fail with RLS errors (42501).
-- Allows anonymous read/write for community_posts (anon key from the app).

ALTER TABLE public.community_posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "community_posts_select_anon" ON public.community_posts;
DROP POLICY IF EXISTS "community_posts_insert_anon" ON public.community_posts;

CREATE POLICY "community_posts_select_anon"
  ON public.community_posts
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "community_posts_insert_anon"
  ON public.community_posts
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
