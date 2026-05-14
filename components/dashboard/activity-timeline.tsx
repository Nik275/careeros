"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { 
  ClipboardCheck, 
  Lightbulb, 
  Bookmark, 
  TrendingUp, 
  User,
  Award,
  Sparkles,
  CheckCircle2,
  Zap,
  Target,
  Star
} from "lucide-react"

interface Activity {
  id: string
  type: string
  title: string
  description?: string
  created_at: string
}

interface ActivityTimelineProps {
  activities: Activity[]
}

const activityConfig: Record<string, { icon: any; color: string; bg: string; border: string }> = {
  assessment_completed: { 
    icon: CheckCircle2, 
    color: "text-emerald-400", 
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  assessment_started: { 
    icon: ClipboardCheck, 
    color: "text-blue-400", 
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
  recommendation_viewed: { 
    icon: Lightbulb, 
    color: "text-violet-400", 
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
  },
  recommendation_generated: { 
    icon: Sparkles, 
    color: "text-cyan-400", 
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
  },
  career_bookmarked: { 
    icon: Bookmark, 
    color: "text-amber-400", 
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
  },
  roadmap_updated: { 
    icon: TrendingUp, 
    color: "text-cyan-400", 
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
  },
  profile_updated: { 
    icon: User, 
    color: "text-purple-400", 
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
  },
  profile_created: { 
    icon: Zap, 
    color: "text-emerald-400", 
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  milestone_achieved: { 
    icon: Award, 
    color: "text-rose-400", 
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
  },
  strongest_match: {
    icon: Star,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
  },
}

function formatTimeAgo(dateString: string) {
  const date = new Date(dateString)
  const now = new Date()
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)
  
  if (seconds < 60) return 'Just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}d ago`
  if (days < 30) return `${Math.floor(days / 7)}w ago`
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export function ActivityTimeline({ activities }: ActivityTimelineProps) {
  // If no activities, show default premium timeline
  const displayActivities = activities.length > 0 ? activities : [
    { id: 'default-1', type: 'assessment_completed', title: 'Assessment Completed', description: 'Career profile analysis finished', created_at: new Date().toISOString() },
    { id: 'default-2', type: 'recommendation_generated', title: '4 Career Matches Generated', description: 'AI-powered recommendations created', created_at: new Date(Date.now() - 60000).toISOString() },
    { id: 'default-3', type: 'strongest_match', title: 'Strongest Match Found', description: 'Software Engineer · 94% match', created_at: new Date(Date.now() - 120000).toISOString() },
  ]

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-[19px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-white/[0.08] via-white/[0.04] to-transparent rounded-full" />
      
      <div className="space-y-0">
        {displayActivities.slice(0, 5).map((activity, index) => {
          const config = activityConfig[activity.type] || { 
            icon: TrendingUp, 
            color: "text-white/40", 
            bg: "bg-white/[0.05]",
            border: "border-white/[0.08]",
          }
          const Icon = config.icon

          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.08 }}
              whileHover={{ x: 2 }}
              className="relative flex gap-3 py-2.5 group cursor-pointer"
            >
              {/* Timeline dot */}
              <div className={cn(
                "relative z-10 w-2.5 h-2.5 rounded-full mt-1.5 shrink-0",
                config.bg,
                "border-2",
                config.border
              )}>
                <div className={cn("absolute inset-0.5 rounded-full", config.bg)} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-2.5">
                  <div className={cn("p-1.5 rounded-lg shrink-0 border", config.bg, config.border)}>
                    <Icon className={cn("w-3.5 h-3.5", config.color)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-medium text-white/80 group-hover:text-white transition-colors">
                      {activity.title}
                    </p>
                    {activity.description && (
                      <p className="text-[11px] text-white/40 mt-0.5">
                        {activity.description}
                      </p>
                    )}
                    <p className="text-[10px] text-white/25 mt-1">
                      {formatTimeAgo(activity.created_at)}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
