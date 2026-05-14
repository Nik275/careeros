'use client'

import { motion } from 'framer-motion'

interface AssessmentProgressProps {
  progress: number
}

export function AssessmentProgress({ progress }: AssessmentProgressProps) {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-white/50">Overall Progress</span>
        <span className="text-sm font-medium text-violet-400">{progress}%</span>
      </div>
      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-violet-500 to-blue-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}
