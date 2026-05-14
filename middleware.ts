import { type NextRequest, NextResponse } from 'next/server'
import { createServerClient, type CookieOptions } from '@supabase/ssr'

// Routes that require authentication
const protectedRoutes = ['/dashboard', '/assessment', '/report', '/pricing/checkout']

// Routes that should redirect authenticated users
const authRoutes = ['/login', '/signup', '/forgot-password', '/reset-password']

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl
    
    console.log('[Middleware] Processing request for:', pathname)

    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    })

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
        console.log('[Middleware] Missing Supabase credentials, skipping auth check')
        return response
    }

    // Create Supabase client with proper cookie handling
    const supabase = createServerClient(
        supabaseUrl,
        supabaseKey,
        {
            cookies: {
                get(name: string) {
                    return request.cookies.get(name)?.value
                },
                set(name: string, value: string, options: CookieOptions) {
                    request.cookies.set({
                        name,
                        value,
                        ...options,
                    })
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    })
                    response.cookies.set({
                        name,
                        value,
                        ...options,
                    })
                },
                remove(name: string, options: CookieOptions) {
                    request.cookies.set({
                        name,
                        value: '',
                        ...options,
                    })
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    })
                    response.cookies.set({
                        name,
                        value: '',
                        ...options,
                    })
                },
            },
        }
    )

    // Refresh session and get user
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError) {
        console.log('[Middleware] Error getting user:', userError.message)
    }
    
    const isAuthenticated = !!user
    console.log('[Middleware] User authenticated:', isAuthenticated, user?.email)

    // Redirect unauthenticated users from protected routes
    if (protectedRoutes.some(route => pathname.startsWith(route))) {
        if (!isAuthenticated) {
            console.log('[Middleware] Redirecting unauthenticated user to login')
            const redirectUrl = new URL('/login', request.url)
            redirectUrl.searchParams.set('redirect', pathname)
            return NextResponse.redirect(redirectUrl)
        }
    }

    // Redirect authenticated users away from auth routes
    if (authRoutes.some(route => pathname.startsWith(route))) {
        if (isAuthenticated) {
            console.log('[Middleware] Redirecting authenticated user to dashboard')
            return NextResponse.redirect(new URL('/dashboard', request.url))
        }
    }

    console.log('[Middleware] Proceeding with request')
    return response
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}