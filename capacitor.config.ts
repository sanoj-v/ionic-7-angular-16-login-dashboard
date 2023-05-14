import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'ionic-7-angular-16-login-dashboard',
  webDir: 'www',
  plugins: {
    SplashScreen: {
      launchShowDuration: 0,
      launchAutoHide: false,
      androidScaleType: "CENTER_CROP",
      backgroundColor: '#000000',
      showSpinner: true,
      splashFullScreen: false,
      splashImmersive: false
    },
    PrivacyScreen: {
      enable: true
    }
  },
  server: {
    cleartext: true,
    androidScheme: 'https'
  }
};

export default config;
