'use client'
import { useState } from 'react'
import { useIntranet } from '@/context/IntranetContext'
import { mlsStatusClass, mlsStatusLabel, countryFlag, fmtPrice } from '@/lib/helpers'
import AgentChip from '@/components/intranet/ui/AgentChip'
import Badge from '@/components/intranet/ui/Badge'
import type { MlsProperty } from '@/lib/types'

const CITIES = ['Todas', 'Jacksonville', 'South Florida', 'Orlando']

const INPUT = 'px-3 py-2 border border-border rounded-[6px] text-[13px] bg-bg focus:outline-none focus:border-gold focus:ring-[3px] focus:ring-gold-light transition-colors font-[inherit]'
const BTN_PRIMARY = 'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[6px] text-[13px] font-medium cursor-pointer border transition-all bg-gold text-text-primary border-gold hover:bg-gold-dark hover:border-gold-dark hover:text-white'
const BTN_SECONDARY = 'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[6px] text-[13px] font-medium cursor-pointer border transition-all bg-surface text-text-2 border-border hover:bg-bg'
const BTN_GHOST = 'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[6px] text-[13px] font-medium cursor-pointer border transition-all bg-transparent text-text-2 border-transparent hover:bg-bg'

export default function MLS() {
  const { mlsProperties, agents, canEdit, openModal, updateMlsProperty, addMlsProperty, showToast } = useIntranet()
  const [search, setSearch] = useState('')
  const [cityFilter, setCityFilter] = useState('Todas')
  const [agentFilter, setAgentFilter] = useState('Todos')
  const [statusFilter, setStatusFilter] = useState('Todos')

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

  function openEditModal(prop: MlsProperty) {
    openModal(`Editar — ${prop.address}`, <EditPropForm prop={prop} onSave={(fields) => {
      updateMlsProperty(prop.id, fields)
      showToast('Guardado')
    }} />)
  }

  function openNewModal() {
    openModal('Nueva propiedad', <EditPropForm prop={{
      address: '', type: 'SF', listPrice: 0, agent: '', agentRaw: '', admin: '',
      city: 'Jacksonville', country: 'US', usState: 'Florida', mlsStatus: 'published',
      mlsNum: '', zillow: '', notes: '', showingInst: '', listingExp: '',
      daysListed: 0, zillowViews: 0,
    }} onSave={(fields) => {
      addMlsProperty(fields)
      showToast('Propiedad agregada')
    }} isNew />)
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div className="text-[13px] text-text-3">{filtered.length} propiedades</div>
        {canEdit() && (
          <button className={BTN_PRIMARY} onClick={openNewModal}>+ Nueva propiedad</button>
        )}
      </div>

      <div className="bg-surface border border-border rounded-[10px] overflow-hidden mb-5">
        <div className="flex items-center gap-2.5 p-3.5 border-b border-border flex-wrap">
          <div className="relative flex-1 min-w-[180px]">
            <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-3" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              className={`w-full pl-8 pr-3 py-2 border border-border rounded-[6px] text-[13px] bg-bg focus:outline-none focus:border-gold focus:bg-surface transition-colors`}
              placeholder="Buscar por dirección, MLS#…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <select className={`${INPUT} w-[160px]`} value={cityFilter} onChange={e => setCityFilter(e.target.value)}>
            {CITIES.map(c => <option key={c}>{c}</option>)}
          </select>
          <select className={`${INPUT} w-[140px]`} value={agentFilter} onChange={e => setAgentFilter(e.target.value)}>
            <option>Todos</option>
            {agents.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
          </select>
          <select className={`${INPUT} w-[150px]`} value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option>Todos</option>
            <option value="published">En MLS</option>
            <option value="under_contract">Bajo contrato</option>
            <option value="withdrawn">Retirada</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Propiedad</th>
                <th>Ciudad</th>
                <th>Agente</th>
                <th>Precio</th>
                <th>MLS #</th>
                <th>Estado</th>
                <th>Exp. Listado</th>
                {canEdit() && <th></th>}
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id}>
                  <td>
                    <div className="font-semibold text-[13px]">{p.address}</div>
                    {p.notes && (
                      <div className="text-[11px] text-text-3 mt-0.5 max-w-[280px] overflow-hidden text-ellipsis whitespace-nowrap">
                        {p.notes}
                      </div>
                    )}
                  </td>
                  <td>
                    <span className="text-[16px] leading-none">{countryFlag(p.country)}</span>{' '}
                    {p.city}
                  </td>
                  <td><AgentChip agentId={p.agent} agents={agents} /></td>
                  <td className="font-semibold">{fmtPrice(p.listPrice)}</td>
                  <td className="text-[12px] text-text-3">
                    {p.mlsNum ? (
                      p.zillow
                        ? <a href={p.zillow} target="_blank" rel="noreferrer" className="text-blue">{p.mlsNum}</a>
                        : p.mlsNum
                    ) : '—'}
                  </td>
                  <td>
                    <Badge cls={mlsStatusClass(p.mlsStatus)}>
                      {mlsStatusLabel(p.mlsStatus, p.country)}
                    </Badge>
                  </td>
                  <td className="text-[12px] text-text-3">{p.listingExp || '—'}</td>
                  {canEdit() && (
                    <td>
                      <button className={BTN_GHOST} onClick={() => openEditModal(p)}>Editar</button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

function EditPropForm({
  prop,
  onSave,
  isNew,
}: {
  prop: Omit<MlsProperty, 'id'>
  onSave: (fields: Omit<MlsProperty, 'id'>) => void
  isNew?: boolean
}) {
  const { closeModal } = useIntranet()
  const [form, setForm] = useState({ ...prop })

  function set(key: keyof typeof form, val: string | number) {
    setForm(f => ({ ...f, [key]: val }))
  }

  function handleSave() {
    onSave(form)
    closeModal()
  }

  const INPUT_CLS = 'w-full px-3 py-2 border border-border rounded-[6px] text-[13px] bg-surface focus:outline-none focus:border-gold focus:ring-[3px] focus:ring-gold-light transition-colors font-[inherit]'
  const LABEL_CLS = 'text-[12px] font-semibold text-text-2'

  return (
    <>
      <div className="grid grid-cols-2 gap-4 p-5">
        <div className="col-span-2 flex flex-col gap-1">
          <label className={LABEL_CLS}>Dirección</label>
          <input className={INPUT_CLS} value={form.address} onChange={e => set('address', e.target.value)} />
        </div>
        <div className="flex flex-col gap-1">
          <label className={LABEL_CLS}>Tipo</label>
          <select className={INPUT_CLS} value={form.type} onChange={e => set('type', e.target.value)}>
            <option>SF</option><option>Condo</option><option>TH</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className={LABEL_CLS}>Precio lista</label>
          <input className={INPUT_CLS} type="number" value={form.listPrice} onChange={e => set('listPrice', Number(e.target.value))} />
        </div>
        <div className="flex flex-col gap-1">
          <label className={LABEL_CLS}>Ciudad</label>
          <select className={INPUT_CLS} value={form.city} onChange={e => set('city', e.target.value)}>
            <option>Jacksonville</option><option>South Florida</option><option>Orlando</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className={LABEL_CLS}>Estado MLS</label>
          <select className={INPUT_CLS} value={form.mlsStatus} onChange={e => set('mlsStatus', e.target.value)}>
            <option value="published">En MLS</option>
            <option value="under_contract">Bajo contrato</option>
            <option value="withdrawn">Retirada</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className={LABEL_CLS}>MLS #</label>
          <input className={INPUT_CLS} value={form.mlsNum} onChange={e => set('mlsNum', e.target.value)} />
        </div>
        <div className="flex flex-col gap-1">
          <label className={LABEL_CLS}>Exp. listado</label>
          <input className={INPUT_CLS} value={form.listingExp} onChange={e => set('listingExp', e.target.value)} />
        </div>
        <div className="col-span-2 flex flex-col gap-1">
          <label className={LABEL_CLS}>Showing instructions</label>
          <textarea className={INPUT_CLS} style={{ resize: 'vertical', minHeight: 80 }} value={form.showingInst} onChange={e => set('showingInst', e.target.value)} />
        </div>
        <div className="col-span-2 flex flex-col gap-1">
          <label className={LABEL_CLS}>Notas</label>
          <textarea className={INPUT_CLS} style={{ resize: 'vertical', minHeight: 80 }} value={form.notes} onChange={e => set('notes', e.target.value)} />
        </div>
        <div className="col-span-2 flex flex-col gap-1">
          <label className={LABEL_CLS}>Zillow URL</label>
          <input className={INPUT_CLS} value={form.zillow} onChange={e => set('zillow', e.target.value)} />
        </div>
      </div>
      <div className="flex justify-end gap-2.5 px-5 py-4 border-t border-border">
        <button className={BTN_SECONDARY} onClick={closeModal}>Cancelar</button>
        <button className={BTN_PRIMARY} onClick={handleSave}>{isNew ? 'Agregar' : 'Guardar'}</button>
      </div>
    </>
  )
}
