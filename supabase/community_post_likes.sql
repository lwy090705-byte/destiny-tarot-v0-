-- Run in Supabase SQL Editor if community_post_likes does not exist yet.

CREATE TABLE IF NOT EXISTS public.community_post_likes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  post_id uuid NOT NULL REFERENCES public.community_posts (id) ON DELETE CASCADE,
  user_code text NOT NULL,
  nickname text NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS community_post_likes_post_user_idx
  ON public.community_post_likes (post_id, user_code);
