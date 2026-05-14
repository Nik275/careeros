"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Sparkles, ArrowRight, Play, CheckCircle2, Brain, Zap, ChevronRight, TrendingUp, Star } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface WelcomeBannerProps {
  firstName: string
  hasAssessment: boolean
  inProgress?: boolean
  progress?: number
  topMatch?: {
    title: string
    confidence: number
  }
  totalMatches?: number
  highConfidenceCount?: number
}

export function WelcomeBanner({
  firstName,
  hasAssessment,
  inProgress = false,
  progress = 0,
  topMatch,
  totalMatches = 0,
  highConfidenceCount = 0,
}: WelcomeBannerProps) {
  if (hasAssessment) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={cn(
          "relative overflow-hidden rounded-2xl",
          "bg-gradient-to-br from-violet-600/25 via-purple-600/20 to-cyan-600/25",
          "backdrop-blur-xl",
          "border border-white/[0.12]",
          "shadow-2xl shadow-violet-500/15"
        )}
      >
        {/* Rich background glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -right-1/4 w-[400px] h-[400px] bg-violet-500/25 rounded-full blur-[100px]" />
          <div className="absolute -bottom-1/2 -left-1/4 w-[350px] h-[350px] bg-cyan-500/20 rounded-full blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px]" />
        </div>

        <div className="relative px-6 py-5">
          {/* Status Badge */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/25">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">
                Assessment Complete
              </span>
            </div>
            {totalMatches > 0 && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/[0.08]">
                <Brain className="w-3 h-3 text-violet-400" />
                <span className="text-[11px] text-white/60">
                  {totalMatches} AI matches generated
                </span>
              </div>
            )}
          </div>

          <div className="flex items-end justify-between gap-6">
            <div className="flex-1">
              {topMatch ? (
                <div>
                  <p className="text-[13px] text-white/50 mb-1">Your strongest fit</p>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {topMatch.title}
                    <span className="text-emerald-400 ml-3">{Math.round(topMatch.confidence * 100)}% Match</span>
                  </h2>
                  <p className="text-[14px] text-white/60 leading-relaxed max-w-xl">
                    Your analytical thinking, technical curiosity, and problem-solving profile strongly align with engineering and technical careers. 
                    {highConfidenceCount > 0 && (
                      <span className="text-emerald-400/80"> {highConfidenceCount} high-confidence matches found.</span>
                    )}
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-[13px] text-white/50 mb-1">Welcome back</p>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Hi {firstName}
                  </h2>
                  <p className="text-[14px] text-white/60">
                    Your AI-powered career analysis is ready
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Button
                asChild
                size="sm"
                className="bg-white text-violet-900 hover:bg-white/95 font-semibold h-11 text-[14px] px-5 shadow-lg shadow-white/10"
              >
                <Link href="/recommendations">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Explore Matches
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="text-white/40 hover:text-white hover:bg-white/[0.08] h-11 text-[13px] px-4"
              >
                <Link href="/assessment">Retake</Link>
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  if (inProgress) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={cn(
          "relative overflow-hidden rounded-2xl",
          "bg-gradient-to-br from-amber-500/25 via-orange-600/20 to-rose-600/25",
          "backdrop-blur-xl",
          "border border-white/[0.12]",
          "shadow-2xl shadow-amber-500/15"
        )}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -right-1/4 w-[380px] h-[380px] bg-amber-500/25 rounded-full blur-[100px]" />
        </div>

        <div className="relative px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-amber-500/15 border border-amber-500/30 shadow-lg shadow-amber-500/10">
              <Play className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider">
                  In Progress
                </span>
                <span className="text-[14px] text-white/50">{progress}% complete</span>
              </div>
              <p className="text-[17px] font-semibold text-white">
                Continue your assessment to unlock AI career matches
              </p>
            </div>
          </div>

          <Button
            asChild
            size="sm"
            className="bg-white text-amber-900 hover:bg-white/95 font-semibold h-11 text-[14px] px-5 shadow-lg shadow-white/10"
          >
            <Link href="/assessment">
              Continue
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "relative overflow-hidden rounded-2xl",
        "bg-gradient-to-br from-blue-600/25 via-violet-600/20 to-cyan-600/25",
        "backdrop-blur-xl",
        "border border-white/[0.12]",
        "shadow-2xl shadow-blue-500/15"
      )}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/4 w-[400px] h-[400px] bg-blue-500/25 rounded-full blur-[100px]" />
        <div className="absolute -bottom-1/2 -left-1/4 w-[350px] h-[350px] bg-cyan-500/20 rounded-full blur-[100px]" />
      </div>

      <div className="relative px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-blue-500/15 border border-blue-500/30 shadow-lg shadow-blue-500/10">
            <Sparkles className="w-6 h-6 text-blue-300" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Star className="w-3 h-3 text-blue-300" />
              <span className="text-[11px] font-semibold text-blue-300 uppercase tracking-wider">
                Get Started
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-1">
              Discover your ideal career path
            </h2>
            <p className="text-[14px] text-white/50">
              AI-powered career recommendations personalized for your unique profile
            </p>
          </div>
        </div>

        <Button
          asChild
          size="sm"
          className="bg-white text-blue-900 hover:bg-white/95 font-semibold h-11 text-[14px] px-5 shadow-lg shadow-white/10"
        >
          <Link href="/assessment">
            <Zap className="w-4 h-4 mr-2" />
            Start Assessment
          </Link>
        </Button>
      </div>
    </motion.div>
  )
}
