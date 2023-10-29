import { SafeAreaV } from '@/lib/components/SafeAreaView';
import { Toast } from '@/lib/components/Toast';
import { SessionProvider } from '@/lib/context/auth.context';
import {
  RefreshTokenMutation,
  RefreshTokenOutput
} from '@/lib/gql/mutations/auth/refresh_token.mutation';
import { authStorage } from '@/lib/storage/auth.storage';
import config from '@/tamagui.config';
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
import { Slot, SplashScreen } from 'expo-router';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import React, { Suspense, useCallback } from 'react';
import { Text, View, useColorScheme } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets
} from 'react-native-safe-area-context';
import { TamaguiProvider, Theme } from 'tamagui';

SplashScreen.preventAutoHideAsync();

const httpLink = createHttpLink({
  uri: process.env.EXPO_PUBLIC_API_URL
});

export function isRefreshNeeded(token?: string | null) {
  if (!token) {
    return { valid: false, needRefresh: true };
  }

  const decoded = jwtDecode<JwtPayload>(token);

  if (!decoded) {
    return { valid: false, needRefresh: true };
  }
  if (decoded.exp && Date.now() >= decoded.exp * 1000) {
    return { valid: false, needRefresh: true };
  }
  return { valid: true, needRefresh: false };
}

const refreshAuthToken = async () => {
  const newToken = await client
    .mutate<RefreshTokenOutput>({
      mutation: RefreshTokenMutation
    })
    .then(async (res) => {
      const tokens = res.data?.refreshToken;
      await authStorage.saveToken(tokens.accessToken, tokens.refreshToken);
      return tokens.accessToken;
    });

  return newToken;
};

const authLink = setContext(async (context, { headers }) => {
  if (context.operationName === 'RefreshToken') {
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

  let token = await authStorage.getAccessToken();

  const shouldRefresh = isRefreshNeeded(token);

  console.log(token, shouldRefresh);

  if (token && shouldRefresh.needRefresh) {
    const refreshPromise = await refreshAuthToken();
    console.log(refreshPromise);
    if (shouldRefresh.valid === false) {
      token = refreshPromise;
    }
  }

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

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { left, top, right } = useSafeAreaInsets();

  const [loaded] = useFonts({
    SourceSans: require('@/assets/fonts/SourceSans3-Regular.ttf'),
    'SourceSans-Bold': require('@/assets/fonts/SourceSans3-Bold.ttf'),
    'SourceSans-Semibold': require('@/assets/fonts/SourceSans3-SemiBold.ttf')
  });

  const onLayoutRootView = useCallback(async () => {
    if (loaded) {
      await SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <SafeAreaProvider>
      <TamaguiProvider config={config}>
        <Suspense fallback={<Text>Loading...</Text>}>
          <Theme name={colorScheme}>
            <SafeAreaV>
              <ThemeProvider
                value={colorScheme === 'light' ? DefaultTheme : DarkTheme}
              >
                <ToastProvider
                  duration={Number(process.env.EXPO_PUBLIC_TOAST_DURATION)}
                >
                  <ApolloProvider client={client}>
                    <SessionProvider>
                      <View
                        style={{ flex: 1 }}
                        onLayout={onLayoutRootView}
                      >
                        <Slot />
                      </View>
                      <Toast />
                      <ToastViewport
                        top={top + 30}
                        left={left}
                        right={right}
                      />
                    </SessionProvider>
                  </ApolloProvider>
                </ToastProvider>
              </ThemeProvider>
            </SafeAreaV>
          </Theme>
        </Suspense>
      </TamaguiProvider>
    </SafeAreaProvider>
  );
}
