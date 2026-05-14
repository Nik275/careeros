import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  
  console.log('[API Assessment Submit] Starting')
  
  try {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      console.log('[API Assessment Submit] Unauthorized')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { sessionId, answers } = body

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID required' },
        { status: 400 }
      )
    }

    console.log('[API Assessment Submit] Processing for user:', user.id, 'session:', sessionId)

    // Verify session belongs to user
    const { data: session, error: sessionError } = await supabase
      .from('assessment_sessions')
      .select('id, user_id')
      .eq('id', sessionId)
      .eq('user_id', user.id)
      .single()

    if (sessionError || !session) {
      console.error('[API Assessment Submit] Session not found:', sessionError)
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      )
    }

    // Mark session as completed
    console.log('[API Assessment Submit] Marking session completed')
    const { error: updateError } = await supabase
      .from('assessment_sessions')
      .update({
        status: 'completed',
        progress: 100,
        completed_at: new Date().toISOString(),
      })
      .eq('id', sessionId)

    if (updateError) {
      console.error('[API Assessment Submit] Session update error:', updateError)
      return NextResponse.json(
        { error: 'Failed to complete session' },
        { status: 500 }
      )
    }

    // Extract career interest from answers
    const careerInterest = answers['stream_preferred_field'] || 
                          answers['interests_career_areas']?.[0] || 
                          null

    console.log('[API Assessment Submit] Updating user profile, career_interest:', careerInterest)

    // Update user profile - FIX: use 'users' table not 'profiles'
    const { error: profileError } = await supabase
      .from('users')
      .update({
        assessment_completed: true,
        current_assessment_id: sessionId,
        career_interest: careerInterest,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id)

    if (profileError) {
      console.error('[API Assessment Submit] Profile update error:', profileError)
      // Don't fail the request if profile update fails
      // The assessment is still completed in assessment_sessions
    } else {
      console.log('[API Assessment Submit] Profile updated successfully')
    }

    // Process results and create recommendations
    console.log('[API Assessment Submit] Processing results')
    await processAssessmentResults(supabase, user.id, sessionId, answers)

    console.log('[API Assessment Submit] Success')
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[API Assessment Submit] Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

async function processAssessmentResults(
  supabase: any,
  userId: string,
  sessionId: string,
  answers: Record<string, any>
) {
  try {
    // Extract key preferences from answers
    const targetExams = answers['stream_target_exams'] || []
    const dreamCareers = answers['stream_dream_careers'] || []
    const preferredField = answers['stream_preferred_field'] || ''
    
    console.log('[API Assessment Submit] Creating student preferences')
    
    // Create student preferences record
    const { error: prefError } = await supabase
      .from('student_preferences')
      .insert({
        session_id: sessionId,
        target_exams: Array.isArray(targetExams) ? targetExams : [targetExams],
        dream_careers: Array.isArray(dreamCareers) ? dreamCareers : [dreamCareers],
        preferred_field: preferredField,
      })

    if (prefError) {
      console.error('[API Assessment Submit] Preferences error:', prefError)
    }

    // Generate basic recommendations based on answers
    console.log('[API Assessment Submit] Generating recommendations')
    const recommendations = generateRecommendations(answers)
    
    for (const rec of recommendations) {
      const { error: recError } = await supabase
        .from('recommendations')
        .insert({
          user_id: userId,
          type: rec.type,
          title: rec.title,
          description: rec.description,
          data: rec.data,
          confidence: rec.confidence,
        })
      
      if (recError) {
        console.error('[API Assessment Submit] Recommendation insert error:', recError)
      }
    }
    
    console.log('[API Assessment Submit] Generated', recommendations.length, 'recommendations')
  } catch (error) {
    console.error('[API Assessment Submit] Results processing error:', error)
  }
}

function generateRecommendations(answers: Record<string, any>) {
  const recommendations: any[] = []
  
  const interests = answers['interests_career_areas'] || []
  const skills = answers['skills_self_assessment'] || []
  const targetExams = answers['stream_target_exams'] || []
  const preferredField = answers['stream_preferred_field'] || ''
  
  // Career path recommendations based on interests
  if (interests.includes('technology') || interests.includes('engineering') || targetExams.includes('jee')) {
    recommendations.push({
      type: 'career',
      title: 'Software Engineering',
      description: 'Design and develop software applications, systems, and platforms. High demand in India\'s growing tech industry.',
      data: { field: 'technology', skills: ['programming', 'problem-solving'] },
      confidence: 0.92,
    })
    
    recommendations.push({
      type: 'exam',
      title: 'JEE Main & Advanced',
      description: 'Joint Entrance Examination for admission to IITs, NITs, and other premier engineering institutes.',
      data: { category: 'engineering', difficulty: 'high' },
      confidence: 0.90,
    })
  }
  
  if (interests.includes('healthcare') || interests.includes('medicine') || targetExams.includes('neet')) {
    recommendations.push({
      type: 'career',
      title: 'Medical Professional',
      description: 'Pursue MBBS, BDS, or allied health sciences. Serve society through healthcare.',
      data: { field: 'medical', skills: ['empathy', 'science', 'attention-to-detail'] },
      confidence: 0.95,
    })
    
    recommendations.push({
      type: 'exam',
      title: 'NEET-UG',
      description: 'National Eligibility cum Entrance Test for medical and dental courses in India.',
      data: { category: 'medical', difficulty: 'high' },
      confidence: 0.93,
    })
  }
  
  if (interests.includes('business') || interests.includes('management')) {
    recommendations.push({
      type: 'career',
      title: 'Business Management',
      description: 'Lead organizations, manage operations, and drive business growth.',
      data: { field: 'business', skills: ['leadership', 'communication', 'strategy'] },
      confidence: 0.88,
    })
    
    recommendations.push({
      type: 'exam',
      title: 'CAT / XAT / SNAP',
      description: 'Management entrance exams for admission to IIMs and top B-schools.',
      data: { category: 'management', difficulty: 'high' },
      confidence: 0.85,
    })
  }
  
  if (targetExams.includes('upsc') || interests.includes('government') || interests.includes('civil service')) {
    recommendations.push({
      type: 'career',
      title: 'Civil Services (IAS/IPS/IFS)',
      description: 'Serve the nation through administrative, police, or foreign services.',
      data: { field: 'government', skills: ['policy', 'administration', 'public-service'] },
      confidence: 0.90,
    })
    
    recommendations.push({
      type: 'exam',
      title: 'UPSC Civil Services',
      description: 'Union Public Service Commission exam for IAS, IPS, IFS, and other central services.',
      data: { category: 'civil-services', difficulty: 'very-high' },
      confidence: 0.88,
    })
  }
  
  // Generic recommendation if no specific matches
  if (recommendations.length === 0) {
    recommendations.push({
      type: 'career',
      title: 'Explore Multiple Paths',
      description: 'Based on your diverse interests, consider exploring interdisciplinary careers.',
      data: { field: 'interdisciplinary' },
      confidence: 0.70,
    })
  }
  
  // Always add a skill recommendation
  recommendations.push({
    type: 'skill',
    title: 'Develop Core Skills',
    description: 'Focus on communication, critical thinking, and digital literacy for any career path.',
    data: { skills: ['communication', 'critical-thinking', 'digital-literacy'] },
    confidence: 0.95,
  })
  
  return recommendations
}
