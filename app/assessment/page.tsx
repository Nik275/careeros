'use client'

import { useAssessment } from '@/contexts/assessment-context'
import { AssessmentProgress } from '@/components/assessment/progress'
import { AssessmentStepIndicator } from '@/components/assessment/step-indicator'
import { QuestionCard } from '@/components/assessment/question-card'
import { AssessmentNavigation } from '@/components/assessment/navigation'
import { LoadingScreen } from '@/components/assessment/loading-screen'
import { ErrorScreen } from '@/components/assessment/error-screen'
import { SaveIndicator } from '@/components/assessment/save-indicator'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'

export default function AssessmentPage() {
  const router = useRouter()
  const {
    state,
    currentStepData,
    totalSteps,
    progress,
    nextStep,
    prevStep,
    isStepValid,
    submitAssessment,
    retryInitialization,
  } = useAssessment()

  // Handle final submission
  const handleComplete = async () => {
    const success = await submitAssessment()
    if (success) {
      router.push('/assessment/analysis')
    }
  }

  // Show loading screen while initializing
  if (state.isLoading && !state.isInitialized && !state.error) {
    console.log('[Assessment Page] Showing loading screen')
    return <LoadingScreen message="Loading your assessment session..." />
  }

  // Show error screen if there's an error
  if (state.error) {
    console.log('[Assessment Page] Showing error screen:', state.error)
    const isAuthError = state.error.toLowerCase().includes('log in') || 
                        state.error.toLowerCase().includes('unauthorized') ||
                        state.error.toLowerCase().includes('authentication')
    const isTimeout = state.error.toLowerCase().includes('timed out') ||
                      state.error.toLowerCase().includes('timeout')
    
    return (
      <ErrorScreen
        error={state.error}
        onRetry={retryInitialization}
        isAuthError={isAuthError}
        isTimeout={isTimeout}
      />
    )
  }

  // Only show assessment if initialized
  if (!state.isInitialized) {
    console.log('[Assessment Page] Not initialized yet, showing loading')
    return <LoadingScreen />
  }

  const isLastStep = state.currentStep === totalSteps - 1

  return (
    <div className="min-h-screen bg-[#020205] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,50,255,0.15),transparent)]" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-[128px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[128px]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Career Assessment
          </h1>
          <p className="text-white/50 text-sm md:text-base">
            Discover your ideal career path through our comprehensive analysis
          </p>
        </motion.div>

        {/* Progress Bar */}
        <AssessmentProgress progress={progress} />

        {/* Step Indicator */}
        <AssessmentStepIndicator
          steps={totalSteps}
          currentStep={state.currentStep}
          completedSteps={state.completedSteps}
        />

        {/* Main Content Area */}
        <div className="mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={state.currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Step Header */}
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500/20 to-blue-500/20 border border-white/10 mb-4"
                >
                  <span className="text-3xl">{getStepIcon(currentStepData.icon)}</span>
                </motion.div>
                <h2 className="text-2xl md:text-3xl font-semibold text-white mb-2">
                  {currentStepData.title}
                </h2>
                <p className="text-white/50">{currentStepData.description}</p>
              </div>

              {/* Questions */}
              <div className="space-y-6">
                {currentStepData.questions.map((question, index) => (
                  <QuestionCard
                    key={question.id}
                    question={question}
                    index={index}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <AssessmentNavigation
          currentStep={state.currentStep}
          totalSteps={totalSteps}
          onNext={isLastStep ? handleComplete : nextStep}
          onPrev={prevStep}
          isNextDisabled={!isStepValid()}
          isLastStep={isLastStep}
        />

        {/* Save Indicator */}
        <SaveIndicator
          isSaving={state.isSaving}
          lastSavedAt={state.lastSavedAt}
        />
      </div>
    </div>
  )
}

function getStepIcon(iconName: string): string {
  const icons: Record<string, string> = {
    'UserCircle': '👤',
    'Heart': '❤️',
    'Zap': '⚡',
    'BookOpen': '📚',
    'Brain': '🧠',
    'Briefcase': '💼',
    'Target': '🎯',
    'GraduationCap': '🎓',
  }
  return icons[iconName] || '📋'
}
