"use client"

import { motion } from "framer-motion"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { HelpCircle } from "lucide-react"

const faqs = [
  {
    question: "How does CareerOS work?",
    answer: "CareerOS uses advanced AI to analyze your personality, skills, interests, and academic background. You take a comprehensive 15-minute assessment, and our AI generates personalized career recommendations, college matches, and a detailed roadmap to help you achieve your goals."
  },
  {
    question: "Is CareerOS free to use?",
    answer: "Yes! You can start with our free plan which includes a basic career assessment and up to 3 career recommendations. For unlimited recommendations, detailed college guidance, and personalized roadmaps, you can upgrade to our Pro or Premium plans."
  },
  {
    question: "How accurate are the career recommendations?",
    answer: "Our AI model has been trained on data from thousands of successful career paths and validated by career counselors. Our recommendations have a 98% accuracy rate based on user feedback and career outcome tracking. The more details you provide, the more accurate your results will be."
  },
  {
    question: "Can parents use CareerOS for their children?",
    answer: "Absolutely! Many parents use CareerOS to help guide their children's career decisions. You can create an account for your child or help them through the assessment process. We also provide detailed reports that parents can review together with their children."
  },
  {
    question: "What makes CareerOS different from other career guidance tools?",
    answer: "CareerOS is specifically designed for the Indian education system and job market. We understand the unique challenges of Indian entrance exams, college admissions, and career paths. Our AI is trained on Indian career data and our recommendations consider local factors like JEE, NEET, UPSC, and state-level opportunities."
  },
  {
    question: "How long does the assessment take?",
    answer: "The basic assessment takes about 10-15 minutes to complete. For the most accurate results, we recommend the comprehensive assessment which takes 20-25 minutes. You can save your progress and return later if needed."
  },
  {
    question: "Is my data secure?",
    answer: "Yes, we take data privacy very seriously. All your information is encrypted and stored securely. We never share your personal data with third parties without your consent. You can read our full privacy policy for more details."
  },
  {
    question: "Can I change my career path after getting recommendations?",
    answer: "Of course! CareerOS is designed to be flexible. You can retake the assessment anytime, explore different career paths, and update your preferences. Many users explore multiple options before making their final decision."
  }
]

export function FAQ() {
  return (
    <section id="faq" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0a0a0f]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(120,50,255,0.06),transparent)]" />

      <div className="container-wide relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <HelpCircle className="h-4 w-4 text-violet-400" />
            <span className="text-sm text-white/80">FAQ</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight" style={{ letterSpacing: '-0.02em' }}>
            Frequently asked{" "}
            <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              questions
            </span>
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            Everything you need to know about CareerOS. Can&apos;t find what you&apos;re looking for? Feel free to contact us.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-[#0B1020]/80 backdrop-blur-xl border border-white/[0.08] rounded-2xl px-6 data-[state=open]:border-white/[0.12] data-[state=open]:shadow-2xl transition-all duration-300"
              >
                <AccordionTrigger className="text-left font-semibold text-white hover:no-underline py-5 hover:text-violet-400 transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-white/50 pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
