import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, useNavigate, useLocation } from 'react-router-dom'
import App from './App'
import './index.css'

// Capacitor plugins (safe to import in browser — they no-op when not on Android)
import { StatusBar, Style } from '@capacitor/status-bar'
import { App as CapApp } from '@capacitor/app'

const HOME_PATHS = new Set(['/staff/home', '/health/review', '/admin/overview', '/login', '/'])

function CapacitorBridge() {
  const navigate = useNavigate()
  const location = useLocation()

  React.useEffect(() => {
    // Status bar: navy background, light icons
    StatusBar.setStyle({ style: Style.Light }).catch(() => {})
    StatusBar.setBackgroundColor({ color: '#12306B' }).catch(() => {})

    // Android back button
    const handler = CapApp.addListener('backButton', () => {
      if (HOME_PATHS.has(location.pathname)) {
        CapApp.exitApp()
      } else {
        navigate(-1)
      }
    })
    return () => { handler.then(h => h.remove()).catch(() => {}) }
  }, [location.pathname, navigate])

  return null
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <CapacitorBridge />
      <App />
    </HashRouter>
  </React.StrictMode>,
)
