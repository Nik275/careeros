"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { 
  Briefcase, 
  TrendingUp, 
  DollarSign, 
  Bookmark,
  ChevronRight,
  MapPin,
  Check,
  ArrowUpRight,
  GraduationCap,
  Sparkles,
  AlertTriangle,
  Target,
  Zap,
  Brain,
  BarChart3,
  Users
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { CareerIntelligence } from "@/lib/career-data"

interface CareerCardProps {
  career: CareerIntelligence
  matchScore?: number
  matchInsights?: string[]
  userSkills?: Record<string, number>
  index?: number
  onSave?: (careerId: string) => void
  isSaved?: boolean
}

export function CareerCard({ 
  career, 
  matchScore = 85, 
  matchInsights = [],
  userSkills = {},
  index = 0,
  onSave,
  isSaved = false
}: CareerCardProps) {
  const formatSalary = (amount: number) => `₹${(amount / 100000).toFixed(0)}L`

  const getMatchStyles = (score: number) => {
    if (score >= 90) return {
      badge: "bg-emerald-500/25 text-emerald-400 border-emerald-500/50",
      glow: "shadow-emerald-500/20",
      gradient: "from-emerald-500/15 via-emerald-500/5 to-transparent",
      icon: "text-emerald-400"
    }
    if (score >= 80) return {
      badge: "bg-emerald-500/20 text-emerald-400/90 border-emerald-500/40",
      glow: "shadow-emerald-500/15",
      gradient: "from-emerald-500/10 via-emerald-500/3 to-transparent",
      icon: "text-emerald-400"
    }
    if (score >= 70) return {
      badge: "bg-amber-500/20 text-amber-400 border-amber-500/40",
      glow: "shadow-amber-500/15",
      gradient: "from-amber-500/10 via-amber-500/3 to-transparent",
      icon: "text-amber-400"
    }
    return {
      badge: "bg-blue-500/20 text-blue-400 border-blue-500/40",
      glow: "shadow-blue-500/15",
      gradient: "from-blue-500/10 via-blue-500/3 to-transparent",
      icon: "text-blue-400"
    }
  }

  const getDemandStyles = (demand: string) => {
    const colors: Record<string, { text: string; bg: string }> = {
      "very-high": { text: "text-emerald-400", bg: "bg-emerald-500/10" },
      "high": { text: "text-emerald-400/80", bg: "bg-emerald-500/8" },
      "medium": { text: "text-amber-400", bg: "bg-amber-500/10" },
      "low": { text: "text-rose-400", bg: "bg-rose-500/10" },
    }
    return colors[demand] || { text: "text-white/50", bg: "bg-white/[0.05]" }
  }

  const matchStyles = getMatchStyles(matchScore)
  const demandStyles = getDemandStyles(career.marketData.demandLevel)

  // Calculate skill gaps
  const criticalSkills = career.skills.filter(s => s.importance === "critical").slice(0, 3)
  const skillGaps = criticalSkills.map(skill => {
    const userLevel = userSkills[skill.name] || 50
    const gap = skill.requiredLevel - userLevel
    return { ...skill, userLevel, gap }
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.08 }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className={cn(
        "group relative overflow-hidden rounded-xl",
        "bg-white/[0.06]",
        "backdrop-blur-xl",
        "border border-white/[0.12]",
        "hover:border-white/[0.18]",
        "hover:shadow-xl hover:shadow-violet-500/[0.12]",
        "transition-all duration-300",
        "flex flex-col"
      )}
    >
      {/* Top gradient tint */}
      <div className={cn(
        "absolute inset-x-0 top-0 h-24 bg-gradient-to-b opacity-80",
        matchStyles.gradient
      )} />
      
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-500/0 via-white/30 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative p-4 flex flex-col flex-1">
        {/* Header: Title + Match Score */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2 rounded-lg bg-violet-500/15 border border-violet-500/25 shrink-0">
              <Briefcase className="w-4 h-4 text-violet-400" />
            </div>
            <div className="min-w-0">
              <h4 className="font-semibold text-white text-[16px] leading-tight truncate">
                {career.title}
              </h4>
              <p className="text-[11px] text-white/40 mt-0.5 truncate">{career.category}</p>
            </div>
          </div>
          <div className={cn(
            "px-2.5 py-1 rounded-lg border text-[12px] font-bold shrink-0",
            matchStyles.badge
          )}>
            {matchScore}% Match
          </div>
        </div>

        {/* Match Insights */}
        {matchInsights.length > 0 && (
          <div className="mb-3">
            <div className="flex items-center gap-1.5 mb-2">
              <Sparkles className="w-3 h-3 text-violet-400" />
              <p className="text-[10px] text-white/30 uppercase tracking-wider font-medium">Why this matches you</p>
            </div>
            <div className="space-y-1">
              {matchInsights.slice(0, 2).map((insight, i) => (
                <div key={i} className="flex items-center gap-1.5 text-[11px] text-white/60">
                  <Check className={cn("w-3.5 h-3.5 shrink-0", matchStyles.icon)} />
                  <span className="line-clamp-1">{insight}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Market Intelligence */}
        <div className="mb-3">
          <div className="flex items-center gap-1.5 mb-2">
            <BarChart3 className="w-3 h-3 text-white/30" />
            <p className="text-[10px] text-white/30 uppercase tracking-wider font-medium">Market Intelligence</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-white/[0.06] border border-white/[0.08]">
              <DollarSign className="w-3.5 h-3.5 text-emerald-400/80" />
              <span className="text-[12px] font-semibold text-white/90">
                {formatSalary(career.marketData.entrySalary)}–{formatSalary(career.marketData.seniorSalary)}
              </span>
            </div>
            <div className={cn(
              "flex items-center gap-1.5 px-2 py-1.5 rounded-lg border text-[11px] font-medium capitalize",
              demandStyles.bg,
              "border-white/[0.08]",
              demandStyles.text
            )}>
              <TrendingUp className="w-3.5 h-3.5" />
              {career.marketData.demandLevel.replace("-", " ")} Demand
            </div>
          </div>
        </div>

        {/* Skill Gap Analysis */}
        <div className="mb-3">
          <div className="flex items-center gap-1.5 mb-2">
            <Target className="w-3 h-3 text-white/30" />
            <p className="text-[10px] text-white/30 uppercase tracking-wider font-medium">Skill Alignment</p>
          </div>
          <div className="space-y-1.5">
            {skillGaps.map((skill, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-[10px] text-white/50 w-20 truncate">{skill.name}</span>
                <div className="flex-1 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                  <div 
                    className={cn(
                      "h-full rounded-full transition-all",
                      skill.gap > 20 ? "bg-amber-400" : "bg-emerald-400"
                    )}
                    style={{ width: `${Math.min(skill.userLevel, 100)}%` }}
                  />
                </div>
                <span className={cn(
                  "text-[9px] w-8 text-right",
                  skill.gap > 20 ? "text-amber-400/70" : "text-emerald-400/70"
                )}>
                  {skill.gap > 20 ? `${skill.gap}% gap` : "Strong"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Challenges Preview */}
        {career.challenges.length > 0 && (
          <div className="mb-3">
            <div className="flex items-center gap-1.5 mb-2">
              <AlertTriangle className="w-3 h-3 text-amber-400/60" />
              <p className="text-[10px] text-white/30 uppercase tracking-wider font-medium">Key Challenge</p>
            </div>
            <p className="text-[11px] text-white/50 line-clamp-2">
              {career.challenges[0].description}
            </p>
          </div>
        )}

        {/* Roadmap Preview */}
        <div className="mb-4">
          <div className="flex items-center gap-1.5 mb-2">
            <MapPin className="w-3 h-3 text-white/30" />
            <p className="text-[10px] text-white/30 uppercase tracking-wider font-medium">Career Path</p>
          </div>
          <div className="flex items-center flex-wrap gap-1">
            {career.roadmap.slice(0, 4).map((step, i) => (
              <div key={i} className="flex items-center">
                <span className="text-[10px] text-white/60 bg-white/[0.06] px-2 py-1 rounded-md border border-white/[0.08]">
                  {step.title}
                </span>
                {i < 3 && (
                  <ChevronRight className="w-3 h-3 text-white/15 mx-0.5" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-2 pt-3 mt-auto border-t border-white/[0.08]">
          <Button
            size="sm"
            asChild
            className="flex-1 bg-gradient-to-r from-violet-600/90 to-cyan-600/90 hover:from-violet-600 hover:to-cyan-600 text-white h-10 text-[13px] font-semibold shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all"
          >
            <Link href={`/career/${career.id}`}>
              <span className="flex items-center justify-center gap-1.5">
                <Brain className="w-4 h-4" />
                Explore Career
                <ArrowUpRight className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
              </span>
            </Link>
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onSave?.(career.id)}
            className={cn(
              "px-3 h-10 border-white/[0.10] transition-all",
              isSaved 
                ? "bg-violet-500/20 border-violet-500/30" 
                : "bg-white/[0.04] hover:bg-white/[0.10] hover:border-white/[0.18]"
            )}
          >
            <Bookmark className={cn(
              "w-4 h-4 transition-colors",
              isSaved ? "text-violet-400 fill-violet-400" : "text-white/50 group-hover:text-white/80"
            )} />
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
