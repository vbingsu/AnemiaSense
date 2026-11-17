import React from 'react'
import { useNavigate } from 'react-router-dom'
import { StaffBottomNav } from '../../components/BottomNav'
import { AppBar } from '../../components/AppBar'
import { RiskChip } from '../../components/RiskChip'
import { useApp } from '../../App'
import { getWaitingToSync, getRecentStaffScreenings } from '../../store'

function greeting() {
  const h = new Date().getHours()
  return h < 12 ? 'Good morning, Edna' : h < 17 ? 'Good afternoon, Edna' : 'Good evening, Edna'
}

export default function StaffHome() {
  const navigate = useNavigate()
  const { appState } = useApp()
  const waiting = getWaitingToSync()
  const recent = getRecentStaffScreenings()

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100dvh' }}>
      <AppBar logoMode />
      <div style={{ flex:1, overflowY:'auto', padding:16, display:'flex', flexDirection:'column', gap:12 }}>
        {waiting.length > 0 && (
          <div style={{ background:'#FFF1D6', color:'#8A5A00', borderRadius:16, padding:'10px 16px', display:'flex', alignItems:'center', justifyContent:'space-between', fontSize:13, fontWeight:600 }}>
            <span>⚠ {waiting.length} result{waiting.length !== 1 ? 's' : ''} waiting to sync</span>
            <button onClick={() => navigate('/staff/sync')} style={{ background:'none', border:'none', color:'#8A5A00', fontWeight:700, fontSize:12, cursor:'pointer', textDecoration:'underline' }}>Sync</button>
          </div>
        )}

        <h2 style={{ fontSize:20, fontWeight:700, color:'#1D6FEB', margin:0 }}>{greeting()}</h2>

        <div className="card" style={{ display:'flex', gap:16 }}>
          <div style={{ flex:1, textAlign:'center' }}>
            <div style={{ fontSize:32, fontWeight:700, color:'#1D6FEB' }}>{appState.screenedToday}</div>
            <div style={{ fontSize:12, color:'#5A6275', marginTop:4 }}>Screened today</div>
          </div>
          <div style={{ width:1, background:'#D5DAEA' }} />
          <div style={{ flex:1, textAlign:'center' }}>
            <div style={{ fontSize:32, fontWeight:700, color:'#8A5A00' }}>{waiting.length}</div>
            <div style={{ fontSize:12, color:'#5A6275', marginTop:4 }}>Waiting to sync</div>
          </div>
        </div>

        <button onClick={() => navigate('/staff/pupils')} style={{ height:52, background:'#1D6FEB', color:'white', border:'none', borderRadius:14, fontWeight:700, fontSize:15, cursor:'pointer' }}>
          Start screening
        </button>

        <div>
          <div style={{ fontSize:13, fontWeight:700, color:'#1D6FEB', marginBottom:8 }}>Recent screenings</div>
          <div className="card" style={{ padding:0, overflow:'hidden' }}>
            {recent.length === 0 && <div style={{ padding:'24px 16px', textAlign:'center', color:'#5A6275', fontSize:13 }}>No screenings yet</div>}
            {recent.map((r, i) => (
              <div key={r.id} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 16px', borderBottom: i < recent.length-1 ? '1px solid #D5DAEA' : 'none' }}>
                <div>
                  <div style={{ fontSize:13, fontWeight:700, color:'#1D6FEB' }}>{r.pupilId}</div>
                  <div style={{ fontSize:11, color:'#5A6275' }}>Grade {r.grade} · {new Date(r.time).toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' })}</div>
                </div>
                <RiskChip risk={r.risk} sm />
              </div>
            ))}
          </div>
        </div>
      </div>
      <StaffBottomNav />
    </div>
  )
}
