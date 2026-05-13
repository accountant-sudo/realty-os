import { agentName } from '@/lib/helpers'
import type { Agent } from '@/lib/types'

const AGENT_COLORS: Record<string, string> = {
  diego: '#1A5FA8', gaston: '#2D7A4F', ilan: '#8A3FBF',
  adolfo: '#C07A00', leo: '#C0392B', sabrina: '#2A7A7A',
  aldana: '#BF3F6A', ilay: '#3F7ABF', karina: '#7ABF3F',
  leonel: '#BF7A3F', tomas: '#3FBFBF', gustavo: '#6B3FBF',
}

export default function AgentChip({ agentId, agents }: { agentId: string; agents: Agent[] }) {
  const name = agentName(agentId, agents)
  const initials = name.substring(0, 2).toUpperCase()
  const bg = AGENT_COLORS[agentId] || '#888'

  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className="inline-flex items-center justify-center w-[22px] h-[22px] rounded-full text-white text-[9px] font-bold flex-shrink-0"
        style={{ backgroundColor: bg }}
      >
        {initials}
      </span>
      {name}
    </span>
  )
}
