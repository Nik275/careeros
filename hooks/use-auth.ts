'use client'

import { useEffect, useState, useCallback } from 'react'
import { User } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'
import { UserProfile, SignUpData, SignInData, AuthError } from '@/types/auth'
import { sanitizeInput, validateEmail } from '@/lib/sanitize'

interface AuthState {
  user: User | null
  profile: UserProfile | null
  isLoading: boolean
  isAuthenticated: boolean
  error: string | null
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    profile: null,
    isLoading: true,
    isAuthenticated: false,
    error: null,
  })

  const supabase = createClient()

  // Create user profile via API
  const createProfile = async (user: User): Promise<UserProfile | null> => {
    console.log('[Auth] Creating profile via API for user:', user.id)
    
    try {
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: user.user_metadata?.full_name || user.user_metadata?.name || null,
          avatar_url: user.user_metadata?.avatar_url || null,
          class_level: user.user_metadata?.class_level || null,
          career_interest: user.user_metadata?.career_interest || null,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error('[Auth] API profile creation failed:', response.status, errorData)
        
        // If database not configured, don't block auth
        if (response.status === 503) {
          console.warn('[Auth] Database not configured, continuing without profile')
          return null
        }
        
        return null
      }

      const data = await response.json()
      console.log('[Auth] Profile created via API:', data.profile?.id)
      return data.profile as UserProfile
    } catch (error) {
      console.error('[Auth] Error creating profile via API:', error)
      return null
    }
  }

  // Fetch profile - single attempt, no retries
  const fetchProfile = async (user: User): Promise<UserProfile | null> => {
    console.log('[Auth] Fetching profile for user:', user.id)
    
    try {
      // Try API first (more reliable)
      const response = await fetch('/api/profile')
      
      if (response.ok) {
        const data = await response.json()
        console.log('[Auth] Profile fetched via API:', data.profile?.id)
        return data.profile as UserProfile
      }
      
      // If 404 (no profile), create one
      if (response.status === 404) {
        console.log('[Auth] Profile not found, creating...')
        return createProfile(user)
      }
      
      // If database not configured, continue without profile
      if (response.status === 503) {
        console.warn('[Auth] Database not configured')
        return null
      }
      
      console.error('[Auth] Profile fetch failed:', response.status)
      return null
    } catch (error) {
      console.error('[Auth] Error fetching profile:', error)
      return null
    }
  }

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      console.log('[Auth] Initializing...')
      
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()
        
        if (sessionError) {
          console.error('[Auth] Session error:', sessionError)
          setState({
            user: null,
            profile: null,
            isLoading: false,
            isAuthenticated: false,
            error: 'Session error',
          })
          return
        }
        
        console.log('[Auth] Session:', { hasSession: !!session, userId: session?.user?.id })
        
        if (session?.user) {
          console.log('[Auth] User found, fetching profile...')
          const profile = await fetchProfile(session.user)
          
          setState({
            user: session.user,
            profile,
            isLoading: false,
            isAuthenticated: true,
            error: null,
          })
          console.log('[Auth] Authenticated, profile:', !!profile)
        } else {
          console.log('[Auth] No session')
          setState({
            user: null,
            profile: null,
            isLoading: false,
            isAuthenticated: false,
            error: null,
          })
        }
      } catch (error) {
        console.error('[Auth] Init error:', error)
        setState({
          user: null,
          profile: null,
          isLoading: false,
          isAuthenticated: false,
          error: 'Init failed',
        })
      }
    }

    initAuth()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: string, session: { user: User } | null) => {
        console.log('[Auth] onAuthStateChange:', event)
        
        if (event === 'SIGNED_IN' && session?.user) {
          console.log('[Auth] SIGNED_IN, fetching profile...')
          const profile = await fetchProfile(session.user)
          
          setState({
            user: session.user,
            profile,
            isLoading: false,
            isAuthenticated: true,
            error: null,
          })
          console.log('[Auth] SIGNED_IN complete, profile:', !!profile)
        } else if (event === 'SIGNED_OUT') {
          setState({
            user: null,
            profile: null,
            isLoading: false,
            isAuthenticated: false,
            error: null,
          })
        } else if (event === 'USER_UPDATED' && session?.user) {
          const profile = await fetchProfile(session.user)
          setState(prev => ({
            ...prev,
            user: session.user,
            profile,
          }))
        }
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  // Sign up
  const signUp = useCallback(async (data: SignUpData): Promise<{ error?: AuthError; existingUnconfirmed?: boolean }> => {
    try {
      // Sanitize and validate inputs
      const email = sanitizeInput(data.email, 'email')
      const fullName = sanitizeInput(data.fullName, 'text')
      
      // Validate email format
      if (!validateEmail(email)) {
        return { error: { message: 'Invalid email format' } }
      }
      
      console.log('[Auth] Signing up:', email)
      
      const { data: signUpData, error } = await supabase.auth.signUp({
        email: email,
        password: data.password,
        options: {
          data: {
            full_name: fullName,
            class_level: data.classLevel,
            career_interest: data.careerInterest,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        console.error('[Auth] Signup error:', error)
        return { error: { message: error.message, code: error.code } }
      }

      // User exists but unconfirmed
      if (signUpData?.user?.identities?.length === 0) {
        console.log('[Auth] User exists, resending confirmation...')
        const { error: resendError } = await supabase.auth.resend({
          type: 'signup',
          email: data.email,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        })

        if (resendError) {
          return { error: { message: resendError.message } }
        }

        return { existingUnconfirmed: true }
      }

      console.log('[Auth] Signup success')
      return {}
    } catch (error) {
      console.error('[Auth] Signup exception:', error)
      return { error: { message: 'Unexpected error' } }
    }
  }, [supabase])

  // Sign in
  const signIn = useCallback(async (data: SignInData): Promise<{ error?: AuthError }> => {
    try {
      // Sanitize email input
      const email = sanitizeInput(data.email, 'email')
      
      // Validate email format
      if (!validateEmail(email)) {
        return { error: { message: 'Invalid email format' } }
      }
      
      console.log('[Auth] Signing in:', email)
      
      const { data: signInData, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: data.password,
      })

      if (error) {
        console.error('[Auth] Signin error:', error)
        return { error: { message: error.message, code: error.code } }
      }

      if (!signInData?.session) {
        return { error: { message: 'No session created' } }
      }

      console.log('[Auth] Signin success, fetching profile...')
      const profile = await fetchProfile(signInData.user)
      
      setState({
        user: signInData.user,
        profile,
        isLoading: false,
        isAuthenticated: true,
        error: null,
      })
      
      return {}
    } catch (error) {
      console.error('[Auth] Signin exception:', error)
      return { error: { message: 'Unexpected error' } }
    }
  }, [supabase])

  // Sign in with Google
  const signInWithGoogle = useCallback(async (): Promise<{ error?: AuthError }> => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        return { error: { message: error.message } }
      }

      return {}
    } catch (error) {
      return { error: { message: 'Unexpected error' } }
    }
  }, [supabase])

  // Sign out
  const signOut = useCallback(async () => {
    await supabase.auth.signOut()
  }, [supabase])

  // Resend verification
  const resendVerificationEmail = useCallback(async (email: string): Promise<{ error?: AuthError }> => {
    try {
      // Sanitize email input
      const sanitizedEmail = sanitizeInput(email, 'email')
      
      // Validate email format
      if (!validateEmail(sanitizedEmail)) {
        return { error: { message: 'Invalid email format' } }
      }
      
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: sanitizedEmail,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        return { error: { message: error.message } }
      }

      return {}
    } catch (error) {
      return { error: { message: 'Unexpected error' } }
    }
  }, [supabase])

  // Reset password
  const resetPassword = useCallback(async (email: string): Promise<{ error?: AuthError }> => {
    try {
      // Sanitize email input
      const sanitizedEmail = sanitizeInput(email, 'email')
      
      // Validate email format
      if (!validateEmail(sanitizedEmail)) {
        return { error: { message: 'Invalid email format' } }
      }
      
      const { error } = await supabase.auth.resetPasswordForEmail(sanitizedEmail, {
        redirectTo: `${window.location.origin}/reset-password`,
      })

      if (error) {
        return { error: { message: error.message } }
      }

      return {}
    } catch (error) {
      return { error: { message: 'Unexpected error' } }
    }
  }, [supabase])

  // Update password
  const updatePassword = useCallback(async (password: string): Promise<{ error?: AuthError }> => {
    try {
      const { error } = await supabase.auth.updateUser({ password })

      if (error) {
        return { error: { message: error.message } }
      }

      return {}
    } catch (error) {
      return { error: { message: 'Unexpected error' } }
    }
  }, [supabase])

  // Update profile
  const updateProfile = useCallback(async (updates: Partial<UserProfile>) => {
    if (!state.user) return { error: { message: 'Not authenticated' } }

    const response = await fetch('/api/profile', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return { error: { message: errorData.error || 'Update failed' } }
    }

    const data = await response.json()
    setState(prev => ({ ...prev, profile: data.profile }))

    return {}
  }, [state.user])

  // Refresh profile
  const refreshProfile = useCallback(async () => {
    if (!state.user) return
    const profile = await fetchProfile(state.user)
    setState(prev => ({ ...prev, profile }))
  }, [state.user])

  return {
    ...state,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    resendVerificationEmail,
    resetPassword,
    updatePassword,
    updateProfile,
    refreshProfile,
  }
}
