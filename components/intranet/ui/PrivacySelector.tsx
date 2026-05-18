'use client'
import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Globe, Lock, X, Check, Loader2, ChevronDown, ShieldCheck } from 'lucide-react'
import { toast } from 'sonner'

const ROLES = [
  {
    value: 'admin',
    label: 'Admin',
    description: 'Full access to all views except permissions',
  },
  {
    value: 'manager',
    label: 'Manager',
    description: 'Access to all views except commissions and permissions',
  },
  {
    value: 'agente',
    label: 'Agent',
    description: 'Limited to MLS, operations, and documents',
  },
] as const

interface Props {
  fileId: number
  operationId: number
  filename: string
  visibility: 'public' | 'private'
  allowedRoles: string[]
  canEdit: boolean
  onUpdated: (visibility: 'public' | 'private', allowedRoles: string[]) => void
}

export default function PrivacySelector({
  fileId, operationId, filename, visibility, allowedRoles, canEdit, onUpdated,
}: Props) {
  const [open, setOpen]     = useState(false)
  const [draft, setDraft]   = useState({ visibility, allowedRoles })
  const [saving, setSaving] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])
  useEffect(() => { setDraft({ visibility, allowedRoles }) }, [visibility, allowedRoles])

  // Prevent body scroll when modal open
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  function toggleRole(role: string) {
    setDraft(d => ({
      ...d,
      allowedRoles: d.allowedRoles.includes(role)
        ? d.allowedRoles.filter(r => r !== role)
        : [...d.allowedRoles, role],
    }))
  }

  function cancel() {
    setDraft({ visibility, allowedRoles })
    setOpen(false)
  }

  async function save() {
    if (draft.visibility === 'private' && draft.allowedRoles.length === 0) {
      toast.error('Select at least one role')
      return
    }
    setSaving(true)
    try {
      const res = await fetch(
        `/api/operations/${operationId}/files?fileId=${fileId}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(draft),
        }
      )
      if (!res.ok) {
        const d = await res.json().catch(() => ({})) as Record<string, unknown>
        toast.error((d.error as string) ?? 'Failed to update')
        return
      }
      onUpdated(draft.visibility as 'public' | 'private', draft.allowedRoles)
      setOpen(false)
    } catch {
      toast.error('Failed to update')
    } finally {
      setSaving(false)
    }
  }

  const isPrivate = visibility === 'private'
  const isDirty   = draft.visibility !== visibility ||
    JSON.stringify([...draft.allowedRoles].sort()) !== JSON.stringify([...allowedRoles].sort())

  const badge = (
    <button
      onClick={() => canEdit && setOpen(true)}
      disabled={!canEdit}
      title={isPrivate ? `Private · ${allowedRoles.map(r => ROLES.find(x => x.value === r)?.label ?? r).join(', ')}` : 'Shared with all roles'}
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium border transition-colors ${
        isPrivate
          ? 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100 dark:bg-amber-950/30 dark:border-amber-800 dark:text-amber-400'
          : 'bg-bg border-border text-text-3 hover:border-gold hover:text-gold'
      } disabled:cursor-default`}
    >
      {isPrivate ? <Lock size={9} /> : <Globe size={9} />}
      {isPrivate ? 'Private' : 'Shared'}
      {canEdit && <ChevronDown size={9} />}
    </button>
  )

  const modal = open && mounted && createPortal(
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={cancel}
      />

      {/* Modal card */}
      <div className="relative bg-surface border border-border rounded-[14px] shadow-2xl w-full max-w-[420px] overflow-hidden flex flex-col">

        {/* Header */}
        <div className="px-6 py-4 border-b border-border flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[13px] font-semibold text-text-primary">Access control</p>
            <p className="text-[11px] text-text-3 mt-0.5 truncate" title={filename}>{filename}</p>
          </div>
          <button
            onClick={cancel}
            className="p-1 rounded-[6px] hover:bg-bg text-text-3 transition-colors shrink-0"
          >
            <X size={15} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-5">

          {/* Visibility cards */}
          <div>
            <p className="text-[11px] font-semibold text-text-3 uppercase tracking-wider mb-3">Visibility</p>
            <div className="grid grid-cols-2 gap-2.5">
              {/* Shared card */}
              <button
                onClick={() => setDraft(d => ({ ...d, visibility: 'public' }))}
                className={`flex flex-col items-start gap-1.5 px-4 py-3 rounded-[10px] border-2 text-left transition-all ${
                  draft.visibility === 'public'
                    ? 'border-gold bg-gold/5'
                    : 'border-border hover:border-gold/50 bg-bg'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <Globe size={16} className={draft.visibility === 'public' ? 'text-gold' : 'text-text-3'} />
                  {draft.visibility === 'public' && (
                    <Check size={13} className="text-gold" />
                  )}
                </div>
                <p className={`text-[12px] font-semibold ${draft.visibility === 'public' ? 'text-text-primary' : 'text-text-2'}`}>
                  Shared
                </p>
                <p className="text-[11px] text-text-3 leading-relaxed">
                  Visible to all roles with access to this operation.
                </p>
              </button>

              {/* Private card */}
              <button
                onClick={() => setDraft(d => ({ ...d, visibility: 'private' }))}
                className={`flex flex-col items-start gap-1.5 px-4 py-3 rounded-[10px] border-2 text-left transition-all ${
                  draft.visibility === 'private'
                    ? 'border-amber-400 bg-amber-50/60 dark:bg-amber-950/20'
                    : 'border-border hover:border-amber-300 bg-bg'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <Lock size={16} className={draft.visibility === 'private' ? 'text-amber-600' : 'text-text-3'} />
                  {draft.visibility === 'private' && (
                    <Check size={13} className="text-amber-600" />
                  )}
                </div>
                <p className={`text-[12px] font-semibold ${draft.visibility === 'private' ? 'text-amber-800 dark:text-amber-300' : 'text-text-2'}`}>
                  Private
                </p>
                <p className="text-[11px] text-text-3 leading-relaxed">
                  Only visible to the roles you select below.
                </p>
              </button>
            </div>
          </div>

          {/* Role selector — only when private */}
          {draft.visibility === 'private' && (
            <div>
              <p className="text-[11px] font-semibold text-text-3 uppercase tracking-wider mb-3">Who can see this file?</p>
              <div className="space-y-2">
                {ROLES.map(r => {
                  const checked = draft.allowedRoles.includes(r.value)
                  return (
                    <button
                      key={r.value}
                      onClick={() => toggleRole(r.value)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-[10px] border-2 text-left transition-all ${
                        checked
                          ? 'border-amber-300 bg-amber-50/60 dark:bg-amber-950/20'
                          : 'border-border hover:border-amber-200 bg-bg'
                      }`}
                    >
                      {/* Custom checkbox */}
                      <div className={`w-4 h-4 rounded-[4px] border-2 flex items-center justify-center shrink-0 transition-all ${
                        checked
                          ? 'border-amber-500 bg-amber-500'
                          : 'border-border bg-surface'
                      }`}>
                        {checked && <Check size={10} className="text-white" strokeWidth={3} />}
                      </div>
                      <div className="min-w-0">
                        <p className={`text-[12px] font-semibold ${checked ? 'text-text-primary' : 'text-text-2'}`}>
                          {r.label}
                        </p>
                        <p className="text-[11px] text-text-3">{r.description}</p>
                      </div>
                    </button>
                  )
                })}
              </div>

              {draft.allowedRoles.length === 0 && (
                <p className="text-[12px] text-red-500 mt-2 flex items-center gap-1.5">
                  <X size={12} /> Select at least one role
                </p>
              )}

              {/* Super admin note */}
              <div className="flex items-start gap-2 mt-3 px-3 py-2.5 bg-bg rounded-[8px] border border-border">
                <ShieldCheck size={13} className="text-text-3 shrink-0 mt-0.5" />
                <p className="text-[11px] text-text-3 leading-relaxed">
                  <span className="font-semibold text-text-2">Super admin</span> always has access to all files regardless of privacy settings.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border flex items-center justify-between gap-3">
          <p className="text-[11px] text-text-3">
            {isDirty ? 'Unsaved changes' : ''}
          </p>
          <div className="flex gap-2">
            <button
              onClick={cancel}
              className="px-4 py-2 rounded-[8px] text-[12px] font-medium border border-border text-text-2 hover:bg-bg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={save}
              disabled={saving || (draft.visibility === 'private' && draft.allowedRoles.length === 0)}
              className="px-4 py-2 rounded-[8px] text-[12px] font-medium bg-gold border border-gold text-white hover:bg-gold-dark disabled:opacity-50 transition-colors flex items-center gap-1.5"
            >
              {saving && <Loader2 size={12} className="animate-spin" />}
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )

  return (
    <>
      {badge}
      {modal}
    </>
  )
}
