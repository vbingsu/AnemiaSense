import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.ironmen.anemiasense',
  appName: 'AnemiaSense',
  webDir: 'dist',
  android: {
    minWebViewVersion: 60,
  },
  plugins: {
    StatusBar: {
      style: 'LIGHT',
      backgroundColor: '#12306B',
    },
  },
};

export default config;
