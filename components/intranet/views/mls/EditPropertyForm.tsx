import { useState } from 'react'
import type { MlsProperty } from '@/lib/types'

const INPUT_CLS = 'w-full px-3 py-2 border border-border rounded-[6px] text-[13px] bg-surface focus:outline-none focus:border-gold focus:ring-[3px] focus:ring-gold-light transition-colors font-[inherit]'
const LABEL_CLS = 'text-[12px] font-semibold text-text-2'
const BTN_P = 'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[6px] text-[13px] font-medium cursor-pointer border transition-all bg-gold text-text-primary border-gold hover:bg-gold-dark hover:border-gold-dark hover:text-white'
const BTN_S = 'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[6px] text-[13px] font-medium cursor-pointer border transition-all bg-surface text-text-2 border-border hover:bg-bg'

interface Props {
  prop: Omit<MlsProperty, 'id'>
  onSave: (fields: Omit<MlsProperty, 'id'>) => void
  onCancel: () => void
  isNew?: boolean
}

export default function EditPropertyForm({ prop, onSave, onCancel, isNew }: Props) {
  const [form, setForm] = useState({ ...prop })
  function set(key: keyof typeof form, val: string | number) {
    setForm(f => ({ ...f, [key]: val }))
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-4 py-2">
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
      <div className="flex justify-end gap-2.5 pt-2 border-t border-border">
        <button className={BTN_S} onClick={onCancel}>Cancelar</button>
        <button className={BTN_P} onClick={() => onSave(form)}>{isNew ? 'Agregar' : 'Guardar'}</button>
      </div>
    </>
  )
}
