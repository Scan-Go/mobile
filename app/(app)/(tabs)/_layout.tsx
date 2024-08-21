import Button from '@lib/components/button';
import { Edit3, Home, Settings, Tags, User } from '@tamagui/lucide-icons';
import { Link, Tabs } from 'expo-router';
import { XStack, useTheme } from 'tamagui';

export default function TabLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colorFocus.val
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Hem',
          tabBarShowLabel: false,
          tabBarIcon: ({ color, focused }) => (
            <Home color={focused ? '$accentColor' : '$color'} />
          )
        }}
      />
      <Tabs.Screen
        name="tags"
        options={{
          title: 'Etiketter',
          tabBarShowLabel: false,
          tabBarIcon: ({ color, focused }) => (
            <Tags color={focused ? '$accentColor' : '$color'} />
          )
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, focused }) => (
            <User color={focused ? '$accentColor' : '$color'} />
          ),
          headerRight: () => (
            <XStack>
              <Link
                href="/(app)/settings"
                asChild
              >
                <Button chromeless>
                  <Settings />
                </Button>
              </Link>
              <Link
                href="/(app)/profile-settings"
                asChild
              >
                <Button chromeless>
                  <Edit3 />
                </Button>
              </Link>
            </XStack>
          )
        }}
      />
    </Tabs>
  );
}
