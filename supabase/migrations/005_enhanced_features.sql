-- CareerOS Enhanced Features Schema
-- Adds bookmarks, activity logs, career details, and roadmap tracking

-- ============================================
-- ENHANCED RECOMMENDATIONS TABLE
-- ============================================
ALTER TABLE public.recommendations 
ADD COLUMN IF NOT EXISTS salary_range JSONB,
ADD COLUMN IF NOT EXISTS growth_rate DECIMAL(5,2),
ADD COLUMN IF NOT EXISTS demand_level TEXT CHECK (demand_level IN ('high', 'medium', 'low')),
ADD COLUMN IF NOT EXISTS education_required TEXT,
ADD COLUMN IF NOT EXISTS skills_required TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS top_colleges JSONB,
ADD COLUMN IF NOT EXISTS related_exams JSONB,
ADD COLUMN IF NOT EXISTS career_path JSONB,
ADD COLUMN IF NOT EXISTS is_bookmarked BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS view_count INTEGER DEFAULT 0;

-- ============================================
-- BOOKMARKS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.bookmarks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    item_type TEXT NOT NULL CHECK (item_type IN ('career', 'college', 'exam', 'skill')),
    item_id UUID NOT NULL,
    item_data JSONB NOT NULL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, item_type, item_id)
);

-- Enable RLS
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "select_own_bookmarks"
    ON public.bookmarks
    FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "insert_own_bookmarks"
    ON public.bookmarks
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "delete_own_bookmarks"
    ON public.bookmarks
    FOR DELETE
    TO authenticated
    USING (auth.uid() = user_id);

-- ============================================
-- ACTIVITY LOGS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    activity_type TEXT NOT NULL CHECK (activity_type IN (
        'assessment_started', 'assessment_completed', 'recommendation_viewed',
        'career_bookmarked', 'college_saved', 'roadmap_updated', 'profile_updated',
        'recommendation_generated', 'milestone_achieved'
    )),
    title TEXT NOT NULL,
    description TEXT,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "select_own_activity"
    ON public.activity_logs
    FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "insert_own_activity"
    ON public.activity_logs
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

-- ============================================
-- CAREER DETAILS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.career_details (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    short_description TEXT,
    
    -- Salary Information
    entry_salary INTEGER,
    mid_salary INTEGER,
    senior_salary INTEGER,
    salary_currency TEXT DEFAULT 'INR',
    
    -- Career Stats
    growth_rate DECIMAL(5,2),
    demand_level TEXT CHECK (demand_level IN ('high', 'medium', 'low')),
    job_outlook TEXT,
    
    -- Requirements
    education_required TEXT[] DEFAULT '{}',
    skills_required TEXT[] DEFAULT '{}',
    certifications TEXT[] DEFAULT '{}',
    
    -- Career Path
    entry_roles TEXT[] DEFAULT '{}',
    mid_roles TEXT[] DEFAULT '{}',
    senior_roles TEXT[] DEFAULT '{}',
    
    -- Related Information
    top_colleges JSONB,
    related_exams JSONB,
    related_careers UUID[] DEFAULT '{}',
    
    -- Resources
    learning_resources JSONB,
    industry_insights JSONB,
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    view_count INTEGER DEFAULT 0,
    bookmark_count INTEGER DEFAULT 0
);

-- Enable RLS
ALTER TABLE public.career_details ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "select_career_details"
    ON public.career_details
    FOR SELECT
    TO authenticated
    USING (true);

