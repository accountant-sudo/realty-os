import type { ReactNode } from 'react'

export default function Badge({ cls, children }: { cls?: string; children: ReactNode }) {
  return (
    <span className={`inline-flex items-center text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${cls || ''}`}>
      {children}
    </span>
  )
}
