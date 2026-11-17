import React from 'react'
import type { ScreeningStatus } from '../store'

const CFGS: Record<ScreeningStatus, { label: string; bg: string; fg: string }> = {
  'no-review':        { label: 'No review needed',         bg: '#E7E9F0', fg: '#5A6275' },
  'pending':          { label: 'Pending review',           bg: '#E7E9F0', fg: '#5A6275' },
  'pending-priority': { label: 'Pending review (priority)',bg: '#FDE3DF', fg: '#A6281B' },
  'reviewed':         { label: 'Reviewed, no action',      bg: '#E7E9F0', fg: '#5A6275' },
  'referred':         { label: 'Referred',                 bg: '#DCE8F8', fg: '#1450A6' },
  'confirmed':        { label: 'Confirmed',                bg: '#E1E5F7', fg: '#12306B' },
  'not-confirmed':    { label: 'Not confirmed',            bg: '#E7E9F0', fg: '#5A6275' },
  'followed-up':      { label: 'Followed up',              bg: '#DFF1EE', fg: '#1F6B5D' },
}

export function StatusBadge({ status }: { status: ScreeningStatus }) {
  const cfg = CFGS[status] ?? { label: status, bg: '#E7E9F0', fg: '#5A6275' }
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', padding: '0 8px', height: 24,
      borderRadius: 999, background: cfg.bg, color: cfg.fg,
      fontWeight: 600, fontSize: 11, flexShrink: 0,
    }}>
      {cfg.label}
    </span>
  )
}
