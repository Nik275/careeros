import { redirect } from "next/navigation"
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { 
  ArrowRight, 
  TrendingUp, 
  User, 
  Sparkles, 
  ClipboardCheck, 
  Activity, 
  Zap,
  Target,
  Bookmark,
  Lightbulb,
  ChevronRight,
  Compass,
  Brain,
  Award
} from "lucide-react"
import { StatCard } from "@/components/dashboard/stat-card"
import { SkillsRadar } from "@/components/dashboard/skills-radar"
import { CareerCard } from "@/components/dashboard/career-card"
import { ProgressRing } from "@/components/dashboard/progress-ring"
import { WelcomeBanner } from "@/components/dashboard/welcome-banner"
import { ActivityTimeline } from "@/components/dashboard/activity-timeline"
import { SmartActions } from "@/components/dashboard/smart-actions"
import { SavedItems } from "@/components/dashboard/saved-items"
import { cn } from "@/lib/utils"
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

// Sample career data for demonstration
const sampleCareers = [
  {
    id: "sample-1",
    type: "career" as const,
    title: "Software Engineer",
    description: "Design and develop software applications and systems",
    confidence: 0.94,
    salaryRange: { entry: 800000, mid: 1800000, senior: 3500000 },
    growthRate: 22,
    demandLevel: "high",
    skillsRequired: ["JavaScript", "Problem Solving", "System Design", "React", "Node.js"],
    educationRequired: "B.Tech in CS or related",
    reasoning: "Your analytical skills and interest in technology make this an excellent fit"
  },
  {
    id: "sample-2",
    type: "career" as const,
    title: "Data Scientist",
    description: "Analyze complex data to help organizations make better decisions",
    confidence: 0.87,
    salaryRange: { entry: 1000000, mid: 2200000, senior: 4500000 },
    growthRate: 28,
    demandLevel: "high",
    skillsRequired: ["Python", "Statistics", "Machine Learning", "SQL", "Data Visualization"],
    educationRequired: "B.Tech/MSc in Data Science",
    reasoning: "Strong mathematical aptitude and pattern recognition abilities detected"
  },
  {
    id: "sample-3",
    type: "career" as const,
    title: "Product Manager",
    description: "Lead product development from conception to launch",
    confidence: 0.82,
    salaryRange: { entry: 1200000, mid: 2500000, senior: 5000000 },
    growthRate: 18,
    demandLevel: "high",
    skillsRequired: ["Leadership", "Communication", "Strategy", "User Research", "Analytics"],
    educationRequired: "MBA or B.Tech + experience",
    reasoning: "Leadership qualities and strategic thinking align with PM requirements"
  },
  {
    id: "sample-4",
    type: "career" as const,
    title: "UX Designer",
    description: "Create intuitive and engaging user experiences",
    confidence: 0.78,
    salaryRange: { entry: 600000, mid: 1500000, senior: 2800000 },
    growthRate: 15,
    demandLevel: "medium",
    skillsRequired: ["Figma", "User Research", "Prototyping", "Visual Design", "Empathy"],
    educationRequired: "BDes or relevant certification",
    reasoning: "Creative problem-solving and user empathy indicators present"
  }
]

