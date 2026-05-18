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

export const INSP_OPTIONS = ['', 'Pending', 'Done - OK', 'Repairs in progress', 'Done - fixes in progress', 'Reinspection pending', 'Reinspection required', 'N/A']

export const APPRAISAL_OPTIONS = ['', 'Pending', 'OK', 'N/A', 'Awaiting lender OK']

export const FINANCING_OPTIONS = ['', 'Cash', 'Conventional', 'FHA', 'VA Loan', 'Fixed Loan', 'DSCR Loan']

export const VIEW_TITLES: Partial<Record<NavView, string>> = {
  dashboard: 'Dashboard',
  mls: 'Properties / MLS',
  operations: 'Operations',
  documents: 'Documents',
  zillow: 'Market Analysis — Zillow 🇺🇸',
  zonaprop: 'ZonaProp Analysis 🇦🇷',
  commissions: 'Commissions',
  users: 'Users',
  permissions: 'Permissions',
  activity: 'Activity',
  'op-detail': '',
}

export const NAV_ITEMS: { section: string; view: NavView; icon: LucideIcon; label: string }[] = [
  { section: 'Main',       view: 'dashboard',   icon: LayoutDashboard, label: 'Dashboard' },
  { section: 'Management', view: 'mls',         icon: Home,            label: 'Properties / MLS' },
  { section: 'Management', view: 'operations',  icon: ClipboardList,   label: 'Operations' },
  { section: 'Management', view: 'documents',   icon: FileText,        label: 'Documents' },
  { section: 'Analysis',   view: 'zillow',      icon: TrendingUp,      label: 'Market / Zillow' },
  { section: 'Analysis',   view: 'zonaprop',    icon: MapPin,          label: 'ZonaProp 🇦🇷' },
  { section: 'Analysis',   view: 'commissions', icon: DollarSign,      label: 'Commissions' },
  { section: 'Admin',      view: 'users',       icon: Users,           label: 'Users' },
  { section: 'Admin',      view: 'permissions', icon: Shield,          label: 'Permissions' },
  { section: 'Admin',      view: 'activity',    icon: Activity,        label: 'Activity' },
]
