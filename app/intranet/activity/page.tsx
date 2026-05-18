import { redirect } from 'next/navigation'

export default function ActividadPage() {
  redirect('/intranet/users?tab=activity')
}
