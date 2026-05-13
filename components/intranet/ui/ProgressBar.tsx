export default function ProgressBar({ pct }: { pct: number }) {
  return (
    <div className="bg-bg rounded-full h-1.5 overflow-hidden">
      <div className="h-full bg-gold rounded-full transition-[width] duration-300" style={{ width: `${pct}%` }} />
    </div>
  )
}
