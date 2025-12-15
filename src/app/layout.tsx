'use client'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FloatingFigures from '@/components/FloatingFigures'
import { Analytics } from '@vercel/analytics/next'

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <Navbar />
        <FloatingFigures />
        <div className="mx-auto px-4 md:px-0 max-w-xl w-full relative">
          <main>{children}</main>
        </div>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
