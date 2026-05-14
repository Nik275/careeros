'use client'

import React, { createContext, useContext, useReducer, useEffect, useCallback, useRef } from 'react'
import { User } from '@supabase/supabase-js'
import { assessmentSteps, Question } from '@/lib/assessment/questions'
import { useAuth } from '@/hooks/use-auth'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

interface AssessmentState {
  currentStep: number
  answers: Record<string, any>
  sessionId: string | null
  isLoading: boolean
  isSaving: boolean
  lastSavedAt: Date | null
  completedSteps: string[]
  isInitialized: boolean
  error: string | null
  user: User | null
}

type AssessmentAction =
  | { type: 'SET_STEP'; payload: number }
  | { type: 'SET_ANSWER'; payload: { questionId: string; answer: any } }
  | { type: 'SET_SESSION'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_SAVING'; payload: boolean }
  | { type: 'SET_LAST_SAVED'; payload: Date }
  | { type: 'SET_COMPLETED_STEP'; payload: string }
  | { type: 'SET_INITIALIZED'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'LOAD_PROGRESS'; payload: Partial<AssessmentState> }
  | { type: 'RESET' }

const initialState: AssessmentState = {
  currentStep: 0,
  answers: {},
  sessionId: null,
  isLoading: true,
  isSaving: false,
  lastSavedAt: null,
  completedSteps: [],
  isInitialized: false,
  error: null,
  user: null,
}

const INITIALIZATION_TIMEOUT = 30000 // 30 seconds max wait

function assessmentReducer(state: AssessmentState, action: AssessmentAction): AssessmentState {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, currentStep: action.payload }
    case 'SET_ANSWER':
      return {
        ...state,
        answers: { ...state.answers, [action.payload.questionId]: action.payload.answer },
      }
    case 'SET_SESSION':
      return { ...state, sessionId: action.payload }
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    case 'SET_SAVING':
      return { ...state, isSaving: action.payload }
    case 'SET_LAST_SAVED':
      return { ...state, lastSavedAt: action.payload }
    case 'SET_COMPLETED_STEP':
      if (state.completedSteps.includes(action.payload)) {
        return state
      }
      return { ...state, completedSteps: [...state.completedSteps, action.payload] }
    case 'SET_INITIALIZED':
      return { ...state, isInitialized: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false }
    case 'SET_USER':
      return { ...state, user: action.payload }
    case 'LOAD_PROGRESS':
      return { ...state, ...action.payload, isInitialized: true, error: null }
    case 'RESET':
      return initialState
    default:
      return state
  }
}

interface AssessmentContextType {
  state: AssessmentState
  currentStepData: typeof assessmentSteps[0]
  currentQuestion: Question | null
  totalSteps: number
  totalQuestions: number
  answeredQuestions: number
  progress: number
  setStep: (step: number) => void
  setAnswer: (questionId: string, answer: any) => void
  nextStep: () => void
  prevStep: () => void
  saveProgress: () => Promise<void>
  submitAssessment: () => Promise<boolean>
  isStepValid: () => boolean
  retryInitialization: () => void
}

const AssessmentContext = createContext<AssessmentContextType | undefined>(undefined)

interface AssessmentProviderProps {
  children: React.ReactNode
  initialUser?: User | null
}

