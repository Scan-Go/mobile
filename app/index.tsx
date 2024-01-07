import useSession from '@lib/hooks/useSession';
import { Redirect } from 'expo-router';
import { Text } from 'tamagui';

function RootScreen() {
  const { isLoggedIn } = useSession();

  return isLoggedIn ? <Redirect href="/home" /> : <Text>qwe</Text>;
}

export default RootScreen;
