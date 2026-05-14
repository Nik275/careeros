"use client"

import { motion } from "framer-motion"
import { UserCircle, Brain, Map, ArrowRight } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Discover yourself",
    subtitle: "The Assessment",
    description: "Answer thoughtful questions about your interests, strengths, personality, and academic background. Takes just 5-7 minutes.",
    before: "Confused about options",
    after: "Clear self-awareness",
    icon: UserCircle,
    color: "violet",
    gradient: "from-violet-500 to-purple-500",
    stats: { label: "Questions", value: "47" },
  },
  {
    number: "02",
    title: "AI maps your future",
    subtitle: "The Analysis",
    description: "Our AI matches your unique profile against 10,000+ successful career paths, analyzing real-world outcomes and trajectories.",
    before: "No direction",
    after: "Personalized matches",
    icon: Brain,
    color: "blue",
    gradient: "from-blue-500 to-cyan-500",
    stats: { label: "Career paths", value: "10,000+" },
  },
  {
    number: "03",
    title: "Get your roadmap",
    subtitle: "Your Plan",
    description: "Receive a complete career plan with tailored recommendations, personalized college shortlist, and exam strategies.",
    before: "Uncertain next steps",
    after: "Clear action plan",
    icon: Map,
    color: "emerald",
    gradient: "from-emerald-500 to-teal-500",
    stats: { label: "Milestones", value: "12" },
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-14 md:py-18 overflow-hidden">
      <div className="absolute inset-0 bg-[#020205]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(120,50,255,0.03),transparent)]" />

      <div className="container-wide relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-lg mb-10 md:mb-12"
        >
          <p className="text-[10px] text-white/20 uppercase tracking-[0.25em] mb-3">How it works</p>
          <h2 
            className="text-xl md:text-2xl lg:text-3xl font-medium text-white"
            style={{ letterSpacing: '-0.03em', lineHeight: 1.15 }}
          >
            Three steps to{" "}
            <span className="bg-gradient-to-r from-violet-300 via-blue-300 to-cyan-300 bg-clip-text text-transparent">
              clarity
            </span>
          </h2>
        </motion.div>

        {/* Vertical Progression with Premium Depth */}
        <div className="relative max-w-4xl">
          {/* Progress Line - Enhanced glow */}
          <div className="absolute left-[1.25rem] md:left-[1.625rem] top-8 bottom-8 w-0.5">
            <div className="absolute inset-0 bg-white/[0.03] rounded-full" />
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 bg-gradient-to-b from-violet-500/50 via-blue-500/50 to-emerald-500/50 origin-top rounded-full shadow-[0_0_30px_rgba(139,92,246,0.4)]"
            />
          </div>

          {/* Steps */}
          <div className="space-y-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="relative pl-12 md:pl-16"
              >
                {/* Number/Icon with depth */}
                <motion.div 
                  whileHover={{ scale: 1.08 }}
                  className="absolute left-0 top-0 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-white/[0.02] to-white/[0.006] border border-white/[0.06] shadow-[0_8px_30px_-10px_rgba(0,0,0,0.4)]"
                >
                  <step.icon 
                    className={`h-4 w-4 md:h-5 md:w-5 ${
                      step.color === 'violet' ? 'text-violet-400/80' :
                      step.color === 'blue' ? 'text-blue-400/80' :
                      'text-emerald-400/80'
                    }`} 
                    strokeWidth={1.5} 
                  />
                </motion.div>

                {/* Content */}
                <div className="grid md:grid-cols-2 gap-5 md:gap-10">
                  {/* Left - Text */}
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[10px] text-white/15 font-mono">{step.number}</span>
                      <span className="text-[10px] text-white/30 uppercase tracking-wider">{step.subtitle}</span>
                    </div>
                    <h3 className="text-base md:text-lg font-medium text-white mb-2" style={{ letterSpacing: '-0.01em' }}>
                      {step.title}
                    </h3>
                    <p className="text-sm text-white/30 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Right - Transformation Cards with Rich Depth */}
                  <div className="flex items-center gap-3 md:gap-4">
                    {/* Before */}
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="flex-1 p-4 rounded-xl bg-white/[0.01] border border-white/[0.05] transition-colors"
                    >
                      <p className="text-[10px] text-white/15 uppercase tracking-wider mb-2">Before</p>
                      <p className="text-sm text-white/35">{step.before}</p>
                    </motion.div>

                    {/* Arrow with animation */}
                    <motion.div 
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }}
                    >
                      <ArrowRight className={`h-4 w-4 flex-shrink-0 ${
                        step.color === 'violet' ? 'text-violet-400/50' :
                        step.color === 'blue' ? 'text-blue-400/50' :
                        'text-emerald-400/50'
                      }`} />
                    </motion.div>

                    {/* After with premium styling */}
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className={`flex-1 p-4 rounded-xl border ${
                        step.color === 'violet' ? 'bg-violet-500/[0.04] border-violet-500/20 shadow-[0_0_40px_-15px_rgba(139,92,246,0.25)]' :
                        step.color === 'blue' ? 'bg-blue-500/[0.04] border-blue-500/20 shadow-[0_0_40px_-15px_rgba(59,130,246,0.25)]' :
                        'bg-emerald-500/[0.04] border-emerald-500/20 shadow-[0_0_40px_-15px_rgba(16,185,129,0.25)]'
                      } transition-all duration-300`}
                    >
                      <p className={`text-[10px] uppercase tracking-wider mb-2 ${
                        step.color === 'violet' ? 'text-violet-400/60' :
                        step.color === 'blue' ? 'text-blue-400/60' :
                        'text-emerald-400/60'
                      }`}>After</p>
                      <p className="text-sm text-white/70">{step.after}</p>
                    </motion.div>

                    {/* Stat */}
                    <div className="w-16 text-right">
                      <p className="text-lg font-medium text-white/70">{step.stats.value}</p>
                      <p className="text-[9px] text-white/15 uppercase">{step.stats.label}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
