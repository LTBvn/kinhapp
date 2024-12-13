import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Quran FEBE',
  webDir: 'dist',
  bundledWebRuntime: false,
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: '357587948697-afu6agcdfbkkj8tjvjem5a41fs5im1lt.apps.googleusercontent.com',
      androidClientId: "357587948697-afu6agcdfbkkj8tjvjem5a41fs5im1lt.apps.googleusercontent.com",
      forceCodeForRefreshToken: true,
    }
  },
};

export default config;
