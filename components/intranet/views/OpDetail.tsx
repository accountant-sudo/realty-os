'use client'
import { useRouter } from 'next/navigation'
import { useData } from '@/context/DataContext'
import { useAuth } from '@/context/AuthContext'
import { calcProgress, fmtPrice } from '@/lib/helpers'
import { INSP_OPTIONS, APPRAISAL_OPTIONS, FINANCING_OPTIONS } from '@/lib/constants'
import Chk from '@/components/intranet/ui/Chk'
import ProgressBar from '@/components/intranet/ui/ProgressBar'
import AgentChip from '@/components/intranet/ui/AgentChip'
import type { Operation, ChkValue } from '@/lib/types'

const INPUT = 'w-full px-2.5 py-1 border border-border rounded-[6px] text-[12px] bg-surface text-text-primary focus:outline-none focus:border-gold font-[inherit]'
const SELECT = 'px-2.5 py-1 border border-border rounded-[6px] bg-surface text-text-primary cursor-pointer font-[inherit] focus:outline-none focus:border-gold text-[12px]'
const BTN_SECONDARY = 'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[6px] text-[13px] font-medium cursor-pointer border transition-all bg-surface text-text-2 border-border hover:bg-bg'

const STATUS_COLOR: Record<Operation['status'], string> = {
  ACTIVA:    'var(--color-amber)',
  CERRADA:   'var(--color-green)',
  CANCELADA: 'var(--color-red)',
}

function daysUntil(dateStr: string): number | null {
  if (!dateStr) return null
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return null
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  d.setHours(0, 0, 0, 0)
  return Math.round((d.getTime() - today.getTime()) / 86400000)
}

