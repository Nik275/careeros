import { UserRole, AssessmentStatus, RecommendationType } from "@prisma/client"

export interface User {
  id: string
  email: string
  name?: string | null
  image?: string | null
  role: UserRole
}

export interface Profile {
  id: string
  userId: string
  phone?: string | null
  location?: string | null
  education?: string | null
  grade?: string | null
  interests: string[]
  strengths: string[]
}

export interface Assessment {
  id: string
  userId: string
  responses: Record<string, any>
  status: AssessmentStatus
  completedAt?: Date | null
  createdAt: Date
}

export interface Recommendation {
  id: string
  userId: string
  assessmentId: string
  type: RecommendationType
  title: string
  description: string
  data: Record<string, any>
  confidence?: number | null
  isViewed: boolean
  isSaved: boolean
  createdAt: Date
}

export interface NavItem {
  title: string
  href: string
  icon?: string
}

export interface Feature {
  title: string
  description: string
  icon: string
}

export interface PricingTier {
  name: string
  price: number
  description: string
  features: string[]
  isPopular?: boolean
}
