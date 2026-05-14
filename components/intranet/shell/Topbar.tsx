'use client'
import type { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { VIEW_TITLES } from '@/lib/constants'
import type { NavView } from '@/lib/types'

function getViewFromPath(pathname: string): NavView | null {
  const segment = pathname.replace('/intranet/', '').split('/')[0]
  return segment as NavView || null
}

export default function Topbar({ actions }: { actions?: ReactNode }) {
  const pathname = usePathname()
  const view = getViewFromPath(pathname)
  const title = view ? (VIEW_TITLES[view] || '') : ''

  return (
    <div className="bg-surface border-b border-border px-6 h-[52px] flex items-center justify-between flex-shrink-0">
      <div className="text-[16px] font-semibold text-text-primary">{title}</div>
      <div className="flex items-center gap-2.5">{actions}</div>
    </div>
  )
}
