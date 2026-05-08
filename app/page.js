'use client'
import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    window.location.href = '/intranet.html'
  }, [])
  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100vh',fontFamily:'-apple-system,BlinkMacSystemFont,sans-serif',background:'#F7F6F3',color:'#5A5850'}}>
      <p>Cargando Realty OS...</p>
    </div>
  )
}