'use client'
import { useRouter } from 'next/navigation'
import type { Alert } from '@/lib/types'

const STYLES: Record<Alert['type'], { bar: string; dot: string; text: string; sub: string }> = {
  danger:  { bar: 'bg-red-bg border-red-500/30',   dot: 'bg-red',   text: 'text-red',   sub: 'text-red/70'   },
  warning: { bar: 'bg-amber-bg border-amber-500/30', dot: 'bg-amber', text: 'text-amber', sub: 'text-amber/70' },
  info:    { bar: 'bg-blue-bg border-blue-500/20',  dot: 'bg-blue',  text: 'text-blue',  sub: 'text-blue/70'  },
}

export default function DashboardAlerts({ alerts }: { alerts: Alert[] }) {
  const router = useRouter()

  if (!alerts.length) return null

  return (
    <div className="flex flex-col gap-2 mb-5">
      {alerts.map((a, i) => {
        const s = STYLES[a.type]
        return (
          <button
            key={i}
            onClick={() => router.push(`/intranet/operations/${a.opId}`)}
            className={`flex items-center gap-3 px-4 py-3 rounded-[8px] border ${s.bar} text-left w-full transition-opacity hover:opacity-80`}
          >
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              {a.type !== 'info' && (
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${s.dot} opacity-60`} />
              )}
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${s.dot}`} />
            </span>
            <div className="flex-1 min-w-0">
              <span className={`text-[13px] font-semibold ${s.text}`}>{a.msg}</span>
              <span className={`text-[12px] ml-2 ${s.sub} truncate`}>{a.address}</span>
            </div>
            <span className={`text-[11px] ${s.sub} shrink-0`}>View →</span>
          </button>
        )
      })}
    </div>
  )
}
