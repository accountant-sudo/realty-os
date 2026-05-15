const tabBase = 'px-[18px] py-2 text-[13px] font-medium cursor-pointer border-b-2 -mb-[2px] bg-transparent border-l-0 border-r-0 border-t-0 font-[inherit] transition-colors'

interface Props {
  tab: 'activas' | 'cerradas'
  activasCount: number
  cerradasCount: number
  onChange: (tab: 'activas' | 'cerradas') => void
}

export default function OperacionesTabs({ tab, activasCount, cerradasCount, onChange }: Props) {
  return (
    <div className="flex gap-0.5 border-b-2 border-border mb-5">
      <button
        className={`${tabBase} ${tab === 'activas' ? 'text-gold-dark border-b-gold font-semibold' : 'text-text-2 border-transparent'}`}
        onClick={() => onChange('activas')}
      >
        Activas ({activasCount})
      </button>
      <button
        className={`${tabBase} ${tab === 'cerradas' ? 'text-gold-dark border-b-gold font-semibold' : 'text-text-2 border-transparent'}`}
        onClick={() => onChange('cerradas')}
      >
        Cerradas ({cerradasCount})
      </button>
    </div>
  )
}
