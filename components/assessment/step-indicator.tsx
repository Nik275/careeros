'use client'

import { motion } from 'framer-motion'

interface AssessmentStepIndicatorProps {
  steps: number
  currentStep: number
  completedSteps: string[]
}

export function AssessmentStepIndicator({
  steps,
  currentStep,
  completedSteps,
}: AssessmentStepIndicatorProps) {
  const stepCategories = [
    'Personality',
    'Interests',
    'Skills',
    'Academic',
    'Learning',
    'Career',
    'Goals',
    'Stream',
  ]

  return (
    <div className="flex justify-between items-center gap-1 md:gap-2 overflow-x-auto pb-2">
      {Array.from({ length: steps }).map((_, index) => {
        const isCompleted = index < currentStep || completedSteps.includes(stepCategories[index].toLowerCase())
        const isCurrent = index === currentStep

        return (
          <motion.div
            key={index}
            className="flex flex-col items-center min-w-[40px] md:min-w-[60px]"
            initial={false}
            animate={{
              scale: isCurrent ? 1.1 : 1,
            }}
          >
            <div
              className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs md:text-sm font-medium transition-all duration-300 ${
                isCompleted
                  ? 'bg-gradient-to-r from-violet-500 to-blue-500 text-white'
                  : isCurrent
                  ? 'bg-white/10 border-2 border-violet-500 text-white'
                  : 'bg-white/5 text-white/30'
              }`}
            >
              {isCompleted ? (
                <svg
                  className="w-4 h-4 md:w-5 md:h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                index + 1
              )}
            </div>
            <span
              className={`text-[10px] md:text-xs mt-1 transition-colors duration-300 ${
                isCurrent ? 'text-violet-400' : 'text-white/30'
              }`}
            >
              {stepCategories[index]}
            </span>
          </motion.div>
        )
      })}
    </div>
  )
}
