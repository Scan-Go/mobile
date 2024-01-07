import { ConfigContext, ExpoConfig } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  scheme: 'scango',
  userInterfaceStyle: 'automatic',
  splash: {
    backgroundColor: '#ddffe2',
    image: './assets/splash.png',
    resizeMode: 'contain'
  },
  web: {
    bundler: 'metro'
  },
  android: {
    softwareKeyboardLayoutMode: 'pan',
    googleServicesFile: process.env.GOOGLE_SERVICES_ANDROID_JSON,
    package: 'com.muhammedkpln.scango'
  },
  ios: {
    googleServicesFile: process.env.GOOGLE_SERVICES_IOS,
    bundleIdentifier: 'com.muhammedkpln.scango'
  },
  icon: './assets/icon.png',
  name: 'scan-and-go-mobile',
  slug: 'scan-and-go-mobile',
  experiments: {
    tsconfigPaths: true,
    typedRoutes: true
  },
  plugins: [
    'expo-router',
    '@react-native-firebase/app',
    '@react-native-firebase/auth',
    [
      'expo-build-properties',
      {
        ios: {
          useFrameworks: 'static'
        }
      }
    ]
  ],
  sdkVersion: '49.0.0',
  extra: {
    eas: {
      projectId: '408c9fba-4d1d-444a-adf9-4156fa5175b0'
    }
  },
  updates: {
    url: 'https://u.expo.dev/408c9fba-4d1d-444a-adf9-4156fa5175b0'
  },
  runtimeVersion: 'appVersion'
});
