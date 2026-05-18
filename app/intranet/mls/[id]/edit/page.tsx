'use client'
import { use } from 'react'
import { useRouter } from 'next/navigation'
import { useData } from '@/context/DataContext'
import { useAuth } from '@/context/AuthContext'
import PropertyFormPage from '@/components/intranet/views/mls/PropertyFormPage'
import type { MlsProperty } from '@/lib/types'

interface Props {
  params: Promise<{ id: string }>
}

export default function EditarPage({ params }: Props) {
  const { id } = use(params)
  const router = useRouter()
  const { mlsProperties, updateMlsProperty, agents } = useData()
  const { canEdit } = useAuth()

  const prop = mlsProperties.find(p => p.id === Number(id))

  if (!canEdit()) {
    router.replace('/intranet/mls')
    return null
  }

  if (!prop) {
    return (
      <div className="flex items-center justify-center min-h-screen text-text-3 text-[13px]">
        Property not found
      </div>
    )
  }

  function handleSave(fields: Omit<MlsProperty, 'id'>) {
    updateMlsProperty(Number(id), fields)
    router.push('/intranet/mls')
  }

  return (
    <PropertyFormPage
      initial={prop}
      agents={agents}
      isNew={false}
      propId={Number(id)}
      onSave={handleSave}
    />
  )
}
