'use client'
import { useState } from 'react'
import type { MlsProperty, Agent } from '@/lib/types'

const I = 'w-full px-3 py-2 border border-border rounded-[6px] text-[13px] bg-surface focus:outline-none focus:border-gold focus:ring-[3px] focus:ring-gold-light transition-colors font-[inherit]'
const L = 'text-[12px] font-semibold text-text-2'
const BTN_P = 'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[6px] text-[13px] font-medium cursor-pointer border transition-all bg-gold text-text-primary border-gold hover:bg-gold-dark hover:border-gold-dark hover:text-white disabled:opacity-50 disabled:cursor-not-allowed'
const BTN_S = 'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[6px] text-[13px] font-medium cursor-pointer border transition-all bg-surface text-text-2 border-border hover:bg-bg'

const US_TYPES = ['SF', 'Condo', 'TH', 'Vacant Land', 'Under construction', 'In development', 'Project']
const AR_TYPES = ['Apartment', 'House', 'PH', 'Land', 'Office', 'Retail', 'Commercial Building', 'Garage', 'Hotel', 'Business']
const US_ADMIN = ['State Street', 'Management JAX', 'Rent & Fun', 'Golden Key', 'MDPM', 'Rondo', 'Revive', 'Other']
const RENTA_OPTS = ['Yes', 'No', 'Section 8', 'Short-term', 'Guaranteed', 'Leaseback program / Guaranteed rent']
const CONDICION_OPTS = ['Excellent', 'Very Good', 'Good', 'Renovated', 'Needs work', 'Fair']
const ANTIGUEDAD_OPTS = ['Brand new', 'Under construction', '1-5 years', '6-10 years', '11-20 years', '+20 years']
const ORIENTACION_OPTS = ['North', 'South', 'East', 'West', 'Northwest', 'Southwest', 'Northeast', 'Southeast']
const DISPOSICION_OPTS = ['Front', 'Rear', 'Interior', 'Side']

interface Props {
  prop: Omit<MlsProperty, 'id'>
  agents: Agent[]
  onSave: (fields: Omit<MlsProperty, 'id'>) => void
  onCancel: () => void
  isNew?: boolean
}

