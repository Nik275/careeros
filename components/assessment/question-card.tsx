'use client'

import { motion } from 'framer-motion'
import { useAssessment } from '@/contexts/assessment-context'
import { Question } from '@/lib/assessment/questions'

interface QuestionCardProps {
  question: Question
  index: number
}

export function QuestionCard({ question, index }: QuestionCardProps) {
  const { state, setAnswer } = useAssessment()
  const currentAnswer = state.answers[question.id]

  const handleSelect = (value: any) => {
    if (question.maxSelections && question.maxSelections > 1) {
      // Handle multiple selections
      const currentSelections = Array.isArray(currentAnswer) ? currentAnswer : []
      if (currentSelections.includes(value)) {
        setAnswer(
          question.id,
          currentSelections.filter((v) => v !== value)
        )
      } else if (currentSelections.length < question.maxSelections) {
        setAnswer(question.id, [...currentSelections, value])
      }
    } else {
      setAnswer(question.id, value)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 backdrop-blur-sm"
    >
      <div className="mb-4">
        <h3 className="text-lg md:text-xl font-medium text-white mb-2">
          {question.question}
          {question.required && <span className="text-violet-400 ml-1">*</span>}
        </h3>
        {question.description && (
          <p className="text-sm text-white/40">{question.description}</p>
        )}
        {question.maxSelections && question.maxSelections > 1 && (
          <p className="text-xs text-violet-400 mt-1">
            Select up to {question.maxSelections} options
          </p>
        )}
      </div>

      <div className="space-y-3">
        {question.type === 'scale' ? (
          <div className="flex flex-col gap-3">
            {question.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleSelect(option.value)}
                className={`w-full p-4 rounded-xl text-left transition-all duration-300 ${
                  currentAnswer === option.value
                    ? 'bg-violet-500/20 border-2 border-violet-500'
                    : 'bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      currentAnswer === option.value
                        ? 'border-violet-500 bg-violet-500'
                        : 'border-white/20'
                    }`}
                  >
                    {currentAnswer === option.value && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                  <span className="text-white/80">{option.label}</span>
                </div>
              </button>
            ))}
          </div>
        ) : question.type === 'yes_no' ? (
          <div className="flex gap-4">
            {question.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleSelect(option.value)}
                className={`flex-1 p-4 rounded-xl text-center transition-all duration-300 ${
                  currentAnswer === option.value
                    ? 'bg-violet-500/20 border-2 border-violet-500'
                    : 'bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06]'
                }`}
              >
                <span className="text-white/80">{option.label}</span>
              </button>
            ))}
          </div>
        ) : (
          <div
            className={`grid gap-3 ${
              question.options.length > 6
                ? 'grid-cols-1 md:grid-cols-2'
                : 'grid-cols-1'
            }`}
          >
            {question.options.map((option) => {
              const isSelected = question.maxSelections
                ? Array.isArray(currentAnswer) && currentAnswer.includes(option.value)
                : currentAnswer === option.value

              return (
                <button
                  key={option.id}
                  onClick={() => handleSelect(option.value)}
                  className={`p-4 rounded-xl text-left transition-all duration-300 ${
                    isSelected
                      ? 'bg-violet-500/20 border-2 border-violet-500'
                      : 'bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded flex items-center justify-center transition-all ${
                        question.maxSelections && question.maxSelections > 1
                          ? isSelected
                            ? 'bg-violet-500 border-2 border-violet-500'
                            : 'border-2 border-white/20'
                          : isSelected
                          ? 'border-violet-500 bg-violet-500'
                          : 'border-2 border-white/20 rounded-full'
                      }`}
                    >
                      {isSelected && question.maxSelections && question.maxSelections > 1 && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                      {isSelected && (!question.maxSelections || question.maxSelections === 1) && (
                        <div className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </div>
                    <span className="text-white/80">{option.label}</span>
                  </div>
                </button>
              )
            })}
          </div>
        )}
      </div>
    </motion.div>
  )
}
