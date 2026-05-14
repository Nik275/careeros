'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface AuthCardProps {
    children: ReactNode
    title: string
    subtitle?: string
}

export function AuthCard({ children, title, subtitle }: AuthCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md mx-auto"
        >
            {/* Ambient glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-violet-500/10 via-blue-500/10 to-cyan-500/10 rounded-[2rem] blur-2xl opacity-50" />
            
            {/* Card */}
            <div className="relative p-8 md:p-10 rounded-2xl bg-gradient-to-b from-white/[0.03] to-white/[0.01] backdrop-blur-2xl border border-white/[0.08] shadow-[0_0_80px_-20px_rgba(0,0,0,0.5)]">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-medium text-white mb-2" style={{ letterSpacing: '-0.02em' }}>
                        {title}
                    </h1>
                    {subtitle && (
                        <p className="text-sm text-white/40">{subtitle}</p>
                    )}
                </div>

                {children}
            </div>
        </motion.div>
    )
}