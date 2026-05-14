import { Hero } from "@/components/landing/hero"
import { TrustStats } from "@/components/landing/trust-stats"
import { TrustStrip } from "@/components/landing/trust-strip"
import { Features } from "@/components/landing/features"
import { HowItWorks } from "@/components/landing/how-it-works"
import { Testimonials } from "@/components/landing/testimonials"
import { Pricing } from "@/components/landing/pricing"
import { CTA } from "@/components/landing/cta"
import { MainNav } from "@/components/landing/main-nav"
import { Footer } from "@/components/landing/footer"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#020205]">
      <MainNav />
      <main className="flex-1">
        <Hero />
        <TrustStats />
        <TrustStrip />
        <Features />
        <HowItWorks />
        <Testimonials />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
