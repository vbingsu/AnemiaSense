// ============================================================
// store.ts – single localStorage-backed state for AnemiaSense
// ============================================================

export type Role = 'staff' | 'health' | 'admin'
export type RiskLevel = 'low' | 'possible' | 'higher'
export type ScreeningStatus =
  | 'no-review'
  | 'pending'
  | 'pending-priority'
  | 'reviewed'
  | 'referred'
  | 'confirmed'
  | 'not-confirmed'
  | 'followed-up'

export interface Pupil {
  id: string
  grade: number
  age?: number
  sex?: string
  section?: string
  screened: boolean
}

export interface ScreeningRecord {
  id: string
  pupilId: string
  grade: number
  age?: number
  risk: RiskLevel
  time: string
  status: ScreeningStatus
  referralId?: string
  skipReason?: string
  synced: boolean
}

export interface Referral {
  id: string
  referralId: string
  pupilId: string
  grade: number
  risk: RiskLevel
  facility: string
  urgency: 'routine' | 'priority'
  reason: string
  notes: string
  notifyGuardian: boolean
  status: ScreeningStatus
  confirmResult?: 'confirmed' | 'not-confirmed' | 'pending'
  confirmDate?: string
  followUpDate?: string
  confirmNotes?: string
  createdAt: string
}

export interface DemoSettings {
  photoQuality: 'clear' | 'blurry'
  result: RiskLevel
  attempt: 1 | 2
  showDemoSetup: boolean
}

export interface AppState {
  pupils: Pupil[]
  screenings: ScreeningRecord[]
  referrals: Referral[]
  screenedToday: number
  demoSettings: DemoSettings
  nextPupilNumber: number
  nextReferralNumber: number
  currentRole: Role
}

// ── Seed data ─────────────────────────────────────────────

const SEED_PUPILS: Pupil[] = [
  { id: 'AS-2026-00125', grade: 4, screened: false },
  { id: 'AS-2026-00134', grade: 3, screened: false },
  { id: 'AS-2026-00135', grade: 5, screened: false },
  { id: 'AS-2026-00136', grade: 2, screened: false },
]

const SEED_SCREENINGS: ScreeningRecord[] = [
  // Health worker visible (pre-synced)
  { id: 'hw-1', pupilId: 'AS-2026-00131', grade: 4, risk: 'higher', time: '2026-11-13T09:00:00', status: 'pending-priority', synced: true },
  { id: 'hw-2', pupilId: 'AS-2026-00118', grade: 3, risk: 'higher', time: '2026-11-12T10:00:00', status: 'referred', referralId: 'REF-2026-0027', synced: true },
  { id: 'hw-3', pupilId: 'AS-2026-00122', grade: 4, risk: 'possible', time: '2026-11-12T11:00:00', status: 'reviewed', synced: true },
  { id: 'hw-4', pupilId: 'AS-2026-00109', grade: 2, risk: 'possible', time: '2026-11-11T09:00:00', status: 'referred', referralId: 'REF-2026-0028', synced: true },
  { id: 'hw-5', pupilId: 'AS-2026-00104', grade: 5, risk: 'higher', time: '2026-11-10T08:00:00', status: 'confirmed', referralId: 'REF-2026-0025', synced: true },
  { id: 'hw-6', pupilId: 'AS-2026-00098', grade: 6, risk: 'possible', time: '2026-11-09T07:00:00', status: 'followed-up', referralId: 'REF-2026-0022', synced: true },
  // Screener's recent (not synced, low)
  { id: 'sr-1', pupilId: 'AS-2026-00128', grade: 2, risk: 'low', time: '2026-11-13T08:00:00', status: 'no-review', synced: false },
  { id: 'sr-2', pupilId: 'AS-2026-00127', grade: 3, risk: 'low', time: '2026-11-13T08:30:00', status: 'no-review', synced: false },
  { id: 'sr-3', pupilId: 'AS-2026-00133', grade: 1, risk: 'low', time: '2026-11-13T09:00:00', status: 'no-review', synced: false },
]

const SEED_REFERRALS: Referral[] = [
  {
    id: 'ref-hw-2', referralId: 'REF-2026-0027', pupilId: 'AS-2026-00118', grade: 3, risk: 'higher',
    facility: 'Barangay Health Center', urgency: 'priority',
    reason: 'AnemiaSense screening: Higher risk. Confirmatory test recommended.',
    notes: '', notifyGuardian: false, status: 'referred', createdAt: '2026-11-12T10:30:00',
  },
  {
    id: 'ref-hw-4', referralId: 'REF-2026-0028', pupilId: 'AS-2026-00109', grade: 2, risk: 'possible',
    facility: 'Rural Health Unit', urgency: 'routine',
    reason: 'AnemiaSense screening: Possible risk. Confirmatory test recommended.',
    notes: '', notifyGuardian: false, status: 'referred', createdAt: '2026-11-11T09:30:00',
  },
  {
    id: 'ref-hw-5', referralId: 'REF-2026-0025', pupilId: 'AS-2026-00104', grade: 5, risk: 'higher',
    facility: 'District Hospital', urgency: 'priority',
    reason: 'AnemiaSense screening: Higher risk. Confirmatory test recommended.',
    notes: '', notifyGuardian: false, status: 'confirmed', confirmResult: 'confirmed', createdAt: '2026-11-10T08:30:00',
  },
  {
    id: 'ref-hw-6', referralId: 'REF-2026-0022', pupilId: 'AS-2026-00098', grade: 6, risk: 'possible',
    facility: 'Barangay Health Center', urgency: 'routine',
    reason: 'AnemiaSense screening: Possible risk. Confirmatory test recommended.',
    notes: '', notifyGuardian: false, status: 'followed-up', confirmResult: 'confirmed', createdAt: '2026-11-09T07:30:00',
  },
]

const DEFAULT_STATE: AppState = {
  pupils: SEED_PUPILS,
  screenings: SEED_SCREENINGS,
  referrals: SEED_REFERRALS,
  screenedToday: 12,
  demoSettings: {
    photoQuality: 'clear',
    result: 'possible',
    attempt: 1,
    showDemoSetup: true,
  },
  nextPupilNumber: 137,
  nextReferralNumber: 31,
  currentRole: 'staff',
}

// ── Persistence ───────────────────────────────────────────

const KEY = 'anemiasense_v1'

function deepClone<T>(x: T): T {
  return JSON.parse(JSON.stringify(x))
}

function loadState(): AppState {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return JSON.parse(raw) as AppState
  } catch { /* ignore */ }
  return deepClone(DEFAULT_STATE)
}

function persist(state: AppState) {
  localStorage.setItem(KEY, JSON.stringify(state))
}

export function resetState(): AppState {
  const fresh = deepClone(DEFAULT_STATE)
  persist(fresh)
  _state = fresh
  return fresh
}

// ── Singleton ─────────────────────────────────────────────

let _state: AppState = loadState()

export function getState(): AppState { return _state }

export function setState(updater: (s: AppState) => AppState): void {
  _state = updater(_state)
  persist(_state)
}

// ── Derived selectors ─────────────────────────────────────

export function getWaitingToSync(): ScreeningRecord[] {
  return _state.screenings.filter(s => !s.synced)
}

export function getHealthWorkerScreenings(): ScreeningRecord[] {
  return _state.screenings.filter(s => s.synced && s.risk !== 'low')
}

export function getRecentStaffScreenings(): ScreeningRecord[] {
  return [..._state.screenings]
    .sort((a, b) => b.time.localeCompare(a.time))
    .slice(0, 3)
}
