'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
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

  const router = useRouter()
  const handleLogout = async () => {
    await supabase.auth.signOut()
    setSession(null)
    router.refresh()
  }

  const userImage = session?.user.user_metadata?.avatar_url || session?.user.user_metadata?.picture
  const userName = session?.user.user_metadata?.full_name || session?.user.email

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center pt-6 px-4">
      <nav
        className="
          flex items-center gap-2 p-2 rounded-2xl
          bg-white/50 backdrop-blur-md border border-black/5
          shadow-sm
          max-w-[calc(100vw-2rem)] sm:max-w-sm w-full justify-between
        "
        aria-label="Primary"
      >
        <Link
          href="/"
          aria-label="Home"
          className="
            flex items-center gap-3 pl-2 pr-4 h-10 rounded-xl
            hover:bg-black/5 transition-colors
            active:scale-95 duration-200
          "
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-orange/10 text-orange">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 25"
              fill="none"
            >
              <g clipPath="url(#clip0_137_754)">
                <path
                  d="M13.768 1.64665C13.5358 1.41443 13.2602 1.23023 12.9569 1.10455C12.6535 0.978871 12.3284 0.914185 12 0.914185C11.6716 0.914185 11.3465 0.978871 11.0431 1.10455C10.7398 1.23023 10.4642 1.41443 10.232 1.64665L0 11.8797V21.4997C0 22.2953 0.316071 23.0584 0.87868 23.621C1.44129 24.1836 2.20435 24.4997 3 24.4997H21C21.7956 24.4997 22.5587 24.1836 23.1213 23.621C23.6839 23.0584 24 22.2953 24 21.4997V11.8797L13.768 1.64665Z"
                  fill="currentColor"
                />
              </g>
              <defs>
                <clipPath id="clip0_137_754">
                  <rect
                    width="24"
                    height="24"
                    fill="white"
                    style={{ fill: 'white', fillOpacity: 1 }}
                    transform="translate(0 0.5)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
          <span className="font-semibold text-sm tracking-wide text-primary/80">TOBI STATS</span>
        </Link>

        <div className="flex-1" />

        <div className="flex items-center gap-2">
          {loading ? (
            <div className="w-10 h-10 animate-pulse bg-gray-200 rounded-lg" />
          ) : session?.user ? (
            <>
              <div className="relative group pb-4 -mb-4 z-50">
                <button
                  className="
                    hidden sm:flex items-center justify-center h-9 px-4 rounded-xl
                    bg-black/5 text-primary text-sm font-medium
                    group-hover:bg-black/10 transition-all duration-200
                  "
                >
                  Mi Top
                </button>
                <button
                  className="
                    sm:hidden flex items-center justify-center w-9 h-9 rounded-xl
                    bg-black/5 text-primary
                    group-hover:bg-black/10 transition-all active:scale-95 duration-200
                  "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 20v-6M6 20V10M18 20V4" />
                  </svg>
                </button>

                <div className="absolute right-0 sm:left-1/2 sm:-translate-x-1/2 top-9 lg:pt-2 w-48 hidden group-hover:block hover:block">
                  <div className="bg-white rounded-xl shadow-xl border border-black/5 p-1 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                    <Link
                      href="/artists"
                      className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-primary hover:bg-gray-50 rounded-lg font-medium transition-colors"
                    >
                      <div className="p-1.5 rounded-md bg-orange/10 text-orange">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                      </div>
                      Top Artists
                    </Link>
                    <Link
                      href="/tracks"
                      className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-primary hover:bg-gray-50 rounded-lg font-medium transition-colors"
                    >
                      <div className="p-1.5 rounded-md bg-green-500/10 text-green-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M9 18V5l12-2v13" />
                          <circle cx="6" cy="18" r="3" />
                          <circle cx="18" cy="16" r="3" />
                        </svg>
                      </div>
                      Top Tracks
                    </Link>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="relative group pb-4 -mb-4 z-50">
                  <button className="relative outline-none">
                    {userImage ? (
                      <Image
                        src={userImage}
                        alt="avatar"
                        width={36}
                        height={36}
                        className="rounded-full ring-2 ring-white shadow-sm hover:ring-orange/50 transition-all duration-300"
                        unoptimized
                      />
                    ) : (
                      <div className="w-9 h-9 bg-zinc-300 rounded-full" />
                    )}
                  </button>

                  <div className="absolute right-0 top-9 lg:pt-2 w-40 hidden group-hover:block hover:block">
                    <div className="bg-white rounded-xl shadow-xl border border-black/5 p-1 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-red-500 hover:bg-red-50 rounded-lg font-medium transition-colors text-left"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                          <polyline points="16 17 21 12 16 7" />
                          <line x1="21" x2="9" y1="12" y2="12" />
                        </svg>
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <button
              onClick={handleLogin}
              className="
                group relative
                inline-flex items-center gap-2
                rounded-xl pl-3 pr-4 py-2
                bg-black text-white
                hover:opacity-90
                transition-all duration-300 active:scale-95
              "
            >
              <Image
                src="/ico/spotify.svg"
                alt="Spotify Logo"
                width={16}
                height={16}
                className="brightness-0 invert opacity-90"
              />
              <span className="text-sm font-medium tracking-wide">Login</span>
            </button>
          )}
        </div>
      </nav>
    </header>
  )
}
