"use client"

import { motion } from "framer-motion"

const institutions = [
  { name: "IIT Bombay", abbr: "IIT" },
  { name: "IIT Delhi", abbr: "IIT" },
  { name: "IISc Bangalore", abbr: "IISc" },
  { name: "BITS Pilani", abbr: "BITS" },
  { name: "NIT Trichy", abbr: "NIT" },
  { name: "Christ University", abbr: "Christ" },
  { name: "Ashoka University", abbr: "Ashoka" },
  { name: "SRCC Delhi", abbr: "SRCC" },
]

export function TrustStrip() {
  return (
    <section className="relative py-8 md:py-10 overflow-hidden border-y border-white/[0.02] bg-[#020205]">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.005] to-transparent" />
      
      <div className="container-wide relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <p className="text-[10px] text-white/20 uppercase tracking-[0.2em]">
            Trusted by students from
          </p>
        </motion.div>

        {/* Institutions - Animated scroll effect */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative"
        >
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            {institutions.map((inst, index) => (
              <motion.div
                key={inst.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -1, transition: { duration: 0.2 } }}
                className="group flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.015] border border-white/[0.03] hover:border-white/[0.06] hover:bg-white/[0.025] transition-all duration-300"
              >
                <span className="w-6 h-6 rounded-md bg-gradient-to-br from-white/[0.08] to-white/[0.02] flex items-center justify-center text-[9px] font-medium text-white/50">
                  {inst.abbr.slice(0, 2)}
                </span>
                <span className="text-xs text-white/35 group-hover:text-white/50 transition-colors">
                  {inst.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom trust metrics */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-6 mt-6 text-[11px] text-white/15"
        >
          <span className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-emerald-400/50" />
            500+ partner schools
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-blue-400/50" />
            Verified by educators
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-violet-400/50" />
            AI-powered guidance
          </span>
        </motion.div>
      </div>
    </section>
  )
}
