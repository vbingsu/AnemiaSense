import React from 'react'

export function LogoIcon({ size = 64, className = '' }: { size?: number; className?: string }) {
  const svgFallback = `data:image/svg+xml,${encodeURIComponent(`<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" fill="#EEF1FB"/><path d="M20 20 L20 50 M20 20 L50 20" stroke="#12306B" stroke-width="8" fill="none" stroke-linecap="round"/><path d="M180 20 L180 50 M180 20 L150 20" stroke="#12306B" stroke-width="8" fill="none" stroke-linecap="round"/><path d="M20 180 L20 150 M20 180 L50 180" stroke="#12306B" stroke-width="8" fill="none" stroke-linecap="round"/><path d="M180 180 L180 150 M180 180 L150 180" stroke="#12306B" stroke-width="8" fill="none" stroke-linecap="round"/><path d="M100 52 C100 52 63 100 63 126 C63 145 79.7 162 100 162 C120.3 162 137 145 137 126 C137 100 100 52 100 52Z" fill="#12306B"/><path d="M100 52 C100 52 122 90 130 122 C135 143 129 162 118 166 C127 159 137 146 137 126 C137 100 100 52 100 52Z" fill="#F86858"/></svg>`)}`
  return (
    <img
      src="./logo-icon.png"
      alt="AnemiaSense"
      width={size}
      height={size}
      className={className}
      style={{ objectFit: 'contain' }}
      onError={e => { (e.currentTarget as HTMLImageElement).src = svgFallback }}
    />
  )
}

export function Wordmark({ className = '', onDark = false }: { className?: string; onDark?: boolean }) {
  return (
    <span className={className} style={{ fontWeight: 700, fontSize: '1.5rem' }}>
      <span style={{ color: onDark ? '#ffffff' : '#12306B' }}>Anemia</span>
      <span style={{ color: onDark ? '#F8A594' : '#F86858' }}>Sense</span>
    </span>
  )
}
