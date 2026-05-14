'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

interface SubmitButtonProps {
    children: React.ReactNode
    isLoading?: boolean
    disabled?: boolean
}

export function SubmitButton({ children, isLoading, disabled }: SubmitButtonProps) {
    return (
        <motion.button
            type="submit"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            disabled={isLoading || disabled}
            className="w-full flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-white text-[#020205] font-medium text-sm hover:bg-white/95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_30px_-10px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_-5px_rgba(255,255,255,0.3)]"
        >
            {isLoading ? (
                <div className="w-5 h-5 border-2 border-[#020205]/20 border-t-[#020205] rounded-full animate-spin" />
            ) : (
                <>
                    {children}
                    <ArrowRight className="w-4 h-4" />
                </>
            )}
        </motion.button>
    )
}