"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Check, ArrowRight, Sparkles, Users, Star, Shield } from "lucide-react"

const plans = [
  {
    name: "Free",
    price: 0,
    description: "Start exploring",
    features: ["Basic career assessment", "3 AI career matches", "General college info", "Community access"],
    cta: "Get started free",
    href: "/auth/register",
    popular: false,
    icon: null,
  },
  {
    name: "Pro",
    price: 499,
    period: "/month",
    description: "Everything you need",
    badge: "Most Popular",
    features: [
      "Advanced AI matching engine",
      "Unlimited career recommendations",
      "Personalized college shortlist",
      "Exam strategy & timeline",
      "Skill gap analysis",
      "12-month career roadmap",
      "Priority support",
    ],
    cta: "Start free trial",
    href: "/auth/register",
    popular: true,
    icon: Sparkles,
    stat: "94% of students choose Pro",
  },
  {
    name: "Premium",
    price: 999,
    period: "/month",
    description: "Full guidance",
    features: [
      "Everything in Pro",
      "Monthly 1-on-1 expert calls",
      "Resume & portfolio review",
      "Mock interview sessions",
      "College alumni connections",
      "Application essay review",
    ],
    cta: "Go Premium",
    href: "/auth/register",
    popular: false,
    icon: Users,
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="relative py-14 md:py-18 overflow-hidden">
      <div className="absolute inset-0 bg-[#020205]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(120,50,255,0.035),transparent)]" />

      <div className="container-wide relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10 md:mb-12"
        >
          <p className="text-[10px] text-white/20 uppercase tracking-[0.25em] mb-3">Pricing</p>
          <h2 
            className="text-xl md:text-2xl lg:text-3xl font-medium text-white mb-3"
            style={{ letterSpacing: '-0.03em', lineHeight: 1.15 }}
          >
            Less than one{" "}
            <span className="bg-gradient-to-r from-violet-300 via-blue-300 to-cyan-300 bg-clip-text text-transparent">
              counseling session
            </span>
          </h2>
          <p className="text-sm text-white/30">Professional guidance at a fraction of the cost</p>
        </motion.div>

        {/* Cards - Pro visually dominant with premium depth */}
        <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto items-start">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`relative ${plan.popular ? 'md:-mt-6 md:mb-0' : ''}`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <motion.div 
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 shadow-lg shadow-violet-500/30"
                  >
                    <Star className="h-3 w-3 text-white/90 fill-white/30" />
                    <span className="text-[11px] text-white font-medium tracking-wide">{plan.badge}</span>
                  </motion.div>
                </div>
              )}

              <motion.div 
                whileHover={plan.popular ? { y: -4, transition: { duration: 0.2 } } : { y: -2 }}
                className={`relative h-full p-6 rounded-2xl transition-all duration-500 ${
                  plan.popular
                    ? 'bg-gradient-to-b from-white/[0.02] to-white/[0.006] border-2 border-violet-500/25 shadow-[0_0_80px_-20px_rgba(139,92,246,0.35),inset_0_1px_1px_rgba(255,255,255,0.05)]'
                    : 'bg-white/[0.008] border border-white/[0.05] hover:border-white/[0.1] hover:bg-white/[0.012] shadow-[0_0_40px_-15px_rgba(0,0,0,0.3)]'
                }`}
              >
                {/* Icon for popular */}
                {plan.icon && plan.popular && (
                  <div className="absolute top-5 right-5 w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500/20 to-blue-500/20 flex items-center justify-center border border-violet-500/10">
                    <plan.icon className="h-4 w-4 text-violet-400/80" />
                  </div>
                )}

                <div className="mb-5">
                  <h3 className="text-base font-medium text-white mb-1">{plan.name}</h3>
                  <p className="text-xs text-white/25">{plan.description}</p>
                </div>

                <div className="mb-5">
                  <span className="text-3xl font-medium text-white">
                    {plan.price === 0 ? 'Free' : `₹${plan.price}`}
                  </span>
                  {plan.price > 0 && <span className="text-white/25 text-xs ml-1">{plan.period}</span>}
                </div>

                {/* Popular stat with trust */}
                {plan.stat && (
                  <div className="flex items-center gap-2 mb-5 px-3 py-2 rounded-lg bg-violet-500/10 border border-violet-500/20">
                    <Users className="h-3.5 w-3.5 text-violet-400/70" />
                    <span className="text-[11px] text-violet-300/80">{plan.stat}</span>
                  </div>
                )}

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    className={`w-full h-11 rounded-xl mb-6 text-sm font-medium transition-all duration-500 group ${
                      plan.popular
                        ? 'bg-white text-[#020205] hover:bg-white hover:shadow-[0_0_40px_-5px_rgba(255,255,255,0.4)]'
                        : 'bg-white/[0.03] hover:bg-white/[0.06] text-white/70 border border-white/[0.06] hover:border-white/[0.1]'
                    }`}
                    asChild
                  >
                    <Link href={plan.href} className="gap-2">
                      {plan.cta}
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </Button>
                </motion.div>

                <div className="space-y-3">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${plan.popular ? 'bg-violet-500/12' : 'bg-white/[0.03]'}`}>
                        <Check className={`h-3 w-3 ${plan.popular ? 'text-violet-400/70' : 'text-white/25'}`} />
                      </div>
                      <span className={`text-xs ${plan.popular ? 'text-white/45' : 'text-white/30'}`}>{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Trust signals */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 md:mt-12"
        >
          {/* Primary trust with icons */}
          <div className="flex flex-wrap items-center justify-center gap-8 mb-5">
            {[
              { icon: Shield, text: "14-day free trial" },
              { icon: Check, text: "Cancel anytime" },
              { icon: Check, text: "No hidden fees" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-xs text-white/30">
                <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center">
                  <Icon className="h-3 w-3 text-emerald-400/70" />
                </div>
                <span>{text}</span>
              </div>
            ))}
          </div>
          
          {/* Social proof with depth */}
          <div className="flex items-center justify-center gap-3">
            <div className="flex -space-x-2">
              {['from-violet-500/50', 'from-blue-500/50', 'from-cyan-500/50', 'from-emerald-500/50'].map((bg, i) => (
                <div key={i} className={`w-6 h-6 rounded-full bg-gradient-to-br ${bg} to-transparent border-2 border-[#020205]`} />
              ))}
            </div>
            <span className="text-xs text-white/25">
              <span className="text-white/45 font-medium">2,847 students</span> joined this week
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
