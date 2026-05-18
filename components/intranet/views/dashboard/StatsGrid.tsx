interface Props {
  activasCount: number
  cerradasCount: number
  mlsCount: number
}

export default function StatsGrid({ activasCount, cerradasCount, mlsCount }: Props) {
  return (
    <div className="grid grid-cols-3 gap-3.5 mb-6">
      <div className="bg-surface border border-border rounded-[10px] p-[18px]">
        <div className="text-[12px] text-text-2 mb-1.5 font-medium">Active operations</div>
        <div className="text-[28px] font-bold text-gold-dark">{activasCount}</div>
        <div className="text-[11px] text-text-3 mt-0.5">In progress</div>
      </div>
      <div className="bg-surface border border-border rounded-[10px] p-[18px]">
        <div className="text-[12px] text-text-2 mb-1.5 font-medium">Closed</div>
        <div className="text-[28px] font-bold text-green">{cerradasCount}</div>
        <div className="text-[11px] text-text-3 mt-0.5">Historical total</div>
      </div>
      <div className="bg-surface border border-border rounded-[10px] p-[18px]">
        <div className="text-[12px] text-text-2 mb-1.5 font-medium">Properties on MLS</div>
        <div className="text-[28px] font-bold">{mlsCount}</div>
        <div className="text-[11px] text-text-3 mt-0.5">Published and under contract</div>
      </div>
    </div>
  )
}
