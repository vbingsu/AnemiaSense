import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { X, CheckCircle, AlertCircle, AlertTriangle, Check } from 'lucide-react'
import { useApp } from '../../App'
import { setState } from '../../store'
import type { RiskLevel, ScreeningStatus } from '../../store'

function cfg(risk: RiskLevel) {
  switch (risk) {
    case 'low':      return { title:'Low screening risk',    sentence:'Nothing suggests follow-up right now.',              action:'Routine monitoring',       status:'no-review' as ScreeningStatus,       statusLabel:'No review needed',          Icon:CheckCircle,   ic:'#1F6B47', bg:'#E3F5EC' }
    case 'possible': return { title:'Possible anemia risk',  sentence:'A health worker will review this result.',           action:'Health personnel review',  status:'pending' as ScreeningStatus,          statusLabel:'Pending review',            Icon:AlertCircle,   ic:'#8A5A00', bg:'#FFF1D6' }
    case 'higher':   return { title:'Higher screening risk', sentence:'A priority health assessment is recommended.',        action:'Priority health assessment',status:'pending-priority' as ScreeningStatus, statusLabel:'Pending review (priority)',  Icon:AlertTriangle, ic:'#A6281B', bg:'#FDE3DF' }
  }
}

export default function ResultScreen() {
  const navigate = useNavigate()
  const { session, appState, setSession, refreshState } = useApp()
  const c = cfg(appState.demoSettings.result)
  const { Icon } = c
  const saved = useRef(false)
  const now = new Date()

  useEffect(() => {
    if (saved.current) return
    saved.current = true
    const id = `sc-${Date.now()}`
    setState(s => ({
      ...s,
      screenings: [...s.screenings, {
        id, pupilId: session.selectedPupilId, grade: session.selectedPupilGrade,
        risk: s.demoSettings.result, time: now.toISOString(), status: c.status, synced: false,
      }],
      screenedToday: s.screenedToday + 1,
    }))
    refreshState()
    setSession({ ...session, currentScreeningId: id, capturedImageData: undefined })
  }, [])

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100dvh' }}>
      {/* App bar */}
      <div style={{ display:'flex', alignItems:'center', padding:'0 16px', height:56, background:'#12306B', flexShrink:0 }}>
        <span style={{ color:'white', fontWeight:700, fontSize:17, flex:1 }}>Screening result</span>
        <button onClick={() => navigate('/staff/saved')} style={{ background:'none', border:'none', color:'white', cursor:'pointer', width:40, height:40, display:'flex', alignItems:'center', justifyContent:'center' }}>
          <X size={22} />
        </button>
      </div>

      <div style={{ flex:1, overflowY:'auto', padding:16, display:'flex', flexDirection:'column', gap:12 }}>
        {/* Pupil card */}
        <div className="card">
          <div style={{ fontSize:14, fontWeight:700, color:'#12306B' }}>{session.selectedPupilId}</div>
          <div style={{ fontSize:12, color:'#5A6275', marginTop:2 }}>Grade {session.selectedPupilGrade} · {now.toLocaleDateString()} {now.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}</div>
        </div>

        {/* Result card */}
        <div className="card" style={{ display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center', gap:12, background:c.bg, borderColor:c.ic }}>
          <Icon size={48} color={c.ic} />
          <div style={{ fontSize:28, fontWeight:700, lineHeight:1.3, color:c.ic }}>{c.title}</div>
          <div style={{ fontSize:14, color:'#5A6275' }}>{c.sentence}</div>
        </div>

        {/* Image quality */}
        <div className="card" style={{ display:'flex', alignItems:'center', gap:8 }}>
          <Check size={18} color="#1F6B47" />
          <span style={{ fontSize:14, fontWeight:600, color:'#12306B' }}>Image quality: Acceptable</span>
        </div>

        {/* Recommended action */}
        <div className="card">
          <div style={{ fontSize:12, fontWeight:600, color:'#5A6275', marginBottom:4 }}>Recommended action</div>
          <div style={{ fontSize:14, fontWeight:700, color:'#12306B' }}>{c.action}</div>
        </div>

        {/* Status */}
        <div className="card" style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <span style={{ fontSize:14, fontWeight:600, color:'#12306B' }}>Status</span>
          <span style={{ fontSize:13, color:'#5A6275', fontWeight:600 }}>{c.statusLabel}</span>
        </div>

        <p style={{ fontSize:12, color:'#5A6275', textAlign:'center', margin:0 }}>
          AnemiaSense is a screening aid, not a diagnosis. Only a health professional can confirm anemia.
        </p>

        <button onClick={() => navigate('/staff/saved')} style={{ height:52, background:'#12306B', color:'white', border:'none', borderRadius:14, fontWeight:700, fontSize:15, cursor:'pointer' }}>Done</button>
        <button onClick={() => navigate('/staff/pupils')} style={{ height:52, background:'white', color:'#12306B', border:'1px solid #D5DAEA', borderRadius:14, fontWeight:700, fontSize:15, cursor:'pointer' }}>Screen next pupil</button>
      </div>
    </div>
  )
}
