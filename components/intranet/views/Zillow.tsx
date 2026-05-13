'use client'
import { useIntranet } from '@/context/IntranetContext'
import { fmtPrice } from '@/lib/helpers'
import AgentChip from '@/components/intranet/ui/AgentChip'

const BTN_SECONDARY = 'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] text-[12px] font-medium cursor-pointer border transition-all bg-surface text-text-2 border-border hover:bg-bg'

export default function Zillow() {
  const { mlsProperties, agents } = useIntranet()
  const usProps = mlsProperties.filter(p => p.country === 'US' && p.zillow && p.zillow.startsWith('http'))

  return (
    <>
      <div className="mb-5">
        <div className="inline-flex items-start gap-2 px-3.5 py-3 rounded-[6px] text-[13px] bg-amber-bg text-amber border border-[#F0D070]">
          <span>ℹ️</span>
          <span>{usProps.length} propiedades con link de Zillow disponible.</span>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-[10px] overflow-hidden mb-5">
        <div className="px-[18px] py-3.5 border-b border-border flex items-center justify-between">
          <span className="text-[13px] font-semibold text-text-primary">Propiedades en Zillow 🇺🇸</span>
        </div>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Propiedad</th>
                <th>Ciudad</th>
                <th>Agente</th>
                <th>Precio lista</th>
                <th>Zillow</th>
              </tr>
            </thead>
            <tbody>
              {usProps.map(p => (
                <tr key={p.id}>
                  <td><div className="font-semibold text-[13px]">{p.address}</div></td>
                  <td>{p.city}</td>
                  <td><AgentChip agentId={p.agent} agents={agents} /></td>
                  <td className="font-semibold">{fmtPrice(p.listPrice)}</td>
                  <td>
                    <a href={p.zillow} target="_blank" rel="noreferrer" className={BTN_SECONDARY}>
                      Ver en Zillow ↗
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
