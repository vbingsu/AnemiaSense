import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppBar } from '../../components/AppBar'
import { HealthBottomNav } from '../../components/BottomNav'
import { useApp } from '../../App'
import { setState } from '../../store'

const FACILITIES = ['Barangay Health Center (sample)', 'Rural Health Unit (sample)', 'District Hospital (sample)']

export default function CreateReferral() {
  const navigate = useNavigate()
  const { id } = useParams<{ id:string }>()
  const { appState, refreshState } = useApp()

  const rec = appState.screenings.find(s => s.id === id)
  if (!rec) return <div style={{ padding:32, textAlign:'center', color:'#5A6275' }}>Not found</div>

  const defUrgency = rec.risk === 'higher' ? 'priority' : 'routine'
  const defReason = rec.risk === 'higher'
    ? 'AnemiaSense screening: Higher risk. Confirmatory test recommended.'
    : 'AnemiaSense screening: Possible risk. Confirmatory test recommended.'

  const [fac, setFac] = useState(FACILITIES[0])
  const [urgency, setUrgency] = useState<'routine'|'priority'>(defUrgency)
  const [reason, setReason] = useState(defReason)
  const [notes, setNotes] = useState('')
  const [notify, setNotify] = useState(false)
  const [dlg, setDlg] = useState(false)

  const send = () => {
    const refId = `REF-2026-${String(appState.nextReferralNumber).padStart(4,'0')}`
    setState(s => ({
      ...s,
      screenings: s.screenings.map(sc => sc.id===id ? {...sc, status:'referred', referralId:refId} : sc),
      referrals: [...s.referrals, {
        id:`ref-${Date.now()}`, referralId:refId, pupilId:rec.pupilId,
        grade:rec.grade, risk:rec.risk, facility: fac.replace(' (sample)',''),
        urgency, reason, notes, notifyGuardian:notify, status:'referred',
        createdAt: new Date().toISOString(),
      }],
      nextReferralNumber: s.nextReferralNumber + 1,
    }))
    refreshState()
    navigate('/health/referral-sent')
  }

  const inp = { width:'100%', border:'1px solid #D5DAEA', borderRadius:12, padding:'0 14px', fontSize:14, background:'white', outline:'none', height:52 } as React.CSSProperties

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100dvh' }}>
      <AppBar title="Create referral" showBack />
      <div style={{ flex:1, overflowY:'auto', padding:16, display:'flex', flexDirection:'column', gap:14 }}>
        <div className="card" style={{ display:'flex', flexDirection:'column', gap:14 }}>
          <div>
            <div style={{ fontSize:13, fontWeight:600, color:'#12306B', marginBottom:6 }}>Refer to</div>
            <select value={fac} onChange={e => setFac(e.target.value)} style={inp}>{FACILITIES.map(f => <option key={f}>{f}</option>)}</select>
          </div>
          <div>
            <div style={{ fontSize:13, fontWeight:600, color:'#12306B', marginBottom:6 }}>Urgency</div>
            <div style={{ display:'flex', border:'1px solid #D5DAEA', borderRadius:12, overflow:'hidden' }}>
              {(['routine','priority'] as const).map(u => (
                <button key={u} onClick={() => setUrgency(u)} style={{ flex:1, padding:'12px 0', fontSize:13, fontWeight:600, background: urgency===u ? '#12306B' : 'white', color: urgency===u ? 'white' : '#5A6275', border:'none', cursor:'pointer', textTransform:'capitalize' }}>{u}</button>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize:13, fontWeight:600, color:'#12306B', marginBottom:6 }}>Reason</div>
            <textarea rows={3} value={reason} onChange={e => setReason(e.target.value)} style={{ ...inp, height:'auto', padding:12, resize:'none' }} />
          </div>
          <div>
            <div style={{ fontSize:13, fontWeight:600, color:'#12306B', marginBottom:6 }}>Notes</div>
            <textarea rows={2} placeholder="Additional notes…" value={notes} onChange={e => setNotes(e.target.value)} style={{ ...inp, height:'auto', padding:12, resize:'none' }} />
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
            <div onClick={() => setNotify(n=>!n)} style={{ width:48, height:28, borderRadius:999, background: notify ? '#12306B' : '#D5DAEA', position:'relative', cursor:'pointer' }}>
              <div style={{ position:'absolute', width:20, height:20, borderRadius:'50%', background:'white', top:4, left: notify ? 24 : 4, transition:'left 0.2s' }} />
            </div>
            <div>
              <div style={{ fontSize:14, fontWeight:600, color:'#12306B' }}>Notify parent or guardian</div>
              <div style={{ fontSize:11, color:'#5A6275' }}>Creates a referral letter</div>
            </div>
          </div>
        </div>

        <button onClick={() => setDlg(true)} style={{ height:52, background:'#12306B', color:'white', border:'none', borderRadius:14, fontWeight:700, fontSize:15, cursor:'pointer' }}>
          Submit referral
        </button>
      </div>

      {dlg && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:50, padding:'0 24px' }}>
          <div style={{ background:'white', borderRadius:16, padding:24, width:'100%', maxWidth:360, display:'flex', flexDirection:'column', gap:16 }}>
            <div style={{ fontSize:16, fontWeight:700, color:'#12306B' }}>Send referral for {rec.pupilId}?</div>
            <div style={{ display:'flex', gap:12 }}>
              <button onClick={() => setDlg(false)} style={{ flex:1, height:48, borderRadius:14, border:'1px solid #D5DAEA', background:'white', color:'#5A6275', fontWeight:600, cursor:'pointer' }}>Cancel</button>
              <button onClick={send} style={{ flex:1, height:48, borderRadius:14, background:'#12306B', border:'none', color:'white', fontWeight:700, cursor:'pointer' }}>Send</button>
            </div>
          </div>
        </div>
      )}
      <HealthBottomNav />
    </div>
  )
}
