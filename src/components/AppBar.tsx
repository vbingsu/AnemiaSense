import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, X } from 'lucide-react'
import { LogoIcon, Wordmark } from './Logo'

interface AppBarProps {
  title?: string
  showBack?: boolean
  showClose?: boolean
  onBack?: () => void
  backPath?: string
  logoMode?: boolean
}

export function AppBar({ title, showBack, showClose, onBack, backPath, logoMode }: AppBarProps) {
  const navigate = useNavigate()
  const handleBack = () => {
    if (onBack) { onBack(); return }
    if (backPath) { navigate(backPath); return }
    navigate(-1)
  }

  return (
    <div style={{
      display: 'flex', alignItems: 'center', padding: '0 16px',
      height: 56, background: '#12306B', flexShrink: 0,
      paddingTop: 'env(safe-area-inset-top, 0px)',
    }}>
      {(showBack || showClose) && (
        <button onClick={handleBack} style={{
          marginRight: 8, width: 40, height: 40, display: 'flex',
          alignItems: 'center', justifyContent: 'center', background: 'none',
          border: 'none', color: 'white', cursor: 'pointer', borderRadius: '50%',
          flexShrink: 0,
        }}>
          {showClose ? <X size={22} /> : <ArrowLeft size={22} />}
        </button>
      )}
      {logoMode ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <LogoIcon size={28} />
          <Wordmark />
        </div>
      ) : (
        <span style={{ color: 'white', fontWeight: 700, fontSize: 17, flex: 1 }}>{title}</span>
      )}
    </div>
  )
}
