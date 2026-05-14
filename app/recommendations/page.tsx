"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { 
  Sparkles, 
  ChevronRight,
  Brain,
  TrendingUp,
  Filter,
  ArrowLeft,
  Bookmark,
  SlidersHorizontal
} from "lucide-react"
import { CareerCard } from "@/components/dashboard/career-card"
import { getAllCareers, calculateMatchScore } from "@/lib/career-data"

// Sample user profile - in real app, this comes from assessment
const userProfile = {
  analytical: 85,
  creative: 70,
  technical: 80,
  communication: 65,
  leadership: 60,
  problemSolving: 88
}

export default function RecommendationsPage() {
  const [savedCareers, setSavedCareers] = useState<string[]>([])
  const [filter, setFilter] = useState<"all" | "high-match" | "tech" | "business">("all")
  
  const allCareers = getAllCareers()
  
  // Calculate match scores for all careers
  const careersWithScores = allCareers.map(career => {
    const { overall, insights } = calculateMatchScore(career, userProfile)
    return { career, score: overall, insights }
  })
  
  // Filter careers
  const filteredCareers = careersWithScores.filter(({ career, score }) => {
    if (filter === "high-match") return score >= 80
    if (filter === "tech") return career.category === "tech"
    if (filter === "business") return career.category === "business"
    return true
  })
  
  // Sort by match score
  const sortedCareers = filteredCareers.sort((a, b) => b.score - a.score)
  
  const handleSaveCareer = (careerId: string) => {
    setSavedCareers(prev => 
      prev.includes(careerId) 
        ? prev.filter(id => id !== careerId)
        : [...prev, careerId]
    )
  }

  const highConfidenceCount = sortedCareers.filter(c => c.score >= 80).length

  return (
    <div className="min-h-screen bg-[#020205] relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-violet-600/8 rounded-full blur-[180px]" />
        <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-cyan-600/6 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild className="text-white/50 hover:text-white hover:bg-white/[0.06]">
              <Link href="/dashboard">
                <ArrowLeft className="w-4 h-4 mr-1" />
                Dashboard
              </Link>
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-gradient-to-br from-violet-500/15 to-cyan-500/15 border border-white/[0.08] shadow-lg shadow-violet-500/10">
              <Sparkles className="w-5 h-5 text-violet-300" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-white tracking-tight">CareerOS</h1>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            "relative overflow-hidden rounded-2xl mb-6",
            "bg-gradient-to-br from-violet-600/20 via-purple-600/15 to-cyan-600/20",
            "backdrop-blur-xl",
            "border border-white/[0.12]",
            "p-6"
          )}
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-1/2 -right-1/4 w-[400px] h-[400px] bg-violet-500/20 rounded-full blur-[100px]" />
          </div>

          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <Brain className="w-5 h-5 text-violet-400" />
              <span className="text-[12px] font-semibold text-violet-400 uppercase tracking-wider">
                AI-Powered Recommendations
              </span>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              Your Personalized Career Matches
            </h1>
            <p className="text-[15px] text-white/60 max-w-2xl">
              Based on your assessment, our AI has analyzed {sortedCareers.length} careers to find your best fits. 
              {highConfidenceCount > 0 && (
                <span className="text-emerald-400"> {highConfidenceCount} high-confidence matches found.</span>
              )}
            </p>
          </div>
        </motion.div>

        {/* Filters */}
        <div className="flex items-center gap-2 mb-6">
          <div className="flex items-center gap-2 p-1 rounded-xl bg-white/[0.04] border border-white/[0.08]">
            {[
              { id: "all", label: "All Careers", count: sortedCareers.length },
              { id: "high-match", label: "High Match", count: highConfidenceCount },
              { id: "tech", label: "Tech", count: sortedCareers.filter(c => c.career.category === "tech").length },
              { id: "business", label: "Business", count: sortedCareers.filter(c => c.career.category === "business").length },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id as typeof filter)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all",
                  filter === f.id
                    ? "bg-violet-500/20 text-violet-300 border border-violet-500/30"
                    : "text-white/50 hover:text-white/70 hover:bg-white/[0.04]"
                )}
              >
                {f.label}
                <span className="ml-1.5 text-white/30">{f.count}</span>
              </button>
            ))}
          </div>
          
          <Button variant="outline" size="sm" className="border-white/[0.08] bg-white/[0.04] hover:bg-white/[0.08]">
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Career Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {sortedCareers.map(({ career, score, insights }, index) => (
            <CareerCard
              key={career.id}
              career={career}
              matchScore={score}
              matchInsights={insights}
              userSkills={userProfile}
              index={index}
              onSave={handleSaveCareer}
              isSaved={savedCareers.includes(career.id)}
            />
          ))}
        </div>

        {/* Empty State */}
        {sortedCareers.length === 0 && (
          <div className="text-center py-16">
            <div className="p-4 rounded-full bg-white/[0.04] border border-white/[0.08] inline-block mb-4">
              <Filter className="w-8 h-8 text-white/30" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">No careers match your filters</h3>
            <p className="text-white/50 mb-4">Try adjusting your filter criteria</p>
            <Button onClick={() => setFilter("all")} variant="outline">
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
