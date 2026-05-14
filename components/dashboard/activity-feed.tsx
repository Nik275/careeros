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
  Clock
} from "lucide-react"

interface Activity {
  id: string
  type: string
  title: string
  description?: string
  created_at: string
}

interface ActivityFeedProps {
  activities: Activity[]
}

const activityConfig: Record<string, { icon: any; color: string; bg: string }> = {
  assessment_completed: { 
    icon: ClipboardCheck, 
    color: "text-emerald-400", 
    bg: "bg-emerald-500/10" 
  },
  assessment_started: { 
    icon: ClipboardCheck, 
    color: "text-blue-400", 
    bg: "bg-blue-500/10" 
  },
  recommendation_viewed: { 
    icon: Lightbulb, 
    color: "text-violet-400", 
    bg: "bg-violet-500/10" 
  },
  career_bookmarked: { 
    icon: Bookmark, 
    color: "text-amber-400", 
    bg: "bg-amber-500/10" 
  },
  roadmap_updated: { 
    icon: TrendingUp, 
    color: "text-cyan-400", 
    bg: "bg-cyan-500/10" 
  },
  profile_updated: { 
    icon: User, 
    color: "text-purple-400", 
    bg: "bg-purple-500/10" 
  },
  milestone_achieved: { 
    icon: Award, 
    color: "text-rose-400", 
    bg: "bg-rose-500/10" 
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
  return date.toLocaleDateString()
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  if (activities.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-3">
          <Clock className="w-6 h-6 text-white/20" />
        </div>
        <p className="text-sm text-white/40">No recent activity</p>
        <p className="text-xs text-white/30 mt-1">Complete actions to see them here</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {activities.map((activity, index) => {
        const config = activityConfig[activity.type] || { 
          icon: TrendingUp, 
          color: "text-white/40", 
          bg: "bg-white/5" 
        }
        const Icon = config.icon

        return (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/[0.07] transition-colors"
          >
            <div className={cn("p-2 rounded-lg shrink-0", config.bg)}>
              <Icon className={cn("w-4 h-4", config.color)} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-white font-medium truncate">{activity.title}</p>
              {activity.description && (
                <p className="text-xs text-white/40 mt-0.5 line-clamp-1">{activity.description}</p>
              )}
              <p className="text-xs text-white/30 mt-1">{formatTimeAgo(activity.created_at)}</p>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
