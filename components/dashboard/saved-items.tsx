"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Bookmark, Briefcase, GraduationCap, BookOpen, ChevronRight, Plus, Star, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface BookmarkItem {
  id: string
  item_type: string
  item_id: string
  title: string
  created_at: string
}

interface SavedItemsProps {
  bookmarks: BookmarkItem[]
}

const typeConfig: Record<string, { icon: any; color: string; bg: string; border: string }> = {
  career: { 
    icon: Briefcase, 
    color: "text-violet-400", 
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
  },
  exam: { 
    icon: BookOpen, 
    color: "text-emerald-400", 
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  college: { 
    icon: GraduationCap, 
    color: "text-blue-400", 
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
}

const suggestedCareers = [
  { id: "suggested-1", title: "Software Engineer", match: 94 },
  { id: "suggested-2", title: "Data Scientist", match: 87 },
  { id: "suggested-3", title: "Product Manager", match: 82 },
]

export function SavedItems({ bookmarks }: SavedItemsProps) {
  if (bookmarks.length === 0) {
    return (
      <div className={cn(
        "relative overflow-hidden rounded-xl",
        "bg-white/[0.05] backdrop-blur-xl",
        "border border-white/[0.10]",
        "p-4"
      )}>
        <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        
        <div className="flex items-center gap-2 mb-3">
          <div className="p-1.5 rounded-lg bg-violet-500/10 border border-violet-500/20">
            <Bookmark className="w-4 h-4 text-violet-400" />
          </div>
          <h3 className="text-[15px] font-semibold text-white">Saved Items</h3>
        </div>
        
        <div className="mb-3">
          <p className="text-[10px] text-white/30 mb-2 uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            Recommended for you
          </p>
          <div className="space-y-2">
            {suggestedCareers.map((career, index) => (
              <motion.div
                key={career.id}
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, delay: index * 0.06 }}
                whileHover={{ x: 3, transition: { duration: 0.15 } }}
                className="group flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] hover:border-white/[0.12] transition-all cursor-pointer"
              >
                <div className="p-1.5 rounded-lg bg-violet-500/10 border border-violet-500/20">
                  <Star className="w-3.5 h-3.5 text-violet-400/70" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-medium text-white/70 truncate group-hover:text-white/90 transition-colors">
                    {career.title}
                  </p>
                </div>
                <span className="text-[11px] font-semibold text-emerald-400/90">{career.match}%</span>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Plus className="w-4 h-4 text-white/40" />
                </Button>
              </motion.div>
            ))}
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          asChild
          className="w-full text-white/30 hover:text-white/60 hover:bg-white/[0.06] h-9 text-[12px] border border-white/[0.06]"
        >
          <Link href="/recommendations">
            Browse all careers
            <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className={cn(
      "relative overflow-hidden rounded-xl",
      "bg-white/[0.05] backdrop-blur-xl",
      "border border-white/[0.10]",
      "p-4"
    )}>
      <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-violet-500/10 border border-violet-500/20">
            <Bookmark className="w-4 h-4 text-violet-400" />
          </div>
          <h3 className="text-[15px] font-semibold text-white">Saved Items</h3>
        </div>
        <span className="text-[11px] font-semibold text-white/30 bg-white/[0.06] px-2 py-1 rounded-lg">
          {bookmarks.length}
        </span>
      </div>

      <div className="space-y-2">
        {bookmarks.slice(0, 4).map((bookmark, index) => {
          const config = typeConfig[bookmark.item_type] || { 
            icon: Bookmark, 
            color: "text-white/40", 
            bg: "bg-white/[0.05]",
            border: "border-white/[0.08]",
          }
          const Icon = config.icon

          return (
            <motion.div
              key={bookmark.id}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, delay: index * 0.06 }}
              whileHover={{ x: 3, transition: { duration: 0.15 } }}
            >
              <Link
                href={`/${bookmark.item_type}/${bookmark.item_id}`}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] hover:border-white/[0.12] transition-all group"
              >
                <div className={cn("p-1.5 rounded-lg shrink-0 border", config.bg, config.border)}>
                  <Icon className={cn("w-3.5 h-3.5", config.color)} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-medium text-white/70 truncate group-hover:text-white/90 transition-colors">
                    {bookmark.title}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-white/10 group-hover:text-white/30 transition-colors" />
              </Link>
            </motion.div>
          )
        })}
      </div>

      {bookmarks.length > 4 && (
        <Button
          variant="ghost"
          size="sm"
          className="w-full mt-2 text-white/30 hover:text-white/60 hover:bg-white/[0.06] h-9 text-[12px]"
        >
          View all {bookmarks.length}
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      )}
    </div>
  )
}
