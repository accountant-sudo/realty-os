'use client'
import { useIntranet } from '@/context/IntranetContext'
import { getAlerts, statusBadgeClass } from '@/lib/helpers'
import AgentChip from '@/components/intranet/ui/AgentChip'
import ProgressBar from '@/components/intranet/ui/ProgressBar'
import Badge from '@/components/intranet/ui/Badge'

export default function Dashboard() {
  const { operations, mlsProperties, agents, goTo } = useIntranet()
  const activas = operations.filter(o => o.status === 'ACTIVA')
  const cerradas = operations.filter(o => o.status === 'CERRADA').length
  const proximos = [...activas].sort((a, b) => (a.closingDate || '').localeCompare(b.closingDate || ''))
  const alerts = getAlerts(operations)

  return (
    <>
      {alerts.length > 0 && (
        <div className="mb-5">
          <div className="flex items-center gap-2 text-[12px] font-bold text-text-3 uppercase tracking-[0.06em] mb-2">
            <span className="inline-block w-2 h-2 rounded-full bg-red animate-pulse-dot" />
            {alerts.length} alerta{alerts.length === 1 ? '' : 's'} activa{alerts.length === 1 ? '' : 's'}
          </div>
          {alerts.map((a, i) => (
            <div
              key={i}
              className={`flex items-start gap-2 px-3.5 py-3 rounded-[6px] text-[13px] mb-2 cursor-pointer border ${
                a.type === 'danger'
                  ? 'bg-red-bg text-red border-[#F0A0A0]'
                  : 'bg-amber-bg text-amber border-[#F0D070]'
              }`}
              onClick={() => goTo('op-detail', a.opId)}
            >
              <span className="mr-1">{a.icon}</span>
              <div>
                <strong>{a.address}</strong>
                <span className="mx-1.5 opacity-50">·</span>
                {a.msg}
                <span className="ml-2 text-[11px] opacity-70">→ Ver operación</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-3 gap-3.5 mb-6">
        <div className="bg-surface border border-border rounded-[10px] p-[18px]">
          <div className="text-[12px] text-text-2 mb-1.5 font-medium">Operaciones activas</div>
          <div className="text-[28px] font-bold text-gold-dark">{activas.length}</div>
          <div className="text-[11px] text-text-3 mt-0.5">En curso</div>
        </div>
        <div className="bg-surface border border-border rounded-[10px] p-[18px]">
          <div className="text-[12px] text-text-2 mb-1.5 font-medium">Cerradas</div>
          <div className="text-[28px] font-bold text-green">{cerradas}</div>
          <div className="text-[11px] text-text-3 mt-0.5">Total histórico</div>
        </div>
        <div className="bg-surface border border-border rounded-[10px] p-[18px]">
          <div className="text-[12px] text-text-2 mb-1.5 font-medium">Propiedades en MLS</div>
          <div className="text-[28px] font-bold">{mlsProperties.length}</div>
          <div className="text-[11px] text-text-3 mt-0.5">Publicadas y bajo contrato</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5">
        <div className="bg-surface border border-border rounded-[10px] overflow-hidden mb-5">
          <div className="px-[18px] py-3.5 border-b border-border flex items-center justify-between">
            <span className="text-[13px] font-semibold text-text-primary">Próximos cierres</span>
          </div>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Propiedad</th>
                  <th>Agente</th>
                  <th>Closing</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {proximos.map(o => (
                  <tr key={o.id} onClick={() => goTo('op-detail', o.id)} style={{ cursor: 'pointer' }}>
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
      </div>
    </>
  )
}
