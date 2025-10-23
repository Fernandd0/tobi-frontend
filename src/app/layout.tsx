'use client'
import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { SessionProvider } from './providers/SessionProvider'

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  )
}
