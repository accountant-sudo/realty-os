import { agentName } from '@/lib/helpers'
import { AGENT_COLORS } from '@/lib/constants'
import type { Agent } from '@/lib/types'

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
