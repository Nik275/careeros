"use client"

import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { 
  ArrowLeft, 
  Bookmark, 
  TrendingUp, 
  DollarSign,
  MapPin,
  AlertTriangle,
  Check,
  Target,
  GraduationCap,
  Users,
  Clock,
  Zap,
  Brain,
  BarChart3,
  Briefcase,
  ChevronRight,
  ExternalLink,
  BookOpen,
  Award,
  Sparkles,
  Lightbulb,
  Star
} from "lucide-react"
import { getCareerById, calculateMatchScore } from "@/lib/career-data"
import { Progress } from "@/components/ui/progress"

// Sample user profile - in real app, this comes from assessment
const userProfile = {
  analytical: 85,
  creative: 70,
  technical: 80,
  communication: 65,
  leadership: 60,
  problemSolving: 88
}

export default function CareerPage() {
  const params = useParams()
  const careerId = params.slug as string
  const career = getCareerById(careerId)
  
  if (!career) {
    return (
      <div className="min-h-screen bg-[#020205] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-2">Career not found</h1>
          <p className="text-white/50 mb-4">The career you&apos;re looking for doesn&apos;t exist.</p>
          <Button asChild>
            <Link href="/recommendations">Browse Careers</Link>
          </Button>
        </div>
      </div>
    )
  }

  const { overall: matchScore, breakdown, insights } = calculateMatchScore(career, userProfile)
  const formatSalary = (amount: number) => `₹${(amount / 100000).toFixed(0)}L`

  const getMatchStyles = (score: number) => {
    if (score >= 90) return {
      badge: "bg-emerald-500/25 text-emerald-400 border-emerald-500/50",
      text: "text-emerald-400"
    }
    if (score >= 80) return {
      badge: "bg-emerald-500/20 text-emerald-400/90 border-emerald-500/40",
      text: "text-emerald-400"
    }
    if (score >= 70) return {
      badge: "bg-amber-500/20 text-amber-400 border-amber-500/40",
      text: "text-amber-400"
    }
    return {
      badge: "bg-blue-500/20 text-blue-400 border-blue-500/40",
      text: "text-blue-400"
    }
  }

  const matchStyles = getMatchStyles(matchScore)

  return (
    <div className="min-h-screen bg-[#020205] relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-violet-600/10 rounded-full blur-[180px]" />
        <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-cyan-600/8 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild className="text-white/50 hover:text-white hover:bg-white/[0.06]">
              <Link href="/recommendations">
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back
              </Link>
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="border-white/[0.10] bg-white/[0.04] hover:bg-white/[0.08]">
              <Bookmark className="w-4 h-4 mr-2" />
              Save Career
            </Button>
          </div>
        </header>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            "relative overflow-hidden rounded-2xl mb-8",
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
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[11px] font-semibold text-white/40 uppercase tracking-wider">
                    {career.category}
                  </span>
                  <span className="text-white/20">•</span>
                  <span className="text-[11px] text-white/40">
                    {career.marketData.growthOutlook} growth outlook
                  </span>
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">{career.title}</h1>
                <p className="text-[15px] text-white/60 max-w-2xl">{career.shortDescription}</p>
              </div>
              <div className={cn(
                "px-4 py-2 rounded-xl border text-center",
                matchStyles.badge
              )}>
                <div className="text-2xl font-bold">{matchScore}%</div>
                <div className="text-[10px] uppercase tracking-wider opacity-70">Match</div>
              </div>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.06] border border-white/[0.08]">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                <span className="text-[13px] font-semibold text-white">
                  {formatSalary(career.marketData.entrySalary)}–{formatSalary(career.marketData.seniorSalary)}
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.06] border border-white/[0.08]">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span className="text-[13px] font-medium text-white/80 capitalize">
                  {career.marketData.demandLevel.replace("-", " ")} Demand
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.06] border border-white/[0.08]">
                <Users className="w-4 h-4 text-violet-400" />
                <span className="text-[13px] font-medium text-white/80">
                  {career.marketData.remoteOpportunity === "excellent" ? "Remote Friendly" : "Hybrid"}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Why This Fits You */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={cn(
                "rounded-xl",
                "bg-white/[0.05] backdrop-blur-xl",
                "border border-white/[0.10]",
                "p-5"
              )}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 rounded-lg bg-violet-500/10 border border-violet-500/20">
                  <Sparkles className="w-4 h-4 text-violet-400" />
                </div>
                <h2 className="text-lg font-semibold text-white">Why This Fits You</h2>
              </div>
              
              <div className="space-y-4">
                {career.matchReasons.strength.length > 0 && (
                  <div>
                    <h3 className="text-[12px] font-medium text-white/40 uppercase tracking-wider mb-2">Your Strengths</h3>
                    <div className="space-y-2">
                      {career.matchReasons.strength.map((reason, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                          <span className="text-[14px] text-white/70">{reason}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {career.matchReasons.alignment.length > 0 && (
                  <div>
                    <h3 className="text-[12px] font-medium text-white/40 uppercase tracking-wider mb-2">Career Alignment</h3>
                    <div className="space-y-2">
                      {career.matchReasons.alignment.map((reason, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <Target className="w-4 h-4 text-violet-400 mt-0.5 shrink-0" />
                          <span className="text-[14px] text-white/70">{reason}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Career Roadmap */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={cn(
                "rounded-xl",
                "bg-white/[0.05] backdrop-blur-xl",
                "border border-white/[0.10]",
                "p-5"
              )}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                </div>
                <h2 className="text-lg font-semibold text-white">Career Roadmap</h2>
              </div>

              <div className="relative">
                <div className="absolute left-[19px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-emerald-500/30 via-white/10 to-transparent rounded-full" />
                <div className="space-y-4">
                  {career.roadmap.map((step, index) => (
                    <div key={index} className="relative flex gap-4">
                      <div className="relative z-10 w-2.5 h-2.5 rounded-full bg-emerald-500/30 border-2 border-emerald-500/50 mt-1.5 shrink-0" />
                      <div className="flex-1 pb-4">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-[14px] font-semibold text-white">{step.title}</h3>
                          <span className="text-[11px] text-white/40">{step.timeframe}</span>
                        </div>
                        <p className="text-[13px] text-white/50 mb-2">{step.description}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {step.milestones.map((milestone, i) => (
                            <span key={i} className="text-[10px] px-2 py-1 rounded-md bg-white/[0.05] text-white/50 border border-white/[0.06]">
                              {milestone}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Skills Required */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={cn(
                "rounded-xl",
                "bg-white/[0.05] backdrop-blur-xl",
                "border border-white/[0.10]",
                "p-5"
              )}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <Zap className="w-4 h-4 text-amber-400" />
                </div>
                <h2 className="text-lg font-semibold text-white">Skills Required</h2>
              </div>

              <div className="space-y-3">
                {career.skills.filter(s => s.importance === "critical").map((skill, index) => {
                  const userLevel = userProfile[skill.name.toLowerCase().replace(/\s+/g, '') as keyof typeof userProfile] || 50
                  const gap = skill.requiredLevel - userLevel
                  
                  return (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[13px] text-white/80">{skill.name}</span>
                        <span className={cn(
                          "text-[11px] font-medium",
                          gap > 20 ? "text-amber-400" : "text-emerald-400"
                        )}>
                          {gap > 20 ? `${gap}% gap` : "Strong fit"}
                        </span>
                      </div>
                      <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
                        <div 
                          className={cn(
                            "h-full rounded-full transition-all",
                            gap > 20 ? "bg-amber-400" : "bg-emerald-400"
                          )}
                          style={{ width: `${Math.min(userLevel, 100)}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-[10px] text-white/30">Your level: {userLevel}%</span>
                        <span className="text-[10px] text-white/30">Required: {skill.requiredLevel}%</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.div>

            {/* Reality Check */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={cn(
                "rounded-xl",
                "bg-amber-500/[0.05] backdrop-blur-xl",
                "border border-amber-500/15",
                "p-5"
              )}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                </div>
                <h2 className="text-lg font-semibold text-white">Reality Check</h2>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[11px] text-white/40 uppercase tracking-wider mb-1">Difficulty</p>
                  <p className="text-[14px] font-medium text-white capitalize">{career.realityCheck.difficulty}</p>
                </div>
                <div>
                  <p className="text-[11px] text-white/40 uppercase tracking-wider mb-1">Time to Competency</p>
                  <p className="text-[14px] font-medium text-white">{career.realityCheck.timeToCompetency}</p>
                </div>
                <div>
                  <p className="text-[11px] text-white/40 uppercase tracking-wider mb-1">Work-Life Balance</p>
                  <p className="text-[14px] font-medium text-white capitalize">{career.realityCheck.workLifeBalance}</p>
                </div>
                <div>
                  <p className="text-[11px] text-white/40 uppercase tracking-wider mb-1">Industry Saturation</p>
                  <p className="text-[14px] font-medium text-white capitalize">{career.realityCheck.industrySaturation}</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/[0.06]">
                <p className="text-[13px] text-white/60">{career.realityCheck.initialBarrier}</p>
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Market Intelligence */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={cn(
                "rounded-xl",
                "bg-white/[0.05] backdrop-blur-xl",
                "border border-white/[0.10]",
                "p-5"
              )}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <BarChart3 className="w-4 h-4 text-blue-400" />
                </div>
                <h2 className="text-[15px] font-semibold text-white">Market Intelligence</h2>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-white/[0.06]">
                  <span className="text-[13px] text-white/60">Entry Salary</span>
                  <span className="text-[14px] font-semibold text-white">{formatSalary(career.marketData.entrySalary)}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-white/[0.06]">
                  <span className="text-[13px] text-white/60">Mid-Level</span>
                  <span className="text-[14px] font-semibold text-white">{formatSalary(career.marketData.midSalary)}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-white/[0.06]">
                  <span className="text-[13px] text-white/60">Senior Level</span>
                  <span className="text-[14px] font-semibold text-emerald-400">{formatSalary(career.marketData.seniorSalary)}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-white/[0.06]">
                  <span className="text-[13px] text-white/60">Demand</span>
                  <span className="text-[13px] font-medium text-emerald-400 capitalize">{career.marketData.demandLevel.replace("-", " ")}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-white/[0.06]">
                  <span className="text-[13px] text-white/60">Growth Outlook</span>
                  <span className="text-[13px] font-medium text-emerald-400 capitalize">{career.marketData.growthOutlook}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-white/[0.06]">
                  <span className="text-[13px] text-white/60">Remote Work</span>
                  <span className="text-[13px] font-medium text-violet-400 capitalize">{career.marketData.remoteOpportunity}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-[13px] text-white/60">AI Risk</span>
                  <span className={cn(
                    "text-[13px] font-medium capitalize",
                    career.marketData.automationRisk === "low" ? "text-emerald-400" : 
                    career.marketData.automationRisk === "medium" ? "text-amber-400" : "text-rose-400"
                  )}>
                    {career.marketData.automationRisk}
                  </span>
                </div>
              </div>

              <div className="mt-4 p-3 rounded-lg bg-white/[0.04] border border-white/[0.06]">
                <p className="text-[12px] text-white/50 leading-relaxed">{career.marketData.jobOutlook2025}</p>
              </div>
            </motion.div>

            {/* Education Pathway */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={cn(
                "rounded-xl",
                "bg-white/[0.05] backdrop-blur-xl",
                "border border-white/[0.10]",
                "p-5"
              )}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20">
                  <GraduationCap className="w-4 h-4 text-purple-400" />
                </div>
                <h2 className="text-[15px] font-semibold text-white">Education</h2>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-[11px] text-white/40 uppercase tracking-wider mb-1">Recommended Degree</p>
                  <p className="text-[13px] text-white/80">{career.education.degree}</p>
                </div>
                <div>
                  <p className="text-[11px] text-white/40 uppercase tracking-wider mb-1">Duration</p>
                  <p className="text-[13px] text-white/80">{career.education.duration}</p>
                </div>
                <div>
                  <p className="text-[11px] text-white/40 uppercase tracking-wider mb-2">Top Colleges</p>
                  <div className="flex flex-wrap gap-1.5">
                    {career.education.topColleges.slice(0, 4).map((college, i) => (
                      <span key={i} className="text-[10px] px-2 py-1 rounded-md bg-white/[0.05] text-white/50 border border-white/[0.06]">
                        {college}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Alternative Careers */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={cn(
                "rounded-xl",
                "bg-white/[0.05] backdrop-blur-xl",
                "border border-white/[0.10]",
                "p-5"
              )}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                  <Lightbulb className="w-4 h-4 text-cyan-400" />
                </div>
                <h2 className="text-[15px] font-semibold text-white">Alternative Paths</h2>
              </div>

              <div className="space-y-2">
                {career.alternatives.slice(0, 4).map((alt, index) => (
                  <Link
                    key={index}
                    href={`/career/${alt.title.toLowerCase().replace(/\s+/g, '-')}`}
                    className="flex items-center gap-3 p-2.5 rounded-lg bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] hover:border-white/[0.10] transition-all group"
                  >
                    <div className="p-1.5 rounded-md bg-violet-500/10 border border-violet-500/20">
                      <Briefcase className="w-3.5 h-3.5 text-violet-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-medium text-white/80 truncate group-hover:text-white transition-colors">
                        {alt.title}
                      </p>
                      <p className="text-[10px] text-white/40">{alt.reason}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-white/10 group-hover:text-white/30 transition-colors" />
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Learning Resources */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className={cn(
                "rounded-xl",
                "bg-white/[0.05] backdrop-blur-xl",
                "border border-white/[0.10]",
                "p-5"
              )}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20">
                  <BookOpen className="w-4 h-4 text-rose-400" />
                </div>
                <h2 className="text-[15px] font-semibold text-white">Resources</h2>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-[11px] text-white/40 uppercase tracking-wider mb-2">Top YouTube Channels</p>
                  <div className="flex flex-wrap gap-1.5">
                    {career.resources.youtube.slice(0, 4).map((channel, i) => (
                      <span key={i} className="text-[10px] px-2 py-1 rounded-md bg-white/[0.05] text-white/50 border border-white/[0.06]">
                        {channel}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[11px] text-white/40 uppercase tracking-wider mb-2">Key Certifications</p>
                  <div className="flex flex-wrap gap-1.5">
                    {career.resources.certifications.slice(0, 3).map((cert, i) => (
                      <span key={i} className="text-[10px] px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-400/70 border border-emerald-500/20">
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
