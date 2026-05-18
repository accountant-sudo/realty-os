
export type Role = 'super_admin' | 'admin' | 'manager' | 'agente'
export type NavView =
  | 'dashboard' | 'mls' | 'operations' | 'documents'
  | 'zillow' | 'zonaprop' | 'commissions' | 'users'
  | 'permissions' | 'activity' | 'op-detail'

export interface User {
  pass: string
  role: Role
  name: string
  initials: string
}

export interface CurrentUser {
  id: number
  username: string
  role: Role
  name: string
  initials: string
  allowedViews?: string[]
  canEdit?: boolean
}

export interface UserRecord {
  id: number
  username: string
  role: Role
  name: string
  initials: string
  createdAt: string
}

export interface Agent {
  id: string
  name: string
  lastName: string
  active: number
  closed: number
}

export interface Realtor {
  id: string
  name: string
}

export interface MlsProperty {
  id: number
  createdAt?: string
  address: string
  type: string
  listPrice: number
  agent: string
  agentRaw: string
  admin: string
  listingExp: string
  listingStart?: string
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
  // US-specific
  typology?: string
  rentalStatus?: string
  rentalEstimate?: string
  rentalContractEnd?: string
  annualTax?: string
  lockbox?: string
  tour360?: string
  tourLink?: string
  sellerName?: string
  sellerPhone?: string
  sellerEmail?: string
  // AR-specific
  ownerName?: string
  neighborhood?: string
  rooms?: number
  bedrooms?: number
  bathrooms?: number
  toilets?: number
  parkingSpots?: number
  condition?: string
  floors?: number
  buildingAge?: string
  occupancyStatus?: string
  hoaFees?: number
  orientation?: string
  layout?: string
  coveredArea?: number
  semiCoveredArea?: number
  totalArea?: number
  openArea?: number
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
  titleCompany: string
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
  inspEstimatedDate: string
  inspNotes: string
  appraisal: string
  reinspection: ChkValue
  agentSplitPct: number
  realtorSplitPct: number
  brokerSplitPct: number
  pending: string
  closingNear: boolean
  isRented: boolean
  leaseAgreementSent: boolean
  estoppelSent: boolean
}

export interface Alert {
  type: 'warning' | 'danger' | 'info'
  opId: number
  address: string
  msg: string
  icon: string
  kind: 'closing' | 'insp' | 'missing'
}
