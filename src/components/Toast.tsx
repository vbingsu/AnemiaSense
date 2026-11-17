import React, { useEffect, useState } from 'react'

export function Toast({ message, onDone }: { message: string; onDone: () => void }) {
  const [vis, setVis] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => { setVis(false); setTimeout(onDone, 300) }, 2500)
    return () => clearTimeout(t)
  }, [onDone])
  return (
    <div style={{
      position: 'fixed', bottom: 88, left: '50%', transform: 'translateX(-50%)',
      zIndex: 999, padding: '10px 20px', borderRadius: 999,
      background: '#12306B', color: 'white', fontSize: 14, fontWeight: 600,
      whiteSpace: 'nowrap', boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
      opacity: vis ? 1 : 0, transition: 'opacity 0.3s',
    }}>{message}</div>
  )
}

export function useToast() {
  const [msg, setMsg] = useState<string | null>(null)
  const show = (m: string) => setMsg(m)
  const element = msg ? <Toast message={msg} onDone={() => setMsg(null)} /> : null
  return { show, element }
}
