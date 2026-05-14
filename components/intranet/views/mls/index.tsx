'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useData } from '@/context/DataContext'
import { useAuth } from '@/context/AuthContext'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import MlsFilters from './MlsFilters'
import MlsTable from './MlsTable'
import type { MlsProperty } from '@/lib/types'

const BTN_PRIMARY = 'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[6px] text-[13px] font-medium cursor-pointer border transition-all bg-gold text-text-primary border-gold hover:bg-gold-dark hover:border-gold-dark hover:text-white'

export default function MLS() {
  const router = useRouter()
  const { mlsProperties, agents, deleteMlsProperty } = useData()
  const { canEdit } = useAuth()
  const [search, setSearch] = useState('')
  const [cityFilter, setCityFilter] = useState('Todas')
  const [agentFilter, setAgentFilter] = useState('Todos')
  const [statusFilter, setStatusFilter] = useState('Todos')
  const [deleteTarget, setDeleteTarget] = useState<MlsProperty | null>(null)

  const filtered = mlsProperties.filter(p => {
    if (cityFilter !== 'Todas' && p.city !== cityFilter) return false
    if (agentFilter !== 'Todos' && p.agent !== agentFilter) return false
    if (statusFilter !== 'Todos' && p.mlsStatus !== statusFilter) return false
    if (search) {
      const q = search.toLowerCase()
      return p.address.toLowerCase().includes(q) || (p.mlsNum || '').toLowerCase().includes(q) || (p.notes || '').toLowerCase().includes(q)
    }
    return true
  })

  function confirmDelete() {
    if (!deleteTarget) return
    deleteMlsProperty(deleteTarget.id)
    toast('Propiedad eliminada')
    setDeleteTarget(null)
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div className="text-[13px] text-text-3">{filtered.length} propiedades</div>
        {canEdit() && (
          <button className={BTN_PRIMARY} onClick={() => router.push('/intranet/mls/nueva')}>
            + Nueva propiedad
          </button>
        )}
      </div>

      <div className="bg-surface border border-border rounded-[10px] overflow-hidden mb-5">
        <MlsFilters
          search={search}
          cityFilter={cityFilter}
          agentFilter={agentFilter}
          statusFilter={statusFilter}
          agents={agents}
          onSearch={setSearch}
          onCity={setCityFilter}
          onAgent={setAgentFilter}
          onStatus={setStatusFilter}
        />
        <MlsTable
          properties={filtered}
          agents={agents}
          canEdit={canEdit()}
          onEdit={p => router.push(`/intranet/mls/${p.id}/editar`)}
          onDelete={setDeleteTarget}
        />
      </div>

      <Dialog open={!!deleteTarget} onOpenChange={open => !open && setDeleteTarget(null)}>
        <DialogContent className="max-w-[440px]">
          <DialogHeader>
            <DialogTitle>Eliminar propiedad</DialogTitle>
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
