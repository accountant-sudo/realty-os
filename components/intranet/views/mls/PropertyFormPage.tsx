'use client'
import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import AgentChip from '@/components/intranet/ui/AgentChip'
import Badge from '@/components/intranet/ui/Badge'
import { mlsStatusClass, mlsStatusLabel, countryFlag, fmtPrice } from '@/lib/helpers'
import type { MlsProperty, Agent } from '@/lib/types'

const I = 'w-full px-3 py-2 border border-border rounded-[6px] text-[13px] bg-surface focus:outline-none focus:border-gold focus:ring-[3px] focus:ring-gold-light transition-colors font-[inherit]'
const L = 'text-[12px] font-semibold text-text-2 mb-1 block'
const SECTION = 'text-[11px] font-semibold text-text-3 uppercase tracking-wider mb-3 mt-1'
const BTN_P = 'inline-flex items-center gap-1.5 px-4 py-2 rounded-[6px] text-[13px] font-medium cursor-pointer border transition-all bg-gold text-text-primary border-gold hover:bg-gold-dark hover:border-gold-dark hover:text-white disabled:opacity-50 disabled:cursor-not-allowed'
const BTN_S = 'inline-flex items-center gap-1.5 px-4 py-2 rounded-[6px] text-[13px] font-medium cursor-pointer border transition-all bg-surface text-text-2 border-border hover:bg-bg'

const US_TYPES = ['SF', 'Condo', 'TH', 'Vacant Land', 'En construcción', 'En desarrollo', 'Proyecto']
const AR_TYPES = ['Departamento', 'Casa', 'PH', 'Terreno', 'Oficina', 'Local', 'Edificio Comercial', 'Cochera', 'Hotel', 'Fondo de Comercio']
const US_ADMIN = ['State Street', 'Management JAX', 'Rent & Fun', 'Golden Key', 'MDPM', 'Rondo', 'Revive', 'Otra']
const RENTA_OPTS = ['Si', 'No', 'Section 8', 'Temporal', 'Garantizada', 'Leaseback program / Renta garantizada']
const CONDICION_OPTS = ['Excelente', 'Muy Bueno', 'Bueno', 'Reciclado', 'A refaccionar', 'Regular']
const ANTIGUEDAD_OPTS = ['A estrenar', 'En construcción', '1-5 años', '6-10 años', '11-20 años', '+20 años']
const ORIENTACION_OPTS = ['Norte', 'Sur', 'Este', 'Oeste', 'Noroeste', 'Suroeste', 'Noreste', 'Sudeste']
const DISPOSICION_OPTS = ['Frente', 'Contrafrente', 'Interno', 'Lateral']

const US_KEY_FIELDS = ['address', 'listPrice', 'agent', 'type', 'city', 'usState', 'mlsNum', 'listingExp', 'sellerName', 'typology', 'rentalStatus', 'annualTax'] as const
const AR_KEY_FIELDS = ['address', 'listPrice', 'agent', 'type', 'city', 'neighborhood', 'bedrooms', 'bathrooms', 'coveredArea', 'totalArea', 'listingExp', 'ownerName'] as const

type FormState = Omit<MlsProperty, 'id'>

interface Props {
  initial: FormState
  agents: Agent[]
  isNew: boolean
  onSave: (fields: FormState) => Promise<void> | void
}

