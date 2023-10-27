import { useSession } from '@/lib/context/auth.context';
import { AuthState } from '@/lib/stores/auth.store';
import { useFonts } from 'expo-font';
import { Redirect, SplashScreen, Stack } from 'expo-router';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { styled } from 'tamagui';

SplashScreen.preventAutoHideAsync();

export const MySafeAreaView = styled(SafeAreaView, {
  name: 'MySafeAreaView',
  flex: 1,
  backgroundColor: '$background'
});

export default function Layout() {
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
    <Stack
      screenOptions={{
        headerShown: false
      }}
    />
  );
}
