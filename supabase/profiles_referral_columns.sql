-- Run in Supabase SQL Editor so referrer lookup works from `profiles`.

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS referral_code text,
  ADD COLUMN IF NOT EXISTS user_code text;

CREATE INDEX IF NOT EXISTS profiles_referral_code_idx ON public.profiles (referral_code);
CREATE INDEX IF NOT EXISTS profiles_user_code_idx ON public.profiles (user_code);
