'use client'
import { useIntranet } from '@/context/IntranetContext'
import type { NavView } from '@/lib/types'

const NAV_ITEMS: { section: string; items: { view: NavView; icon: string; label: string }[] }[] = [
  { section: 'Principal', items: [
    { view: 'dashboard', icon: '▦', label: 'Dashboard' },
  ]},
  { section: 'Gestión', items: [
    { view: 'mls', icon: '⌂', label: 'Propiedades / MLS' },
    { view: 'operaciones', icon: '≡', label: 'Operaciones' },
    { view: 'documentos', icon: '◻', label: 'Documentos' },
  ]},
  { section: 'Análisis', items: [
    { view: 'zillow', icon: '◈', label: 'Mercado / Zillow' },
    { view: 'zonaprop', icon: '◈', label: 'ZonaProp 🇦🇷' },
    { view: 'comisiones', icon: '$', label: 'Comisiones' },
  ]},
  { section: 'Admin', items: [
    { view: 'usuarios', icon: '☰', label: 'Usuarios' },
  ]},
]

const ROLE_LABEL: Record<string, string> = { admin: 'Admin', manager: 'Manager', agente: 'Agente' }

export default function Sidebar() {
  const { currentUser, currentView, goTo, logout, getAllowedViews } = useIntranet()
  const allowed = getAllowedViews()

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

      <nav>
        {NAV_ITEMS.map(({ section, items }) => {
          const visible = items.filter(i => allowed.includes(i.view))
          if (!visible.length) return null
          return (
            <div className="py-3 pb-1" key={section}>
              <div className="text-[10px] text-[#666] uppercase tracking-[0.08em] px-[18px] pb-1.5 font-medium">
                {section}
              </div>
              {visible.map(({ view, icon, label }) => (
                <div
                  key={view}
                  className={`flex items-center gap-2.5 px-[18px] py-2 cursor-pointer text-[13px] transition-all border-l-2 ${
                    currentView === view
                      ? 'text-gold border-l-gold bg-[#252520]'
                      : 'text-[#AAA] border-transparent hover:text-white hover:bg-[#2A2A28]'
                  }`}
                  onClick={() => goTo(view)}
                >
                  <span className="text-[14px] w-4 text-center">{icon}</span>
                  {label}
                </div>
              ))}
            </div>
          )
        })}
      </nav>

      <div className="mt-auto px-[18px] py-4 border-t border-[#333] text-[12px] text-[#666]">
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
            title="Cerrar sesión"
            className="bg-transparent border-none text-[#666] cursor-pointer text-[16px] p-1 hover:text-[#aaa] transition-colors"
          >⏻</button>
        </div>
      </div>
    </aside>
  )
}
