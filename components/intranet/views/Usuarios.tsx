'use client'
import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import { useAuth } from '@/context/AuthContext'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import Badge from '@/components/intranet/ui/Badge'
import type { Role, NavView, UserRecord } from '@/lib/types'

// ── Styles ──────────────────────────────────────────────────────────────────
const I = 'w-full px-3 py-2 border border-border rounded-[6px] text-[13px] bg-surface focus:outline-none focus:border-gold focus:ring-[3px] focus:ring-gold-light transition-colors font-[inherit]'
const L = 'text-[12px] font-semibold text-text-2 mb-1 block'
const BTN_P = 'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[6px] text-[13px] font-medium cursor-pointer border transition-all bg-gold text-text-primary border-gold hover:bg-gold-dark hover:border-gold-dark hover:text-white disabled:opacity-50 disabled:cursor-not-allowed'
const BTN_S = 'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[6px] text-[13px] font-medium cursor-pointer border transition-all bg-surface text-text-2 border-border hover:bg-bg'
const BTN_GHOST = 'inline-flex items-center px-2.5 py-1 rounded-[6px] text-[12px] font-medium cursor-pointer border bg-transparent text-text-2 border-transparent hover:bg-bg'
const BTN_DANGER = 'inline-flex items-center px-2.5 py-1 rounded-[6px] text-[12px] font-medium cursor-pointer border bg-transparent text-red-400 border-transparent hover:bg-red-950/30'

const ROLE_LABEL: Record<string, string> = {
  super_admin: 'Super Admin',
  admin: 'Admin',
  manager: 'Manager',
  agente: 'Agent',
}
const ROLE_CLS: Record<string, string> = {
  super_admin: 'bg-[#EDE9FE] text-[#5B21B6]',
  admin: 'bg-[#F0EDFF] text-[#5B3FBF]',
  manager: 'bg-blue-bg text-blue',
  agente: 'bg-blue-bg text-blue',
}
const ROLE_ORDER: string[] = ['super_admin', 'admin', 'manager', 'agente']

const ALL_VIEWS: NavView[] = [
  'dashboard', 'mls', 'operations', 'documents',
  'zillow', 'zonaprop', 'commissions', 'users',
]
const VIEW_LABELS: Partial<Record<NavView, string>> = {
  dashboard: 'Dashboard', mls: 'MLS', operations: 'Operations',
  documents: 'Documents', zillow: 'Zillow', zonaprop: 'ZonaProp',
  commissions: 'Commissions', users: 'Users',
}
const ACTION_LABEL: Record<string, string> = {
  create_user: 'Create user',
  update_user_role: 'Change role',
  delete_user: 'Delete user',
  reset_password: 'Reset password',
  update_permissions: 'Update permissions',
}

type TabId = 'users' | 'permissions' | 'activity'

interface RolePerm { id: number; role: string; allowedViews: string[]; canEdit: boolean }
interface LogEntry {
  id: number; userId: number; username: string; action: string
  resource: string; resourceId: string | null; metadata: Record<string, unknown> | null
  createdAt: string
}

