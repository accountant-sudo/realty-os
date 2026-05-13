'use client'
import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import { AuthProvider, useAuth } from './AuthContext'
import { DataProvider, useData } from './DataContext'
import type { NavView, ModalState } from '@/lib/types'

interface UIContextValue {
  currentView: NavView
  viewParam: number | null
  modalState: ModalState
  toast: string | null
  goTo: (view: NavView, param?: number | null) => void
  openModal: (title: string, body: ReactNode) => void
  closeModal: () => void
  showToast: (msg: string) => void
}

const UIContext = createContext<UIContextValue | null>(null)

function UIProvider({ children }: { children: ReactNode }) {
  const [currentView, setCurrentView] = useState<NavView>('dashboard')
  const [viewParam, setViewParam] = useState<number | null>(null)
  const [modalState, setModalState] = useState<ModalState>({ open: false, title: '', body: null })
  const [toast, setToast] = useState<string | null>(null)

  const closeModal = useCallback(() => setModalState({ open: false, title: '', body: null }), [])

  const goTo = useCallback((view: NavView, param: number | null = null) => {
    setCurrentView(view)
    setViewParam(param)
  }, [])

  const openModal = useCallback((title: string, body: ReactNode) => {
    setModalState({ open: true, title, body })
  }, [])

  const showToast = useCallback((msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 2500)
  }, [])

  return (
    <UIContext.Provider value={{ currentView, viewParam, modalState, toast, goTo, openModal, closeModal, showToast }}>
      {children}
    </UIContext.Provider>
  )
}

function useUI(): UIContextValue {
  const ctx = useContext(UIContext)
  if (!ctx) throw new Error('useUI must be used within UIProvider')
  return ctx
}

export function IntranetProvider({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <DataProvider>
        <UIProvider>
          {children}
        </UIProvider>
      </DataProvider>
    </AuthProvider>
  )
}

export function useIntranet() {
  return { ...useAuth(), ...useData(), ...useUI() }
}
