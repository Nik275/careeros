import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Database } from '@/types/supabase'

export function createClient(cookieStore?: ReturnType<typeof cookies>) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    // During build or when env vars are missing, return mock
    if (!supabaseUrl || !supabaseKey) {
        console.warn('Supabase environment variables missing, returning mock client')
        return {
            auth: {
                getSession: () => Promise.resolve({ data: { session: null }, error: null }),
                getUser: () => Promise.resolve({ data: { user: null }, error: null }),
                exchangeCodeForSession: () => Promise.resolve({ data: { session: null, user: null }, error: null }),
            },
            from: () => ({
                select: () => ({ eq: () => ({ single: () => Promise.resolve({ data: null, error: null }) }) }),
            }),
        } as any
    }

    // Use provided cookie store or create new one
    const store = cookieStore || cookies()

    return createServerClient<Database>(
        supabaseUrl,
        supabaseKey,
        {
            cookies: {
                get(name: string) {
                    return store.get(name)?.value
                },
                set(name: string, value: string, options: CookieOptions) {
                    try {
                        store.set({ name, value, ...options })
                    } catch (error) {
                        // Handle middleware context or read-only cookie store
                        console.warn('Failed to set cookie:', name)
                    }
                },
                remove(name: string, options: CookieOptions) {
                    try {
                        store.set({ name, value: '', ...options })
                    } catch (error) {
                        console.warn('Failed to remove cookie:', name)
                    }
                },
            },
        }
    )
}