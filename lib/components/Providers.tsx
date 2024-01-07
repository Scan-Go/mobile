import Toast from '@lib/components/app/toast';
import { TOAST_DURATION } from '@lib/constants';
import tamaguiConfig from '@lib/tamagui';
import {
  AppNavigationDarkTheme,
  AppNavigationTheme
} from '@lib/theme/navigation';
import { ThemeProvider } from '@react-navigation/native';
import { ToastProvider, ToastViewport } from '@tamagui/toast';
import React, { PropsWithChildren, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TamaguiProvider, Theme } from 'tamagui';

function Providers({ children }: PropsWithChildren) {
  const insets = useSafeAreaInsets();
  const activeTheme = useColorScheme();
  const navigationTheme = useMemo(
    () =>
      activeTheme === 'dark' ? AppNavigationDarkTheme : AppNavigationTheme,
    [activeTheme]
  );

  return (
    <TamaguiProvider config={tamaguiConfig}>
      <Theme name={activeTheme}>
        <ThemeProvider value={navigationTheme}>
          <ToastProvider duration={TOAST_DURATION}>
            {children}
            <Toast />
            <ToastViewport
              top={insets.top + 30}
              left={insets.left}
              right={insets.right}
            />
          </ToastProvider>
        </ThemeProvider>
      </Theme>
    </TamaguiProvider>
  );
}

export default Providers;
