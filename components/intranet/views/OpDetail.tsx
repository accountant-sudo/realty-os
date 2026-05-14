'use client'
import { useRouter } from 'next/navigation'
import { useData } from '@/context/DataContext'
import { useAuth } from '@/context/AuthContext'
import { calcProgress, fmtPrice, statusBadgeClass } from '@/lib/helpers'
import { INSP_OPTIONS } from '@/lib/constants'
import Chk from '@/components/intranet/ui/Chk'
import ProgressBar from '@/components/intranet/ui/ProgressBar'
import AgentChip from '@/components/intranet/ui/AgentChip'
import Badge from '@/components/intranet/ui/Badge'
import type { Operation, ChkValue } from '@/lib/types'

const BTN_SECONDARY = 'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[6px] text-[13px] font-medium cursor-pointer border transition-all bg-surface text-text-2 border-border hover:bg-bg'

export default function OpDetail({ opId }: { opId: number | null }) {
  const { operations, agents, cycleChk, updateOperation } = useData()
  const { canEdit } = useAuth()
  const router = useRouter()
  const op = operations.find(o => o.id === opId)

  if (!op) return (
    <div className="p-10">
      <button className={BTN_SECONDARY} onClick={() => router.push('/intranet/operaciones')}>← Volver</button>
      <p className="mt-5 text-text-3">Operación no encontrada.</p>
    </div>
  )

  const { done, total, pct } = calcProgress(op)
  const edit = canEdit()

  function chk(key: keyof Operation) {
    return <Chk val={op![key] as ChkValue} onCycle={() => cycleChk(op!.id, key)} />
  }

  const detailRow = 'flex justify-between items-center py-[9px] border-b border-border last:border-b-0 text-[13px]'

  return (
    <div>
      <div className="flex items-center gap-4 mb-5">
        <button className={BTN_SECONDARY} onClick={() => router.push('/intranet/operaciones')}>← Operaciones</button>
        <Badge cls={statusBadgeClass(op.status)}>{op.status}</Badge>
      </div>

      <h2 className="text-[18px] font-bold mb-1">{op.address}</h2>
      <div className="text-[13px] text-text-3 mb-6">
        {op.type} · {op.financing || '—'} · {fmtPrice(op.price)}
      </div>

      <div className="grid grid-cols-[1fr_1.2fr] gap-5">
        <div>
          <div className="bg-surface border border-border rounded-[10px] overflow-hidden mb-5">
            <div className="px-[18px] py-3.5 border-b border-border flex items-center justify-between">
              <span className="text-[13px] font-semibold text-text-primary">Información general</span>
            </div>
            <div className="px-[18px] py-1">
              <div className={detailRow}>
                <span className="text-text-2 font-medium">Agente</span>
                <span className="font-medium text-right">
                  {op.agent ? <AgentChip agentId={op.agent} agents={agents} /> : '—'}
                </span>
              </div>
              <div className={detailRow}>
                <span className="text-text-2 font-medium">Title Co.</span>
                <span className="font-medium text-right">{op.titleCompany || '—'}</span>
              </div>
              <div className={detailRow}>
                <span className="text-text-2 font-medium">Exec. Date</span>
                <span className="font-medium text-right">{op.execDate || '—'}</span>
              </div>
              <div className={detailRow}>
                <span className="text-text-2 font-medium">Closing Date</span>
                <span className={`font-medium text-right ${op.closingNear ? 'text-red' : ''}`}>{op.closingDate || '—'}</span>
              </div>
              <div className={detailRow}>
                <span className="text-text-2 font-medium">Comisión %</span>
                <span className="font-medium text-right">{op.compPct ? `${op.compPct}%` : '—'}</span>
              </div>
              {op.compFixed != null && op.compFixed > 0 && (
                <div className={detailRow}>
                  <span className="text-text-2 font-medium">Comisión fija</span>
                  <span className="font-medium text-right">{fmtPrice(op.compFixed)}</span>
                </div>
              )}
              <div className={detailRow}>
                <span className="text-text-2 font-medium">Comprador</span>
                <span className="font-medium text-right">{op.buyerName || '—'}</span>
              </div>
              {op.isRented && (
                <>
                  <div className={detailRow}>
                    <span className="text-text-2 font-medium">Lease Agreement</span>
                    <span className="font-medium text-right">{op.leaseAgreementSent ? '✓ Enviado' : 'Pendiente'}</span>
                  </div>
                  <div className={detailRow}>
                    <span className="text-text-2 font-medium">Estoppel</span>
                    <span className="font-medium text-right">{op.estoppelSent ? '✓ Enviado' : 'Pendiente'}</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {op.pending && (
            <div className="flex items-start gap-2 px-3.5 py-3 rounded-[6px] text-[13px] mb-5 bg-amber-bg text-amber border border-[#F0D070]">
              <span>⚠️</span>
              <div><strong>Pendiente:</strong> {op.pending}</div>
            </div>
          )}

          <div className="bg-surface border border-border rounded-[10px] overflow-hidden mb-5">
            <div className="px-[18px] py-3.5 border-b border-border flex items-center justify-between">
              <span className="text-[13px] font-semibold text-text-primary">Inspección</span>
            </div>
            <div className="px-[18px] py-1">
              <div className={detailRow}>
                <span className="text-text-2 font-medium">Inspección hecha</span>
                <span className="font-medium text-right">{chk('inspDone')}</span>
              </div>
              <div className={detailRow}>
                <span className="text-text-2 font-medium">Estado</span>
                <span className="font-medium text-right">
                  {edit ? (
                    <select
                      className="text-[12px] px-2.5 py-1 border border-border rounded-[6px] bg-surface text-text-primary cursor-pointer font-[inherit] focus:outline-none focus:border-gold"
                      value={op.inspStatus || ''}
                      onChange={e => updateOperation(op.id, { inspStatus: e.target.value })}
                    >
                      {INSP_OPTIONS.map(o => <option key={o} value={o}>{o || '—'}</option>)}
                    </select>
                  ) : (op.inspStatus || '—')}
                </span>
              </div>
              {op.inspNotes && (
                <div className={detailRow}>
                  <span className="text-text-2 font-medium">Notas</span>
                  <span className="font-medium text-right max-w-[220px]">{op.inspNotes}</span>
                </div>
              )}
              <div className={detailRow}>
                <span className="text-text-2 font-medium">Reinspección</span>
                <span className="font-medium text-right">{chk('reinspection')}</span>
              </div>
              <div className={detailRow}>
                <span className="text-text-2 font-medium">Appraisal</span>
                <span className="font-medium text-right">{op.appraisal || '—'}</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-surface border border-border rounded-[10px] overflow-hidden mb-5">
            <div className="px-[18px] py-3.5 border-b border-border flex items-center justify-between">
              <span className="text-[13px] font-semibold text-text-primary">Checklist</span>
              <span className="text-[12px] text-text-3">{done}/{total} · {pct}%</span>
            </div>
            <div className="px-[18px] py-2">
              <ProgressBar pct={pct} />
            </div>
            <div className="px-[18px] py-1">
              {([
                ['compSigned', 'Comp. Agreement'],
                ['escrow', 'Escrow'],
                ['lbp', 'LBP'],
                ['sd', 'Seller Disclosure'],
                ['flood', 'Flood'],
                ['condoDocs', 'Condo Docs'],
                ['condoRider', 'Condo Rider'],
                ['inspDone', 'Inspección'],
                ['reinspection', 'Reinspección'],
              ] as [keyof Operation, string][]).map(([key, label]) => (
                <div className={detailRow} key={key}>
                  <span className="text-text-2 font-medium">{label}</span>
                  <span className="font-medium text-right">{chk(key)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
