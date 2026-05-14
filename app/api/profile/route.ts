import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

// GET - Fetch current user's profile
export async function GET() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  
  console.log('[API Profile GET] Starting request')
  
  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError) {
      console.error('[API Profile GET] Auth error:', authError)
      return NextResponse.json({ error: 'Authentication error' }, { status: 401 })
    }
    
    if (!user) {
      console.log('[API Profile GET] No user found, returning 401')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    console.log('[API Profile GET] Fetching profile for user:', user.id)
    
    const { data: profile, error: profileError } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single()

    if (profileError) {
      console.log('[API Profile GET] Profile fetch error:', profileError.code, profileError.message)
      
      // PGRST116 = no rows returned (profile doesn't exist)
      if (profileError.code === 'PGRST116') {
        console.log('[API Profile GET] Profile not found, creating...')
        
        // Create profile
        const { data: newProfile, error: createError } = await supabase
          .from('users')
          .insert({
            id: user.id,
            email: user.email || '',
            full_name: user.user_metadata?.full_name || user.user_metadata?.name || null,
            avatar_url: user.user_metadata?.avatar_url || null,
            class_level: user.user_metadata?.class_level || null,
            career_interest: user.user_metadata?.career_interest || null,
            subscription_plan: 'free',
            assessment_completed: false,
          })
          .select()
          .single()
        
        if (createError) {
          console.error('[API Profile GET] Profile creation error:', createError)
          
          // Check if table doesn't exist
          if (createError.message?.includes('relation') && createError.message?.includes('does not exist')) {
            return NextResponse.json(
              { error: 'Database not configured. Please run SQL migrations.' },
              { status: 503 }
            )
          }
          
          return NextResponse.json(
            { error: 'Failed to create profile', details: createError.message },
            { status: 500 }
          )
        }
        
        console.log('[API Profile GET] Profile created successfully:', newProfile?.id)
        return NextResponse.json({ profile: newProfile, created: true })
      }
      
      // Check if table doesn't exist
      if (profileError.message?.includes('relation') && profileError.message?.includes('does not exist')) {
        return NextResponse.json(
          { error: 'Database not configured. Please run SQL migrations.' },
          { status: 503 }
        )
      }
      
      return NextResponse.json(
        { error: 'Failed to fetch profile', details: profileError.message },
        { status: 500 }
      )
    }

    console.log('[API Profile GET] Profile found:', profile?.id)
    return NextResponse.json({ profile, created: false })
  } catch (error) {
    console.error('[API Profile GET] Unhandled error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Create or update profile
export async function POST(request: Request) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  
  console.log('[API Profile POST] Starting request')
  
  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError) {
      console.error('[API Profile POST] Auth error:', authError)
      return NextResponse.json({ error: 'Authentication error' }, { status: 401 })
    }
    
    if (!user) {
      console.log('[API Profile POST] No user found, returning 401')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    let body
    try {
      body = await request.json()
    } catch {
      body = {}
    }
    
    const { full_name, avatar_url, class_level, career_interest } = body

    console.log('[API Profile POST] Upserting profile for user:', user.id)

    const { data: profile, error } = await supabase
      .from('users')
      .upsert({
        id: user.id,
        email: user.email || '',
        full_name: full_name || user.user_metadata?.full_name || null,
        avatar_url: avatar_url || user.user_metadata?.avatar_url || null,
        class_level: class_level || user.user_metadata?.class_level || null,
        career_interest: career_interest || user.user_metadata?.career_interest || null,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) {
      console.error('[API Profile POST] Profile upsert error:', error)
      
      // Check if table doesn't exist
      if (error.message?.includes('relation') && error.message?.includes('does not exist')) {
        return NextResponse.json(
          { error: 'Database not configured. Please run SQL migrations.' },
          { status: 503 }
        )
      }
      
      return NextResponse.json(
        { error: 'Failed to save profile', details: error.message },
        { status: 500 }
      )
    }

    console.log('[API Profile POST] Profile saved successfully:', profile?.id)
    return NextResponse.json({ profile })
  } catch (error) {
    console.error('[API Profile POST] Unhandled error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PATCH - Update profile fields
export async function PATCH(request: Request) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  
  console.log('[API Profile PATCH] Starting request')
  
  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError) {
      console.error('[API Profile PATCH] Auth error:', authError)
      return NextResponse.json({ error: 'Authentication error' }, { status: 401 })
    }
    
    if (!user) {
      console.log('[API Profile PATCH] No user found, returning 401')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    let body
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
    }

    console.log('[API Profile PATCH] Updating profile for user:', user.id, 'fields:', Object.keys(body))

    const { data: profile, error } = await supabase
      .from('users')
      .update({
        ...body,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id)
      .select()
      .single()

    if (error) {
      console.error('[API Profile PATCH] Profile update error:', error)
      
      // Check if table doesn't exist
      if (error.message?.includes('relation') && error.message?.includes('does not exist')) {
        return NextResponse.json(
          { error: 'Database not configured. Please run SQL migrations.' },
          { status: 503 }
        )
      }
      
      return NextResponse.json(
        { error: 'Failed to update profile', details: error.message },
        { status: 500 }
      )
    }

    console.log('[API Profile PATCH] Profile updated successfully:', profile?.id)
    return NextResponse.json({ profile })
  } catch (error) {
    console.error('[API Profile PATCH] Unhandled error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
