import type { ChkValue } from '@/lib/types'

const BASE = 'inline-flex items-center justify-center w-6 h-6 rounded-[5px] text-[12px] font-bold cursor-pointer transition-all select-none hover:opacity-80 hover:scale-110'

export default function Chk({ val, onCycle }: { val: ChkValue; onCycle: () => void }) {
  function handleClick(e: React.MouseEvent) {
    e.stopPropagation()
    onCycle()
  }

  if (val === 'na') return (
    <span
      className={`${BASE} bg-[#F0F0F0] text-text-3 text-[9px] border border-dashed border-border`}
      onClick={handleClick}
      title="No aplica — click para cambiar"
    >N/A</span>
  )
  if (val === true) return (
    <span
      className={`${BASE} bg-green-bg text-green`}
      onClick={handleClick}
      title="Hecho — click para cambiar"
    >✓</span>
  )
  return (
    <span
      className={`${BASE} bg-bg text-text-3 border border-border`}
      onClick={handleClick}
      title="Pendiente — click para cambiar"
    >–</span>
  )
}
