import { useAuthStore } from '@lib/store/auth.store';
import { LogOut } from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import { ListItem } from 'tamagui';

export default function LogoutItem() {
  const _signOut = useAuthStore((state) => state.signOut);
  const router = useRouter();

  const signOut = useCallback(() => {
    router.push('/signIn');

    _signOut();
  }, []);

  return (
    <ListItem
      size="$5"
      hoverTheme
      pressTheme
      icon={<LogOut />}
      alignItems="center"
      onPress={signOut}
      title="Logga ut"
    />
  );
}
