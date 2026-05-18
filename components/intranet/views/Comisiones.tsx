'use client'
import { useState, useCallback, useEffect, useRef, useMemo } from 'react'
import { toast } from 'sonner'
import { useReactTable, getCoreRowModel, createColumnHelper, flexRender } from '@tanstack/react-table'
import { useData } from '@/context/DataContext'
import { agentName, realtorName } from '@/lib/helpers'
import type { Operation, Agent, Realtor } from '@/lib/types'

const DEFAULT_SPLITS = { agente: 50, realtor: 20, broker: 30, agenteSin: 70, brokerSin: 30 }

type RowPct = Record<number, { A?: number; R?: number; B?: number }>

function calcCom(op: Operation, rowPct: RowPct) {
  const rp = rowPct[op.id] || {}
  const hasR = op.realtor && op.realtor !== 'none'
  const total = (op.compFixed && op.compFixed > 0)
    ? op.compFixed
    : op.price > 0 ? op.price * ((op.compPct || 0) / 100) : 0
  // rowPct override > persisted op field > default
  const pA = rp.A !== undefined ? rp.A
    : op.agentSplitPct >= 0 ? op.agentSplitPct
    : (hasR ? DEFAULT_SPLITS.agente : DEFAULT_SPLITS.agenteSin)
  const pR = rp.R !== undefined ? rp.R
    : op.realtorSplitPct >= 0 ? op.realtorSplitPct
    : (hasR ? DEFAULT_SPLITS.realtor : 0)
  const pB = rp.B !== undefined ? rp.B
    : op.brokerSplitPct >= 0 ? op.brokerSplitPct
    : (hasR ? DEFAULT_SPLITS.broker : DEFAULT_SPLITS.brokerSin)
  return { total, pA, pR, pB, mA: total * pA / 100, mR: total * pR / 100, mB: total * pB / 100 }
}

function SplitInput({ value, onChange }: { value: number; onChange: (v: string) => void }) {
  const [local, setLocal] = useState(String(value))
  const focused = useRef(false)

  useEffect(() => {
    if (!focused.current) setLocal(String(value))
  }, [value])

  return (
    <input
      type="number"
      min={0}
      max={100}
      value={local}
      onChange={e => { setLocal(e.target.value); onChange(e.target.value) }}
      onFocus={() => { focused.current = true }}
      onBlur={() => { focused.current = false }}
      onClick={e => e.stopPropagation()}
      className="w-[44px] text-center text-[11px] font-semibold bg-bg border border-border rounded-[5px] py-[3px] focus:outline-none focus:border-gold font-[inherit] transition-colors"
    />
  )
}

function PartyCell({ name, pct, amount, onChange, show }: {
  name: string; pct: number; amount: number; onChange: (v: string) => void; show: boolean
}) {
  if (!show) return <span className="text-text-3 text-[12px]">—</span>
  return (
    <div className="space-y-[5px]">
      <div className="text-[12px] font-semibold text-text-primary leading-none">{name}</div>
      <div className="flex items-center gap-1.5">
        <SplitInput value={pct} onChange={onChange} />
        <span className="text-[10px] text-text-3">%</span>
        <span className="text-[11px] font-bold text-text-2">${Math.round(amount).toLocaleString()}</span>
      </div>
    </div>
  )
}

const col = createColumnHelper<Operation>()

interface ComTableProps {
  rows: Operation[]
  agents: Agent[]
  realtors: Realtor[]
  rowPctRef: React.MutableRefObject<RowPct>
  updateRowPct: (id: number, who: 'A' | 'R' | 'B', val: string) => void
  togglePaid: (id: number, current: boolean) => void
  emptyMsg: string
}

