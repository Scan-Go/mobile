import {
  Home,
  MessagesSquare,
  QrCode,
  UserCircle2
} from '@tamagui/lucide-icons';
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
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
