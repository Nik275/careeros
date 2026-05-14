'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'

interface AssessmentNavigationProps {
  currentStep: number
  totalSteps: number
  onNext: () => void
  onPrev: () => void
  isNextDisabled: boolean
  isLastStep: boolean
}

export function AssessmentNavigation({
  currentStep,
  totalSteps,
  onNext,
  onPrev,
  isNextDisabled,
  isLastStep,
}: AssessmentNavigationProps) {
  return (
    <div className="flex items-center justify-between mt-10 pt-6 border-t border-white/10">
      <motion.button
        onClick={onPrev}
        disabled={currentStep === 0}
        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
          currentStep === 0
            ? 'opacity-30 cursor-not-allowed text-white/30'
            : 'text-white/70 hover:text-white hover:bg-white/[0.05]'
        }`}
        whileHover={currentStep !== 0 ? { scale: 1.02 } : {}}
        whileTap={currentStep !== 0 ? { scale: 0.98 } : {}}
      >
        <ArrowLeft className="w-5 h-5" />
        Previous
      </motion.button>

      <div className="text-sm text-white/40">
        Step {currentStep + 1} of {totalSteps}
      </div>

      <motion.button
        onClick={onNext}
        disabled={isNextDisabled}
        className={`flex items-center gap-2 px-8 py-3 rounded-xl font-medium transition-all duration-300 ${
          isNextDisabled
            ? 'bg-white/5 text-white/30 cursor-not-allowed'
            : isLastStep
            ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/20'
            : 'bg-white text-[#020205] shadow-lg shadow-white/10'
        }`}
        whileHover={!isNextDisabled ? { scale: 1.02 } : {}}
        whileTap={!isNextDisabled ? { scale: 0.98 } : {}}
      >
        {isLastStep ? (
          <>
            Complete
            <Check className="w-5 h-5" />
          </>
        ) : (
          <>
            Next
            <ArrowRight className="w-5 h-5" />
          </>
        )}
      </motion.button>
    </div>
  )
}
