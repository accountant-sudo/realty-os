'use client'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Bell, BellRing } from 'lucide-react'
import { useData } from '@/context/DataContext'
import { getNotifications } from '@/lib/helpers'
import type { Alert } from '@/lib/types'

function typeOrder(t: Alert['type']): number {
  return t === 'danger' ? 0 : t === 'warning' ? 1 : 2
}

export default function NotificationBell() {
  const { operations } = useData()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const notifications = getNotifications(operations).sort((a, b) => typeOrder(a.type) - typeOrder(b.type))
  const count = notifications.length

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function itemBg(type: Alert['type']) {
    if (type === 'danger') return 'bg-red-bg border-[#F0A0A0]'
    if (type === 'warning') return 'bg-amber-bg border-[#F0D070]'
    return 'bg-[#F5F5F0] border-border'
  }

  function itemText(type: Alert['type']) {
    if (type === 'danger') return 'text-red'
    if (type === 'warning') return 'text-amber'
    return 'text-text-2'
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(o => !o)}
        className="relative flex items-center justify-center w-8 h-8 rounded-md hover:bg-[#F5F3EE] transition-colors"
        aria-label="Notificaciones"
      >
        {count > 0
          ? <BellRing size={18} className="text-text-2" />
          : <Bell size={18} className="text-text-3" />
        }
        {count > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[16px] h-[16px] px-[3px] rounded-full bg-red text-white text-[10px] font-semibold flex items-center justify-center leading-none">
            {count > 99 ? '99+' : count}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-[calc(100%+8px)] w-[320px] bg-surface border border-border rounded-lg shadow-lg z-50 overflow-hidden">
          <div className="px-4 py-3 border-b border-border flex items-center justify-between">
            <span className="text-[13px] font-semibold text-text-primary">
              Notificaciones {count > 0 && <span className="text-text-3 font-normal">({count})</span>}
            </span>
          </div>

          {notifications.length === 0 ? (
            <div className="px-4 py-6 text-center text-[13px] text-text-3">
              Sin notificaciones activas
            </div>
          ) : (
            <ul className="max-h-[360px] overflow-y-auto divide-y divide-border">
              {notifications.map((n, i) => (
                <li key={i}>
                  <button
                    onClick={() => { router.push(`/intranet/operaciones/${n.opId}`); setOpen(false) }}
                    className={`w-full text-left px-4 py-3 border-l-2 hover:opacity-80 transition-opacity ${itemBg(n.type)}`}
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-[15px] mt-px">{n.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] font-semibold text-text-primary truncate">{n.address}</p>
                        <p className={`text-[12px] mt-0.5 ${itemText(n.type)}`}>{n.msg}</p>
                        <p className="text-[11px] text-text-3 mt-1">Ver operación →</p>
                      </div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
