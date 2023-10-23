import { AuthState, useAuthStore } from '@/lib/stores/auth.store';
import { Redirect, Tabs } from 'expo-router';

export default function TabsLayout() {
  const authState = useAuthStore(state => state.authState)

  if (authState === AuthState.None) {
    return <Redirect href="/sign-in" />
  }


  return <Tabs />;
}
