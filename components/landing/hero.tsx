"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Brain, Target, TrendingUp, GraduationCap, BookOpen, Sparkles, Zap, BarChart3 } from "lucide-react"
import { useRef } from "react"

export function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -40])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -60])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.7])

  return (
    <section ref={containerRef} className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-14 pb-10 md:pt-16 md:pb-14">
      {/* Layered Atmosphere with Depth */}
      <div className="absolute inset-0 bg-[#020205]">
        {/* Deep background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(120,50,255,0.03),transparent)]" />
        
        {/* Animated gradient orbs with richer depth */}
        <motion.div 
          animate={{ 
            x: [0, 40, 0],
            y: [0, -25, 0],
            scale: [1, 1.15, 1]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-violet-600/[0.035] rounded-full blur-[160px]" 
        />
        <motion.div 
          animate={{ 
            x: [0, -25, 0],
            y: [0, 35, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/3 right-1/4 w-[600px] h-[500px] bg-blue-600/[0.025] rounded-full blur-[140px]" 
        />
        <motion.div 
          animate={{ 
            x: [0, 50, 0],
            y: [0, 25, 0],
            scale: [1, 1.08, 1]
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute top-1/2 left-1/5 w-[400px] h-[400px] bg-cyan-500/[0.02] rounded-full blur-[120px]" 
        />
      </div>

      <div className="container-wide relative z-10">
        {/* Hero Content - Emotionally Memorable */}
        <motion.div style={{ opacity }} className="max-w-2xl mx-auto text-center mb-10 md:mb-12">
          {/* Trust Badge - Premium refinement */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm mb-5 md:mb-6"
          >
            <div className="relative">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <div className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping opacity-40" />
            </div>
            <span className="text-xs text-white/50">Trusted by 50,000+ Indian students</span>
          </motion.div>

          {/* Emotionally Resonant Headline - Option A */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="font-medium text-white mb-4 md:mb-5 tracking-tight"
            style={{ 
              fontSize: 'clamp(1.875rem, 5.5vw, 3.25rem)',
              letterSpacing: '-0.035em', 
              lineHeight: 1.08 
            }}
          >
            The AI career counselor
            <br />
            <span className="bg-gradient-to-r from-violet-300 via-blue-300 to-cyan-300 bg-clip-text text-transparent">
              that actually gets you
            </span>
          </motion.h1>

          {/* Stronger Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="text-base md:text-lg text-white/40 max-w-lg mx-auto mb-6 md:mb-8 leading-relaxed"
          >
            Not generic advice. Personalized career paths built for Indian students, backed by data from 10,000+ success stories.
          </motion.p>

          {/* Premium CTAs with Stronger Microinteractions */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-7 md:mb-8"
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                size="lg"
                asChild
                className="group gap-2 h-12 px-8 text-sm font-medium rounded-full bg-white text-[#020205] hover:bg-white transition-all duration-500 relative overflow-hidden shadow-[0_0_40px_-10px_rgba(255,255,255,0.15)] hover:shadow-[0_0_50px_-5px_rgba(255,255,255,0.35)]"
              >
                <Link href="/auth/register">
                  <span className="relative z-10 flex items-center gap-2">
                    Start your assessment
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                size="lg"
                variant="ghost"
                asChild
                className="h-12 px-6 text-sm rounded-full text-white/40 hover:text-white/70 hover:bg-white/[0.03] transition-all duration-300 border border-white/[0.04] hover:border-white/[0.08]"
              >
                <Link href="#how-it-works">See how it works</Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Enhanced Credibility Strip */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center justify-center gap-6 md:gap-8 text-white/30 text-xs"
          >
            <span className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/10">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
              </span>
              50,000+ students guided
            </span>
            <span className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500/10">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400/80" />
              </span>
              4.9/5 rating
            </span>
            <span className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500/10">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400/80" />
              </span>
              500+ partner schools
            </span>
          </motion.div>
        </motion.div>

        {/* Real Working AI System - Premium Depth */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-4xl mx-auto"
          style={{ perspective: '1200px' }}
        >
          {/* Multi-layer glow */}
          <motion.div 
            animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.05, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -inset-8 bg-gradient-to-r from-violet-500/6 via-blue-500/6 to-cyan-500/6 rounded-[2.5rem] blur-3xl" 
          />
          <div className="absolute -inset-4 bg-gradient-to-r from-violet-500/3 via-blue-500/3 to-cyan-500/3 rounded-[2rem] blur-2xl" />
          
          {/* Main Intelligence Panel with Premium Depth */}
          <motion.div 
            style={{ y: y1 }}
            className="relative p-5 md:p-7 rounded-2xl bg-gradient-to-b from-white/[0.015] to-white/[0.005] backdrop-blur-2xl border border-white/[0.06] shadow-[0_0_80px_-20px_rgba(0,0,0,0.5),0_0_40px_-10px_rgba(139,92,246,0.1)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center shadow-lg shadow-violet-500/15">
                  <Brain className="h-5 w-5 text-white" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm font-medium text-white/95">Career Intelligence</p>
                  <p className="text-[10px] text-white/30">Live system • Updated 2m ago</p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 shadow-[0_0_20px_-5px_rgba(16,185,129,0.15)]">
                <Sparkles className="h-3.5 w-3.5 text-emerald-400/80" />
                <span className="text-[11px] text-emerald-400/90 font-medium">94.2% Match</span>
              </div>
            </div>

            {/* Career Matches - Enhanced Cards */}
            <div className="grid grid-cols-3 gap-3 mb-5">
              {[
                { name: "Data Scientist", match: "94.2%", change: "+2.1%", icon: Brain, active: true },
                { name: "Product Manager", match: "87.5%", change: "+0.8%", icon: Target },
                { name: "UX Researcher", match: "82.1%", change: "-0.3%", icon: TrendingUp },
              ].map((career, i) => (
                <motion.div 
                  key={career.name}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  className={`p-3.5 rounded-xl border transition-all duration-300 cursor-pointer ${
                    career.active 
                      ? 'bg-gradient-to-b from-white/[0.02] to-white/[0.01] border-violet-500/15 shadow-[0_8px_30px_-10px_rgba(139,92,246,0.2)]' 
                      : 'bg-white/[0.008] border-white/[0.03] hover:border-white/[0.06] hover:bg-white/[0.012] hover:shadow-[0_8px_30px_-10px_rgba(0,0,0,0.3)]'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2.5">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${career.active ? 'bg-violet-500/15 shadow-[0_0_15px_-5px_rgba(139,92,246,0.3)]' : 'bg-white/[0.04]'}`}>
                      <career.icon className={`h-4 w-4 ${career.active ? 'text-violet-400/90' : 'text-white/50'}`} strokeWidth={1.5} />
                    </div>
                    <div className={`text-[9px] px-1.5 py-0.5 rounded-full ${career.change.startsWith('+') ? 'bg-emerald-500/10 text-emerald-400/80 border border-emerald-500/20' : 'bg-white/[0.04] text-white/30'}`}>
                      {career.change}
                    </div>
                  </div>
                  <p className="text-xs text-white/70 mb-2">{career.name}</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: career.match }}
                        transition={{ duration: 1.4, delay: 0.6 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                        className={`h-full rounded-full ${career.active ? 'bg-gradient-to-r from-violet-400/80 to-blue-400/80' : 'bg-white/25'}`} 
                      />
                    </div>
                    <span className={`text-[10px] font-medium ${career.active ? 'text-violet-300/80' : 'text-white/30'}`}>{career.match}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Secondary Intelligence Row with Depth */}
            <div className="grid grid-cols-4 gap-3">
              {/* College Shortlist */}
              <motion.div 
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
                className="col-span-2 p-4 rounded-xl bg-white/[0.008] border border-white/[0.04] hover:border-white/[0.08] transition-all duration-300 hover:shadow-[0_8px_30px_-10px_rgba(0,0,0,0.3)]"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-3.5 w-3.5 text-blue-400/60" />
                    <span className="text-[10px] text-white/40 uppercase tracking-wide">College Shortlist</span>
                  </div>
                  <span className="text-[10px] text-white/25">8 matches</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    { name: "IIT Bombay", prob: "92%" },
                    { name: "IISc", prob: "89%" },
                    { name: "BITS Pilani", prob: "85%" },
                    { name: "IIIT Hyd", prob: "81%" },
                  ].map((college) => (
                    <div key={college.name} className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.08] hover:bg-white/[0.03] transition-colors cursor-pointer">
                      <span className="text-[10px] text-white/50">{college.name}</span>
                      <span className="text-[9px] text-white/25">{college.prob}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Skills */}
              <motion.div 
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
                className="p-4 rounded-xl bg-white/[0.008] border border-white/[0.04] hover:border-white/[0.08] transition-all duration-300 hover:shadow-[0_8px_30px_-10px_rgba(0,0,0,0.3)]"
              >
                <div className="flex items-center gap-2 mb-3">
                  <BarChart3 className="h-3.5 w-3.5 text-emerald-400/60" />
                  <span className="text-[10px] text-white/40 uppercase tracking-wide">Skills</span>
                </div>
                <div className="space-y-2.5">
                  {[
                    { label: "Analytical", score: "92" },
                    { label: "Creative", score: "85" },
                    { label: "Comm", score: "88" },
                  ].map((skill) => (
                    <div key={skill.label} className="flex justify-between text-[10px]">
                      <span className="text-white/30">{skill.label}</span>
                      <span className="text-white/55 font-medium">{skill.score}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Roadmap */}
              <motion.div 
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
                className="p-4 rounded-xl bg-white/[0.008] border border-white/[0.04] hover:border-white/[0.08] transition-all duration-300 hover:shadow-[0_8px_30px_-10px_rgba(0,0,0,0.3)]"
              >
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="h-3.5 w-3.5 text-amber-400/60" />
                  <span className="text-[10px] text-white/40 uppercase tracking-wide">Roadmap</span>
                </div>
                <div className="mb-2.5">
                  <div className="flex justify-between text-[10px] mb-1.5">
                    <span className="text-white/35">Progress</span>
                    <span className="text-white/60 font-medium">67%</span>
                  </div>
                  <div className="h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                    <div className="h-full w-2/3 bg-gradient-to-r from-amber-400/60 to-emerald-400/60 rounded-full" />
                  </div>
                </div>
                <p className="text-[9px] text-white/25">8 of 12 milestones</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Floating Cards with Enhanced Depth */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            style={{ y: y2 }}
            className="absolute -left-4 md:-left-12 top-1/4 p-4 rounded-xl bg-gradient-to-b from-[#0a0a14]/95 to-[#050508]/95 backdrop-blur-xl border border-white/[0.06] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)]"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-lg bg-violet-500/15 flex items-center justify-center">
                <Zap className="h-3 w-3 text-violet-400/80" />
              </div>
              <span className="text-[10px] text-white/40">AI Confidence</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-medium text-white/90">94.2</span>
              <span className="text-[11px] text-white/30">%</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            style={{ y: y1 }}
            className="absolute -right-4 md:-right-10 top-1/3 p-4 rounded-xl bg-gradient-to-b from-[#0a0a14]/95 to-[#050508]/95 backdrop-blur-xl border border-white/[0.06] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)]"
          >
            <p className="text-[10px] text-white/30 mb-2">Active now</p>
            <div className="flex items-center gap-2.5">
              <div className="flex -space-x-1.5">
                {['bg-violet-500/40', 'bg-blue-500/40', 'bg-cyan-500/40'].map((bg, i) => (
                  <div key={i} className={`w-5 h-5 rounded-full ${bg} border-2 border-[#0a0a14]`} />
                ))}
              </div>
              <span className="text-sm text-white/60 font-medium">2,847</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="absolute -bottom-3 left-1/4 p-3 rounded-lg bg-gradient-to-b from-[#0a0a14]/95 to-[#050508]/95 backdrop-blur-xl border border-white/[0.06] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)]"
          >
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <div className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-400 animate-ping opacity-50" />
              </div>
              <span className="text-xs text-white/40">500+ partner schools</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
