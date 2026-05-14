'use client'
import { useState } from 'react'
import { toast } from 'sonner'
import { useData } from '@/context/DataContext'
import { useAuth } from '@/context/AuthContext'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import MlsFilters from './MlsFilters'
import MlsTable from './MlsTable'
import EditPropertyForm from './EditPropertyForm'
import type { MlsProperty } from '@/lib/types'

const BTN_PRIMARY = 'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[6px] text-[13px] font-medium cursor-pointer border transition-all bg-gold text-text-primary border-gold hover:bg-gold-dark hover:border-gold-dark hover:text-white'

const EMPTY_PROP: Omit<MlsProperty, 'id'> = {
  address: '', type: 'SF', listPrice: 0, agent: '', agentRaw: '', admin: '',
  city: 'Jacksonville', country: 'US', usState: 'Florida', mlsStatus: 'published',
  mlsNum: '', zillow: '', notes: '', showingInst: '', listingExp: '',
  daysListed: 0, zillowViews: 0,
}

export default function MLS() {
  const { mlsProperties, agents, updateMlsProperty, addMlsProperty } = useData()
  const { canEdit } = useAuth()
  const [search, setSearch] = useState('')
  const [cityFilter, setCityFilter] = useState('Todas')
  const [agentFilter, setAgentFilter] = useState('Todos')
  const [statusFilter, setStatusFilter] = useState('Todos')
  const [dialogProp, setDialogProp] = useState<MlsProperty | null>(null)
  const [isNew, setIsNew] = useState(false)

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

  function openEdit(prop: MlsProperty) { setDialogProp(prop); setIsNew(false) }
  function openNew() { setDialogProp({ ...EMPTY_PROP, id: 0 }); setIsNew(true) }
  function closeDialog() { setDialogProp(null) }

  function handleSave(fields: Omit<MlsProperty, 'id'>) {
    if (isNew) {
      addMlsProperty(fields)
      toast('Propiedad agregada')
    } else if (dialogProp) {
      updateMlsProperty(dialogProp.id, fields)
      toast('Guardado')
    }
    closeDialog()
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div className="text-[13px] text-text-3">{filtered.length} propiedades</div>
        {canEdit() && (
          <button className={BTN_PRIMARY} onClick={openNew}>+ Nueva propiedad</button>
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
          onEdit={openEdit}
        />
      </div>

      <Dialog open={!!dialogProp} onOpenChange={open => !open && closeDialog()}>
        <DialogContent className="max-w-[680px]">
          <DialogHeader>
            <DialogTitle>{isNew ? 'Nueva propiedad' : `Editar — ${dialogProp?.address}`}</DialogTitle>
          </DialogHeader>
          {dialogProp && (
            <EditPropertyForm
              prop={dialogProp}
              onSave={handleSave}
              onCancel={closeDialog}
              isNew={isNew}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
