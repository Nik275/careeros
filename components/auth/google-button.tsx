'use client'

import { motion } from 'framer-motion'
import { Chrome } from 'lucide-react'

interface GoogleButtonProps {
    onClick: () => void
    isLoading?: boolean
    label?: string
}

export function GoogleButton({ onClick, isLoading, label = 'Continue with Google' }: GoogleButtonProps) {
    return (
        <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={onClick}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 h-12 px-4 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
        >
            {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
            ) : (
                <>
                    <Chrome className="w-5 h-5 text-white/60 group-hover:text-white/80 transition-colors" />
                    <span className="text-sm font-medium text-white/70 group-hover:text-white/90">{label}</span>
                </>
            )}
        </motion.button>
    )
}