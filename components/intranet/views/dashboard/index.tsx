'use client'
import { useData } from '@/context/DataContext'
import { getNotifications } from '@/lib/helpers'
import StatsGrid from './StatsGrid'
import ClosingsTable from './ClosingsTable'
import AgentPerformance from './AgentPerformance'
import DashboardAlerts from './DashboardAlerts'

export default function Dashboard() {
  const { operations, mlsProperties, agents } = useData()
  const activas = operations.filter(o => o.status === 'ACTIVA')
  const cerradas = operations.filter(o => o.status === 'CERRADA').length
  const proximos = [...activas].sort((a, b) => (a.closingDate || '').localeCompare(b.closingDate || ''))
  const alerts = getNotifications(activas)

  return (
    <>
      <DashboardAlerts alerts={alerts} />
      <StatsGrid activasCount={activas.length} cerradasCount={cerradas} mlsCount={mlsProperties.length} />
      <div className="grid grid-cols-2 gap-5">
        <ClosingsTable operations={proximos} agents={agents} />
        <AgentPerformance agents={agents} />
      </div>
    </>
  )
}
