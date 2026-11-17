import React, { useState } from 'react'
import { StaffBottomNav } from '../../components/BottomNav'
import { AppBar } from '../../components/AppBar'
import { RiskChip } from '../../components/RiskChip'
import { useApp } from '../../App'
import type { RiskLevel } from '../../store'

export default function PupilsList() {
  const { appState } = useApp()
  const [grade, setGrade] = useState<number|null>(null)
  const [risk, setRisk] = useState<RiskLevel|null>(null)

  const list = appState.screenings.filter(s => !s.skipReason)
    .filter(s => (grade === null || s.grade === grade) && (risk === null || s.risk === risk))

  const chip = (label: string, active: boolean, onClick: () => void) => (
    <button key={label} onClick={onClick} style={{ padding:'4px 12px', borderRadius:999, border:'1px solid #D5DAEA', background: active ? '#12306B' : 'white', color: active ? 'white' : '#5A6275', fontSize:12, fontWeight:600, cursor:'pointer', flexShrink:0 }}>
      {label}
    </button>
  )

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100dvh' }}>
      <AppBar title="Pupils" />
      <div style={{ flex:1, overflowY:'auto', padding:16, display:'flex', flexDirection:'column', gap:10 }}>
        <div style={{ display:'flex', gap:8, overflowX:'auto', paddingBottom:4 }}>
          {chip('All', grade === null, () => setGrade(null))}
          {[1,2,3,4,5,6].map(g => chip(`Gr ${g}`, grade===g, () => setGrade(grade===g ? null : g)))}
        </div>
        <div style={{ display:'flex', gap:8 }}>
          {(['low','possible','higher'] as RiskLevel[]).map(r => chip(r.charAt(0).toUpperCase()+r.slice(1), risk===r, () => setRisk(risk===r ? null : r)))}
        </div>

        <div className="card" style={{ padding:0, overflow:'hidden' }}>
          {list.length === 0 && <div style={{ padding:'32px 16px', textAlign:'center', color:'#5A6275', fontSize:13 }}>No screenings found</div>}
          {list.map((s, i) => (
            <div key={s.id} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 16px', borderBottom: i < list.length-1 ? '1px solid #D5DAEA' : 'none' }}>
              <div>
                <div style={{ fontSize:13, fontWeight:700, color:'#12306B' }}>{s.pupilId}</div>
                <div style={{ fontSize:11, color:'#5A6275' }}>Grade {s.grade} · {new Date(s.time).toLocaleDateString()}</div>
              </div>
              <RiskChip risk={s.risk} sm />
            </div>
          ))}
        </div>
      </div>
      <StaffBottomNav />
    </div>
  )
}
