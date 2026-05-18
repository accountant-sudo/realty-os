'use client'
import { useRouter } from 'next/navigation'
import AgentChip from '@/components/intranet/ui/AgentChip'
import Badge from '@/components/intranet/ui/Badge'
import { statusBadgeClass } from '@/lib/helpers'
import type { Operation, Agent } from '@/lib/types'

interface Props {
  operations: Operation[]
  agents: Agent[]
}

export default function ClosingsTable({ operations, agents }: Props) {
  const router = useRouter()

  return (
    <div className="bg-surface border border-border rounded-[10px] overflow-hidden mb-5">
      <div className="px-[18px] py-3.5 border-b border-border flex items-center justify-between">
        <span className="text-[13px] font-semibold text-text-primary">Upcoming closings</span>
      </div>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Property</th>
              <th>Agent</th>
              <th>Closing</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {operations.map(o => (
              <tr key={o.id} onClick={() => router.push(`/intranet/operations/${o.id}`)} style={{ cursor: 'pointer' }}>
                <td><div className="font-semibold text-[13px]">{o.address}</div></td>
                <td><AgentChip agentId={o.agent} agents={agents} /></td>
                <td className={o.closingNear ? 'text-red font-semibold' : 'text-text-2'}>{o.closingDate}</td>
                <td><Badge cls={statusBadgeClass(o.status)}>{o.status}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
