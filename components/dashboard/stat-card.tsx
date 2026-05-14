"use client"

import { motion } from "framer-motion"
import { 
  ClipboardCheck, 
  Lightbulb, 
  GraduationCap, 
  Target,
  TrendingUp,
  Users,
  Award,
  BookOpen,
  Bookmark,
  Zap,
  LucideIcon,
  CheckCircle2,
  Clock,
  Star,
  TrendingUpIcon
} from "lucide-react"
import { cn } from "@/lib/utils"

type IconName = 
  | "clipboard-check" 
  | "lightbulb" 
  | "graduation-cap" 
  | "target"
  | "trending-up"
  | "users"
  | "award"
  | "book-open"
  | "bookmark"
  | "zap"

interface StatCardProps {
  title: string
  value: string | number
  subtitle: string
  meta?: string
  icon: IconName
  color?: "blue" | "purple" | "emerald" | "amber" | "rose" | "cyan" | "violet"
  delay?: number
  showPercentage?: boolean
  status?: "completed" | "in-progress" | "empty"
}

const iconMap: Record<IconName, LucideIcon> = {
  "clipboard-check": ClipboardCheck,
  "lightbulb": Lightbulb,
  "graduation-cap": GraduationCap,
  "target": Target,
  "trending-up": TrendingUp,
  "users": Users,
  "award": Award,
  "book-open": BookOpen,
  "bookmark": Bookmark,
  "zap": Zap,
}

const colorVariants = {
  blue: {
    icon: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    bar: "from-blue-400 to-cyan-400",
    glow: "shadow-blue-500/10",
    meta: "text-blue-400/70",
  },
  purple: {
    icon: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    bar: "from-purple-400 to-pink-400",
    glow: "shadow-purple-500/10",
    meta: "text-purple-400/70",
  },
  emerald: {
    icon: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    bar: "from-emerald-400 to-teal-400",
    glow: "shadow-emerald-500/10",
    meta: "text-emerald-400/70",
  },
  amber: {
    icon: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    bar: "from-amber-400 to-orange-400",
    glow: "shadow-amber-500/10",
    meta: "text-amber-400/70",
  },
  rose: {
    icon: "text-rose-400",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
    bar: "from-rose-400 to-pink-400",
    glow: "shadow-rose-500/10",
    meta: "text-rose-400/70",
  },
  cyan: {
    icon: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    bar: "from-cyan-400 to-blue-400",
    glow: "shadow-cyan-500/10",
    meta: "text-cyan-400/70",
  },
  violet: {
    icon: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
    bar: "from-violet-400 to-purple-400",
    glow: "shadow-violet-500/10",
    meta: "text-violet-400/70",
  },
}

export function StatCard({
  title,
  value,
  subtitle,
  meta,
  icon,
  color = "blue",
  delay = 0,
  showPercentage = false,
  status = "completed",
}: StatCardProps) {
  const colors = colorVariants[color]
  const Icon = iconMap[icon]

  const getStatusIcon = () => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-3 h-3 text-emerald-400/70" />
      case "in-progress":
        return <Clock className="w-3 h-3 text-amber-400/70" />
      default:
        return <Star className="w-3 h-3 text-white/30" />
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className={cn(
        "relative overflow-hidden rounded-xl",
        "bg-white/[0.05] backdrop-blur-xl",
        "border border-white/[0.10]",
        "hover:border-white/[0.15]",
        "hover:shadow-lg",
        colors.glow,
        "group cursor-pointer",
        "transition-all duration-300"
      )}
    >
      {/* Subtle top glow */}
      <div className={cn(
        "absolute inset-x-0 top-0 h-px opacity-0 group-hover:opacity-100 transition-opacity",
        "bg-gradient-to-r from-transparent via-white/25 to-transparent"
      )} />

      <div className="relative p-4">
        {/* Header with icon and status */}
        <div className="flex items-center justify-between mb-3">
          <div className={cn(
            "p-2 rounded-lg border",
            colors.bg,
            colors.border
          )}>
            <Icon className={cn("w-4 h-4", colors.icon)} />
          </div>
          {meta && (
            <div className="flex items-center gap-1 text-[10px]">
              {getStatusIcon()}
              <span className={cn("font-medium", colors.meta)}>{meta}</span>
            </div>
          )}
        </div>

        {/* Value */}
        <div className="flex items-baseline gap-1">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: delay + 0.1 }}
            className="text-3xl font-bold text-white tracking-tight"
          >
            {value}
          </motion.span>
          {showPercentage && (
            <span className="text-[11px] text-white/30">%</span>
          )}
        </div>

        {/* Title & Subtitle */}
        <p className="text-[14px] font-semibold text-white/90 mt-1">{title}</p>
        <p className="text-[11px] text-white/40 mt-0.5">{subtitle}</p>

        {/* Progress bar */}
        <div className="mt-3 h-1 bg-white/[0.06] rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: showPercentage ? `${value}%` : "75%" }}
            transition={{ duration: 0.8, delay: delay + 0.2 }}
            className={cn(
              "h-full rounded-full bg-gradient-to-r",
              colors.bar
            )}
          />
        </div>
      </div>
    </motion.div>
  )
}
