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

const BTN_PRIMARY = 'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[6px] text-[13px] font-medium cursor-pointer border transition-all bg-gold text-text-primary border-gold hover:bg-gold-dark hover:border-gold-dark hover:text-white'

export default function Operaciones() {
  const { operations, agents, realtors, addOperation, deleteOperation } = useData()
  const { canEdit } = useAuth()
  const [tab, setTab] = useState<'activas' | 'cerradas'>('activas')
  const [showNew, setShowNew] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<Operation | null>(null)

  const activas = operations.filter(o => o.status === 'ACTIVA')
  const cerradas = operations.filter(o => o.status === 'CERRADA')
  const list = tab === 'activas' ? activas : cerradas

  async function handleAdd(op: Omit<Operation, 'id'>) {
    await addOperation(op)
    toast('Operación creada')
    setShowNew(false)
  }

  function confirmDelete() {
    if (!deleteTarget) return
    deleteOperation(deleteTarget.id)
    toast('Operación eliminada')
    setDeleteTarget(null)
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div className="text-[13px] text-text-3">{list.length} operaciones</div>
        {canEdit() && (
          <button className={BTN_PRIMARY} onClick={() => setShowNew(true)}>+ Nueva operación</button>
        )}
      </div>

      <OperacionesTabs
        tab={tab}
        activasCount={activas.length}
        cerradasCount={cerradas.length}
        onChange={setTab}
      />
      <OperacionesTable
        operations={list}
        agents={agents}
        canEdit={canEdit()}
        onDelete={setDeleteTarget}
      />

      <Dialog open={showNew} onOpenChange={open => !open && setShowNew(false)}>
        <DialogContent className="max-w-[680px]">
          <DialogHeader>
            <DialogTitle>Nueva operación</DialogTitle>
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
            <DialogTitle>Eliminar operación</DialogTitle>
          </DialogHeader>
          <p className="text-[13px] text-text-2 py-2">
            ¿Eliminar <span className="font-semibold text-text-1">{deleteTarget?.address}</span>? Esta acción no es reversible en la UI.
          </p>
          <div className="flex justify-end gap-2.5 pt-2 border-t border-border">
            <button
              className="inline-flex items-center px-3.5 py-1.5 rounded-[6px] text-[13px] font-medium cursor-pointer border bg-surface text-text-2 border-border hover:bg-bg"
              onClick={() => setDeleteTarget(null)}
            >Cancelar</button>
            <button
              className="inline-flex items-center px-3.5 py-1.5 rounded-[6px] text-[13px] font-medium cursor-pointer border bg-red-600 text-white border-red-600 hover:bg-red-700"
              onClick={confirmDelete}
            >Eliminar</button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
