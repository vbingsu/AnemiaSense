import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Plus } from 'lucide-react'
import { StaffBottomNav } from '../../components/BottomNav'
import { AppBar } from '../../components/AppBar'
import { useApp } from '../../App'
import { setState } from '../../store'

export default function SelectPupil() {
  const navigate = useNavigate()
  const { appState, session, setSession, refreshState } = useApp()
  const [q, setQ] = useState('')

  const pupils = appState.pupils.filter(p => p.id.toLowerCase().includes(q.toLowerCase()))

  const select = (id: string, grade: number) => {
    setState(s => ({ ...s, demoSettings: { ...s.demoSettings, attempt: 1 } }))
    setSession({ ...session, selectedPupilId: id, selectedPupilGrade: grade })
    refreshState()
    navigate('/staff/before')
  }

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100dvh' }}>
      <AppBar title="Select pupil" showBack backPath="/staff/home" />
      <div style={{ flex:1, overflowY:'auto', padding:16, display:'flex', flexDirection:'column', gap:12 }}>
        <div style={{ position:'relative' }}>
          <Search size={18} style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', color:'#5A6275' }} />
          <input
            placeholder="Search by ID"
            value={q}
            onChange={e => setQ(e.target.value)}
            style={{ width:'100%', height:52, border:'1px solid #D5DAEA', borderRadius:12, paddingLeft:40, paddingRight:16, fontSize:15, background:'white', outline:'none' }}
          />
        </div>

        <button onClick={() => navigate('/staff/register')} style={{ display:'flex', alignItems:'center', gap:8, padding:'12px 16px', borderRadius:16, border:'1px solid #D5DAEA', background:'white', color:'#12306B', fontSize:13, fontWeight:600, cursor:'pointer' }}>
          <Plus size={16} /> Register new pupil
        </button>

        <div className="card" style={{ padding:0, overflow:'hidden' }}>
          {pupils.map((p, i) => (
            <button key={p.id} onClick={() => select(p.id, p.grade)} style={{ width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'14px 16px', borderBottom: i < pupils.length-1 ? '1px solid #D5DAEA' : 'none', background:'white', border:'none', cursor:'pointer', textAlign:'left' }}>
              <div>
                <div style={{ fontSize:13, fontWeight:700, color:'#12306B' }}>{p.id}</div>
                <div style={{ fontSize:11, color:'#5A6275' }}>Grade {p.grade}</div>
              </div>
              <span style={{ fontSize:11, color:'#5A6275', fontStyle:'italic' }}>Not screened yet</span>
            </button>
          ))}
        </div>
      </div>
      <StaffBottomNav />
    </div>
  )
}
