import { Search } from 'lucide-react'
import type { Agent } from '@/lib/types'

const CITIES = ['All', 'Jacksonville', 'South Florida', 'Orlando']
const INPUT = 'px-3 py-2 border border-border rounded-[6px] text-[13px] bg-bg focus:outline-none focus:border-gold focus:ring-[3px] focus:ring-gold-light transition-colors font-[inherit]'

interface Props {
  search: string
  cityFilter: string
  agentFilter: string
  statusFilter: string
  countryFilter: string
  agents: Agent[]
  onSearch: (v: string) => void
  onCity: (v: string) => void
  onAgent: (v: string) => void
  onStatus: (v: string) => void
  onCountry: (v: string) => void
}

export default function MlsFilters({ search, cityFilter, agentFilter, statusFilter, countryFilter, agents, onSearch, onCity, onAgent, onStatus, onCountry }: Props) {
  return (
    <div className="flex items-center gap-2.5 p-3.5 border-b border-border flex-wrap">
      <div className="relative flex-1 min-w-[180px]">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-3 w-3.5 h-3.5" />
        <input
          className="w-full pl-8 pr-3 py-2 border border-border rounded-[6px] text-[13px] bg-bg focus:outline-none focus:border-gold focus:bg-surface transition-colors"
          placeholder="Search by address, MLS#…"
          value={search}
          onChange={e => onSearch(e.target.value)}
        />
      </div>
      <select className={`${INPUT} w-[110px]`} value={countryFilter} onChange={e => onCountry(e.target.value)}>
        <option value="Todos">🌐 All</option>
        <option value="US">🇺🇸 US</option>
        <option value="AR">🇦🇷 AR</option>
      </select>
      <select className={`${INPUT} w-[160px]`} value={cityFilter} onChange={e => onCity(e.target.value)}>
        {CITIES.map(c => <option key={c}>{c}</option>)}
      </select>
      <select className={`${INPUT} w-[140px]`} value={agentFilter} onChange={e => onAgent(e.target.value)}>
        <option>All</option>
        {agents.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
      </select>
      <select className={`${INPUT} w-[150px]`} value={statusFilter} onChange={e => onStatus(e.target.value)}>
        <option>All</option>
        <option value="published">On MLS</option>
        <option value="under_contract">Under contract</option>
        <option value="withdrawn">Withdrawn</option>
      </select>
    </div>
  )
}
