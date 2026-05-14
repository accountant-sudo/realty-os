
export type Role = 'admin' | 'manager' | 'agente'
export type NavView =
  | 'dashboard' | 'mls' | 'operaciones' | 'documentos'
  | 'zillow' | 'zonaprop' | 'comisiones' | 'usuarios' | 'op-detail'

export interface User {
  pass: string
  role: Role
  name: string
  initials: string
}

export interface CurrentUser {
  username: string
  role: Role
  name: string
  initials: string
}

export interface Agent {
  id: string
  name: string
  active: number
  closed: number
}

export interface Realtor {
  id: string
  name: string
}

export interface MlsProperty {
  id: number
  address: string
  type: 'SF' | 'Condo' | 'TH'
  listPrice: number
  agent: string
  agentRaw: string
  admin: string
  listingExp: string
  showingInst: string
  mlsStatus: 'published' | 'under_contract' | 'withdrawn'
  mlsNum: string
  zillow: string
  notes: string
  country: 'US' | 'AR'
  usState: string
  city: string
  daysListed: number
  zillowViews: number
}

export type ChkValue = boolean | 'na'

export interface Operation {
  id: number
  address: string
  type: string
  price: number
  financing: string
  agent: string
  realtor: string
  titleCo: string
  clientId: number
  buyerName: string
  execDate: string
  closingDate: string
  closingDateISO: string
  status: 'ACTIVA' | 'CERRADA' | 'CANCELADA'
  commissionPaid: boolean
  compSigned: ChkValue
  compPct: number
  compFixed?: number
  escrow: ChkValue
  lbp: ChkValue
  sd: ChkValue
  flood: ChkValue
  condoDocs: ChkValue
  condoRider: ChkValue
  inspDone: ChkValue
  inspStatus: string
  inspNotes: string
  appraisal: string
  reinsp: ChkValue
  pending: string
  closingNear: boolean
  isRented: boolean
  leaseAgreementSent: boolean
  estoppelSent: boolean
}

export interface Alert {
  type: 'warning' | 'danger'
  opId: number
  address: string
  msg: string
  icon: string
  kind: 'closing' | 'insp'
}