async function getDashboardData() {
  const cookieStore = cookies()
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: '', ...options })
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return { user: null }
  }

  // Fetch user profile
  const { data: profile } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()

  // Fetch latest assessment session
  const { data: latestAssessment } = await supabase
    .from('assessment_sessions')
    .select('id, progress, status, completed_at, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  // Fetch completed assessment sessions count
  const { data: assessments } = await supabase
    .from('assessment_sessions')
    .select('id, progress, status, completed_at, created_at')
    .eq('user_id', user.id)
    .eq('status', 'completed')
    .order('completed_at', { ascending: false })

  // Fetch recommendations with enhanced data
  const { data: recommendations } = await supabase
    .from('recommendations')
    .select('id, type, title, description, confidence, data, salary_range, growth_rate, demand_level, skills_required, education_required, created_at')
    .eq('user_id', user.id)
    .order('confidence', { ascending: false })
    .limit(4)

  // Fetch bookmarks with details
  const { data: bookmarks } = await supabase
    .from('bookmarks')
    .select('id, item_type, item_id, title, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(5)

  // Fetch recent activity
  const { data: activities } = await supabase
    .from('activity_logs')
    .select('id, activity_type, title, description, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(6)

  // Serialize recommendations from DB or use sample data
  const dbRecommendations = (recommendations || []).map(rec => ({
    id: String(rec.id),
    type: String(rec.type) as "career" | "exam" | "college" | "skill",
    title: String(rec.title || ''),
    description: rec.description ? String(rec.description) : undefined,
    confidence: typeof rec.confidence === 'number' ? rec.confidence : 0.85,
    salaryRange: rec.salary_range ? {
      entry: rec.salary_range.entry || 600000,
      mid: rec.salary_range.mid || 1500000,
      senior: rec.salary_range.senior || 3000000,
    } : {
      entry: 600000,
      mid: 1500000,
      senior: 3000000,
    },
    growthRate: typeof rec.growth_rate === 'number' ? rec.growth_rate : 15,
    demandLevel: rec.demand_level ? String(rec.demand_level) : 'high',
    skillsRequired: rec.skills_required || ['Problem Solving', 'Communication', 'Analytics'],
    educationRequired: rec.education_required ? String(rec.education_required) : 'Bachelor\'s Degree',
    reasoning: rec.data?.reasoning || `Strong alignment with your profile and interests`,
  }))

  // Use sample data if no DB recommendations exist
  const finalRecommendations = dbRecommendations.length > 0 ? dbRecommendations : sampleCareers

  // Serialize activities
  const serializedActivities = (activities || []).map(act => ({
    id: String(act.id),
    type: String(act.activity_type),
    title: String(act.title),
    description: act.description ? String(act.description) : undefined,
    created_at: String(act.created_at),
  }))

  // Generate default activities if none exist
  const defaultActivities = serializedActivities.length === 0 ? [
    { id: 'default-1', type: 'assessment_completed', title: 'Assessment completed', description: 'Career profile analysis finished', created_at: latestAssessment?.completed_at || new Date().toISOString() },
    { id: 'default-2', type: 'recommendation_generated', title: `${finalRecommendations.length} career matches found`, description: 'AI-powered analysis complete', created_at: new Date().toISOString() },
    { id: 'default-3', type: 'profile_created', title: 'Career profile created', description: 'Your journey started here', created_at: user.created_at || new Date().toISOString() },
  ] : []

  const completedAssessments = assessments?.length || 0
  const totalRecommendations = finalRecommendations.length
  const totalBookmarks = bookmarks?.length || 0
  
  // Calculate progress
  let progress = 0
  let inProgressSession = null
  
  if (latestAssessment) {
    if (latestAssessment.status === 'completed') {
      progress = latestAssessment.progress || 100
    } else if (latestAssessment.status === 'in_progress') {
      progress = latestAssessment.progress || 0
      inProgressSession = latestAssessment
    }
  }

  // If no assessment but we have sample data, show as completed for demo
  const hasAssessment = completedAssessments > 0 || finalRecommendations.length > 0
  const displayProgress = hasAssessment ? (progress || 100) : 0

  return {
    user,
    profile,
    completedAssessments: hasAssessment ? Math.max(completedAssessments, 1) : 0,
    totalRecommendations,
    totalBookmarks,
    recommendations: finalRecommendations,
    activities: serializedActivities.length > 0 ? serializedActivities : defaultActivities,
    bookmarks: bookmarks || [],
    inProgressSession,
    progress: displayProgress,
    hasAssessment,
    isSampleData: dbRecommendations.length === 0 && finalRecommendations.length > 0,
  }
}

export default async function DashboardPage() {
  const data = await getDashboardData()

  if (!data.user) {
    redirect("/login")
  }

  const fullName = data.profile?.full_name || data.user.email?.split('@')[0] || 'there'
  const firstName = fullName?.split(" ")[0] || "there"

  return (
    <div className="min-h-screen bg-[#020205] relative overflow-hidden">
      {/* Rich Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[700px] h-[700px] bg-violet-600/8 rounded-full blur-[160px]" />
        <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-cyan-600/6 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 left-1/3 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[160px]" />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-5">
        {/* Header */}
        <header className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-violet-500/15 to-cyan-500/15 border border-white/[0.08] shadow-lg shadow-violet-500/10">
              <Sparkles className="w-5 h-5 text-violet-300" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-white tracking-tight">CareerOS</h1>
              <p className="text-[11px] text-white/30">AI-powered career discovery</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="text-white/40 hover:text-white hover:bg-white/[0.06] h-9 text-[12px]"
            >
              <Link href="/recommendations">
                Explore
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="text-white/40 hover:text-white hover:bg-white/[0.06] h-9 text-[12px]"
            >
              <Link href="/profile">
                Profile
              </Link>
            </Button>
          </div>
        </header>

        {/* Welcome Banner */}
        <section className="mb-5">
          <WelcomeBanner
            firstName={firstName}
            hasAssessment={data.hasAssessment}
            inProgress={!!data.inProgressSession}
            progress={data.progress}
            topMatch={data.recommendations[0] ? {
              title: data.recommendations[0].title,
              confidence: data.recommendations[0].confidence
            } : undefined}
            totalMatches={data.totalRecommendations}
            highConfidenceCount={data.recommendations.filter(r => r.confidence > 0.8).length}
          />
        </section>

        {/* Stats Row */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
          <StatCard
            title="Assessment"
            value={data.completedAssessments}
            subtitle={data.hasAssessment ? "Career analysis complete" : "Start your journey"}
            meta={data.hasAssessment ? "Completed" : "Start"}
            icon="clipboard-check"
            color="emerald"
            delay={0.1}
            status={data.hasAssessment ? "completed" : "empty"}
          />
          <StatCard
            title="Matches"
            value={data.totalRecommendations}
            subtitle={`${data.recommendations.filter(r => r.confidence > 0.8).length} high-confidence`}
            meta="AI Powered"
            icon="target"
            color="violet"
            delay={0.15}
            status="completed"
          />
          <StatCard
            title="Saved"
            value={data.totalBookmarks}
            subtitle={data.totalBookmarks > 0 ? "Careers bookmarked" : "Save to compare"}
            meta={data.totalBookmarks > 0 ? "Active" : "Empty"}
            icon="bookmark"
            color="amber"
            delay={0.2}
            status={data.totalBookmarks > 0 ? "completed" : "empty"}
          />
          <StatCard
            title="Profile"
            value={data.hasAssessment ? 100 : 25}
            subtitle={data.hasAssessment ? "Strength: High" : "Complete assessment"}
            meta={data.hasAssessment ? "Complete" : "In Progress"}
            icon="zap"
            color="cyan"
            delay={0.25}
            showPercentage
            status={data.hasAssessment ? "completed" : "in-progress"}
          />
        </section>

        {/* Main Layout - 3 Columns */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
          {/* Left Column - Analysis & Activity */}
          <div className="xl:col-span-3 space-y-4">
            {/* Career Clarity */}
            <div className={cn(
              "relative overflow-hidden rounded-xl",
              "bg-white/[0.04] backdrop-blur-xl",
              "border border-white/[0.08]",
              "p-4"
            )}>
              <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-[15px] font-semibold text-white">Career Clarity</h3>
                  <p className="text-[11px] text-white/30 mt-0.5">Profile completion</p>
                </div>
                <span className="text-xl font-bold text-white">{data.progress}%</span>
              </div>
              
              <div className="flex justify-center py-2">
                <ProgressRing progress={data.progress} size={110} strokeWidth={8} />
              </div>

              {data.hasAssessment && (
                <div className="mt-3 pt-3 border-t border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-lg shadow-emerald-500/30" />
                    <span className="text-[11px] text-white/40">Assessment Complete</span>
                  </div>
                </div>
              )}
            </div>

            {/* Skills Radar */}
            <SkillsRadar />

            {/* Recent Activity */}
            <div className={cn(
              "relative overflow-hidden rounded-xl",
              "bg-white/[0.04] backdrop-blur-xl",
              "border border-white/[0.08]",
              "p-4"
            )}>
              <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 rounded-lg bg-violet-500/10 border border-violet-500/20">
                  <Activity className="w-4 h-4 text-violet-400" />
                </div>
                <h3 className="text-[15px] font-semibold text-white">Activity</h3>
              </div>
              <ActivityTimeline activities={data.activities} />
            </div>
          </div>

          {/* Center Column - Career Matches (Primary) */}
          <div className="xl:col-span-6">
            <div className={cn(
              "relative overflow-hidden rounded-xl",
              "bg-white/[0.04] backdrop-blur-xl",
              "border border-white/[0.08]",
              "p-4 h-full flex flex-col"
            )}>
              <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              
              {/* Header */}
              <div className="flex items-center justify-between mb-4 relative">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-violet-500/10 border border-violet-500/20">
                    <Brain className="w-5 h-5 text-violet-400" />
                  </div>
                  <div>
                    <h3 className="text-[17px] font-semibold text-white">Top Career Matches</h3>
                    <p className="text-[11px] text-white/30">
                      Based on your assessment
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="text-violet-400 hover:text-violet-300 hover:bg-violet-500/10 h-9 text-[12px]"
                >
                  <Link href="/recommendations">
                    View All
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
              </div>

              {/* Career Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative flex-1">
                {(() => {
                  // Get real career intelligence data
                  const allCareers = getAllCareers()
                  const careersWithScores = allCareers.map(career => {
                    const { overall, insights } = calculateMatchScore(career, userProfile)
                    return { career, score: overall, insights }
                  })
                  const topCareers = careersWithScores
                    .sort((a, b) => b.score - a.score)
                    .slice(0, 4)
                  
                  return topCareers.map(({ career, score, insights }, index) => (
                    <CareerCard
                      key={career.id}
                      career={career}
                      matchScore={score}
                      matchInsights={insights}
                      userSkills={userProfile}
                      index={index}
                    />
                  ))
                })()}
              </div>

              {/* Bottom Stats */}
              <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-2 text-[12px] text-white/35">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <span>
                    <span className="text-emerald-400 font-medium">
                      {data.recommendations.filter(r => r.confidence > 0.8).length}
                    </span> high-confidence matches
                  </span>
                </div>
                {data.isSampleData && (
                  <span className="text-[11px] text-white/25 bg-white/[0.05] px-2 py-1 rounded-md">
                    Sample data
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Actions & Progress */}
          <div className="xl:col-span-3 space-y-4">
            {/* Smart Actions */}
            <SmartActions 
              hasAssessment={data.hasAssessment}
              hasRecommendations={data.totalRecommendations > 0}
              hasBookmarks={data.totalBookmarks > 0}
            />

            {/* Progress Tracking */}
            <div className={cn(
              "relative overflow-hidden rounded-xl",
              "bg-white/[0.04] backdrop-blur-xl",
              "border border-white/[0.08]",
              "p-4"
            )}>
              <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 rounded-lg bg-violet-500/10 border border-violet-500/20">
                  <Award className="w-4 h-4 text-violet-400" />
                </div>
                <h3 className="text-[15px] font-semibold text-white">Progress</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between text-[11px] mb-1.5">
                    <span className="text-white/35">Profile</span>
                    <span className="text-emerald-400 font-medium">
                      {data.hasAssessment ? '100%' : '25%'}
                    </span>
                  </div>
                  <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"
                      style={{ width: data.hasAssessment ? '100%' : '25%' }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-[11px] mb-1.5">
                    <span className="text-white/35">Exploration</span>
                    <span className="text-violet-400 font-medium">
                      {Math.min(data.totalRecommendations * 15, 100)}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-violet-400 to-cyan-400 rounded-full"
                      style={{ width: `${Math.min(data.totalRecommendations * 15, 100)}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-[11px] mb-1.5">
                    <span className="text-white/35">Saved</span>
                    <span className="text-amber-400 font-medium">
                      {Math.min(data.totalBookmarks * 20, 100)}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-amber-400 to-orange-400 rounded-full"
                      style={{ width: `${Math.min(data.totalBookmarks * 20, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Saved Items */}
            <SavedItems bookmarks={data.bookmarks} />

            {/* Quick Links */}
            <div className={cn(
              "relative overflow-hidden rounded-xl",
              "bg-white/[0.04] backdrop-blur-xl",
              "border border-white/[0.08]",
              "p-4"
            )}>
              <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              <h3 className="text-[15px] font-semibold text-white mb-3">Quick Links</h3>
              <div className="space-y-1">
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="w-full justify-start text-white/40 hover:text-white hover:bg-white/[0.06] h-9 text-[12px]"
                >
                  <Link href="/recommendations">
                    <Lightbulb className="w-4 h-4 mr-2" />
                    Browse Careers
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="w-full justify-start text-white/40 hover:text-white hover:bg-white/[0.06] h-9 text-[12px]"
                >
                  <Link href="/assessment">
                    <ClipboardCheck className="w-4 h-4 mr-2" />
                    Retake Assessment
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