// ── Main component ────────────────────────────────────────────────────────────
export default function Usuarios() {
  const { isSuperAdmin } = useAuth()
  const searchParams = useSearchParams()
  const defaultTab = (searchParams.get('tab') as TabId) ?? 'users'
  const [tab, setTab] = useState<TabId>(defaultTab)

  return (
    <div>
      {/* Tabs */}
      <div className="flex border-b border-border mb-6">
        {(['users', ...(isSuperAdmin() ? ['permissions', 'activity'] : [])] as TabId[]).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-3 text-[13px] font-medium border-b-2 transition-colors capitalize ${
              tab === t ? 'border-gold text-gold' : 'border-transparent text-text-3 hover:text-text-2'
            }`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {tab === 'users' && <TabUsuarios isSuperAdmin={isSuperAdmin()} />}
      {tab === 'permissions' && isSuperAdmin() && <TabPermisos />}
      {tab === 'activity' && isSuperAdmin() && <TabActividad />}
    </div>
  )
}

// ── Tab: Usuarios ─────────────────────────────────────────────────────────────
function TabUsuarios({ isSuperAdmin }: { isSuperAdmin: boolean }) {
  const [users, setUsers] = useState<UserRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [createOpen, setCreateOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<UserRecord | null>(null)
  const [resetTarget, setResetTarget] = useState<UserRecord | null>(null)
  const [tempPassword, setTempPassword] = useState('')

  const fetchUsers = useCallback(() => {
    setLoading(true)
    fetch('/api/users').then(r => r.json()).then(setUsers).catch(console.error).finally(() => setLoading(false))
  }, [])

  useEffect(() => { fetchUsers() }, [fetchUsers])

  async function handleRoleChange(userId: number, newRole: string) {
    const res = await fetch(`/api/users/${userId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: newRole }),
    })
    if (res.ok) {
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole as Role } : u))
      toast('Rol actualizado')
    } else {
      const d = await res.json()
      toast(d.error ?? 'Error al cambiar rol')
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return
    const res = await fetch(`/api/users/${deleteTarget.id}`, { method: 'DELETE' })
    if (res.ok) {
      setUsers(prev => prev.filter(u => u.id !== deleteTarget.id))
      toast('Usuario eliminado')
    } else {
      const d = await res.json()
      toast(d.error ?? 'Error al eliminar')
    }
    setDeleteTarget(null)
  }

  async function handleResetPassword(u: UserRecord) {
    setResetTarget(u)
    setTempPassword('')
    const res = await fetch(`/api/users/${u.id}/reset-password`, { method: 'POST' })
    if (res.ok) {
      const d = await res.json()
      setTempPassword(d.tempPassword)
    } else {
      const d = await res.json()
      toast(d.error ?? 'Error al resetear contraseña')
      setResetTarget(null)
    }
  }

  const grouped = ROLE_ORDER.map(role => ({
    role,
    users: users.filter(u => u.role === role),
  })).filter(g => g.users.length > 0)

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <span className="text-[13px] text-text-3">{users.length} users</span>
        {isSuperAdmin && (
          <button className={BTN_P} onClick={() => setCreateOpen(true)}>+ New user</button>
        )}
      </div>

      {loading ? (
        <div className="text-[13px] text-text-3 py-8 text-center">Loading…</div>
      ) : (
        <div className="space-y-6">
          {grouped.map(({ role, users: roleUsers }) => (
            <div key={role} className="bg-surface border border-border rounded-[10px] overflow-hidden">
              <div className="px-4 py-3 border-b border-border flex items-center gap-2">
                <Badge cls={ROLE_CLS[role]}>{ROLE_LABEL[role]}</Badge>
                <span className="text-[12px] text-text-3">{roleUsers.length} user{roleUsers.length !== 1 ? 's' : ''}</span>
              </div>
              <div className="overflow-x-auto">
                <table>
                  <thead>
                    <tr>
                      <th>Username</th>
                      <th>Name</th>
                      <th>Initials</th>
                      {isSuperAdmin && role !== 'super_admin' && <th>Change role</th>}
                      {isSuperAdmin && <th></th>}
                    </tr>
                  </thead>
                  <tbody>
                    {roleUsers.map(u => (
                      <tr key={u.id}>
                        <td className="font-mono text-[13px]">{u.username}</td>
                        <td className="font-semibold">{u.name}</td>
                        <td>
                          <div className="inline-flex w-7 h-7 rounded-full bg-gold items-center justify-center text-[11px] font-semibold text-text-primary">
                            {u.initials}
                          </div>
                        </td>
                        {isSuperAdmin && role !== 'super_admin' && (
                          <td>
                            <select
                              className="px-2 py-1 border border-border rounded-[6px] text-[12px] bg-surface cursor-pointer"
                              value={u.role}
                              onChange={e => handleRoleChange(u.id, e.target.value)}
                            >
                              <option value="admin">Admin</option>
                              <option value="manager">Manager</option>
                              <option value="agente">Agent</option>
                            </select>
                          </td>
                        )}
                        {isSuperAdmin && (
                          <td>
                            <div className="flex items-center gap-1">
                              <button className={BTN_GHOST} onClick={() => handleResetPassword(u)}>
                                Reset pass
                              </button>
                              {role !== 'super_admin' && (
                                <button className={BTN_DANGER} onClick={() => setDeleteTarget(u)}>
                                  Delete
                                </button>
                              )}
                            </div>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create user modal */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="max-w-[480px]">
          <DialogHeader><DialogTitle>New user</DialogTitle></DialogHeader>
          <CreateUserForm
            onCreated={u => { setUsers(prev => [...prev, u]); setCreateOpen(false); toast('User created') }}
            onCancel={() => setCreateOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Delete confirm */}
      <Dialog open={!!deleteTarget} onOpenChange={open => !open && setDeleteTarget(null)}>
        <DialogContent className="max-w-[420px]">
          <DialogHeader><DialogTitle>Delete user</DialogTitle></DialogHeader>
          <p className="text-[13px] text-text-2 py-2">
            Delete <span className="font-semibold text-text-1">{deleteTarget?.name}</span> ({deleteTarget?.username})?
            This action is not reversible in the UI.
          </p>
          <div className="flex justify-end gap-2.5 pt-2 border-t border-border">
            <button className={BTN_S} onClick={() => setDeleteTarget(null)}>Cancel</button>
            <button
              className="inline-flex items-center px-3.5 py-1.5 rounded-[6px] text-[13px] font-medium cursor-pointer border bg-red-600 text-white border-red-600 hover:bg-red-700"
              onClick={handleDelete}
            >Delete</button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Reset password result */}
      <Dialog open={!!resetTarget} onOpenChange={open => { if (!open) { setResetTarget(null); setTempPassword('') } }}>
        <DialogContent className="max-w-[400px]">
          <DialogHeader><DialogTitle>Temporary password</DialogTitle></DialogHeader>
          {tempPassword ? (
            <>
              <p className="text-[13px] text-text-2 py-2">
                New password for <span className="font-semibold text-text-1">{resetTarget?.name}</span>:
              </p>
              <div className="bg-bg border border-border rounded-[8px] px-4 py-3 font-mono text-[16px] font-semibold text-gold tracking-wider text-center">
                {tempPassword}
              </div>
              <p className="text-[11px] text-text-3 mt-2 text-center">
                Copy now — will not be shown again
              </p>
              <div className="flex justify-end pt-3 border-t border-border">
                <button className={BTN_P} onClick={() => { setResetTarget(null); setTempPassword('') }}>
                  Got it
                </button>
              </div>
            </>
          ) : (
            <div className="py-6 text-center text-[13px] text-text-3">Generating password…</div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

// ── Create user form ───────────────────────────────────────────────────────────
function CreateUserForm({ onCreated, onCancel }: { onCreated: (u: UserRecord) => void; onCancel: () => void }) {
  const [form, setForm] = useState({ username: '', password: '', name: '', initials: '', role: 'agente' })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  function handleNameChange(name: string) {
    const initials = name.trim().split(' ').map(w => w[0] ?? '').join('').slice(0, 2).toUpperCase()
    setForm(f => ({ ...f, name, initials }))
  }

  async function handleSubmit() {
    if (!form.username.trim() || !form.password || !form.name.trim()) {
      setError('Usuario, nombre y contraseña son requeridos')
      return
    }
    setSaving(true)
    setError('')
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    const data = await res.json()
    setSaving(false)
    if (!res.ok) { setError(data.error ?? 'Error al crear usuario'); return }
    onCreated(data)
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-4 py-2">
        <div className="col-span-2 flex flex-col gap-1">
          <label className={L}>Nombre completo</label>
          <input className={I} value={form.name} onChange={e => handleNameChange(e.target.value)} placeholder="María García" />
        </div>
        <div className="flex flex-col gap-1">
          <label className={L}>Usuario</label>
          <input className={I} value={form.username} onChange={e => setForm(f => ({ ...f, username: e.target.value.toLowerCase() }))} placeholder="maria" />
        </div>
        <div className="flex flex-col gap-1">
          <label className={L}>Iniciales</label>
          <input className={I} value={form.initials} onChange={e => setForm(f => ({ ...f, initials: e.target.value.toUpperCase().slice(0, 2) }))} maxLength={2} />
        </div>
        <div className="flex flex-col gap-1">
          <label className={L}>Contraseña</label>
          <input className={I} type="password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} />
        </div>
        <div className="flex flex-col gap-1">
          <label className={L}>Rol</label>
          <select className={I} value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))}>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="agente">Agente</option>
          </select>
        </div>
      </div>
      {error && <p className="text-[12px] text-red-400 mt-1">{error}</p>}
      <div className="flex justify-end gap-2.5 pt-3 border-t border-border">
        <button className={BTN_S} onClick={onCancel}>Cancelar</button>
        <button className={BTN_P} onClick={handleSubmit} disabled={saving}>
          {saving ? 'Creando…' : 'Crear usuario'}
        </button>
      </div>
    </>
  )
}

// ── Tab: Permisos ─────────────────────────────────────────────────────────────
function TabPermisos() {
  const [perms, setPerms] = useState<Record<string, RolePerm>>({})
  const [draft, setDraft] = useState<Record<string, { allowedViews: Set<string>; canEdit: boolean }>>({})
  const [saving, setSaving] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    fetch('/api/permissions').then(r => r.json()).then((data: RolePerm[]) => {
      const map: Record<string, RolePerm> = {}
      const draftMap: Record<string, { allowedViews: Set<string>; canEdit: boolean }> = {}
      for (const p of data) {
        map[p.role] = p
        draftMap[p.role] = { allowedViews: new Set(p.allowedViews), canEdit: p.canEdit }
      }
      // Ensure all 3 roles exist in draft
      for (const r of ['admin', 'manager', 'agente']) {
        if (!draftMap[r]) draftMap[r] = { allowedViews: new Set(), canEdit: false }
      }
      setPerms(map)
      setDraft(draftMap)
      setLoaded(true)
    }).catch(console.error)
  }, [])

  function toggleView(role: string, view: string) {
    setDraft(prev => {
      const set = new Set(prev[role]?.allowedViews ?? [])
      set.has(view) ? set.delete(view) : set.add(view)
      return { ...prev, [role]: { ...prev[role], allowedViews: set } }
    })
  }

  function toggleCanEdit(role: string) {
    setDraft(prev => ({ ...prev, [role]: { ...prev[role], canEdit: !prev[role]?.canEdit } }))
  }

  async function handleSave() {
    setSaving(true)
    for (const role of ['admin', 'manager', 'agente']) {
      const d = draft[role]
      if (!d) continue
      await fetch('/api/permissions', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role, allowedViews: Array.from(d.allowedViews), canEdit: d.canEdit }),
      })
    }
    setSaving(false)
    toast('Permisos guardados. Los cambios aplican al próximo inicio de sesión.')
  }

  if (!loaded) return <div className="text-[13px] text-text-3 py-8 text-center">Cargando…</div>

  const editableRoles = ['admin', 'manager', 'agente']

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-[13px] text-text-3">Los cambios aplican al próximo inicio de sesión</p>
        <button className={BTN_P} onClick={handleSave} disabled={saving}>
          {saving ? 'Guardando…' : 'Guardar permisos'}
        </button>
      </div>

      <div className="bg-surface border border-border rounded-[10px] overflow-hidden">
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Rol</th>
                {ALL_VIEWS.map(v => <th key={v}>{VIEW_LABELS[v] ?? v}</th>)}
                <th>Puede editar</th>
              </tr>
            </thead>
            <tbody>
              {/* super_admin: read-only full access row */}
              <tr>
                <td><Badge cls={ROLE_CLS.super_admin}>{ROLE_LABEL.super_admin}</Badge></td>
                {ALL_VIEWS.map(v => (
                  <td key={v} className="text-center">
                    <span className="text-green-500 text-[14px]">✓</span>
                  </td>
                ))}
                <td className="text-center"><span className="text-green-500 text-[14px]">✓</span></td>
              </tr>

              {editableRoles.map(role => (
                <tr key={role}>
                  <td><Badge cls={ROLE_CLS[role]}>{ROLE_LABEL[role]}</Badge></td>
                  {ALL_VIEWS.map(v => (
                    <td key={v} className="text-center">
                      <input
                        type="checkbox"
                        checked={draft[role]?.allowedViews.has(v) ?? false}
                        onChange={() => toggleView(role, v)}
                        className="w-4 h-4 accent-gold cursor-pointer"
                      />
                    </td>
                  ))}
                  <td className="text-center">
                    <input
                      type="checkbox"
                      checked={draft[role]?.canEdit ?? false}
                      onChange={() => toggleCanEdit(role)}
                      className="w-4 h-4 accent-gold cursor-pointer"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// ── Tab: Actividad ────────────────────────────────────────────────────────────
function TabActividad() {
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/activity-logs?limit=200')
      .then(r => r.json())
      .then(setLogs)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  function formatDate(iso: string) {
    const d = new Date(iso)
    return d.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: '2-digit' })
      + ' ' + d.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })
  }

  function formatMeta(log: LogEntry) {
    if (!log.metadata) return '—'
    const m = log.metadata
    if (log.action === 'update_user_role') return `${m.targetUsername}: ${m.prevRole} → ${m.newRole}`
    if (log.action === 'create_user') return `${m.newUsername} (${m.role})`
    if (log.action === 'delete_user') return `${m.deletedUsername} (${m.role})`
    if (log.action === 'reset_password') return `${m.targetUsername}`
    if (log.action === 'update_permissions') return `${log.resourceId}: ${(m.allowedViews as string[]).join(', ')}`
    return JSON.stringify(m)
  }

  if (loading) return <div className="text-[13px] text-text-3 py-8 text-center">Cargando…</div>

  return (
    <div className="bg-surface border border-border rounded-[10px] overflow-hidden">
      <div className="px-4 py-3 border-b border-border flex items-center justify-between">
        <span className="text-[13px] font-semibold text-text-primary">Log de actividad</span>
        <span className="text-[12px] text-text-3">{logs.length} entradas</span>
      </div>
      {logs.length === 0 ? (
        <div className="py-10 text-center text-[13px] text-text-3">Sin actividad registrada</div>
      ) : (
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Usuario</th>
                <th>Acción</th>
                <th>Detalles</th>
              </tr>
            </thead>
            <tbody>
              {logs.map(log => (
                <tr key={log.id}>
                  <td className="text-[12px] text-text-3 whitespace-nowrap">{formatDate(log.createdAt)}</td>
                  <td className="font-mono text-[12px]">{log.username}</td>
                  <td>
                    <span className="text-[12px] px-2 py-0.5 rounded bg-bg border border-border text-text-2">
                      {ACTION_LABEL[log.action] ?? log.action}
                    </span>
                  </td>
                  <td className="text-[12px] text-text-2 max-w-[300px] truncate">{formatMeta(log)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
