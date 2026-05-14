'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'
import { AuthCard } from '@/components/auth/auth-card'
import { InputField } from '@/components/auth/input-field'
import { SubmitButton } from '@/components/auth/submit-button'

export default function ForgotPasswordPage() {
    const { resetPassword } = useAuth()
    
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')

    const validate = () => {
        if (!email) {
            setError('Email is required')
            return false
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Please enter a valid email')
            return false
        }
        setError('')
        return true
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!validate()) return
        
        setIsLoading(true)
        
        const { error: resetError } = await resetPassword(email)
        
        if (resetError) {
            toast.error(resetError.message)
            setIsLoading(false)
        } else {
            setIsSuccess(true)
            toast.success('Password reset email sent!')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-[#020205]">
            {/* Background effects */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,50,255,0.15),transparent)]" />
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-[128px]" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[128px]" />

            <div className="w-full max-w-md relative z-10">
                {/* Back link */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-8"
                >
                    <Link 
                        href="/login"
                        className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to login
                    </Link>
                </motion.div>

                {!isSuccess ? (
                    <AuthCard 
                        title="Reset your password"
                        subtitle="Enter your email and we'll send you a reset link"
                    >
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <InputField
                                label="Email"
                                type="email"
                                placeholder="you@example.com"
                                icon={Mail}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                error={error}
                            />

                            <SubmitButton isLoading={isLoading}>
                                Send reset link
                            </SubmitButton>
                        </form>

                        <p className="mt-6 text-center text-sm text-white/40">
                            Remember your password?{' '}
                            <Link 
                                href="/login"
                                className="text-white/70 hover:text-white transition-colors font-medium"
                            >
                                Sign in
                            </Link>
                        </p>
                    </AuthCard>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <AuthCard 
                            title="Check your email"
                            subtitle="We've sent you a password reset link"
                        >
                            <div className="text-center py-4">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500/10 flex items-center justify-center">
                                    <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                                </div>
                                <p className="text-sm text-white/50 mb-6">
                                    Click the link in the email we sent to <span className="text-white/70">{email}</span> to reset your password.
                                </p>
                                <Link 
                                    href="/login"
                                    className="inline-flex items-center gap-2 text-sm text-violet-400/70 hover:text-violet-400 transition-colors"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Back to login
                                </Link>
                            </div>
                        </AuthCard>
                    </motion.div>
                )}
            </div>
        </div>
    )
}