import React from 'react'
import { CheckCircle, AlertCircle, AlertTriangle } from 'lucide-react'
import type { RiskLevel } from '../store'

const CONFIGS = {
  low:      { label: 'Low',      Icon: CheckCircle,   bg: '#E3F5EC', fg: '#1F6B47' },
  possible: { label: 'Possible', Icon: AlertCircle,   bg: '#FFF1D6', fg: '#8A5A00' },
  higher:   { label: 'Higher',   Icon: AlertTriangle, bg: '#FDE3DF', fg: '#A6281B' },
}

export function RiskChip({ risk, sm }: { risk: RiskLevel; sm?: boolean }) {
  const cfg = CONFIGS[risk]
  const { Icon } = cfg
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: sm ? 3 : 4,
      padding: sm ? '0 7px' : '0 9px', height: 28, borderRadius: 999,
      background: cfg.bg, color: cfg.fg, fontWeight: 600,
      fontSize: sm ? 11 : 13, flexShrink: 0,
    }}>
      <Icon size={sm ? 11 : 13} />
      {cfg.label}
    </span>
  )
}
