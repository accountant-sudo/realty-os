'use client'
import type { ReactNode } from 'react'
import { useIntranet } from '@/context/IntranetContext'
import type { NavView } from '@/lib/types'

const VIEW_TITLES: Record<NavView, string> = {
  dashboard: 'Dashboard',
  mls: 'Propiedades / MLS',
  operaciones: 'Operaciones',
  documentos: 'Documentos',
  zillow: 'Análisis de mercado — Zillow 🇺🇸',
  zonaprop: 'Análisis ZonaProp 🇦🇷',
  comisiones: 'Comisiones',
  usuarios: 'Usuarios',
  'op-detail': '',
}

export default function Topbar({ actions }: { actions?: ReactNode }) {
  const { currentView } = useIntranet()
  return (
    <div className="bg-surface border-b border-border px-6 h-[52px] flex items-center justify-between flex-shrink-0">
      <div className="text-[16px] font-semibold text-text-primary">{VIEW_TITLES[currentView] || ''}</div>
      <div className="flex items-center gap-2.5">{actions}</div>
    </div>
  )
}
