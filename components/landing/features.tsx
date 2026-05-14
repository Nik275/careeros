"use client"

import { motion } from "framer-motion"
import { Brain, GraduationCap, Target, TrendingUp, BookOpen, Users, ArrowUpRight } from "lucide-react"

export function Features() {
  return (
    <section id="features" className="relative py-14 md:py-18 overflow-hidden">
      <div className="absolute inset-0 bg-[#020205]" />
      <div className="absolute top-0 right-0 w-[600px] h-[500px] bg-violet-500/[0.02] rounded-full blur-[180px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/[0.015] rounded-full blur-[150px]" />

      <div className="container-wide relative">
        {/* Header - Better spacing rhythm */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl mb-8 md:mb-10"
        >
          <p className="text-[10px] text-white/20 uppercase tracking-[0.25em] mb-3">Features</p>
          <h2 
            className="text-xl md:text-2xl lg:text-3xl font-medium text-white mb-3"
            style={{ letterSpacing: '-0.03em', lineHeight: 1.15 }}
          >
            Intelligence for every
            <br />
            <span className="bg-gradient-to-r from-violet-300 via-blue-300 to-cyan-300 bg-clip-text text-transparent">
              step forward
            </span>
          </h2>
          <p className="text-sm text-white/30 leading-relaxed max-w-md">
            From discovery to admission, AI-powered tools designed specifically for Indian students.
          </p>
        </motion.div>

        {/* Editorial Layout with Premium Depth */}
        <div className="space-y-3">
          {/* Dominant Feature - Full Width with Rich Depth */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="group relative p-6 md:p-8 rounded-2xl bg-gradient-to-b from-white/[0.015] to-white/[0.005] border border-white/[0.06] hover:border-violet-500/15 transition-all duration-500 shadow-[0_0_60px_-20px_rgba(0,0,0,0.4)] hover:shadow-[0_0_80px_-15px_rgba(139,92,246,0.2)] overflow-hidden">
              {/* Animated ambient glow */}
              <motion.div 
                animate={{ 
                  opacity: [0.04, 0.08, 0.04],
                  scale: [1, 1.15, 1],
                  x: [0, 20, 0]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-40 -right-40 w-[450px] h-[450px] bg-violet-500/10 rounded-full blur-[120px]" 
              />
              <motion.div 
                animate={{ 
                  opacity: [0.03, 0.06, 0.03],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-20 -left-20 w-[300px] h-[300px] bg-blue-500/8 rounded-full blur-[100px]" 
              />
              
              <div className="relative grid lg:grid-cols-2 gap-8 items-center">
                {/* Left Content */}
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center shadow-lg shadow-violet-500/15 group-hover:shadow-violet-500/30 transition-shadow duration-500">
                      <Brain className="h-5 w-5 text-white" strokeWidth={1.5} />
                    </div>
                    <div className="px-2.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/20">
                      <span className="text-[10px] text-violet-300/80 uppercase tracking-wider">AI Core</span>
                    </div>
                  </div>

                  <h3 className="text-lg md:text-xl font-medium text-white mb-2" style={{ letterSpacing: '-0.02em' }}>
                    AI Career Match
                  </h3>
                  <p className="text-sm text-white/30 leading-relaxed mb-5 max-w-md">
                    Our AI analyzes personality, skills, and interests against 10,000+ successful career paths. Not generic suggestions — truly personalized matches based on real Indian student outcomes.
                  </p>

                  <div className="flex gap-10">
                    <div>
                      <p className="text-2xl font-medium text-white/90 mb-0.5">10,000+</p>
                      <p className="text-[10px] text-white/20 uppercase tracking-wider">Career paths analyzed</p>
                    </div>
                    <div>
                      <p className="text-2xl font-medium text-white/90 mb-0.5">94.2%</p>
                      <p className="text-[10px] text-white/20 uppercase tracking-wider">Match accuracy</p>
                    </div>
                  </div>
                </div>

                {/* Right - Live Preview with Depth */}
                <motion.div 
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.3 }}
                  className="p-5 rounded-xl bg-white/[0.015] border border-white/[0.06] group-hover:border-white/[0.1] transition-colors shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)]"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <div className="relative">
                      <div className="w-2 h-2 rounded-full bg-emerald-400" />
                      <div className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-400 animate-ping opacity-40" />
                    </div>
                    <p className="text-[10px] text-white/30 uppercase tracking-wider">Live Analysis</p>
                  </div>
                  <div className="space-y-4">
                    {[
                      { label: "Personality alignment", value: "94.2%", color: "from-violet-400/70 to-blue-400/70" },
                      { label: "Skill compatibility", value: "87.5%", color: "from-blue-400/70 to-cyan-400/70" },
                      { label: "Interest overlap", value: "91.3%", color: "from-cyan-400/70 to-emerald-400/70" },
                    ].map((item, i) => (
                      <div key={item.label}>
                        <div className="flex justify-between mb-1.5">
                          <span className="text-xs text-white/35">{item.label}</span>
                          <span className="text-xs text-white/55 font-medium">{item.value}</span>
                        </div>
                        <div className="h-2 bg-white/[0.04] rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: item.value }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, delay: 0.3 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                            className={`h-full bg-gradient-to-r ${item.color} rounded-full`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Secondary Row - 2 Features with Depth */}
          <div className="grid md:grid-cols-2 gap-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div 
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="group h-full p-5 rounded-xl bg-white/[0.01] border border-white/[0.05] hover:border-blue-500/15 hover:bg-white/[0.015] transition-all duration-500 shadow-[0_0_40px_-15px_rgba(0,0,0,0.3)] hover:shadow-[0_0_50px_-10px_rgba(59,130,246,0.15)]"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/15 group-hover:shadow-blue-500/30 transition-shadow duration-500">
                    <GraduationCap className="h-4 w-4 text-white" strokeWidth={1.5} />
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-white/10 group-hover:text-white/25 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                </div>

                <h3 className="text-base font-medium text-white mb-1.5">Smart College Finder</h3>
                <p className="text-xs text-white/25 leading-relaxed mb-4">
                  Personalized recommendations based on your profile, exam readiness, and admission probability.
                </p>

                <div className="grid grid-cols-2 gap-2">
                  {[
                    { name: "IIT Bombay", prob: "92%" },
                    { name: "IISc", prob: "89%" },
                    { name: "BITS Pilani", prob: "85%" },
                    { name: "IIIT Hyd", prob: "81%" },
                  ].map((college) => (
                    <motion.div 
                      key={college.name} 
                      whileHover={{ scale: 1.03 }}
                      className="flex items-center justify-between px-2.5 py-2 rounded-lg bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.08] hover:bg-white/[0.03] transition-colors cursor-pointer"
                    >
                      <span className="text-[11px] text-white/40">{college.name}</span>
                      <span className="text-[10px] text-white/20">{college.prob}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div 
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="group h-full p-5 rounded-xl bg-white/[0.01] border border-white/[0.05] hover:border-emerald-500/15 hover:bg-white/[0.015] transition-all duration-500 shadow-[0_0_40px_-15px_rgba(0,0,0,0.3)] hover:shadow-[0_0_50px_-10px_rgba(16,185,129,0.15)]"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/15 group-hover:shadow-emerald-500/30 transition-shadow duration-500">
                  <Target className="h-4 w-4 text-white" strokeWidth={1.5} />
                </div>

                <h3 className="text-base font-medium text-white mb-1.5">Exam Strategy</h3>
                <p className="text-xs text-white/25 leading-relaxed mb-4">
                  JEE, NEET, CUET preparation timelines and targeted resources tailored to your target colleges.
                </p>

                <div className="flex flex-wrap gap-2">
                  {["JEE Main", "JEE Adv", "NEET", "CUET"].map((exam) => (
                    <span key={exam} className="px-2.5 py-1.5 text-[10px] rounded-lg bg-white/[0.02] text-white/20 border border-white/[0.04] hover:border-white/[0.08] hover:text-white/35 transition-colors cursor-default">
                      {exam}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Tertiary Row - 3 Compact Cards with Depth */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { title: "Career Roadmaps", desc: "Visual journey mapping", icon: TrendingUp, color: "from-amber-500 to-orange-500" },
              { title: "Skill Development", desc: "Gap analysis & learning", icon: BookOpen, color: "from-rose-500 to-pink-500" },
              { title: "Expert Mentorship", desc: "1-on-1 guidance", icon: Users, color: "from-indigo-500 to-violet-500" },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.div 
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  className="group h-full p-4 rounded-xl bg-white/[0.008] border border-white/[0.04] hover:border-white/[0.08] hover:bg-white/[0.012] transition-all duration-500"
                >
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-3 shadow-md group-hover:shadow-lg transition-shadow duration-300`}>
                    <feature.icon className="h-3.5 w-3.5 text-white" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-sm font-medium text-white mb-1">{feature.title}</h3>
                  <p className="text-[11px] text-white/20">{feature.desc}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
