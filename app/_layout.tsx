import config from '../tamagui.config';
import { Toast } from '@/lib/components/Toast';
import {
  RefreshTokenMutation,
  RefreshTokenOutput
} from '@/lib/gql/mutations/auth/refresh_token.mutation';
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
import jwt_decode, { JwtPayload } from 'jwt-decode';
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

export function isRefreshNeeded(token?: string | null) {
  if (!token) {
    return { valid: false, needRefresh: true };
  }

  const decoded = jwt_decode<JwtPayload>(token);

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
