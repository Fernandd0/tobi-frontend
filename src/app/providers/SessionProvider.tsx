'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type User = { sub: string; name?: string; email?: string; pic?: string | null } | null

type SessionCtx = {
  user: User
  loading: boolean
  refresh: () => Promise<void>
  logout: () => Promise<void>
}

const Ctx = createContext<SessionCtx>({
  user: null,
  loading: true,
  refresh: async () => {},
  logout: async () => {}
})

export function SessionProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null)
  const [loading, setLoading] = useState(true)

  const fetchMe = async () => {
    try {
      const res = await fetch('http://127.0.0.1:4000/auth/spotify/me', {
        credentials: 'include',
        cache: 'no-store'
      })

      if (!res.ok) {
        console.warn('fetchMe failed:', res.status)
        setUser(null)
        return
      }

      const data = await res.json()
      console.log('fetchMe user:', data.user)
      setUser(data.user)
    } catch (err) {
      console.error('fetchMe error:', err)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMe()
  }, [])

  useEffect(() => {
    const id = setInterval(() => {
      fetch('http://127.0.0.1:4000/auth/spotify/refresh', {
        method: 'POST',
        credentials: 'include',
        cache: 'no-store'
      })
        .then(() => fetchMe())
        .catch(() => {})
    }, 12 * 60 * 1000)
    return () => clearInterval(id)
  }, [])

  const refresh = async () => {
    await fetchMe()
  }

  const logout = async () => {
    await fetch('http://127.0.0.1:4000/auth/spotify/logout', {
      method: 'POST',
      credentials: 'include',
      cache: 'no-store'
    })
    setUser(null)
  }

  return <Ctx.Provider value={{ user, loading, refresh, logout }}>{children}</Ctx.Provider>
}

export const useSession = () => useContext(Ctx)
