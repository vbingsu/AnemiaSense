import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogoIcon, Wordmark } from '../components/Logo'
import { useApp } from '../App'
import { setState } from '../store'
import type { Role } from '../store'

const ROLES: { key: Role; label: string }[] = [
  { key: 'staff',  label: 'School staff' },
  { key: 'health', label: 'Health worker' },
  { key: 'admin',  label: 'School admin' },
]

export default function LoginScreen() {
  const navigate = useNavigate()
  const { refreshState } = useApp()
  const [role, setRole] = useState<Role>('staff')

  const handleSignIn = () => {
    setState(s => ({ ...s, currentRole: role }))
    refreshState()
    navigate(role === 'staff' ? '/staff/home' : role === 'health' ? '/health/review' : '/admin/overview')
  }

  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'100dvh', background:'#EEF1FB', padding:'0 16px', gap:24 }}>
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:12 }}>
        <LogoIcon size={72} />
        <Wordmark />
      </div>

      <div className="card" style={{ width:'100%', maxWidth:360, display:'flex', flexDirection:'column', gap:16 }}>
        <h1 style={{ fontSize:20, fontWeight:700, color:'#12306B', margin:0 }}>Sign in</h1>

        <input
          defaultValue="edna@sampleelementary.edu"
          placeholder="Email or staff ID"
          style={{ height:52, border:'1px solid #D5DAEA', borderRadius:12, padding:'0 16px', fontSize:15, width:'100%', background:'white', outline:'none' }}
        />
        <input
          type="password"
          defaultValue="demo1234"
          placeholder="Password"
          style={{ height:52, border:'1px solid #D5DAEA', borderRadius:12, padding:'0 16px', fontSize:15, width:'100%', background:'white', outline:'none' }}
        />

        <div>
          <div style={{ fontSize:13, fontWeight:600, color:'#5A6275', marginBottom:8 }}>Role</div>
          <div style={{ display:'flex', border:'1px solid #D5DAEA', borderRadius:12, overflow:'hidden' }}>
            {ROLES.map(r => (
              <button key={r.key} onClick={() => setRole(r.key)} style={{
                flex:1, padding:'10px 0', fontSize:12, fontWeight:600, border:'none', cursor:'pointer',
                background: role === r.key ? '#12306B' : 'white',
                color: role === r.key ? 'white' : '#5A6275',
                transition: 'all 0.15s',
              }}>{r.label}</button>
            ))}
          </div>
        </div>

        <button onClick={handleSignIn} style={{ height:52, background:'#12306B', color:'white', border:'none', borderRadius:14, fontWeight:700, fontSize:15, cursor:'pointer' }}>
          Sign in
        </button>
      </div>
    </div>
  )
}
