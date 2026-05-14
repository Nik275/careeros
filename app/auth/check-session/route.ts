import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
    const supabase = createClient()
    
    const { data: { session }, error } = await supabase.auth.getSession()
    
    if (error || !session) {
        return NextResponse.json({ authenticated: false }, { status: 401 })
    }

    // Get user profile
    const { data: profile } = await supabase
        .from('users')
        .select('*')
        .eq('id', session.user.id)
        .single()

    return NextResponse.json({
        authenticated: true,
        user: session.user,
        profile,
    })
}