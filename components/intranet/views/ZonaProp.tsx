'use client'
import { useData } from '@/context/DataContext'
import { fmtPrice } from '@/lib/helpers'
import AgentChip from '@/components/intranet/ui/AgentChip'
import Badge from '@/components/intranet/ui/Badge'

export default function ZonaProp() {
  const { mlsProperties, agents } = useData()
  const arProps = mlsProperties.filter(p => p.country === 'AR')

  return (
    <div className="bg-surface border border-border rounded-[10px] overflow-hidden mb-5">
      <div className="px-[18px] py-3.5 border-b border-border flex items-center justify-between">
        <span className="text-[13px] font-semibold text-text-primary">Properties on ZonaProp 🇦🇷</span>
        <span className="text-[12px] text-text-3">{arProps.length} properties</span>
      </div>
      {arProps.length === 0 ? (
        <div className="p-8 text-center text-text-3 text-[13px]">
          No properties on ZonaProp currently.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Property</th>
                <th>Agent</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {arProps.map(p => (
                <tr key={p.id}>
                  <td><div className="font-semibold text-[13px]">{p.address}</div></td>
                  <td><AgentChip agentId={p.agent} agents={agents} /></td>
                  <td className="font-semibold">{fmtPrice(p.listPrice)}</td>
                  <td><Badge cls="bg-blue-bg text-blue">On ZonaProp</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
