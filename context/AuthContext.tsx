'use client'
import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'
import { USERS, NAV_ACCESS } from '@/lib/users'
import type { CurrentUser, NavView, Role } from '@/lib/types'

interface AuthContextValue {
  currentUser: CurrentUser | null
  login: (username: string, password: string) => string | null
  logout: () => void
  canEdit: () => boolean
  getAllowedViews: () => NavView[]
}

const AuthContext = createContext<AuthContextValue | null>(null)

const SESSION_KEY = 'mt_user'
const SESSION_COOKIE = 'mt_session'

function setSessionCookie(user: CurrentUser | null) {
  if (user) {
    document.cookie = `${SESSION_COOKIE}=${encodeURIComponent(JSON.stringify({ role: user.role }))}; path=/; SameSite=Lax`
  } else {
    document.cookie = `${SESSION_COOKIE}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(SESSION_KEY)
      if (stored) setCurrentUser(JSON.parse(stored))
    } catch {}
  }, [])

  const login = useCallback((username: string, password: string): string | null => {
    const u = username.trim().toLowerCase()
    const user = USERS[u]
    if (!user || user.pass !== password) return 'Usuario o contraseña incorrectos'
    const cu: CurrentUser = { username: u, role: user.role, name: user.name, initials: user.initials }
    setCurrentUser(cu)
    localStorage.setItem(SESSION_KEY, JSON.stringify(cu))
    setSessionCookie(cu)
    return null
  }, [])

  const logout = useCallback(() => {
    setCurrentUser(null)
    localStorage.removeItem(SESSION_KEY)
    setSessionCookie(null)
  }, [])

  const canEdit = useCallback((): boolean => {
    return currentUser !== null && (currentUser.role === 'admin' || currentUser.role === 'manager')
  }, [currentUser])

  const getAllowedViews = useCallback((): NavView[] => {
    if (!currentUser) return []
    return NAV_ACCESS[currentUser.role] || []
  }, [currentUser])

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, canEdit, getAllowedViews }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
