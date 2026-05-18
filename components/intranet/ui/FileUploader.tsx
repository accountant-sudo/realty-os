'use client'
import {
  useRef, useState, useCallback, forwardRef, useImperativeHandle, useEffect,
} from 'react'
import { createPortal } from 'react-dom'
import {
  Trash2, FileText, ImageIcon, Upload, Loader2, AlertCircle,
  RotateCcw, ExternalLink, Globe, Lock, ChevronDown, Check,
} from 'lucide-react'
import { toast } from 'sonner'
import PrivacySelector from '@/components/intranet/ui/PrivacySelector'
import type { FileAttachment } from '@/lib/types'

export type SavedFile = FileAttachment & { signedUrl: string }

type LocalFile = {
  id: string
  file: File
  localUrl: string
  status: 'pending' | 'uploading' | 'done' | 'error'
  error?: string
  visibility: 'public' | 'private'
  allowedRoles: string[]
}

export interface FileUploaderHandle {
  triggerUpload: () => Promise<{ success: number; failed: number }>
  hasPending: () => boolean
  pendingCount: () => number
}

interface Props {
  entityType: 'mls_property' | 'operation'
  entityId: number
  accept: string
  maxFiles?: number
  files: SavedFile[]
  onUploaded: (file: SavedFile) => void
  onDeleted: (fileId: number) => void
  onPrivacyUpdated?: (fileId: number, visibility: 'public' | 'private', allowedRoles: string[]) => void
  onPendingCountChange?: (n: number) => void
  enablePrivacy?: boolean
  canEdit?: boolean
  autoUpload?: boolean
}

const MAX_FILES = { mls_property: 20, operation: 50 }
const MAX_MB   = { mls_property: 10, operation: 25 }

const ROLES = [
  { value: 'admin',   label: 'Admin',   desc: 'Full access' },
  { value: 'manager', label: 'Manager', desc: 'All views except commissions' },
  { value: 'agente',  label: 'Agent',   desc: 'MLS, operations & documents' },
] as const

