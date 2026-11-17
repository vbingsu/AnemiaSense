import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HealthBottomNav } from '../../components/BottomNav'
import { AppBar } from '../../components/AppBar'
import { RiskChip } from '../../components/RiskChip'
import { StatusBadge } from '../../components/StatusBadge'
import { PrototypeTag } from '../../components/Tags'
import { useApp } from '../../App'

type Tab = 'all'|'pending'|'referred'|'confirmed'|'followed-up'

export default function ReferralTracker() {
  const navigate = useNavigate()
  const { appState } = useApp()
  const [tab, setTab] = useState<Tab>('all')

  const list = appState.referrals.filter(r => {
    if (tab === 'all') return true
    if (tab === 'pending') return r.status === 'pending' || r.status === 'pending-priority'
    return r.status === tab
  })

  const TABS: { key:Tab; label:string }[] = [
    { key:'all', label:'All' }, { key:'pending', label:'Pending' },
    { key:'referred', label:'Referred' }, { key:'confirmed', label:'Confirmed' },
    { key:'followed-up', label:'Followed up' },
  ]

  const stepIdx = (status: string) => ['pending','referred','confirmed','followed-up'].indexOf(status.replace('pending-priority','pending'))

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100dvh' }}>
      <AppBar title="Referrals" />
      <div style={{ flex:1, overflowY:'auto', display:'flex', flexDirection:'column' }}>
        <div style={{ padding:'10px 16px 4px' }}><PrototypeTag label="Prototype · Sample data" /></div>

        <div style={{ display:'flex', borderBottom:'1px solid #D5DAEA', background:'white', paddingLeft:8, gap:4, overflowX:'auto' }}>
          {TABS.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)} style={{ padding:'12px 8px', fontSize:12, fontWeight:600, background:'none', border:'none', cursor:'pointer', color: tab===t.key ? '#12306B' : '#5A6275', borderBottom: tab===t.key ? '2px solid #12306B' : '2px solid transparent', flexShrink:0 }}>
              {t.label}
            </button>
          ))}
        </div>

        <div style={{ padding:16, display:'flex', flexDirection:'column', gap:10 }}>
          {list.length === 0 && <div className="card" style={{ textAlign:'center', color:'#5A6275', fontSize:13, padding:'32px 16px' }}>No referrals</div>}
          {list.map(r => (
            <button key={r.id} onClick={() => navigate(`/health/tracker/${r.referralId}`)}
              className="card" style={{ display:'flex', alignItems:'center', gap:12, width:'100%', textAlign:'left', cursor:'pointer' }}>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:13, fontWeight:700, color:'#12306B' }}>{r.pupilId}</div>
                <div style={{ fontSize:11, color:'#5A6275', marginTop:2 }}>{r.facility} · {r.referralId}</div>
                <div style={{ display:'flex', gap:4, marginTop:6 }}>
                  {[0,1,2,3].map(i => (
                    <div key={i} style={{ width:8, height:8, borderRadius:'50%', background: i <= stepIdx(r.status) ? '#12306B' : '#D5DAEA' }} />
                  ))}
                </div>
              </div>
              <StatusBadge status={r.status} />
            </button>
          ))}
        </div>
      </div>
      <HealthBottomNav />
    </div>
  )
}
