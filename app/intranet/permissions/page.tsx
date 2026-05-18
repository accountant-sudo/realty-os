import { redirect } from 'next/navigation'

export default function PermisosPage() {
  redirect('/intranet/users?tab=permissions')
}
