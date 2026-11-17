import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Check } from 'lucide-react'
import { AppBar } from '../../components/AppBar'
import { HealthBottomNav } from '../../components/BottomNav'
import { RiskChip } from '../../components/RiskChip'
import { useApp } from '../../App'
import { setState } from '../../store'

type CR = 'confirmed'|'not-confirmed'|'pending'

export default function ReferralDetail() {
  const navigate = useNavigate()
  const { referralId } = useParams<{ referralId:string }>()
  const { appState, refreshState } = useApp()

  const ref = appState.referrals.find(r => r.referralId === referralId)
  if (!ref) return <div style={{ padding:32, textAlign:'center', color:'#5A6275' }}>Not found</div>

  const [cr, setCr] = useState<CR>(ref.confirmResult ?? 'pending')
  const [cDate, setCDate] = useState(ref.confirmDate ?? '')
  const [fDate, setFDate] = useState(ref.followUpDate ?? '')
  const [notes, setNotes] = useState(ref.confirmNotes ?? '')

  const STEPS = ['Pending review','Referred','Confirmed','Followed up']
  const STEP_STATUS = ['pending','referred','confirmed','followed-up']
  const curStep = STEP_STATUS.indexOf(ref.status.replace('pending-priority','pending'))

  const inp = { width:'100%', border:'1px solid #D5DAEA', borderRadius:12, padding:'0 14px', fontSize:14, background:'white', outline:'none', height:44 } as React.CSSProperties

  const recordResult = () => {
    const ns = cr === 'confirmed' ? 'confirmed' : 'not-confirmed'
    setState(s => ({
      ...s,
      referrals: s.referrals.map(r => r.referralId===referralId ? {...r, status:ns, confirmResult:cr, confirmDate:cDate, followUpDate:fDate, confirmNotes:notes} : r),
      screenings: s.screenings.map(sc => sc.referralId===referralId ? {...sc, status:ns} : sc),
    }))
    refreshState()
  }

  const markFollowUp = () => {
    setState(s => ({
      ...s,
      referrals: s.referrals.map(r => r.referralId===referralId ? {...r, status:'followed-up'} : r),
      screenings: s.screenings.map(sc => sc.referralId===referralId ? {...sc, status:'followed-up'} : sc),
    }))
    refreshState()
  }

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100dvh' }}>
      <AppBar title={ref.referralId} showBack backPath="/health/tracker" />
      <div style={{ flex:1, overflowY:'auto', padding:16, display:'flex', flexDirection:'column', gap:14 }}>
        {/* Stepper */}
        <div className="card">
          <div style={{ display:'flex', alignItems:'center' }}>
            {STEPS.map((step, i) => (
              <React.Fragment key={step}>
                <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
                  <div style={{ width:28, height:28, borderRadius:'50%', background: i<=curStep ? '#12306B' : '#D5DAEA', color: i<=curStep ? 'white' : '#5A6275', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:700 }}>
                    {i <= curStep ? <Check size={14} /> : i+1}
                  </div>
                  <div style={{ fontSize:9, textAlign:'center', fontWeight:600, color: i<=curStep ? '#12306B' : '#5A6275', maxWidth:52, lineHeight:1.3 }}>{step}</div>
                </div>
                {i < STEPS.length-1 && <div style={{ flex:1, height:2, background: i<curStep ? '#12306B' : '#D5DAEA', marginBottom:16 }} />}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="card">
          <div style={{ fontSize:14, fontWeight:700, color:'#12306B', marginBottom:8 }}>{ref.pupilId}</div>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6 }}><RiskChip risk={ref.risk} sm /></div>
          <div style={{ fontSize:12, color:'#5A6275' }}>Grade {ref.grade} · {ref.facility}</div>
          <div style={{ fontSize:12, color:'#5A6275', marginTop:2 }}>Urgency: {ref.urgency}</div>
        </div>

        {/* Confirmatory test */}
        <div className="card" style={{ display:'flex', flexDirection:'column', gap:12 }}>
          <div style={{ fontSize:14, fontWeight:700, color:'#12306B' }}>Confirmatory test</div>
          {(['confirmed','not-confirmed','pending'] as CR[]).map(r => (
            <div key={r} onClick={() => setCr(r)} style={{ display:'flex', alignItems:'center', gap:12, cursor:'pointer' }}>
              <div style={{ width:20, height:20, borderRadius:'50%', border:`2px solid ${cr===r ? '#12306B' : '#D5DAEA'}`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                {cr===r && <div style={{ width:10, height:10, borderRadius:'50%', background:'#12306B' }} />}
              </div>
              <span style={{ fontSize:14, fontWeight:600, color:'#12306B' }}>
                {r === 'confirmed' ? 'Anemia confirmed' : r === 'not-confirmed' ? 'Not confirmed' : 'Result pending'}
              </span>
            </div>
          ))}
          <div>
            <div style={{ fontSize:12, fontWeight:600, color:'#5A6275', marginBottom:4 }}>Date of result</div>
            <input type="date" value={cDate} onChange={e => setCDate(e.target.value)} style={inp} />
          </div>
          <div>
            <div style={{ fontSize:12, fontWeight:600, color:'#5A6275', marginBottom:4 }}>Follow-up date</div>
            <input type="date" value={fDate} onChange={e => setFDate(e.target.value)} style={inp} />
          </div>
          <div>
            <div style={{ fontSize:12, fontWeight:600, color:'#5A6275', marginBottom:4 }}>Notes</div>
            <textarea rows={2} value={notes} onChange={e => setNotes(e.target.value)} style={{ ...inp, height:'auto', padding:10, resize:'none' }} />
          </div>
        </div>

        {ref.status === 'referred' && (
          <button onClick={recordResult} disabled={cr==='pending'} style={{ height:52, background: cr!=='pending' ? '#12306B' : '#D5DAEA', color: cr!=='pending' ? 'white' : '#5A6275', border:'none', borderRadius:14, fontWeight:700, fontSize:15, cursor: cr!=='pending' ? 'pointer' : 'not-allowed' }}>
            Record result
          </button>
        )}
        {ref.status === 'confirmed' && (
          <button onClick={markFollowUp} style={{ height:52, background:'#12306B', color:'white', border:'none', borderRadius:14, fontWeight:700, fontSize:15, cursor:'pointer' }}>
            Mark followed up
          </button>
        )}
        {ref.status === 'followed-up' && (
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8, padding:'12px 0', color:'#1F6B47' }}>
            <Check size={20} /> <span style={{ fontSize:14, fontWeight:700 }}>Follow-up complete</span>
          </div>
        )}
      </div>
      <HealthBottomNav />
    </div>
  )
}
