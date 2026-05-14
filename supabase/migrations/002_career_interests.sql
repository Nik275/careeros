-- Career interests lookup table
CREATE TABLE IF NOT EXISTS public.career_interests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert common career interests for Indian students
INSERT INTO public.career_interests (name, category, description) VALUES
    ('Engineering', 'STEM', 'Software, Mechanical, Civil, Electrical, and other engineering fields'),
    ('Medicine', 'Healthcare', 'MBBS, Nursing, Pharmacy, and allied health sciences'),
    ('Business & Management', 'Commerce', 'MBA, Finance, Marketing, Entrepreneurship'),
    ('Data Science & AI', 'Technology', 'Machine Learning, Data Analysis, AI Research'),
    ('Design', 'Creative', 'UI/UX, Graphic Design, Fashion, Interior Design'),
    ('Law', 'Legal', 'Corporate Law, Litigation, Legal Advisory'),
    ('Civil Services', 'Government', 'IAS, IPS, IFS, and other government services'),
    ('Research & Academia', 'Education', 'Teaching, Research, PhD programs'),
    ('Finance & Banking', 'Commerce', 'Investment Banking, CA, CFA, Financial Analysis'),
    ('Media & Communication', 'Creative', 'Journalism, PR, Digital Marketing, Content Creation'),
    ('Psychology', 'Healthcare', 'Clinical Psychology, Counseling, HR'),
    ('Architecture', 'STEM', 'Architecture, Urban Planning, Landscape Design'),
    ('Aviation', 'Professional', 'Pilot, Aviation Management, Airport Operations'),
    ('Hospitality', 'Services', 'Hotel Management, Tourism, Event Management'),
    ('Biotechnology', 'STEM', 'Biotech Research, Pharmaceuticals, Genetics')
ON CONFLICT (name) DO NOTHING;

-- Enable RLS
ALTER TABLE public.career_interests ENABLE ROW LEVEL SECURITY;

-- Allow all authenticated users to read career interests
CREATE POLICY "Allow read access to career interests" 
    ON public.career_interests 
    FOR SELECT 
    TO authenticated, anon
    USING (true);

GRANT SELECT ON public.career_interests TO authenticated, anon;