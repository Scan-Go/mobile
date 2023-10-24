import { AuthState, useAuthStore } from '@/lib/stores/auth.store';
import {
  Home,
  MessagesSquare,
  QrCode,
  UserCircle2
} from '@tamagui/lucide-icons';
import { Redirect, Tabs } from 'expo-router';

export default function TabsLayout() {
  const authState = useAuthStore((state) => state.authState);

  if (authState === AuthState.None) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ focused }) => (!focused ? <Home /> : <Home />)
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          tabBarIcon: () => <QrCode />
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          tabBarIcon: () => <MessagesSquare />
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: () => <UserCircle2 />
        }}
      />
    </Tabs>
  );
}
