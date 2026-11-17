// Back-button handler for Android (Capacitor)
// Imported in main.tsx to register app lifecycle listeners

import { App } from '@capacitor/app'

const HOME_PATHS = ['/staff/home', '/health/review', '/admin/overview', '/login', '/']

export function registerBackHandler(getPath: () => string, navigate: (path: string) => void) {
  App.addListener('backButton', () => {
    const path = getPath()
    if (HOME_PATHS.includes(path)) {
      App.exitApp()
    } else {
      navigate(-1 as unknown as string)
    }
  })
}
