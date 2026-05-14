import type { ReactNode } from 'react'
import { AuthProvider } from '@/context/AuthContext'
import { DataProvider } from '@/context/DataContext'
import ShellWrapper from '@/components/intranet/shell/ShellWrapper'
import { Toaster } from '@/components/ui/sonner'

export const metadata = { title: 'Miami Tango — Realty OS' }

export default function IntranetLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <DataProvider>
        <ShellWrapper>{children}</ShellWrapper>
        <Toaster position="bottom-right" />
      </DataProvider>
    </AuthProvider>
  )
}
