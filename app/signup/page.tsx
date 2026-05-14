'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import { Mail, Lock, User, GraduationCap, Briefcase, ArrowLeft, Check, Loader2, AlertCircle } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'
import { useCareerInterests } from '@/hooks/use-career-interests'
import { AuthCard } from '@/components/auth/auth-card'
import { GoogleButton } from '@/components/auth/google-button'
import { Divider } from '@/components/auth/divider'
import { InputField } from '@/components/auth/input-field'
import { SelectField } from '@/components/auth/select-field'
import { SubmitButton } from '@/components/auth/submit-button'
import { classLevelOptions, ClassLevel } from '@/types/auth'

export default function SignupPage() {
    const router = useRouter()
    const { signUp, signInWithGoogle, resendVerificationEmail } = useAuth()
    const { interests, isLoading: interestsLoading } = useCareerInterests()
    
    const [isLoading, setIsLoading] = useState(false)
    const [isGoogleLoading, setIsGoogleLoading] = useState(false)
    const [isResending, setIsResending] = useState(false)
    const [resendCooldown, setResendCooldown] = useState(0)
    const [step, setStep] = useState(1)
    const [showSuccess, setShowSuccess] = useState(false)
    const [registeredEmail, setRegisteredEmail] = useState('')
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        classLevel: '' as ClassLevel | '',
        careerInterest: '',
    })
    const [errors, setErrors] = useState<Record<string, string>>({})

    // Handle cooldown timer
    useEffect(() => {
        if (resendCooldown > 0) {
            const timer = setInterval(() => {
                setResendCooldown((prev) => prev - 1)
            }, 1000)
            return () => clearInterval(timer)
        }
    }, [resendCooldown])

    const validateStep1 = () => {
        const newErrors: Record<string, string> = {}
        
        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Full name is required'
        }
        
        if (!formData.email) {
            newErrors.email = 'Email is required'
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email'
        }
        
        if (!formData.password) {
            newErrors.password = 'Password is required'
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters'
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
            newErrors.password = 'Must include uppercase, lowercase, and number'
        }
        
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match'
        }
        
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const validateStep2 = () => {
        const newErrors: Record<string, string> = {}
        
        if (!formData.classLevel) {
            newErrors.classLevel = 'Please select your class level'
        }
        
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleNext = () => {
        if (validateStep1()) {
            setStep(2)
        }
    }

    const handleBack = () => {
        setStep(1)
        setErrors({})
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!validateStep2()) return
        
        setIsLoading(true)
        
        const { error, existingUnconfirmed } = await signUp({
            email: formData.email,
            password: formData.password,
            fullName: formData.fullName,
            classLevel: formData.classLevel as ClassLevel,
            careerInterest: formData.careerInterest || undefined,
        })
        
        if (error) {
            console.error('[Signup] Error:', error)
            toast.error(`${error.message}${error.code ? ` (Code: ${error.code})` : ''}`)
            setIsLoading(false)
        } else if (existingUnconfirmed) {
            // User already exists but was unconfirmed - we resent the email
            console.log('[Signup] Existing unconfirmed user, resent verification email')
            setRegisteredEmail(formData.email)
            setShowSuccess(true)
            setResendCooldown(60)
            toast.success('Verification email resent! Please check your inbox.')
        } else {
            console.log('[Signup] New user created successfully')
            setRegisteredEmail(formData.email)
            setShowSuccess(true)
            setResendCooldown(60) // Start with 60 second cooldown
            toast.success('Account created! Please check your email to verify.')
        }
    }

    const handleGoogleSignIn = async () => {
        setIsGoogleLoading(true)
        const { error } = await signInWithGoogle()
        
        if (error) {
            toast.error(error.message)
            setIsGoogleLoading(false)
        }
    }

    const handleResendVerification = async () => {
        if (!registeredEmail) return

        setIsResending(true)
        console.log('[Signup] Resending verification to:', registeredEmail)
        
        const { error } = await resendVerificationEmail(registeredEmail)
        
        if (error) {
            console.error('[Signup] Resend error:', error)
            toast.error(`${error.message}${error.code ? ` (Code: ${error.code})` : ''}`)
        } else {
            console.log('[Signup] Resend successful')
            toast.success('Verification email resent! Check your inbox.')
            setResendCooldown(60) // 60 second cooldown
        }
        
        setIsResending(false)
    }

    const careerInterestOptions = interests.map(i => ({
        value: i.name,
        label: i.name,
    }))

    // Success state after signup
    if (showSuccess) {
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
                        title="Verify your email"
                        subtitle="We have sent you a confirmation email"
                    >
                        <div className="text-center py-4">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500/10 flex items-center justify-center">
                                <Mail className="w-8 h-8 text-emerald-400" />
                            </div>
                            
                            <p className="text-sm text-white/50 mb-2">
                                We&apos;ve sent a verification email to
                            </p>
                            <p className="text-base text-white/80 font-medium mb-6">
                                {registeredEmail}
                            </p>
                            
                            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] mb-6">
                                <p className="text-sm text-white/40 mb-4">
                                    Click the link in your email to verify your account and continue.
                                </p>
                                
                                <button
                                    onClick={handleResendVerification}
                                    disabled={isResending || resendCooldown > 0}
                                    className="w-full py-2.5 px-4 rounded-lg bg-white/[0.03] border border-white/[0.06] text-sm text-white/60 hover:text-white/80 hover:bg-white/[0.05] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isResending ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Sending...
                                        </>
                                    ) : resendCooldown > 0 ? (
                                        <>
                                            <AlertCircle className="w-4 h-4" />
                                            Resend available in {resendCooldown}s
                                        </>
                                    ) : (
                                        'Resend verification email'
                                    )}
                                </button>
                            </div>

                            <Link 
                                href="/login"
                                className="text-sm text-violet-400/70 hover:text-violet-400 transition-colors"
                            >
                                Already verified? Sign in
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
                        href="/"
                        className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to home
                    </Link>
                </motion.div>

                <AuthCard 
                    title={step === 1 ? "Create your account" : "Almost there"}
                    subtitle={step === 1 
                        ? "Start your personalized career journey" 
                        : "Tell us a bit more about yourself"
                    }
                >
                    {/* Progress indicator */}
                    <div className="flex items-center gap-2 mb-6">
                        <div className={`h-1 flex-1 rounded-full transition-colors ${step >= 1 ? 'bg-violet-500' : 'bg-white/10'}`} />
                        <div className={`h-1 flex-1 rounded-full transition-colors ${step >= 2 ? 'bg-violet-500' : 'bg-white/10'}`} />
                    </div>

                    {step === 1 ? (
                        <>
                            {/* Google Sign Up */}
                            <GoogleButton 
                                onClick={handleGoogleSignIn} 
                                isLoading={isGoogleLoading}
                                label="Sign up with Google"
                            />

                            <Divider />

                            {/* Step 1 Form */}
                            <div className="space-y-4">
                                <InputField
                                    label="Full Name"
                                    type="text"
                                    placeholder="Your full name"
                                    icon={User}
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                    error={errors.fullName}
                                />

                                <InputField
                                    label="Email"
                                    type="email"
                                    placeholder="you@example.com"
                                    icon={Mail}
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    error={errors.email}
                                />

                                <InputField
                                    label="Password"
                                    type="password"
                                    placeholder="Create a strong password"
                                    icon={Lock}
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    error={errors.password}
                                />

                                <InputField
                                    label="Confirm Password"
                                    type="password"
                                    placeholder="Confirm your password"
                                    icon={Lock}
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    error={errors.confirmPassword}
                                />

                                <motion.button
                                    type="button"
                                    onClick={handleNext}
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    className="w-full flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-white text-[#020205] font-medium text-sm hover:bg-white/95 transition-all duration-300 shadow-[0_0_30px_-10px_rgba(255,255,255,0.2)]"
                                >
                                    Continue
                                    <ArrowLeft className="w-4 h-4 rotate-180" />
                                </motion.button>
                            </div>
                        </>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <SelectField
                                label="Current Class/Level"
                                icon={GraduationCap}
                                placeholder="Select your class"
                                options={classLevelOptions.map(opt => ({ value: opt.value, label: opt.label }))}
                                value={formData.classLevel}
                                onChange={(e) => setFormData({ ...formData, classLevel: e.target.value as ClassLevel })}
                                error={errors.classLevel}
                            />

                            <SelectField
                                label="Career Interest (Optional)"
                                icon={Briefcase}
                                placeholder="Select your interest"
                                options={[{ value: '', label: 'I\'m not sure yet' }, ...careerInterestOptions]}
                                value={formData.careerInterest}
                                onChange={(e) => setFormData({ ...formData, careerInterest: e.target.value })}
                            />

                            <div className="flex gap-3">
                                <motion.button
                                    type="button"
                                    onClick={handleBack}
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    className="flex-1 h-12 px-6 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white/70 font-medium text-sm hover:bg-white/[0.06] transition-all duration-300"
                                >
                                    Back
                                </motion.button>
                                <div className="flex-[2]">
                                    <SubmitButton isLoading={isLoading}>
                                        Create account
                                    </SubmitButton>
                                </div>
                            </div>
                        </form>
                    )}

                    {/* Sign in link */}
                    <p className="mt-6 text-center text-sm text-white/40">
                        Already have an account?{' '}
                        <Link 
                            href="/login"
                            className="text-white/70 hover:text-white transition-colors font-medium"
                        >
                            Sign in
                        </Link>
                    </p>
                </AuthCard>
            </div>
        </div>
    )
}
