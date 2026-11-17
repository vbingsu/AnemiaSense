import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AdminBottomNav } from '../../components/BottomNav'
import { AppBar } from '../../components/AppBar'
import { resetState } from '../../store'

export default function AdminProfile() {
  const navigate = useNavigate()
  const [dlg, setDlg] = useState(false)

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100dvh' }}>
      <AppBar title="Profile" />
      <div style={{ flex:1, overflowY:'auto', padding:16, display:'flex', flexDirection:'column', gap:14 }}>
        <div className="card">
          <div style={{ padding:'10px 0' }}>
            <div style={{ fontSize:14, fontWeight:600, color:'#12306B' }}>Role</div>
            <div style={{ fontSize:12, color:'#5A6275', marginTop:2 }}>School admin</div>
          </div>
          <div style={{ height:1, background:'#D5DAEA' }} />
          <div style={{ padding:'10px 0' }}>
            <div style={{ fontSize:14, fontWeight:600, color:'#12306B' }}>School</div>
            <div style={{ fontSize:12, color:'#5A6275', marginTop:2 }}>Sample Elementary School</div>
          </div>
        </div>
        <button onClick={() => setDlg(true)} style={{ padding:'14px 16px', borderRadius:16, background:'#FDE3DF', border:'none', color:'#A6281B', fontSize:14, fontWeight:700, cursor:'pointer', textAlign:'left' }}>Reset demo data</button>
        <button onClick={() => navigate('/login')} style={{ background:'none', border:'none', color:'#1450A6', fontSize:14, fontWeight:600, cursor:'pointer', padding:8 }}>Sign out</button>
      </div>
      {dlg && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:50, padding:'0 24px' }}>
          <div style={{ background:'white', borderRadius:16, padding:24, width:'100%', maxWidth:360, display:'flex', flexDirection:'column', gap:16 }}>
            <div style={{ fontSize:16, fontWeight:700, color:'#12306B' }}>Reset demo data?</div>
            <div style={{ display:'flex', gap:12 }}>
              <button onClick={() => setDlg(false)} style={{ flex:1, height:48, borderRadius:14, border:'1px solid #D5DAEA', background:'white', color:'#5A6275', fontWeight:600, cursor:'pointer' }}>Cancel</button>
              <button onClick={() => { resetState(); setDlg(false) }} style={{ flex:1, height:48, borderRadius:14, background:'#A6281B', border:'none', color:'white', fontWeight:700, cursor:'pointer' }}>Reset</button>
            </div>
          </div>
        </div>
      )}
      <AdminBottomNav />
    </div>
  )
}
