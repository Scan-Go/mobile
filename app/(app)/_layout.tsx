import { useSession } from '@/lib/context/auth.context';
import { AuthState } from '@/lib/stores/auth.store';
import config from '@/tamagui.config';
import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider
} from '@react-navigation/native';
import { Toast, ToastProvider, ToastViewport } from '@tamagui/toast';
import { useFonts } from 'expo-font';
import { Redirect, SplashScreen, Stack } from 'expo-router';
import React, { Suspense, useEffect } from 'react';
import { SafeAreaView, useColorScheme } from 'react-native';
import {
    SafeAreaProvider,
    useSafeAreaInsets
} from 'react-native-safe-area-context';
import { TamaguiProvider, Text, Theme, styled } from 'tamagui';

SplashScreen.preventAutoHideAsync();

export const MySafeAreaView = styled(SafeAreaView, {
  name: 'MySafeAreaView',
  flex: 1,
  backgroundColor: '$background'
});

export default function Layout() {
  const colorScheme = useColorScheme();
  const { left, top, right } = useSafeAreaInsets();
  const { authState } = useSession();

  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Regular.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf')
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (authState === AuthState.None) {
    return <Redirect href="/sign-in" />;
  }

  if (!loaded) return null;

  return (
    <SafeAreaProvider>
      <TamaguiProvider config={config}>
        <Suspense fallback={<Text>Loading...</Text>}>
          <Theme name={colorScheme}>
            <MySafeAreaView>
              <ThemeProvider
                value={colorScheme === 'light' ? DefaultTheme : DarkTheme}
              >
                <ToastProvider
                  duration={Number(process.env.EXPO_PUBLIC_TOAST_DURATION)}
                >
                  <Stack
                    screenOptions={{
                      headerShown: false
                    }}
                  />
                  <Toast />
                  <ToastViewport
                    top={top + 30}
                    left={left}
                    right={right}
                  />
                </ToastProvider>
              </ThemeProvider>
            </MySafeAreaView>
          </Theme>
        </Suspense>
      </TamaguiProvider>
    </SafeAreaProvider>
  );
}
