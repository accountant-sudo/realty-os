'use client'
import { useRouter } from 'next/navigation'
import { useData } from '@/context/DataContext'
import { calcProgress, statusBadgeClass } from '@/lib/helpers'
import AgentChip from '@/components/intranet/ui/AgentChip'
import Chk from '@/components/intranet/ui/Chk'
import ProgressBar from '@/components/intranet/ui/ProgressBar'
import Badge from '@/components/intranet/ui/Badge'
import type { Operation, Agent } from '@/lib/types'

interface Props {
  operations: Operation[]
  agents: Agent[]
}

export default function OperacionesTable({ operations, agents }: Props) {
  const { cycleChk } = useData()
  const router = useRouter()

  return (
    <div className="bg-surface border border-border rounded-[10px] overflow-hidden mb-5">
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Propiedad</th>
              <th>Agente</th>
              <th>Tipo</th>
              <th>Comp</th>
              <th>Escrow</th>
              <th>LBP</th>
              <th>SD</th>
              <th>Flood</th>
              <th>Insp.</th>
              <th>Progreso</th>
              <th>Closing</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {operations.map(o => {
              const { pct } = calcProgress(o)
              return (
                <tr key={o.id} onClick={() => router.push(`/intranet/operaciones/${o.id}`)} style={{ cursor: 'pointer' }}>
                  <td>
                    <div className="font-semibold text-[13px]">{o.address}</div>
                    {o.pending && (
                      <div className="text-[11px] text-amber max-w-[240px] overflow-hidden text-ellipsis whitespace-nowrap">
                        {o.pending}
                      </div>
                    )}
                  </td>
                  <td onClick={e => e.stopPropagation()}>
                    {o.agent ? <AgentChip agentId={o.agent} agents={agents} /> : <span className="text-text-3">—</span>}
                  </td>
                  <td className="text-[12px]">{o.financing || '—'}</td>
                  <td onClick={e => e.stopPropagation()}>
                    <Chk val={o.compSigned} onCycle={() => cycleChk(o.id, 'compSigned')} />
                  </td>
                  <td onClick={e => e.stopPropagation()}>
                    <Chk val={o.escrow} onCycle={() => cycleChk(o.id, 'escrow')} />
                  </td>
                  <td onClick={e => e.stopPropagation()}>
                    <Chk val={o.lbp} onCycle={() => cycleChk(o.id, 'lbp')} />
                  </td>
                  <td onClick={e => e.stopPropagation()}>
                    <Chk val={o.sd} onCycle={() => cycleChk(o.id, 'sd')} />
                  </td>
                  <td onClick={e => e.stopPropagation()}>
                    <Chk val={o.flood} onCycle={() => cycleChk(o.id, 'flood')} />
                  </td>
                  <td onClick={e => e.stopPropagation()}>
                    <Chk val={o.inspDone} onCycle={() => cycleChk(o.id, 'inspDone')} />
                  </td>
                  <td style={{ minWidth: 80 }}>
                    <ProgressBar pct={pct} />
                    <div className="text-[10px] text-text-3 mt-0.5">{pct}%</div>
                  </td>
                  <td className={`text-[12px] ${o.closingNear ? 'text-red font-semibold' : 'text-text-2'}`}>
                    {o.closingDate || '—'}
                  </td>
                  <td><Badge cls={statusBadgeClass(o.status)}>{o.status}</Badge></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
