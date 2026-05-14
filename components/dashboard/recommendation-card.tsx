"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Briefcase, GraduationCap, BookOpen, Award, ArrowUpRight, DollarSign, TrendingUp, MapPin } from "lucide-react"
import Link from "next/link"

interface Recommendation {
  id: string
  type: "career" | "exam" | "college" | "skill"
  title: string
  description?: string
  confidence?: number
  salaryRange?: {
    entry?: number
    mid?: number
    senior?: number
  }
  growthRate?: number
  demandLevel?: string
  educationRequired?: string
  skillsRequired?: string[]
  isBookmarked?: boolean
}

interface RecommendationCardProps {
  recommendation: Recommendation
  index?: number
  showDetails?: boolean
}

const typeConfig = {
  career: {
    icon: Briefcase,
    label: "Career Path",
    gradient: "from-blue-500/20 to-cyan-500/20",
    border: "border-blue-500/30",
    iconBg: "bg-blue-500/20",
    iconColor: "text-blue-400",
  },
  exam: {
    icon: BookOpen,
    label: "Exam",
    gradient: "from-emerald-500/20 to-teal-500/20",
    border: "border-emerald-500/30",
    iconBg: "bg-emerald-500/20",
    iconColor: "text-emerald-400",
  },
  college: {
    icon: GraduationCap,
    label: "College",
    gradient: "from-purple-500/20 to-pink-500/20",
    border: "border-purple-500/30",
    iconBg: "bg-purple-500/20",
    iconColor: "text-purple-400",
  },
  skill: {
    icon: Award,
    label: "Skill",
    gradient: "from-amber-500/20 to-orange-500/20",
    border: "border-amber-500/30",
    iconBg: "bg-amber-500/20",
    iconColor: "text-amber-400",
  },
}

export function RecommendationCard({ recommendation, index = 0, showDetails = false }: RecommendationCardProps) {
  const config = typeConfig[recommendation.type]
  const Icon = config.icon

  const formatSalary = (amount?: number) => {
    if (!amount) return 'N/A'
    return `₹${(amount / 100000).toFixed(1)}L`
  }

  const getConfidenceColor = (confidence?: number) => {
    if (!confidence) return "text-white/40"
    if (confidence >= 0.8) return "text-emerald-400"
    if (confidence >= 0.6) return "text-amber-400"
    return "text-blue-400"
  }

  const getDemandBadge = (demand?: string) => {
    if (!demand) return null
    const colors: Record<string, string> = {
      high: "bg-emerald-500/20 text-emerald-400",
      medium: "bg-amber-500/20 text-amber-400",
      low: "bg-rose-500/20 text-rose-400",
    }
    return colors[demand] || "bg-white/10 text-white/60"
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className={cn(
        "group relative overflow-hidden rounded-xl",
        "bg-gradient-to-br from-white/5 to-white/[0.02]",
        "backdrop-blur-xl",
        "border border-white/10",
        "hover:border-white/20",
        "transition-all duration-300",
        "cursor-pointer"
      )}
    >
      {/* Hover gradient */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500",
          config.gradient
        )}
      />

      {/* Border glow */}
      <div
        className={cn(
          "absolute inset-0 rounded-xl border opacity-0 group-hover:opacity-100 transition-opacity duration-500",
          config.border
        )}
      />

      <Link href={recommendation.type === 'career' ? `/career/${recommendation.title.toLowerCase().replace(/\s+/g, '-')}` : '#'}>
        <div className="relative p-5">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "p-2.5 rounded-lg",
                  config.iconBg,
                  "border border-white/10",
                  "group-hover:scale-110 transition-transform duration-300"
                )}
              >
                <Icon className={cn("w-5 h-5", config.iconColor)} />
              </div>
              <div>
                <span
                  className={cn(
                    "text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full",
                    config.iconBg,
                    config.iconColor
                  )}
                >
                  {config.label}
                </span>
                <h4 className="font-semibold text-white mt-1.5 group-hover:text-white/90 transition-colors line-clamp-1">
                  {recommendation.title}
                </h4>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ArrowUpRight className="w-5 h-5 text-white/50" />
            </motion.div>
          </div>

          {/* Description */}
          {recommendation.description && (
            <p className="text-sm text-white/50 mt-3 line-clamp-2 group-hover:text-white/60 transition-colors">
              {recommendation.description}
            </p>
          )}

          {/* Detailed Info */}
          {showDetails && (
            <div className="mt-4 space-y-3">
              {/* Salary & Growth */}
              {recommendation.salaryRange && (
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1.5 text-white/50">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{formatSalary(recommendation.salaryRange.entry)}</span>
                  </div>
                  {recommendation.growthRate && (
                    <div className="flex items-center gap-1.5 text-white/50">
                      <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
                      <span>+{recommendation.growthRate}% growth</span>
                    </div>
                  )}
                </div>
              )}

              {/* Demand Badge */}
              {recommendation.demandLevel && (
                <div className="flex items-center gap-2">
                  <span className={cn("text-xs px-2 py-0.5 rounded-full", getDemandBadge(recommendation.demandLevel))}>
                    {recommendation.demandLevel.charAt(0).toUpperCase() + recommendation.demandLevel.slice(1)} Demand
                  </span>
                  {recommendation.educationRequired && (
                    <span className="text-xs text-white/40">
                      {recommendation.educationRequired}
                    </span>
                  )}
                </div>
              )}

              {/* Skills Preview */}
              {recommendation.skillsRequired && recommendation.skillsRequired.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {recommendation.skillsRequired.slice(0, 3).map((skill, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-white/50">
                      {skill}
                    </span>
                  ))}
                  {recommendation.skillsRequired.length > 3 && (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-white/50">
                      +{recommendation.skillsRequired.length - 3}
                    </span>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Footer with confidence */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
            {recommendation.confidence && (
              <div className="flex items-center gap-2">
                <div className="flex-1 w-20 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${recommendation.confidence * 100}%` }}
                    transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                    className={cn(
                      "h-full rounded-full",
                      recommendation.confidence >= 0.8
                        ? "bg-gradient-to-r from-emerald-400 to-teal-400"
                        : recommendation.confidence >= 0.6
                        ? "bg-gradient-to-r from-amber-400 to-orange-400"
                        : "bg-gradient-to-r from-blue-400 to-cyan-400"
                    )}
                  />
                </div>
                <span className={cn("text-xs font-medium", getConfidenceColor(recommendation.confidence))}>
                  {Math.round(recommendation.confidence * 100)}% match
                </span>
              </div>
            )}

            {/* Bookmark indicator */}
            {recommendation.isBookmarked && (
              <span className="text-xs text-violet-400">Saved</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
