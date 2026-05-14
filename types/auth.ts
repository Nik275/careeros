export type ClassLevel = 'class_10' | 'class_11' | 'class_12' | 'dropper' | 'college_student'

export interface UserProfile {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  class_level: ClassLevel | null
  career_interest: string | null
  subscription_plan: 'free' | 'pro' | 'premium'
  assessment_completed: boolean
  created_at: string
  updated_at: string
}

export interface SignUpData {
  email: string
  password: string
  fullName: string
  classLevel: ClassLevel
  careerInterest?: string
}

export interface SignInData {
  email: string
  password: string
  rememberMe?: boolean
}

export interface AuthError {
  message: string
  code?: string
}

export interface CareerInterest {
  id: string
  name: string
  category: string
  description: string | null
}

export const classLevelOptions: { value: ClassLevel; label: string }[] = [
  { value: 'class_10', label: 'Class 10' },
  { value: 'class_11', label: 'Class 11' },
  { value: 'class_12', label: 'Class 12' },
  { value: 'dropper', label: 'Dropper (Gap Year)' },
  { value: 'college_student', label: 'College Student' },
]