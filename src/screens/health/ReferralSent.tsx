import React from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'
import { useApp } from '../../App'

export default function ReferralSent() {
  const navigate = useNavigate()
  const { appState } = useApp()
  const last = [...appState.referrals].reverse()[0]

  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'100dvh', gap:24, padding:'0 24px', textAlign:'center' }}>
      <div style={{ width:80, height:80, borderRadius:'50%', background:'#E3F5EC', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <CheckCircle size={48} color="#1F6B47" />
      </div>
      <div>
        <div style={{ fontSize:20, fontWeight:700, color:'#12306B' }}>Referral sent</div>
        {last && <div style={{ fontSize:14, color:'#5A6275', marginTop:4 }}>{last.referralId}</div>}
        <div style={{ fontSize:12, color:'#5A6275', marginTop:2 }}>Status: Referred</div>
      </div>
      <div style={{ width:'100%', display:'flex', flexDirection:'column', gap:12 }}>
        <button onClick={() => navigate('/health/tracker')} style={{ height:52, background:'#12306B', color:'white', border:'none', borderRadius:14, fontWeight:700, fontSize:15, cursor:'pointer' }}>View tracker</button>
        <button onClick={() => navigate('/health/review')} style={{ height:52, background:'white', color:'#12306B', border:'1px solid #D5DAEA', borderRadius:14, fontWeight:700, fontSize:15, cursor:'pointer' }}>Back to list</button>
      </div>
    </div>
  )
}
