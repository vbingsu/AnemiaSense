import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StaffBottomNav } from '../../components/BottomNav'
import { AppBar } from '../../components/AppBar'
import { PrototypeTag } from '../../components/Tags'
import { useApp } from '../../App'
import { setState } from '../../store'
import type { RiskLevel } from '../../store'

type Quality = 'clear' | 'blurry'

const Q_OPTS: { v: Quality; label: string; desc: string }[] = [
  { v: 'clear',  label: 'Clear',  desc: 'No glare, in focus, even lighting, eyelid fully visible. The photo passes the quality check.' },
  { v: 'blurry', label: 'Blurry', desc: 'Out of focus, too dark, glare, or eyelid blocked. The photo fails the quality check and must be retaken.' },
]

const R_OPTS: { v: RiskLevel; label: string; desc: string }[] = [
  { v: 'higher',   label: 'Higher',   desc: 'Higher screening risk. Priority health assessment.' },
  { v: 'possible', label: 'Possible', desc: 'Possible anemia risk. Health personnel review.' },
  { v: 'low',      label: 'Low',      desc: 'Low screening risk. Routine monitoring.' },
]

function RadioCard<T extends string>({ opt, sel, onSel }: { opt: { v: T; label: string; desc: string }; sel: T; onSel: (v: T) => void }) {
  const active = sel === opt.v
  return (
    <div onClick={() => onSel(opt.v)} style={{ display:'flex', alignItems:'flex-start', gap:12, padding:14, borderRadius:16, border:`1px solid ${active ? '#12306B' : '#D5DAEA'}`, background: active ? '#EEF1FB' : 'white', cursor:'pointer', minHeight:56 }}>
      <div style={{ width:20, height:20, borderRadius:'50%', border:`2px solid ${active ? '#12306B' : '#D5DAEA'}`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:1 }}>
        {active && <div style={{ width:10, height:10, borderRadius:'50%', background:'#12306B' }} />}
      </div>
      <div>
        <div style={{ fontSize:14, fontWeight:700, color:'#12306B' }}>{opt.label}</div>
        <div style={{ fontSize:12, color:'#5A6275', marginTop:2 }}>{opt.desc}</div>
      </div>
    </div>
  )
}

export default function DemoSetup() {
  const navigate = useNavigate()
  const { appState, refreshState } = useApp()
  const [quality, setQuality] = useState<Quality>(appState.demoSettings.photoQuality)
  const [result, setResult] = useState<RiskLevel>(appState.demoSettings.result)

  const proceed = () => {
    setState(s => ({ ...s, demoSettings: { ...s.demoSettings, photoQuality: quality, result, attempt: 1 } }))
    refreshState()
    navigate('/staff/capture')
  }

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100dvh' }}>
      <AppBar title="Demo setup" showBack />
      <div style={{ flex:1, overflowY:'auto', padding:16, display:'flex', flexDirection:'column', gap:16 }}>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <PrototypeTag label="Prototype · Demo mode" />
        </div>
        <p style={{ margin:0, fontSize:12, color:'#5A6275' }}>For presentations only. In the real app, the AI checks photo quality and calculates the result automatically.</p>

        <div>
          <div style={{ fontSize:13, fontWeight:700, color:'#12306B', marginBottom:8 }}>1. Choose photo quality</div>
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {Q_OPTS.map(o => <RadioCard key={o.v} opt={o} sel={quality} onSel={setQuality} />)}
          </div>
        </div>

        <div>
          <div style={{ fontSize:13, fontWeight:700, color:'#12306B', marginBottom:8 }}>2. Choose result</div>
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {R_OPTS.map(o => <RadioCard key={o.v} opt={o} sel={result} onSel={setResult} />)}
          </div>
        </div>

        <button onClick={proceed} style={{ height:52, background:'#12306B', color:'white', border:'none', borderRadius:14, fontWeight:700, fontSize:15, cursor:'pointer' }}>
          Continue to camera
        </button>
      </div>
      <StaffBottomNav />
    </div>
  )
}
