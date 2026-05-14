"use client"

import { motion } from "framer-motion"
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts"
import { cn } from "@/lib/utils"
import { TrendingUp, Award, Zap, Target, Sparkles } from "lucide-react"

interface SkillData {
  subject: string
  score: number
  fullMark: number
}

interface SkillsRadarProps {
  data?: SkillData[]
  className?: string
}

const defaultData: SkillData[] = [
  { subject: "Analytical", score: 85, fullMark: 100 },
  { subject: "Creative", score: 70, fullMark: 100 },
  { subject: "Communication", score: 90, fullMark: 100 },
  { subject: "Leadership", score: 65, fullMark: 100 },
  { subject: "Technical", score: 80, fullMark: 100 },
  { subject: "Problem Solving", score: 88, fullMark: 100 },
]

export function SkillsRadar({ data = defaultData, className }: SkillsRadarProps) {
  const sortedSkills = [...data].sort((a, b) => b.score - a.score)
  const topSkill = sortedSkills[0]
  const developingSkills = sortedSkills.slice(-2)
  const avgScore = Math.round(data.reduce((acc, item) => acc + item.score, 0) / data.length)

  const getStrengthLabel = (score: number) => {
    if (score >= 85) return { label: "Strong", color: "text-emerald-400/90", bar: "bg-emerald-400" }
    if (score >= 70) return { label: "Good", color: "text-amber-400/90", bar: "bg-amber-400" }
    return { label: "Growing", color: "text-blue-400/90", bar: "bg-blue-400" }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, delay: 0.1 }}
      className={cn(
        "relative overflow-hidden rounded-xl",
        "bg-white/[0.05]",
        "backdrop-blur-xl",
        "border border-white/[0.10]",
        className
      )}
    >
      <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="relative p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-violet-500/10 border border-violet-500/20">
              <Target className="w-4 h-4 text-violet-400" />
            </div>
            <h3 className="text-[15px] font-semibold text-white">Career Fit</h3>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/[0.06] border border-white/[0.08]">
            <Sparkles className="w-3 h-3 text-violet-400" />
            <span className="text-[12px] font-bold text-white">{avgScore}%</span>
          </div>
        </div>

        {/* Radar Chart - Larger */}
        <div className="h-[180px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="85%" data={data}>
              <PolarGrid stroke="rgba(255,255,255,0.06)" radialLines={true} />
              <PolarAngleAxis
                dataKey="subject"
                tick={{
                  fill: "rgba(255,255,255,0.50)",
                  fontSize: 9,
                  fontWeight: 500,
                }}
              />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
              <Radar
                name="Skills"
                dataKey="score"
                stroke="url(#radarGradient)"
                strokeWidth={2}
                fill="url(#radarFill)"
                fillOpacity={0.25}
              />
              <defs>
                <linearGradient id="radarGradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
                <linearGradient id="radarFill" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.30} />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.15} />
                </linearGradient>
              </defs>
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Skill - Premium */}
        <div className="mt-3 p-3 rounded-xl bg-emerald-500/[0.06] border border-emerald-500/15">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <Award className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] text-emerald-400/60 uppercase tracking-wider font-medium">Top Strength</p>
              <p className="text-[13px] font-semibold text-white/90 truncate">{topSkill.subject}</p>
            </div>
            <span className="text-[14px] font-bold text-emerald-400/90">{topSkill.score}%</span>
          </div>
        </div>

        {/* Skill Breakdown */}
        <div className="mt-3 pt-3 border-t border-white/[0.06]">
          <p className="text-[10px] text-white/30 mb-2 uppercase tracking-wider font-medium">Skill Breakdown</p>
          <div className="space-y-2">
            {data.slice(0, 4).map((skill) => {
              const strength = getStrengthLabel(skill.score)
              return (
                <div key={skill.subject} className="flex items-center gap-2">
                  <span className="text-[11px] text-white/50 w-20 truncate">{skill.subject}</span>
                  <div className="flex-1 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.score}%` }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                      className={cn("h-full rounded-full", strength.bar)} 
                    />
                  </div>
                  <span className={cn("text-[10px] w-10 text-right font-medium", strength.color)}>{strength.label}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Growth Opportunity */}
        <div className="mt-3 p-3 rounded-xl bg-amber-500/[0.06] border border-amber-500/15">
          <div className="flex items-start gap-2">
            <div className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 shrink-0">
              <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div>
              <p className="text-[10px] text-amber-400/60 uppercase tracking-wider font-medium mb-0.5">Growth Opportunity</p>
              <p className="text-[11px] text-white/50 leading-relaxed">
                Improving <span className="text-white/70 font-medium">{developingSkills[0]?.subject}</span> unlocks product & management paths
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
