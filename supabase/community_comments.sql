-- Run in Supabase SQL Editor if community_comments does not exist yet.

CREATE TABLE IF NOT EXISTS public.community_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  post_id uuid NOT NULL REFERENCES public.community_posts (id) ON DELETE CASCADE,
  author text NOT NULL,
  content text NOT NULL
);

CREATE INDEX IF NOT EXISTS community_comments_post_id_idx
  ON public.community_comments (post_id);
