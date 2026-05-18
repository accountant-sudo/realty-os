import type { ChkValue } from '@/lib/types'

const BASE = 'inline-flex items-center justify-center w-6 h-6 rounded-[5px] text-[12px] font-bold select-none transition-all'
const INTERACTIVE = 'cursor-pointer hover:opacity-80 hover:scale-110'
const STATIC = 'cursor-default opacity-70'

export default function Chk({ val, onCycle, readOnly }: { val: ChkValue; onCycle: () => void; readOnly?: boolean }) {
  function handleClick(e: React.MouseEvent) {
    if (readOnly) return
    e.stopPropagation()
    onCycle()
  }

  const cls = `${BASE} ${readOnly ? STATIC : INTERACTIVE}`

  if (val === 'na') return (
    <span
      className={`${cls} bg-[#F0F0F0] text-text-3 text-[9px] border border-dashed border-border`}
      onClick={handleClick}
      title={readOnly ? 'Not applicable' : 'Not applicable — click to change'}
    >N/A</span>
  )
  if (val === true) return (
    <span
      className={`${cls} bg-green-bg text-green`}
      onClick={handleClick}
      title={readOnly ? 'Done' : 'Done — click to change'}
    >✓</span>
  )
  return (
    <span
      className={`${cls} bg-bg text-text-3 border border-border`}
      onClick={handleClick}
      title={readOnly ? 'Pending' : 'Pending — click to change'}
    >–</span>
  )
}
