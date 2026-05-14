'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, LucideIcon } from 'lucide-react'
import { useState, forwardRef } from 'react'

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string
    error?: string
    icon?: LucideIcon
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
    ({ label, error, icon: Icon, type = 'text', className = '', ...props }, ref) => {
        const [showPassword, setShowPassword] = useState(false)
        const isPassword = type === 'password'
        const inputType = isPassword ? (showPassword ? 'text' : 'password') : type

        return (
            <div className={className}>
                <label className="block text-xs text-white/50 mb-2 uppercase tracking-wider">
                    {label}
                </label>
                <div className="relative">
                    {Icon && (
                        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    )}
                    <input
                        ref={ref}
                        type={inputType}
                        className={`
                            w-full h-12 px-4 rounded-xl bg-white/[0.03] border border-white/[0.08]
                            text-white placeholder:text-white/20
                            focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.05]
                            transition-all duration-300
                            ${Icon ? 'pl-11' : ''}
                            ${isPassword ? 'pr-12' : ''}
                            ${error ? 'border-red-500/50 focus:border-red-500/50' : ''}
                        `}
                        {...props}
                    />
                    {isPassword && (
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/50 transition-colors"
                        >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    )}
                </div>
                <AnimatePresence>
                    {error && (
                        <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="mt-2 text-xs text-red-400/80"
                        >
                            {error}
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>
        )
    }
)

InputField.displayName = 'InputField'