function fmtBytes(n: number) {
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(0)} KB`
  return `${(n / 1024 / 1024).toFixed(1)} MB`
}
const isImage = (mime: string) => mime.startsWith('image/')

// ── Main component ───────────────────────────────────────────────────────────

const FileUploader = forwardRef<FileUploaderHandle, Props>(function FileUploader(
  {
    entityType, entityId, accept, files, onUploaded, onDeleted,
    onPrivacyUpdated, onPendingCountChange, enablePrivacy = false,
    canEdit = true, autoUpload = true, maxFiles,
  },
  ref,
) {
  const inputRef               = useRef<HTMLInputElement>(null)
  const [locals, setLocals]    = useState<LocalFile[]>([])
  const [deleting, setDeleting]= useState<number | null>(null)
  const [dragging, setDragging]= useState(false)

  const limit = maxFiles ?? MAX_FILES[entityType]
  const maxMb = MAX_MB[entityType]

  // Notify parent of pending count changes
  useEffect(() => {
    onPendingCountChange?.(locals.filter(l => l.status === 'pending').length)
  }, [locals, onPendingCountChange])

  // ── Imperative API ──────────────────────────────────────────────────────
  useImperativeHandle(ref, () => ({
    hasPending:   () => locals.some(l => l.status === 'pending'),
    pendingCount: () => locals.filter(l => l.status === 'pending').length,
    triggerUpload: async () => {
      const pending = locals.filter(l => l.status === 'pending')
      if (!pending.length) return { success: 0, failed: 0 }
      let success = 0, failed = 0
      for (const local of pending) {
        setLocals(prev => prev.map(l => l.id === local.id ? { ...l, status: 'uploading', error: undefined } : l))
        try {
          const fd = new FormData()
          fd.append('file', local.file)
          fd.append('entityType', entityType)
          fd.append('entityId', String(entityId))
          fd.append('visibility', local.visibility)
          fd.append('allowedRoles', JSON.stringify(local.allowedRoles))
          const res  = await fetch('/api/files', { method: 'POST', body: fd })
          const data = await res.json().catch(() => ({}))
          if (!res.ok) {
            const msg = ((data as Record<string, unknown>).error as string) ?? 'Upload failed'
            setLocals(prev => prev.map(l => l.id === local.id ? { ...l, status: 'error', error: msg } : l))
            failed++
          } else {
            onUploaded(data as unknown as SavedFile)
            setLocals(prev => prev.filter(l => l.id !== local.id))
            URL.revokeObjectURL(local.localUrl)
            success++
          }
        } catch {
          setLocals(prev => prev.map(l => l.id === local.id ? { ...l, status: 'error', error: 'Network error' } : l))
          failed++
        }
      }
      return { success, failed }
    },
  }), [locals, entityType, entityId, onUploaded])

  // ── Immediate upload (autoUpload mode) ─────────────────────────────────
  const uploadOne = useCallback(async (local: LocalFile) => {
    setLocals(prev => prev.map(l => l.id === local.id ? { ...l, status: 'uploading' } : l))
    try {
      const fd = new FormData()
      fd.append('file', local.file)
      fd.append('entityType', entityType)
      fd.append('entityId', String(entityId))
      const res  = await fetch('/api/files', { method: 'POST', body: fd })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        const msg = ((data as Record<string, unknown>).error as string) ?? 'Upload failed'
        setLocals(prev => prev.map(l => l.id === local.id ? { ...l, status: 'error', error: msg } : l))
      } else {
        onUploaded(data as unknown as SavedFile)
        setLocals(prev => prev.filter(l => l.id !== local.id))
        URL.revokeObjectURL(local.localUrl)
      }
    } catch {
      setLocals(prev => prev.map(l => l.id === local.id ? { ...l, status: 'error', error: 'Network error' } : l))
    }
  }, [entityType, entityId, onUploaded])

  // ── File picker ─────────────────────────────────────────────────────────
  function handleFiles(picked: FileList | null) {
    if (!picked) return
    const active    = locals.filter(l => l.status !== 'error').length
    const remaining = limit - files.length - active
    if (remaining <= 0) { toast.warning(`Max ${limit} files reached`); return }

    for (const file of Array.from(picked).slice(0, remaining)) {
      if (file.size > maxMb * 1024 * 1024) { toast.error(`"${file.name}" exceeds ${maxMb}MB`); continue }
      const local: LocalFile = {
        id: crypto.randomUUID(),
        file,
        localUrl: URL.createObjectURL(file),
        status: autoUpload ? 'uploading' : 'pending',
        visibility: 'public',
        allowedRoles: [],
      }
      setLocals(prev => [...prev, local])
      if (autoUpload) uploadOne(local)
    }
  }

  function retryLocal(local: LocalFile) {
    setLocals(prev => prev.map(l => l.id === local.id ? { ...l, status: 'uploading', error: undefined } : l))
    uploadOne({ ...local, status: 'uploading', error: undefined })
  }

  function removeLocal(id: string) {
    setLocals(prev => {
      const f = prev.find(l => l.id === id)
      if (f) URL.revokeObjectURL(f.localUrl)
      return prev.filter(l => l.id !== id)
    })
  }

  function updateLocalPrivacy(id: string, visibility: 'public' | 'private', allowedRoles: string[]) {
    setLocals(prev => prev.map(l => l.id === id ? { ...l, visibility, allowedRoles } : l))
  }

  async function handleDelete(file: SavedFile) {
    setDeleting(file.id)
    try {
      const ep   = entityType === 'mls_property' ? 'mls' : 'operations'
      const res  = await fetch(`/api/${ep}/${entityId}/files?fileId=${file.id}`, { method: 'DELETE' })
      const data = await res.json().catch(() => ({})) as Record<string, unknown>
      if (!res.ok) toast.error((data.error as string) ?? 'Delete failed')
      else onDeleted(file.id)
    } catch { toast.error('Failed to delete file') }
    finally { setDeleting(null) }
  }

  // Split saved files
  const publicFiles  = enablePrivacy ? files.filter(f => f.visibility === 'public')  : files
  const privateFiles = enablePrivacy ? files.filter(f => f.visibility === 'private') : []
  const savedImages  = publicFiles.filter(f => isImage(f.mimeType))
  const savedDocs    = publicFiles.filter(f => !isImage(f.mimeType))
  const localImages  = locals.filter(l => isImage(l.file.type))
  const localDocs    = locals.filter(l => !isImage(l.file.type))

  const isEmpty = files.length === 0 && locals.length === 0

  return (
    <div className="space-y-5">

      {/* ── Drop zone ──────────────────────────────────────────────────── */}
      {canEdit && (
        <div
          role="button" tabIndex={0}
          className={`
            relative flex items-center gap-4 px-5 py-4 rounded-[10px] border-2 border-dashed
            cursor-pointer transition-all duration-150 group
            ${dragging
              ? 'border-gold bg-gold/5 scale-[1.005]'
              : 'border-border hover:border-gold/60 hover:bg-bg'}
          `}
          onClick={() => inputRef.current?.click()}
          onKeyDown={e => e.key === 'Enter' && inputRef.current?.click()}
          onDragEnter={e => { e.preventDefault(); setDragging(true) }}
          onDragLeave={e => { e.preventDefault(); setDragging(false) }}
          onDragOver={e => e.preventDefault()}
          onDrop={e => {
            e.preventDefault(); e.stopPropagation()
            setDragging(false); handleFiles(e.dataTransfer.files)
          }}
        >
          <div className={`p-2.5 rounded-[8px] border transition-colors ${dragging ? 'border-gold bg-gold/10' : 'border-border bg-surface group-hover:border-gold/40'}`}>
            <Upload size={18} className={dragging ? 'text-gold' : 'text-text-3'} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-medium text-text-1">
              Drop files here or{' '}
              <span className="text-gold underline underline-offset-2 decoration-dotted">browse</span>
            </p>
            <p className="text-[11px] text-text-3 mt-0.5">
              PDF &amp; images · max {maxMb} MB per file
              {!autoUpload && <span className="ml-1 text-text-3">· uploaded on save</span>}
            </p>
          </div>
          <input ref={inputRef} type="file" accept={accept} multiple className="hidden"
            onChange={e => { handleFiles(e.target.files); e.target.value = '' }} />
        </div>
      )}

      {/* ── Shared section (privacy mode) ──────────────────────────────── */}
      {enablePrivacy && (savedDocs.length + savedImages.length + localDocs.length + localImages.length) > 0 && (
        <section>
          <SectionDivider icon={<Globe size={11} />} label="Shared"
            count={savedDocs.length + savedImages.length + localDocs.length + localImages.length} />
          {(savedImages.length + localImages.length) > 0 && (
            <div className="grid grid-cols-4 gap-2 mt-2 mb-3">
              {savedImages.map(f => <SavedImageThumb key={f.id} file={f} deleting={deleting} onDelete={handleDelete} />)}
              {localImages.map(l => <LocalImageThumb key={l.id} local={l} onRetry={retryLocal} onRemove={removeLocal} />)}
            </div>
          )}
          <div className="space-y-1.5 mt-2">
            {savedDocs.map(f => (
              <DocRow key={f.id} file={f} deleting={deleting} onDelete={handleDelete}
                privacy={canEdit ? (
                  <PrivacySelector fileId={f.id} operationId={entityId} filename={f.filename}
                    visibility={f.visibility} allowedRoles={f.allowedRoles} canEdit={canEdit}
                    onUpdated={(v, r) => onPrivacyUpdated?.(f.id, v, r)} />
                ) : null} />
            ))}
            {localDocs.map(l => (
              <LocalDocRow key={l.id} local={l} onRetry={retryLocal} onRemove={removeLocal}
                privacyPicker={enablePrivacy && canEdit
                  ? <PendingPrivacyPicker local={l} onChange={(v, r) => updateLocalPrivacy(l.id, v, r)} />
                  : null} />
            ))}
          </div>
        </section>
      )}

      {/* ── Private section (privacy mode) ─────────────────────────────── */}
      {enablePrivacy && privateFiles.length > 0 && (
        <section>
          <SectionDivider icon={<Lock size={11} />} label="Private" count={privateFiles.length} accent />
          <div className="space-y-1.5 mt-2">
            {privateFiles.map(f => (
              <DocRow key={f.id} file={f} deleting={deleting} onDelete={handleDelete} highlight
                privacy={canEdit ? (
                  <PrivacySelector fileId={f.id} operationId={entityId} filename={f.filename}
                    visibility={f.visibility} allowedRoles={f.allowedRoles} canEdit={canEdit}
                    onUpdated={(v, r) => onPrivacyUpdated?.(f.id, v, r)} />
                ) : <RoleChips roles={f.allowedRoles} />} />
            ))}
          </div>
        </section>
      )}

      {/* ── Non-privacy mode (MLS images) ──────────────────────────────── */}
      {!enablePrivacy && (
        <div className="space-y-2">
          {(savedImages.length + localImages.length) > 0 && (
            <div className="grid grid-cols-4 gap-2">
              {savedImages.map(f => <SavedImageThumb key={f.id} file={f} deleting={deleting} onDelete={handleDelete} />)}
              {localImages.map(l => <LocalImageThumb key={l.id} local={l} onRetry={retryLocal} onRemove={removeLocal} />)}
            </div>
          )}
          {savedDocs.map(f => <DocRow key={f.id} file={f} deleting={deleting} onDelete={handleDelete} />)}
          {localDocs.map(l => <LocalDocRow key={l.id} local={l} onRetry={retryLocal} onRemove={removeLocal} />)}
        </div>
      )}

      {isEmpty && (
        <div className="flex flex-col items-center py-8 text-text-3 gap-2">
          <ImageIcon size={28} className="opacity-30" />
          <p className="text-[12px]">No files yet</p>
        </div>
      )}
    </div>
  )
})

export default FileUploader

// ── Section divider ──────────────────────────────────────────────────────────

function SectionDivider({ icon, label, count, accent }: {
  icon: React.ReactNode; label: string; count: number; accent?: boolean
}) {
  return (
    <div className="flex items-center gap-2">
      <span className={accent ? 'text-amber-500' : 'text-text-3'}>{icon}</span>
      <span className={`text-[11px] font-semibold uppercase tracking-widest ${accent ? 'text-amber-600 dark:text-amber-400' : 'text-text-3'}`}>
        {label}
      </span>
      <div className="flex-1 h-px bg-border" />
      <span className="text-[11px] text-text-3 tabular-nums">{count}</span>
    </div>
  )
}

// ── Saved image thumbnail ────────────────────────────────────────────────────

function SavedImageThumb({ file, deleting, onDelete }: {
  file: SavedFile; deleting: number | null; onDelete: (f: SavedFile) => void
}) {
  return (
    <div className="relative group rounded-[8px] overflow-hidden border border-border aspect-square bg-bg">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={file.signedUrl} alt={file.filename} className="w-full h-full object-cover" />
      <button onClick={() => onDelete(file)} disabled={deleting === file.id}
        className="absolute top-1.5 right-1.5 p-1 rounded-[5px] bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-40">
        {deleting === file.id ? <Loader2 size={10} className="animate-spin" /> : <Trash2 size={10} />}
      </button>
    </div>
  )
}

// ── Local image thumbnail ────────────────────────────────────────────────────

function LocalImageThumb({ local, onRetry, onRemove }: {
  local: LocalFile; onRetry: (l: LocalFile) => void; onRemove: (id: string) => void
}) {
  return (
    <div className="relative group rounded-[8px] overflow-hidden border border-border aspect-square bg-bg">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={local.localUrl} alt={local.file.name} className="w-full h-full object-cover" />
      {local.status === 'pending'   && <div className="absolute inset-0 bg-black/20 flex items-end p-1"><span className="text-[9px] text-white font-medium bg-amber-500/80 px-1.5 py-0.5 rounded-full">Pending</span></div>}
      {local.status === 'uploading' && <div className="absolute inset-0 bg-black/40 flex items-center justify-center"><Loader2 size={18} className="animate-spin text-white" /></div>}
      {local.status === 'error'     && <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-1"><AlertCircle size={14} className="text-red-300" /><button onClick={() => onRetry(local)}><RotateCcw size={12} className="text-white" /></button></div>}
      {local.status !== 'uploading' && (
        <button onClick={() => onRemove(local.id)}
          className="absolute top-1.5 right-1.5 p-1 rounded-[5px] bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity">
          <Trash2 size={10} />
        </button>
      )}
    </div>
  )
}

// ── Saved doc row ────────────────────────────────────────────────────────────

function DocRow({ file, deleting, onDelete, privacy, highlight }: {
  file: SavedFile; deleting: number | null; onDelete: (f: SavedFile) => void
  privacy?: React.ReactNode; highlight?: boolean
}) {
  return (
    <div className={`flex items-center gap-3 px-3.5 py-2.5 rounded-[8px] border transition-colors ${
      highlight
        ? 'bg-amber-50/70 border-amber-100/80 dark:bg-amber-950/10 dark:border-amber-900/30'
        : 'bg-bg border-border hover:border-border/80'
    }`}>
      <div className={`p-1.5 rounded-[6px] border ${highlight ? 'border-amber-200 bg-amber-50 dark:bg-amber-950/20' : 'border-border bg-surface'}`}>
        <FileText size={13} className={highlight ? 'text-amber-500' : 'text-text-3'} />
      </div>
      <div className="flex-1 min-w-0">
        <a href={file.signedUrl || '#'} target="_blank" rel="noopener noreferrer"
          className="text-[12px] font-medium text-text-1 hover:text-gold truncate block leading-tight transition-colors">
          {file.filename}
        </a>
        <span className="text-[11px] text-text-3">{fmtBytes(file.sizeBytes)}</span>
      </div>
      {privacy}
      <button onClick={() => onDelete(file)} disabled={deleting === file.id}
        className="p-1.5 rounded-[6px] hover:bg-surface text-text-3 hover:text-red-500 transition-colors disabled:opacity-40 shrink-0">
        {deleting === file.id ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} />}
      </button>
    </div>
  )
}

// ── Local (pending / uploading / error) doc row ──────────────────────────────

function LocalDocRow({ local, onRetry, onRemove, privacyPicker }: {
  local: LocalFile; onRetry: (l: LocalFile) => void; onRemove: (id: string) => void
  privacyPicker?: React.ReactNode
}) {
  const isPending  = local.status === 'pending'
  const isUploading= local.status === 'uploading'
  const isError    = local.status === 'error'

  return (
    <div className={`flex items-center gap-3 px-3.5 py-2.5 rounded-[8px] border transition-colors ${
      isError
        ? 'bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-900/50'
        : isPending
          ? 'bg-amber-50/40 border-amber-100 dark:bg-amber-950/10 dark:border-amber-900/30'
          : 'bg-bg border-border'
    }`}>
      <div className={`p-1.5 rounded-[6px] border ${
        isError ? 'border-red-200 bg-red-50' : isPending ? 'border-amber-200 bg-amber-50/60' : 'border-border bg-surface'
      }`}>
        <FileText size={13} className={isError ? 'text-red-400' : isPending ? 'text-amber-500' : 'text-text-3'} />
      </div>
      <div className="flex-1 min-w-0">
        <a href={local.localUrl} target="_blank" rel="noopener noreferrer"
          className="text-[12px] font-medium text-text-1 hover:text-gold truncate flex items-center gap-1 leading-tight transition-colors">
          <span className="truncate">{local.file.name}</span>
          <ExternalLink size={10} className="shrink-0 text-text-3" />
        </a>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-[11px] text-text-3">{fmtBytes(local.file.size)}</span>
          {isPending   && <span className="inline-flex items-center px-1.5 py-px text-[10px] font-semibold rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">Pending</span>}
          {isUploading && <span className="inline-flex items-center gap-1 text-[11px] text-text-3"><Loader2 size={10} className="animate-spin" />Uploading…</span>}
          {isError     && <span className="text-[11px] text-red-500">{local.error}</span>}
        </div>
      </div>
      {isPending && privacyPicker}
      <div className="flex items-center gap-1 shrink-0">
        {isError && (
          <button onClick={() => onRetry(local)} title="Retry"
            className="p-1.5 rounded-[6px] hover:bg-surface text-text-3 hover:text-gold transition-colors">
            <RotateCcw size={13} />
          </button>
        )}
        {!isUploading && (
          <button onClick={() => onRemove(local.id)}
            className="p-1.5 rounded-[6px] hover:bg-surface text-text-3 hover:text-red-500 transition-colors">
            <Trash2 size={13} />
          </button>
        )}
      </div>
    </div>
  )
}

// ── Pending privacy picker — portal dropdown to avoid modal overflow clip ────

function PendingPrivacyPicker({ local, onChange }: {
  local: LocalFile
  onChange: (visibility: 'public' | 'private', allowedRoles: string[]) => void
}) {
  const [open, setOpen]   = useState(false)
  const [vis, setVis]     = useState<'public' | 'private'>(local.visibility)
  const [roles, setRoles] = useState<string[]>(local.allowedRoles)
  const [mounted, setMounted] = useState(false)
  const btnRef  = useRef<HTMLButtonElement>(null)
  const dropRef = useRef<HTMLDivElement>(null)
  const [dropPos, setDropPos] = useState({ top: 0, right: 0 })

  useEffect(() => { setMounted(true) }, [])
  useEffect(() => { setVis(local.visibility); setRoles(local.allowedRoles) }, [local.visibility, local.allowedRoles])

  function openDropdown() {
    if (!btnRef.current) return
    const rect = btnRef.current.getBoundingClientRect()
    setDropPos({ top: rect.bottom + 6, right: window.innerWidth - rect.right })
    setOpen(true)
  }

  // Close on outside click
  useEffect(() => {
    if (!open) return
    function onDown(e: MouseEvent) {
      const target = e.target as Node
      if (!btnRef.current?.contains(target) && !dropRef.current?.contains(target)) {
        apply(); setOpen(false)
      }
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [open, vis, roles]) // eslint-disable-line react-hooks/exhaustive-deps

  function toggleRole(role: string) {
    setRoles(r => r.includes(role) ? r.filter(x => x !== role) : [...r, role])
  }

  function apply() {
    onChange(vis, vis === 'public' ? [] : roles)
  }

  const isPrivate = local.visibility === 'private'

  const dropdown = open && mounted && createPortal(
    <div
      ref={dropRef}
      style={{ position: 'fixed', top: dropPos.top, right: dropPos.right, zIndex: 300 }}
      className="w-[220px] bg-surface border border-border rounded-[12px] shadow-2xl p-4 space-y-3"
      onClick={e => e.stopPropagation()}
    >
      {/* Visibility toggle */}
      <div>
        <p className="text-[10px] font-semibold text-text-3 uppercase tracking-widest mb-2">Visibility</p>
        <div className="flex gap-1.5">
          {(['public', 'private'] as const).map(v => (
            <button key={v} onClick={() => setVis(v)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-[8px] text-[12px] font-medium border-2 transition-all ${
                vis === v
                  ? v === 'private'
                    ? 'border-amber-400 bg-amber-500 text-white'
                    : 'border-gold bg-gold text-white'
                  : 'border-border bg-bg text-text-2 hover:border-gold/50'
              }`}>
              {v === 'public' ? <Globe size={11} /> : <Lock size={11} />}
              {v === 'public' ? 'Shared' : 'Private'}
            </button>
          ))}
        </div>
      </div>

      {/* Role checkboxes */}
      {vis === 'private' && (
        <div>
          <p className="text-[10px] font-semibold text-text-3 uppercase tracking-widest mb-2">Visible to</p>
          <div className="space-y-1">
            {ROLES.map(r => {
              const checked = roles.includes(r.value)
              return (
                <button key={r.value} onClick={() => toggleRole(r.value)}
                  className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-[7px] text-left transition-colors ${
                    checked ? 'bg-amber-50 dark:bg-amber-950/20' : 'hover:bg-bg'
                  }`}>
                  <div className={`w-4 h-4 rounded-[4px] border-2 flex items-center justify-center shrink-0 transition-all ${
                    checked ? 'border-amber-500 bg-amber-500' : 'border-border bg-surface'
                  }`}>
                    {checked && <Check size={10} className="text-white" strokeWidth={3} />}
                  </div>
                  <span className={`text-[12px] ${checked ? 'font-semibold text-text-primary' : 'text-text-2'}`}>
                    {r.label}
                  </span>
                </button>
              )
            })}
          </div>
          {roles.length === 0 && (
            <p className="text-[11px] text-red-500 mt-1.5 px-1">Select at least one role</p>
          )}
        </div>
      )}

      <button onClick={() => { apply(); setOpen(false) }}
        className="w-full py-2 rounded-[8px] text-[12px] font-semibold bg-gold text-white hover:bg-gold-dark transition-colors">
        Apply
      </button>
    </div>,
    document.body
  )

  return (
    <>
      <button ref={btnRef} onClick={openDropdown}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border transition-colors shrink-0 ${
          isPrivate
            ? 'bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-950/30 dark:border-amber-800 dark:text-amber-400'
            : 'bg-bg border-border text-text-3 hover:border-gold hover:text-gold'
        }`}>
        {isPrivate ? <Lock size={10} /> : <Globe size={10} />}
        {isPrivate ? 'Private' : 'Shared'}
        <ChevronDown size={9} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {dropdown}
    </>
  )
}

// ── Role chips (read-only) ───────────────────────────────────────────────────

function RoleChips({ roles }: { roles: string[] }) {
  const labels: Record<string, string> = { admin: 'Admin', manager: 'Manager', agente: 'Agent' }
  if (!roles.length) return null
  return (
    <div className="flex gap-1 flex-wrap">
      {roles.map(r => (
        <span key={r} className="px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
          {labels[r] ?? r}
        </span>
      ))}
    </div>
  )
}
