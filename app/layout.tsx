import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CareerOS - AI Career Guidance',
  description: 'AI-powered career guidance for Indian students',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#020205] text-white antialiased`}>
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  )
}