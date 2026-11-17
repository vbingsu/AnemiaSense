import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogoIcon, Wordmark } from '../components/Logo'
import { PrototypeTag } from '../components/Tags'

export default function SplashScreen() {
  const navigate = useNavigate()
  useEffect(() => {
    const t = setTimeout(() => navigate('/login'), 1500)
    return () => clearTimeout(t)
  }, [navigate])

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', height: '100dvh', background: '#EEF1FB', gap: 16,
    }}>
      <LogoIcon size={96} />
      <Wordmark />
      <PrototypeTag />
    </div>
  )
}