export default function PropertyFormPage({ initial, agents, isNew, onSave }: Props) {
  const router = useRouter()
  const [form, setForm] = useState<FormState>({
    typology: '', rentalStatus: '', rentalEstimate: '', rentalContractEnd: '',
    annualTax: '', lockbox: '', tour360: '', tourLink: '',
    sellerName: '', sellerPhone: '', sellerEmail: '',
    ownerName: '', neighborhood: '', rooms: 0, bedrooms: 0, bathrooms: 0,
    toilets: 0, parkingSpots: 0, condition: '', floors: 0, buildingAge: '',
    occupancyStatus: '', hoaFees: 0, orientation: '', layout: '',
    coveredArea: 0, semiCoveredArea: 0, totalArea: 0, openArea: 0,
    ...initial,
  })
  const [saving, setSaving] = useState(false)

  function set<K extends keyof FormState>(key: K, val: FormState[K]) {
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

  async function handleSave() {
    setSaving(true)
    try { await onSave(form) } finally { setSaving(false) }
  }

  const isUS = form.country === 'US'
  const canSave = !!form.address.trim() && !!form.listPrice

  const progress = useMemo(() => {
    const keys = isUS ? US_KEY_FIELDS : AR_KEY_FIELDS
    const filled = keys.filter(k => {
      const v = form[k as keyof FormState]
      return v !== undefined && v !== null && v !== '' && v !== 0
    }).length
    return { filled, total: keys.length, pct: Math.round(filled / keys.length * 100) }
  }, [form, isUS])

  return (
    <div>
      {/* Breadcrumb + actions */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-[13px]">
          <button
            onClick={() => router.push('/intranet/mls')}
            className="text-text-3 hover:text-text-1 transition-colors"
          >
            MLS
          </button>
          <span className="text-text-3">/</span>
          <span className="text-text-1 font-medium">
            {isNew ? 'Nueva propiedad' : (form.address || 'Editar')}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button className={BTN_S} onClick={() => router.push('/intranet/mls')}>
            Cancelar
          </button>
          <button className={BTN_P} onClick={handleSave} disabled={!canSave || saving}>
            {saving ? 'Guardando…' : isNew ? 'Agregar propiedad' : 'Guardar cambios'}
          </button>
        </div>
      </div>

      {/* Two-column body */}
      <div className="flex gap-8 items-start">

        {/* ── Left: form ── */}
        <div className="flex-1 min-w-0">

          {/* Country tabs */}
          <div className="flex border-b border-border mb-6">
            {(['US', 'AR'] as const).map(c => (
              <button
                key={c}
                type="button"
                onClick={() => switchCountry(c)}
                className={`px-5 py-3 text-[13px] font-medium border-b-2 transition-colors ${
                  form.country === c
                    ? 'border-gold text-gold'
                    : 'border-transparent text-text-3 hover:text-text-2'
                }`}
              >
                {c === 'US' ? '🇺🇸 Estados Unidos' : '🇦🇷 Argentina'}
              </button>
            ))}
          </div>

          {/* Basic fields */}
          <div className="bg-surface border border-border rounded-[10px] p-5 mb-4">
            <p className={SECTION}>Información básica</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 flex flex-col gap-1">
                <label className={L}>Dirección *</label>
                <input className={I} value={form.address} onChange={e => set('address', e.target.value)} placeholder="1234 Main St" />
              </div>

              <div className="flex flex-col gap-1">
                <label className={L}>Agente</label>
                <select className={I} value={form.agent} onChange={e => set('agent', e.target.value)}>
                  <option value="">Sin asignar</option>
                  {agents.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className={L}>Precio (USD) *</label>
                <input className={I} type="number" value={form.listPrice || ''} onChange={e => set('listPrice', Number(e.target.value))} />
              </div>

              <div className="flex flex-col gap-1">
                <label className={L}>Tipo de propiedad</label>
                <select className={I} value={form.type} onChange={e => set('type', e.target.value)}>
                  {(isUS ? US_TYPES : AR_TYPES).map(t => <option key={t}>{t}</option>)}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className={L}>Estado MLS</label>
                <select className={I} value={form.mlsStatus} onChange={e => set('mlsStatus', e.target.value as MlsProperty['mlsStatus'])}>
                  <option value="published">{isUS ? 'En MLS' : 'En ZonaProp'}</option>
                  <option value="under_contract">Bajo contrato</option>
                  <option value="withdrawn">Retirada</option>
                </select>
              </div>
            </div>
          </div>

          {/* US-specific */}
          {isUS && (
            <>
              <div className="bg-surface border border-border rounded-[10px] p-5 mb-4">
                <p className={SECTION}>Detalles de la propiedad</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className={L}>Estado (US)</label>
                    <select className={I} value={form.usState} onChange={e => set('usState', e.target.value)}>
                      <option>Florida</option><option>Michigan</option><option>Texas</option><option>Georgia</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className={L}>Ciudad</label>
                    <select className={I} value={form.city} onChange={e => set('city', e.target.value)}>
                      <option>Jacksonville</option><option>South Florida</option><option>Orlando</option><option>Miami</option><option>Tampa</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className={L}>Administración</label>
                    <select className={I} value={form.admin} onChange={e => set('admin', e.target.value)}>
                      <option value="">—</option>
                      {US_ADMIN.map(a => <option key={a}>{a}</option>)}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className={L}>Tipología</label>
                    <input className={I} value={form.typology ?? ''} onChange={e => set('typology', e.target.value)} placeholder="Ej: 3/2" />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className={L}>Renta</label>
                    <select className={I} value={form.rentalStatus ?? ''} onChange={e => set('rentalStatus', e.target.value)}>
                      <option value="">—</option>
                      {RENTA_OPTS.map(r => <option key={r}>{r}</option>)}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className={L}>Renta estimada</label>
                    <input className={I} value={form.rentalEstimate ?? ''} onChange={e => set('rentalEstimate', e.target.value)} placeholder="$1,200/mes" />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className={L}>Fin contrato renta</label>
                    <input className={I} type="date" value={form.rentalContractEnd ?? ''} onChange={e => set('rentalContractEnd', e.target.value)} />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className={L}>Impuesto anual</label>
                    <input className={I} value={form.annualTax ?? ''} onChange={e => set('annualTax', e.target.value)} placeholder="$2,400" />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className={L}>Lockbox</label>
                    <input className={I} value={form.lockbox ?? ''} onChange={e => set('lockbox', e.target.value)} placeholder="Código" />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className={L}>Tour 360</label>
                    <select className={I} value={form.tour360 ?? ''} onChange={e => set('tour360', e.target.value)}>
                      <option value="">—</option><option>Si</option><option>No</option>
                    </select>
                  </div>

                  <div className="col-span-2 flex flex-col gap-1">
                    <label className={L}>Link tour</label>
                    <input className={I} value={form.tourLink ?? ''} onChange={e => set('tourLink', e.target.value)} placeholder="https://…" />
                  </div>
                </div>
              </div>

              <div className="bg-surface border border-border rounded-[10px] p-5 mb-4">
                <p className={SECTION}>Seller</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className={L}>Nombre / LLC</label>
                    <input className={I} value={form.sellerName ?? ''} onChange={e => set('sellerName', e.target.value)} />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className={L}>Teléfono</label>
                    <input className={I} value={form.sellerPhone ?? ''} onChange={e => set('sellerPhone', e.target.value)} placeholder="+1 305…" />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className={L}>Email</label>
                    <input className={I} type="email" value={form.sellerEmail ?? ''} onChange={e => set('sellerEmail', e.target.value)} />
                  </div>
                </div>
              </div>

              <div className="bg-surface border border-border rounded-[10px] p-5 mb-4">
                <p className={SECTION}>Listing</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className={L}>MLS #</label>
                    <input className={I} value={form.mlsNum} onChange={e => set('mlsNum', e.target.value)} />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className={L}>Fecha firma listing</label>
                    <input className={I} type="date" value={form.listingStart ?? ''} onChange={e => set('listingStart', e.target.value)} />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className={L}>Fecha fin listing</label>
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
                </div>
              </div>
            </>
          )}

          {/* AR-specific */}
          {!isUS && (
            <>
              <div className="bg-surface border border-border rounded-[10px] p-5 mb-4">
                <p className={SECTION}>Datos del propietario</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className={L}>Nombre propietario</label>
                    <input className={I} value={form.ownerName ?? ''} onChange={e => set('ownerName', e.target.value)} />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className={L}>Ciudad</label>
                    <input className={I} value={form.city} onChange={e => set('city', e.target.value)} placeholder="Buenos Aires" />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className={L}>Barrio</label>
                    <input className={I} value={form.neighborhood ?? ''} onChange={e => set('neighborhood', e.target.value)} placeholder="Palermo" />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className={L}>Condición</label>
                    <select className={I} value={form.condition ?? ''} onChange={e => set('condition', e.target.value)}>
                      <option value="">—</option>
                      {CONDICION_OPTS.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className={L}>Antigüedad</label>
                    <select className={I} value={form.buildingAge ?? ''} onChange={e => set('buildingAge', e.target.value)}>
                      <option value="">—</option>
                      {ANTIGUEDAD_OPTS.map(a => <option key={a}>{a}</option>)}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className={L}>Situación</label>
                    <select className={I} value={form.occupancyStatus ?? ''} onChange={e => set('occupancyStatus', e.target.value)}>
                      <option value="">—</option><option>Vacía</option><option>Habitada</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-surface border border-border rounded-[10px] p-5 mb-4">
                <p className={SECTION}>Distribución</p>
                <div className="grid grid-cols-3 gap-4">
                  {([
                    ['rooms', 'Ambientes'],
                    ['bedrooms', 'Dormitorios'],
                    ['bathrooms', 'Baños'],
                    ['toilets', 'Toilettes'],
                    ['parkingSpots', 'Cocheras'],
                    ['floors', 'Plantas'],
                  ] as [keyof FormState, string][]).map(([key, label]) => (
                    <div key={String(key)} className="flex flex-col gap-1">
                      <label className={L}>{label}</label>
                      <input className={I} type="number" min={0} value={(form[key] as number) || ''} onChange={e => set(key, Number(e.target.value) as never)} />
                    </div>
                  ))}

                  <div className="flex flex-col gap-1">
                    <label className={L}>Orientación</label>
                    <select className={I} value={form.orientation ?? ''} onChange={e => set('orientation', e.target.value)}>
                      <option value="">—</option>
                      {ORIENTACION_OPTS.map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className={L}>Disposición</label>
                    <select className={I} value={form.layout ?? ''} onChange={e => set('layout', e.target.value)}>
                      <option value="">—</option>
                      {DISPOSICION_OPTS.map(d => <option key={d}>{d}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-surface border border-border rounded-[10px] p-5 mb-4">
                <p className={SECTION}>Superficies (m²)</p>
                <div className="grid grid-cols-2 gap-4">
                  {([
                    ['coveredArea', 'Cubierta'],
                    ['semiCoveredArea', 'Semicubierta'],
                    ['totalArea', 'Total construido'],
                    ['openArea', 'Descubierta'],
                  ] as [keyof FormState, string][]).map(([key, label]) => (
                    <div key={String(key)} className="flex flex-col gap-1">
                      <label className={L}>{label}</label>
                      <input className={I} type="number" min={0} step="0.1" value={(form[key] as number) || ''} onChange={e => set(key, Number(e.target.value) as never)} />
                    </div>
                  ))}

                  <div className="flex flex-col gap-1">
                    <label className={L}>Expensas $</label>
                    <input className={I} type="number" value={form.hoaFees || ''} onChange={e => set('hoaFees', Number(e.target.value))} />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className={L}>Fecha fin listing</label>
                    <input className={I} type="date" value={form.listingExp} onChange={e => set('listingExp', e.target.value)} />
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Notes — common */}
          <div className="bg-surface border border-border rounded-[10px] p-5 mb-4">
            <p className={SECTION}>Notas</p>
            <textarea
              className={I}
              style={{ resize: 'vertical', minHeight: 96 }}
              value={form.notes}
              onChange={e => set('notes', e.target.value)}
              placeholder="Notas internas…"
            />
          </div>
        </div>

        {/* ── Right: live preview ── */}
        <div className="w-[320px] shrink-0 sticky top-0">
          <div className="bg-surface border border-border rounded-[10px] overflow-hidden">
            {/* Preview header */}
            <div className="px-5 pt-5 pb-4 border-b border-border">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[18px]">{countryFlag(form.country)}</span>
                <Badge cls={mlsStatusClass(form.mlsStatus)}>
                  {mlsStatusLabel(form.mlsStatus, form.country)}
                </Badge>
              </div>
              <div className="text-[15px] font-semibold text-text-1 leading-snug mt-2">
                {form.address || <span className="text-text-3 font-normal">Sin dirección</span>}
              </div>
              <div className="text-[12px] text-text-3 mt-0.5">
                {form.city}{form.usState ? `, ${form.usState}` : ''}
              </div>
            </div>

            {/* Preview body */}
            <div className="px-5 py-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[12px] text-text-3">Precio</span>
                <span className="text-[14px] font-semibold text-text-1">{fmtPrice(form.listPrice)}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[12px] text-text-3">Tipo</span>
                <span className="text-[12px] font-medium text-text-2 bg-bg px-2 py-0.5 rounded">{form.type || '—'}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[12px] text-text-3">Agente</span>
                <AgentChip agentId={form.agent} agents={agents} />
              </div>

              {isUS && form.typology && (
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-text-3">Tipología</span>
                  <span className="text-[12px] text-text-2">{form.typology}</span>
                </div>
              )}

              {isUS && form.rentalStatus && (
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-text-3">Renta</span>
                  <span className="text-[12px] text-text-2">{form.rentalStatus}</span>
                </div>
              )}

              {!isUS && (form.bedrooms || form.bathrooms) ? (
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-text-3">Distribución</span>
                  <span className="text-[12px] text-text-2">
                    {form.bedrooms ? `${form.bedrooms} dorm.` : ''}{form.bedrooms && form.bathrooms ? ' · ' : ''}{form.bathrooms ? `${form.bathrooms} baños` : ''}
                  </span>
                </div>
              ) : null}

              {!isUS && form.totalArea ? (
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-text-3">Superficie total</span>
                  <span className="text-[12px] text-text-2">{form.totalArea} m²</span>
                </div>
              ) : null}
            </div>

            {/* Completeness progress */}
            <div className="px-5 pb-5 pt-1 border-t border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] text-text-3 font-semibold uppercase tracking-wider">Completitud</span>
                <span className="text-[12px] font-semibold text-text-2">{progress.filled}/{progress.total}</span>
              </div>
              <div className="h-1.5 bg-bg rounded-full overflow-hidden">
                <div
                  className="h-full bg-gold rounded-full transition-all duration-300"
                  style={{ width: `${progress.pct}%` }}
                />
              </div>
              <div className="text-[11px] text-text-3 mt-1.5 text-right">{progress.pct}% completo</div>
            </div>
          </div>

          {/* Save shortcut hint */}
          {!canSave && (
            <p className="text-[11px] text-text-3 text-center mt-3">
              Dirección y precio requeridos para guardar
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
