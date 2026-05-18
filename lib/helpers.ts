import type { Agent, Realtor, Operation, Alert, ChkValue } from './types'

export function agentName(id: string, agents: Agent[]): string {
  const a = agents.find(x => x.id === id)
  if (!a) return id || '—'
  return a.lastName ? `${a.name} ${a.lastName}` : a.name
}

export function realtorName(id: string, realtors: Realtor[]): string {
  if (!id || id === 'none') return '—'
  const r = realtors.find(x => x.id === id)
  return r ? r.name : id
}

export function countryFlag(c: string): string {
  return c === 'AR' ? '🇦🇷' : c === 'US' ? '🇺🇸' : '🌐'
}

export function calcProgress(o: Operation): { done: number; total: number; pct: number } {
  const keys: (keyof Operation)[] = ['compSigned', 'escrow', 'lbp', 'sd', 'flood', 'condoDocs', 'condoRider', 'inspDone', 'reinspection']
  const relevant = keys.filter(k => o[k] !== 'na')
  const done = relevant.filter(k => o[k] === true).length
  const pct = relevant.length ? Math.round(done / relevant.length * 100) : 0
  return { done, total: relevant.length, pct }
}

export function getDaysUntil(isoDate: string): number | null {
  if (!isoDate) return null
  const today = new Date(); today.setHours(0, 0, 0, 0)
  const target = new Date(isoDate); target.setHours(0, 0, 0, 0)
  if (isNaN(target.getTime())) return null
  return Math.round((target.getTime() - today.getTime()) / 86400000)
}

export function getNotifications(operations: Operation[]): Alert[] {
  const notifications: Alert[] = []
  operations.filter(o => o.status === 'ACTIVA').forEach(o => {
    if (o.closingDateISO) {
      const days = getDaysUntil(o.closingDateISO)
      if (days !== null && days <= 2) {
        const type = days < 0 ? 'danger' : 'warning'
        const msg = days < 0
          ? `Closing overdue by ${Math.abs(days)} day${Math.abs(days) === 1 ? '' : 's'}`
          : days === 0 ? 'Closing is TODAY'
          : `Closing in ${days} day${days === 1 ? '' : 's'}`
        notifications.push({ type, opId: o.id, address: o.address, msg, icon: '🔔', kind: 'closing' })
      }
    } else {
      notifications.push({ type: 'info', opId: o.id, address: o.address, msg: 'No closing date assigned', icon: '📋', kind: 'missing' })
    }
  })
  return notifications
}

export function statusBadgeClass(s: string): string {
  const map: Record<string, string> = {
    ACTIVA: 'bg-amber-bg text-amber',
    CERRADA: 'bg-green-bg text-green',
    CANCELADA: 'bg-red-bg text-red',
  }
  return map[s] || ''
}

export function mlsStatusClass(s: string): string {
  const map: Record<string, string> = {
    published: 'bg-blue-bg text-blue',
    under_contract: 'bg-amber-bg text-amber',
    withdrawn: 'bg-[#F0F0F0] text-text-3',
  }
  return map[s] || ''
}

export function mlsStatusLabel(s: string, country: string): string {
  const label: Record<string, string> = {
    published: country === 'AR' ? 'On ZonaProp' : 'On MLS',
    under_contract: 'Under contract',
    withdrawn: 'Withdrawn',
  }
  return label[s] || s
}

export function cycleChkValue(val: ChkValue): ChkValue {
  if (val === true) return false
  if (val === false) return 'na'
  return true
}

export function fmtPrice(n: number | undefined): string {
  if (!n) return '—'
  return '$' + Number(n).toLocaleString('en-US')
}
