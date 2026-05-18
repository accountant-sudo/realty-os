'use client'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useData } from '@/context/DataContext'
import { fmtPrice, agentName } from '@/lib/helpers'

const BTN_SECONDARY = 'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[6px] text-[13px] font-medium cursor-pointer border transition-all bg-surface text-text-2 border-border hover:bg-bg'

interface ZillowEntry {
  zestimate: number
  daysOnMarket: number
  zoneAvgDays: number
  views: number
  saves: number
  pricePerSqft: number
  zoneAvgPpsf: number
}

const ZILLOW_DATA: Record<number, ZillowEntry> = {
  1: { zestimate: 168000, daysOnMarket: 28, zoneAvgDays: 22, views: 312, saves: 18, pricePerSqft: 142, zoneAvgPpsf: 138 },
  2: { zestimate: 295000, daysOnMarket: 51, zoneAvgDays: 30, views: 187, saves: 9,  pricePerSqft: 210, zoneAvgPpsf: 225 },
  3: { zestimate: 318000, daysOnMarket: 27, zoneAvgDays: 35, views: 441, saves: 31, pricePerSqft: 285, zoneAvgPpsf: 270 },
  4: { zestimate: 91000,  daysOnMarket: 20, zoneAvgDays: 18, views: 528, saves: 42, pricePerSqft: 73,  zoneAvgPpsf: 78  },
  5: { zestimate: 158000, daysOnMarket: 14, zoneAvgDays: 28, views: 263, saves: 15, pricePerSqft: 155, zoneAvgPpsf: 160 },
}

