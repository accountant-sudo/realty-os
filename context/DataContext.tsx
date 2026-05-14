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
  updateOperation: (opId: number, fields: Partial<Operation>) => void
  updateMlsProperty: (propId: number, fields: Partial<MlsProperty>) => void
  addMlsProperty: (prop: Omit<MlsProperty, 'id'>) => void
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
    condoRider: chk(row.condoRider), inspDone: chk(row.inspDone), reinsp: chk(row.reinsp),
  } as Operation
}

export function DataProvider({ children }: { children: ReactNode }) {
  const [operations, setOperations] = useState<Operation[]>([])
  const [mlsProperties, setMlsProperties] = useState<MlsProperty[]>([])
  const [agents, setAgents] = useState<Agent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch('/api/operations').then(r => r.json()),
      fetch('/api/mls').then(r => r.json()),
      fetch('/api/agents').then(r => r.json()),
    ]).then(([ops, mls, ags]) => {
      setOperations((ops as Record<string, unknown>[]).map(dbToOperation))
      setMlsProperties(mls as MlsProperty[])
      setAgents(ags as Agent[])
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

  const updateOperation = useCallback((opId: number, fields: Partial<Operation>) => {
    setOperations(prev => prev.map(op => op.id === opId ? { ...op, ...fields } : op))
    const dbFields = Object.fromEntries(
      Object.entries(fields).map(([k, v]) => [k, typeof v === 'boolean' ? String(v) : v])
    )
    fetch(`/api/operations/${opId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dbFields),
    }).catch(console.error)
  }, [])

  const updateMlsProperty = useCallback((propId: number, fields: Partial<MlsProperty>) => {
    setMlsProperties(prev => prev.map(p => p.id === propId ? { ...p, ...fields } : p))
    fetch(`/api/mls/${propId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fields),
    }).catch(console.error)
  }, [])

  const addMlsProperty = useCallback(async (prop: Omit<MlsProperty, 'id'>) => {
    const res = await fetch('/api/mls', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(prop),
    })
    const created = await res.json() as MlsProperty
    setMlsProperties(prev => [...prev, created])
  }, [])

  const realtors: Realtor[] = [
    { id: 'carlos', name: 'Carlos' },
    { id: 'elisabeth', name: 'Elisabeth' },
    { id: 'none', name: 'Sin realtor' },
  ]

  return (
    <DataContext.Provider value={{
      operations, mlsProperties, agents, realtors, loading,
      cycleChk, updateOperation, updateMlsProperty, addMlsProperty,
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
