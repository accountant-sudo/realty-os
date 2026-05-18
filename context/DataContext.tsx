'use client'
import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'
import { cycleChkValue } from '@/lib/helpers'
import type { Operation, MlsProperty, Agent, Realtor, ChkValue } from '@/lib/types'

interface DataContextValue {
  operations: Operation[]
  mlsProperties: MlsProperty[]
  agents: Agent[]
  realtors: Realtor[]
  loading: boolean
  cycleChk: (opId: number, key: keyof Operation) => void
  updateOperation: (opId: number, fields: Partial<Operation>) => Promise<void>
  addOperation: (op: Omit<Operation, 'id'>) => Promise<void>
  deleteOperation: (opId: number) => void
  updateMlsProperty: (propId: number, fields: Partial<MlsProperty>) => void
  addMlsProperty: (prop: Omit<MlsProperty, 'id'>) => Promise<MlsProperty>
  deleteMlsProperty: (propId: number) => void
}

const DataContext = createContext<DataContextValue | null>(null)

function dbToOperation(row: Record<string, unknown>): Operation {
  const chk = (v: unknown): ChkValue => {
    if (v === 'na') return 'na'
    return v === 'true' || v === true
  }
  return {
    ...row,
    compSigned: chk(row.compSigned), escrow: chk(row.escrow), lbp: chk(row.lbp),
    sd: chk(row.sd), flood: chk(row.flood), condoDocs: chk(row.condoDocs),
    condoRider: chk(row.condoRider), inspDone: chk(row.inspDone), reinspection: chk(row.reinspection),
  } as Operation
}

export function DataProvider({ children }: { children: ReactNode }) {
  const [operations, setOperations] = useState<Operation[]>([])
  const [mlsProperties, setMlsProperties] = useState<MlsProperty[]>([])
  const [agents, setAgents] = useState<Agent[]>([])
  const [realtors, setRealtors] = useState<Realtor[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch('/api/operations').then(r => r.json()),
      fetch('/api/mls').then(r => r.json()),
      fetch('/api/agents').then(r => r.json()),
      fetch('/api/realtors').then(r => r.json()),
    ]).then(([ops, mls, ags, rltrs]) => {
      setOperations((ops as Record<string, unknown>[]).map(dbToOperation))
      setMlsProperties(mls as MlsProperty[])
      setAgents(ags as Agent[])
      setRealtors(rltrs as Realtor[])
    }).catch(console.error).finally(() => setLoading(false))
  }, [])

  const cycleChk = useCallback((opId: number, key: keyof Operation) => {
    setOperations(prev => prev.map(op => {
      if (op.id !== opId) return op
      const next = cycleChkValue(op[key] as ChkValue)
      fetch(`/api/operations/${opId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [key]: String(next) }),
      }).catch(console.error)
      return { ...op, [key]: next }
    }))
  }, [])

  // These fields are stored as TEXT in Postgres (ChkValue); all other booleans are real BOOLEAN columns
  const CHK_KEYS = new Set(['compSigned', 'escrow', 'lbp', 'sd', 'flood', 'condoDocs', 'condoRider', 'inspDone', 'reinspection'])

  const updateOperation = useCallback(async (opId: number, fields: Partial<Operation>) => {
    setOperations(prev => prev.map(op => op.id === opId ? { ...op, ...fields } : op))
    const dbFields = Object.fromEntries(
      Object.entries(fields).map(([k, v]) => [k, CHK_KEYS.has(k) ? String(v) : v])
    )
    const res = await fetch(`/api/operations/${opId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dbFields),
    })
    if (!res.ok) throw new Error('Failed to save')
  }, [])

  const updateMlsProperty = useCallback((propId: number, fields: Partial<MlsProperty>) => {
    setMlsProperties(prev => prev.map(p => p.id === propId ? { ...p, ...fields } : p))
    fetch(`/api/mls/${propId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fields),
    }).catch(console.error)
  }, [])

  const addMlsProperty = useCallback(async (prop: Omit<MlsProperty, 'id'>): Promise<MlsProperty> => {
    const res = await fetch('/api/mls', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(prop),
    })
    const created = await res.json() as MlsProperty
    setMlsProperties(prev => [...prev, created])
    return created
  }, [])

  const deleteMlsProperty = useCallback((propId: number) => {
    setMlsProperties(prev => prev.filter(p => p.id !== propId))
    fetch(`/api/mls/${propId}`, { method: 'DELETE' }).catch(console.error)
  }, [])

  const addOperation = useCallback(async (op: Omit<Operation, 'id'>) => {
    const dbFields = Object.fromEntries(
      Object.entries(op).map(([k, v]) => [k, typeof v === 'boolean' ? String(v) : v])
    )
    const res = await fetch('/api/operations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dbFields),
    })
    const created = await res.json() as Record<string, unknown>
    setOperations(prev => [...prev, dbToOperation(created)])
  }, [])

  const deleteOperation = useCallback((opId: number) => {
    setOperations(prev => prev.filter(o => o.id !== opId))
    fetch(`/api/operations/${opId}`, { method: 'DELETE' }).catch(console.error)
  }, [])

  return (
    <DataContext.Provider value={{
      operations, mlsProperties, agents, realtors, loading,
      cycleChk, updateOperation, addOperation, deleteOperation,
      updateMlsProperty, addMlsProperty, deleteMlsProperty,
    }}>
      {children}
    </DataContext.Provider>
  )
}

export function useData(): DataContextValue {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error('useData must be used within DataProvider')
  return ctx
}
