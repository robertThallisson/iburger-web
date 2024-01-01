/* eslint-disable @typescript-eslint/naming-convention */
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'iburger.com',
  appName: 'Iburger',
  webDir: 'www',
  bundledWebRuntime: false,

  server: {
    androidScheme: 'https',
    cleartext: true,
    allowNavigation: [
      'https://192.168.200.78:8080/',
      'https://192.168.200.78:8080/*'
    ]
  },
  plugins: {
    LocalNotifications: {
      smallIcon: 'ic_stat_ionic_logo',
      iconColor: '#488AFF',
      sound: 'beep.wav'
    }
  }
};

export default config;
