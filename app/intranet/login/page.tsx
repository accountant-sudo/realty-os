'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

export default function LoginPage() {
  const { login, currentUser } = useAuth()
  const router = useRouter()
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (currentUser) router.replace('/intranet/dashboard')
  }, [currentUser, router])

  async function handleLogin() {
    setLoading(true)
    const err = await login(user, pass)
    setLoading(false)
    if (err) {
      setError(err)
      setPass('')
    }
  }

  function handleKeyDown(e: React.KeyboardEvent, nextId: string | null) {
    if (e.key === 'Enter') {
      if (nextId) document.getElementById(nextId)?.focus()
      else handleLogin()
    }
  }

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center min-h-screen"
      style={{
        background: '#1a1a18',
        backgroundImage: `radial-gradient(ellipse 80% 60% at 60% 40%, rgba(195,155,60,0.13) 0%, transparent 70%),
          radial-gradient(ellipse 50% 40% at 20% 80%, rgba(195,155,60,0.07) 0%, transparent 60%)`,
      }}
    >
      <div
        className="flex flex-col w-[380px] max-w-[94vw] rounded-[16px] px-11 py-12"
        style={{
          background: '#23231f',
          border: '1px solid rgba(195,155,60,0.25)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(195,155,60,0.08)',
        }}
      >
        <div className="flex flex-col items-center mb-8 gap-1.5">
          <div
            className="w-11 h-11 rounded-full mb-2.5"
            style={{
              background: 'linear-gradient(135deg, #C39B3C 0%, #A07828 100%)',
              boxShadow: '0 4px 20px rgba(195,155,60,0.35)',
            }}
          />
          <div className="text-[22px] font-bold tracking-[0.02em]" style={{ color: '#f0e6c8' }}>
            Miami Tango
          </div>
          <div className="text-[12px] uppercase tracking-[0.04em]" style={{ color: 'rgba(240,230,200,0.45)' }}>
            Investments — Acceso interno
          </div>
        </div>

        <div className="flex flex-col gap-1.5 mb-3.5">
          <label className="text-[11px] font-semibold uppercase tracking-[0.06em]" style={{ color: 'rgba(240,230,200,0.5)' }}>
            Usuario
          </label>
          <input
            id="login-user"
            type="text"
            placeholder="tu usuario"
            autoComplete="username"
            value={user}
            onChange={e => setUser(e.target.value)}
            onKeyDown={e => handleKeyDown(e, 'login-pass')}
            className="rounded-[8px] px-3.5 py-3 text-[14px] outline-none transition-all"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(195,155,60,0.2)',
              color: '#f0e6c8',
              fontFamily: 'inherit',
            }}
            onFocus={e => { e.currentTarget.style.borderColor = 'rgba(195,155,60,0.6)'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)' }}
            onBlur={e => { e.currentTarget.style.borderColor = 'rgba(195,155,60,0.2)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
          />
        </div>

        <div className="flex flex-col gap-1.5 mb-3.5">
          <label className="text-[11px] font-semibold uppercase tracking-[0.06em]" style={{ color: 'rgba(240,230,200,0.5)' }}>
            Contraseña
          </label>
          <input
            id="login-pass"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            value={pass}
            onChange={e => setPass(e.target.value)}
            onKeyDown={e => handleKeyDown(e, null)}
            className="rounded-[8px] px-3.5 py-3 text-[14px] outline-none transition-all"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(195,155,60,0.2)',
              color: '#f0e6c8',
              fontFamily: 'inherit',
            }}
            onFocus={e => { e.currentTarget.style.borderColor = 'rgba(195,155,60,0.6)'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)' }}
            onBlur={e => { e.currentTarget.style.borderColor = 'rgba(195,155,60,0.2)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
          />
        </div>

        <button
          className="w-full py-3 mt-2 rounded-[8px] text-white text-[14px] font-bold tracking-[0.04em] cursor-pointer border-none transition-opacity active:scale-[0.98] hover:opacity-90 disabled:opacity-50"
          style={{ background: 'linear-gradient(135deg, #C39B3C 0%, #A07828 100%)', fontFamily: 'inherit' }}
          disabled={loading}
          onClick={handleLogin}
        >
          {loading ? 'Ingresando...' : 'Ingresar'}
        </button>

        <div className="mt-2.5 text-[12px] text-[#e07070] text-center min-h-[18px]">{error}</div>
      </div>
    </div>
  )
}
