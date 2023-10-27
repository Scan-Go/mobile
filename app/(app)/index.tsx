import { Button } from '@/lib/components/Button';
import { useSession } from '@/lib/context/auth.context';
import { AuthState } from '@/lib/stores/auth.store';
import { useAssets } from 'expo-asset';
import { Redirect, router } from 'expo-router';
import { useCallback } from 'react';
import { Image, Text, View, styled } from 'tamagui';

const Logo = styled(Image, {
  marginTop: '$-5',
  alignSelf: 'center',
  backgroundColor: 'white',
  borderRadius: '$10',
  p: '$7',
  source: {}
});

const LogoBackground = styled(View, {
  bg: '$primary',
  height: '$20',
  borderBottomLeftRadius: 100,
  borderBottomRightRadius: 100
});

export default function Home() {
  const [assets] = useAssets([require('@/assets/logo-icon.png')]);
  const { authState } = useSession()

  if (authState === AuthState.LoggedIn) {
    return <Redirect href="/home"/>
  }


  const onPressContiune = useCallback(() => {
    // Check if email exists, if not contiune to registration
    router.replace('/sign-in');
  }, []);

  return (
    <View flex={1}>
      <LogoBackground />

      {assets ? <Logo source={assets[0]} /> : null}

      <View
        flex={1}
        justifyContent="space-around"
      >
        <View
          alignContent="center"
          alignItems="center"
        >
          <Text fontSize="$10">Scan & Go</Text>
          <Text>A platform build for a new way of communicating</Text>
        </View>
        <Button
          bg="$secondary"
          m="$10"
          onPress={onPressContiune}
        >
          Fortsätt
        </Button>
      </View>
    </View>
  );
}
