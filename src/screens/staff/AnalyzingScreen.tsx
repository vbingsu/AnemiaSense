import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AnalyzingScreen() {
  const navigate = useNavigate()
  useEffect(() => {
    const t = setTimeout(() => navigate('/staff/result'), 1500)
    return () => clearTimeout(t)
  }, [navigate])

  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'100dvh', gap:24, padding:'0 32px', textAlign:'center' }}>
      <div style={{
        width:80, height:80, borderRadius:'50%',
        border:'4px solid #D5DAEA', borderTopColor:'#12306B',
        animation:'spin 1s linear infinite',
      }} />
      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
      <div>
        <div style={{ fontSize:20, fontWeight:700, color:'#12306B' }}>Analyzing on this device</div>
        <div style={{ fontSize:14, color:'#5A6275', marginTop:6, display:'flex', alignItems:'center', justifyContent:'center', gap:6 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5A6275" strokeWidth="2"><path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01"/></svg>
          No internet needed
        </div>
      </div>
    </div>
  )
}
