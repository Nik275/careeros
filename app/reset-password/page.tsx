'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { Lock, ArrowLeft, CheckCircle2 } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'
import { createClient } from '@/lib/supabase/client'
import { AuthCard } from '@/components/auth/auth-card'
import { InputField } from '@/components/auth/input-field'
import { SubmitButton } from '@/components/auth/submit-button'

export default function ResetPasswordPage() {
    const router = useRouter()
    const { updatePassword } = useAuth()
    const supabase = createClient()
    
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [isValidToken, setIsValidToken] = useState(true)
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState<Record<string, string>>({})

    // Verify the reset token on mount
    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            if (!session) {
                setIsValidToken(false)
            }
        }
        checkSession()
    }, [supabase])

    const validate = () => {
        const newErrors: Record<string, string> = {}
        
        if (!password) {
            newErrors.password = 'Password is required'
        } else if (password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters'
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
            newErrors.password = 'Must include uppercase, lowercase, and number'
        }
        
        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match'
        }
        
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!validate()) return
        
        setIsLoading(true)
        
        const { error } = await updatePassword(password)
        
        if (error) {
            toast.error(error.message)
            setIsLoading(false)
        } else {
            setIsSuccess(true)
            toast.success('Password updated successfully!')
            // Redirect to login after 3 seconds
            setTimeout(() => {
                router.push('/login')
            }, 3000)
        }
    }

    if (!isValidToken) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-[#020205]">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,50,255,0.15),transparent)]" />
                
                <div className="w-full max-w-md relative z-10">
                    <AuthCard 
                        title="Invalid or expired link"
                        subtitle="This password reset link is no longer valid"
                    >
                        <div className="text-center py-4">
                            <p className="text-sm text-white/50 mb-6">
                                Please request a new password reset link.
                            </p>
                            <Link 
                                href="/forgot-password"
                                className="inline-flex items-center gap-2 text-sm text-violet-400/70 hover:text-violet-400 transition-colors"
                            >
                                Request new link
                            </Link>
                        </div>
                    </AuthCard>
                </div>
            </div>
        )
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
                        title="Create new password"
                        subtitle="Enter your new password below"
                    >
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <InputField
                                label="New Password"
                                type="password"
                                placeholder="Create a strong password"
                                icon={Lock}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                error={errors.password}
                            />

                            <InputField
                                label="Confirm New Password"
                                type="password"
                                placeholder="Confirm your password"
                                icon={Lock}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                error={errors.confirmPassword}
                            />

                            <SubmitButton isLoading={isLoading}>
                                Update password
                            </SubmitButton>
                        </form>
                    </AuthCard>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <AuthCard 
                            title="Password updated"
                            subtitle="Your password has been successfully reset"
                        >
                            <div className="text-center py-4">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500/10 flex items-center justify-center">
                                    <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                                </div>
                                <p className="text-sm text-white/50 mb-4">
                                    Redirecting you to login...
                                </p>
                                <Link 
                                    href="/login"
                                    className="inline-flex items-center gap-2 text-sm text-violet-400/70 hover:text-violet-400 transition-colors"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Go to login now
                                </Link>
                            </div>
                        </AuthCard>
                    </motion.div>
                )}
            </div>
        </div>
    )
}