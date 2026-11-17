import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HealthBottomNav } from '../../components/BottomNav'
import { AppBar } from '../../components/AppBar'
import { RiskChip } from '../../components/RiskChip'
import { StatusBadge } from '../../components/StatusBadge'
import { PrototypeTag } from '../../components/Tags'
import { useApp } from '../../App'
import { getHealthWorkerScreenings } from '../../store'
import type { RiskLevel } from '../../store'

type Tab = 'higher'|'possible'|'all'

export default function NeedsReview() {
  const navigate = useNavigate()
  const { appState } = useApp()
  const [tab, setTab] = useState<Tab>('all')

  const records = getHealthWorkerScreenings()
  const filtered = records
    .filter(r => tab === 'all' || r.risk === tab)
    .sort((a, b) => {
      if (a.risk==='higher' && b.risk!=='higher') return -1
      if (b.risk==='higher' && a.risk!=='higher') return 1
      return b.time.localeCompare(a.time)
    })

  const TABS: { key:Tab; label:string }[] = [{ key:'higher', label:'Higher' },{ key:'possible', label:'Possible' },{ key:'all', label:'All' }]

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100dvh' }}>
      <AppBar title={`Needs review (${records.length})`} />
      <div style={{ flex:1, overflowY:'auto', display:'flex', flexDirection:'column' }}>
        <div style={{ padding:'10px 16px 4px' }}><PrototypeTag label="Prototype · Sample data" /></div>

        <div style={{ display:'flex', borderBottom:'1px solid #D5DAEA', background:'white', paddingLeft:16, gap:16 }}>
          {TABS.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)} style={{ padding:'12px 0', fontSize:14, fontWeight:600, background:'none', border:'none', cursor:'pointer', color: tab===t.key ? '#12306B' : '#5A6275', borderBottom: tab===t.key ? '2px solid #12306B' : '2px solid transparent' }}>
              {t.label}
            </button>
          ))}
        </div>

        <div style={{ padding:16, display:'flex', flexDirection:'column', gap:10 }}>
          {filtered.length === 0 && <div className="card" style={{ textAlign:'center', color:'#5A6275', fontSize:13, padding:'32px 16px' }}>No records</div>}
          {filtered.map(r => (
            <button key={r.id} onClick={() => navigate(`/health/case/${r.id}`)}
              className="card" style={{ display:'flex', alignItems:'center', justifyContent:'space-between', width:'100%', textAlign:'left', cursor:'pointer', gap:12 }}>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:13, fontWeight:700, color:'#12306B' }}>{r.pupilId}</div>
                <div style={{ fontSize:11, color:'#5A6275', marginTop:2 }}>Grade {r.grade} · {new Date(r.time).toLocaleDateString()}</div>
              </div>
              <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:4 }}>
                <RiskChip risk={r.risk} sm />
                <StatusBadge status={r.status} />
              </div>
            </button>
          ))}
        </div>
      </div>
      <HealthBottomNav />
    </div>
  )
}
