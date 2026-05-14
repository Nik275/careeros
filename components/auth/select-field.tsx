'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, LucideIcon } from 'lucide-react'
import { forwardRef } from 'react'

interface SelectOption {
    value: string
    label: string
}

interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label: string
    error?: string
    icon?: LucideIcon
    options: SelectOption[]
    placeholder?: string
}

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
    ({ label, error, icon: Icon, options, placeholder, className = '', ...props }, ref) => {
        return (
            <div className={className}>
                <label className="block text-xs text-white/50 mb-2 uppercase tracking-wider">
                    {label}
                </label>
                <div className="relative">
                    {Icon && (
                        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
                    )}
                    <select
                        ref={ref}
                        className={`
                            w-full h-12 px-4 rounded-xl bg-white/[0.03] border border-white/[0.08]
                            text-white appearance-none
                            focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.05]
                            transition-all duration-300
                            ${Icon ? 'pl-11' : ''}
                            ${error ? 'border-red-500/50 focus:border-red-500/50' : ''}
                        `}
                        {...props}
                    >
                        {placeholder && (
                            <option value="" disabled className="bg-[#0a0a14] text-white/30">
                                {placeholder}
                            </option>
                        )}
                        {options.map((option) => (
                            <option 
                                key={option.value} 
                                value={option.value}
                                className="bg-[#0a0a14] text-white"
                            >
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
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

SelectField.displayName = 'SelectField'