function ComTable({ rows, agents, realtors, rowPctRef, updateRowPct, togglePaid, emptyMsg }: ComTableProps) {
  // Re-render trigger when rowPct changes (for live dollar amounts)
  const [, tick] = useState(0)
  const forceUpdate = useCallback(() => tick(n => n + 1), [])

  // Wrap updateRowPct to also trigger local re-render
  const handlePct = useCallback((id: number, who: 'A' | 'R' | 'B', val: string) => {
    updateRowPct(id, who, val)
    forceUpdate()
  }, [updateRowPct, forceUpdate])

  const columns = useMemo(() => [
    col.display({
      id: 'property',
      header: 'Property',
      cell: ({ row: { original: o } }) => (
        <div>
          <div className="font-semibold text-[13px] text-text-primary">{o.address}</div>
          <div className="text-[11px] text-text-3 mt-0.5">{o.closingDate || o.closingDateISO || '—'}</div>
        </div>
      ),
    }),
    col.display({
      id: 'price',
      header: 'Price',
      cell: ({ row: { original: o } }) => (
        <span className="font-semibold text-[13px]">
          {o.price > 0 ? `$${o.price.toLocaleString()}` : '—'}
        </span>
      ),
    }),
    col.display({
      id: 'comp',
      header: 'Comp',
      cell: ({ row: { original: o } }) => (
        <span className="text-[13px] text-text-2">
          {(o.compFixed ?? 0) > 0
            ? `$${(o.compFixed ?? 0).toLocaleString()}${o.compPct ? ` / ${o.compPct}%` : ''}`
            : o.compPct ? `${o.compPct}%` : '—'}
        </span>
      ),
    }),
    col.display({
      id: 'commission',
      header: 'Commission',
      cell: ({ row: { original: o } }) => {
        const c = calcCom(o, rowPctRef.current)
        return (
          <span className="font-bold text-[15px] text-gold-dark">
            {c.total > 0 ? `$${Math.round(c.total).toLocaleString()}` : '—'}
          </span>
        )
      },
    }),
    col.display({
      id: 'agent',
      header: 'Agent',
      cell: ({ row: { original: o } }) => {
        const c = calcCom(o, rowPctRef.current)
        return (
          <PartyCell
            name={agentName(o.agent, agents) || '—'}
            pct={rowPctRef.current[o.id]?.A ?? c.pA}
            amount={c.mA}
            onChange={v => handlePct(o.id, 'A', v)}
            show
          />
        )
      },
    }),
    col.display({
      id: 'realtor',
      header: 'Realtor',
      cell: ({ row: { original: o } }) => {
        const c = calcCom(o, rowPctRef.current)
        const hasR = !!(o.realtor && o.realtor !== 'none')
        return (
          <PartyCell
            name={realtorName(o.realtor, realtors)}
            pct={rowPctRef.current[o.id]?.R ?? c.pR}
            amount={c.mR}
            onChange={v => handlePct(o.id, 'R', v)}
            show={hasR}
          />
        )
      },
    }),
    col.display({
      id: 'broker',
      header: 'Broker',
      cell: ({ row: { original: o } }) => {
        const c = calcCom(o, rowPctRef.current)
        return (
          <PartyCell
            name="Miami Tango"
            pct={rowPctRef.current[o.id]?.B ?? c.pB}
            amount={c.mB}
            onChange={v => handlePct(o.id, 'B', v)}
            show
          />
        )
      },
    }),
    col.display({
      id: 'status',
      header: 'Status',
      cell: ({ row: { original: o } }) => (
        <button
          onClick={e => { e.stopPropagation(); togglePaid(o.id, o.commissionPaid) }}
          className={`text-[11px] font-semibold px-3 py-1.5 rounded-[8px] border cursor-pointer transition-all whitespace-nowrap ${
            o.commissionPaid
              ? 'bg-green-bg text-green border-green/20 hover:bg-green/10'
              : 'bg-amber-bg text-amber border-amber/20 hover:bg-amber/10'
          }`}
        >
          {o.commissionPaid ? '✓ Paid' : '⏳ Mark paid'}
        </button>
      ),
    }),
  // eslint-disable-next-line react-hooks/exhaustive-deps
  ], [agents, realtors, handlePct, togglePaid])

  const table = useReactTable({ data: rows, columns, getCoreRowModel: getCoreRowModel() })

  if (rows.length === 0) {
    return <div className="py-8 text-center text-[12px] text-text-3">{emptyMsg}</div>
  }

  return (
    <div className="overflow-x-auto">
      <table style={{ minWidth: 900 }}>
        <thead>
          {table.getHeaderGroups().map(hg => (
            <tr key={hg.id}>
              {hg.headers.map(h => (
                <th key={h.id} className="text-left text-[10px] font-semibold text-text-3 uppercase tracking-wider px-4 py-2.5 border-b border-border bg-bg/50 whitespace-nowrap">
                  {flexRender(h.column.columnDef.header, h.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr
              key={row.id}
              className="border-b border-border last:border-b-0 hover:bg-bg/60 transition-colors"
              style={{ opacity: row.original.commissionPaid ? 0.6 : 1 }}
            >
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="px-4 py-3.5 align-middle">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function Comisiones() {
  const { operations, agents, realtors, updateOperation } = useData()
  const [rowPct, setRowPct] = useState<RowPct>({})
  const rowPctRef = useRef<RowPct>(rowPct)

  const ops = useMemo(
    () => operations.filter(o => o.status === 'ACTIVA' || o.commissionPaid === true),
    [operations]
  )
  const pending = useMemo(() => ops.filter(o => !o.commissionPaid), [ops])
  const paid    = useMemo(() => ops.filter(o =>  o.commissionPaid), [ops])

  const updateRowPct = useCallback((opId: number, who: 'A' | 'R' | 'B', val: string) => {
    const parsed = parseFloat(val) || 0
    const next: RowPct = { ...rowPctRef.current, [opId]: { ...rowPctRef.current[opId], [who]: parsed } }
    rowPctRef.current = next
    setRowPct(next)
    const field = who === 'A' ? 'agentSplitPct' : who === 'R' ? 'realtorSplitPct' : 'brokerSplitPct'
    updateOperation(opId, { [field]: parsed } as Partial<Operation>)
  }, [updateOperation])

  const togglePaid = useCallback((opId: number, current: boolean) => {
    updateOperation(opId, { commissionPaid: !current })
    toast(!current ? 'Commission marked as paid' : 'Commission marked as pending')
  }, [updateOperation])

  // Totals read from ref for instant accuracy
  const totalCom     = ops.reduce((s, o) => s + calcCom(o, rowPctRef.current).total, 0)
  const totalPending = pending.reduce((s, o) => s + calcCom(o, rowPctRef.current).total, 0)
  const totalPaid    = paid.reduce((s, o) => s + calcCom(o, rowPctRef.current).total, 0)
  const totalBroker  = pending.reduce((s, o) => s + calcCom(o, rowPctRef.current).mB, 0)

  function downloadCSV() {
    let csv = 'Property,Status,Price,Comp%,Total,Agent,Agent $,Realtor,Realtor $,Broker,Broker $\n'
    ops.forEach(o => {
      const c = calcCom(o, rowPctRef.current)
      csv += `"${o.address}",${o.status},${o.price},${o.compPct}%,${Math.round(c.total)},`
        + `${agentName(o.agent, agents)},${Math.round(c.mA)},`
        + `${realtorName(o.realtor, realtors)},${Math.round(c.mR)},`
        + `Miami Tango,${Math.round(c.mB)}\n`
    })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))
    a.download = `commissions_${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    toast('Report downloaded')
  }

  const tableProps = { agents, realtors, rowPctRef, updateRowPct, togglePaid }

  return (
    <>
      <div className="flex justify-end mb-5">
        <button
          onClick={downloadCSV}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[6px] text-[13px] font-medium cursor-pointer border transition-all bg-surface text-text-2 border-border hover:bg-bg"
        >
          ⬇ Download Excel
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { icon: '💰', label: 'Total commissions', val: `$${Math.round(totalCom).toLocaleString()}`,     sub: `${ops.length} operations`,      cls: 'text-gold-dark' },
          { icon: '⏳', label: 'Pending',            val: `$${Math.round(totalPending).toLocaleString()}`, sub: `${pending.length} uncollected`,  cls: 'text-amber'    },
          { icon: '✓',  label: 'Collected',          val: `$${Math.round(totalPaid).toLocaleString()}`,   sub: `${paid.length} paid`,            cls: 'text-green'    },
          { icon: '🏢', label: 'Miami Tango',        val: `$${Math.round(totalBroker).toLocaleString()}`, sub: "Broker's share",                 cls: 'text-blue'     },
        ].map(s => (
          <div key={s.label} className="bg-surface border border-border rounded-[10px] px-5 py-4">
            <div className="text-[12px] text-text-3 mb-2">{s.icon} {s.label}</div>
            <div className={`text-[26px] font-bold leading-none ${s.cls}`}>{s.val}</div>
            <div className="text-[11px] text-text-3 mt-1.5">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="bg-surface border border-border rounded-[10px] overflow-hidden mb-4">
        <div className="px-[18px] py-3.5 border-b border-border flex items-center justify-between">
          <span className="text-[13px] font-semibold text-text-primary">⏳ Pending commissions</span>
          {pending.length > 0 && (
            <span className="text-[12px] font-semibold text-amber">${Math.round(totalPending).toLocaleString()}</span>
          )}
        </div>
        <ComTable rows={pending} emptyMsg="No pending commissions" {...tableProps} />
      </div>

      <div className="bg-surface border border-border rounded-[10px] overflow-hidden">
        <div className="px-[18px] py-3.5 border-b border-border flex items-center justify-between">
          <span className="text-[13px] font-semibold text-text-primary">✓ Paid commissions</span>
          {paid.length > 0 && (
            <span className="text-[12px] font-semibold text-green">${Math.round(totalPaid).toLocaleString()}</span>
          )}
        </div>
        <ComTable rows={paid} emptyMsg="No paid commissions yet" {...tableProps} />
      </div>
    </>
  )
}
