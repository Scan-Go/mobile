import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';
import { useEffect } from 'react';

function useFontsLoader() {
  const [loaded] = useFonts({
    SourceSans: require('@assets/fonts/SourceSans3-Regular.ttf'),
    'SourceSans-Bold': require('@assets/fonts/SourceSans3-Bold.ttf'),
    'SourceSans-Semibold': require('@assets/fonts/SourceSans3-SemiBold.ttf')
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  return loaded;
}

export default useFontsLoader;
