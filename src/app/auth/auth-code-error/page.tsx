'use client'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const description = searchParams.get('error_description')

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-surface)] border border-[var(--color-border)]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--color-text)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-80"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </div>

      <h1 className="text-2xl font-semibold tracking-tight text-[var(--color-text)] mb-2">
        Authentication Error
      </h1>

      <p className="text-[var(--color-subtext)] max-w-sm mx-auto leading-relaxed mb-6">
        {description || "We couldn't verify your identity. Please try connecting again."}
      </p>

      {error && (
        <div className="mb-8 px-3 py-1.5 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] inline-block">
          <code className="text-xs font-mono text-[var(--color-subtext)]">
            CODE: {error.toUpperCase()}
          </code>
        </div>
      )}

      <Link
        href="/"
        className="
          px-8 py-3 rounded-full 
          bg-[var(--color-primary)] text-white 
          text-sm font-medium 
          transition-transform hover:scale-105 active:scale-95
          shadow-sm hover:shadow-md
        "
      >
        Back to Home
      </Link>
    </div>
  )
}
