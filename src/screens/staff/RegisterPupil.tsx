import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StaffBottomNav } from '../../components/BottomNav'
import { AppBar } from '../../components/AppBar'
import { useApp } from '../../App'
import { setState } from '../../store'

export default function RegisterPupil() {
  const navigate = useNavigate()
  const { appState, session, setSession, refreshState } = useApp()
  const [grade, setGrade] = useState('')
  const [age, setAge] = useState('')
  const [sex, setSex] = useState('')
  const [section, setSection] = useState('')
  const [consent, setConsent] = useState(false)

  const nextId = `AS-2026-${String(appState.nextPupilNumber).padStart(5, '0')}`
  const canSave = consent && grade && age

  const inp = (style?: React.CSSProperties) => ({
    height:52, border:'1px solid #D5DAEA', borderRadius:12, padding:'0 16px',
    fontSize:15, width:'100%', background:'white', outline:'none',
    ...style,
  } as React.CSSProperties)

  const handleSave = () => {
    setState(s => ({
      ...s,
      pupils: [...s.pupils, { id: nextId, grade: parseInt(grade), age: parseInt(age), sex, section, screened:false }],
      nextPupilNumber: s.nextPupilNumber + 1,
    }))
    setSession({ ...session, selectedPupilId: nextId, selectedPupilGrade: parseInt(grade) })
    refreshState()
    navigate('/staff/before')
  }

  const lbl = (txt: string) => <div style={{ fontSize:13, fontWeight:600, color:'#12306B', marginBottom:6 }}>{txt}</div>

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100dvh' }}>
      <AppBar title="Register pupil" showBack />
      <div style={{ flex:1, overflowY:'auto', padding:16, display:'flex', flexDirection:'column', gap:14 }}>
        <div className="card">
          <div style={{ fontSize:11, color:'#5A6275' }}>Pupil ID (auto-generated)</div>
          <div style={{ fontSize:18, fontWeight:700, color:'#12306B', margin:'4px 0' }}>{nextId}</div>
          <div style={{ fontSize:11, color:'#5A6275' }}>Names are not stored in the app.</div>
        </div>

        <div className="card" style={{ display:'flex', flexDirection:'column', gap:14 }}>
          <div>
            {lbl('Grade *')}
            <select value={grade} onChange={e => setGrade(e.target.value)} style={inp()}>
              <option value="">Select grade</option>
              {[1,2,3,4,5,6].map(g => <option key={g} value={g}>Grade {g}</option>)}
            </select>
          </div>
          <div>
            {lbl('Age *')}
            <input type="number" min={5} max={18} placeholder="Age" value={age} onChange={e => setAge(e.target.value)} style={inp()} />
          </div>
          <div>
            {lbl('Sex (optional)')}
            <select value={sex} onChange={e => setSex(e.target.value)} style={inp()}>
              <option value="">Prefer not to say</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div>
            {lbl('Section (optional)')}
            <input placeholder="Section" value={section} onChange={e => setSection(e.target.value)} style={inp()} />
          </div>
        </div>

        <div style={{ display:'flex', alignItems:'flex-start', gap:12, cursor:'pointer' }} onClick={() => setConsent(c => !c)}>
          <div style={{ width:22, height:22, borderRadius:6, border:`2px solid ${consent ? '#12306B' : '#D5DAEA'}`, background: consent ? '#12306B' : 'white', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:1 }}>
            {consent && <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 6.5L5.5 10L11 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
          </div>
          <span style={{ fontSize:14, color:'#12306B', fontWeight:600 }}>Parent or guardian consent is on file *</span>
        </div>

        <button onClick={handleSave} disabled={!canSave} style={{ height:52, background: canSave ? '#12306B' : '#D5DAEA', color: canSave ? 'white' : '#5A6275', border:'none', borderRadius:14, fontWeight:700, fontSize:15, cursor: canSave ? 'pointer' : 'not-allowed' }}>
          Save and continue
        </button>
      </div>
      <StaffBottomNav />
    </div>
  )
}
