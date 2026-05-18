'use client'
import { useData } from '@/context/DataContext'
import type { Operation } from '@/lib/types'

const DOC_TYPES: { label: string; key: keyof Operation }[] = [
  { label: 'Compensation Agreement', key: 'compSigned' },
  { label: 'Lead-Based Paint Disclosure', key: 'lbp' },
  { label: 'Seller Disclosure', key: 'sd' },
  { label: 'Flood Disclosure', key: 'flood' },
  { label: 'Condo Docs', key: 'condoDocs' },
  { label: 'Condo Rider', key: 'condoRider' },
]

const CHK_BASE = 'inline-flex items-center justify-center w-6 h-6 rounded-[5px] text-[12px] font-bold select-none'

export default function Documentos() {
  const { operations } = useData()
  const activas = operations.filter(o => o.status === 'ACTIVA')

  return (
    <div className="bg-surface border border-border rounded-[10px] overflow-hidden mb-5">
      <div className="px-[18px] py-3.5 border-b border-border flex items-center justify-between">
        <span className="text-[13px] font-semibold text-text-primary">Documents by active operation</span>
      </div>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Property</th>
              {DOC_TYPES.map(d => <th key={d.key}>{d.label}</th>)}
            </tr>
          </thead>
          <tbody>
            {activas.map(op => (
              <tr key={op.id}>
                <td><div className="font-semibold text-[13px]">{op.address}</div></td>
                {DOC_TYPES.map(d => (
                  <td key={d.key} style={{ textAlign: 'center' }}>
                    {op[d.key] === 'na'
                      ? <span className={`${CHK_BASE} bg-[#F0F0F0] text-text-3 text-[9px] border border-dashed border-border`}>N/A</span>
                      : op[d.key] === true
                        ? <span className={`${CHK_BASE} bg-green-bg text-green`}>✓</span>
                        : <span className={`${CHK_BASE} bg-bg text-text-3 border border-border`}>–</span>
                    }
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
