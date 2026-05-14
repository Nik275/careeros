"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react"

export function CTA() {
  return (
    <section className="relative py-14 md:py-18 overflow-hidden">
      <div className="absolute inset-0 bg-[#020205]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(120,50,255,0.04),transparent)]" />
      
      {/* Ambient glow */}
      <motion.div 
        animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.1, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-violet-500/[0.03] rounded-full blur-[120px]"
      />

      <div className="container-wide relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl mx-auto text-center"
        >
          {/* Badge with depth */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6 shadow-[0_0_30px_-10px_rgba(16,185,129,0.2)]"
          >
            <Sparkles className="h-3.5 w-3.5 text-emerald-400/70" />
            <span className="text-[11px] text-emerald-400/80 uppercase tracking-wider font-medium">Join 50,000+ students</span>
          </motion.div>

          <h2 
            className="text-xl md:text-2xl lg:text-3xl font-medium text-white mb-3"
            style={{ letterSpacing: '-0.03em', lineHeight: 1.15 }}
          >
            Ready to discover{" "}
            <span className="bg-gradient-to-r from-violet-300 via-blue-300 to-cyan-300 bg-clip-text text-transparent">
              your path?
            </span>
          </h2>

          <p className="text-sm text-white/35 max-w-md mx-auto mb-7">
            Take the 7-minute assessment and get your personalized career roadmap today.
          </p>

          <div className="flex flex-col items-center gap-6">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                size="lg"
                asChild
                className="group gap-2 h-12 px-9 text-sm font-medium rounded-full bg-white text-[#020205] hover:bg-white transition-all duration-500 relative overflow-hidden shadow-[0_0_50px_-10px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_-5px_rgba(255,255,255,0.4)]"
              >
                <Link href="/auth/register">
                  <span className="relative z-10 flex items-center gap-2">
                    Take the 7-Minute Assessment
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </Link>
              </Button>
            </motion.div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-white/25">
              {[
                { icon: CheckCircle2, text: "Free to start" },
                { icon: CheckCircle2, text: "No credit card" },
                { icon: CheckCircle2, text: "Instant results" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-emerald-400/50" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
