import { useAuthStore } from '@lib/store/auth.store';
import { Redirect, Stack } from 'expo-router';

export default function AppLayout() {
  const isSignedIn = useAuthStore((state) => state.isSignedIn);

  if (!isSignedIn) {
    return <Redirect href="/(auth)/signIn" />;
  }

  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="new_note"
        options={{ presentation: 'modal' }}
      />
    </Stack>
  );
}
