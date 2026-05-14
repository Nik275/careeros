"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { 
  ArrowRight, 
  ClipboardCheck, 
  Target, 
  Bookmark, 
  TrendingUp,
  Sparkles,
  Compass,
  GraduationCap,
  Zap,
  ChevronRight
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Action {
  id: string
  title: string
  description: string
  icon: any
  href: string
  priority: "high" | "medium" | "low"
  category: string
}

interface SmartActionsProps {
  hasAssessment: boolean
  hasRecommendations: boolean
  hasBookmarks: boolean
}

export function SmartActions({ hasAssessment, hasRecommendations, hasBookmarks }: SmartActionsProps) {
  const actions: Action[] = []

  if (!hasAssessment) {
    actions.push({
      id: "1",
      title: "Complete Assessment",
      description: "Discover your ideal career path",
      icon: ClipboardCheck,
      href: "/assessment",
      priority: "high",
      category: "Start",
    })
  }

  if (hasAssessment && !hasRecommendations) {
    actions.push({
      id: "2",
      title: "Generate Matches",
      description: "Get AI career recommendations",
      icon: Sparkles,
      href: "/recommendations",
      priority: "high",
      category: "Discover",
    })
  }

  if (hasRecommendations && !hasBookmarks) {
    actions.push({
      id: "3",
      title: "Save Careers",
      description: "Bookmark interesting matches",
      icon: Bookmark,
      href: "/recommendations",
      priority: "medium",
      category: "Organize",
    })
  }

  if (hasAssessment && hasRecommendations) {
    actions.push({
      id: "4",
      title: "Explore Paths",
      description: "Deep dive into career options",
      icon: Compass,
      href: "/recommendations",
      priority: "medium",
      category: "Explore",
    })
    actions.push({
      id: "5",
      title: "Compare Colleges",
      description: "Find best institutions",
      icon: GraduationCap,
      href: "/recommendations",
      priority: "medium",
      category: "Research",
    })
  }

  if (hasBookmarks) {
    actions.push({
      id: "6",
      title: "Build Roadmap",
      description: "Plan your career journey",
      icon: Target,
      href: "/roadmap",
      priority: "low",
      category: "Plan",
    })
  }

  if (actions.length === 0) {
    actions.push({
      id: "8",
      title: "Explore Careers",
      description: "Discover new opportunities",
      icon: TrendingUp,
      href: "/recommendations",
      priority: "low",
      category: "Discover",
    })
  }

  const getPriorityStyles = (priority: string) => {
    switch (priority) {
      case "high":
        return {
          border: "border-l-[3px] border-l-rose-500/60",
          badge: "bg-rose-500/10 text-rose-400/90",
          icon: "text-rose-400/80",
          bg: "bg-rose-500/5",
        }
      case "medium":
        return {
          border: "border-l-[3px] border-l-amber-500/60",
          badge: "bg-amber-500/10 text-amber-400/90",
          icon: "text-amber-400/80",
          bg: "bg-amber-500/5",
        }
      default:
        return {
          border: "border-l-[3px] border-l-blue-500/60",
          badge: "bg-blue-500/10 text-blue-400/90",
          icon: "text-blue-400/80",
          bg: "bg-blue-500/5",
        }
    }
  }

  return (
    <div className={cn(
      "relative overflow-hidden rounded-xl",
      "bg-white/[0.05] backdrop-blur-xl",
      "border border-white/[0.10]",
      "p-4"
    )}>
      <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      
      <div className="flex items-center gap-2 mb-3">
        <div className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20">
          <Zap className="w-4 h-4 text-amber-400" />
        </div>
        <h3 className="text-[15px] font-semibold text-white">Next Steps</h3>
      </div>

      <div className="space-y-2">
        {actions.slice(0, 3).map((action, index) => {
          const Icon = action.icon
          const styles = getPriorityStyles(action.priority)
          
          return (
            <motion.div
              key={action.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: index * 0.06 }}
              whileHover={{ x: 3, transition: { duration: 0.15 } }}
              className={cn(
                "group relative overflow-hidden rounded-xl",
                "bg-white/[0.04] border border-white/[0.08]",
                styles.border,
                "hover:bg-white/[0.08] hover:border-white/[0.12]",
                "transition-all duration-200"
              )}
            >
              <Link href={action.href} className="block p-3">
                <div className="flex items-center gap-3">
                  <div className={cn("p-2 rounded-lg shrink-0 border", styles.bg, "border-white/[0.06]")}>
                    <Icon className={cn("w-4 h-4", styles.icon)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-[13px] font-semibold text-white/90 group-hover:text-white transition-colors">
                        {action.title}
                      </h4>
                      <span className={cn("text-[10px] px-1.5 py-0.5 rounded-md font-medium", styles.badge)}>
                        {action.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-white/35">
                      {action.description}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-white/10 group-hover:text-white/30 transition-colors shrink-0" />
                </div>
              </Link>
            </motion.div>
          )
        })}
      </div>

      {actions.length > 3 && (
        <Button
          variant="ghost"
          size="sm"
          className="w-full mt-2 text-white/25 hover:text-white/50 hover:bg-white/[0.06] h-9 text-[12px]"
        >
          {actions.length - 3} more
          <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      )}
    </div>
  )
}
