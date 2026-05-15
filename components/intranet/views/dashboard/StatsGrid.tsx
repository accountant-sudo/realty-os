interface Props {
  activasCount: number
  cerradasCount: number
  mlsCount: number
}

export default function StatsGrid({ activasCount, cerradasCount, mlsCount }: Props) {
  return (
    <div className="grid grid-cols-3 gap-3.5 mb-6">
      <div className="bg-surface border border-border rounded-[10px] p-[18px]">
        <div className="text-[12px] text-text-2 mb-1.5 font-medium">Operaciones activas</div>
        <div className="text-[28px] font-bold text-gold-dark">{activasCount}</div>
        <div className="text-[11px] text-text-3 mt-0.5">En curso</div>
      </div>
      <div className="bg-surface border border-border rounded-[10px] p-[18px]">
        <div className="text-[12px] text-text-2 mb-1.5 font-medium">Cerradas</div>
        <div className="text-[28px] font-bold text-green">{cerradasCount}</div>
        <div className="text-[11px] text-text-3 mt-0.5">Total histórico</div>
      </div>
      <div className="bg-surface border border-border rounded-[10px] p-[18px]">
        <div className="text-[12px] text-text-2 mb-1.5 font-medium">Propiedades en MLS</div>
        <div className="text-[28px] font-bold">{mlsCount}</div>
        <div className="text-[11px] text-text-3 mt-0.5">Publicadas y bajo contrato</div>
      </div>
    </div>
  )
}
