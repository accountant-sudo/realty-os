'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogOut } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { NAV_ITEMS } from '@/lib/constants'
import type { NavView } from '@/lib/types'

const VIEW_PATH: Record<NavView, string> = {
  dashboard:   '/intranet/dashboard',
  mls:         '/intranet/mls',
  operations:  '/intranet/operations',
  documents:   '/intranet/documents',
  zillow:      '/intranet/zillow',
  zonaprop:    '/intranet/zonaprop',
  commissions: '/intranet/commissions',
  users:       '/intranet/users',
  permissions: '/intranet/permissions',
  activity:    '/intranet/activity',
  'op-detail': '/intranet/operations',
}

const ROLE_LABEL: Record<string, string> = { super_admin: 'Super Admin', admin: 'Admin', manager: 'Manager', agente: 'Agent' }

export default function Sidebar() {
  const { currentUser, logout, getAllowedViews } = useAuth()
  const pathname = usePathname()
  const allowed = getAllowedViews()

  const sections = ['Main', 'Management', 'Analysis', 'Admin']
  const groupedItems = sections.map(section => ({
    section,
    items: NAV_ITEMS.filter(i => i.section === section && allowed.includes(i.view)),
  })).filter(g => g.items.length > 0)

  return (
    <aside className="w-[220px] bg-sidebar flex flex-col flex-shrink-0">
      <div className="px-[18px] pt-5 pb-4 border-b border-[#333]">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-gold flex-shrink-0" />
          <div>
            <div className="text-[13px] font-semibold text-white leading-tight">Miami Tango</div>
            <div className="text-[10px] text-[#888]">Investments</div>
          </div>
        </div>
      </div>

      <nav className="flex-1">
        {groupedItems.map(({ section, items }) => (
          <div className="py-3 pb-1" key={section}>
            <div className="text-[10px] text-[#666] uppercase tracking-[0.08em] px-[18px] pb-1.5 font-medium">
              {section}
            </div>
            {items.map(({ view, icon: Icon, label }) => {
              const href = VIEW_PATH[view]
              const isActive = pathname.startsWith(href) && href !== '/intranet/operations'
                ? true
                : pathname === href || pathname.startsWith(href + '/')
              return (
                <Link
                  key={view}
                  href={href}
                  className={`flex items-center gap-2.5 px-[18px] py-2 text-[13px] transition-all border-l-2 no-underline ${
                    isActive
                      ? 'text-gold border-l-gold bg-[#252520]'
                      : 'text-[#AAA] border-transparent hover:text-white hover:bg-[#2A2A28]'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  {label}
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      <div className="px-[18px] py-4 border-t border-[#333] text-[12px] text-[#666]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-gold flex items-center justify-center text-[11px] font-semibold text-text-primary flex-shrink-0">
              {currentUser?.initials}
            </div>
            <div>
              <div className="text-[#ccc] text-[12px] font-medium">{currentUser?.name}</div>
              <div className="text-[#666] text-[10px]">{ROLE_LABEL[currentUser?.role ?? ''] || ''}</div>
            </div>
          </div>
          <button
            onClick={logout}
            title="Log out"
            className="bg-transparent border-none text-[#666] cursor-pointer p-1 hover:text-[#aaa] transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  )
}
