'use client'
import { useEffect, type ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

export default function AuthGate({ children }: { children: ReactNode }) {
  const { currentUser } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (currentUser === null) {
      router.replace('/intranet/login')
    }
  }, [currentUser, router])

  if (!currentUser) return null

  return <>{children}</>
}
