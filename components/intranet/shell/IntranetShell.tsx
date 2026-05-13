'use client'
import { useIntranet } from '@/context/IntranetContext'
import LoginOverlay from '@/components/intranet/auth/LoginOverlay'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import Modal from './Modal'
import Toast from './Toast'
import Dashboard from '@/components/intranet/views/Dashboard'
import MLS from '@/components/intranet/views/MLS'
import Operaciones from '@/components/intranet/views/Operaciones'
import OpDetail from '@/components/intranet/views/OpDetail'
import Documentos from '@/components/intranet/views/Documentos'
import Zillow from '@/components/intranet/views/Zillow'
import ZonaProp from '@/components/intranet/views/ZonaProp'
import Comisiones from '@/components/intranet/views/Comisiones'
import Usuarios from '@/components/intranet/views/Usuarios'

function ActiveView() {
  const { currentView, viewParam, currentUser } = useIntranet()
  const role = currentUser?.role

  switch (currentView) {
    case 'dashboard': return <Dashboard />
    case 'mls': return <MLS />
    case 'operaciones': return <Operaciones />
    case 'op-detail': return <OpDetail opId={viewParam} />
    case 'documentos': return <Documentos />
    case 'zillow': return <Zillow />
    case 'zonaprop': return <ZonaProp />
    case 'comisiones':
      if (role !== 'admin' && role !== 'manager') return <AccessDenied />
      return <Comisiones />
    case 'usuarios':
      if (role !== 'admin') return <AccessDenied />
      return <Usuarios />
    default: return <Dashboard />
  }
}

function AccessDenied() {
  return (
    <div className="p-10 text-text-3 text-center">Acceso no autorizado.</div>
  )
}

export default function IntranetShell() {
  const { currentUser } = useIntranet()

  if (!currentUser) return <LoginOverlay />

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />
        <div className="flex-1 overflow-y-auto p-6">
          <ActiveView />
        </div>
      </div>
      <Modal />
      <Toast />
    </div>
  )
}
