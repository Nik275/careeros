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
  Sparkles
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Action {
  id: string
  title: string
  description: string
  icon: string
  href: string
  priority: "high" | "medium" | "low"
  completed?: boolean
}

interface NextActionsProps {
  hasAssessment: boolean
  hasRecommendations: boolean
  hasBookmarks: boolean
}

const iconMap: Record<string, any> = {
  assessment: ClipboardCheck,
  target: Target,
  bookmark: Bookmark,
  trending: TrendingUp,
  sparkles: Sparkles,
}

export function NextActions({ hasAssessment, hasRecommendations, hasBookmarks }: NextActionsProps) {
  const actions: Action[] = []

  if (!hasAssessment) {
    actions.push({
      id: "1",
      title: "Complete Career Assessment",
      description: "Discover your ideal career path with our AI-powered assessment",
      icon: "assessment",
      href: "/assessment",
      priority: "high",
    })
  }

  if (hasAssessment && !hasRecommendations) {
    actions.push({
      id: "2",
      title: "View Your Recommendations",
      description: "Explore personalized career insights based on your profile",
      icon: "sparkles",
      href: "/recommendations",
      priority: "high",
    })
  }

  if (hasRecommendations && !hasBookmarks) {
    actions.push({
      id: "3",
      title: "Save Interesting Careers",
      description: "Bookmark careers that interest you for later reference",
      icon: "bookmark",
      href: "/recommendations",
      priority: "medium",
    })
  }

  if (hasAssessment) {
    actions.push({
      id: "4",
      title: "Create Career Roadmap",
      description: "Build a personalized roadmap to achieve your career goals",
      icon: "target",
      href: "/roadmap",
      priority: "medium",
    })
  }

  if (actions.length === 0) {
    actions.push({
      id: "5",
      title: "Explore More Careers",
      description: "Discover new career paths and opportunities",
      icon: "trending",
      href: "/recommendations",
      priority: "low",
    })
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-rose-500"
      case "medium":
        return "border-l-amber-500"
      default:
        return "border-l-blue-500"
    }
  }

  return (
    <div className="space-y-3">
      {actions.slice(0, 3).map((action, index) => {
        const Icon = iconMap[action.icon]
        
        return (
          <motion.div
            key={action.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className={cn(
              "group relative overflow-hidden rounded-xl",
              "bg-white/5 border border-white/5",
              "border-l-4",
              getPriorityColor(action.priority),
              "hover:bg-white/[0.07] transition-colors"
            )}
          >
            <div className="p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-white/5 shrink-0">
                  <Icon className="w-4 h-4 text-violet-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-white group-hover:text-violet-400 transition-colors">
                    {action.title}
                  </h4>
                  <p className="text-xs text-white/40 mt-1 line-clamp-2">
                    {action.description}
                  </p>
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="w-full mt-3 text-white/60 hover:text-white hover:bg-white/5"
              >
                <Link href={action.href}>
                  Get Started
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Link>
              </Button>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
