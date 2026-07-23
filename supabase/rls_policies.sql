-- =============================================================================
-- DEPRECATED — do not apply this file to production
-- =============================================================================
-- supabase/rls_policies.sql previously granted anon UPDATE/DELETE with
-- USING (true). That clears the "rls_disabled_in_public" warning but still
-- allows any PostgREST caller with the anon key to modify/delete other users'
-- rows (nickname/author are client-supplied — not ownership).
--
-- Use instead (in order):
--   1. supabase/rls_safe_phase1.sql
--   2. supabase/rls_secure_phase2.sql
--   3. Deploy server APIs that use SUPABASE_SERVICE_ROLE_KEY + Pi session cookie
--
-- See security review notes in the agent/PR discussion for attack matrix.
-- =============================================================================

DO $$
BEGIN
  RAISE NOTICE 'rls_policies.sql is deprecated. Run rls_safe_phase1.sql then rls_secure_phase2.sql.';
END $$;
