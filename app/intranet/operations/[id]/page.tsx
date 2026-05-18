import OpDetail from '@/components/intranet/views/OpDetail'

export default async function OpDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <OpDetail opId={Number(id)} />
}
