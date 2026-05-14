import { LayoutDashboard, Home, ClipboardList, FileText, TrendingUp, MapPin, DollarSign, Users, Shield, Activity } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { NavView } from './types'

export type { LucideIcon }

export const AGENT_COLORS: Record<string, string> = {
  diego: '#1A5FA8', gaston: '#2D7A4F', ilan: '#8A3FBF',
  adolfo: '#C07A00', leo: '#C0392B', sabrina: '#2A7A7A',
  aldana: '#BF3F6A', ilay: '#3F7ABF', karina: '#7ABF3F',
  leonel: '#BF7A3F', tomas: '#3FBFBF', gustavo: '#6B3FBF',
}

export const INSP_OPTIONS = ['', 'OK', 'Reparaciones en curso', 'Pendiente', 'Reinspección requerida']

export const VIEW_TITLES: Partial<Record<NavView, string>> = {
  dashboard: 'Dashboard',
  mls: 'Propiedades / MLS',
  operaciones: 'Operaciones',
  documentos: 'Documentos',
  zillow: 'Análisis de mercado — Zillow 🇺🇸',
  zonaprop: 'Análisis ZonaProp 🇦🇷',
  comisiones: 'Comisiones',
  usuarios: 'Usuarios',
  permisos: 'Permisos',
  actividad: 'Actividad',
  'op-detail': '',
}

export const NAV_ITEMS: { section: string; view: NavView; icon: LucideIcon; label: string }[] = [
  { section: 'Principal', view: 'dashboard',   icon: LayoutDashboard, label: 'Dashboard' },
  { section: 'Gestión',   view: 'mls',         icon: Home,            label: 'Propiedades / MLS' },
  { section: 'Gestión',   view: 'operaciones', icon: ClipboardList,   label: 'Operaciones' },
  { section: 'Gestión',   view: 'documentos',  icon: FileText,        label: 'Documentos' },
  { section: 'Análisis',  view: 'zillow',      icon: TrendingUp,      label: 'Mercado / Zillow' },
  { section: 'Análisis',  view: 'zonaprop',    icon: MapPin,          label: 'ZonaProp 🇦🇷' },
  { section: 'Análisis',  view: 'comisiones',  icon: DollarSign,      label: 'Comisiones' },
  { section: 'Admin',     view: 'usuarios',    icon: Users,           label: 'Usuarios' },
  { section: 'Admin',     view: 'permisos',    icon: Shield,          label: 'Permisos' },
  { section: 'Admin',     view: 'actividad',   icon: Activity,        label: 'Actividad' },
]
