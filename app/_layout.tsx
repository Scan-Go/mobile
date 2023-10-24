import config from '../tamagui.config';
import { Toast } from '@/components/Toast';
import { authStorage } from '@/lib/storage/auth.storage';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider
} from '@react-navigation/native';
import { ToastProvider, ToastViewport } from '@tamagui/toast';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { Suspense, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets
} from 'react-native-safe-area-context';
import { TamaguiProvider, Text, Theme } from 'tamagui';

const httpLink = createHttpLink({
  uri: process.env.EXPO_PUBLIC_API_URL
});

const authLink = setContext(async (context, { headers }) => {
  if (context.operationName === 'refreshAuthToken') {
    const refreshToken = await authStorage.getRefreshToken();
    if (refreshToken) {
      return {
        headers: {
          ...headers,
          authorization: `Bearer ${refreshToken}`
        }
      };
    } else {
      return { headers };
    }
  }

  const token = await authStorage.getAccessToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const colorScheme = useColorScheme();
  const { left, top, right } = useSafeAreaInsets();

  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Regular.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf')
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <ApolloProvider client={client}>
      <TamaguiProvider config={config}>
        <Suspense fallback={<Text>Loading...</Text>}>
          <Theme name={colorScheme}>
            <ThemeProvider
              value={colorScheme === 'light' ? DefaultTheme : DarkTheme}
            >
              <SafeAreaView>
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
              </SafeAreaView>
            </ThemeProvider>
          </Theme>
        </Suspense>
      </TamaguiProvider>
    </ApolloProvider>
  );
}
