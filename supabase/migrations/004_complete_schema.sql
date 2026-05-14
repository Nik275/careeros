-- CareerOS Complete Schema Fix
-- Run this in Supabase SQL Editor to fix all missing tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- USERS TABLE (extends auth.users)
-- ============================================
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    class_level TEXT CHECK (class_level IN ('class_10', 'class_11', 'class_12', 'dropper', 'college_student')),
    career_interest TEXT,
    subscription_plan TEXT DEFAULT 'free' CHECK (subscription_plan IN ('free', 'pro', 'premium')),
    assessment_completed BOOLEAN DEFAULT false,
    current_assessment_id UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
DROP POLICY IF EXISTS "Allow insert during signup" ON public.users;
DROP POLICY IF EXISTS "select_own_profile" ON public.users;
DROP POLICY IF EXISTS "update_own_profile" ON public.users;
DROP POLICY IF EXISTS "insert_own_profile" ON public.users;
DROP POLICY IF EXISTS "service_role_all" ON public.users;

-- Create RLS policies
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

CREATE POLICY "insert_own_profile" 
    ON public.users 
    FOR INSERT 
    TO authenticated
    WITH CHECK (auth.uid() = id);

CREATE POLICY "service_role_all"
    ON public.users
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- Allow anon to insert during signup
CREATE POLICY "anon_insert_profile"
    ON public.users
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- ============================================
-- ASSESSMENT TABLES
-- ============================================

-- Assessment Sessions
CREATE TABLE IF NOT EXISTS public.assessment_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    current_step INTEGER DEFAULT 0,
    total_steps INTEGER DEFAULT 8,
    progress INTEGER DEFAULT 0,
    status TEXT DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed', 'abandoned')),
    completed_steps JSONB DEFAULT '[]',
    last_saved_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.assessment_sessions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "select_own_sessions" ON public.assessment_sessions;
DROP POLICY IF EXISTS "insert_own_sessions" ON public.assessment_sessions;
DROP POLICY IF EXISTS "update_own_sessions" ON public.assessment_sessions;
DROP POLICY IF EXISTS "delete_own_sessions" ON public.assessment_sessions;

-- Create policies
CREATE POLICY "select_own_sessions"
    ON public.assessment_sessions
    FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "insert_own_sessions"
    ON public.assessment_sessions
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "update_own_sessions"
    ON public.assessment_sessions
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "delete_own_sessions"
    ON public.assessment_sessions
    FOR DELETE
    TO authenticated
    USING (auth.uid() = user_id);

-- Assessment Answers
CREATE TABLE IF NOT EXISTS public.assessment_answers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID NOT NULL REFERENCES public.assessment_sessions(id) ON DELETE CASCADE,
    question_id TEXT NOT NULL,
    category TEXT NOT NULL,
    answer JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(session_id, question_id)
);

-- Enable RLS
ALTER TABLE public.assessment_answers ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "select_own_answers" ON public.assessment_answers;
DROP POLICY IF EXISTS "insert_own_answers" ON public.assessment_answers;
DROP POLICY IF EXISTS "update_own_answers" ON public.assessment_answers;

-- Create policies (using session ownership)
CREATE POLICY "select_own_answers"
    ON public.assessment_answers
    FOR SELECT
    TO authenticated
    USING (EXISTS (
        SELECT 1 FROM public.assessment_sessions 
        WHERE id = assessment_answers.session_id 
        AND user_id = auth.uid()
    ));

CREATE POLICY "insert_own_answers"
    ON public.assessment_answers
    FOR INSERT
    TO authenticated
    WITH CHECK (EXISTS (
        SELECT 1 FROM public.assessment_sessions 
        WHERE id = assessment_answers.session_id 
        AND user_id = auth.uid()
    ));

CREATE POLICY "update_own_answers"
    ON public.assessment_answers
    FOR UPDATE
    TO authenticated
    USING (EXISTS (
        SELECT 1 FROM public.assessment_sessions 
        WHERE id = assessment_answers.session_id 
        AND user_id = auth.uid()
    ))
    WITH CHECK (EXISTS (
        SELECT 1 FROM public.assessment_sessions 
        WHERE id = assessment_answers.session_id 
        AND user_id = auth.uid()
    ));

