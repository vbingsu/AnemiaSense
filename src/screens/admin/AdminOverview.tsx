import React, { useState } from 'react'
import { AdminBottomNav } from '../../components/BottomNav'
import { AppBar } from '../../components/AppBar'
import { PrototypeTag } from '../../components/Tags'
import { useToast } from '../../components/Toast'

const KPI = [
  { label:'Pupils screened', val:'240 of 260', sub:'92%' },
  { label:'Flagged for review', val:'50', sub:'21%' },
  { label:'Referrals sent', val:'41 of 50', sub:'82%' },
  { label:'Retakes', val:'12%', sub:'' },
]

const DIST = [
  { label:'Low',      count:190, pct:79, fg:'#1F6B47', bg:'#E3F5EC' },
  { label:'Possible', count:36,  pct:15, fg:'#8A5A00', bg:'#FFF1D6' },
  { label:'Higher',   count:14,  pct:6,  fg:'#A6281B', bg:'#FDE3DF' },
]

export default function AdminOverview() {
  const { show, element } = useToast()
  const [grade, setGrade] = useState<number|null>(null)

  const chip = (label: string, active: boolean, onClick: () => void) => (
    <button key={label} onClick={onClick} style={{ padding:'4px 12px', borderRadius:999, border:'1px solid #D5DAEA', background: active ? '#12306B' : 'white', color: active ? 'white' : '#5A6275', fontSize:12, fontWeight:600, cursor:'pointer', flexShrink:0 }}>
      {label}
    </button>
  )

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100dvh' }}>
      <AppBar title="School overview" />
      <div style={{ flex:1, overflowY:'auto', padding:16, display:'flex', flexDirection:'column', gap:14 }}>
        <div style={{ display:'flex', alignItems:'center', gap:8, flexWrap:'wrap' }}>
          <PrototypeTag label="Prototype · Sample data" />
          <span style={{ fontSize:12, color:'#5A6275' }}>This month</span>
        </div>

        <div style={{ display:'flex', gap:8, overflowX:'auto', paddingBottom:4 }}>
          {chip('All', grade===null, () => setGrade(null))}
          {[1,2,3,4,5,6].map(g => chip(`Gr ${g}`, grade===g, () => setGrade(grade===g?null:g)))}
        </div>

        {/* KPI 2×2 */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
          {KPI.map(k => (
            <div key={k.label} className="card">
              <div style={{ fontSize:20, fontWeight:700, color:'#12306B' }}>{k.val}</div>
              {k.sub && <div style={{ fontSize:12, fontWeight:600, color:'#1450A6', marginTop:2 }}>{k.sub}</div>}
              <div style={{ fontSize:11, color:'#5A6275', marginTop:4 }}>{k.label}</div>
            </div>
          ))}
        </div>

        {/* Risk distribution */}
        <div className="card">
          <div style={{ fontSize:14, fontWeight:700, color:'#12306B', marginBottom:12 }}>Risk distribution</div>
          <div style={{ display:'flex', height:24, borderRadius:999, overflow:'hidden' }}>
            {DIST.map(d => <div key={d.label} style={{ width:`${d.pct}%`, background:d.bg }} />)}
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:8, marginTop:12 }}>
            {DIST.map(d => (
              <div key={d.label} style={{ display:'flex', alignItems:'center', gap:8 }}>
                <div style={{ width:12, height:12, borderRadius:3, background:d.bg, border:`1.5px solid ${d.fg}`, flexShrink:0 }} />
                <span style={{ fontSize:12, fontWeight:600, color:d.fg }}>{d.label}</span>
                <span style={{ fontSize:12, color:'#5A6275' }}>{d.count} ({d.pct}%)</span>
              </div>
            ))}
          </div>
        </div>

        <button onClick={() => show('Report export is not available in the demo')} style={{ height:52, background:'white', color:'#12306B', border:'1px solid #D5DAEA', borderRadius:14, fontWeight:700, fontSize:15, cursor:'pointer' }}>
          Export report
        </button>
        <div style={{ fontSize:12, color:'#5A6275', textAlign:'center' }}>Totals only. No individual pupil data.</div>
      </div>
      {element}
      <AdminBottomNav />
    </div>
  )
}
