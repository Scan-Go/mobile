import { SplashScreen, Stack } from 'expo-router';

import Providers from '@lib/providers';
import { authService } from '@lib/services/auth.service';
import { useAuthStore } from '@lib/store/auth.store';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { Platform } from 'react-native';

if (Platform.OS === 'web') {
  require('@tamagui/core/reset.css');
  require('../tamagui-web.css');
}

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const isInitialized = useAuthStore((state) => state.isInitialized);

  const [interLoaded, interError] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf')
  });

  useEffect(() => {
    const listener = authService.listenToAuthClient();

    return () => {
      listener.data.subscription.unsubscribe();
    };
  }, [isInitialized]);

  useEffect(() => {
    if ((interLoaded && !interError) || isInitialized) {
      // Hide the splash screen after the fonts have loaded (or an error was returned) and the UI is ready.
      SplashScreen.hideAsync();
    }
  }, [interLoaded, interError, isInitialized]);

  if (!interLoaded || interError || !isInitialized) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <Providers>
      <Stack>
        <Stack.Screen
          name="(app)"
          options={{ headerShown: false }}
        />
      </Stack>
    </Providers>
  );
}
