'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  Sparkles, 
  Target, 
  Brain, 
  Briefcase, 
  GraduationCap, 
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Lightbulb
} from 'lucide-react'

interface AnalysisResult {
  personalityType: string
  topTraits: string[]
  recommendedCareers: {
    title: string
    match: number
    description: string
    icon: string
  }[]
  recommendedExams: {
    name: string
    relevance: string
    difficulty: 'Easy' | 'Medium' | 'Hard'
  }[]
  topSkills: string[]
  learningPath: string[]
}

export default function AnalysisPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [result, setResult] = useState<AnalysisResult | null>(null)

  useEffect(() => {
    // Simulate analysis processing
    const timer = setTimeout(() => {
      setResult({
        personalityType: 'Analytical Innovator',
        topTraits: ['Problem Solver', 'Creative Thinker', 'Detail Oriented', 'Independent'],
        recommendedCareers: [
          {
            title: 'Software Engineer',
            match: 95,
            description: 'Design and develop innovative software solutions',
            icon: '💻',
          },
          {
            title: 'Data Scientist',
            match: 88,
            description: 'Analyze complex data to drive business decisions',
            icon: '📊',
          },
          {
            title: 'Product Manager',
            match: 82,
            description: 'Lead product development from concept to launch',
            icon: '🚀',
          },
        ],
        recommendedExams: [
          { name: 'JEE Main & Advanced', relevance: 'Essential for IITs', difficulty: 'Hard' },
          { name: 'BITSAT', relevance: 'For BITS Pilani', difficulty: 'Medium' },
          { name: 'State CET', relevance: 'State engineering colleges', difficulty: 'Medium' },
        ],
        topSkills: ['Analytical Thinking', 'Programming', 'Problem Solving', 'Communication'],
        learningPath: [
          'Master core programming languages (Python, Java)',
          'Build projects to strengthen portfolio',
          'Participate in coding competitions',
          'Explore internships and practical experience',
        ],
      })
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

  if (isLoading) {
    return <AnalysisLoadingScreen />
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-[#020205] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Analysis Not Available</h2>
          <Link 
            href="/assessment" 
            className="text-violet-400 hover:text-violet-300 transition-colors"
          >
            Take Assessment
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#020205] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,50,255,0.15),transparent)]" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-[128px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[128px]" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm mb-6">
            <CheckCircle2 className="w-4 h-4" />
            Assessment Completed
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Your Career Analysis
          </h1>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Based on your responses, we&apos;ve created a personalized career roadmap tailored to your strengths and aspirations.
          </p>
        </motion.div>

        {/* Personality Type Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-violet-500/20 to-blue-500/20 border border-white/10 rounded-3xl p-8 mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-violet-500/20">
              <Sparkles className="w-6 h-6 text-violet-400" />
            </div>
            <span className="text-violet-400 font-medium">Your Personality Type</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {result.personalityType}
          </h2>
          <div className="flex flex-wrap gap-2">
            {result.topTraits.map((trait) => (
              <span
                key={trait}
                className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm"
              >
                {trait}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Top Career Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-emerald-500/20">
              <Briefcase className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-2xl font-semibold text-white">Top Career Matches</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {result.recommendedCareers.map((career, index) => (
              <motion.div
                key={career.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 hover:bg-white/[0.04] transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl">{career.icon}</span>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium">
                    {career.match}% Match
                  </span>
                </div>
                <h4 className="text-xl font-semibold text-white mb-2">{career.title}</h4>
                <p className="text-white/50 text-sm">{career.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Recommended Exams */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-amber-500/20">
                <GraduationCap className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">Recommended Exams</h3>
            </div>

            <div className="space-y-4">
              {result.recommendedExams.map((exam, index) => (
                <div
                  key={exam.name}
                  className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]"
                >
                  <div>
                    <h4 className="font-medium text-white mb-1">{exam.name}</h4>
                    <p className="text-sm text-white/40">{exam.relevance}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    exam.difficulty === 'Easy' 
                      ? 'bg-emerald-500/10 text-emerald-400'
                      : exam.difficulty === 'Medium'
                      ? 'bg-amber-500/10 text-amber-400'
                      : 'bg-red-500/10 text-red-400'
                  }`}>
                    {exam.difficulty}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Top Skills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-blue-500/20">
                <Brain className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">Your Top Skills</h3>
            </div>

            <div className="space-y-3">
              {result.topSkills.map((skill, index) => (
                <div key={skill} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center text-violet-400 text-sm font-medium">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-violet-500 to-blue-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${95 - index * 10}%` }}
                        transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                      />
                    </div>
                  </div>
                  <span className="text-white/70 text-sm">{skill}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Learning Path */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-rose-500/20">
              <TrendingUp className="w-6 h-6 text-rose-400" />
            </div>
            <h3 className="text-xl font-semibold text-white">Recommended Learning Path</h3>
          </div>

          <div className="space-y-4">
            {result.learningPath.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]"
              >
                <div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center text-violet-400 text-sm font-medium flex-shrink-0">
                  {index + 1}
                </div>
                <p className="text-white/70">{step}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-[#020205] font-medium hover:bg-white/90 transition-all group"
          >
            Go to Dashboard
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/recommendations"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/[0.05] border border-white/10 text-white font-medium hover:bg-white/[0.1] transition-all"
          >
            <Lightbulb className="w-5 h-5" />
            View Detailed Recommendations
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

function AnalysisLoadingScreen() {
  return (
    <div className="min-h-screen bg-[#020205] flex items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,50,255,0.15),transparent)]" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-[128px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[128px] animate-pulse" />

      <div className="relative z-10 text-center max-w-md mx-auto px-4">
        <motion.div
          className="relative w-32 h-32 mx-auto mb-8"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute inset-0 rounded-full border-2 border-violet-500/20" />
          <div className="absolute inset-2 rounded-full border-2 border-blue-500/20" />
          <div className="absolute inset-4 rounded-full border-2 border-violet-500/30" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Brain className="w-12 h-12 text-violet-400" />
          </div>
        </motion.div>

        <motion.h2
          className="text-3xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Analyzing Your Profile
        </motion.h2>

        <motion.p
          className="text-white/50 mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Our AI is processing your responses to generate personalized career recommendations...
        </motion.p>

        <div className="space-y-3">
          {[
            'Analyzing personality traits...',
            'Evaluating skill matches...',
            'Generating career paths...',
            'Finalizing recommendations...',
          ].map((text, index) => (
            <motion.div
              key={text}
              className="flex items-center gap-3 text-sm text-white/40"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.2 }}
            >
              <motion.div
                className="w-2 h-2 rounded-full bg-violet-500"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: index * 0.2 }}
              />
              {text}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