export function AssessmentProvider({ children, initialUser }: AssessmentProviderProps) {
  const [state, dispatch] = useReducer(assessmentReducer, {
    ...initialState,
    user: initialUser || null,
  })
  
  // Still use useAuth for client-side sync, but initialUser provides immediate auth state
  const { user: clientUser, isAuthenticated, isLoading: isAuthLoading } = useAuth()
  const router = useRouter()
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const initAttemptedRef = useRef(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Use initialUser if available, otherwise fall back to client auth
  const user = state.user || clientUser

  const currentStepData = assessmentSteps[state.currentStep]
  const totalSteps = assessmentSteps.length
  const totalQuestions = assessmentSteps.reduce((acc, step) => acc + step.questions.length, 0)
  const answeredQuestions = Object.keys(state.answers).length
  const progress = Math.round((answeredQuestions / totalQuestions) * 100)

  // Clear any timeouts on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current)
    }
  }, [])

  // Sync with client auth when it loads (for updates, logout, etc.)
  useEffect(() => {
    if (clientUser && !state.user) {
      console.log('[Assessment] Syncing user from client auth')
      dispatch({ type: 'SET_USER', payload: clientUser })
    }
  }, [clientUser, state.user])

  // Initialize session
  useEffect(() => {
    console.log('[Assessment] Auth check:', { 
      hasInitialUser: !!initialUser,
      hasClientUser: !!clientUser,
      hasUser: !!user,
      userId: user?.id,
      initAttempted: initAttemptedRef.current
    })

    // If we have initialUser from server, we can proceed immediately
    // Otherwise wait for client auth to finish loading
    if (!initialUser && isAuthLoading) {
      console.log('[Assessment] Waiting for client auth...')
      return
    }

    // If no user at all, show error
    if (!user) {
      console.log('[Assessment] No user available')
      dispatch({ type: 'SET_ERROR', payload: 'Please log in to take the assessment' })
      setTimeout(() => {
        router.push('/login?redirect=/assessment')
      }, 2000)
      return
    }

    // Prevent double initialization
    if (initAttemptedRef.current) {
      console.log('[Assessment] Already initialized')
      return
    }

    initAttemptedRef.current = true

    const initializeSession = async () => {
      console.log('[Assessment] Initializing session for user:', user.id)
      
      try {
        dispatch({ type: 'SET_LOADING', payload: true })
        dispatch({ type: 'SET_ERROR', payload: null })

        // Set a timeout to prevent infinite loading
        timeoutRef.current = setTimeout(() => {
          console.error('[Assessment] Initialization timed out')
          dispatch({ type: 'SET_ERROR', payload: 'Assessment loading timed out. Please try again.' })
        }, INITIALIZATION_TIMEOUT)

        // Check for existing session
        console.log('[Assessment] Fetching session...')
        const response = await fetch('/api/assessment/session')
        console.log('[Assessment] Session response:', response.status)
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(errorData.error || `Failed: ${response.status}`)
        }
        
        const data = await response.json()
        console.log('[Assessment] Session data:', { 
          hasSession: !!data.session, 
          answersCount: data.answers?.length || 0
        })

        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
          timeoutRef.current = null
        }

        if (data.session) {
          // Load existing progress
          const answers: Record<string, any> = {}
          data.answers?.forEach((answer: any) => {
            answers[answer.question_id || answer.questionId] = answer.answer
          })

          dispatch({
            type: 'LOAD_PROGRESS',
            payload: {
              sessionId: data.session.id,
              currentStep: data.session.current_step || data.session.currentStep || 0,
              answers,
              completedSteps: data.session.completed_steps || data.session.completedSteps || [],
              lastSavedAt: data.session.last_saved_at || data.session.lastSavedAt 
                ? new Date(data.session.last_saved_at || data.session.lastSavedAt) 
                : null,
              isLoading: false,
            },
          })
          console.log('[Assessment] Existing session loaded')
        } else {
          // Create new session
          console.log('[Assessment] Creating new session...')
          const createResponse = await fetch('/api/assessment/session', {
            method: 'POST',
          })
          
          if (!createResponse.ok) {
            const errorData = await createResponse.json().catch(() => ({}))
            throw new Error(errorData.error || `Create failed: ${createResponse.status}`)
          }
          
          const newSession = await createResponse.json()
          console.log('[Assessment] New session:', newSession.id)
          
          dispatch({ type: 'SET_SESSION', payload: newSession.id })
          dispatch({ type: 'SET_INITIALIZED', payload: true })
          dispatch({ type: 'SET_LOADING', payload: false })
        }
      } catch (error) {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
          timeoutRef.current = null
        }
        
        console.error('[Assessment] Init error:', error)
        const errorMessage = error instanceof Error ? error.message : 'Failed to load'
        dispatch({ type: 'SET_ERROR', payload: errorMessage })
        toast.error('Failed to load assessment')
      }
    }

    initializeSession()
  }, [initialUser, clientUser, user, isAuthLoading, router])

  // Auto-save on answer change
  useEffect(() => {
    if (!state.isInitialized || !state.sessionId) return

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current)
    }

    saveTimeoutRef.current = setTimeout(() => {
      saveProgress()
    }, 2000)

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }
    }
  }, [state.answers, state.currentStep, state.isInitialized, state.sessionId])

  const retryInitialization = useCallback(() => {
    console.log('[Assessment] Retrying...')
    initAttemptedRef.current = false
    dispatch({ type: 'RESET' })
    if (initialUser) {
      dispatch({ type: 'SET_USER', payload: initialUser })
    }
  }, [initialUser])

  const setStep = useCallback((step: number) => {
    if (step >= 0 && step < totalSteps) {
      dispatch({ type: 'SET_STEP', payload: step })
    }
  }, [totalSteps])

  const setAnswer = useCallback((questionId: string, answer: any) => {
    dispatch({ type: 'SET_ANSWER', payload: { questionId, answer } })
  }, [])

  const saveProgress = useCallback(async () => {
    if (!state.sessionId) return

    try {
      dispatch({ type: 'SET_SAVING', payload: true })

      const answersToSave = Object.entries(state.answers).map(([questionId, answer]) => ({
        questionId,
        answer,
        category: assessmentSteps.find(step => 
          step.questions.some(q => q.id === questionId)
        )?.id || 'unknown',
      }))

      await fetch('/api/assessment/session', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentStep: state.currentStep,
          progress,
          completedSteps: state.completedSteps,
          answers: answersToSave,
        }),
      })

      dispatch({ type: 'SET_LAST_SAVED', payload: new Date() })
    } catch (error) {
      console.error('[Assessment] Save error:', error)
    } finally {
      dispatch({ type: 'SET_SAVING', payload: false })
    }
  }, [state.sessionId, state.answers, state.currentStep, progress, state.completedSteps])

  const nextStep = useCallback(async () => {
    if (state.currentStep < totalSteps - 1) {
      const currentStepId = assessmentSteps[state.currentStep].id
      dispatch({ type: 'SET_COMPLETED_STEP', payload: currentStepId })
      await saveProgress()
      dispatch({ type: 'SET_STEP', payload: state.currentStep + 1 })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [state.currentStep, totalSteps, saveProgress])

  const prevStep = useCallback(() => {
    if (state.currentStep > 0) {
      dispatch({ type: 'SET_STEP', payload: state.currentStep - 1 })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [state.currentStep])

  const isStepValid = useCallback(() => {
    const currentQuestions = currentStepData.questions
    return currentQuestions.every(q => 
      !q.required || (state.answers[q.id] !== undefined && state.answers[q.id] !== null)
    )
  }, [currentStepData, state.answers])

  const submitAssessment = useCallback(async (): Promise<boolean> => {
    if (!state.sessionId) return false

    try {
      dispatch({ type: 'SET_LOADING', payload: true })

      const response = await fetch('/api/assessment/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: state.sessionId,
          answers: state.answers,
        }),
      })

      if (response.ok) {
        toast.success('Assessment completed!')
        return true
      } else {
        throw new Error('Submit failed')
      }
    } catch (error) {
      console.error('[Assessment] Submit error:', error)
      toast.error('Failed to submit')
      return false
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }, [state.sessionId, state.answers])

  const value: AssessmentContextType = {
    state,
    currentStepData,
    currentQuestion: null,
    totalSteps,
    totalQuestions,
    answeredQuestions,
    progress,
    setStep,
    setAnswer,
    nextStep,
    prevStep,
    saveProgress,
    submitAssessment,
    isStepValid,
    retryInitialization,
  }

  return (
    <AssessmentContext.Provider value={value}>
      {children}
    </AssessmentContext.Provider>
  )
}

export function useAssessment() {
  const context = useContext(AssessmentContext)
  if (!context) {
    throw new Error('useAssessment must be used within an AssessmentProvider')
  }
  return context
}
