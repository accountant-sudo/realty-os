'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useData } from '@/context/DataContext'
import { useAuth } from '@/context/AuthContext'
import { calcProgress, fmtPrice } from '@/lib/helpers'
import { INSP_OPTIONS, APPRAISAL_OPTIONS, FINANCING_OPTIONS } from '@/lib/constants'
import Chk from '@/components/intranet/ui/Chk'
import ProgressBar from '@/components/intranet/ui/ProgressBar'
import AgentChip from '@/components/intranet/ui/AgentChip'
import DocumentsModal from '@/components/intranet/ui/DocumentsModal'
import { Link2, ExternalLink, Save, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import type { Operation, ChkValue, MlsProperty } from '@/lib/types'

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

function LinkedPropertyCard({
  value, mlsProperties, canEdit, onChange,
}: {
  value: number | null | undefined
  mlsProperties: MlsProperty[]
  canEdit: boolean
  onChange: (id: number | null) => void
}) {
  const router = useRouter()
  const linked = value ? mlsProperties.find(p => p.id === value) : null

  return (
    <div className="flex items-center gap-2">
      <select
        value={value ?? ''}
        onChange={e => onChange(e.target.value === '' ? null : Number(e.target.value))}
        disabled={!canEdit}
        className="flex-1 px-2.5 py-1.5 border border-border rounded-[6px] bg-surface text-text-primary cursor-pointer font-[inherit] focus:outline-none focus:border-gold text-[12px] disabled:cursor-default disabled:opacity-70"
      >
        <option value="">— No property linked —</option>
        {mlsProperties.map(p => (
          <option key={p.id} value={p.id}>
            {p.address}{p.mlsNum ? ` · MLS #${p.mlsNum}` : ''}
          </option>
        ))}
      </select>
      {linked && (
        <button
          onClick={() => router.push(`/intranet/mls/${linked.id}/edit`)}
          title="View listing"
          className="p-1.5 rounded-[6px] text-text-3 hover:text-gold hover:bg-bg border border-border transition-colors shrink-0"
        >
          <ExternalLink size={13} />
        </button>
      )}
    </div>
  )
}

type DraftFields = Pick<Operation,
  'status' | 'buyerName' | 'financing' | 'realtor' |
  'appraisal' | 'inspStatus' | 'inspEstimatedDate' | 'inspNotes' |
  'isRented' | 'leaseAgreementSent' | 'estoppelSent' | 'mlsPropertyId'
>

function pickDraft(op: Operation): DraftFields {
  return {
    status:             op.status,
    buyerName:          op.buyerName,
    financing:          op.financing,
    realtor:            op.realtor,
    appraisal:          op.appraisal,
    inspStatus:         op.inspStatus,
    inspEstimatedDate:  op.inspEstimatedDate,
    inspNotes:          op.inspNotes,
    isRented:           op.isRented,
    leaseAgreementSent: op.leaseAgreementSent,
    estoppelSent:       op.estoppelSent,
    mlsPropertyId:      op.mlsPropertyId ?? null,
  }
}

export default function OpDetail({ opId }: { opId: number | null }) {
  const { operations, agents, realtors, mlsProperties, cycleChk, updateOperation } = useData()
  const { canEdit } = useAuth()
  const router = useRouter()
  const op = operations.find(o => o.id === opId)

  const [draft, setDraft]   = useState<DraftFields | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (op) setDraft(pickDraft(op))
  }, [op?.id]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!op || !draft) return (
    <div className="p-10">
      <button className={BTN_SECONDARY} onClick={() => router.push('/intranet/operations')}>← Back</button>
      <p className="mt-5 text-text-3">Operation not found.</p>
    </div>
  )

  const edit = canEdit()

  const isDirty = JSON.stringify(draft) !== JSON.stringify(pickDraft(op))

  const { done, total, pct } = calcProgress(op)
  const statusColor = STATUS_COLOR[draft.status]

  const inspDays = daysUntil(draft.inspEstimatedDate || '')
  const showInspAlert = inspDays !== null && inspDays <= 2

  function set<K extends keyof DraftFields>(key: K, val: DraftFields[K]) {
    setDraft(d => d ? { ...d, [key]: val } : d)
  }

  async function handleSave() {
    const opId = op!.id
    setSaving(true)
    try {
      await updateOperation(opId, draft!)
      toast.success('Changes saved')
    } catch {
      toast.error('Failed to save changes')
    } finally {
      setSaving(false)
    }
  }

  function chk(key: keyof Operation) {
    return <Chk val={op![key] as ChkValue} onCycle={() => cycleChk(op!.id, key)} readOnly={!edit} />
  }

  const detailRow = 'flex justify-between items-center py-[9px] border-b border-border last:border-b-0 text-[13px] gap-4'
  const detailLabel = 'text-text-2 font-medium shrink-0'

  return (
    <div>
      <div className="sticky top-0 z-10 flex items-center justify-between mb-5 py-3 bg-bg border-b border-border -mx-6 px-6">
        <button className={BTN_SECONDARY} onClick={() => router.push('/intranet/operations')}>← Operations</button>
        {edit && (
          <button
            onClick={handleSave}
            disabled={saving || !isDirty}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-[7px] text-[13px] font-medium bg-gold border border-gold text-white hover:bg-gold-dark disabled:opacity-40 transition-all"
          >
            {saving ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
            {saving ? 'Saving…' : 'Save changes'}
          </button>
        )}
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
                    value={draft.status}
                    onChange={e => set('status', e.target.value as Operation['status'])}
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
                    {draft.status === 'ACTIVA' ? '🟡 Active' : draft.status === 'CERRADA' ? '🟢 Closed' : '🔴 Cancelled'}
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
                    value={draft.buyerName}
                    placeholder="Buyer name…"
                    onChange={e => set('buyerName', e.target.value)}
                  />
                ) : <span className="font-medium text-right">{draft.buyerName || '—'}</span>}
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
                    value={draft.financing || ''}
                    onChange={e => set('financing', e.target.value)}
                  >
                    {FINANCING_OPTIONS.map(f => <option key={f} value={f}>{f || '—'}</option>)}
                  </select>
                ) : <span className="font-medium text-right">{draft.financing || '—'}</span>}
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
                    value={draft.realtor || 'none'}
                    onChange={e => set('realtor', e.target.value)}
                  >
                    {realtors.map(r => (
                      <option key={r.id} value={r.id}>{r.id === 'none' ? 'No realtor' : r.name}</option>
                    ))}
                  </select>
                ) : (
                  <span className="font-medium text-right">
                    {draft.realtor && draft.realtor !== 'none'
                      ? realtors.find(r => r.id === draft.realtor)?.name || draft.realtor
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

          {/* Linked MLS property */}
          <div className="bg-surface border border-border rounded-[10px] overflow-hidden mb-5">
            <div className="px-[18px] py-3.5 border-b border-border flex items-center gap-2">
              <Link2 size={13} className="text-text-3" />
              <span className="text-[13px] font-semibold text-text-primary">Linked property</span>
            </div>
            <div className="px-[18px] py-3">
              <LinkedPropertyCard
                value={draft.mlsPropertyId}
                mlsProperties={mlsProperties}
                canEdit={edit}
                onChange={id => set('mlsPropertyId', id)}
              />
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
                    onClick={() => set('isRented', !draft.isRented)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${draft.isRented ? 'bg-green' : 'bg-border'}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${draft.isRented ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                ) : (
                  <span className={`text-[12px] font-semibold ${draft.isRented ? 'text-green' : 'text-text-3'}`}>
                    {draft.isRented ? 'Yes' : 'No'}
                  </span>
                )}
              </div>

              {draft.isRented && (
                <>
                  <div className={detailRow}>
                    <span className={detailLabel}>Lease Agreement sent</span>
                    {edit ? (
                      <button
                        onClick={() => set('leaseAgreementSent', !draft.leaseAgreementSent)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${draft.leaseAgreementSent ? 'bg-green' : 'bg-border'}`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${draft.leaseAgreementSent ? 'translate-x-6' : 'translate-x-1'}`} />
                      </button>
                    ) : (
                      <span className={`text-[12px] font-semibold ${draft.leaseAgreementSent ? 'text-green' : 'text-text-3'}`}>
                        {draft.leaseAgreementSent ? 'Yes' : 'No'}
                      </span>
                    )}
                  </div>
                  <div className={detailRow}>
                    <span className={detailLabel}>Estoppel Letter sent</span>
                    {edit ? (
                      <button
                        onClick={() => set('estoppelSent', !draft.estoppelSent)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${draft.estoppelSent ? 'bg-green' : 'bg-border'}`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${draft.estoppelSent ? 'translate-x-6' : 'translate-x-1'}`} />
                      </button>
                    ) : (
                      <span className={`text-[12px] font-semibold ${draft.estoppelSent ? 'text-green' : 'text-text-3'}`}>
                        {draft.estoppelSent ? 'Yes' : 'No'}
                      </span>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Documents */}
          <div className="bg-surface border border-border rounded-[10px] overflow-hidden">
            <div className="px-[18px] py-3.5 border-b border-border">
              <span className="text-[13px] font-semibold text-text-primary">Documents</span>
            </div>
            <div className="px-[18px] py-4">
              <DocumentsModal
                operationId={op.id}
                operationAddress={op.address}
                canEdit={edit}
              />
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
                    value={draft.appraisal || ''}
                    onChange={e => set('appraisal', e.target.value)}
                  >
                    {APPRAISAL_OPTIONS.map(o => <option key={o} value={o}>{o || '—'}</option>)}
                  </select>
                ) : <span className="font-medium text-right">{draft.appraisal || '—'}</span>}
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
                    value={draft.inspStatus || ''}
                    onChange={e => set('inspStatus', e.target.value)}
                  >
                    {INSP_OPTIONS.map(o => <option key={o} value={o}>{o || '—'}</option>)}
                  </select>
                ) : <span className="font-medium text-right">{draft.inspStatus || '—'}</span>}
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
                    value={draft.inspEstimatedDate || ''}
                    onChange={e => set('inspEstimatedDate', e.target.value)}
                  />
                ) : <span className="font-medium text-right">{draft.inspEstimatedDate || '—'}</span>}
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
                    value={draft.inspNotes}
                    onChange={e => set('inspNotes', e.target.value)}
                  />
                ) : <p className="text-[13px]">{draft.inspNotes || '—'}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
