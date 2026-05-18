'use client'
import { useRouter } from 'next/navigation'
import { useData } from '@/context/DataContext'
import { useAuth } from '@/context/AuthContext'
import PropertyFormPage from '@/components/intranet/views/mls/PropertyFormPage'
import type { MlsProperty } from '@/lib/types'

const EMPTY: Omit<MlsProperty, 'id'> = {
  address: '', type: 'SF', listPrice: 0, agent: '', agentRaw: '', admin: '',
  city: 'Jacksonville', country: 'US', usState: 'Florida', mlsStatus: 'published',
  mlsNum: '', zillow: '', notes: '', showingInst: '', listingExp: '', listingStart: '',
  daysListed: 0, zillowViews: 0,
  typology: '', rentalStatus: '', rentalEstimate: '', rentalContractEnd: '',
  annualTax: '', lockbox: '', tour360: '', tourLink: '',
  sellerName: '', sellerPhone: '', sellerEmail: '',
  ownerName: '', neighborhood: '', rooms: 0, bedrooms: 0, bathrooms: 0,
  toilets: 0, parkingSpots: 0, condition: '', floors: 0, buildingAge: '',
  occupancyStatus: '', hoaFees: 0, orientation: '', layout: '',
  coveredArea: 0, semiCoveredArea: 0, totalArea: 0, openArea: 0,
}

export default function NuevaPage() {
  const router = useRouter()
  const { addMlsProperty, agents } = useData()
  const { canEdit } = useAuth()

  if (!canEdit()) {
    router.replace('/intranet/mls')
    return null
  }

  async function handleSave(fields: Omit<MlsProperty, 'id'>): Promise<{ id: number }> {
    const created = await addMlsProperty(fields)
    router.push('/intranet/mls')
    return { id: created.id }
  }

  return (
    <PropertyFormPage
      initial={EMPTY}
      agents={agents}
      isNew={true}
      onSave={handleSave}
    />
  )
}
