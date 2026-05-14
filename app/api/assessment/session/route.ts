import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

// GET - Fetch or create assessment session
export async function GET() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  
  console.log('[API Assessment GET] Starting')
  
  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      console.log('[API Assessment GET] Unauthorized')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    console.log('[API Assessment GET] User:', user.id)
    
    // Check for existing session
    const { data: existingSession, error: sessionError } = await supabase
      .from('assessment_sessions')
      .select('*')
      .eq('user_id', user.id)
      .eq('status', 'in_progress')
      .single()

    if (sessionError && sessionError.code !== 'PGRST116') {
      console.error('[API Assessment GET] Session error:', sessionError)
      
      // Check if table doesn't exist
      if (sessionError.message?.includes('relation') && sessionError.message?.includes('does not exist')) {
        return NextResponse.json(
          { error: 'Database not configured' },
          { status: 503 }
        )
      }
    }

    if (existingSession) {
      console.log('[API Assessment GET] Found session:', existingSession.id)
      
      // Fetch answers
      const { data: answers, error: answersError } = await supabase
        .from('assessment_answers')
        .select('question_id, answer, category')
        .eq('session_id', existingSession.id)

      if (answersError) {
        console.error('[API Assessment GET] Answers error:', answersError)
      }

      return NextResponse.json({
        session: existingSession,
        answers: answers || [],
      })
    }

    console.log('[API Assessment GET] No session found')
    return NextResponse.json({ session: null })
  } catch (error) {
    console.error('[API Assessment GET] Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Create new assessment session
export async function POST() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  
  console.log('[API Assessment POST] Starting')
  
  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      console.log('[API Assessment POST] Unauthorized')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    console.log('[API Assessment POST] Creating session for:', user.id)

    const { data: session, error } = await supabase
      .from('assessment_sessions')
      .insert({
        user_id: user.id,
        current_step: 0,
        total_steps: 8,
        progress: 0,
        status: 'in_progress',
        completed_steps: [],
      })
      .select()
      .single()

    if (error) {
      console.error('[API Assessment POST] Create error:', error)
      
      // Check if table doesn't exist
      if (error.message?.includes('relation') && error.message?.includes('does not exist')) {
        return NextResponse.json(
          { error: 'Database not configured' },
          { status: 503 }
        )
      }
      
      return NextResponse.json(
        { error: 'Failed to create session' },
        { status: 500 }
      )
    }

    console.log('[API Assessment POST] Created:', session.id)
    return NextResponse.json(session)
  } catch (error) {
    console.error('[API Assessment POST] Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PATCH - Update assessment progress
export async function PATCH(request: Request) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  
  console.log('[API Assessment PATCH] Starting')
  
  try {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    let body
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }
    
    const { currentStep, progress, completedSteps, answers } = body

    // Get session
    const { data: session, error: sessionError } = await supabase
      .from('assessment_sessions')
      .select('id')
      .eq('user_id', user.id)
      .eq('status', 'in_progress')
      .single()

    if (sessionError || !session) {
      console.error('[API Assessment PATCH] Session not found')
      return NextResponse.json(
        { error: 'No active session' },
        { status: 404 }
      )
    }

    // Update session
    const { error: updateError } = await supabase
      .from('assessment_sessions')
      .update({
        current_step: currentStep,
        progress: progress,
        completed_steps: completedSteps,
        last_saved_at: new Date().toISOString(),
      })
      .eq('id', session.id)

    if (updateError) {
      console.error('[API Assessment PATCH] Update error:', updateError)
      return NextResponse.json(
        { error: 'Failed to update' },
        { status: 500 }
      )
    }

    // Upsert answers
    if (answers && answers.length > 0) {
      for (const answer of answers) {
        const { error: upsertError } = await supabase
          .from('assessment_answers')
          .upsert({
            session_id: session.id,
            question_id: answer.questionId,
            category: answer.category,
            answer: answer.answer,
            updated_at: new Date().toISOString(),
          }, {
            onConflict: 'session_id,question_id'
          })
        
        if (upsertError) {
          console.error('[API Assessment PATCH] Answer upsert error:', upsertError)
        }
      }
    }

    console.log('[API Assessment PATCH] Success')
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[API Assessment PATCH] Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
