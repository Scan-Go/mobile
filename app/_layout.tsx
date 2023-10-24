import { Toast } from '@/components/Toast';
import { authStorage } from '@/lib/storage/auth.storage';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
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
import { TamaguiProvider, Text, Theme } from 'tamagui';
import { MySafeAreaView } from '../components/MySafeAreaView';
import config from '../tamagui.config';


const httpLink = createHttpLink({
  uri: process.env.EXPO_PUBLIC_API_URL,
});

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = await authStorage.getAccessToken()
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});


SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const colorScheme = useColorScheme();

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
              <MySafeAreaView>
                <ToastProvider>
                  <Stack
                    screenOptions={{
                      headerShown: false
                    }}
                  />

                  <Toast />
                  <ToastViewport />
                </ToastProvider>
              </MySafeAreaView>
            </ThemeProvider>
          </Theme>
        </Suspense>
      </TamaguiProvider>
    </ApolloProvider>
  );
}
