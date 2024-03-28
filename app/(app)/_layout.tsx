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
        name="settings"
        options={{ presentation: 'modal', title: 'Inställningar' }}
      />
      <Stack.Screen
        name="profile-settings"
        options={{ presentation: 'modal', title: 'Profilinställningar' }}
      />
    </Stack>
  );
}
