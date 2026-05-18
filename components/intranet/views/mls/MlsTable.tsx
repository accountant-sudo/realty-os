'use client'
import { useState, useMemo } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
  type SortingState,
} from '@tanstack/react-table'
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react'
import AgentChip from '@/components/intranet/ui/AgentChip'
import Badge from '@/components/intranet/ui/Badge'
import { mlsStatusClass, mlsStatusLabel, countryFlag, fmtPrice } from '@/lib/helpers'
import { Link2 } from 'lucide-react'
import type { MlsProperty, Agent, Operation } from '@/lib/types'

const BTN_GHOST = 'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[6px] text-[13px] font-medium cursor-pointer border transition-all bg-transparent text-text-2 border-transparent hover:bg-bg'
const BTN_DANGER = 'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[6px] text-[13px] font-medium cursor-pointer border transition-all bg-transparent text-red-400 border-transparent hover:bg-red-950/30'
const PAGE_SIZES = [10, 20, 50]

interface Props {
  properties: MlsProperty[]
  agents: Agent[]
  operations: Operation[]
  canEdit: boolean
  onEdit: (p: MlsProperty) => void
  onDelete: (p: MlsProperty) => void
}

const col = createColumnHelper<MlsProperty>()

export default function MlsTable({ properties, agents, operations, canEdit, onEdit, onDelete }: Props) {
  const [sorting, setSorting] = useState<SortingState>([{ id: 'createdAt', desc: true }])

  const activeOpByPropertyId = useMemo(() => {
    const map = new Map<number, Operation>()
    for (const op of operations) {
      if (op.mlsPropertyId && op.status === 'ACTIVA') {
        map.set(op.mlsPropertyId, op)
      }
    }
    return map
  }, [operations])

  const columns = useMemo(() => [
    col.accessor('address', {
      header: 'Property',
      cell: ({ row }) => {
        const activeOp = activeOpByPropertyId.get(row.original.id)
        return (
          <div>
            <div className="font-semibold text-[13px]">{row.original.address}</div>
            {activeOp ? (
              <div className="flex items-center gap-1 mt-0.5">
                <Link2 size={10} className="text-amber shrink-0" />
                <span className="text-[10px] text-amber font-medium truncate max-w-[240px]">
                  Op #{activeOp.id} · {activeOp.buyerName || 'Active operation'}
                </span>
              </div>
            ) : row.original.notes ? (
              <div className="text-[11px] text-text-3 mt-0.5 max-w-[280px] overflow-hidden text-ellipsis whitespace-nowrap">
                {row.original.notes}
              </div>
            ) : null}
          </div>
        )
      },
    }),
    col.accessor('city', {
      header: 'City',
      cell: ({ row }) => (
        <span>
          <span className="text-[16px] leading-none">{countryFlag(row.original.country)}</span>{' '}
          {row.original.city}
        </span>
      ),
    }),
    col.accessor('agent', {
      header: 'Agent',
      cell: ({ row }) => <AgentChip agentId={row.original.agent} agents={agents} />,
      enableSorting: false,
    }),
    col.accessor('listPrice', {
      header: 'Price',
      cell: ({ getValue }) => <span className="font-semibold">{fmtPrice(getValue())}</span>,
    }),
    col.accessor('mlsNum', {
      header: 'MLS #',
      cell: ({ row }) => (
        <span className="text-[12px] text-text-3">
          {row.original.mlsNum ? (
            row.original.zillow
              ? <a href={row.original.zillow} target="_blank" rel="noreferrer" className="text-blue">{row.original.mlsNum}</a>
              : row.original.mlsNum
          ) : '—'}
        </span>
      ),
      enableSorting: false,
    }),
    col.accessor('mlsStatus', {
      header: 'Status',
      cell: ({ row }) => (
        <Badge cls={mlsStatusClass(row.original.mlsStatus)}>
          {mlsStatusLabel(row.original.mlsStatus, row.original.country)}
        </Badge>
      ),
    }),
    col.accessor('listingStart', {
      header: 'Start',
      cell: ({ getValue }) => <span className="text-[12px] text-text-3">{getValue() || '—'}</span>,
      enableSorting: false,
    }),
    col.accessor('listingExp', {
      header: 'Listing Exp.',
      cell: ({ getValue }) => <span className="text-[12px] text-text-3">{getValue() || '—'}</span>,
      enableSorting: false,
    }),
    col.accessor('createdAt', {
      header: 'Created',
      cell: ({ getValue }) => {
        const v = getValue()
        return (
          <span className="text-[12px] text-text-3">
            {v ? new Date(v).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: '2-digit' }) : '—'}
          </span>
        )
      },
      sortingFn: 'datetime',
    }),
    ...(canEdit ? [
      col.display({
        id: 'actions',
        header: '',
        cell: ({ row }) => (
          <div className="flex items-center gap-1">
            <button className={BTN_GHOST} onClick={() => onEdit(row.original)}>Edit</button>
            <button className={BTN_DANGER} onClick={() => onDelete(row.original)}>Delete</button>
          </div>
        ),
      }),
    ] : []),
  ], [agents, canEdit, onEdit, onDelete, activeOpByPropertyId])

  const table = useReactTable({
    data: properties,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 20 } },
  })

  const { pageIndex, pageSize } = table.getState().pagination
  const pageCount = table.getPageCount()

  return (
    <div>
      <div className="overflow-x-auto">
        <table>
          <thead>
            {table.getHeaderGroups().map(hg => (
              <tr key={hg.id}>
                {hg.headers.map(header => {
                  const canSort = header.column.getCanSort()
                  const sorted = header.column.getIsSorted()
                  return (
                    <th
                      key={header.id}
                      onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                      className={canSort ? 'cursor-pointer select-none' : ''}
                    >
                      <span className="inline-flex items-center gap-1">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {canSort && (
                          sorted === 'asc' ? <ChevronUp size={12} className="text-gold" />
                          : sorted === 'desc' ? <ChevronDown size={12} className="text-gold" />
                          : <ChevronsUpDown size={12} className="text-text-3 opacity-60" />
                        )}
                      </span>
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => {
                  return (
                    <td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  )
                })}
              </tr>
            ))}
            {table.getRowModel().rows.length === 0 && (
              <tr>
                <td colSpan={99} className="text-center text-text-3 py-8 text-[13px]">
                  No properties
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {pageCount > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-border">
          <div className="flex items-center gap-2">
            <span className="text-[12px] text-text-3">Rows per page:</span>
            <select
              className="text-[12px] border border-border rounded-[5px] px-2 py-1 bg-bg text-text-primary focus:outline-none focus:border-gold"
              value={pageSize}
              onChange={e => table.setPageSize(Number(e.target.value))}
            >
              {PAGE_SIZES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-[12px] text-text-3 mr-2">
              {pageIndex * pageSize + 1}–{Math.min((pageIndex + 1) * pageSize, properties.length)} de {properties.length}
            </span>
            <PagBtn onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>«</PagBtn>
            <PagBtn onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>‹</PagBtn>
            <PagBtn onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>›</PagBtn>
            <PagBtn onClick={() => table.setPageIndex(pageCount - 1)} disabled={!table.getCanNextPage()}>»</PagBtn>
          </div>
        </div>
      )}
    </div>
  )
}

function PagBtn({ onClick, disabled, children }: { onClick: () => void; disabled: boolean; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-7 h-7 flex items-center justify-center rounded-[5px] text-[14px] border border-border text-text-2 hover:bg-bg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
    >
      {children}
    </button>
  )
}
