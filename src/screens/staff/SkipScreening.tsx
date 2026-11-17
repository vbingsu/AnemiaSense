import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StaffBottomNav } from '../../components/BottomNav'
import { AppBar } from '../../components/AppBar'
import { useToast } from '../../components/Toast'
import { useApp } from '../../App'
import { setState } from '../../store'

const REASONS = ['Red or irritated eyes', 'Child declines', 'Other']

export default function SkipScreening() {
  const navigate = useNavigate()
  const { session, refreshState } = useApp()
  const [sel, setSel] = useState('')
  const { show, element } = useToast()

  const confirm = () => {
    setState(s => ({
      ...s,
      screenings: [...s.screenings, {
        id: `skip-${Date.now()}`, pupilId: session.selectedPupilId,
        grade: session.selectedPupilGrade, risk: 'low',
        time: new Date().toISOString(), status: 'no-review',
        skipReason: sel, synced: false,
      }],
    }))
    refreshState()
    show('Marked as not screened')
    setTimeout(() => navigate('/staff/pupils'), 1600)
  }

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100dvh' }}>
      <AppBar title="Skip screening" showBack />
      <div style={{ flex:1, overflowY:'auto', padding:16, display:'flex', flexDirection:'column', gap:12 }}>
        <div className="card" style={{ display:'flex', flexDirection:'column', gap:10 }}>
          <div style={{ fontSize:13, fontWeight:600, color:'#12306B', marginBottom:4 }}>Reason for skipping</div>
          {REASONS.map(r => (
            <div key={r} onClick={() => setSel(r)} style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 14px', borderRadius:16, border:`1px solid ${sel===r ? '#12306B' : '#D5DAEA'}`, background: sel===r ? '#EEF1FB' : 'white', cursor:'pointer' }}>
              <div style={{ width:20, height:20, borderRadius:'50%', border:`2px solid ${sel===r ? '#12306B' : '#D5DAEA'}`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                {sel===r && <div style={{ width:10, height:10, borderRadius:'50%', background:'#12306B' }} />}
              </div>
              <span style={{ fontSize:14, fontWeight:600, color:'#12306B' }}>{r}</span>
            </div>
          ))}
        </div>
        <button onClick={confirm} disabled={!sel} style={{ height:52, background: sel ? '#12306B' : '#D5DAEA', color: sel ? 'white' : '#5A6275', border:'none', borderRadius:14, fontWeight:700, fontSize:15, cursor: sel ? 'pointer' : 'not-allowed' }}>
          Confirm
        </button>
      </div>
      {element}
      <StaffBottomNav />
    </div>
  )
}
