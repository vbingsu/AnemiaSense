import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Sun, Eye, CheckCircle, AlertCircle, Smartphone } from 'lucide-react'
import { StaffBottomNav } from '../../components/BottomNav'
import { AppBar } from '../../components/AppBar'
import { useApp } from '../../App'

const ITEMS = [
  { Icon: Sun,         text: 'Use bright, even light' },
  { Icon: Eye,         text: 'Ask the child to look up' },
  { Icon: CheckCircle, text: 'Gently pull down the lower eyelid' },
  { Icon: AlertCircle, text: 'No red or irritated eyes' },
  { Icon: Smartphone,  text: 'Hold the phone steady' },
]

export default function BeforeYouStart() {
  const navigate = useNavigate()
  const { appState } = useApp()
  const showDemo = appState.demoSettings.showDemoSetup

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100dvh' }}>
      <AppBar title="Before you start" showBack backPath="/staff/pupils" />
      <div style={{ flex:1, overflowY:'auto', padding:16, display:'flex', flexDirection:'column', gap:14 }}>
        <div className="card" style={{ display:'flex', flexDirection:'column', gap:14 }}>
          {ITEMS.map(({ Icon, text }) => (
            <div key={text} style={{ display:'flex', alignItems:'center', gap:12 }}>
              <div style={{ width:36, height:36, borderRadius:'50%', background:'#EEF1FB', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <Icon size={18} color="#12306B" />
              </div>
              <span style={{ fontSize:14, fontWeight:600, color:'#12306B' }}>{text}</span>
            </div>
          ))}
        </div>

        <button onClick={() => navigate(showDemo ? '/staff/demo-setup' : '/staff/capture')} style={{ height:52, background:'#12306B', color:'white', border:'none', borderRadius:14, fontWeight:700, fontSize:15, cursor:'pointer' }}>
          Continue
        </button>
        <button onClick={() => navigate('/staff/skip')} style={{ background:'none', border:'none', color:'#1450A6', fontSize:13, fontWeight:600, cursor:'pointer', padding:8 }}>
          Skip screening
        </button>
      </div>
      <StaffBottomNav />
    </div>
  )
}
