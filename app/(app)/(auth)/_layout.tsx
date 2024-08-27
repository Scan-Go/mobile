import { useAuthStore } from '@lib/store/auth.store';
import { Redirect, Stack } from 'expo-router';

export default function Layout() {
  const isSignedIn = useAuthStore((state) => state.isSignedIn);

  if (!isSignedIn) {
    return <Redirect href="/(auth)/signIn" />;
  }

  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false, title: ""}}
      />
    </Stack>
  );
}
