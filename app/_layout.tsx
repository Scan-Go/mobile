import { Toast } from '@/lib/components/Toast';
import { SessionProvider } from '@/lib/context/auth.context';
import config from '@/tamagui.config';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider
} from '@react-navigation/native';
import { ToastProvider, ToastViewport } from '@tamagui/toast';
import { Slot } from 'expo-router';
import React, { Suspense } from 'react';
import { useColorScheme } from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets
} from 'react-native-safe-area-context';
import { TamaguiProvider, Text, Theme, styled } from 'tamagui';

export const MySafeAreaView = styled(SafeAreaView, {
  name: 'MySafeAreaView',
  flex: 1,
  backgroundColor: '$background'
});

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { left, top, right } = useSafeAreaInsets();

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
                  <SessionProvider>
                    <Slot />
                    <Toast />
                    <ToastViewport
                      top={top + 30}
                      left={left}
                      right={right}
                    />
                  </SessionProvider>
                </ToastProvider>
              </ThemeProvider>
            </MySafeAreaView>
          </Theme>
        </Suspense>
      </TamaguiProvider>
    </SafeAreaProvider>
  );
}
