-- Atomic like / comment counters for community_posts.
-- Run once in Supabase SQL Editor (safe to re-run).
-- Client falls back to non-atomic update if RPC is missing.

CREATE OR REPLACE FUNCTION public.increment_community_post_likes(p_post_id uuid)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_likes integer;
BEGIN
  UPDATE public.community_posts
  SET likes = COALESCE(likes, 0) + 1
  WHERE id = p_post_id
  RETURNING likes INTO new_likes;

  IF new_likes IS NULL THEN
    RAISE EXCEPTION 'post not found: %', p_post_id;
  END IF;

  RETURN new_likes;
END;
$$;

CREATE OR REPLACE FUNCTION public.adjust_community_post_comments(
  p_post_id uuid,
  p_delta integer
)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_count integer;
BEGIN
  UPDATE public.community_posts
  SET comments_count = GREATEST(0, COALESCE(comments_count, 0) + p_delta)
  WHERE id = p_post_id
  RETURNING comments_count INTO new_count;

  IF new_count IS NULL THEN
    RAISE EXCEPTION 'post not found: %', p_post_id;
  END IF;

  RETURN new_count;
END;
$$;

GRANT EXECUTE ON FUNCTION public.increment_community_post_likes(uuid) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.adjust_community_post_comments(uuid, integer) TO anon, authenticated;
