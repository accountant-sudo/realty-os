'use client'
import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { X, FolderOpen, Loader2, CloudUpload } from 'lucide-react'
import FileUploader, { type SavedFile, type FileUploaderHandle } from '@/components/intranet/ui/FileUploader'
import { toast } from 'sonner'

interface Props {
  operationId: number
  operationAddress: string
  canEdit: boolean
}

export default function DocumentsModal({ operationId, operationAddress, canEdit }: Props) {
  const [open, setOpen]         = useState(false)
  const [files, setFiles]       = useState<SavedFile[]>([])
  const [loading, setLoading]   = useState(false)
  const [saving, setSaving]     = useState(false)
  const [mounted, setMounted]   = useState(false)
  const [pendingCount, setPendingCount] = useState(0)
  const uploaderRef = useRef<FileUploaderHandle>(null)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (!open) return
    setLoading(true)
    fetch(`/api/operations/${operationId}/files`)
      .then(r => r.json())
      .then((f: SavedFile[]) => setFiles(f))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [open, operationId])

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  async function handleSave() {
    if (!uploaderRef.current) return
    const pending = uploaderRef.current.pendingCount()
    if (pending === 0) { setOpen(false); return }

    setSaving(true)
    try {
      const { success, failed } = await uploaderRef.current.triggerUpload()
      if (failed === 0) {
        toast.success(`${success} file${success !== 1 ? 's' : ''} uploaded`)
        setOpen(false)
      } else {
        toast.error(`${failed} file${failed !== 1 ? 's' : ''} failed — fix errors and try again`)
      }
    } finally {
      setSaving(false)
    }
  }

  function handleClose() {
    const pending = uploaderRef.current?.pendingCount() ?? 0
    if (pending > 0) {
      if (!confirm(`You have ${pending} unsaved file${pending !== 1 ? 's' : ''}. Discard?`)) return
    }
    setOpen(false)
  }

  const publicCount  = files.filter(f => f.visibility === 'public').length
  const privateCount = files.filter(f => f.visibility === 'private').length

  const trigger = (
    <div className="flex items-center justify-between">
      <div className="text-[12px] text-text-3">
        {files.length === 0 && !open
          ? 'No documents yet'
          : [
              publicCount  > 0 && `${publicCount} shared`,
              privateCount > 0 && `${privateCount} private`,
            ].filter(Boolean).join(' · ')}
      </div>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[7px] text-[12px] font-medium border border-border bg-surface text-text-2 hover:bg-bg hover:border-gold hover:text-gold transition-all"
      >
        <FolderOpen size={13} />
        Manage documents
      </button>
    </div>
  )

  const modal = open && mounted && createPortal(
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleClose} />

      <div className="relative bg-surface border border-border rounded-[14px] shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden">

        {/* Header */}
        <div className="px-6 py-4 border-b border-border flex items-center justify-between shrink-0">
          <div>
            <p className="text-[14px] font-semibold text-text-primary">Documents</p>
            <p className="text-[11px] text-text-3 mt-0.5 truncate max-w-[400px]">{operationAddress}</p>
          </div>
          <button onClick={handleClose}
            className="p-1.5 rounded-[7px] hover:bg-bg text-text-3 hover:text-text-1 transition-colors">
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {loading ? (
            <div className="flex items-center justify-center py-16 text-[12px] text-text-3">
              <Loader2 size={16} className="animate-spin mr-2" /> Loading…
            </div>
          ) : (
            <FileUploader
              ref={uploaderRef}
              entityType="operation"
              entityId={operationId}
              accept=".pdf,image/*"
              maxFiles={50}
              files={files}
              onUploaded={f => setFiles(prev => [...prev, f])}
              onDeleted={id => setFiles(prev => prev.filter(f => f.id !== id))}
              onPrivacyUpdated={(fileId, visibility, allowedRoles) =>
                setFiles(prev => prev.map(f =>
                  f.id === fileId ? { ...f, visibility, allowedRoles } : f
                ))
              }
              onPendingCountChange={setPendingCount}
              enablePrivacy
              canEdit={canEdit}
              autoUpload={false}
            />
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border flex items-center justify-between shrink-0">
          <p className="text-[11px] text-text-3">
            {files.length > 0 && `${files.length} saved · `}
            {pendingCount > 0 && (
              <span className="text-gold font-medium">
                {pendingCount} pending upload{pendingCount !== 1 ? 's' : ''}
              </span>
            )}
          </p>

          <div className="flex gap-2">
            <button onClick={handleClose} disabled={saving}
              className="px-4 py-2 rounded-[8px] text-[12px] font-medium border border-border text-text-2 hover:bg-bg transition-colors disabled:opacity-50">
              Cancel
            </button>
            {canEdit && (
              <button onClick={handleSave} disabled={saving}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-[8px] text-[12px] font-medium bg-gold border border-gold text-white hover:bg-gold-dark disabled:opacity-50 transition-colors">
                {saving
                  ? <><Loader2 size={13} className="animate-spin" /> Uploading…</>
                  : <><CloudUpload size={13} /> Save & upload</>
                }
              </button>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  )

  return (
    <>
      {trigger}
      {modal}
    </>
  )
}