export default function EditPropertyForm({ prop, agents, onSave, onCancel, isNew }: Props) {
  const [form, setForm] = useState({
    typology: '', rentalStatus: '', rentalEstimate: '', rentalContractEnd: '',
    annualTax: '', lockbox: '', tour360: '', tourLink: '',
    sellerName: '', sellerPhone: '', sellerEmail: '',
    ownerName: '', neighborhood: '', rooms: 0, bedrooms: 0, bathrooms: 0,
    toilets: 0, parkingSpots: 0, condition: '', floors: 0, buildingAge: '',
    occupancyStatus: '', hoaFees: 0, orientation: '', layout: '',
    coveredArea: 0, semiCoveredArea: 0, totalArea: 0, openArea: 0,
    ...prop,
  })

  function set<K extends keyof typeof form>(key: K, val: (typeof form)[K]) {
    setForm(f => ({ ...f, [key]: val }))
  }

  function switchCountry(c: 'US' | 'AR') {
    setForm(f => ({
      ...f,
      country: c,
      type: c === 'US' ? 'SF' : 'Departamento',
      city: c === 'US' ? 'Jacksonville' : 'Buenos Aires',
      usState: c === 'US' ? 'Florida' : '',
    }))
  }

  const isUS = form.country === 'US'

  return (
    <>
      {/* Country tabs */}
      <div className="flex border-b border-border mb-4">
        <button
          type="button"
          onClick={() => switchCountry('US')}
          className={`px-4 py-2.5 text-[13px] font-medium border-b-2 transition-colors ${isUS ? 'border-gold text-gold' : 'border-transparent text-text-3 hover:text-text-2'}`}
        >
          🇺🇸 United States
        </button>
        <button
          type="button"
          onClick={() => switchCountry('AR')}
          className={`px-4 py-2.5 text-[13px] font-medium border-b-2 transition-colors ${!isUS ? 'border-gold text-gold' : 'border-transparent text-text-3 hover:text-text-2'}`}
        >
          🇦🇷 Argentina
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 max-h-[55vh] overflow-y-auto pr-1 pb-2">

        {/* ── Common fields ── */}
        <div className="col-span-2 flex flex-col gap-1">
          <label className={L}>Address *</label>
          <input className={I} value={form.address} onChange={e => set('address', e.target.value)} />
        </div>

        <div className="flex flex-col gap-1">
          <label className={L}>Agent</label>
          <select className={I} value={form.agent} onChange={e => set('agent', e.target.value)}>
            <option value="">Unassigned</option>
            {agents.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className={L}>Price (USD) *</label>
          <input className={I} type="number" value={form.listPrice || ''} onChange={e => set('listPrice', Number(e.target.value))} />
        </div>

        <div className="flex flex-col gap-1">
          <label className={L}>Property type</label>
          <select className={I} value={form.type} onChange={e => set('type', e.target.value)}>
            {(isUS ? US_TYPES : AR_TYPES).map(t => <option key={t}>{t}</option>)}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className={L}>MLS status</label>
          <select className={I} value={form.mlsStatus} onChange={e => set('mlsStatus', e.target.value as MlsProperty['mlsStatus'])}>
            <option value="published">{isUS ? 'On MLS' : 'On ZonaProp'}</option>
            <option value="under_contract">Under contract</option>
            <option value="withdrawn">Withdrawn</option>
          </select>
        </div>

        {/* ── US-specific ── */}
        {isUS && (<>
          <div className="flex flex-col gap-1">
            <label className={L}>State (US)</label>
            <select className={I} value={form.usState} onChange={e => set('usState', e.target.value)}>
              <option>Florida</option><option>Michigan</option><option>Texas</option><option>Georgia</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className={L}>City</label>
            <select className={I} value={form.city} onChange={e => set('city', e.target.value)}>
              <option>Jacksonville</option><option>South Florida</option><option>Orlando</option><option>Miami</option><option>Tampa</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className={L}>Management</label>
            <select className={I} value={form.admin} onChange={e => set('admin', e.target.value)}>
              <option value="">—</option>
              {US_ADMIN.map(a => <option key={a}>{a}</option>)}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className={L}>Typology</label>
            <input className={I} value={form.typology} onChange={e => set('typology', e.target.value)} placeholder="e.g. 3/2" />
          </div>

          <div className="flex flex-col gap-1">
            <label className={L}>Rental</label>
            <select className={I} value={form.rentalStatus} onChange={e => set('rentalStatus', e.target.value)}>
              <option value="">—</option>
              {RENTA_OPTS.map(r => <option key={r}>{r}</option>)}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className={L}>Estimated rent</label>
            <input className={I} value={form.rentalEstimate} onChange={e => set('rentalEstimate', e.target.value)} placeholder="$1,200/mo" />
          </div>

          <div className="flex flex-col gap-1">
            <label className={L}>Rental contract end</label>
            <input className={I} type="date" value={form.rentalContractEnd} onChange={e => set('rentalContractEnd', e.target.value)} />
          </div>

          <div className="flex flex-col gap-1">
            <label className={L}>Annual tax</label>
            <input className={I} value={form.annualTax} onChange={e => set('annualTax', e.target.value)} placeholder="$2,400" />
          </div>

          <div className="flex flex-col gap-1">
            <label className={L}>Lockbox</label>
            <input className={I} value={form.lockbox} onChange={e => set('lockbox', e.target.value)} placeholder="Code" />
          </div>

          <div className="flex flex-col gap-1">
            <label className={L}>Tour 360</label>
            <select className={I} value={form.tour360} onChange={e => set('tour360', e.target.value)}>
              <option value="">—</option><option>Yes</option><option>No</option>
            </select>
          </div>

          <div className="col-span-2 flex flex-col gap-1">
            <label className={L}>Tour link</label>
            <input className={I} value={form.tourLink} onChange={e => set('tourLink', e.target.value)} placeholder="https://…" />
          </div>

          <div className="col-span-2 border-t border-border pt-3">
            <p className="text-[11px] font-semibold text-text-3 uppercase tracking-wider mb-3">Seller</p>
          </div>

          <div className="flex flex-col gap-1">
            <label className={L}>Name / LLC</label>
            <input className={I} value={form.sellerName} onChange={e => set('sellerName', e.target.value)} />
          </div>

          <div className="flex flex-col gap-1">
            <label className={L}>Phone</label>
            <input className={I} value={form.sellerPhone} onChange={e => set('sellerPhone', e.target.value)} placeholder="+1 305…" />
          </div>

          <div className="flex flex-col gap-1">
            <label className={L}>Email</label>
            <input className={I} type="email" value={form.sellerEmail} onChange={e => set('sellerEmail', e.target.value)} />
          </div>

          <div className="flex flex-col gap-1">
            <label className={L}>MLS #</label>
            <input className={I} value={form.mlsNum} onChange={e => set('mlsNum', e.target.value)} />
          </div>

          <div className="flex flex-col gap-1">
            <label className={L}>Listing start date</label>
            <input className={I} type="date" value={form.listingStart} onChange={e => set('listingStart', e.target.value)} />
          </div>

          <div className="flex flex-col gap-1">
            <label className={L}>Listing expiration</label>
            <input className={I} type="date" value={form.listingExp} onChange={e => set('listingExp', e.target.value)} />
          </div>

          <div className="col-span-2 flex flex-col gap-1">
            <label className={L}>Showing instructions</label>
            <textarea className={I} style={{ resize: 'vertical', minHeight: 72 }} value={form.showingInst} onChange={e => set('showingInst', e.target.value)} />
          </div>

          <div className="col-span-2 flex flex-col gap-1">
            <label className={L}>Zillow URL</label>
            <input className={I} value={form.zillow} onChange={e => set('zillow', e.target.value)} placeholder="https://www.zillow.com/…" />
          </div>
        </>)}

        {/* ── AR-specific ── */}
        {!isUS && (<>
          <div className="flex flex-col gap-1">
            <label className={L}>Owner name</label>
            <input className={I} value={form.ownerName} onChange={e => set('ownerName', e.target.value)} />
          </div>

          <div className="flex flex-col gap-1">
            <label className={L}>City</label>
            <input className={I} value={form.city} onChange={e => set('city', e.target.value)} placeholder="Buenos Aires" />
          </div>

          <div className="flex flex-col gap-1">
            <label className={L}>Neighborhood</label>
            <input className={I} value={form.neighborhood} onChange={e => set('neighborhood', e.target.value)} placeholder="Palermo" />
          </div>

          <div className="flex flex-col gap-1">
            <label className={L}>Condition</label>
            <select className={I} value={form.condition} onChange={e => set('condition', e.target.value)}>
              <option value="">—</option>
              {CONDICION_OPTS.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className={L}>Building age</label>
            <select className={I} value={form.buildingAge} onChange={e => set('buildingAge', e.target.value)}>
              <option value="">—</option>
              {ANTIGUEDAD_OPTS.map(a => <option key={a}>{a}</option>)}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className={L}>Occupancy</label>
            <select className={I} value={form.occupancyStatus} onChange={e => set('occupancyStatus', e.target.value)}>
              <option value="">—</option><option>Vacant</option><option>Occupied</option>
            </select>
          </div>

          <div className="col-span-2 border-t border-border pt-3">
            <p className="text-[11px] font-semibold text-text-3 uppercase tracking-wider mb-3">Layout</p>
          </div>

          {([
            ['rooms', 'Rooms'],
            ['bedrooms', 'Bedrooms'],
            ['bathrooms', 'Bathrooms'],
            ['toilets', 'Toilets'],
            ['parkingSpots', 'Parking spots'],
            ['floors', 'Floors'],
          ] as [keyof typeof form, string][]).map(([key, label]) => (
            <div key={key} className="flex flex-col gap-1">
              <label className={L}>{label}</label>
              <input className={I} type="number" min={0} value={(form[key] as number) || ''} onChange={e => set(key, Number(e.target.value) as never)} />
            </div>
          ))}

          <div className="flex flex-col gap-1">
            <label className={L}>Orientation</label>
            <select className={I} value={form.orientation} onChange={e => set('orientation', e.target.value)}>
              <option value="">—</option>
              {ORIENTACION_OPTS.map(o => <option key={o}>{o}</option>)}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className={L}>Disposition</label>
            <select className={I} value={form.layout} onChange={e => set('layout', e.target.value)}>
              <option value="">—</option>
              {DISPOSICION_OPTS.map(d => <option key={d}>{d}</option>)}
            </select>
          </div>

          <div className="col-span-2 border-t border-border pt-3">
            <p className="text-[11px] font-semibold text-text-3 uppercase tracking-wider mb-3">Areas (m²)</p>
          </div>

          {([
            ['coveredArea', 'Covered'],
            ['semiCoveredArea', 'Semi-covered'],
            ['totalArea', 'Total built'],
            ['openArea', 'Open'],
          ] as [keyof typeof form, string][]).map(([key, label]) => (
            <div key={key} className="flex flex-col gap-1">
              <label className={L}>{label}</label>
              <input className={I} type="number" min={0} step="0.1" value={(form[key] as number) || ''} onChange={e => set(key, Number(e.target.value) as never)} />
            </div>
          ))}

          <div className="flex flex-col gap-1">
            <label className={L}>HOA fees $</label>
            <input className={I} type="number" value={form.hoaFees || ''} onChange={e => set('hoaFees', Number(e.target.value))} />
          </div>

          <div className="flex flex-col gap-1">
            <label className={L}>Listing expiration</label>
            <input className={I} type="date" value={form.listingExp} onChange={e => set('listingExp', e.target.value)} />
          </div>
        </>)}

        {/* ── Notes (common) ── */}
        <div className="col-span-2 flex flex-col gap-1">
          <label className={L}>Notes</label>
          <textarea className={I} style={{ resize: 'vertical', minHeight: 72 }} value={form.notes} onChange={e => set('notes', e.target.value)} />
        </div>
      </div>

      <div className="flex justify-end gap-2.5 pt-3 border-t border-border">
        <button className={BTN_S} onClick={onCancel}>Cancel</button>
        <button
          className={BTN_P}
          onClick={() => onSave(form)}
          disabled={!form.address.trim() || !form.listPrice}
        >
          {isNew ? 'Add property' : 'Save'}
        </button>
      </div>
    </>
  )
}