-- ============================================
-- USER ROADMAPS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.user_roadmaps (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    career_id UUID REFERENCES public.career_details(id),
    title TEXT NOT NULL,
    description TEXT,
    
    -- Roadmap Structure
    milestones JSONB[] DEFAULT '{}',
    current_milestone_index INTEGER DEFAULT 0,
    overall_progress INTEGER DEFAULT 0,
    
    -- Status
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'paused')),
    target_date TIMESTAMP WITH TIME ZONE,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.user_roadmaps ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "select_own_roadmaps"
    ON public.user_roadmaps
    FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "insert_own_roadmaps"
    ON public.user_roadmaps
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "update_own_roadmaps"
    ON public.user_roadmaps
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- ============================================
-- CAREER MATCHES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.career_matches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    career_id UUID REFERENCES public.career_details(id),
    session_id UUID REFERENCES public.assessment_sessions(id),
    
    -- Match Scores
    overall_score DECIMAL(5,2) NOT NULL,
    skill_match DECIMAL(5,2),
    interest_match DECIMAL(5,2),
    personality_match DECIMAL(5,2),
    
    -- Match Details
    matching_skills TEXT[] DEFAULT '{}',
    skill_gaps TEXT[] DEFAULT '{}',
    reasoning TEXT,
    
    -- Status
    is_viewed BOOLEAN DEFAULT false,
    is_saved BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.career_matches ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "select_own_matches"
    ON public.career_matches
    FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "insert_own_matches"
    ON public.career_matches
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX IF NOT EXISTS idx_bookmarks_user_id ON public.bookmarks(user_id);
CREATE INDEX IF NOT EXISTS idx_bookmarks_item_type ON public.bookmarks(item_type);
CREATE INDEX IF NOT EXISTS idx_activity_logs_user_id ON public.activity_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_created_at ON public.activity_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_career_details_category ON public.career_details(category);
CREATE INDEX IF NOT EXISTS idx_career_details_slug ON public.career_details(slug);
CREATE INDEX IF NOT EXISTS idx_user_roadmaps_user_id ON public.user_roadmaps(user_id);
CREATE INDEX IF NOT EXISTS idx_career_matches_user_id ON public.career_matches(user_id);
CREATE INDEX IF NOT EXISTS idx_career_matches_score ON public.career_matches(overall_score DESC);

-- ============================================
-- FUNCTIONS
-- ============================================

