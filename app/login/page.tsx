'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import { Mail, Lock, ArrowLeft, AlertCircle, Loader2 } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'
import { AuthCard } from '@/components/auth/auth-card'
import { GoogleButton } from '@/components/auth/google-button'
import { Divider } from '@/components/auth/divider'
import { InputField } from '@/components/auth/input-field'
import { SubmitButton } from '@/components/auth/submit-button'

export default function LoginPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const redirect = searchParams.get('redirect') || '/dashboard'
    const error = searchParams.get('error')
    const message = searchParams.get('message')
    
    const { signIn, signInWithGoogle, resendVerificationEmail, user, isAuthenticated } = useAuth()
    
    const [isLoading, setIsLoading] = useState(false)
    const [isGoogleLoading, setIsGoogleLoading] = useState(false)
    const [isResending, setIsResending] = useState(false)
    const [resendCooldown, setResendCooldown] = useState(0)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [unverifiedEmail, setUnverifiedEmail] = useState<string | null>(null)
    const [showVerificationBanner, setShowVerificationBanner] = useState(false)

    // Handle cooldown timer
    useEffect(() => {
        if (resendCooldown > 0) {
            const timer = setInterval(() => {
                setResendCooldown((prev) => prev - 1)
            }, 1000)
            return () => clearInterval(timer)
        }
    }, [resendCooldown])

    // Display callback errors
    useEffect(() => {
        if (error) {
            const errorMessages: Record<string, string> = {
                'no_code': 'Authentication code missing. Please try again.',
                'exchange_failed': 'Failed to verify email. The link may have expired.',
                'user_not_found': 'User account not found. Please sign up.',
                'auth_callback_failed': 'Authentication failed. Please try again.',
                'unexpected': 'An unexpected error occurred. Please try again.',
            }
            toast.error(errorMessages[error] || message || 'Authentication failed')
        }
    }, [error, message])

    // Debug: Log auth state changes
    useEffect(() => {
        console.log('[Login] Auth state changed:', { isAuthenticated, user: user?.email, isLoading })
    }, [isAuthenticated, user, isLoading])

    // Debug: Check cookies on mount
    useEffect(() => {
        console.log('[Login] Page mounted')
        console.log('[Login] Document cookies:', document.cookie.substring(0, 100) + '...')
    }, [])

    const validateForm = () => {
        const newErrors: Record<string, string> = {}
        
        if (!formData.email) {
            newErrors.email = 'Email is required'
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email'
        }
        
        if (!formData.password) {
            newErrors.password = 'Password is required'
        }
        
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!validateForm()) return
        
        setIsLoading(true)
        setUnverifiedEmail(null)
        setShowVerificationBanner(false)
        
        console.log('[Login] Attempting signin for:', formData.email)
        
        try {
            const { error } = await signIn({
                email: formData.email,
                password: formData.password,
            })
            
            if (error) {
                console.error('[Login] Error:', error)
                
                // Check if error is due to unverified email
                const isUnverified = error.code === 'email_not_confirmed' || 
                    error.message?.toLowerCase().includes('email not confirmed') ||
                    error.message?.toLowerCase().includes('not verified') ||
                    error.message?.toLowerCase().includes('email_address_not_confirmed')
                
                if (isUnverified) {
                    console.log('[Login] User email not verified, showing banner')
                    setUnverifiedEmail(formData.email)
                    setShowVerificationBanner(true)
                    toast.error('Please verify your email before signing in')
                } else {
                    toast.error(`${error.message}${error.code ? ` (Code: ${error.code})` : ''}`)
                }
            } else {
                console.log('[Login] Signin successful, redirecting to:', redirect)
                toast.success('Welcome back!')
                
                // Small delay to ensure cookies are set before redirect
                await new Promise(resolve => setTimeout(resolve, 300))
                
                console.log('[Login] Executing redirect to:', redirect)
                
                // Use window.location for hard redirect to ensure middleware picks up session
                window.location.href = redirect
            }
        } catch (err) {
            console.error('[Login] Unexpected error:', err)
            toast.error('An unexpected error occurred. Please try again.')
        } finally {
            console.log('[Login] Resetting loading state')
            setIsLoading(false)
        }
    }

    const handleGoogleSignIn = async () => {
        setIsGoogleLoading(true)
        const { error } = await signInWithGoogle()
        
        if (error) {
            toast.error(error.message)
            setIsGoogleLoading(false)
        }
        // Redirect happens automatically via OAuth
    }

    const handleResendVerification = async () => {
        const emailToResend = unverifiedEmail || formData.email
        
        if (!emailToResend) {
            toast.error('Please enter your email address')
            return
        }

        setIsResending(true)
        console.log('[Login] Resending verification to:', emailToResend)
        
        const { error } = await resendVerificationEmail(emailToResend)
        
        if (error) {
            console.error('[Login] Resend error:', error)
            toast.error(`${error.message}${error.code ? ` (Code: ${error.code})` : ''}`)
        } else {
            console.log('[Login] Resend successful')
            toast.success('Verification email sent! Check your inbox.')
            setResendCooldown(60) // 60 second cooldown
        }
        
        setIsResending(false)
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
                        href="/"
                        className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to home
                    </Link>
                </motion.div>

                <AuthCard 
                    title="Welcome back"
                    subtitle="Sign in to continue your career journey"
                >
                    {/* Error Alert */}
                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-start gap-2"
                            >
                                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                                <div className="text-sm text-red-300">
                                    {error === 'exchange_failed' && 'Email verification failed. The link may have expired.'}
                                    {error === 'no_code' && 'Authentication code missing. Please try again.'}
                                    {error === 'user_not_found' && 'Account not found. Please sign up.'}
                                    {error === 'auth_callback_failed' && 'Authentication failed. Please try again.'}
                                    {!['exchange_failed', 'no_code', 'user_not_found', 'auth_callback_failed'].includes(error) && (message || 'Authentication error')}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Unverified Email Banner */}
                    <AnimatePresence>
                        {showVerificationBanner && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="mb-4 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20"
                            >
                                <div className="flex items-start gap-3">
                                    <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                                    <div className="flex-1">
                                        <p className="text-sm text-amber-200 mb-2">
                                            Your email is not verified. Please check your inbox or resend the verification email.
                                        </p>
                                        <button
                                            onClick={handleResendVerification}
                                            disabled={isResending || resendCooldown > 0}
                                            className="text-xs font-medium text-amber-400 hover:text-amber-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
                                        >
                                            {isResending ? (
                                                <>
                                                    <Loader2 className="w-3 h-3 animate-spin" />
                                                    Sending...
                                                </>
                                            ) : resendCooldown > 0 ? (
                                                <>Resend available in {resendCooldown}s</>
                                            ) : (
                                                'Resend verification email'
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Google Sign In */}
                    <GoogleButton 
                        onClick={handleGoogleSignIn} 
                        isLoading={isGoogleLoading}
                    />

                    <Divider />

                    {/* Email Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <InputField
                            label="Email"
                            type="email"
                            placeholder="you@example.com"
                            icon={Mail}
                            value={formData.email}
                            onChange={(e) => {
                                setFormData({ ...formData, email: e.target.value })
                                setUnverifiedEmail(null)
                                setShowVerificationBanner(false)
                            }}
                            error={errors.email}
                        />

                        <div>
                            <InputField
                                label="Password"
                                type="password"
                                placeholder="Enter your password"
                                icon={Lock}
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                error={errors.password}
                            />
                            <div className="mt-2 text-right">
                                <Link 
                                    href="/forgot-password"
                                    className="text-xs text-violet-400/70 hover:text-violet-400 transition-colors"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                        </div>

                        <SubmitButton isLoading={isLoading}>
                            Sign in
                        </SubmitButton>
                    </form>

                    {/* Sign up link */}
                    <p className="mt-6 text-center text-sm text-white/40">
                        Don&apos;t have an account?{' '}
                        <Link 
                            href="/signup"
                            className="text-white/70 hover:text-white transition-colors font-medium"
                        >
                            Create one
                        </Link>
                    </p>
                </AuthCard>
            </div>
        </div>
    )
}
