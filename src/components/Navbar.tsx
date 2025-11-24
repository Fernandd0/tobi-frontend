'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Session } from '@supabase/supabase-js'

export default function Navbar() {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const getInitialSession = async () => {
      const { data } = await supabase.auth.getSession()
      setSession(data.session)
      setLoading(false)
    }

    getInitialSession()

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'spotify',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
        scopes: 'user-top-read user-read-private user-read-email'
      }
    })
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setSession(null)
    window.location.href = '/'
  }

  const userImage = session?.user.user_metadata?.avatar_url || session?.user.user_metadata?.picture
  const userName = session?.user.user_metadata?.full_name || session?.user.email

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        className="
          mx-auto mt-6 max-w-screen-sm px-4
          flex items-center justify-between
        "
        aria-label="Primary"
      >
        <div
          className="
            flex w-full items-center justify-between gap-6
            rounded-full
          "
        >
          <Link
            href="/"
            aria-label="Home"
            className="
            backdrop-blur-md inline-flex p-4 shrink-0 items-center justify-center rounded-full 
            bg-primary text-white
              transition hover:scale-105
            "
          >
            <Image src="/ico/home.svg" alt="" width={20} height={20} />
          </Link>

          <div className="flex items-center gap-2 md:gap-3">
            {loading ? (
              <div className="w-11 h-11 animate-pulse bg-primary rounded-full" />
            ) : session?.user ? (
              <>
                <Link
                  href="/tracks"
                  className="
                    flex items-center justify-center w-11 h-11 rounded-full
                    bg-primary text-white border border-white/10
                    hover:bg-primary/90 transition hover:scale-105
                    backdrop-blur-md
                  "
                  title="My Top Tracks"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 20v-6M6 20V10M18 20V4" />
                  </svg>
                </Link>

                <div className="flex items-center gap-3 px-4 py-2.5 bg-primary rounded-full backdrop-blur-md border border-white/10">
                  {userImage ? (
                    <Image
                      src={userImage}
                      alt="avatar"
                      width={32}
                      height={32}
                      className="rounded-full"
                      unoptimized
                    />
                  ) : (
                    <div className="w-8 h-8 bg-zinc-700 rounded-full" />
                  )}

                  <span className="text-sm text-white font-medium hidden sm:block">
                    {userName?.split(' ')[0]}
                  </span>

                  <button
                    onClick={handleLogout}
                    className="rounded-full border border-white/10 w-8 h-8 text-xs hover:bg-white/10 text-white transition flex items-center justify-center"
                    title="Sign Out"
                  >
                    ✕
                  </button>
                </div>
              </>
            ) : (
              <button
                onClick={handleLogin}
                className="
                inline-flex items-center gap-3
                rounded-full px-5 py-3
                bg-primary text-white
                border border-white/10
                backdrop-blur-lg
                shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]
                hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)]
                hover:bg-primary/80
                transition-all duration-300
                "
              >
                <Image
                  src="/ico/spotify.svg"
                  alt="Spotify Logo"
                  width={24}
                  height={24}
                  className="opacity-90"
                />
                <span className="text-sm md:text-base font-medium tracking-tight">
                  Login with Spotify
                </span>
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}