export default function OpDetail({ opId }: { opId: number | null }) {
  const { operations, agents, realtors, cycleChk, updateOperation } = useData()
  const { canEdit } = useAuth()
  const router = useRouter()
  const op = operations.find(o => o.id === opId)

  if (!op) return (
    <div className="p-10">
      <button className={BTN_SECONDARY} onClick={() => router.push('/intranet/operations')}>← Back</button>
      <p className="mt-5 text-text-3">Operation not found.</p>
    </div>
  )

  const { done, total, pct } = calcProgress(op)
  const edit = canEdit()
  const statusColor = STATUS_COLOR[op.status]

  const inspDays = daysUntil(op.inspEstimatedDate || '')
  const showInspAlert = inspDays !== null && inspDays <= 2

  function chk(key: keyof Operation) {
    return <Chk val={op![key] as ChkValue} onCycle={() => cycleChk(op!.id, key)} readOnly={!edit} />
  }

  function boolChk(key: keyof Operation) {
    const val = op![key] as boolean
    return <Chk val={val} onCycle={() => updateOperation(op!.id, { [key]: !val } as Partial<Operation>)} readOnly={!edit} />
  }

  const detailRow = 'flex justify-between items-center py-[9px] border-b border-border last:border-b-0 text-[13px] gap-4'
  const detailLabel = 'text-text-2 font-medium shrink-0'

  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <button className={BTN_SECONDARY} onClick={() => router.push('/intranet/operations')}>← Operations</button>
      </div>

      <h2 className="text-[18px] font-bold mb-6">{op.address}</h2>

      <div className="grid grid-cols-[1fr_1.2fr] gap-5">
        {/* ── Left column ── */}
        <div>
          {/* General info */}
          <div className="bg-surface border border-border rounded-[10px] overflow-hidden mb-5">
            <div className="px-[18px] py-3.5 border-b border-border flex items-center justify-between">
              <span className="text-[13px] font-semibold text-text-primary">General information</span>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-text-3">Status:</span>
                {edit ? (
                  <select
                    className="text-[12px] font-semibold px-[10px] py-[4px] rounded-[20px] bg-surface cursor-pointer focus:outline-none"
                    style={{ border: `1.5px solid ${statusColor}`, color: statusColor }}
                    value={op.status}
                    onChange={e => updateOperation(op.id, { status: e.target.value as Operation['status'] })}
                  >
                    <option value="ACTIVA">🟡 Active</option>
                    <option value="CERRADA">🟢 Closed</option>
                    <option value="CANCELADA">🔴 Cancelled</option>
                  </select>
                ) : (
                  <span
                    className="text-[12px] font-semibold px-[10px] py-[4px] rounded-[20px]"
                    style={{ border: `1.5px solid ${statusColor}`, color: statusColor }}
                  >
                    {op.status === 'ACTIVA' ? '🟡 Active' : op.status === 'CERRADA' ? '🟢 Closed' : '🔴 Cancelled'}
                  </span>
                )}
              </div>
            </div>
            <div className="px-[18px] py-1">
              <div className={detailRow}>
                <span className={detailLabel}>Buyer</span>
                {edit ? (
                  <input
                    className={`${INPUT} max-w-[200px]`}
                    defaultValue={op.buyerName}
                    placeholder="Buyer name…"
                    onBlur={e => { if (e.target.value !== op.buyerName) updateOperation(op.id, { buyerName: e.target.value }) }}
                  />
                ) : <span className="font-medium text-right">{op.buyerName || '—'}</span>}
              </div>

              <div className={detailRow}>
                <span className={detailLabel}>Type</span>
                <span className="font-medium text-right">{op.type || '—'}</span>
              </div>

              <div className={detailRow}>
                <span className={detailLabel}>Price</span>
                <span className="font-medium text-right">{fmtPrice(op.price)}</span>
              </div>

              <div className={detailRow}>
                <span className={detailLabel}>Financing</span>
                {edit ? (
                  <select
                    className={SELECT}
                    value={op.financing || ''}
                    onChange={e => updateOperation(op.id, { financing: e.target.value })}
                  >
                    {FINANCING_OPTIONS.map(f => <option key={f} value={f}>{f || '—'}</option>)}
                  </select>
                ) : <span className="font-medium text-right">{op.financing || '—'}</span>}
              </div>

              <div className={detailRow}>
                <span className={detailLabel}>Agent</span>
                <span className="font-medium text-right">
                  {op.agent ? <AgentChip agentId={op.agent} agents={agents} /> : '—'}
                </span>
              </div>

              <div className={detailRow}>
                <span className={detailLabel}>Realtor</span>
                {edit ? (
                  <select
                    className={SELECT}
                    value={op.realtor || 'none'}
                    onChange={e => updateOperation(op.id, { realtor: e.target.value })}
                  >
                    {realtors.map(r => (
                      <option key={r.id} value={r.id}>{r.id === 'none' ? 'No realtor' : r.name}</option>
                    ))}
                  </select>
                ) : (
                  <span className="font-medium text-right">
                    {op.realtor && op.realtor !== 'none'
                      ? realtors.find(r => r.id === op.realtor)?.name || op.realtor
                      : '—'}
                  </span>
                )}
              </div>

              <div className={detailRow}>
                <span className={detailLabel}>Title Co.</span>
                <span className="font-medium text-right">{op.titleCompany || '—'}</span>
              </div>

              <div className={detailRow}>
                <span className={detailLabel}>Compensation</span>
                <span className="font-medium text-right">
                  {op.compPct ? `${op.compPct}%` : '—'}
                  {op.compFixed != null && op.compFixed > 0 && ` + ${fmtPrice(op.compFixed)}`}
                </span>
              </div>

              <div className={detailRow}>
                <span className={detailLabel}>Exec. Date</span>
                <span className="font-medium text-right">{op.execDate || '—'}</span>
              </div>

              <div className={detailRow}>
                <span className={detailLabel}>Closing Date</span>
                <span className={`font-medium text-right ${op.closingNear ? 'text-red' : ''}`}>
                  {op.closingDate || '—'}
                </span>
              </div>
            </div>
          </div>

          {/* Rented property */}
          <div className="bg-surface border border-border rounded-[10px] overflow-hidden mb-5">
            <div className="px-[18px] py-3.5 border-b border-border">
              <span className="text-[13px] font-semibold text-text-primary">Rented property</span>
            </div>
            <div className="px-[18px] py-1">
              <div className={detailRow}>
                <span className={detailLabel}>Is it rented?</span>
                {edit ? (
                  <button
                    onClick={() => updateOperation(op.id, { isRented: !op.isRented })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${op.isRented ? 'bg-green' : 'bg-border'}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${op.isRented ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                ) : (
                  <span className={`text-[12px] font-semibold ${op.isRented ? 'text-green' : 'text-text-3'}`}>
                    {op.isRented ? 'Yes' : 'No'}
                  </span>
                )}
              </div>

              {op.isRented && (
                <>
                  <div className={detailRow}>
                    <span className={detailLabel}>Lease Agreement sent</span>
                    <span className="font-medium text-right">{boolChk('leaseAgreementSent')}</span>
                  </div>
                  <div className={detailRow}>
                    <span className={detailLabel}>Estoppel Letter sent</span>
                    <span className="font-medium text-right">{boolChk('estoppelSent')}</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Documents */}
          <div className="bg-surface border border-border rounded-[10px] overflow-hidden">
            <div className="px-[18px] py-3.5 border-b border-border flex items-center justify-between">
              <span className="text-[13px] font-semibold text-text-primary">Documents</span>
              {edit && (
                <label className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[6px] text-[11px] font-medium cursor-pointer border transition-all bg-surface text-text-2 border-border hover:bg-bg">
                  + Upload PDF
                  <input type="file" accept=".pdf,image/*" multiple className="hidden" />
                </label>
              )}
            </div>
            <div className="px-[18px] py-4">
              <p className="text-[12px] text-text-3">No documents uploaded</p>
            </div>
          </div>
        </div>

        {/* ── Right column ── */}
        <div>
          {/* Checklist */}
          <div className="bg-surface border border-border rounded-[10px] overflow-hidden mb-5">
            <div className="px-[18px] py-3.5 border-b border-border flex items-center justify-between">
              <span className="text-[13px] font-semibold text-text-primary">Checklist</span>
              <span className="text-[12px] text-text-3">{done}/{total} completed</span>
            </div>
            <div className="px-[18px] pt-3 pb-1">
              <ProgressBar pct={pct} />
              <div className="flex justify-between mt-1 mb-2">
                <span className="text-[11px] text-text-3">{pct}% complete</span>
                <span className="text-[10px] text-text-3">Click each item to change · ✓ Done · – Pending · N/A Not applicable</span>
              </div>
            </div>
            <div className="px-[18px] py-1">
              {([
                ['compSigned', 'Comp. Agreement'],
                ['escrow', 'Escrow'],
                ['lbp', 'LBP'],
                ['sd', 'Seller Disclosure'],
                ['flood', 'Flood Disc.'],
                ['condoDocs', 'Condo Docs'],
                ['condoRider', 'Condo Rider'],
                ['inspDone', 'Inspection'],
                ['reinspection', 'Reinspection'],
              ] as [keyof Operation, string][]).map(([key, label]) => (
                <div className={detailRow} key={key}>
                  <span className={detailLabel}>{label}</span>
                  <span className="font-medium text-right">{chk(key)}</span>
                </div>
              ))}
              <div className={detailRow}>
                <span className={detailLabel}>Appraisal</span>
                {edit ? (
                  <select
                    className={SELECT}
                    value={op.appraisal || ''}
                    onChange={e => updateOperation(op.id, { appraisal: e.target.value })}
                  >
                    {APPRAISAL_OPTIONS.map(o => <option key={o} value={o}>{o || '—'}</option>)}
                  </select>
                ) : <span className="font-medium text-right">{op.appraisal || '—'}</span>}
              </div>
            </div>
          </div>

          {/* Inspection */}
          <div className="bg-surface border border-border rounded-[10px] overflow-hidden">
            <div className="px-[18px] py-3.5 border-b border-border">
              <span className="text-[13px] font-semibold text-text-primary">Inspection</span>
            </div>
            <div className="px-[18px] py-2">
              <div className={detailRow}>
                <span className={detailLabel}>Status</span>
                {edit ? (
                  <select
                    className={SELECT}
                    value={op.inspStatus || ''}
                    onChange={e => updateOperation(op.id, { inspStatus: e.target.value })}
                  >
                    {INSP_OPTIONS.map(o => <option key={o} value={o}>{o || '—'}</option>)}
                  </select>
                ) : <span className="font-medium text-right">{op.inspStatus || '—'}</span>}
              </div>

              <div className={`${detailRow} items-start`}>
                <span className={`${detailLabel} pt-1`}>
                  <span className="flex items-center gap-1">
                    🔍 Est. date
                    <span className="text-[10px] text-text-3 font-normal">(alert 2d before)</span>
                  </span>
                </span>
                {edit ? (
                  <input
                    type="date"
                    className={`${INPUT} w-auto`}
                    value={op.inspEstimatedDate || ''}
                    onChange={e => updateOperation(op.id, { inspEstimatedDate: e.target.value })}
                  />
                ) : <span className="font-medium text-right">{op.inspEstimatedDate || '—'}</span>}
              </div>

              {showInspAlert && (
                <div className={`flex items-center gap-2 px-3 py-2 rounded-[6px] text-[12px] my-2 ${inspDays! < 0 ? 'bg-red-bg text-red border border-red/30' : 'bg-amber-bg text-amber border border-amber/30'}`}>
                  {inspDays! < 0
                    ? `⚠ Inspection overdue by ${Math.abs(inspDays!)} day${Math.abs(inspDays!) === 1 ? '' : 's'}`
                    : inspDays === 0
                    ? '🔍 Inspection estimated TODAY'
                    : `🔍 Inspection in ${inspDays} day${inspDays === 1 ? '' : 's'}`}
                </div>
              )}

              <div className="pt-2 pb-2">
                <p className="text-[11px] font-semibold text-text-3 uppercase tracking-wider mb-1.5">Comments</p>
                {edit ? (
                  <textarea
                    className={`${INPUT} resize-none w-full`}
                    rows={3}
                    defaultValue={op.inspNotes}
                    onBlur={e => { if (e.target.value !== op.inspNotes) updateOperation(op.id, { inspNotes: e.target.value }) }}
                  />
                ) : <p className="text-[13px]">{op.inspNotes || '—'}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
