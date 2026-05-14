import AgentChip from '@/components/intranet/ui/AgentChip'
import Badge from '@/components/intranet/ui/Badge'
import { mlsStatusClass, mlsStatusLabel, countryFlag, fmtPrice } from '@/lib/helpers'
import type { MlsProperty, Agent } from '@/lib/types'

const BTN_GHOST = 'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[6px] text-[13px] font-medium cursor-pointer border transition-all bg-transparent text-text-2 border-transparent hover:bg-bg'

interface Props {
  properties: MlsProperty[]
  agents: Agent[]
  canEdit: boolean
  onEdit: (p: MlsProperty) => void
}

export default function MlsTable({ properties, agents, canEdit, onEdit }: Props) {
  return (
    <div className="overflow-x-auto">
      <table>
        <thead>
          <tr>
            <th>Propiedad</th>
            <th>Ciudad</th>
            <th>Agente</th>
            <th>Precio</th>
            <th>MLS #</th>
            <th>Estado</th>
            <th>Exp. Listado</th>
            {canEdit && <th></th>}
          </tr>
        </thead>
        <tbody>
          {properties.map(p => (
            <tr key={p.id}>
              <td>
                <div className="font-semibold text-[13px]">{p.address}</div>
                {p.notes && (
                  <div className="text-[11px] text-text-3 mt-0.5 max-w-[280px] overflow-hidden text-ellipsis whitespace-nowrap">
                    {p.notes}
                  </div>
                )}
              </td>
              <td>
                <span className="text-[16px] leading-none">{countryFlag(p.country)}</span>{' '}
                {p.city}
              </td>
              <td><AgentChip agentId={p.agent} agents={agents} /></td>
              <td className="font-semibold">{fmtPrice(p.listPrice)}</td>
              <td className="text-[12px] text-text-3">
                {p.mlsNum ? (
                  p.zillow
                    ? <a href={p.zillow} target="_blank" rel="noreferrer" className="text-blue">{p.mlsNum}</a>
                    : p.mlsNum
                ) : '—'}
              </td>
              <td><Badge cls={mlsStatusClass(p.mlsStatus)}>{mlsStatusLabel(p.mlsStatus, p.country)}</Badge></td>
              <td className="text-[12px] text-text-3">{p.listingExp || '—'}</td>
              {canEdit && (
                <td>
                  <button className={BTN_GHOST} onClick={() => onEdit(p)}>Editar</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
