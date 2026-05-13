'use client'
import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import { DATA } from '@/lib/data'
import { cycleChkValue } from '@/lib/helpers'
import type { Operation, MlsProperty, Agent, Realtor, ChkValue } from '@/lib/types'

interface DataContextValue {
  operations: Operation[]
  mlsProperties: MlsProperty[]
  agents: Agent[]
  realtors: Realtor[]
  cycleChk: (opId: number, key: keyof Operation) => void
  updateOperation: (opId: number, fields: Partial<Operation>) => void
  updateMlsProperty: (propId: number, fields: Partial<MlsProperty>) => void
  addMlsProperty: (prop: Omit<MlsProperty, 'id'>) => void
}

const DataContext = createContext<DataContextValue | null>(null)

export function DataProvider({ children }: { children: ReactNode }) {
  const [operations, setOperations] = useState<Operation[]>(DATA.operations)
  const [mlsProperties, setMlsProperties] = useState<MlsProperty[]>(DATA.mlsProperties)

  const cycleChk = useCallback((opId: number, key: keyof Operation) => {
    setOperations(prev => prev.map(op => {
      if (op.id !== opId) return op
      return { ...op, [key]: cycleChkValue(op[key] as ChkValue) }
    }))
  }, [])

  const updateOperation = useCallback((opId: number, fields: Partial<Operation>) => {
    setOperations(prev => prev.map(op => op.id === opId ? { ...op, ...fields } : op))
  }, [])

  const updateMlsProperty = useCallback((propId: number, fields: Partial<MlsProperty>) => {
    setMlsProperties(prev => prev.map(p => p.id === propId ? { ...p, ...fields } : p))
  }, [])

  const addMlsProperty = useCallback((prop: Omit<MlsProperty, 'id'>) => {
    setMlsProperties(prev => [...prev, { ...prop, id: Date.now() }])
  }, [])

  return (
    <DataContext.Provider value={{
      operations, mlsProperties,
      agents: DATA.agents, realtors: DATA.realtors,
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
