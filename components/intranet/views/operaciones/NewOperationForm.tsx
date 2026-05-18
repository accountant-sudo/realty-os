import { useState } from 'react'
import type { Agent, Realtor, Operation } from '@/lib/types'

const INPUT_CLS = 'w-full px-3 py-2 border border-border rounded-[6px] text-[13px] bg-surface focus:outline-none focus:border-gold focus:ring-[3px] focus:ring-gold-light transition-colors font-[inherit]'
const LABEL_CLS = 'text-[12px] font-semibold text-text-2'
const BTN_P = 'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[6px] text-[13px] font-medium cursor-pointer border transition-all bg-gold text-text-primary border-gold hover:bg-gold-dark hover:border-gold-dark hover:text-white'
const BTN_S = 'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[6px] text-[13px] font-medium cursor-pointer border transition-all bg-surface text-text-2 border-border hover:bg-bg'

type NewOp = Omit<Operation, 'id'>

const EMPTY: NewOp = {
  address: '', type: '', price: 0, financing: '', agent: '', realtor: 'none',
  titleCompany: '', clientId: 0, buyerName: '', execDate: '', closingDate: '',
  closingDateISO: '', status: 'ACTIVA', commissionPaid: false,
  compSigned: false, compPct: 0, compFixed: 0,
  escrow: false, lbp: false, sd: false, flood: false,
  condoDocs: false, condoRider: false, inspDone: false,
  inspStatus: '', inspEstimatedDate: '', inspNotes: '', appraisal: '', reinspection: false,
  agentSplitPct: -1, realtorSplitPct: -1, brokerSplitPct: -1,
  pending: '', closingNear: false, isRented: false,
  leaseAgreementSent: false, estoppelSent: false,
}

interface Props {
  agents: Agent[]
  realtors: Realtor[]
  onSave: (op: NewOp) => void
  onCancel: () => void
}

export default function NewOperationForm({ agents, realtors, onSave, onCancel }: Props) {
  const [form, setForm] = useState<NewOp>({ ...EMPTY })
  function set<K extends keyof NewOp>(key: K, val: NewOp[K]) {
    setForm(f => ({ ...f, [key]: val }))
  }

  function handleClosingDate(val: string) {
    set('closingDate', val)
    set('closingDateISO', val)
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-4 py-2 max-h-[60vh] overflow-y-auto pr-1">
        <div className="col-span-2 flex flex-col gap-1">
          <label className={LABEL_CLS}>Address *</label>
          <input className={INPUT_CLS} value={form.address} onChange={e => set('address', e.target.value)} placeholder="1234 Main St, Jacksonville FL" />
        </div>

        <div className="flex flex-col gap-1">
          <label className={LABEL_CLS}>Agent</label>
          <select className={INPUT_CLS} value={form.agent} onChange={e => set('agent', e.target.value)}>
            <option value="">Unassigned</option>
            {agents.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className={LABEL_CLS}>Realtor</label>
          <select className={INPUT_CLS} value={form.realtor} onChange={e => set('realtor', e.target.value)}>
            {realtors.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className={LABEL_CLS}>Price</label>
          <input className={INPUT_CLS} type="number" value={form.price || ''} onChange={e => set('price', Number(e.target.value))} />
        </div>

        <div className="flex flex-col gap-1">
          <label className={LABEL_CLS}>Financing</label>
          <select className={INPUT_CLS} value={form.financing} onChange={e => set('financing', e.target.value)}>
            <option value="">—</option>
            <option>CASH</option>
            <option>CONV</option>
            <option>FHA</option>
            <option>VA</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className={LABEL_CLS}>Exec. date</label>
          <input className={INPUT_CLS} type="date" value={form.execDate} onChange={e => set('execDate', e.target.value)} />
        </div>

        <div className="flex flex-col gap-1">
          <label className={LABEL_CLS}>Closing date</label>
          <input className={INPUT_CLS} type="date" value={form.closingDate} onChange={e => handleClosingDate(e.target.value)} />
        </div>

        <div className="flex flex-col gap-1">
          <label className={LABEL_CLS}>Buyer</label>
          <input className={INPUT_CLS} value={form.buyerName} onChange={e => set('buyerName', e.target.value)} />
        </div>

        <div className="flex flex-col gap-1">
          <label className={LABEL_CLS}>Title Company</label>
          <input className={INPUT_CLS} value={form.titleCompany} onChange={e => set('titleCompany', e.target.value)} />
        </div>

        <div className="flex flex-col gap-1">
          <label className={LABEL_CLS}>Commission %</label>
          <input className={INPUT_CLS} type="number" step="0.1" value={form.compPct || ''} onChange={e => set('compPct', Number(e.target.value))} />
        </div>

        <div className="flex flex-col gap-1">
          <label className={LABEL_CLS}>Fixed commission $</label>
          <input className={INPUT_CLS} type="number" value={form.compFixed || ''} onChange={e => set('compFixed', Number(e.target.value))} />
        </div>

        <div className="col-span-2 flex flex-col gap-1">
          <label className={LABEL_CLS}>Pending note</label>
          <input className={INPUT_CLS} value={form.pending} onChange={e => set('pending', e.target.value)} placeholder="E.g.: Awaiting inspection..." />
        </div>
      </div>

      <div className="flex justify-end gap-2.5 pt-3 border-t border-border">
        <button className={BTN_S} onClick={onCancel}>Cancel</button>
        <button
          className={BTN_P}
          onClick={() => onSave(form)}
          disabled={!form.address.trim()}
        >
          Add operation
        </button>
      </div>
    </>
  )
}
