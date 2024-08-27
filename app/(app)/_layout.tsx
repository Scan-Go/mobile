import { Stack } from 'expo-router';

export default function AppLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="(auth)"
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
