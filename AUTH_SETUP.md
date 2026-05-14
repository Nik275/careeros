# CareerOS Authentication System Setup

## Overview

This is a production-ready authentication system for CareerOS built with:
- Next.js 15 App Router
- Supabase Auth & Database
- TypeScript
- Tailwind CSS
- Framer Motion
- Zustand (via hooks)

## Features

- Email/password authentication with validation
- Google OAuth integration
- Password reset flow
- Protected routes middleware
- Rate limiting for auth attempts
- Row Level Security (RLS) on database
- Premium glassmorphism UI matching CareerOS design
- Responsive for all devices

## Folder Structure

```
├── app/
│   ├── auth/
│   │   ├── callback/route.ts       # OAuth callback handler
│   │   └── check-session/route.ts  # Session validation API
│   ├── login/page.tsx              # Login page
│   ├── signup/page.tsx             # Sign up with class/career selection
│   ├── forgot-password/page.tsx    # Password reset request
│   ├── reset-password/page.tsx     # New password form
│   ├── dashboard/page.tsx          # Protected dashboard
│   ├── assessment/page.tsx         # Protected assessment
│   ├── layout.tsx                  # Root layout with Toaster
│   └── globals.css                 # Global styles
├── components/
│   ├── auth/
│   │   ├── auth-card.tsx           # Glassmorphism card wrapper
│   │   ├── divider.tsx             # Or divider
│   │   ├── google-button.tsx       # Google OAuth button
│   │   ├── input-field.tsx         # Form input with error handling
│   │   └── submit-button.tsx       # Animated submit button
│   ├── landing/
│   │   └── main-nav.tsx            # Updated nav with auth state
│   └── ui/
│       └── sonner.tsx              # Toast notifications
├── hooks/
│   ├── use-auth.ts                 # Main auth hook
│   └── use-career-interests.ts     # Career interests fetcher
├── lib/
│   └── supabase/
│       ├── client.ts               # Browser client
│       ├── server.ts               # Server client
│       └── middleware.ts           # Session middleware
├── types/
│   ├── auth.ts                     # Auth type definitions
│   └── supabase.ts                 # Database types
├── supabase/
│   └── migrations/
│       ├── 001_initial_schema.sql  # Users table + RLS
│       └── 002_career_interests.sql # Career interests lookup
└── middleware.ts                   # Route protection
```

## Environment Setup

1. Copy the environment template:
```bash
cp .env.local.example .env.local
```

2. Fill in your Supabase credentials from your project dashboard:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## Supabase Setup

### 1. Create Project
- Go to [Supabase Dashboard](https://app.supabase.com)
- Create a new project
- Note your project URL and anon key

### 2. Run Migrations

In the Supabase SQL Editor, run:

**Migration 1: Initial Schema**
```sql
-- Contents of supabase/migrations/001_initial_schema.sql
-- (Copy the full SQL from that file)
```

**Migration 2: Career Interests**
```sql
-- Contents of supabase/migrations/002_career_interests.sql
-- (Copy the full SQL from that file)
```

### 3. Configure Auth Providers

**Google OAuth:**
1. Go to Authentication → Providers
2. Enable Google
3. Add your Google Client ID and Secret
4. Set callback URL: `https://your-domain.com/auth/callback`

**Email Settings:**
1. Go to Authentication → Email Templates
2. Customize confirmation and reset password emails
3. Set Site URL to your domain

### 4. Configure Redirect URLs

Go to Authentication → URL Configuration:
- Site URL: `http://localhost:3000` (dev) or your production URL
- Redirect URLs: Add `http://localhost:3000/auth/callback`

## Security Features

### Row Level Security (RLS)

The `users` table has RLS enabled with policies:
- Users can only view their own profile
- Users can only update their own profile
- New users can be inserted during signup

### Rate Limiting

Built-in rate limiting functions:
- `check_auth_rate_limit()`: Checks if user/IP is within limits
- `log_auth_attempt()`: Logs each auth attempt
- Maximum 5 failed attempts per 15 minutes

### CSRF Protection

Supabase handles CSRF tokens automatically via secure cookies.

## Usage

### Protected Routes

Routes are automatically protected via middleware:
- `/dashboard` → Requires auth
- `/assessment` → Requires auth
- `/report` → Requires auth
- `/pricing/checkout` → Requires auth

Unauthenticated users are redirected to `/login` with a `redirect` parameter.

### Auth Hook

```tsx
import { useAuth } from '@/hooks/use-auth'

function MyComponent() {
  const { 
    user, 
    profile, 
    isLoading, 
    isAuthenticated,
    signIn,
    signUp,
    signOut,
    signInWithGoogle 
  } = useAuth()

  // Use auth state...
}
```

### User Profile Structure

```typescript
interface UserProfile {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  class_level: 'class_10' | 'class_11' | 'class_12' | 'dropper' | 'college_student' | null
  career_interest: string | null
  subscription_plan: 'free' | 'pro' | 'premium'
  assessment_completed: boolean
  created_at: string
  updated_at: string
}
```

### Post-Login Redirect

After successful login:
1. If `assessment_completed = false` → Redirect to `/assessment`
2. Else → Redirect to `/dashboard` (or original requested URL)

## UI Components

### Auth Card

Glassmorphism card wrapper with ambient glow:
```tsx
<AuthCard title="Welcome" subtitle="Sign in to continue">
  {/* Form content */}
</AuthCard>
```

### Input Field

Styled input with icon, error handling, and animations:
```tsx
<InputField
  label="Email"
  type="email"
  icon={Mail}
  error={errors.email}
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
```

### Select Field

Styled select dropdown:
```tsx
<SelectField
  label="Class Level"
  icon={GraduationCap}
  options={classLevelOptions}
  value={classLevel}
  onChange={(e) => setClassLevel(e.target.value)}
/>
```

## Toast Notifications

Built-in toast system for success/error messages:
```tsx
import { toast } from 'sonner'

toast.success('Welcome back!')
toast.error('Invalid credentials')
```

## Deployment Checklist

- [ ] Set up Supabase project
- [ ] Run database migrations
- [ ] Configure OAuth providers
- [ ] Set environment variables
- [ ] Update redirect URLs in Supabase
- [ ] Test all auth flows locally
- [ ] Deploy to production
- [ ] Update production URLs in Supabase
- [ ] Configure custom domain (optional)

## Troubleshooting

### Session Not Persisting
- Check that `NEXT_PUBLIC_SUPABASE_URL` is correct
- Verify cookie settings in Supabase Dashboard
- Ensure middleware.ts is properly configured

### OAuth Redirect Issues
- Check redirect URLs in Supabase match your domain exactly
- Verify Google OAuth credentials
- Check browser console for errors

### RLS Errors
- Ensure user trigger is working: `handle_new_user()`
- Check RLS policies are enabled
- Verify user is authenticated before querying

## Next Steps

1. Build the `/dashboard` page
2. Create the `/assessment` flow
3. Add subscription management
4. Implement profile settings page
5. Add email verification resend functionality