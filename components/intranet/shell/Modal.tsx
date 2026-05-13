'use client'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useIntranet } from '@/context/IntranetContext'

export default function Modal() {
  const { modalState, closeModal } = useIntranet()
  const { open, title, body } = modalState

  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') closeModal() }
    if (open) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, closeModal])

  if (!open || typeof window === 'undefined') return null

  return createPortal(
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-[100]"
      onClick={closeModal}
    >
      <div
        className="bg-surface rounded-[10px] w-[680px] max-w-[95vw] max-h-[90vh] overflow-y-auto shadow-[0_20px_60px_rgba(0,0,0,0.2)]"
        onClick={e => e.stopPropagation()}
      >
        <div className="px-5 py-[18px] border-b border-border flex items-center justify-between sticky top-0 bg-surface z-10">
          <span className="text-[15px] font-bold">{title}</span>
          <button
            className="text-[20px] text-text-3 cursor-pointer bg-transparent border-none leading-none px-1.5 py-0.5 hover:text-text-primary transition-colors"
            onClick={closeModal}
          >×</button>
        </div>
        <div>{body}</div>
      </div>
    </div>,
    document.body
  )
}
