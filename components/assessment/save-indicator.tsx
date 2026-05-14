'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Check, Loader2 } from 'lucide-react'

interface SaveIndicatorProps {
  isSaving: boolean
  lastSavedAt: Date | null
}

export function SaveIndicator({ isSaving, lastSavedAt }: SaveIndicatorProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    })
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence mode="wait">
        {isSaving ? (
          <motion.div
            key="saving"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/60"
          >
            <Loader2 className="w-4 h-4 animate-spin" />
            Saving...
          </motion.div>
        ) : lastSavedAt ? (
          <motion.div
            key="saved"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-sm text-emerald-400"
          >
            <Check className="w-4 h-4" />
            Saved at {formatTime(lastSavedAt)}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
