"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Shield, Cpu, MapPin, Award, Users, Star } from "lucide-react"

const stats = [
  { value: 50000, suffix: "+", label: "Students guided" },
  { value: 4.9, suffix: "", label: "Average rating" },
  { value: 500, suffix: "+", label: "Partner schools" },
]

const trustBadges = [
  { icon: Shield, label: "Bank-grade secure" },
  { icon: Cpu, label: "AI-powered" },
  { icon: MapPin, label: "Made for India" },
]

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  useEffect(() => {
    if (isInView) {
      const duration = 2000
      const steps = 60
      const increment = value / steps
      let current = 0

      const timer = setInterval(() => {
        current += increment
        if (current >= value) {
          setCount(value)
          clearInterval(timer)
        } else {
          setCount(Math.floor(current * 10) / 10)
        }
      }, duration / steps)

      return () => clearInterval(timer)
    }
  }, [isInView, value])

  const displayValue = value % 1 !== 0 ? count.toFixed(1) : Math.floor(count)

  return (
    <span ref={ref}>
      {displayValue}
      {suffix}
    </span>
  )
}

export function TrustStats() {
  return (
    <section className="relative py-10 md:py-12 overflow-hidden border-y border-white/[0.02] bg-[#020205]">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.005] to-transparent" />

      <div className="container-wide relative">
        {/* Badges with depth */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-8"
        >
          {trustBadges.map((badge) => (
            <div
              key={badge.label}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.015] border border-white/[0.04] hover:border-white/[0.08] transition-colors"
            >
              <badge.icon className="h-3 w-3 text-white/20" strokeWidth={1.5} />
              <span className="text-[11px] text-white/30">{badge.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Stats with enhanced styling */}
        <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <div className="text-2xl md:text-3xl font-medium text-white/80 mb-1" style={{ letterSpacing: '-0.02em' }}>
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-[10px] text-white/20 uppercase tracking-[0.15em]">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
