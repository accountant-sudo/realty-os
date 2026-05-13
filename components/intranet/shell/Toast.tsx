'use client'
import { useIntranet } from '@/context/IntranetContext'

export default function Toast() {
  const { toast } = useIntranet()
  if (!toast) return null
  return (
    <div className="fixed bottom-6 right-6 bg-sidebar text-white px-[18px] py-2.5 rounded-[8px] text-[13px] z-[999] shadow-[0_4px_16px_rgba(0,0,0,0.2)]">
      {toast}
    </div>
  )
}
