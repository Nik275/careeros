-- CareerOS Initial Schema
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    class_level TEXT CHECK (class_level IN ('class_10', 'class_11', 'class_12', 'dropper', 'college_student')),
    career_interest TEXT,
    subscription_plan TEXT DEFAULT 'free' CHECK (subscription_plan IN ('free', 'pro', 'premium')),
    assessment_completed BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own profile" 
    ON public.users 
    FOR SELECT 
    USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
    ON public.users 
    FOR UPDATE 
    USING (auth.uid() = id);

CREATE POLICY "Allow insert during signup" 
    ON public.users 
    FOR INSERT 
    WITH CHECK (auth.uid() = id);

-- Function to handle user creation after auth signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (id, email, full_name, created_at, updated_at)
    VALUES (
        NEW.id,
        NEW.email,
        NEW.raw_user_meta_data->>'full_name',
        NOW(),
        NOW()
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for updating timestamp
DROP TRIGGER IF EXISTS update_users_updated_at ON public.users;
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON public.users
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Auth attempts rate limiting table
CREATE TABLE IF NOT EXISTS public.auth_attempts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT NOT NULL,
    ip_address TEXT,
    attempt_type TEXT NOT NULL, -- 'login', 'signup', 'reset'
    success BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for rate limiting queries
CREATE INDEX idx_auth_attempts_email ON public.auth_attempts(email, created_at);
CREATE INDEX idx_auth_attempts_ip ON public.auth_attempts(ip_address, created_at);

-- Function to check rate limit
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

-- Function to log auth attempt
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

-- Cleanup old auth attempts (keep last 30 days)
CREATE OR REPLACE FUNCTION public.cleanup_old_auth_attempts()
RETURNS void AS $$
BEGIN
    DELETE FROM public.auth_attempts
    WHERE created_at < NOW() - INTERVAL '30 days';
END;
$$ LANGUAGE plpgsql;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON public.users TO authenticated;
GRANT INSERT ON public.users TO anon;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;