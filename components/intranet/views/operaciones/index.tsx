'use client'
import { useState } from 'react'
import { toast } from 'sonner'
import { useData } from '@/context/DataContext'
import { useAuth } from '@/context/AuthContext'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import OperacionesTabs from './OperacionesTabs'
import OperacionesTable from './OperacionesTable'
import NewOperationForm from './NewOperationForm'
import type { Operation } from '@/lib/types'

type Tab = 'ACTIVA' | 'CERRADA' | 'CANCELADA'

const BTN_SECONDARY = 'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[6px] text-[13px] font-medium cursor-pointer border transition-all bg-surface text-text-2 border-border hover:bg-bg'
const BTN_PRIMARY = 'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[6px] text-[13px] font-medium cursor-pointer border transition-all bg-gold text-text-primary border-gold hover:bg-gold-dark hover:border-gold-dark hover:text-white'

export default function Operaciones() {
  const { operations, agents, realtors, addOperation, deleteOperation } = useData()
  const { canEdit } = useAuth()
  const [tab, setTab] = useState<Tab>('ACTIVA')
  const [showNew, setShowNew] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<Operation | null>(null)

  const activas    = operations.filter(o => o.status === 'ACTIVA')
  const cerradas   = operations.filter(o => o.status === 'CERRADA')
  const canceladas = operations.filter(o => o.status === 'CANCELADA')
  const list = tab === 'ACTIVA' ? activas : tab === 'CERRADA' ? cerradas : canceladas

  async function handleAdd(op: Omit<Operation, 'id'>) {
    await addOperation(op)
    toast('Operation created')
    setShowNew(false)
  }

  function confirmDelete() {
    if (!deleteTarget) return
    deleteOperation(deleteTarget.id)
    toast('Operation deleted')
    setDeleteTarget(null)
  }

  return (
    <>
      <div className="flex justify-end gap-2 mb-4">
        {canEdit() && (
          <button className={BTN_SECONDARY} onClick={() => setShowNew(true)}>+ New operation</button>
        )}
      </div>

      <OperacionesTabs
        tab={tab}
        activasCount={activas.length}
        cerradasCount={cerradas.length}
        canceladasCount={canceladas.length}
        onChange={setTab}
      />

      <OperacionesTable
        operations={list}
        agents={agents}
        realtors={realtors}
        tab={tab}
      />

      <Dialog open={showNew} onOpenChange={open => !open && setShowNew(false)}>
        <DialogContent className="max-w-[680px]">
          <DialogHeader>
            <DialogTitle>New operation</DialogTitle>
          </DialogHeader>
          <NewOperationForm
            agents={agents}
            realtors={realtors}
            onSave={handleAdd}
            onCancel={() => setShowNew(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={!!deleteTarget} onOpenChange={open => !open && setDeleteTarget(null)}>
        <DialogContent className="max-w-[440px]">
          <DialogHeader>
            <DialogTitle>Delete operation</DialogTitle>
          </DialogHeader>
          <p className="text-[13px] text-text-2 py-2">
            Delete <span className="font-semibold">{deleteTarget?.address}</span>? This cannot be undone.
          </p>
          <div className="flex justify-end gap-2.5 pt-2 border-t border-border">
            <button className={BTN_SECONDARY} onClick={() => setDeleteTarget(null)}>Cancel</button>
            <button
              className="inline-flex items-center px-3.5 py-1.5 rounded-[6px] text-[13px] font-medium cursor-pointer border bg-red-600 text-white border-red-600 hover:bg-red-700"
              onClick={confirmDelete}
            >Delete</button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
