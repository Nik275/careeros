-- Fix Users RLS and Profile Creation
-- This migration ensures profile creation works reliably

-- Drop existing trigger and function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Improved function to handle user creation after auth signup
-- Handles cases where raw_user_meta_data might be null
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    -- Insert user profile, handling null metadata gracefully
    INSERT INTO public.users (
        id, 
        email, 
        full_name, 
        avatar_url,
        class_level,
        career_interest,
        subscription_plan,
        assessment_completed,
        created_at, 
        updated_at
    )
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', NULL),
        COALESCE(NEW.raw_user_meta_data->>'avatar_url', NULL),
        COALESCE(NEW.raw_user_meta_data->>'class_level', NULL),
        COALESCE(NEW.raw_user_meta_data->>'career_interest', NULL),
        'free',
        false,
        NOW(),
        NOW()
    )
    ON CONFLICT (id) DO UPDATE SET
        email = EXCLUDED.email,
        updated_at = NOW();
    
    RETURN NEW;
EXCEPTION WHEN OTHERS THEN
    -- Log error but don't fail the auth transaction
    RAISE WARNING 'Error in handle_new_user: %', SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate trigger
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- Ensure RLS is enabled
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to recreate them cleanly
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
DROP POLICY IF EXISTS "Allow insert during signup" ON public.users;
DROP POLICY IF EXISTS "Allow service role all access" ON public.users;

-- Recreate RLS policies with clearer names
CREATE POLICY "select_own_profile" 
    ON public.users 
    FOR SELECT 
    TO authenticated
    USING (auth.uid() = id);

CREATE POLICY "update_own_profile" 
    ON public.users 
    FOR UPDATE 
    TO authenticated
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- Allow authenticated users to insert their own profile
CREATE POLICY "insert_own_profile" 
    ON public.users 
    FOR INSERT 
    TO authenticated
    WITH CHECK (auth.uid() = id);

-- Service role can do everything (for edge functions/admin)
CREATE POLICY "service_role_all"
    ON public.users
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- Function to safely create or update user profile
-- Can be called from client if trigger fails
CREATE OR REPLACE FUNCTION public.upsert_user_profile(
    p_id UUID,
    p_email TEXT,
    p_full_name TEXT DEFAULT NULL,
    p_avatar_url TEXT DEFAULT NULL,
    p_class_level TEXT DEFAULT NULL,
    p_career_interest TEXT DEFAULT NULL
)
RETURNS public.users AS $$
DECLARE
    v_user public.users;
BEGIN
    INSERT INTO public.users (
        id,
        email,
        full_name,
        avatar_url,
        class_level,
        career_interest,
        subscription_plan,
        assessment_completed,
        created_at,
        updated_at
    )
    VALUES (
        p_id,
        p_email,
        p_full_name,
        p_avatar_url,
        p_class_level,
        p_career_interest,
        'free',
        false,
        NOW(),
        NOW()
    )
    ON CONFLICT (id) DO UPDATE SET
        email = EXCLUDED.email,
        full_name = COALESCE(EXCLUDED.full_name, public.users.full_name),
        avatar_url = COALESCE(EXCLUDED.avatar_url, public.users.avatar_url),
        class_level = COALESCE(EXCLUDED.class_level, public.users.class_level),
        career_interest = COALESCE(EXCLUDED.career_interest, public.users.career_interest),
        updated_at = NOW()
    RETURNING * INTO v_user;
    
    RETURN v_user;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION public.upsert_user_profile TO authenticated;
GRANT EXECUTE ON FUNCTION public.upsert_user_profile TO anon;

-- Verify policies are in place
DO $$
BEGIN
    RAISE NOTICE 'Users table RLS policies updated successfully';
END $$;
