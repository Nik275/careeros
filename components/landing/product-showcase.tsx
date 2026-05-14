"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { 
  Brain, 
  Target, 
  GraduationCap, 
  TrendingUp, 
  Sparkles,
  CheckCircle2,
  MapPin,
  Award,
  ArrowRight
} from "lucide-react"

const dashboardFeatures = [
  { icon: Brain, label: "AI Analysis", color: "from-violet-500 to-purple-500" },
  { icon: Target, label: "Career Match", color: "from-blue-500 to-cyan-500" },
  { icon: GraduationCap, label: "Colleges", color: "from-emerald-500 to-teal-500" },
  { icon: TrendingUp, label: "Roadmap", color: "from-amber-500 to-orange-500" },
]

const careerMatches = [
  { title: "Data Scientist", match: "98%", trend: "+23% growth", color: "bg-blue-500" },
  { title: "AI Engineer", match: "94%", trend: "+45% growth", color: "bg-violet-500" },
  { title: "Product Manager", match: "89%", trend: "+18% growth", color: "bg-emerald-500" },
]

const roadmapSteps = [
  { step: "1", title: "Learn Python", status: "completed" },
  { step: "2", title: "Statistics & Math", status: "completed" },
  { step: "3", title: "Machine Learning", status: "in-progress" },
  { step: "4", title: "Deep Learning", status: "pending" },
]

export function ProductShowcase() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  return (
    <section ref={containerRef} className="relative py-24 md:py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      
      <div className="container-wide relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 md:mb-24"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium bg-primary/5 text-primary border border-primary/10 mb-6">
            <Sparkles className="h-3.5 w-3.5" />
            See how it works
          </span>
          <h2 className="text-headline mb-6">
            Your personalized career{" "}
            <span className="gradient-text-brand">command center</span>
          </h2>
          <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
            Get AI-powered insights, career matches, and a clear roadmap tailored specifically for you.
          </p>
        </motion.div>

        {/* Dashboard Mockup */}
        <motion.div
          style={{ opacity }}
          className="relative"
        >
          <div className="relative mx-auto max-w-5xl">
            {/* Main Dashboard Card */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-black/5 dark:border-white/10 overflow-hidden"
            >
              {/* Dashboard Header */}
              <div className="px-6 py-4 border-b border-black/5 dark:border-white/10 flex items-center justify-between bg-gradient-to-r from-violet-50/50 to-blue-50/50 dark:from-violet-950/20 dark:to-blue-950/20">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-blue-500">
                    <Brain className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-semibold text-sm">CareerOS Dashboard</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-blue-500 border-2 border-white" />
                    <div className="w-6 h-6 rounded-full bg-violet-500 border-2 border-white" />
                    <div className="w-6 h-6 rounded-full bg-emerald-500 border-2 border-white" />
                  </div>
                  <span className="text-xs text-muted-foreground ml-2">Team View</span>
                </div>
              </div>

              {/* Dashboard Content */}
              <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Navigation */}
                <div className="space-y-2">
                  {dashboardFeatures.map((feature, index) => (
                    <motion.div
                      key={feature.label}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                        index === 0 
                          ? "bg-gradient-to-r from-violet-500/10 to-blue-500/10 border border-violet-500/20" 
                          : "hover:bg-muted/50"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center`}>
                        <feature.icon className="h-4 w-4 text-white" />
                      </div>
                      <span className="font-medium text-sm">{feature.label}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Center Column - Career Matches */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Top Career Matches</h3>
                    <span className="text-xs text-muted-foreground">Based on your profile</span>
                  </div>
                  
                  {careerMatches.map((career, index) => (
                    <motion.div
                      key={career.title}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      className="group flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-all duration-200 cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl ${career.color} flex items-center justify-center text-white font-bold text-sm`}>
                          {career.title[0]}
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm">{career.title}</h4>
                          <span className="text-xs text-muted-foreground">{career.trend}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <span className="font-bold text-lg gradient-text-brand">{career.match}</span>
                          <span className="text-xs text-muted-foreground block">match</span>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Bottom Section - Roadmap Preview */}
              <div className="px-6 pb-6">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50/50 to-violet-50/50 dark:from-blue-950/20 dark:to-violet-950/20 border border-black/5 dark:border-white/5">
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="h-4 w-4 text-blue-500" />
                    <span className="font-semibold text-sm">Your Learning Roadmap</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {roadmapSteps.map((step, index) => (
                      <div key={step.step} className="flex items-center">
                        <motion.div
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: 0.5 + index * 0.1, type: "spring" }}
                          className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-semibold ${
                            step.status === "completed"
                              ? "bg-emerald-500 text-white"
                              : step.status === "in-progress"
                              ? "bg-blue-500 text-white"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {step.status === "completed" ? (
                            <CheckCircle2 className="h-4 w-4" />
                          ) : (
                            step.step
                          )}
                        </motion.div>
                        {index < roadmapSteps.length - 1 && (
                          <div className={`w-8 h-0.5 mx-1 ${
                            step.status === "completed" ? "bg-emerald-500/30" : "bg-muted"
                          }`} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating Elements */}
            <motion.div
              style={{ y }}
              className="absolute -right-8 top-1/4 hidden xl:block"
            >
              <div className="p-4 rounded-2xl bg-white dark:bg-zinc-800 shadow-xl border border-black/5 dark:border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                    <Award className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Achievement Unlocked</p>
                    <p className="text-xs text-muted-foreground">Completed Assessment</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
              className="absolute -left-8 bottom-1/4 hidden xl:block"
            >
              <div className="p-4 rounded-2xl bg-white dark:bg-zinc-800 shadow-xl border border-black/5 dark:border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex -space-x-1">
                    <div className="w-5 h-5 rounded-full bg-blue-500" />
                    <div className="w-5 h-5 rounded-full bg-violet-500" />
                    <div className="w-5 h-5 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-xs text-muted-foreground">+2.4k students</span>
                </div>
                <p className="font-semibold text-sm">Joined this week</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
