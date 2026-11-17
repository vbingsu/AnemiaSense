import React, { useRef, useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { X, Zap, FlipHorizontal } from 'lucide-react'
import { useApp } from '../../App'
import { setState } from '../../store'

function EyeSVG() {
  return (
    <svg width="220" height="120" viewBox="0 0 220 120" fill="none">
      <ellipse cx="110" cy="55" rx="95" ry="45" fill="white" stroke="#555" strokeWidth="1.5"/>
      <ellipse cx="110" cy="55" rx="27" ry="27" fill="#4a4a6a"/>
      <ellipse cx="110" cy="55" rx="17" ry="17" fill="#1a1a2e"/>
      <ellipse cx="102" cy="47" rx="5" ry="5" fill="white" fillOpacity="0.7"/>
      <path d="M15 80 Q110 128 205 80" fill="#F9B0A8" stroke="#D07070" strokeWidth="1.5"/>
    </svg>
  )
}

export default function CaptureScreen() {
  const navigate = useNavigate()
  const { session, appState, setSession, refreshState } = useApp()
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [facing, setFacing] = useState<'environment'|'user'>('environment')
  const [hasTorch, setHasTorch] = useState(false)
  const [torchOn, setTorchOn] = useState(false)
  const [flash, setFlash] = useState(false)
  const [hintIdx, setHintIdx] = useState(0)
  const [green, setGreen] = useState(false)
  const [camOk, setCamOk] = useState(true)

  const demo = appState.demoSettings
  const isFirstBlurry = demo.photoQuality === 'blurry' && demo.attempt === 1

  const HINTS = ['Move a little closer', 'Hold steady', 'Ready. Hold steady']

  const startCam = useCallback(async (f: 'environment'|'user') => {
    streamRef.current?.getTracks().forEach(t => t.stop())
    if (!navigator.mediaDevices?.getUserMedia) { setCamOk(false); return }
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: f, width:{ideal:1280}, height:{ideal:720} } })
      streamRef.current = s
      if (videoRef.current) videoRef.current.srcObject = s
      setCamOk(true)
      const track = s.getVideoTracks()[0]
      const caps = (track.getCapabilities as unknown as () => Record<string,unknown>)?.()
      setHasTorch(!!(caps?.torch))
    } catch { setCamOk(false) }
  }, [])

  useEffect(() => {
    setHintIdx(0); setGreen(false)
    startCam(facing)
    const t1 = setTimeout(() => setHintIdx(1), 1000)
    const t2 = setTimeout(() => { setHintIdx(2); if (!isFirstBlurry) setGreen(true) }, 2000)
    return () => { clearTimeout(t1); clearTimeout(t2); streamRef.current?.getTracks().forEach(t=>t.stop()) }
  }, [facing, isFirstBlurry, startCam])

  const flipCam = () => setFacing(f => f === 'environment' ? 'user' : 'environment')

  const toggleTorch = async () => {
    const track = streamRef.current?.getVideoTracks()[0]
    if (!track) return
    try { await (track.applyConstraints as unknown as (c: unknown) => Promise<void>)({ advanced: [{ torch: !torchOn }] }); setTorchOn(t=>!t) } catch {}
  }

  const shutter = () => {
    setFlash(true)
    setTimeout(() => setFlash(false), 150)

    // Determine quality BEFORE incrementing attempt
    const qualityWillPass = !(demo.photoQuality === 'blurry' && demo.attempt === 1)

    let img: string | undefined
    if (camOk && videoRef.current) {
      const v = videoRef.current
      const canvas = document.createElement('canvas')
      const long = Math.max(v.videoWidth, v.videoHeight)
      const scale = long > 720 ? 720/long : 1
      canvas.width = Math.round(v.videoWidth * scale)
      canvas.height = Math.round(v.videoHeight * scale)
      canvas.getContext('2d')?.drawImage(v, 0, 0, canvas.width, canvas.height)
      img = canvas.toDataURL('image/jpeg', 0.8)
    }

    // If was first blurry attempt, increment attempt to 2
    if (demo.photoQuality === 'blurry' && demo.attempt === 1) {
      setState(s => ({ ...s, demoSettings: { ...s.demoSettings, attempt: 2 } }))
      refreshState()
    }

    streamRef.current?.getTracks().forEach(t=>t.stop())
    setSession({ ...session, capturedImageData: img, qualityWillPass })
    navigate('/staff/quality')
  }

  const goBack = () => { streamRef.current?.getTracks().forEach(t=>t.stop()); navigate('/staff/pupils') }
  const BC = green ? '#4ADE80' : 'white'
  const W=280, H=180

  return (
    <div style={{ position:'relative', display:'flex', flexDirection:'column', height:'100dvh', background:'#000', overflow:'hidden' }}>
      {camOk
        ? <video ref={videoRef} autoPlay playsInline muted style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
        : (
          <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', background:'#111' }}>
            <EyeSVG />
            <div style={{ marginTop:12, padding:'6px 16px', borderRadius:999, background:'rgba(0,0,0,0.7)', color:'white', fontSize:12 }}>
              Camera unavailable. Using demo image.
            </div>
          </div>
        )
      }

      {flash && <div style={{ position:'absolute', inset:0, background:'white', zIndex:50, opacity:0.85 }} />}

      {/* Top row */}
      <div style={{ position:'relative', zIndex:10, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'max(env(safe-area-inset-top,16px),16px) 16px 0' }}>
        <button onClick={goBack} style={{ width:44, height:44, borderRadius:'50%', background:'rgba(0,0,0,0.55)', border:'none', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
          <X size={22} color="white" />
        </button>
        <div style={{ display:'flex', gap:8 }}>
          {hasTorch && (
            <button onClick={toggleTorch} style={{ width:44, height:44, borderRadius:'50%', background: torchOn ? '#F86858' : 'rgba(0,0,0,0.55)', border:'none', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
              <Zap size={18} color="white" />
            </button>
          )}
          <button onClick={flipCam} style={{ width:44, height:44, borderRadius:'50%', background:'rgba(0,0,0,0.55)', border:'none', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
            <FlipHorizontal size={18} color="white" />
          </button>
        </div>
      </div>

      {/* Hint chip */}
      <div style={{ position:'relative', zIndex:10, display:'flex', justifyContent:'center', marginTop:8 }}>
        <span style={{ padding:'6px 16px', borderRadius:999, background:'rgba(0,0,0,0.6)', color:'white', fontSize:13, fontWeight:600 }}>{HINTS[hintIdx]}</span>
      </div>

      {/* Pupil chip */}
      <div style={{ position:'relative', zIndex:10, display:'flex', justifyContent:'center', marginTop:6 }}>
        <span style={{ padding:'4px 12px', borderRadius:999, background:'rgba(18,48,107,0.8)', color:'white', fontSize:11, fontWeight:600 }}>
          {session.selectedPupilId} · Grade {session.selectedPupilGrade}
        </span>
      </div>

      {/* Guide frame */}
      <div style={{ position:'relative', zIndex:10, flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
        <div style={{ position:'relative', width:W, height:H }}>
          {/* TL */}
          <svg style={{ position:'absolute', top:0, left:0 }} width="40" height="40" viewBox="0 0 40 40">
            <path d="M2 20 L2 2 L20 2" stroke={BC} strokeWidth="3.5" fill="none" strokeLinecap="round"/>
          </svg>
          {/* TR */}
          <svg style={{ position:'absolute', top:0, right:0 }} width="40" height="40" viewBox="0 0 40 40">
            <path d="M38 20 L38 2 L20 2" stroke={BC} strokeWidth="3.5" fill="none" strokeLinecap="round"/>
          </svg>
          {/* BL */}
          <svg style={{ position:'absolute', bottom:0, left:0 }} width="40" height="40" viewBox="0 0 40 40">
            <path d="M2 20 L2 38 L20 38" stroke={BC} strokeWidth="3.5" fill="none" strokeLinecap="round"/>
          </svg>
          {/* BR */}
          <svg style={{ position:'absolute', bottom:0, right:0 }} width="40" height="40" viewBox="0 0 40 40">
            <path d="M38 20 L38 38 L20 38" stroke={BC} strokeWidth="3.5" fill="none" strokeLinecap="round"/>
          </svg>
        </div>
        <p style={{ marginTop:12, fontSize:13, fontWeight:600, color:'rgba(255,255,255,0.9)' }}>
          Align the lower eyelid inside the frame
        </p>
      </div>

      {/* Bottom */}
      <div style={{ position:'relative', zIndex:10, display:'flex', flexDirection:'column', alignItems:'center', gap:12, paddingBottom:'max(env(safe-area-inset-bottom,0px),32px)' }}>
        <button onClick={shutter} style={{ width:72, height:72, borderRadius:'50%', background:'white', border:'4px solid #12306B', cursor:'pointer', flexShrink:0 }} />
        <button onClick={goBack} style={{ background:'none', border:'none', color:'rgba(255,255,255,0.8)', fontSize:13, fontWeight:600, cursor:'pointer' }}>Cancel</button>
      </div>
    </div>
  )
}
