import AgentChip from '@/components/intranet/ui/AgentChip'
import ProgressBar from '@/components/intranet/ui/ProgressBar'
import type { Agent } from '@/lib/types'

export default function AgentPerformance({ agents }: { agents: Agent[] }) {
  return (
    <div className="bg-surface border border-border rounded-[10px] overflow-hidden mb-5">
      <div className="px-[18px] py-3.5 border-b border-border flex items-center justify-between">
        <span className="text-[13px] font-semibold text-text-primary">Agentes — performance</span>
      </div>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr><th>Agente</th><th>Activas</th><th>Cerradas</th><th>Progreso</th></tr>
          </thead>
          <tbody>
            {agents.map(a => (
              <tr key={a.id}>
                <td><AgentChip agentId={a.id} agents={agents} /></td>
                <td>{a.active}</td>
                <td>{a.closed}</td>
                <td style={{ minWidth: 80 }}>
                  <ProgressBar pct={Math.round(a.closed / 45 * 100)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
