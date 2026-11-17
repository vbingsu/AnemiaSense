import React from 'react'

export function PrototypeTag({ label = 'Prototype' }: { label?: string }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', padding: '2px 10px',
      borderRadius: 999, background: '#FFF1D6', color: '#8A5A00',
      fontSize: 11, fontWeight: 700,
    }}>{label}</span>
  )
}

export function Tag({ label, bg = '#E7E9F0', fg = '#5A6275' }: { label: string; bg?: string; fg?: string }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', padding: '2px 10px',
      borderRadius: 999, background: bg, color: fg, fontSize: 11, fontWeight: 700,
    }}>{label}</span>
  )
}
