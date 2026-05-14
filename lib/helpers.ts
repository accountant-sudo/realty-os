import type { Agent, Realtor, Operation, Alert, ChkValue } from './types'

export function agentName(id: string, agents: Agent[]): string {
  const a = agents.find(x => x.id === id)
  return a ? a.name : id || '—'
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

export function getAlerts(operations: Operation[]): Alert[] {
  const alerts: Alert[] = []
  operations.filter(o => o.status === 'ACTIVA').forEach(o => {
    if (o.closingDateISO) {
      const days = getDaysUntil(o.closingDateISO)
      if (days !== null && days <= 2) {
        const type = days < 0 ? 'danger' : 'warning'
        const msg = days < 0
          ? `Closing vencido hace ${Math.abs(days)} día${Math.abs(days) === 1 ? '' : 's'}`
          : days === 0 ? 'Closing es HOY'
          : `Closing en ${days} día${days === 1 ? '' : 's'}`
        alerts.push({ type, opId: o.id, address: o.address, msg, icon: '🔔', kind: 'closing' })
      }
    }
  })
  return alerts
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
    published: country === 'AR' ? 'En ZonaProp' : 'En MLS',
    under_contract: 'Bajo contrato',
    withdrawn: 'Retirada',
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
