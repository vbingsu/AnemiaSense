import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Home, Users, RefreshCw, User, ClipboardList, Send } from 'lucide-react'

type NavItem = { label: string; icon: React.ReactNode; path: string; exact?: boolean }

function NavBtn({ item, active }: { item: NavItem; active: boolean }) {
  const navigate = useNavigate()
  return (
    <button
      onClick={() => navigate(item.path)}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', flex: 1, height: '100%', gap: 2,
        color: active ? '#12306B' : '#5A6275', background: 'none', border: 'none',
        cursor: 'pointer', minWidth: 48,
      }}
    >
      {item.icon}
      <span style={{ fontSize: 11, fontWeight: 600, lineHeight: 1 }}>{item.label}</span>
    </button>
  )
}

function BottomNav({ items }: { items: NavItem[] }) {
  const location = useLocation()
  return (
    <div style={{ display: 'flex', borderTop: '1px solid #D5DAEA', background: 'white', height: 64, flexShrink: 0, paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
      {items.map(item => (
        <NavBtn
          key={item.path}
          item={item}
          active={item.exact ? location.pathname === item.path : location.pathname.startsWith(item.path)}
        />
      ))}
    </div>
  )
}

export function StaffBottomNav() {
  return <BottomNav items={[
    { label: 'Home', icon: <Home size={20} />, path: '/staff/home', exact: true },
    { label: 'Pupils', icon: <Users size={20} />, path: '/staff/list', exact: true },
    { label: 'Sync', icon: <RefreshCw size={20} />, path: '/staff/sync', exact: true },
    { label: 'Profile', icon: <User size={20} />, path: '/staff/profile', exact: true },
  ]} />
}

export function HealthBottomNav() {
  return <BottomNav items={[
    { label: 'Needs review', icon: <ClipboardList size={20} />, path: '/health/review' },
    { label: 'Referrals', icon: <Send size={20} />, path: '/health/tracker' },
    { label: 'Profile', icon: <User size={20} />, path: '/health/profile', exact: true },
  ]} />
}

export function AdminBottomNav() {
  return <BottomNav items={[
    { label: 'Overview', icon: <Home size={20} />, path: '/admin/overview', exact: true },
    { label: 'Profile', icon: <User size={20} />, path: '/admin/profile', exact: true },
  ]} />
}
