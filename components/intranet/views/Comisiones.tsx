'use client'
import { useIntranet } from '@/context/IntranetContext'
import { fmtPrice } from '@/lib/helpers'

const AGENT_COLORS: Record<string, string> = {
  diego: '#1A5FA8', gaston: '#2D7A4F', ilan: '#8A3FBF',
  adolfo: '#C07A00', leo: '#C0392B', sabrina: '#2A7A7A',
  aldana: '#BF3F6A', ilay: '#3F7ABF', karina: '#7ABF3F',
  leonel: '#BF7A3F', tomas: '#3FBFBF', gustavo: '#6B3FBF',
}

export default function Comisiones() {
  const { operations, agents } = useIntranet()

  const activasCon = operations.filter(o => o.status === 'ACTIVA' && ((o.compPct ?? 0) > 0 || (o.compFixed ?? 0) > 0))

  const byAgent = agents.map(ag => {
    const ops = activasCon.filter(o => o.agent === ag.id)
    const totalComm = ops.reduce((sum, o) => {
      if ((o.compFixed ?? 0) > 0) return sum + (o.compFixed ?? 0)
      return sum + (o.price * (o.compPct || 0) / 100)
    }, 0)
    return { ...ag, ops, totalComm }
  }).filter(a => a.ops.length > 0)

  const grandTotal = byAgent.reduce((s, a) => s + a.totalComm, 0)

  return (
    <>
      <div className="grid grid-cols-3 gap-3.5 mb-6">
        <div className="bg-surface border border-border rounded-[10px] p-[18px]">
          <div className="text-[12px] text-text-2 mb-1.5 font-medium">Comisiones activas</div>
          <div className="text-[28px] font-bold text-gold-dark">{activasCon.length}</div>
          <div className="text-[11px] text-text-3 mt-0.5">Operaciones con comp.</div>
        </div>
        <div className="bg-surface border border-border rounded-[10px] p-[18px]">
          <div className="text-[12px] text-text-2 mb-1.5 font-medium">Total estimado</div>
          <div className="text-[28px] font-bold text-green">{fmtPrice(grandTotal)}</div>
          <div className="text-[11px] text-text-3 mt-0.5">Suma operaciones activas</div>
        </div>
        <div className="bg-surface border border-border rounded-[10px] p-[18px]">
          <div className="text-[12px] text-text-2 mb-1.5 font-medium">Agentes activos</div>
          <div className="text-[28px] font-bold">{byAgent.length}</div>
          <div className="text-[11px] text-text-3 mt-0.5">Con comisión pendiente</div>
        </div>
      </div>

      {byAgent.map(ag => {
        const bg = AGENT_COLORS[ag.id] || '#888'
        return (
          <div className="bg-surface border border-border rounded-[10px] overflow-hidden mb-5" key={ag.id}>
            <div className="px-[18px] py-3.5 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span
                  className="inline-flex items-center justify-center w-7 h-7 rounded-full text-white text-[11px] font-bold flex-shrink-0"
                  style={{ backgroundColor: bg }}
                >
                  {ag.name.substring(0, 2).toUpperCase()}
                </span>
                <span className="text-[13px] font-semibold text-text-primary">{ag.name}</span>
              </div>
              <span className="font-bold text-gold-dark">{fmtPrice(ag.totalComm)}</span>
            </div>
            <div className="flex flex-wrap gap-3 p-[18px]">
              {ag.ops.map(op => {
                const comm = (op.compFixed ?? 0) > 0 ? (op.compFixed ?? 0) : (op.price * (op.compPct || 0) / 100)
                return (
                  <div key={op.id} className="flex-1 bg-bg border border-border rounded-[6px] px-3.5 py-3 min-w-[160px]">
                    <div className="text-[11px] text-text-3 font-semibold uppercase mb-1">{op.address}</div>
                    <div className="text-[20px] font-bold text-gold-dark">{fmtPrice(comm)}</div>
                    <div className="text-[11px] text-text-3 mt-0.5">
                      {(op.compFixed ?? 0) > 0 ? 'Fijo' : `${op.compPct}% de ${fmtPrice(op.price)}`}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}

      {byAgent.length === 0 && (
        <div className="p-10 text-center text-text-3">
          No hay comisiones activas registradas.
        </div>
      )}
    </>
  )
}
