type Tab = 'ACTIVA' | 'CERRADA' | 'CANCELADA'

interface Props {
  tab: Tab
  activasCount: number
  cerradasCount: number
  canceladasCount: number
  onChange: (tab: Tab) => void
}

export default function OperacionesTabs({ tab, activasCount, cerradasCount, canceladasCount, onChange }: Props) {
  const tabs: { value: Tab; label: string; count: number }[] = [
    { value: 'ACTIVA',    label: 'Active',    count: activasCount    },
    { value: 'CERRADA',   label: 'Closed',    count: cerradasCount   },
    { value: 'CANCELADA', label: 'Cancelled', count: canceladasCount },
  ]

  return (
    <div className="flex gap-2 mb-5">
      {tabs.map(t => (
        <button
          key={t.value}
          onClick={() => onChange(t.value)}
          className={`inline-flex items-center gap-1.5 px-4 py-[7px] rounded-[8px] text-[13px] font-medium border transition-all cursor-pointer ${
            tab === t.value
              ? 'bg-gold text-text-primary border-gold'
              : 'bg-surface text-text-2 border-border hover:bg-bg'
          }`}
        >
          {t.label}
          <span className={`text-[12px] ${tab === t.value ? 'opacity-80' : 'text-text-3'}`}>{t.count}</span>
        </button>
      ))}
    </div>
  )
}
