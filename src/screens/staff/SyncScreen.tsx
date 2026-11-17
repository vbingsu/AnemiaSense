import React, { useState } from 'react'
import { RefreshCw, Wifi, WifiOff } from 'lucide-react'
import { StaffBottomNav } from '../../components/BottomNav'
import { AppBar } from '../../components/AppBar'
import { RiskChip } from '../../components/RiskChip'
import { useApp } from '../../App'
import { setState, getWaitingToSync } from '../../store'

export default function SyncScreen() {
  const { appState, refreshState } = useApp()
  const [online, setOnline] = useState(false)
  const [syncing, setSyncing] = useState(false)
  const [lastSync, setLastSync] = useState('')

  const waiting = getWaitingToSync()

  const doSync = () => {
    if (!online || syncing) return
    setSyncing(true)
    setTimeout(() => {
      setState(s => ({ ...s, screenings: s.screenings.map(sc => ({ ...sc, synced: true })) }))
      refreshState()
      setSyncing(false)
      setLastSync(new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}))
    }, 1500)
  }

  let banner = { text: '', bg:'#E7E9F0', fg:'#5A6275' }
  if (syncing) banner = { text:'Syncing…', bg:'#DCE8F8', fg:'#1450A6' }
  else if (lastSync) banner = { text:`All synced · ${lastSync}`, bg:'#E3F5EC', fg:'#1F6B47' }
  else if (!online) banner = { text:'Offline: results are saved on this device', bg:'#E7E9F0', fg:'#5A6275' }
  else if (waiting.length > 0) banner = { text:`${waiting.length} results waiting to sync`, bg:'#FFF1D6', fg:'#8A5A00' }
  else banner = { text:'All synced', bg:'#E3F5EC', fg:'#1F6B47' }

  const canSync = online && !syncing && waiting.length > 0

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100dvh' }}>
      <AppBar title="Sync" />
      <div style={{ flex:1, overflowY:'auto', padding:16, display:'flex', flexDirection:'column', gap:14 }}>
        <div style={{ borderRadius:16, padding:'10px 16px', display:'flex', alignItems:'center', gap:8, fontSize:13, fontWeight:600, background:banner.bg, color:banner.fg }}>
          {online ? <Wifi size={16}/> : <WifiOff size={16}/>} {banner.text}
        </div>

        <div className="card" style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div>
            <div style={{ fontSize:14, fontWeight:600, color:'#12306B' }}>Simulate connection</div>
            <div style={{ fontSize:12, color:'#5A6275', marginTop:2 }}>{online ? 'Online' : 'Offline'}</div>
          </div>
          <div onClick={() => setOnline(o=>!o)} style={{ width:48, height:28, borderRadius:999, background: online ? '#12306B' : '#D5DAEA', position:'relative', cursor:'pointer', transition:'background 0.2s' }}>
            <div style={{ position:'absolute', width:20, height:20, borderRadius:'50%', background:'white', top:4, left: online ? 24 : 4, transition:'left 0.2s' }} />
          </div>
        </div>

        {waiting.length > 0 && (
          <div className="card" style={{ padding:0, overflow:'hidden' }}>
            <div style={{ padding:'10px 16px', borderBottom:'1px solid #D5DAEA', fontSize:11, fontWeight:700, color:'#5A6275', letterSpacing:0.5 }}>
              WAITING TO SYNC ({waiting.length})
            </div>
            {waiting.map((s, i) => (
              <div key={s.id} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 16px', borderBottom: i < waiting.length-1 ? '1px solid #D5DAEA' : 'none' }}>
                <div>
                  <div style={{ fontSize:13, fontWeight:700, color:'#12306B' }}>{s.pupilId}</div>
                  <div style={{ fontSize:11, color:'#5A6275' }}>Grade {s.grade}</div>
                </div>
                <RiskChip risk={s.risk} sm />
              </div>
            ))}
          </div>
        )}

        <button onClick={doSync} disabled={!canSync} style={{ height:52, background: canSync ? '#12306B' : '#D5DAEA', color: canSync ? 'white' : '#5A6275', border:'none', borderRadius:14, fontWeight:700, fontSize:15, cursor: canSync ? 'pointer' : 'not-allowed', display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
          {syncing && <RefreshCw size={18} style={{ animation:'spin 1s linear infinite' }} />}
          {syncing ? 'Syncing…' : 'Sync now'}
        </button>
      </div>
      <StaffBottomNav />
    </div>
  )
}
