import Providers from '@lib/components/Providers';
import useFontsLoader from '@lib/hooks/useFontsLoaders';
import useSession from '@lib/hooks/useSession';
import { Slot, SplashScreen } from 'expo-router';
import { useEffect } from 'react';

export const unstable_settings = {
  initialRouteName: ''
};

SplashScreen.preventAutoHideAsync();

function RootLayout() {
  const loaded = useFontsLoader();
  const { initialized } = useSession();

  useEffect(() => {
    if (loaded && initialized) {
      SplashScreen.hideAsync();
    }
  }, [loaded, initialized]);

  if (!loaded) {
    return null;
  }

  return (
    <Providers>
      <Slot />
    </Providers>
  );
}

export default RootLayout;
