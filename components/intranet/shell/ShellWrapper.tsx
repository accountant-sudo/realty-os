'use client'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'
import AuthGate from '@/components/intranet/auth/AuthGate'
import Sidebar from '@/components/intranet/shell/Sidebar'
import Topbar from '@/components/intranet/shell/Topbar'

export default function ShellWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  if (pathname === '/intranet/login') {
    return <>{children}</>
  }

  return (
    <AuthGate>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Topbar />
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </div>
      </div>
    </AuthGate>
  )
}
