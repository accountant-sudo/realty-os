'use client'
import { useRouter } from 'next/navigation'
import { useReactTable, getCoreRowModel, createColumnHelper, flexRender } from '@tanstack/react-table'
import { useData } from '@/context/DataContext'
import { calcProgress, getDaysUntil, realtorName } from '@/lib/helpers'
import AgentChip from '@/components/intranet/ui/AgentChip'
import Chk from '@/components/intranet/ui/Chk'
import type { Operation, Agent, Realtor } from '@/lib/types'

interface Props {
  operations: Operation[]
  agents: Agent[]
  realtors: Realtor[]
  tab: 'ACTIVA' | 'CERRADA' | 'CANCELADA'
}

const col = createColumnHelper<Operation>()

function ClosingCell({ op }: { op: Operation }) {
  if (!op.closingDate) return <span className="text-text-3">—</span>
  const days = op.closingDateISO ? getDaysUntil(op.closingDateISO) : null
  const badge = days !== null && days <= 2
    ? (
      <div className="text-[10px] font-bold text-red leading-none mt-0.5">
        {days < 0 ? 'OVERDUE' : days === 0 ? 'TODAY' : `${days}d`}
      </div>
    ) : null
  return (
    <div className={days !== null && days <= 2 ? 'text-red font-semibold' : ''}>
      <div className="text-[12px]">{op.closingDate}</div>
      {badge}
    </div>
  )
}

export default function OperacionesTable({ operations, agents, realtors, tab }: Props) {
  const { cycleChk } = useData()
  const router = useRouter()

  const tabLabel = tab === 'ACTIVA' ? 'active' : tab === 'CERRADA' ? 'closed' : 'cancelled'

  const columns = [
    col.display({
      id: 'property',
      header: 'Property',
      cell: ({ row: { original: o } }) => {
        const { pct } = calcProgress(o)
        return (
          <div>
            <div className="font-semibold text-[13px] text-text-primary">{o.address}</div>
            <div className="text-[11px] text-text-3">{o.type} · {pct}% complete</div>
          </div>
        )
      },
    }),
    col.display({
      id: 'buyer',
      header: 'Buyer',
      cell: ({ row: { original: o } }) => (
        o.buyerName
          ? <span className="text-[12px] font-semibold text-blue">{o.buyerName}</span>
          : <span className="text-text-3">—</span>
      ),
    }),
    col.display({
      id: 'agent',
      header: 'Agent',
      cell: ({ row: { original: o } }) => (
        o.agent ? <AgentChip agentId={o.agent} agents={agents} /> : <span className="text-text-3">—</span>
      ),
    }),
    col.display({
      id: 'realtor',
      header: 'Realtor',
      cell: ({ row: { original: o } }) => (
        <span className="text-[12px] text-text-2">
          {o.realtor && o.realtor !== 'none' ? realtorName(o.realtor, realtors) : '—'}
        </span>
      ),
    }),
    col.accessor('financing', {
      header: 'Financ.',
      cell: info => <span className="text-[12px] text-text-2 whitespace-nowrap">{info.getValue() || '—'}</span>,
    }),
    col.accessor('compPct', {
      header: 'Comp%',
      cell: info => <span className="text-[12px]">{info.getValue() ? `${info.getValue()}%` : '—'}</span>,
    }),
    col.display({
      id: 'escrow',
      header: 'Escrow',
      cell: ({ row: { original: o } }) => (
        <span onClick={e => e.stopPropagation()}>
          <Chk val={o.escrow} onCycle={() => cycleChk(o.id, 'escrow')} />
        </span>
      ),
    }),
    col.display({
      id: 'lbp',
      header: 'LBP',
      cell: ({ row: { original: o } }) => (
        <span onClick={e => e.stopPropagation()}>
          <Chk val={o.lbp} onCycle={() => cycleChk(o.id, 'lbp')} />
        </span>
      ),
    }),
    col.display({
      id: 'sd',
      header: 'SD',
      cell: ({ row: { original: o } }) => (
        <span onClick={e => e.stopPropagation()}>
          <Chk val={o.sd} onCycle={() => cycleChk(o.id, 'sd')} />
        </span>
      ),
    }),
    col.display({
      id: 'flood',
      header: 'Flood',
      cell: ({ row: { original: o } }) => (
        <span onClick={e => e.stopPropagation()}>
          <Chk val={o.flood} onCycle={() => cycleChk(o.id, 'flood')} />
        </span>
      ),
    }),
    col.display({
      id: 'insp',
      header: 'Insp.',
      cell: ({ row: { original: o } }) => (
        <span onClick={e => e.stopPropagation()}>
          <Chk val={o.inspDone} onCycle={() => cycleChk(o.id, 'inspDone')} />
        </span>
      ),
    }),
    col.accessor('appraisal', {
      header: 'Appraisal',
      cell: info => {
        const v = info.getValue()
        if (!v || v === 'na') return <span className="text-[11px] text-text-3">N/A</span>
        return <span className="text-[12px] text-text-2">{v}</span>
      },
    }),
    col.display({
      id: 'closing',
      header: 'Closing',
      cell: ({ row: { original: o } }) => <ClosingCell op={o} />,
    }),
    col.accessor('pending', {
      header: 'Pending',
      cell: info => {
        const v = info.getValue()
        return v
          ? <span className="text-[12px] text-amber">{v}</span>
          : <span className="text-text-3">—</span>
      },
    }),
  ]

  const table = useReactTable({
    data: operations,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="bg-surface border border-border rounded-[10px] overflow-hidden">
      <div className="px-[18px] py-3.5 border-b border-border">
        <span className="text-[13px] font-semibold text-text-primary">
          {operations.length} {tabLabel} operation{operations.length !== 1 ? 's' : ''}
        </span>
      </div>

      {operations.length === 0 ? (
        <div className="py-10 text-center text-[13px] text-text-3">
          No {tabLabel} operations.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table style={{ minWidth: 1100 }}>
            <thead>
              {table.getHeaderGroups().map(hg => (
                <tr key={hg.id}>
                  {hg.headers.map(h => (
                    <th key={h.id} className="text-left text-[11px] font-semibold text-text-3 uppercase tracking-wider px-3 py-2.5 border-b border-border whitespace-nowrap">
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
                  onClick={() => router.push(`/intranet/operations/${row.original.id}`)}
                  className="border-b border-border last:border-b-0 hover:bg-bg cursor-pointer transition-colors"
                >
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="px-3 py-2.5 align-middle">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
