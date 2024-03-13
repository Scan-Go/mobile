import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider
} from '@react-navigation/native';
import { ToastProvider, ToastViewport } from '@tamagui/toast';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { QueryClient, focusManager } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { PropsWithChildren, useEffect } from 'react';
import {
  AppState,
  AppStateStatus,
  Platform,
  useColorScheme
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TamaguiProvider } from 'tamagui';
import AlertDialog, { alertDialogRef } from './components/alert_dialog';
import Toast from './components/toast';
import config from './tamagui/config';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
      networkMode: 'offlineFirst',
      refetchOnWindowFocus: false
    }
  }
});

const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage
});

function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active');
  }
}

export default function Providers({ children }: PropsWithChildren) {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const subscription = AppState.addEventListener('change', onAppStateChange);

    return () => subscription.remove();
  }, []);

  return (
    <>
      <TamaguiProvider
        config={config}
        defaultTheme={colorScheme as any}
      >
        <ThemeProvider
          value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
        >
          <ToastProvider duration={3000}>
            <PersistQueryClientProvider
              client={queryClient}
              persistOptions={{ persister: asyncStoragePersister }}
            >
              {children}
              <Toast />
              <ToastViewport
                top={insets.top + 30}
                left={insets.left}
                right={insets.right}
              />
            </PersistQueryClientProvider>
          </ToastProvider>

          <AlertDialog ref={alertDialogRef} />
        </ThemeProvider>
      </TamaguiProvider>
    </>
  );
}
