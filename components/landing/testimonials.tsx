"use client"

import { motion } from "framer-motion"
import { BadgeCheck, MapPin, Quote, Verified, Star } from "lucide-react"

const featuredStory = {
  name: "Arjun Mehta",
  role: "Class 12 PCM",
  location: "Delhi NCR",
  avatarGradient: "from-violet-500 via-purple-500 to-blue-500",
  confusion: "CSE vs AI/ML dilemma",
  result: "IISc Bangalore",
  program: "B.Stat Data Science",
  verified: true,
  content: "Everyone told me to take CSE because 'it pays well.' But I actually enjoyed statistics and problem-solving more than coding. The assessment showed my analytical scores were 94%—way higher than my programming interest at 67%. Now I'm preparing for IISc's Data Science program. My parents finally understand why this makes sense for me.",
  quote: "The numbers don't lie. I finally have proof of what I'm actually good at."
}

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Class 12 PCB",
    location: "Mumbai",
    avatarGradient: "from-emerald-500 via-teal-500 to-cyan-500",
    confusion: "MBBS pressure from parents",
    result: "Christ University",
    program: "Psychology (Hons)",
    verified: true,
    content: "My parents had decided I'd do MBBS since I was 10. But I felt drawn to understanding human behavior, not memorizing anatomy. The assessment showed my communication and empathy scores were in the top 5%.",
    quote: "I'm the first in my family to not choose medicine. And they're proud now."
  },
  {
    name: "Vikram Patel",
    role: "Parent",
    location: "Hyderabad",
    avatarGradient: "from-amber-500 via-orange-500 to-rose-500",
    confusion: "Generic counseling visits",
    result: "Clear JEE roadmap",
    program: "Computer Engineering",
    verified: true,
    content: "We visited four career counselors. Each gave the same generic advice: 'Engineering is good.' CareerOS gave us specific colleges, JEE percentile targets, and a month-by-month prep plan for my son.",
    quote: "Finally, someone gave us actual numbers and targets."
  },
  {
    name: "Sneha Reddy",
    role: "Class 12 Commerce",
    location: "Bangalore",
    avatarGradient: "from-rose-500 via-pink-500 to-violet-500",
    confusion: "CA because family tradition",
    result: "NMIMS",
    program: "BBA FinTech",
    verified: true,
    content: "Three generations of CAs in my family. I thought I had no choice until the assessment showed my tech aptitude was 91%—highest in my school batch. I had no idea I was good at this.",
    quote: "I discovered a strength I didn't know I had."
  },
]

// Avatar component with illustration-like styling
function AvatarIllustration({ name, gradient, size = "md" }: { name: string; gradient: string; size?: "sm" | "md" | "lg" }) {
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2)
  const sizeClasses = {
    sm: "w-9 h-9 text-[11px]",
    md: "w-12 h-12 text-sm",
    lg: "w-16 h-16 text-lg"
  }
  
  return (
    <div className={`relative ${sizeClasses[size as keyof typeof sizeClasses]} rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-medium shadow-lg`}>
      {/* Inner glow */}
      <div className="absolute inset-1 rounded-full bg-gradient-to-br from-white/20 to-transparent" />
      <span className="relative z-10">{initials}</span>
      {/* Outer ring */}
      <div className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-white/10 to-transparent -z-10" />
    </div>
  )
}

