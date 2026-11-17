import React, { useState, createContext, useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { getState, setState as storeSet, AppState } from './store'

// ── Screens ───────────────────────────────────────────────
import SplashScreen from './screens/SplashScreen'
import LoginScreen from './screens/LoginScreen'

import StaffHome from './screens/staff/StaffHome'
import SelectPupil from './screens/staff/SelectPupil'
import RegisterPupil from './screens/staff/RegisterPupil'
import BeforeYouStart from './screens/staff/BeforeYouStart'
import SkipScreening from './screens/staff/SkipScreening'
import DemoSetup from './screens/staff/DemoSetup'
import CaptureScreen from './screens/staff/CaptureScreen'
import QualityCheck from './screens/staff/QualityCheck'
import AnalyzingScreen from './screens/staff/AnalyzingScreen'
import ResultScreen from './screens/staff/ResultScreen'
import SavedScreen from './screens/staff/SavedScreen'
import PupilsList from './screens/staff/PupilsList'
import SyncScreen from './screens/staff/SyncScreen'
import StaffProfile from './screens/staff/StaffProfile'

import NeedsReview from './screens/health/NeedsReview'
import ReviewCase from './screens/health/ReviewCase'
import CreateReferral from './screens/health/CreateReferral'
import ReferralSent from './screens/health/ReferralSent'
import ReferralTracker from './screens/health/ReferralTracker'
import ReferralDetail from './screens/health/ReferralDetail'
import HealthProfile from './screens/health/HealthProfile'

import AdminOverview from './screens/admin/AdminOverview'
import AdminProfile from './screens/admin/AdminProfile'

// ── Session (in-memory, one screening at a time) ──────────
export interface ScreeningSession {
  selectedPupilId: string
  selectedPupilGrade: number
  capturedImageData?: string   // in-memory only, discarded on leaving result
  qualityWillPass?: boolean    // set by CaptureScreen for QualityCheck
  currentScreeningId?: string
}

export interface AppCtx {
  session: ScreeningSession
  setSession: (s: ScreeningSession) => void
  appState: AppState
  refreshState: () => void
}

export const Ctx = createContext<AppCtx>({
  session: { selectedPupilId: 'AS-2026-00125', selectedPupilGrade: 4 },
  setSession: () => {},
  appState: getState(),
  refreshState: () => {},
})

export function useApp() { return useContext(Ctx) }

// ── Root ──────────────────────────────────────────────────
export default function App() {
  const [appState, setAppState] = useState<AppState>(getState())
  const [session, setSession] = useState<ScreeningSession>({
    selectedPupilId: 'AS-2026-00125',
    selectedPupilGrade: 4,
  })

  const refreshState = () => setAppState({ ...getState() })

  return (
    <Ctx.Provider value={{ session, setSession, appState, refreshState }}>
      <div style={{ width: '100%', height: '100dvh', background: '#EEF1FB', fontFamily: 'Nunito, sans-serif', overflow: 'hidden' }}>
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/login" element={<LoginScreen />} />

          <Route path="/staff/home" element={<StaffHome />} />
          <Route path="/staff/pupils" element={<SelectPupil />} />
          <Route path="/staff/register" element={<RegisterPupil />} />
          <Route path="/staff/before" element={<BeforeYouStart />} />
          <Route path="/staff/skip" element={<SkipScreening />} />
          <Route path="/staff/demo-setup" element={<DemoSetup />} />
          <Route path="/staff/capture" element={<CaptureScreen />} />
          <Route path="/staff/quality" element={<QualityCheck />} />
          <Route path="/staff/analyzing" element={<AnalyzingScreen />} />
          <Route path="/staff/result" element={<ResultScreen />} />
          <Route path="/staff/saved" element={<SavedScreen />} />
          <Route path="/staff/list" element={<PupilsList />} />
          <Route path="/staff/sync" element={<SyncScreen />} />
          <Route path="/staff/profile" element={<StaffProfile />} />

          <Route path="/health/review" element={<NeedsReview />} />
          <Route path="/health/case/:id" element={<ReviewCase />} />
          <Route path="/health/referral/:id" element={<CreateReferral />} />
          <Route path="/health/referral-sent" element={<ReferralSent />} />
          <Route path="/health/tracker" element={<ReferralTracker />} />
          <Route path="/health/tracker/:referralId" element={<ReferralDetail />} />
          <Route path="/health/profile" element={<HealthProfile />} />

          <Route path="/admin/overview" element={<AdminOverview />} />
          <Route path="/admin/profile" element={<AdminProfile />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Ctx.Provider>
  )
}
