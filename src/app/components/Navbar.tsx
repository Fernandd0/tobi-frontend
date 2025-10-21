'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function Navbar() {
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
            <Link
              href="/login"
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
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