export function Testimonials() {
  return (
    <section className="relative py-14 md:py-18 overflow-hidden">
      <div className="absolute inset-0 bg-[#020205]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-violet-500/[0.025] rounded-full blur-[140px]" />

      <div className="container-wide relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-lg mb-8 md:mb-10"
        >
          <div className="flex items-center gap-2 mb-3">
            <p className="text-[10px] text-white/20 uppercase tracking-[0.25em]">Success stories</p>
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/8 border border-emerald-500/15">
              <Verified className="h-2.5 w-2.5 text-emerald-400/60" />
              <span className="text-[9px] text-emerald-400/70">Verified</span>
            </div>
          </div>
          <h2 
            className="text-xl md:text-2xl lg:text-3xl font-medium text-white"
            style={{ letterSpacing: '-0.03em', lineHeight: 1.15 }}
          >
            From confusion to{" "}
            <span className="bg-gradient-to-r from-violet-300 via-blue-300 to-cyan-300 bg-clip-text text-transparent">
              clarity
            </span>
          </h2>
        </motion.div>

        {/* Featured Story - Premium depth */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4"
        >
          <div className="relative p-6 md:p-8 rounded-2xl bg-gradient-to-br from-white/[0.012] to-white/[0.004] border border-white/[0.06] overflow-hidden group hover:border-white/[0.1] transition-colors duration-500 shadow-[0_0_60px_-20px_rgba(0,0,0,0.5)]">
            {/* Ambient glow */}
            <div className="absolute -top-32 -right-32 w-80 h-80 bg-violet-500/6 rounded-full blur-[100px] group-hover:bg-violet-500/10 transition-colors duration-700" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-blue-500/4 rounded-full blur-[80px]" />
            
            <div className="relative grid md:grid-cols-5 gap-6 md:gap-8 items-start">
              {/* Left - Profile with illustration avatar */}
              <div className="md:col-span-2">
                <div className="flex items-center gap-4 mb-5">
                  <AvatarIllustration name={featuredStory.name} gradient={featuredStory.avatarGradient} size="lg" />
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-base font-medium text-white/95">{featuredStory.name}</p>
                      {featuredStory.verified && (
                        <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                          <Verified className="h-2.5 w-2.5 text-emerald-400/70" />
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-white/30 mt-0.5">
                      <span>{featuredStory.role}</span>
                      <span className="w-0.5 h-0.5 rounded-full bg-white/20" />
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {featuredStory.location}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {/* Challenge tag */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.02] border border-white/[0.04] text-xs text-white/30">
                    <span className="text-white/15">Started with:</span>
                    {featuredStory.confusion}
                  </div>
                  
                  {/* Result card with depth */}
                  <motion.div 
                    whileHover={{ scale: 1.01 }}
                    className="p-4 rounded-xl bg-gradient-to-r from-emerald-500/[0.06] to-teal-500/[0.03] border border-emerald-500/15 shadow-[0_0_30px_-10px_rgba(16,185,129,0.15)]"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 text-emerald-400/70 fill-emerald-400/30" />
                        <span className="text-sm font-medium text-emerald-400/80">{featuredStory.result}</span>
                      </div>
                    </div>
                    <p className="text-xs text-white/25">{featuredStory.program}</p>
                  </motion.div>
                </div>
              </div>

              {/* Right - Story */}
              <div className="md:col-span-3">
                <Quote className="h-6 w-6 text-violet-400/25 mb-3" />
                <p className="text-base text-white/40 leading-relaxed mb-4">
                  {featuredStory.content}
                </p>
                <div className="pt-4 border-t border-white/[0.04]">
                  <p className="text-base text-white/60 italic">
                    &ldquo;{featuredStory.quote}&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Supporting Grid - Enhanced depth */}
        <div className="grid md:grid-cols-3 gap-4">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div 
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="group h-full p-5 rounded-xl bg-white/[0.008] border border-white/[0.04] hover:border-white/[0.08] hover:bg-white/[0.012] transition-all duration-500 shadow-[0_0_40px_-15px_rgba(0,0,0,0.3)]"
              >
                <div className="flex items-center gap-3 mb-4">
                  <AvatarIllustration name={testimonial.name} gradient={testimonial.avatarGradient} size="sm" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-medium text-white/85 truncate">{testimonial.name}</p>
                      {testimonial.verified && (
                        <Verified className="h-3 w-3 text-emerald-400/50 flex-shrink-0" />
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-white/20">
                      <MapPin className="h-2.5 w-2.5" />
                      <span>{testimonial.location}</span>
                    </div>
                  </div>
                </div>

                <motion.div 
                  whileHover={{ scale: 1.01 }}
                  className="flex items-center gap-1.5 mb-3 px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-emerald-500/[0.04] to-transparent border border-emerald-500/8"
                >
                  <BadgeCheck className="h-3 w-3 text-emerald-400/50" />
                  <span className="text-[10px] text-emerald-400/60">{testimonial.result}</span>
                </motion.div>

                <p className="text-xs text-white/25 leading-relaxed mb-3">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                
                <p className="text-xs text-white/45 italic border-t border-white/[0.03] pt-3 mt-3">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
