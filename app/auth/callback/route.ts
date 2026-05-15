import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')
    const token_hash = searchParams.get('token_hash')
    const type = searchParams.get('type')
    
    // Determine the origin - handle both production and localhost
    const origin = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    
    // Get the 'next' parameter or default to dashboard
    const next = searchParams.get('next') ?? '/dashboard'

    if (!code && !(token_hash && type)) {
      console.error('Auth callback: No auth data provided')
      return NextResponse.redirect(`${origin}/login?error=no_auth_data`)
    }

    // Create a response object to attach cookies
    let response = NextResponse.redirect(`${origin}${next}`)

    // Create Supabase client with cookie handling
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return request.cookies.get(name)?.value
                },
                set(name: string, value: string, options: CookieOptions) {
                    // Set cookie on the request for subsequent cookie reads
                    request.cookies.set({
                        name,
                        value,
                        ...options,
                    })
                    // Set cookie on the response to send to browser
                    response = NextResponse.redirect(`${origin}${next}`)
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
                    response = NextResponse.redirect(`${origin}${next}`)
                    response.cookies.set({
                        name,
                        value: '',
                        ...options,
                    })
                },
            },
        }
    )

    try {
        // Exchange the code for a session
        let exchangeError = null

        if (code) {
          const { error } =
            await supabase.auth.exchangeCodeForSession(code)

          exchangeError = error
        } else if (token_hash && type) {
          const { error } =
            await supabase.auth.verifyOtp({
              token_hash,
              type: type as any,
            })

          exchangeError = error
        }

        if (exchangeError) {
            console.error('Auth callback: Code exchange failed', exchangeError)
            return NextResponse.redirect(`${origin}/login?error=exchange_failed&message=${encodeURIComponent(exchangeError.message)}`)
        }

        // Get the user after successful exchange
        const { data: { user }, error: userError } = await supabase.auth.getUser()

        if (userError || !user) {
            console.error('Auth callback: Failed to get user', userError)
            return NextResponse.redirect(`${origin}/login?error=user_not_found`)
        }

        console.log('Auth callback: User authenticated', user.email)

        // Check user profile for assessment status
        const { data: profile, error: profileError } = await supabase
            .from('users')
            .select('assessment_completed')
            .eq('id', user.id)
            .single()

        if (profileError) {
            console.error('Auth callback: Failed to fetch profile', profileError)
            // Continue to dashboard even if profile fetch fails
            return NextResponse.redirect(`${origin}/dashboard`)
        }

        // Determine redirect based on assessment status
        const redirectPath = profile && !profile.assessment_completed
            ? '/assessment'
            : '/dashboard'

        console.log('Auth callback: Redirecting to', redirectPath)
        
        // Create final redirect response
        const finalResponse = NextResponse.redirect(`${origin}${redirectPath}`)
        
        // Copy all cookies from the supabase client to the final response
        response.cookies.getAll().forEach((cookie) => {
            finalResponse.cookies.set(cookie.name, cookie.value, cookie)
        })

        return finalResponse

    } catch (error) {
        console.error('Auth callback: Unexpected error', error)
        return NextResponse.redirect(`${origin}/login?error=unexpected`)
    }
}
