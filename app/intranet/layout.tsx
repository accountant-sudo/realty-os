import type { ReactNode } from 'react'
import { IntranetProvider } from '@/context/IntranetContext'

export const metadata = { title: 'Miami Tango — Realty OS' }

export default function IntranetLayout({ children }: { children: ReactNode }) {
  return <IntranetProvider>{children}</IntranetProvider>
}
