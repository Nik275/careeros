"use client"

import Link from "next/link"
import { Twitter, Linkedin, Instagram, Heart } from "lucide-react"
import { motion } from "framer-motion"

const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "How it works", href: "#how-it-works" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
  Resources: [
    { label: "Blog", href: "/blog" },
    { label: "Help Center", href: "/help" },
    { label: "Privacy", href: "/privacy" },
  ],
}

const socialLinks = [
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
]

export function Footer() {
  return (
    <footer className="relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />

      <div className="bg-[#020205] pt-10 pb-6">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8 mb-8">
            {/* Brand */}
            <div className="col-span-2">
              <Link href="/" className="inline-flex items-center gap-2 mb-3 group">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center justify-center w-7 h-7 rounded-md bg-gradient-to-br from-violet-500 to-blue-500 text-white font-medium text-[10px] shadow-lg shadow-violet-500/15 group-hover:shadow-violet-500/30 transition-shadow duration-300"
                >
                  C
                </motion.div>
                <span className="text-sm font-medium text-white/95">CareerOS</span>
              </Link>
              <p className="text-xs text-white/20 mb-3 max-w-xs leading-relaxed">
                AI-powered career guidance helping Indian students find clarity and confidence in their future.
              </p>
              <a href="mailto:hello@careeros.in" className="text-xs text-white/25 hover:text-white/50 transition-colors">
                hello@careeros.in
              </a>
            </div>

            {/* Links */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="text-[11px] text-white/40 mb-3 uppercase tracking-[0.15em]">{category}</h4>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-xs text-white/20 hover:text-white/50 transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom */}
          <div className="pt-4 border-t border-white/[0.02]">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-[11px] text-white/15 flex items-center gap-1.5">
                Made with <Heart className="h-3 w-3 text-rose-400/50" /> for Indian students
              </p>

              <div className="flex items-center gap-0.5">
                {socialLinks.map((social) => (
                  <motion.div key={social.label} whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                    <Link
                      href={social.href}
                      className="p-2 text-white/15 hover:text-white/40 transition-colors"
                      aria-label={social.label}
                    >
                      <social.icon className="h-3.5 w-3.5" strokeWidth={1.5} />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
