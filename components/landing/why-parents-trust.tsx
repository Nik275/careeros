"use client"

import { motion } from "framer-motion"
import { Shield, Brain, Map, GraduationCap, HeartHandshake, LineChart } from "lucide-react"

const reasons = [
  {
    icon: Brain,
    title: "AI-Powered Personalization",
    description: "Our AI analyzes your child's unique strengths, interests, and academic profile to provide truly personalized career recommendations.",
    gradient: "from-violet-500 to-purple-500",
  },
  {
    icon: Map,
    title: "Clear Career Roadmaps",
    description: "Get step-by-step guidance from 12th grade to dream career, including which exams to take and skills to build.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: GraduationCap,
    title: "College & Exam Alignment",
    description: "Every recommendation is aligned with actual college requirements and entrance exam pathways in India.",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    icon: Shield,
    title: "Data-Driven Decisions",
    description: "Remove guesswork with objective AI analysis based on successful career outcomes and market demand.",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    icon: LineChart,
    title: "Future-Proof Careers",
    description: "We consider emerging industries and job market trends to ensure long-term career success.",
    gradient: "from-rose-500 to-pink-500",
  },
  {
    icon: HeartHandshake,
    title: "Built for Indian Families",
    description: "Designed specifically for the Indian education system, entrance exams, and family decision-making dynamics.",
    gradient: "from-indigo-500 to-blue-500",
  },
]

export function WhyParentsTrust() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0a0a0f]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(59,130,246,0.08),transparent)]" />

      <div className="container-wide relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
              <Shield className="h-4 w-4 text-emerald-400" />
              <span className="text-sm text-white/80">Why Parents Trust Us</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight" style={{ letterSpacing: '-0.02em' }}>
              Make confident career decisions{" "}
              <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                together
              </span>
            </h2>

            <p className="text-lg text-white/50 mb-8 leading-relaxed">
              CareerOS brings clarity to one of the most important decisions in your child&apos;s life.
              Our AI-powered platform helps families make data-driven career choices with confidence.
            </p>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 border-2 border-[#0a0a0f]"
                  />
                ))}
              </div>
              <div>
                <div className="text-sm font-medium text-white">Trusted by 10,000+ Parents</div>
                <div className="text-xs text-white/40">Making smarter decisions together</div>
              </div>
            </div>
          </motion.div>

          {/* Right Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {reasons.map((reason, index) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="card-dark-glass h-full p-5 group">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br ${reason.gradient} mb-4 shadow-lg`}>
                    <reason.icon className="h-5 w-5 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-base font-semibold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/80 transition-all duration-300">
                    {reason.title}
                  </h3>
                  <p className="text-sm text-white/40 leading-relaxed group-hover:text-white/50 transition-colors duration-300">
                    {reason.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
