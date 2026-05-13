'use client'
import { USERS } from '@/lib/users'
import Badge from '@/components/intranet/ui/Badge'
import type { Role } from '@/lib/types'

const ROLE_LABEL: Record<Role, string> = { admin: 'Admin', manager: 'Manager', agente: 'Agente' }
const ROLE_CLS: Record<Role, string> = {
  admin: 'bg-[#F0EDFF] text-[#5B3FBF]',
  manager: 'bg-blue-bg text-blue',
  agente: 'bg-blue-bg text-blue',
}

export default function Usuarios() {
  const users = Object.entries(USERS).map(([username, u]) => ({ username, ...u }))

  return (
    <div className="bg-surface border border-border rounded-[10px] overflow-hidden mb-5">
      <div className="px-[18px] py-3.5 border-b border-border flex items-center justify-between">
        <span className="text-[13px] font-semibold text-text-primary">Usuarios del sistema</span>
        <span className="text-[12px] text-text-3">{users.length} usuarios</span>
      </div>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Nombre</th>
              <th>Rol</th>
              <th>Iniciales</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.username}>
                <td className="font-mono text-[13px]">{u.username}</td>
                <td className="font-semibold">{u.name}</td>
                <td>
                  <Badge cls={ROLE_CLS[u.role]}>{ROLE_LABEL[u.role]}</Badge>
                </td>
                <td>
                  <div className="inline-flex w-7 h-7 rounded-full bg-gold items-center justify-center text-[11px] font-semibold text-text-primary">
                    {u.initials}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
