import React from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle, XCircle } from 'lucide-react'
import { StaffBottomNav } from '../../components/BottomNav'
import { AppBar } from '../../components/AppBar'
import { useApp } from '../../App'

function EyeThumb() {
  return (
    <svg width="160" height="90" viewBox="0 0 220 120" fill="none">
      <ellipse cx="110" cy="55" rx="95" ry="45" fill="white" stroke="#aaa" strokeWidth="1.5"/>
      <ellipse cx="110" cy="55" rx="27" ry="27" fill="#4a4a6a"/>
      <ellipse cx="110" cy="55" rx="17" ry="17" fill="#1a1a2e"/>
      <ellipse cx="102" cy="47" rx="5" ry="5" fill="white" fillOpacity="0.7"/>
      <path d="M15 80 Q110 128 205 80" fill="#F9B0A8" stroke="#D07070" strokeWidth="1.5"/>
    </svg>
  )
}

export default function QualityCheck() {
  const navigate = useNavigate()
  const { session } = useApp()
  // qualityWillPass is set by CaptureScreen before navigation
  const passes = session.qualityWillPass !== false

  const checks = [
    { label: 'Sharpness',              pass: passes },
    { label: 'Brightness',             pass: true },
    { label: 'Glare',                  pass: true },
    { label: 'Eyelid visible',         pass: true },
    { label: 'Nothing blocking view',  pass: true },
  ]

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100dvh' }}>
      <AppBar title="Quality check" showBack />
      <div style={{ flex:1, overflowY:'auto', padding:16, display:'flex', flexDirection:'column', gap:14 }}>
        {/* Thumbnail */}
        <div className="card" style={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:150 }}>
          {session.capturedImageData
            ? <img src={session.capturedImageData} alt="Captured" style={{ maxWidth:'100%', maxHeight:200, borderRadius:12, filter: passes ? 'none' : 'blur(3px)', objectFit:'cover' }} />
            : <div style={{ filter: passes ? 'none' : 'blur(3px)' }}><EyeThumb /></div>
          }
        </div>

        {/* Checks */}
        <div className="card" style={{ display:'flex', flexDirection:'column', gap:12 }}>
          {checks.map(c => (
            <div key={c.label} style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              <span style={{ fontSize:14, fontWeight:600, color:'#12306B' }}>{c.label}</span>
              {c.pass
                ? <CheckCircle size={20} color="#1F6B47" />
                : <XCircle size={20} color="#A6281B" />
              }
            </div>
          ))}
        </div>

        {/* Message */}
        <div className="card" style={{ background: passes ? '#E3F5EC' : '#FDE3DF', borderColor: passes ? '#1F6B47' : '#A6281B' }}>
          <p style={{ margin:0, fontSize:14, fontWeight:600, color: passes ? '#1F6B47' : '#A6281B' }}>
            {passes ? 'Photo looks good.' : 'The photo is too blurry to analyze. Hold steady, use brighter light, and try again.'}
          </p>
        </div>

        {passes
          ? <button onClick={() => navigate('/staff/analyzing')} style={{ height:52, background:'#12306B', color:'white', border:'none', borderRadius:14, fontWeight:700, fontSize:15, cursor:'pointer' }}>Analyze</button>
          : <button onClick={() => navigate('/staff/capture')} style={{ height:52, background:'#12306B', color:'white', border:'none', borderRadius:14, fontWeight:700, fontSize:15, cursor:'pointer' }}>Retake photo</button>
        }
      </div>
      <StaffBottomNav />
    </div>
  )
}
