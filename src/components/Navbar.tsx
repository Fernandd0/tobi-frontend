'use client'

import Image from 'next/image'
import Link from 'next/link'

import { signIn, signOut, useSession } from '@/lib/auth-client'

export default function Navbar() {
  const { data: session, isPending } = useSession()

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
              transition
            "
          >
            <Image src="/ico/home.svg" alt="" width={20} height={20} />
          </Link>

          <div className="flex items-center gap-2 md:gap-3">
            {isPending ? (
              <div className="w-11 h-11 animate-pulse bg-black/30 rounded-full" />
            ) : session?.user ? (
              <div
                className="flex items-center gap-3 px-4 py-1 bg-white/10 rounded-full backdrop-blur-md
"
              >
                {session.user.image ? (
                  <img
                    src={session.user.image}
                    alt="avatar"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                ) : null}
                <span className="text-sm">{session.user.name || session.user.email}</span>
                <button
                  onClick={async () => {
                    await signOut()
                  }}
                  className="rounded-full border px-2 py-2 text-sm cursor-pointer"
                >
                  close
                </button>
              </div>
            ) : (
              <button
                onClick={async () => {
                  await signIn.social({
                    provider: 'spotify',
                    callbackURL: ''
                  })
                }}
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