-- Function to log activity
CREATE OR REPLACE FUNCTION public.log_activity(
    p_user_id UUID,
    p_activity_type TEXT,
    p_title TEXT,
    p_description TEXT DEFAULT NULL,
    p_metadata JSONB DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
    v_activity_id UUID;
BEGIN
    INSERT INTO public.activity_logs (user_id, activity_type, title, description, metadata)
    VALUES (p_user_id, p_activity_type, p_title, p_description, p_metadata)
    RETURNING id INTO v_activity_id;
    
    RETURN v_activity_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update career view count
CREATE OR REPLACE FUNCTION public.increment_career_views(p_career_id UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE public.career_details
    SET view_count = view_count + 1
    WHERE id = p_career_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get top career matches for user
CREATE OR REPLACE FUNCTION public.get_top_career_matches(
    p_user_id UUID,
    p_limit INTEGER DEFAULT 5
)
RETURNS TABLE (
    career_id UUID,
    title TEXT,
    overall_score DECIMAL,
    matching_skills TEXT[],
    reasoning TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        cm.career_id,
        cd.title,
        cm.overall_score,
        cm.matching_skills,
        cm.reasoning
    FROM public.career_matches cm
    JOIN public.career_details cd ON cm.career_id = cd.id
    WHERE cm.user_id = p_user_id
    ORDER BY cm.overall_score DESC
    LIMIT p_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- SAMPLE CAREER DATA
-- ============================================
INSERT INTO public.career_details (
    title, slug, category, description, short_description,
    entry_salary, mid_salary, senior_salary,
    growth_rate, demand_level, job_outlook,
    education_required, skills_required, certifications,
    entry_roles, mid_roles, senior_roles,
    top_colleges, related_exams,
    learning_resources, industry_insights
) VALUES 
(
    'Software Engineer',
    'software-engineer',
    'Technology',
    'Software engineers design, develop, and maintain software applications and systems. They work on everything from mobile apps to complex enterprise systems.',
    'Build applications and systems that power the digital world',
    600000, 1500000, 3000000,
    25.0, 'high', 'Excellent growth with increasing digitization',
    ARRAY['B.Tech/B.E. in CS/IT', 'BCA', 'B.Sc. Computer Science'],
    ARRAY['Programming', 'Problem Solving', 'System Design', 'Data Structures', 'Algorithms'],
    ARRAY['AWS Certified', 'Google Cloud Certified', 'Microsoft Azure'],
    ARRAY['Junior Developer', 'Associate Engineer', 'Trainee'],
    ARRAY['Software Engineer', 'Senior Developer', 'Tech Lead'],
    ARRAY['Principal Engineer', 'Architect', 'Engineering Manager'],
    '[
        {"name": "IIT Bombay", "ranking": 1, "location": "Mumbai"},
        {"name": "IIT Delhi", "ranking": 2, "location": "Delhi"},
        {"name": "BITS Pilani", "ranking": 3, "location": "Pilani"}
    ]'::jsonb,
    '[
        {"name": "JEE Main", "difficulty": "High", "type": "Engineering Entrance"},
        {"name": "BITSAT", "difficulty": "High", "type": "University Entrance"}
    ]'::jsonb,
    '[
        {"type": "course", "title": "Full Stack Development", "platform": "Coursera"},
        {"type": "book", "title": "Clean Code", "author": "Robert Martin"}
    ]'::jsonb,
    '[
        {"trend": "AI/ML Integration", "description": "Increasing demand for AI-powered applications"},
        {"trend": "Cloud Native", "description": "Shift towards cloud-first architecture"}
    ]'::jsonb
),
(
    'Data Scientist',
    'data-scientist',
    'Technology',
    'Data scientists analyze complex datasets to extract insights and build predictive models. They combine statistics, programming, and domain expertise.',
    'Turn data into actionable insights and predictions',
    800000, 2000000, 5000000,
    35.0, 'high', 'Massive growth in AI/ML era',
    ARRAY['B.Tech/B.E.', 'M.Sc. Statistics', 'MBA with Analytics'],
    ARRAY['Python', 'Machine Learning', 'Statistics', 'SQL', 'Data Visualization'],
    ARRAY['Google Data Analytics', 'AWS Machine Learning', 'TensorFlow Developer'],
    ARRAY['Data Analyst', 'Junior Data Scientist', 'Analytics Associate'],
    ARRAY['Data Scientist', 'Senior Data Scientist', 'ML Engineer'],
    ARRAY['Principal Data Scientist', 'Head of Data Science', 'Chief Data Officer'],
    '[
        {"name": "IIT Kharagpur", "ranking": 1, "location": "Kharagpur"},
        {"name": "ISI Kolkata", "ranking": 2, "location": "Kolkata"},
        {"name": "IIT Madras", "ranking": 3, "location": "Chennai"}
    ]'::jsonb,
    '[
        {"name": "GATE", "difficulty": "High", "type": "PG Entrance"},
        {"name": "JAM", "difficulty": "High", "type": "M.Sc. Entrance"}
    ]'::jsonb,
    '[
        {"type": "course", "title": "Machine Learning Specialization", "platform": "Coursera"},
        {"type": "book", "title": "Hands-On Machine Learning", "author": "Aurélien Géron"}
    ]'::jsonb,
    '[
        {"trend": "Generative AI", "description": "Rise of LLMs and generative models"},
        {"trend": "AutoML", "description": "Automated machine learning platforms"}
    ]'::jsonb
),
(
    'Doctor (MBBS)',
    'doctor-mbbs',
    'Healthcare',
    'Medical doctors diagnose and treat illnesses, injuries, and other health conditions. They work in hospitals, clinics, and private practice.',
    'Save lives and improve patient health outcomes',
    800000, 2000000, 5000000,
    15.0, 'high', 'Always in demand, stable career',
    ARRAY['MBBS', 'MD/MS', 'DNB'],
    ARRAY['Medical Knowledge', 'Patient Care', 'Diagnosis', 'Surgery', 'Communication'],
    ARRAY['Medical License', 'Specialization Certificate', 'Fellowship'],
    ARRAY['Resident Doctor', 'House Officer', 'Medical Intern'],
    ARRAY['Senior Resident', 'Attending Physician', 'Specialist'],
    ARRAY['Senior Consultant', 'Head of Department', 'Medical Director'],
    '[
        {"name": "AIIMS Delhi", "ranking": 1, "location": "Delhi"},
        {"name": "CMC Vellore", "ranking": 2, "location": "Vellore"},
        {"name": "AFMC Pune", "ranking": 3, "location": "Pune"}
    ]'::jsonb,
    '[
        {"name": "NEET-UG", "difficulty": "Very High", "type": "Medical Entrance"},
        {"name": "NEET-PG", "difficulty": "Very High", "type": "PG Medical"}
    ]'::jsonb,
    '[
        {"type": "course", "title": "Clinical Medicine", "platform": "Medical University"},
        {"type": "book", "title": "Harrison''s Principles of Internal Medicine", "author": "Various"}
    ]'::jsonb,
    '[
        {"trend": "Telemedicine", "description": "Rapid growth in remote healthcare delivery"},
        {"trend": "AI Diagnostics", "description": "AI-assisted diagnosis and imaging"}
    ]'::jsonb
)
ON CONFLICT (slug) DO NOTHING;

-- Success message
SELECT 'CareerOS enhanced features schema created successfully!' as status;