-- Student Preferences
CREATE TABLE IF NOT EXISTS public.student_preferences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID NOT NULL REFERENCES public.assessment_sessions(id) ON DELETE CASCADE,
    target_exams TEXT[] DEFAULT '{}',
    dream_careers TEXT[] DEFAULT '{}',
    preferred_field TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.student_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select_own_preferences"
    ON public.student_preferences
    FOR SELECT
    TO authenticated
    USING (EXISTS (
        SELECT 1 FROM public.assessment_sessions 
        WHERE id = student_preferences.session_id 
        AND user_id = auth.uid()
    ));

CREATE POLICY "insert_own_preferences"
    ON public.student_preferences
    FOR INSERT
    TO authenticated
    WITH CHECK (EXISTS (
        SELECT 1 FROM public.assessment_sessions 
        WHERE id = student_preferences.session_id 
        AND user_id = auth.uid()
    ));

-- Recommendations
CREATE TABLE IF NOT EXISTS public.recommendations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    type TEXT NOT NULL CHECK (type IN ('career', 'exam', 'college', 'skill')),
    title TEXT NOT NULL,
    description TEXT,
    data JSONB,
    confidence DECIMAL(3,2),
    is_viewed BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.recommendations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select_own_recommendations"
    ON public.recommendations
    FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "insert_own_recommendations"
    ON public.recommendations
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

-- ============================================
-- TRIGGERS & FUNCTIONS
-- ============================================

-- Function to handle new user creation
DROP FUNCTION IF EXISTS public.handle_new_user();
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
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
    RAISE WARNING 'Error in handle_new_user: %', SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Timestamps triggers
DROP TRIGGER IF EXISTS update_users_updated_at ON public.users;
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON public.users
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_assessment_sessions_updated_at ON public.assessment_sessions;
CREATE TRIGGER update_assessment_sessions_updated_at
    BEFORE UPDATE ON public.assessment_sessions
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_assessment_answers_updated_at ON public.assessment_answers;
CREATE TRIGGER update_assessment_answers_updated_at
    BEFORE UPDATE ON public.assessment_answers
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================
-- AUTH ATTEMPTS (Rate Limiting)
-- ============================================
CREATE TABLE IF NOT EXISTS public.auth_attempts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT NOT NULL,
    ip_address TEXT,
    attempt_type TEXT NOT NULL,
    success BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_auth_attempts_email ON public.auth_attempts(email, created_at);
CREATE INDEX IF NOT EXISTS idx_auth_attempts_ip ON public.auth_attempts(ip_address, created_at);
CREATE INDEX IF NOT EXISTS idx_assessment_sessions_user_id ON public.assessment_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_assessment_answers_session_id ON public.assessment_answers(session_id);

-- Rate limiting functions
CREATE OR REPLACE FUNCTION public.check_auth_rate_limit(
    p_email TEXT,
    p_ip_address TEXT,
    p_attempt_type TEXT,
    p_max_attempts INTEGER DEFAULT 5,
    p_window_minutes INTEGER DEFAULT 15
)
RETURNS BOOLEAN AS $$
DECLARE
    attempt_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO attempt_count
    FROM public.auth_attempts
    WHERE (email = p_email OR ip_address = p_ip_address)
        AND attempt_type = p_attempt_type
        AND success = false
        AND created_at > NOW() - INTERVAL '1 minute' * p_window_minutes;
    
    RETURN attempt_count < p_max_attempts;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.log_auth_attempt(
    p_email TEXT,
    p_ip_address TEXT,
    p_attempt_type TEXT,
    p_success BOOLEAN
)
RETURNS VOID AS $$
BEGIN
    INSERT INTO public.auth_attempts (email, ip_address, attempt_type, success, created_at)
    VALUES (p_email, p_ip_address, p_attempt_type, p_success, NOW());
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- GRANTS
-- ============================================
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON public.users TO authenticated;
GRANT INSERT ON public.users TO anon;
GRANT ALL ON public.assessment_sessions TO authenticated;
GRANT ALL ON public.assessment_answers TO authenticated;
GRANT ALL ON public.student_preferences TO authenticated;
GRANT ALL ON public.recommendations TO authenticated;
GRANT ALL ON public.auth_attempts TO authenticated;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- Success message
SELECT 'CareerOS schema created successfully!' as status;
