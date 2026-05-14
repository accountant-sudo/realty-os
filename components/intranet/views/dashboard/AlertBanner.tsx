'use client'
import { useRouter } from 'next/navigation'
import type { Alert } from '@/lib/types'

export default function AlertBanner({ alerts }: { alerts: Alert[] }) {
  const router = useRouter()
  if (alerts.length === 0) return null

  return (
    <div className="mb-5">
      <div className="flex items-center gap-2 text-[12px] font-bold text-text-3 uppercase tracking-[0.06em] mb-2">
        <span className="inline-block w-2 h-2 rounded-full bg-red animate-pulse-dot" />
        {alerts.length} alerta{alerts.length === 1 ? '' : 's'} activa{alerts.length === 1 ? '' : 's'}
      </div>
      {alerts.map((a, i) => (
        <div
          key={i}
          className={`flex items-start gap-2 px-3.5 py-3 rounded-[6px] text-[13px] mb-2 cursor-pointer border ${
            a.type === 'danger'
              ? 'bg-red-bg text-red border-[#F0A0A0]'
              : 'bg-amber-bg text-amber border-[#F0D070]'
          }`}
          onClick={() => router.push(`/intranet/operaciones/${a.opId}`)}
        >
          <span className="mr-1">{a.icon}</span>
          <div>
            <strong>{a.address}</strong>
            <span className="mx-1.5 opacity-50">·</span>
            {a.msg}
            <span className="ml-2 text-[11px] opacity-70">→ Ver operación</span>
          </div>
        </div>
      ))}
    </div>
  )
}
