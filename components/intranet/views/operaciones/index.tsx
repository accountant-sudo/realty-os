'use client'
import { useState } from 'react'
import { useData } from '@/context/DataContext'
import OperacionesTabs from './OperacionesTabs'
import OperacionesTable from './OperacionesTable'

export default function Operaciones() {
  const { operations, agents } = useData()
  const [tab, setTab] = useState<'activas' | 'cerradas'>('activas')

  const activas = operations.filter(o => o.status === 'ACTIVA')
  const cerradas = operations.filter(o => o.status === 'CERRADA')
  const list = tab === 'activas' ? activas : cerradas

  return (
    <>
      <OperacionesTabs
        tab={tab}
        activasCount={activas.length}
        cerradasCount={cerradas.length}
        onChange={setTab}
      />
      <OperacionesTable operations={list} agents={agents} />
    </>
  )
}