export default function Zillow() {
  const { operations, agents } = useData()
  const router = useRouter()

  const activas = operations.filter(o => o.status === 'ACTIVA' && ZILLOW_DATA[o.id])
  const alerts  = activas.filter(o => ZILLOW_DATA[o.id].daysOnMarket > ZILLOW_DATA[o.id].zoneAvgDays + 7)

  const aboveMarket  = activas.filter(o => o.price > ZILLOW_DATA[o.id].zestimate).length
  const avgDays      = activas.length ? Math.round(activas.reduce((s, o) => s + ZILLOW_DATA[o.id].daysOnMarket, 0) / activas.length) : 0
  const totalViews   = activas.reduce((s, o) => s + ZILLOW_DATA[o.id].views, 0)

  function downloadCSV() {
    let csv = 'Property,List Price,Zestimate,Difference,Days on Market,Views,Saves,Price/sqft\n'
    activas.forEach(o => {
      const z = ZILLOW_DATA[o.id]
      const diff = o.price - z.zestimate
      csv += `"${o.address}",${o.price},${z.zestimate},${diff},${z.daysOnMarket},${z.views},${z.saves},${z.pricePerSqft}\n`
    })
    const blob = new Blob([csv], { type: 'text/csv' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `zillow_report_${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    toast('Report downloaded')
  }

  return (
    <>
      {/* Action buttons */}
      <div className="flex justify-end gap-2 mb-5">
        <button className={BTN_SECONDARY} onClick={downloadCSV}>⬇ Download report</button>
        <button className={BTN_SECONDARY} onClick={() => toast('Refreshing Zillow data…')}>↻ Refresh</button>
      </div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="flex flex-col gap-2 mb-5">
          {alerts.map(o => {
            const z = ZILLOW_DATA[o.id]
            return (
              <div key={o.id} className="flex items-start gap-2 px-3.5 py-3 rounded-[6px] text-[13px] bg-amber-bg text-amber border border-[#F0D070]">
                <span>⚠</span>
                <span>
                  <strong>{o.address}</strong> has been on the market for {z.daysOnMarket} days (zone avg: {z.zoneAvgDays} days). May need a price adjustment.
                </span>
              </div>
            )
          })}
        </div>
      )}

      {/* Stats grid */}
      <div className="grid grid-cols-4 gap-4 mb-5">
        {[
          { label: 'Properties analyzed', val: activas.length, cls: 'text-gold' },
          { label: 'Price above market',  val: aboveMarket,    cls: 'text-red'  },
          { label: 'Avg. days on market', val: avgDays,        cls: ''          },
          { label: 'Total Zillow views',  val: totalViews.toLocaleString(), cls: '' },
        ].map(s => (
          <div key={s.label} className="bg-surface border border-border rounded-[10px] px-5 py-4">
            <div className="text-[12px] text-text-3 mb-2">{s.label}</div>
            <div className={`text-[28px] font-bold leading-none ${s.cls}`}>{s.val}</div>
          </div>
        ))}
      </div>

      {/* Comparison table */}
      <div className="bg-surface border border-border rounded-[10px] overflow-hidden mb-3">
        <div className="px-[18px] py-3.5 border-b border-border flex items-center justify-between">
          <span className="text-[13px] font-semibold text-text-primary">Market comparison</span>
          <span className="text-[11px] text-text-3">Data: Zillow · Updated today</span>
        </div>
        <div className="overflow-x-auto">
          <table style={{ minWidth: 820 }}>
            <thead>
              <tr>
                {['Property', 'List price', 'Zestimate', 'Difference', 'Days on market', 'Views', 'Price/sqft'].map(h => (
                  <th key={h} className="text-left text-[11px] font-semibold text-text-3 uppercase tracking-wider px-[18px] py-2.5 border-b border-border whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {activas.map(o => {
                const z = ZILLOW_DATA[o.id]
                const diff    = o.price - z.zestimate
                const pct     = ((diff / z.zestimate) * 100).toFixed(1)
                const daysDiff = z.daysOnMarket - z.zoneAvgDays
                const priceColor = diff > 0 ? 'text-red' : 'text-green'
                const daysColor  = daysDiff > 5 ? 'text-red' : daysDiff < -3 ? 'text-green' : 'text-amber'
                return (
                  <tr
                    key={o.id}
                    className="border-b border-border last:border-b-0 hover:bg-bg cursor-pointer transition-colors"
                    onClick={() => router.push(`/intranet/operations/${o.id}`)}
                  >
                    <td className="px-[18px] py-3 align-middle">
                      <div className="font-semibold text-[13px]">{o.address}</div>
                      <div className="text-[11px] text-text-3">{o.type} · {agentName(o.agent, agents)}</div>
                    </td>
                    <td className="px-[18px] py-3 align-middle font-semibold text-[13px]">
                      {fmtPrice(o.price)}
                    </td>
                    <td className="px-[18px] py-3 align-middle font-semibold text-[13px]">
                      {fmtPrice(z.zestimate)}
                    </td>
                    <td className="px-[18px] py-3 align-middle">
                      <div className={`font-bold text-[13px] ${priceColor}`}>
                        {diff > 0 ? '+' : ''}${Math.abs(diff).toLocaleString()}
                      </div>
                      <div className={`text-[11px] ${priceColor}`}>
                        {diff > 0 ? '+' : ''}{pct}%
                      </div>
                    </td>
                    <td className="px-[18px] py-3 align-middle">
                      <div className={`font-semibold text-[13px] ${daysColor}`}>{z.daysOnMarket} days</div>
                      <div className="text-[11px] text-text-3">Zone: {z.zoneAvgDays} days</div>
                    </td>
                    <td className="px-[18px] py-3 align-middle">
                      <div className="font-semibold text-[13px]">{z.views.toLocaleString()}</div>
                      <div className="text-[11px] text-text-3">{z.saves} saves</div>
                    </td>
                    <td className="px-[18px] py-3 align-middle">
                      <div className="font-semibold text-[13px]">${z.pricePerSqft}/sqft</div>
                      <div className="text-[11px] text-text-3">Zone: ${z.zoneAvgPpsf}</div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-[11px] text-text-3 text-center">
        * Estimated data. In the final version these update automatically via API.
      </p>
    </>
  )
}
