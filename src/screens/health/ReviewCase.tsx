import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppBar } from '../../components/AppBar'
import { RiskChip } from '../../components/RiskChip'
import { HealthBottomNav } from '../../components/BottomNav'
import { useToast } from '../../components/Toast'
import { useApp } from '../../App'
import { setState } from '../../store'

export default function ReviewCase() {
  const navigate = useNavigate()
  const { id } = useParams<{ id:string }>()
  const { appState, session, setSession, refreshState } = useApp()
  const { show, element } = useToast()

  const rec = appState.screenings.find(s => s.id === id)
  if (!rec) return <div style={{ padding:32, textAlign:'center', color:'#5A6275' }}>Record not found</div>

  const ACTION = { higher:'Priority health assessment', possible:'Health personnel review', low:'Routine monitoring' }

  const noAction = () => {
    setState(s => ({ ...s, screenings: s.screenings.map(sc => sc.id===id ? {...sc, status:'reviewed'} : sc) }))
    refreshState()
    show('Marked as reviewed')
    setTimeout(() => navigate('/health/review'), 1600)
  }

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100dvh' }}>
      <AppBar title={rec.pupilId} showBack backPath="/health/review" />
      <div style={{ flex:1, overflowY:'auto', padding:16, display:'flex', flexDirection:'column', gap:14 }}>
        <RiskChip risk={rec.risk} />

        <div className="card" style={{ display:'flex', flexDirection:'column', gap:6 }}>
          <div style={{ fontSize:14, fontWeight:700, color:'#12306B' }}>Screening summary</div>
          <div style={{ fontSize:12, color:'#5A6275' }}>Screened: {new Date(rec.time).toLocaleString()}</div>
          <div style={{ fontSize:12, color:'#5A6275' }}>Screened by: School staff</div>
          <div style={{ fontSize:12, color:'#5A6275' }}>Grade {rec.grade}{rec.age ? `, Age ${rec.age}` : ''}</div>
          <div style={{ fontSize:12, color:'#5A6275' }}>Image quality: Acceptable</div>
          <div style={{ fontSize:11, color:'#5A6275', fontStyle:'italic' }}>Model v1.0</div>
        </div>

        <div className="card">
          <div style={{ fontSize:12, fontWeight:600, color:'#5A6275', marginBottom:4 }}>Recommended action</div>
          <div style={{ fontSize:14, fontWeight:700, color:'#12306B' }}>{ACTION[rec.risk]}</div>
        </div>

        <div className="card">
          <div style={{ fontSize:12, fontWeight:600, color:'#5A6275', marginBottom:8 }}>Notes</div>
          <textarea rows={3} placeholder="Add notes…" style={{ width:'100%', fontSize:14, border:'1px solid #D5DAEA', borderRadius:12, padding:10, resize:'none', outline:'none' }} />
        </div>

        <button onClick={() => { setSession({...session, selectedPupilId:rec.pupilId, selectedPupilGrade:rec.grade}); navigate(`/health/referral/${id}`) }}
          style={{ height:52, background:'#12306B', color:'white', border:'none', borderRadius:14, fontWeight:700, fontSize:15, cursor:'pointer' }}>
          Refer to health partner
        </button>
        <button onClick={noAction}
          style={{ height:52, background:'white', color:'#12306B', border:'1px solid #D5DAEA', borderRadius:14, fontWeight:700, fontSize:15, cursor:'pointer' }}>
          Mark reviewed, no action
        </button>
        <button onClick={() => show('Rescreen requested')}
          style={{ background:'none', border:'none', color:'#1450A6', fontSize:13, fontWeight:600, cursor:'pointer', padding:8 }}>
          Request rescreen
        </button>
      </div>
      {element}
      <HealthBottomNav />
    </div>
  )
}
