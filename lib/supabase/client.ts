import { createBrowserClient } from '@supabase/ssr'
import { Database } from '@/types/supabase'

export function createClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
        // Return a mock client during build time
        if (typeof window === 'undefined') {
            return {
                auth: {
                    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
                    getUser: () => Promise.resolve({ data: { user: null }, error: null }),
                    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
                    signUp: () => Promise.resolve({ data: null, error: null }),
                    signInWithPassword: () => Promise.resolve({ data: null, error: null }),
                    signInWithOAuth: () => Promise.resolve({ data: null, error: null }),
                    signOut: () => Promise.resolve({ error: null }),
                    resetPasswordForEmail: () => Promise.resolve({ data: null, error: null }),
                    updateUser: () => Promise.resolve({ data: null, error: null }),
                },
                from: () => ({
                    select: () => ({ eq: () => ({ single: () => Promise.resolve({ data: null, error: null }) }) }),
                    update: () => ({ eq: () => Promise.resolve({ error: null }) }),
                    insert: () => Promise.resolve({ error: null }),
                }),
            } as any
        }
        throw new Error('Missing Supabase environment variables')
    }

    return createBrowserClient<Database>(supabaseUrl, supabaseKey)
}