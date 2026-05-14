'use client'

import { motion } from 'framer-motion'
import { AlertTriangle, RefreshCw, LogIn, Clock } from 'lucide-react'

interface ErrorScreenProps {
  error: string
  onRetry?: () => void
  isTimeout?: boolean
  isAuthError?: boolean
}

export function ErrorScreen({ error, onRetry, isTimeout, isAuthError }: ErrorScreenProps) {
  const getIcon = () => {
    if (isAuthError) return <LogIn className="w-12 h-12 text-amber-400" />
    if (isTimeout) return <Clock className="w-12 h-12 text-orange-400" />
    return <AlertTriangle className="w-12 h-12 text-red-400" />
  }

  const getTitle = () => {
    if (isAuthError) return 'Authentication Required'
    if (isTimeout) return 'Loading Timed Out'
    return 'Something Went Wrong'
  }

  const getDescription = () => {
    if (isAuthError) return error || 'Please log in to access the assessment.'
    if (isTimeout) return 'The assessment is taking longer than expected to load.'
    return error || 'We encountered an error while loading your assessment.'
  }

  return (
    <div className="min-h-screen bg-[#020205] flex items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,50,255,0.15),transparent)]" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-[128px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-[128px]" />

      <div className="relative z-10 text-center max-w-md mx-auto px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center"
        >
          {getIcon()}
        </motion.div>

        <motion.h2
          className="text-2xl md:text-3xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {getTitle()}
        </motion.h2>

        <motion.p
          className="text-white/50 mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {getDescription()}
        </motion.p>

        {onRetry && !isAuthError && (
          <motion.button
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-[#020205] font-medium hover:bg-white/90 transition-all"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </motion.button>
        )}

        {isAuthError && (
          <motion.a
            href="/login?redirect=/assessment"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-[#020205] font-medium hover:bg-white/90 transition-all"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <LogIn className="w-5 h-5" />
            Go to Login
          </motion.a>
        )}
      </div>
    </div>
  )
}
